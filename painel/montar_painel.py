"""Gera o Painel de Aulas a partir de ../aulas.json:
  - site/painel/index.html          (versão web, para o link no WhatsApp)
  - ~/Desktop/Aulas FPP.html        (versão do Mac: também abre os arquivos offline)
Uso: cd ~/Desktop/Claude/aulas-fpp/site && python3 painel/montar_painel.py  (depois git push)"""
import base64, json, pathlib, urllib.parse

SITE_DIR = pathlib.Path(__file__).resolve().parent.parent
AULAS_DIR = SITE_DIR.parent
SITE_URL = "https://willfgo.github.io/aulas-fpp/"
DESKTOP = pathlib.Path.home() / "Desktop" / "Aulas FPP.html"

dados = json.loads((SITE_DIR / "aulas.json").read_text(encoding="utf-8"))["aulas"]
tpl = (SITE_DIR / "painel" / "painel.tpl.html").read_text(encoding="utf-8")
qr = (SITE_DIR / "assets" / "qrcode.js").read_text(encoding="utf-8")


def b64(p):
    return base64.b64encode((SITE_DIR / p).read_bytes()).decode()


def gera(local: bool):
    aulas = []
    for a in dados:
        a = dict(a)
        if local and a.get("local"):
            f = AULAS_DIR / a["local"]
            a["local_url"] = f.as_uri() if f.exists() else ""
            a["local_ok"] = f.exists()
        else:
            a["local_url"] = ""
            a["local_ok"] = bool(a.get("local"))
        aulas.append(a)
    h = tpl.replace("/*AULAS*/[]", json.dumps(aulas, ensure_ascii=False))
    h = h.replace("/*SITE*/''", json.dumps(SITE_URL)).replace("/*LOCAL*/false", "true" if local else "false")
    h = h.replace("/*QRCODE*/", qr)
    if local:
        for w in (400, 500, 700, 800):
            h = h.replace(f"../assets/fonts/montserrat-{w}.woff2", "data:font/woff2;base64," + b64(f"assets/fonts/montserrat-{w}.woff2"))
        for n in ("fpp-logo-branco", "fpp-logo-azul"):
            h = h.replace(f"../assets/img/{n}.png", "data:image/png;base64," + b64(f"assets/img/{n}.png"))
    return h


(SITE_DIR / "painel" / "index.html").write_text(gera(False), encoding="utf-8")
DESKTOP.write_text(gera(True), encoding="utf-8")
faltando = [a["id"] for a in dados if a.get("local") and not (AULAS_DIR / a["local"]).exists()]
print("ok:", len(dados), "aulas · web: painel/index.html · Mac:", DESKTOP, "· arquivos locais ausentes:", faltando or "nenhum")
