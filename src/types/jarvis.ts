export type TramiteType = 'nuevo' | 'renovacion' | 'modificacion';

export type TipologiaType = 'consultorio' | 'centro_medico' | 'farmacia' | 'hospital';

export type StatusLevel = 'rojo' | 'amarillo' | 'verde';

export interface CredentialVault {
  user_sri?: string;
  pass_sri?: string;
  user_acess?: string;
  pass_acess?: string;
  user_engris?: string;
  pass_engris?: string;
  user_muni?: string;
  pass_muni?: string;
  user_sas?: string;
  pass_sas?: string;
}

export interface DocumentAttachment {
  key: string;
  name: string;
  file?: File | { name: string; size: number; type: string };
  uploadedAt?: string;
  required: boolean;
  minTipologia: TipologiaType[];
}

export interface Establishment {
  id: string;
  razonSocial: string;
  ruc: string;
  unicodigo: string;
  tipoTramite: TramiteType;
  tipologia: TipologiaType;
  perfil: string;
  tramiteRef: string;
  docDocx: boolean;
  docPng: boolean;
  entregaTelegram: boolean;
  entregaCorreo: boolean;
  reenvioPendiente: boolean;
  estadoRevision: 'CRÍTICA' | 'PRÓXIMA' | 'AL DÍA';
  colorEstado: StatusLevel;
  fechaInspeccion: string;
  diasRestantes: number;
  accionRequerida: string;
  observacionesPortal: string;
  credentials?: CredentialVault;
  docsUploadedCount?: number;
  fechaCreacion: string;
  driveFolderLink?: string;
}

export interface TelegramBotMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isImage?: boolean;
  imageUrl?: string;
  buttons?: string[];
}

export interface JarvisConfig {
  modo: 'excel' | 'saccs' | 'ambos';
  excel_file: string;
  sheet_name: string;
  generar_docx: boolean;
  generar_png: boolean;
  enviar_adjuntos: boolean;
  dias_aviso_vigencia: number;
  telegram_enviar_imagen: boolean;
  correo_activo: boolean;
  admin_chat_id: string;
  telegram_token_masked: string;
}

export interface SaccsVaultItem {
  id: string;
  tramiteKey: string;
  nombreTitular: string;
  usuarioRuc: string;
  passwordPlain: string;
  encryptedPasswordB64: string;
  status: 'VIGENTE' | 'ACTUALIZAR' | 'EXPIRADA';
  lastSync: string;
  notes?: string;
  unicodigo?: string;
}

export interface AcessNotificationData {
  profesional: {
    nombre: string;
    razonSocial: string;
  };
  tramite: {
    numeroSolicitud: string;
    codigoTramite: string;
    tipoPermiso: string;
  };
  establecimiento: {
    tipoServicio: string;
    denominacion: string;
  };
  estatus: {
    estado: string;
    observacionClave: string;
    accionPendiente: string;
  };
}
