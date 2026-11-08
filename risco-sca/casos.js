// Casos fictícios da aula (mesmo texto dos slides). Usados por votar.html e praticar.html.
window.CASOS = {
  c1: {
    titulo: 'Caso 1 · Pontada no peito há 4 horas',
    texto: 'Homem, <b>42 anos</b>, tabagista, sem outros fatores de risco. Dor em pontada no hemitórax esquerdo, piora à inspiração profunda, iniciada <b>há 4 h</b>. PA 128×78 mmHg · FC 76 bpm · exame físico normal. ECG: ritmo sinusal, <b>normal</b>. hs-cTnT na admissão: <b>3 ng/L</b> (referência: até 14 ng/L).',
    pergunta: 'Qual a conduta?',
    opcoes: ['Internar na unidade coronária', 'Cateterismo em até 24 h', 'Alta com reavaliação ambulatorial', 'Observar e repetir troponina em 6 h'],
    certa: 'C',
    explica: '<b>Troponina:</b> hs-cTnT 0 h = 3 ng/L (referência até 14; abaixo de 5) com dor há &gt; 3 h → <b>rule-out</b> com uma única dosagem.<br><b>HEART = 1</b>: história pouco suspeita 0 · ECG normal 0 · idade &lt; 45 0 · 1 fator de risco 1 · troponina normal 0.<br>Se a dor tivesse começado há 1 h, uma dosagem não bastaria: repetir em 1 h e aplicar o delta.'
  },
  c2: {
    titulo: 'Caso 2 · Dor em repouso, diabética, 72 anos',
    texto: 'Mulher, <b>72 anos</b>. HAS, DM, dislipidemia. Usa <b>AAS</b>. <b>2 episódios</b> de dor em aperto em repouso nas últimas 24 h; o último há 2 h. PA 150×90 · FC 84 · pulmões limpos. Creatinina 1,3. ECG: <b>infra de ST 1 mm</b> em V4–V6. hs-cTnT: 0 h = <b>38</b> · 1 h = <b>61</b> ng/L (referência: até 14 ng/L).',
    pergunta: 'Qual a conduta?',
    opcoes: ['Alta e teste ergométrico ambulatorial', 'Internar e fazer estratificação não invasiva', 'AAS + anticoagulação, cateterismo < 24 h, sem pré-tratamento rotineiro com inibidor de P2Y12', 'Ticagrelor 180 mg já e cateterismo em até 72 h'],
    certa: 'C',
    explica: 'Δ1h = 23 e valor de 1 h ≥ 52 (≈ 4× a referência de 14) → <b>rule-in: IAMSSST</b> · Killip I.<br><b>TIMI 6</b> (idade ≥ 65, ≥ 3 fatores de risco, AAS, ≥ 2 episódios, desvio de ST, marcador) → 40,9% de eventos em 14 dias.<br><b>GRACE ≈ 160</b> (&gt; 140) → alto risco → estratégia invasiva precoce (&lt; 24 h), sem pré-tratamento rotineiro com inibidor de P2Y12.'
  },
  c3: {
    titulo: 'Caso 3 · Dor que não passa e falta de ar',
    texto: 'Homem, <b>74 anos</b>. Dor em aperto há 50 min, <b>persistente</b> apesar de nitrato SL e EV. PA 104×62 · FC 112 · SatO₂ <b>86%</b> em ar ambiente. <b>Estertores até os ápices</b> bilateralmente. ECG: infra de ST difuso + <b>supra em aVR</b>.',
    pergunta: 'Classe de Killip e conduta?',
    opcoes: ['Killip II — cateterismo em < 24 h', 'Killip III — cateterismo imediato (< 2 h), O₂, sem betabloqueador', 'Killip IV — trombólise', 'Killip III — metoprolol EV e cateterismo em < 72 h'],
    certa: 'B',
    explica: '<b>Killip III</b> (edema agudo de pulmão) + dor refratária + IC aguda → <b>muito alto risco</b>: cateterismo imediato (&lt; 2 h).<br>O₂ indicado (SatO₂ &lt; 90%). <b>Sem betabloqueador</b> (IC aguda). Não é preciso esperar a 2ª troponina.'
  }
};
