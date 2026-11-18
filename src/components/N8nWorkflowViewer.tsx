import React, { useState } from 'react';
import { 
  Network, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  FolderArchive, 
  Bot, 
  FileCode, 
  Workflow, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { N8N_WORKFLOW_JSON } from '../data/initialData';

export const N8nWorkflowViewer: React.FC = () => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState<'diagram' | 'json' | 'setup'>('diagram');

  // Test Runner State
  const [testRuc, setTestRuc] = useState('1792451928001');
  const [testUnicodigo, setTestUnicodigo] = useState('17D01-001234');
  const [testRazonSocial, setTestRazonSocial] = useState('Consultorio Odontológico Sonrisas');
  const [testTipologia, setTestTipologia] = useState('consultorio');
  const [testTramite, setTestTramite] = useState('renovacion');

  const safeRazon = testRazonSocial.replace(/[^a-zA-Z0-9_-]/g, '_');
  const simulatedFolderName = `${testRuc}_${testUnicodigo}_${safeRazon}`;

  const copyWorkflowJson = () => {
    navigator.clipboard.writeText(JSON.stringify(N8N_WORKFLOW_JSON, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-sky-400 mb-1">
            <span>Flujo n8n Automatizado</span>
            <span aria-hidden="true">·</span>
            <span>Google Drive API v3</span>
            <span aria-hidden="true">·</span>
            <span>Telegram Bot API</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Flujo n8n · Auditoría ACESS & Drive
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Recibe el expediente del formulario web, estructura la carpeta en Google Drive y dispara la alerta administrativa en Telegram.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyWorkflowJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded transition-colors whitespace-nowrap shadow-sm"
          >
            {copiedJson ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJson ? '¡JSON Copiado!' : 'Copiar JSON para Importar en n8n'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 mb-6 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('diagram')}
          className={`px-3 py-1.5 rounded font-medium transition-colors ${
            activeTab === 'diagram' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Diagrama del Pipeline (4 Nodos)
        </button>
        <button
          onClick={() => setActiveTab('setup')}
          className={`px-3 py-1.5 rounded font-medium transition-colors ${
            activeTab === 'setup' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Guía de Activación en 3 Pasos
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`px-3 py-1.5 rounded font-medium transition-colors ${
            activeTab === 'json' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Código JSON de n8n
        </button>
      </div>

      {activeTab === 'diagram' && (
        <div className="space-y-6">
          {/* Visual Pipeline Nodes */}
          <div className="p-6 rounded-lg bg-[#1E293B]/60 border border-slate-800">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Arquitectura del Pipeline en n8n
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Node 1 */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-sky-400 uppercase">Nodo 1 · Webhook</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Webhook_Formulario</h4>
                  <p className="text-xs text-slate-400">
                    Endpoint HTTP POST <code className="text-sky-300 font-mono text-[11px]">/expedientes-acess</code> que recibe FormData y archivos multipart.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Método: POST · onReceived
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase">Nodo 2 · Code JS</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Parsear_Expediente</h4>
                  <p className="text-xs text-slate-400">
                    Estandariza el nombre de la carpeta: <code className="text-amber-300 font-mono text-[10px]">RUC_UNICODIGO_RAZONSOCIAL</code> y extrae los 10 accesos.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Nodos JS v2 · Metadata sanitization
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">Nodo 3 · Google Drive</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Crear_Carpeta_Drive</h4>
                  <p className="text-xs text-slate-400">
                    Crea la carpeta en la cuenta vinculada de Google Drive y retorna el <code className="text-emerald-300 font-mono text-[10px]">webViewLink</code> público/autorizado.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                  OAuth2 Google Workspace
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-sky-400 uppercase">Nodo 4 · Telegram</span>
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Notificacion_JARVIS</h4>
                  <p className="text-xs text-slate-400">
                    Envía mensaje Markdown estructurado al <code className="text-sky-300 font-mono text-[10px]">admin_chat_id</code> con claves y enlace a Drive.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                  Telegram Bot API v1.1
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Nomenclator & Telegram Message Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Folder Name Preview */}
            <div className="p-5 rounded-lg bg-[#1E293B]/70 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FolderArchive className="w-4 h-4 text-emerald-400" />
                <span>Estandarización de Carpeta Google Drive</span>
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Regla institucional: <code className="text-slate-200 font-mono">{'${ruc}_${unicodigo}_${razonSocial}'}</code>
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">RUC:</label>
                  <input
                    type="text"
                    value={testRuc}
                    onChange={(e) => setTestRuc(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Unicódigo:</label>
                  <input
                    type="text"
                    value={testUnicodigo}
                    onChange={(e) => setTestUnicodigo(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Razón Social:</label>
                  <input
                    type="text"
                    value={testRazonSocial}
                    onChange={(e) => setTestRazonSocial(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded text-slate-100"
                  />
                </div>

                <div className="p-3 rounded bg-slate-950 border border-slate-800 mt-2">
                  <div className="text-[10px] text-slate-400 uppercase">Nombre final generado:</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 break-all mt-0.5">
                    {simulatedFolderName}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Telegram Notification */}
            <div className="p-5 rounded-lg bg-[#1E293B]/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-sky-400" />
                  <span>Alerta Disparada a Telegram</span>
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  Resultado formateado en Markdown enviado al administrador de JARVIS:
                </p>

                <div className="p-3.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line">
                  🚀 <strong className="text-white">NUEVO EXPEDIENTE REGISTRADO EN JARVIS</strong>
                  {'\n\n'}
                  🏢 <strong>Establecimiento:</strong> {testRazonSocial}
                  {'\n'}
                  📌 <strong>RUC:</strong> <code className="text-sky-300">{testRuc}</code>
                  {'\n'}
                  🔢 <strong>Unicódigo:</strong> <code className="text-sky-300">{testUnicodigo}</code>
                  {'\n'}
                  📋 <strong>Trámite:</strong> {testTramite} | <strong>Tipología:</strong> {testTipologia}
                  {'\n'}
                  📁 <strong>Documentos Adjuntos:</strong> 8
                  {'\n\n'}
                  🔑 <strong>Bóveda de Credenciales Ingresadas:</strong>
                  {'\n'}• <strong>SRI:</strong> {testRuc} / ClaveSri_Secure*
                  {'\n'}• <strong>ACESS:</strong> sonrisas_med / Acess2026!
                  {'\n'}• <strong>ENGRIS:</strong> bomberos_88 / EngrisPass#
                  {'\n'}• <strong>Municipio:</strong> patente_179 / MuniUio$
                  {'\n'}• <strong>SAS:</strong> sas_sociedades / SuperCias!
                  {'\n\n'}
                  📂 <strong>Acceso Directo a Carpeta Google Drive:</strong>
                  {'\n'}
                  <span className="text-emerald-400 underline">
                    https://drive.google.com/drive/folders/{simulatedFolderName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'setup' && (
        <div className="space-y-4 p-6 rounded-lg bg-[#1E293B]/70 border border-slate-800 text-xs text-slate-300">
          <h3 className="text-sm font-bold text-white mb-3">
            Pasos de Activación Inmediata en n8n & Hostinger
          </h3>

          <div className="space-y-4">
            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-sky-400 mb-1">1. En tu servidor o panel n8n:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                <li>Ve a <strong>Credentials</strong> y vincula tu cuenta de <strong>Google Drive OAuth2</strong> y tu bot de Telegram (con el token del bot entregado por @BotFather).</li>
                <li>Haz clic en <strong>Workflows &gt; Import from JSON</strong> y pega el código JSON de la pestaña siguiente.</li>
                <li>Abre el nodo <strong>Notificacion_JARVIS_Telegram</strong> y cambia <code className="font-mono text-sky-300">-100XXXXXXXXXX</code> por tu <code className="font-mono text-sky-300">admin_chat_id</code> real.</li>
                <li>Activa el interruptor a <strong>Active</strong> en la esquina superior derecha del workflow.</li>
                <li>Copia la URL de producción del webhook (ej: <code className="font-mono text-emerald-300">https://tu-dominio-n8n/webhook/expedientes-acess</code>).</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-sky-400 mb-1">2. En tu hosting de Hostinger:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                <li>Abre tu Administrador de Archivos en Hostinger y dirígete a la carpeta <code className="font-mono text-sky-300">public_html</code>.</li>
                <li>Sube o edita el archivo <code className="font-mono text-sky-300">index.html</code>.</li>
                <li>Reemplaza la constante <code className="font-mono text-amber-300">WEBHOOK_N8N = 'http://localhost:5678/webhook/expedientes-acess'</code> con tu URL de producción copiada de n8n.</li>
                <li>Guarda los cambios.</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-slate-900 border border-slate-800">
              <div className="font-semibold text-sky-400 mb-1">3. Verificación de Flujo Completo:</div>
              <p className="text-slate-300">
                Cada vez que un establecimiento o cliente llene el formulario desde tu sitio web, la carpeta se creará de forma instantánea en Google Drive y el reporte administrativo con accesos y enlaces directos llegará a tu Telegram en menos de 2 segundos.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'json' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Pega este JSON directamente en n8n mediante <strong>Import from JSON</strong>
            </span>
            <button
              onClick={copyWorkflowJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded transition-colors"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? '¡Copiado!' : 'Copiar JSON'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-sky-300 overflow-x-auto max-h-[480px]">
            {JSON.stringify(N8N_WORKFLOW_JSON, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
