// Votação ao vivo via REST do Firebase Realtime Database (sem SDK).
// Estrutura: /votos/<sala>/<caso>/<uid> = "A".."E"   (regras: só o próprio uid escreve; leitura pública)
(function () {
  const FB = window.FB;
  const limpa = s => String(s || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40);

  async function token() {
    let t = null;
    try { t = JSON.parse(localStorage.getItem('fb-anon') || 'null'); } catch (e) {}
    if (t && t.exp > Date.now() + 60000) return t;
    let r;
    if (t && t.refresh) {
      r = await fetch('https://securetoken.googleapis.com/v1/token?key=' + FB.apiKey, {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(t.refresh)
      });
      if (r.ok) { const j = await r.json(); t = { uid: j.user_id, id: j.id_token, refresh: j.refresh_token, exp: Date.now() + (+j.expires_in) * 1000 }; }
      else t = null;
    }
    if (!t) {
      r = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FB.apiKey, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true })
      });
      if (!r.ok) throw new Error('auth ' + r.status);
      const j = await r.json();
      t = { uid: j.localId, id: j.idToken, refresh: j.refreshToken, exp: Date.now() + (+j.expiresIn) * 1000 };
    }
    localStorage.setItem('fb-anon', JSON.stringify(t));
    return t;
  }

  async function votar(sala, caso, letra) {
    const t = await token();
    const r = await fetch(`${FB.db}/votos/${limpa(sala)}/${limpa(caso)}/${t.uid}.json?auth=${t.id}`, {
      method: 'PUT', body: JSON.stringify(letra)
    });
    if (!r.ok) throw new Error('voto ' + r.status);
    return true;
  }

  // Assina /votos/<sala> e chama cb({c1:{A:3,B:1,...,total:4}, ...}) a cada mudança.
  function ouvir(sala, cb, onStatus) {
    let arvore = {};
    const set = (path, data) => {
      const p = path.split('/').filter(Boolean);
      if (!p.length) { arvore = data || {}; return; }
      let o = arvore;
      for (let i = 0; i < p.length - 1; i++) { if (typeof o[p[i]] !== 'object' || !o[p[i]]) o[p[i]] = {}; o = o[p[i]]; }
      if (data === null) delete o[p[p.length - 1]]; else o[p[p.length - 1]] = data;
    };
    const conta = () => {
      const out = {};
      for (const c in arvore) {
        const n = { A: 0, B: 0, C: 0, D: 0, E: 0, total: 0 };
        for (const u in arvore[c]) { const v = arvore[c][u]; if (n[v] !== undefined) { n[v]++; n.total++; } }
        out[c] = n;
      }
      cb(out);
    };
    const es = new EventSource(`${FB.db}/votos/${limpa(sala)}.json`);
    es.addEventListener('put', e => { const d = JSON.parse(e.data); set(d.path, d.data); conta(); });
    es.addEventListener('patch', e => { const d = JSON.parse(e.data); for (const k in d.data) set(d.path.replace(/\/$/, '') + '/' + k, d.data[k]); conta(); });
    es.onopen = () => onStatus && onStatus(true);
    es.onerror = () => onStatus && onStatus(false);
    return es;
  }

  // QR em SVG (biblioteca qrcode-generator, MIT)
  function qrSvg(texto, cor) {
    const q = qrcode(0, 'M'); q.addData(texto); q.make();
    const n = q.getModuleCount(); let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + 2} ${r + 2}h1v1h-1z`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + 4} ${n + 4}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="${cor || '#034578'}"/></svg>`;
  }

  // Banco de itens: grava só a 1ª resposta de cada item (regra do banco recusa a 2ª). Anônimo.
  async function registrar(form, item, letra) {
    try {
      const t = await token();
      await fetch(`${FB.db}/respostas/${limpa(form)}/${t.uid}/${item}.json?auth=${t.id}`, { method: 'PUT', body: JSON.stringify({ r: letra, t: { '.sv': 'timestamp' } }) });
    } catch (e) {}
  }
  async function contexto(form, ctx) {
    try {
      const t = await token();
      await fetch(`${FB.db}/respostas/${limpa(form)}/${t.uid}/_ctx.json?auth=${t.id}`, { method: 'PUT', body: JSON.stringify(Object.assign({}, ctx, { t: { '.sv': 'timestamp' } })) });
    } catch (e) {}
  }

  window.Votos = { votar, ouvir, token, qrSvg, limpa, registrar, contexto };
})();
