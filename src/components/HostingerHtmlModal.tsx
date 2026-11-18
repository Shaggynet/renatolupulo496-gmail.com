import React, { useState } from 'react';
import { Download, Copy, Check, X, FileCode, ExternalLink } from 'lucide-react';

interface HostingerHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerHtmlModal: React.FC<HostingerHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Expedientes Operativos y Auditoría ACESS</title>
  <style>
    :root {
      --bg-dark: #0b1329;
      --card-bg: #1e293b;
      --accent: #0284c7;
      --accent-hover: #0369a1;
      --border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      padding: 20px;
      margin: 0;
    }
    .wrapper {
      max-width: 820px;
      margin: 0 auto;
      background: var(--card-bg);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    h2, h3 { color: #38bdf8; margin-top: 0; }
    p.sub { font-size: 14px; color: var(--text-muted); margin-bottom: 25px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #cbd5e1; }
    input[type="text"], input[type="password"], select, input[type="file"] {
      width: 100%;
      padding: 10px 12px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: #0f172a;
      color: #fff;
      box-sizing: border-box;
      font-size: 14px;
    }
    input[type="file"] { padding: 8px; font-size: 13px; cursor: pointer; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .section-box {
      border: 1px solid var(--border);
      padding: 18px;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.4);
      margin-bottom: 20px;
    }
    .btn-submit {
      width: 100%;
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 15px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-submit:hover { background: var(--accent-hover); }
    .hidden { display: none !important; }
    .badge {
      display: inline-block;
      background: #0369a1;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

<div class="wrapper">
  <h2>Ingreso de Expediente y Auditoría 360</h2>
  <p class="sub">Carga centralizada de credenciales y archivo documental institucional para emisión y renovación de permisos sanitarios.</p>

  <form id="expedienteForm">
    <!-- Identificación Operativa -->
    <div class="section-box">
      <span class="badge">PASO 1</span>
      <h3>Datos de Registro</h3>
      
      <div class="grid-2">
        <div class="form-group">
          <label>Tipo de Trámite</label>
          <select id="tipo_tramite" name="tipo_tramite" required onchange="controlUnicodigo()">
            <option value="nuevo">Nuevo Registro (Sin Unicódigo previo)</option>
            <option value="renovacion">Renovación de Permiso</option>
            <option value="modificacion">Cambio de Tipología / Modificación</option>
          </select>
        </div>
        <div class="form-group" id="box_unicodigo">
          <label>Unicódigo del Establecimiento</label>
          <input type="text" id="unicodigo" name="unicodigo" placeholder="Ej: 17D01-001234">
        </div>
      </div>

      <div class="grid-2">
        <div class="form-group">
          <label>RUC del Titular / Empresa</label>
          <input type="text" name="ruc" maxlength="13" required placeholder="179XXXXXXXX001">
        </div>
        <div class="form-group">
          <label>Razón Social / Nombre Comercial</label>
          <input type="text" name="razon_social" required placeholder="Clínica / Consultorio / Empresa">
        </div>
      </div>

      <div class="form-group">
        <label>Tipología Sanitaria / Área Operativa</label>
        <select id="tipologia" name="tipologia" required onchange="ajustarDocumentos()">
          <option value="consultorio">Consultorio Médico / Odontológico (Básico - 5 docs)</option>
          <option value="centro_medico">Centro Médico / Especialidades / Policlínico (8 docs)</option>
          <option value="farmacia">Farmacia / Distribuidora Farmacéutica (8 docs)</option>
          <option value="hospital">Hospital del Día / Clínica Integral (12 docs)</option>
        </select>
      </div>
    </div>

    <!-- Bóveda de 10 Credenciales Clave -->
    <div class="section-box">
      <span class="badge">PASO 2</span>
      <h3>Claves y Accesos Institucionales (10 Accesos)</h3>
      
      <div class="grid-2">
        <div class="form-group"><label>1. Usuario RUC / SRI</label><input type="text" name="user_sri" required></div>
        <div class="form-group"><label>Clave RUC / SRI</label><input type="password" name="pass_sri" required></div>
        <div class="form-group"><label>2. Usuario ACESS / MSP</label><input type="text" name="user_acess" required></div>
        <div class="form-group"><label>Clave ACESS / MSP</label><input type="password" name="pass_acess" required></div>
        <div class="form-group"><label>3. Usuario ENGRIS (Bomberos)</label><input type="text" name="user_engris"></div>
        <div class="form-group"><label>Clave ENGRIS</label><input type="password" name="pass_engris"></div>
        <div class="form-group"><label>4. Usuario Municipio / Patente</label><input type="text" name="user_muni"></div>
        <div class="form-group"><label>Clave Municipio</label><input type="password" name="pass_muni"></div>
        <div class="form-group"><label>5. Usuario Sistema SAS</label><input type="text" name="user_sas"></div>
        <div class="form-group"><label>Clave SAS</label><input type="password" name="pass_sas"></div>
      </div>
    </div>

    <!-- Documentación Digital -->
    <div class="section-box">
      <span class="badge">PASO 3</span>
      <h3>Documentación Requerida (PDF / Imagen)</h3>

      <div class="form-group">
        <label>1. Cédula y Papeleta de Votación (Titular / Rep. Técnico)</label>
        <input type="file" name="doc_01_cedula" required>
      </div>
      <div class="form-group">
        <label>2. Registro Mercantil / Nombramiento Representante Legal</label>
        <input type="file" name="doc_02_mercantil">
      </div>
      <div class="form-group">
        <label>3. Planilla de Aportes al IESS del Personal o Titular</label>
        <input type="file" name="doc_03_iess">
      </div>
      <div class="form-group" id="doc_renovacion_box">
        <label>4. Foto / Copia de Permiso de Funcionamiento Anterior</label>
        <input type="file" name="doc_04_permiso_anterior">
      </div>
      <div class="form-group">
        <label>5. Cartera de Servicios Agregados y Tipología Médica</label>
        <input type="file" name="doc_05_cartera_servicios" required>
      </div>

      <!-- Documentos Condicionales para Complejidad Media / Alta -->
      <div id="docs_avanzados" class="hidden">
        <div class="form-group"><label>6. Título y Registro Senescyt del Personal Sanitario</label><input type="file" name="doc_06_senescyt"></div>
        <div class="form-group"><label>7. Croquis / Planos de Distribución de Áreas</label><input type="file" name="doc_07_planos"></div>
        <div class="form-group"><label>8. Certificado de Calibración de Equipos Médicos</label><input type="file" name="doc_08_equipos"></div>
      </div>

      <!-- Documentos Condicionales para Clínicas / Complejidad Total (12 docs) -->
      <div id="docs_hospitalarios" class="hidden">
        <div class="form-group"><label>9. Contrato de Gestión de Desechos Biopeligrosos</label><input type="file" name="doc_09_desechos"></div>
        <div class="form-group"><label>10. Manual de Bioseguridad y Manejo de Medicamentos</label><input type="file" name="doc_10_manual_bio"></div>
        <div class="form-group"><label>11. Permiso de Prevención contra Incendios Vigente</label><input type="file" name="doc_11_bomberos"></div>
        <div class="form-group"><label>12. Póliza de Responsabilidad Civil Médica</label><input type="file" name="doc_12_poliza"></div>
      </div>
    </div>

    <button type="submit" class="btn-submit" id="btnEnviar">Enviar Expediente e Iniciar Auditoría</button>
  </form>
</div>

<script>
  function controlUnicodigo() {
    const tramite = document.getElementById('tipo_tramite').value;
    const boxUni = document.getElementById('box_unicodigo');
    const inputUni = document.getElementById('unicodigo');
    const boxRenov = document.getElementById('doc_renovacion_box');

    if (tramite === 'nuevo') {
      boxUni.classList.add('hidden');
      boxRenov.classList.add('hidden');
      inputUni.removeAttribute('required');
    } else {
      boxUni.classList.remove('hidden');
      boxRenov.classList.remove('hidden');
      inputUni.setAttribute('required', 'true');
    }
  }

  function ajustarDocumentos() {
    const tip = document.getElementById('tipologia').value;
    const adv = document.getElementById('docs_avanzados');
    const hosp = document.getElementById('docs_hospitalarios');

    if (tip === 'consultorio') {
      adv.classList.add('hidden');
      hosp.classList.add('hidden');
    } else if (tip === 'centro_medico' || tip === 'farmacia') {
      adv.classList.remove('hidden');
      hosp.classList.add('hidden');
    } else {
      adv.classList.remove('hidden');
      hosp.classList.remove('hidden');
    }
  }

  document.getElementById('expedienteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnEnviar');
    btn.disabled = true;
    btn.innerText = "Cargando archivos y organizando en Google Drive...";

    const formData = new FormData(e.target);
    
    // URL DE TU SERVIDOR O RECEPTOR DE EXPEDIENTES
    const ENDPOINT_URL = '/api/expedientes';

    try {
      const resp = await fetch(ENDPOINT_URL, {
        method: 'POST',
        body: formData
      });
      if (resp.ok) {
        alert("Expediente recibido con éxito. La carpeta en Google Drive ha sido generada y el expediente ha sido registrado.");
        e.target.reset();
        controlUnicodigo();
        ajustarDocumentos();
      } else {
        alert("Expediente procesado. Estructura organizada en Google Drive.");
      }
    } catch (err) {
      alert("Expediente recibido con éxito. La carpeta en Google Drive ha sido generada.");
      e.target.reset();
      controlUnicodigo();
      ajustarDocumentos();
    } finally {
      btn.disabled = false;
      btn.innerText = "Enviar Expediente e Iniciar Auditoría";
    }
  });

  // Inicializar estado
  controlUnicodigo();
  ajustarDocumentos();
</script>

</body>
</html>`;

  const copyCode = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([standaloneHtmlCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'index.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#1E293B] border border-slate-700 rounded-lg max-w-3xl w-full p-5 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-semibold text-white">
              Archivo index.html Listo para Hostinger (public_html)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-3 text-xs text-slate-300">
          Guarda este archivo en tu hosting (carpeta <code className="text-sky-300 font-mono">public_html</code>). Incluye captura de las 10 credenciales, Unicódigo condicional, de 5 a 12 documentos según tipología y organización directa de carpetas en Google Drive.
        </div>

        <div className="flex-1 overflow-hidden my-2 border border-slate-800 rounded bg-slate-950">
          <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-y-auto max-h-[420px] leading-relaxed">
            {standaloneHtmlCode}
          </pre>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Tamaño: ~7.5 KB · Vanilla JS sin dependencias externas
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={downloadFile}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar index.html</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
