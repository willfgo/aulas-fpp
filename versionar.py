"""Atualiza ?v=<data-hora> nos <script>/<link> locais de todas as páginas — rode antes de cada git push
(o GitHub Pages guarda JS/CSS em cache por ~10 min; sem isso o aluno pode pegar arquivo velho)."""
import pathlib, re, time
V = time.strftime('%Y%m%d%H%M'); n = 0
for f in pathlib.Path(__file__).parent.rglob('*.html'):
    if f.match('painel/index.html'): continue
    t = f.read_text()
    t2 = re.sub(r'(<script src="(?!https?:)[^"?]+\.js)(\?v=\d+)?"', lambda m: m.group(1) + '?v=' + V + '"', t)
    t2 = re.sub(r'(<link rel="stylesheet" href="(?!https?:)[^"?]+\.css)(\?v=\d+)?"', lambda m: m.group(1) + '?v=' + V + '"', t2)
    if t2 != t: f.write_text(t2); n += 1
print('versionado', n, 'arquivos', V)
