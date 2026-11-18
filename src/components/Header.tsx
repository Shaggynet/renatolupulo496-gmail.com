import React, { useState } from 'react';
import { Share2, Check, ShieldCheck, FolderUp, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNewExpediente: () => void;
  onOpenExportHtml: () => void;
  onTriggerCronCycle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyClientLink = () => {
    // Current public URL or default shared link
    const currentUrl = window.location.origin;
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#040C1E]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18 py-2">
          {/* Zone 1: Brand Wordmark & Elegant Corporate Logo */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-white p-1 shadow-md border border-slate-700/60 flex items-center justify-center shrink-0">
              <img 
                src="/assets/aistudio/Logo_1x1_d0f68eff.png" 
                alt="Aprobación 360" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white whitespace-nowrap leading-tight">
                APROBACIÓN <span className="text-emerald-400">360</span>
              </span>
              <span className="text-[10px] font-bold text-sky-400 tracking-wider whitespace-nowrap uppercase">
                Ambiente, Salud y Seguridad
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean, Uncluttered) */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('formulario')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'formulario' 
                  ? 'border-emerald-400 text-white font-bold' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderUp className="w-4 h-4 text-emerald-400" />
              <span>Portal de Carga</span>
            </button>

            <button
              onClick={() => setActiveTab('matriz')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'matriz' 
                  ? 'border-emerald-400 text-white font-bold' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Matriz de Control</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action (Direct Link to Share with Clients) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyClientLink}
              title="Copiar link para enviar a clientes y que suban sus documentos"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-100 bg-[#0B2545] hover:bg-[#0E325D] border border-sky-500/40 rounded-lg transition-all shadow-sm"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Link Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-sky-400" />
                  <span>Copiar Link para Clientes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
