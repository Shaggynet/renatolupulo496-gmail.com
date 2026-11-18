import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExpedienteForm } from './components/ExpedienteForm';
import { EstablecimientosMatrix } from './components/EstablecimientosMatrix';
import { HostingerHtmlModal } from './components/HostingerHtmlModal';
import { INITIAL_ESTABLISHMENTS } from './data/initialData';
import { Establishment } from './types/jarvis';
import { CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';

export default function App() {
  const [establishments, setEstablishments] = useState<Establishment[]>(INITIAL_ESTABLISHMENTS);
  const [activeTab, setActiveTab] = useState<string>('formulario');
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExpedienteCreated = (newEst: Establishment) => {
    setEstablishments((prev) => [newEst, ...prev]);
    showToast(`Expediente de ${newEst.razonSocial} procesado. Carpeta Google Drive generada.`);
  };

  const handleTriggerCronCycle = () => {
    setEstablishments((prev) =>
      prev.map((e) => ({
        ...e,
        docDocx: true,
        docPng: true,
      }))
    );
    showToast(`Matriz de control actualizada y sincronizada con el portal.`);
  };

  return (
    <div className="min-h-screen brand-backdrop text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white relative">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewExpediente={() => setActiveTab('formulario')}
        onOpenExportHtml={() => setIsHtmlModalOpen(true)}
        onTriggerCronCycle={handleTriggerCronCycle}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#002B49] border border-emerald-500/70 text-emerald-200 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-xs backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport */}
      <main className="flex-1 pb-16 relative z-10">
        {activeTab === 'formulario' && (
          <ExpedienteForm
            onExpedienteCreated={handleExpedienteCreated}
            onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
          />
        )}

        {activeTab === 'matriz' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <EstablecimientosMatrix
              establishments={establishments}
              onOpenNewExpediente={() => setActiveTab('formulario')}
              onRefreshData={handleTriggerCronCycle}
            />
          </div>
        )}
      </main>

      {/* Elegant Quiet Footer */}
      <footer className="border-t border-slate-800/60 bg-[#020713]/90 py-6 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md bg-white p-0.5 flex items-center justify-center shrink-0">
              <img 
                src="/assets/aistudio/Logo_1x1_d0f68eff.png" 
                alt="Aprobación 360" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white tracking-wide">APROBACIÓN 360</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">Ambiente, Salud y Seguridad</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>ACESS / MSP Ecuador</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Google Drive Nube Segura</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              onClick={() => setIsHtmlModalOpen(true)}
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Exportar para Hostinger
            </button>
          </div>
        </div>
      </footer>

      {/* Standalone Hostinger HTML Modal */}
      <HostingerHtmlModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
      />
    </div>
  );
}
