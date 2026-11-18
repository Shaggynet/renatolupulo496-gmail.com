import React, { useState } from 'react';
import { 
  Building2, 
  KeyRound, 
  FileUp, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Send, 
  FolderArchive, 
  ExternalLink,
  Layers,
  FileCheck,
  ShieldCheck,
  Image as ImageIcon,
  FolderTree,
  Folder,
  FileText,
  Copy,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UploadCloud
} from 'lucide-react';
import { TramiteType, TipologiaType, Establishment } from '../types/jarvis';

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
  previewUrl?: string;
  folderCategory: '01_DOCUMENTOS_LEGALES' | '02_PLANOS_Y_FOTOGRAFIAS' | '03_RESOLUCIONES_ACESS' | '04_SACCS_EXPEDIENTES';
  uploadedAt: string;
}

interface ExpedienteFormProps {
  onExpedienteCreated: (newEst: Establishment) => void;
  onOpenHtmlModal: () => void;
}

export const ExpedienteForm: React.FC<ExpedienteFormProps> = ({
  onExpedienteCreated
}) => {
  // Form State
  const [tipoTramite, setTipoTramite] = useState<TramiteType>('renovacion');
  const [unicodigo, setUnicodigo] = useState('17D02-005678');
  const [ruc, setRuc] = useState('1793148902001');
  const [razonSocial, setRazonSocial] = useState('Centro Quirúrgico & Dental Metropolitano');
  const [tipologia, setTipologia] = useState<TipologiaType>('centro_medico');

  // Credenciales State
  const [includeCredentials, setIncludeCredentials] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);
  const [userSri, setUserSri] = useState('1793148902001');
  const [passSri, setPassSri] = useState('ClaveSri_2026*');
  const [userAcess, setUserAcess] = useState('metropolitano_uio');
  const [passAcess, setPassAcess] = useState('Acess_Pass4491!');
  const [userEngris, setUserEngris] = useState('bomberos_engris_88');
  const [passEngris, setPassEngris] = useState('Bomberos2026#');
  const [userMuni, setUserMuni] = useState('uio_patente_metro');
  const [passMuni, setPassMuni] = useState('QuitoPatente99$');
  const [userSas, setUserSas] = useState('sas_metroquirurgico');
  const [passSas, setPassSas] = useState('SuperCias2026!');

  // Documentos cargados (con soporte nativo para imágenes y PDFs)
  const [filesMap, setFilesMap] = useState<Record<string, UploadedFileItem>>({
    doc_01_cedula: { 
      id: 'doc-1',
      name: 'Cedula_Representante_Legal.pdf', 
      size: '1.4 MB', 
      type: 'pdf',
      folderCategory: '01_DOCUMENTOS_LEGALES',
      uploadedAt: 'Hoy'
    },
    doc_02_mercantil: { 
      id: 'doc-2',
      name: 'Nombramiento_Representante_SAS.pdf', 
      size: '2.1 MB', 
      type: 'pdf',
      folderCategory: '01_DOCUMENTOS_LEGALES',
      uploadedAt: 'Hoy'
    },
    doc_03_iess: { 
      id: 'doc-3',
      name: 'Planilla_IESS_Personal.pdf', 
      size: '820 KB', 
      type: 'pdf',
      folderCategory: '01_DOCUMENTOS_LEGALES',
      uploadedAt: 'Hoy'
    },
    doc_04_permiso_anterior: { 
      id: 'doc-4',
      name: 'Permiso_ACESS_2025_Anterior.pdf', 
      size: '1.1 MB', 
      type: 'pdf',
      folderCategory: '03_RESOLUCIONES_ACESS',
      uploadedAt: 'Hoy'
    },
    doc_05_cartera_servicios: { 
      id: 'doc-5',
      name: 'Cartera_Servicios_Acreditados.pdf', 
      size: '3.4 MB', 
      type: 'pdf',
      folderCategory: '03_RESOLUCIONES_ACESS',
      uploadedAt: 'Hoy'
    },
    doc_06_plano: { 
      id: 'doc-6',
      name: 'Plano_Arquitectonico_Distribucion.png', 
      size: '4.2 MB', 
      type: 'image',
      previewUrl: '/assets/aistudio/Logo_1x1_d0f68eff.png',
      folderCategory: '02_PLANOS_Y_FOTOGRAFIAS',
      uploadedAt: 'Hoy'
    },
  });

  // Fotografías cargadas por el usuario
  const [photoGallery, setPhotoGallery] = useState<UploadedFileItem[]>([
    {
      id: 'photo-1',
      name: 'Foto_Fachada_Establecimiento.png',
      size: '3.2 MB',
      type: 'image',
      previewUrl: '/assets/aistudio/Logo_1x1_d0f68eff.png',
      folderCategory: '02_PLANOS_Y_FOTOGRAFIAS',
      uploadedAt: 'Hoy'
    }
  ]);

  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Success State
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    folderName: string;
    unicodigoAceptado: string;
    driveLink: string;
    establishment: Establishment;
    telegramPreview: string;
  }>(null);

  // Calculated Folder Name & Accepted Unicódigo
  const safeRazonSocial = (razonSocial || 'ESTABLECIMIENTO').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  const computedUnicodigo = tipoTramite === 'nuevo' 
    ? `U-${(ruc ? ruc.slice(0, 10) : '1790000000')}-2026` 
    : (unicodigo || '17D01-000000');
  const currentFolderName = `${ruc || '1790000000001'}_${computedUnicodigo}_${safeRazonSocial}`;

  // Handle requirement file upload
  const handleRequirementFileChange = (
    key: string,
    folderCategory: '01_DOCUMENTOS_LEGALES' | '02_PLANOS_Y_FOTOGRAFIAS' | '03_RESOLUCIONES_ACESS' | '04_SACCS_EXPEDIENTES',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(file.name);
      const isPdf = file.type.includes('pdf') || /\.pdf$/i.test(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;
      const previewUrl = isImg ? URL.createObjectURL(file) : undefined;

      setFilesMap((prev) => ({
        ...prev,
        [key]: {
          id: `file-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: sizeStr,
          type: isImg ? 'image' : isPdf ? 'pdf' : 'doc',
          previewUrl,
          folderCategory,
          uploadedAt: 'Recién subido'
        },
      }));
    }
  };

  // Handle uploading photos into gallery
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos: UploadedFileItem[] = [];
      Array.from(e.target.files).forEach((file) => {
        const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/i.test(file.name);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        const sizeStr = file.size > 1024 * 1024 ? `${sizeMb} MB` : `${Math.round(file.size / 1024)} KB`;
        const previewUrl = isImg ? URL.createObjectURL(file) : undefined;

        newPhotos.push({
          id: `photo-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: sizeStr,
          type: 'image',
          previewUrl,
          folderCategory: '02_PLANOS_Y_FOTOGRAFIAS',
          uploadedAt: 'Recién subido'
        });
      });

      setPhotoGallery((prev) => [...prev, ...newPhotos]);
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotoGallery((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const folderName = currentFolderName;
    const acceptedCode = computedUnicodigo;
    const allFilesCount = Object.keys(filesMap).length + photoGallery.length;

    const summaryText = `📋 *APROBACIÓN 360 · EXPEDIENTE RECIBIDO*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🏢 *Establecimiento:* ${razonSocial}\n` +
      `🆔 *RUC:* ${ruc}\n` +
      `🔑 *Unicódigo Aceptado:* ${acceptedCode}\n` +
      `📑 *Tipo:* ${tipoTramite.toUpperCase()} (${tipologia.replace('_', ' ').toUpperCase()})\n` +
      `📁 *Carpeta Nativa Google Drive:* ${folderName}\n` +
      `📸 *Documentos y Fotos:* ${allFilesCount} archivos organizados\n` +
      `✅ *Estado:* CONVALIDADO PARA INSPECCIÓN ACESS`;

    try {
      const newEst: Establishment = {
        id: `est-${Date.now()}`,
        razonSocial,
        ruc,
        unicodigo: acceptedCode,
        tipoTramite,
        tipologia,
        perfil: tipologia === 'hospital' ? 'Hospital del Día / Clínica' : tipologia === 'farmacia' ? 'Farmacia' : tipologia === 'centro_medico' ? 'Centro Médico' : 'Consultorio Médico',
        tramiteRef: `SPF-${Math.floor(100000 + Math.random() * 900000)}`,
        docDocx: true,
        docPng: true,
        entregaTelegram: false,
        entregaCorreo: false,
        reenvioPendiente: false,
        estadoRevision: 'AL DÍA',
        colorEstado: 'verde',
        fechaInspeccion: '25/12/2026',
        diasRestantes: 52,
        accionRequerida: 'Expediente digital recibido con documentación completa.',
        observacionesPortal: 'Carpeta nativa en Google Drive creada y sincronizada con el portal.',
        docsUploadedCount: allFilesCount,
        fechaCreacion: new Date().toISOString().split('T')[0],
        driveFolderLink: `https://drive.google.com/drive/folders/${folderName}`,
        credentials: {
          user_sri: userSri,
          pass_sri: passSri,
          user_acess: userAcess,
          pass_acess: passAcess,
          user_engris: userEngris,
          pass_engris: passEngris,
          user_muni: userMuni,
          pass_muni: passMuni,
          user_sas: userSas,
          pass_sas: passSas,
        }
      };

      await new Promise((r) => setTimeout(r, 600));

      setSubmissionSuccess({
        folderName,
        unicodigoAceptado: acceptedCode,
        driveLink: `https://drive.google.com/drive/folders/${folderName}`,
        establishment: newEst,
        telegramPreview: summaryText
      });

      onExpedienteCreated(newEst);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group all files into native folders
  const allFilesList = [
    ...Object.values(filesMap),
    ...photoGallery
  ];

  const filesByFolder = {
    '01_DOCUMENTOS_LEGALES': allFilesList.filter(f => f.folderCategory === '01_DOCUMENTOS_LEGALES'),
    '02_PLANOS_Y_FOTOGRAFIAS': allFilesList.filter(f => f.folderCategory === '02_PLANOS_Y_FOTOGRAFIAS'),
    '03_RESOLUCIONES_ACESS': allFilesList.filter(f => f.folderCategory === '03_RESOLUCIONES_ACESS'),
    '04_SACCS_EXPEDIENTES': allFilesList.filter(f => f.folderCategory === '04_SACCS_EXPEDIENTES'),
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Editorial Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 tracking-wider uppercase mb-2">
          <span>Acreditación y Control Sanitario ACESS</span>
          <span aria-hidden="true" className="text-sky-500">·</span>
          <span className="text-sky-400">MSP Ecuador</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Carga de Expediente y Documentación
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-2.5 font-normal leading-relaxed">
          Ingresa los datos de tu establecimiento, adjunta los documentos y fotografías solicitadas. El sistema estructurará automáticamente tu carpeta nativa en Google Drive con la nomenclatura institucional.
        </p>
      </div>

      {/* Success Notification Box with Interactive Native Folder Tree */}
      {submissionSuccess && (
        <div className="mb-10 p-6 rounded-2xl bg-[#032215]/95 border-2 border-emerald-500/80 text-emerald-100 shadow-2xl backdrop-blur-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-white">
                  ¡Expediente Recibido y Carpeta Nativa Creada!
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-mono text-xs border border-emerald-500/60 font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UNICÓDIGO ACEPTADO: {submissionSuccess.unicodigoAceptado}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-200/90 mt-2">
                La carpeta con nomenclatura estandarizada <strong className="font-mono text-white bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40">{submissionSuccess.folderName}</strong> ha sido estructurada con éxito en Google Drive y registrada en la matriz de auditoría.
              </p>

              {/* Native Folder Tree Explorer */}
              <div className="mt-5 p-4 rounded-xl bg-[#020C1C]/95 border border-emerald-700/60 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <FolderTree className="w-4 h-4 text-emerald-400" />
                    <span>Estructura de Carpeta Nativa Generada:</span>
                  </span>
                  <span className="text-[11px] text-sky-400">{allFilesList.length} archivos organizados</span>
                </div>

                <div className="space-y-2.5">
                  <div className="text-white font-bold flex items-center gap-2">
                    <Folder className="w-4 h-4 text-sky-400" />
                    <span className="text-emerald-300">/{submissionSuccess.folderName}/</span>
                  </div>

                  {/* 01_DOCUMENTOS_LEGALES */}
                  <div className="pl-4 border-l border-slate-800 space-y-1">
                    <div className="text-sky-300 font-semibold flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-sky-400" />
                      <span>📁 01_DOCUMENTOS_LEGALES/</span>
                      <span className="text-[10px] text-slate-400">({filesByFolder['01_DOCUMENTOS_LEGALES'].length})</span>
                    </div>
                    {filesByFolder['01_DOCUMENTOS_LEGALES'].map((f) => (
                      <div key={f.id} className="pl-5 text-slate-300 flex items-center justify-between py-0.5">
                        <span className="flex items-center gap-1.5 truncate">
                          <FileText className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{f.size}</span>
                      </div>
                    ))}
                  </div>

                  {/* 02_PLANOS_Y_FOTOGRAFIAS */}
                  <div className="pl-4 border-l border-slate-800 space-y-1">
                    <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span>📁 02_PLANOS_Y_FOTOGRAFIAS/</span>
                      <span className="text-[10px] text-slate-400">({filesByFolder['02_PLANOS_Y_FOTOGRAFIAS'].length})</span>
                    </div>
                    {filesByFolder['02_PLANOS_Y_FOTOGRAFIAS'].map((f) => (
                      <div key={f.id} className="pl-5 text-slate-300 flex items-center justify-between py-0.5">
                        <span className="flex items-center gap-1.5 truncate">
                          <ImageIcon className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{f.size}</span>
                      </div>
                    ))}
                  </div>

                  {/* 03_RESOLUCIONES_ACESS */}
                  <div className="pl-4 border-l border-slate-800 space-y-1">
                    <div className="text-sky-300 font-semibold flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-sky-400" />
                      <span>📁 03_RESOLUCIONES_ACESS/</span>
                      <span className="text-[10px] text-slate-400">({filesByFolder['03_RESOLUCIONES_ACESS'].length})</span>
                    </div>
                    {filesByFolder['03_RESOLUCIONES_ACESS'].map((f) => (
                      <div key={f.id} className="pl-5 text-slate-300 flex items-center justify-between py-0.5">
                        <span className="flex items-center gap-1.5 truncate">
                          <FileText className="w-3 h-3 text-sky-400 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{f.size}</span>
                      </div>
                    ))}
                  </div>

                  {/* 04_SACCS_EXPEDIENTES */}
                  <div className="pl-4 border-l border-slate-800 space-y-1">
                    <div className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5 text-emerald-400" />
                      <span>📁 04_SACCS_EXPEDIENTES/</span>
                      <span className="text-[10px] text-slate-400">({filesByFolder['04_SACCS_EXPEDIENTES'].length})</span>
                    </div>
                    {filesByFolder['04_SACCS_EXPEDIENTES'].map((f) => (
                      <div key={f.id} className="pl-5 text-slate-300 flex items-center justify-between py-0.5">
                        <span className="flex items-center gap-1.5 truncate">
                          <FileText className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-2">{f.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={submissionSuccess.driveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg transition-all"
                >
                  <FolderArchive className="w-4 h-4" />
                  <span>Ver Carpeta en Google Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopyText(submissionSuccess.telegramPreview)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-[#002B49] hover:bg-[#003B64] text-sky-200 border border-sky-500/50 rounded-xl transition-all shadow-md"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copiado al portapapeles' : 'Copiar Resumen'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionSuccess(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:text-white transition-colors"
                >
                  Cargar otro expediente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Clean Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECCIÓN 1: Identificación del Establecimiento */}
        <section className="p-6 sm:p-7 rounded-2xl border border-sky-900/40 bg-[#071329]/85 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-800/60">
                01
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Identificación del Establecimiento</span>
              </h2>
            </div>
            <span className="text-xs text-sky-400 font-medium hidden sm:inline">
              Registro ACESS / MSP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                Tipo de Trámite Sanitario <span className="text-emerald-400">*</span>
              </label>
              <select
                value={tipoTramite}
                onChange={(e) => setTipoTramite(e.target.value as TramiteType)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-[#040C1D] border border-slate-700/80 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="nuevo">Nuevo Registro (Asignar Unicódigo)</option>
                <option value="renovacion">Renovación de Permiso Anual</option>
                <option value="modificacion">Cambio de Tipología / Modificación</option>
              </select>
            </div>

            {tipoTramite !== 'nuevo' ? (
              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1.5 flex items-center justify-between">
                  <span>Unicódigo Asignado <span className="text-emerald-400">*</span></span>
                  <span className="text-[11px] text-sky-400 font-mono font-semibold">Código SACCS</span>
                </label>
                <input
                  type="text"
                  value={unicodigo}
                  onChange={(e) => setUnicodigo(e.target.value)}
                  placeholder="Ej: 17D02-005678"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-[#040C1D] border border-slate-700/80 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center text-xs text-slate-300 bg-[#040C1D] p-3 rounded-xl border border-dashed border-emerald-800/60">
                <span className="font-semibold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Unicódigo Provisorio: {computedUnicodigo}</span>
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  Se convalidará con ACESS al inspeccionar los documentos.
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                RUC del Titular / Empresa (13 dígitos) <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                maxLength={13}
                required
                placeholder="179XXXXXXXX001"
                className="w-full px-3.5 py-2.5 text-sm bg-[#040C1D] border border-slate-700/80 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                Razón Social / Nombre Comercial <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                required
                placeholder="Ej: Clínica / Consultorio / Farmacia"
                className="w-full px-3.5 py-2.5 text-sm bg-[#040C1D] border border-slate-700/80 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
              Tipología Sanitaria del Establecimiento <span className="text-emerald-400">*</span>
            </label>
            <select
              value={tipologia}
              onChange={(e) => setTipologia(e.target.value as TipologiaType)}
              required
              className="w-full px-3.5 py-2.5 text-sm bg-[#040C1D] border border-slate-700/80 rounded-xl text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="consultorio">Consultorio Médico / Odontológico</option>
              <option value="centro_medico">Centro Médico / Especialidades / Policlínico</option>
              <option value="farmacia">Farmacia / Distribuidora de Medicamentos</option>
              <option value="hospital">Hospital del Día / Clínica Quirúrgica</option>
            </select>
          </div>

          {/* Carpeta Preview Bar */}
          <div className="mt-5 p-3.5 rounded-xl bg-[#002B49]/40 border border-sky-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <FolderArchive className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">Carpeta Nativa en Google Drive:</span>
              <strong className="text-emerald-300 font-mono">{currentFolderName}</strong>
            </div>
            <span className="text-[11px] text-sky-300 font-medium">
              Estructura Automática 360
            </span>
          </div>
        </section>

        {/* SECCIÓN 2: Bóveda Segura de Credenciales */}
        <section className="p-6 sm:p-7 rounded-2xl border border-sky-900/40 bg-[#071329]/85 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/70 px-2.5 py-1 rounded-md border border-sky-800/60">
                02
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-sky-400" />
                <span>Bóveda de Credenciales Institucionales</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIncludeCredentials(!includeCredentials)}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
              >
                {includeCredentials ? 'Ocultar campos' : 'Ver campos'}
                {includeCredentials ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="mb-4 text-xs text-slate-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Tus accesos institucionales quedan protegidos con cifrado y se almacenan en una bóveda segura con permisos restringidos exclusivamente al equipo de auditoría para la gestión del permiso.
            </span>
          </div>

          {includeCredentials && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="flex items-center gap-1.5 text-xs text-sky-300 hover:text-white transition-colors bg-[#002B49] px-3 py-1 rounded-lg border border-sky-500/40"
                >
                  {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPasswords ? 'Ocultar contraseñas' : 'Ver contraseñas'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. SRI */}
                <div className="p-3.5 rounded-xl bg-[#040C1D] border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 mb-2">1. SRI en Línea (RUC)</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userSri}
                      onChange={(e) => setUserSri(e.target.value)}
                      placeholder="Usuario / RUC"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={passSri}
                      onChange={(e) => setPassSri(e.target.value)}
                      placeholder="Clave SRI"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                {/* 2. ACESS */}
                <div className="p-3.5 rounded-xl bg-[#040C1D] border border-slate-800">
                  <div className="text-xs font-bold text-emerald-400 mb-2">2. ACESS / MSP (Sistema SACCS)</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userAcess}
                      onChange={(e) => setUserAcess(e.target.value)}
                      placeholder="Usuario ACESS"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={passAcess}
                      onChange={(e) => setPassAcess(e.target.value)}
                      placeholder="Clave ACESS"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                {/* 3. Bomberos */}
                <div className="p-3.5 rounded-xl bg-[#040C1D] border border-slate-800">
                  <div className="text-xs font-bold text-sky-400 mb-2">3. Bomberos (ENGRIS)</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userEngris}
                      onChange={(e) => setUserEngris(e.target.value)}
                      placeholder="Usuario ENGRIS"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={passEngris}
                      onChange={(e) => setPassEngris(e.target.value)}
                      placeholder="Clave Bomberos"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>

                {/* 4. Municipio */}
                <div className="p-3.5 rounded-xl bg-[#040C1D] border border-slate-800">
                  <div className="text-xs font-bold text-sky-400 mb-2">4. Patente Municipal</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userMuni}
                      onChange={(e) => setUserMuni(e.target.value)}
                      placeholder="Usuario Municipio"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={passMuni}
                      onChange={(e) => setPassMuni(e.target.value)}
                      placeholder="Clave Patente"
                      className="w-full px-3 py-1.5 text-xs bg-[#020713] border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECCIÓN 3: Documentación Normativa Requerida */}
        <section className="p-6 sm:p-7 rounded-2xl border border-sky-900/40 bg-[#071329]/85 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-1 rounded-md border border-emerald-800/60">
                03
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileUp className="w-5 h-5 text-emerald-400" />
                <span>Documentación Obligatoria (PDF / Documentos)</span>
              </h2>
            </div>
            <span className="text-xs text-emerald-400 font-bold font-mono">
              {Object.keys(filesMap).length} cargados
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Req 1: Cédula */}
            <div className="p-4 rounded-xl bg-[#040C1D] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <span>1. Cédula del Representante Legal o Titular</span>
                  <span className="text-emerald-400">*</span>
                </div>
                {filesMap.doc_01_cedula && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{filesMap.doc_01_cedula.name}</span>
                    <span className="text-slate-500">({filesMap.doc_01_cedula.size})</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleRequirementFileChange('doc_01_cedula', '01_DOCUMENTOS_LEGALES', e)}
                className="text-xs text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 hover:file:bg-emerald-500 file:text-white transition-colors cursor-pointer"
              />
            </div>

            {/* Req 2: Nombramiento SAS / Mercantil */}
            <div className="p-4 rounded-xl bg-[#040C1D] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <span>2. Nombramiento SAS o Registro Mercantil</span>
                </div>
                {filesMap.doc_02_mercantil && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{filesMap.doc_02_mercantil.name}</span>
                    <span className="text-slate-500">({filesMap.doc_02_mercantil.size})</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleRequirementFileChange('doc_02_mercantil', '01_DOCUMENTOS_LEGALES', e)}
                className="text-xs text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 hover:file:bg-emerald-500 file:text-white transition-colors cursor-pointer"
              />
            </div>

            {/* Req 3: IESS */}
            <div className="p-4 rounded-xl bg-[#040C1D] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <span>3. Planilla de Aportes al IESS o Declaración</span>
                </div>
                {filesMap.doc_03_iess && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{filesMap.doc_03_iess.name}</span>
                    <span className="text-slate-500">({filesMap.doc_03_iess.size})</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleRequirementFileChange('doc_03_iess', '01_DOCUMENTOS_LEGALES', e)}
                className="text-xs text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 hover:file:bg-emerald-500 file:text-white transition-colors cursor-pointer"
              />
            </div>

            {/* Req 4: Permiso Anterior */}
            {tipoTramite !== 'nuevo' && (
              <div className="p-4 rounded-xl bg-[#040C1D] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>4. Permiso Anterior de Funcionamiento ACESS</span>
                  </div>
                  {filesMap.doc_04_permiso_anterior && (
                    <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      <span>{filesMap.doc_04_permiso_anterior.name}</span>
                      <span className="text-slate-500">({filesMap.doc_04_permiso_anterior.size})</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleRequirementFileChange('doc_04_permiso_anterior', '03_RESOLUCIONES_ACESS', e)}
                  className="text-xs text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 hover:file:bg-emerald-500 file:text-white transition-colors cursor-pointer"
                />
              </div>
            )}

            {/* Req 5: Cartera de Servicios */}
            <div className="p-4 rounded-xl bg-[#040C1D] border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                  <span>5. Cartera de Servicios Médicos / Sanitaria</span>
                  <span className="text-emerald-400">*</span>
                </div>
                {filesMap.doc_05_cartera_servicios && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1 font-mono">
                    <FileCheck className="w-4 h-4 text-emerald-400" />
                    <span>{filesMap.doc_05_cartera_servicios.name}</span>
                    <span className="text-slate-500">({filesMap.doc_05_cartera_servicios.size})</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleRequirementFileChange('doc_05_cartera_servicios', '03_RESOLUCIONES_ACESS', e)}
                className="text-xs text-slate-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 hover:file:bg-emerald-500 file:text-white transition-colors cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: Fotografías del Establecimiento y Planos */}
        <section className="p-6 sm:p-7 rounded-2xl border border-emerald-900/40 bg-[#071329]/85 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/70 px-2.5 py-1 rounded-md border border-sky-800/60">
                04
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-sky-400" />
                <span>Fotografías del Establecimiento, Planos y Equipos</span>
              </h2>
            </div>
            <span className="text-xs text-sky-400 font-bold font-mono">
              {photoGallery.length} fotos cargadas
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-4">
            Sube las fotografías de la fachada, consultorio, áreas clínicas, autoclave o equipos médicos para la carpeta <code className="text-emerald-400 font-mono">02_PLANOS_Y_FOTOGRAFIAS/</code>:
          </p>

          {/* Photo Gallery Grid with Previews */}
          {photoGallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
              {photoGallery.map((photo) => (
                <div 
                  key={photo.id}
                  className="relative group rounded-xl bg-[#040C1D] border border-slate-700/80 overflow-hidden shadow-md flex flex-col"
                >
                  <div 
                    onClick={() => photo.previewUrl && setPreviewModalImage(photo.previewUrl)}
                    className="h-28 w-full bg-slate-950 overflow-hidden cursor-pointer flex items-center justify-center p-2 relative"
                    title="Click para agrandar fotografía"
                  >
                    {photo.previewUrl ? (
                      <img 
                        src={photo.previewUrl} 
                        alt={photo.name} 
                        className="h-full w-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-sky-400/50" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-medium">
                      Ver foto
                    </div>
                  </div>
                  <div className="p-2 text-xs flex items-center justify-between bg-[#071329] border-t border-slate-800">
                    <span className="truncate text-slate-200 text-[11px] font-mono" title={photo.name}>
                      {photo.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="text-slate-500 hover:text-red-400 p-0.5 transition-colors shrink-0 ml-1"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Drag & Drop Trigger */}
          <label className="border-2 border-dashed border-sky-800/60 hover:border-emerald-500/80 bg-[#040C1D]/60 hover:bg-[#040C1D] transition-colors rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer text-center">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-bold text-white hover:underline">
                Selecciona o arrastra imágenes y fotografías aquí
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Formatos permitidos: PNG, JPG, JPEG, WEBP. Se crearán miniaturas al instante.
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUploadPhotos}
              className="hidden"
            />
          </label>
        </section>

        {/* Action Button: Primary CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-sky-600 hover:from-emerald-500 hover:to-sky-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-xl text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Estructurando Carpeta Nativa y Notificando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Cargar Expediente y Generar Carpeta Nativa</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Image Preview Modal */}
      {previewModalImage && (
        <div 
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#040C1E] border border-sky-500/40 rounded-2xl max-w-3xl w-full p-4 overflow-hidden shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Previsualización de Fotografía</span>
              </span>
              <button
                type="button"
                onClick={() => setPreviewModalImage(null)}
                className="text-slate-400 hover:text-white px-2.5 py-1 text-xs rounded-lg bg-slate-800"
              >
                ✕ Cerrar
              </button>
            </div>
            <div className="flex items-center justify-center p-2 bg-[#020713] rounded-xl max-h-[75vh] overflow-auto">
              <img 
                src={previewModalImage} 
                alt="Documento cargado" 
                className="max-h-[65vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
