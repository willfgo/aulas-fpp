// Glossário de abreviações usado nas aulas (legenda automática por slide/questão).
// Para incluir uma sigla nova, acrescente aqui; a legenda aparece sozinha onde ela for usada.
window.GLOSSARIO = {
  'PS': 'pronto-socorro',
  'SCA': 'síndrome coronariana aguda',
  'SCASSST': 'síndrome coronariana aguda sem supradesnivelamento do segmento ST',
  'IAM': 'infarto agudo do miocárdio',
  'IAMSSST': 'infarto agudo do miocárdio sem supradesnivelamento do segmento ST',
  'IAMCSST': 'infarto agudo do miocárdio com supradesnivelamento do segmento ST',
  'AI': 'angina instável',
  'ECG': 'eletrocardiograma',
  'hs-cTn': 'troponina cardíaca ultrassensível',
  'hs-cTnT': 'troponina T cardíaca ultrassensível',
  'p99': 'percentil 99 da população saudável (limite superior da referência)',
  'Δ': 'variação entre duas dosagens',
  'Δ1h': 'variação da troponina entre 0 h e 1 h',
  'aVR': 'derivação aVR do ECG',
  'B3': 'terceira bulha cardíaca',
  'BRE': 'bloqueio de ramo esquerdo',
  'BAV': 'bloqueio atrioventricular',
  'HVE': 'hipertrofia ventricular esquerda',
  'MP': 'marca-passo',
  'TV': 'taquicardia ventricular',
  'FA': 'fibrilação atrial',
  'PCR': 'parada cardiorrespiratória',
  'PA': 'pressão arterial',
  'PAS': 'pressão arterial sistólica',
  'FC': 'frequência cardíaca',
  'SatO₂': 'saturação periférica de oxigênio',
  'O₂': 'oxigênio',
  'IC': 'insuficiência cardíaca',
  'VE': 'ventrículo esquerdo',
  'VD': 'ventrículo direito',
  'FEVE': 'fração de ejeção do ventrículo esquerdo',
  'DAC': 'doença arterial coronariana',
  'DA': 'artéria descendente anterior',
  'FR': 'fatores de risco cardiovascular',
  'HAS': 'hipertensão arterial sistêmica',
  'DM': 'diabetes mellitus',
  'DRC': 'doença renal crônica',
  'TFG': 'taxa de filtração glomerular',
  'ClCr': 'clearance de creatinina',
  'Cr': 'creatinina',
  'Ht': 'hematócrito',
  'Hb': 'hemoglobina',
  'AAS': 'ácido acetilsalicílico',
  'P2Y12': 'inibidor do receptor plaquetário P2Y12 (clopidogrel, ticagrelor, prasugrel)',
  'DAPT': 'dupla antiagregação plaquetária',
  'PDE-5': 'fosfodiesterase 5 (inibidores: sildenafila, tadalafila)',
  'AINE': 'anti-inflamatório não esteroide',
  'EV': 'endovenoso',
  'SL': 'sublingual',
  'ICP': 'intervenção coronária percutânea (angioplastia)',
  'CRM': 'cirurgia de revascularização miocárdica',
  'AVC': 'acidente vascular cerebral',
  'HIC': 'hemorragia intracraniana',
  'MAV': 'malformação arteriovenosa',
  'MACE': 'eventos cardiovasculares adversos maiores',
  'CV': 'cardiovascular',
  'VPN': 'valor preditivo negativo',
  'angio-TC': 'angiotomografia de coronárias',
  'SPECT': 'cintilografia de perfusão miocárdica (tomografia por emissão de fóton único)',
  'PET': 'tomografia por emissão de pósitrons',
  'RM': 'ressonância magnética cardíaca',
  'HEART': 'History, ECG, Age, Risk factors, Troponin (história, ECG, idade, fatores de risco, troponina)',
  'TIMI': 'Thrombolysis in Myocardial Infarction (escore de risco)',
  'GRACE': 'Global Registry of Acute Coronary Events (escore de risco)',
  'CRUSADE': 'escore de risco de sangramento do registro CRUSADE',
  'ARC-HBR': 'Academic Research Consortium for High Bleeding Risk (critérios de alto risco de sangramento)',
  'BARC': 'Bleeding Academic Research Consortium (classificação de sangramento; 3 e 5 = graves)',
  'ESC': 'Sociedade Europeia de Cardiologia',
  'SBC': 'Sociedade Brasileira de Cardiologia',
  'ACC/AHA': 'American College of Cardiology / American Heart Association'
};
// Devolve [[sigla, significado], ...] das siglas presentes no texto, na ordem do glossário.
window.siglasNoTexto = function (texto) {
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const out = [];
  for (const k in GLOSSARIO) {
    const re = new RegExp('(^|[^A-Za-zÀ-ÿ0-9\\-₂])' + esc(k) + '(?=$|[^A-Za-zÀ-ÿ0-9₂\\-])');
    if (re.test(texto)) out.push([k, GLOSSARIO[k]]);
  }
  // remove siglas contidas em outra já listada quando só aparecem dentro dela (ex.: IAM dentro de IAMSSST não casa pela borda; Δ dentro de Δ1h)
  return out.filter(([k]) => !(k === 'Δ' && out.some(([j]) => j === 'Δ1h') && !/Δ(?!1h)/.test(texto.replace(/Δ1h/g, ''))));
};
window.legendaHTML = function (texto) {
  const l = siglasNoTexto(texto);
  return l.length ? '<b>Abreviações:</b> ' + l.map(([k, v]) => `${k}, ${v}`).join('; ') + '.' : '';
};
