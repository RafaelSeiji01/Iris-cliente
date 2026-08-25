// FrontEnd/src/pages/Ajustes.jsx
import React, { useState } from 'react';
import { Settings, Bell, Shield, UserCheck, Save, Check } from 'lucide-react';

export default function Ajustes() {
  const [salvo, setSalvo] = useState(false);
  const [config, setConfig] = useState({
    sensibilidade: 'moderada', // alta, moderada, baixa
    notificarWhatsApp: true,
    notificarEmail: false,
    nomeCuidador: 'Dra. Maria Helena (Neurologista)',
    telefoneEmergencia: '(11) 98765-4321',
    emailContato: 'dra.helena@clinica.com.br',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl space-y-6 pb-12">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#1a334d]">
          Ajustes do Sistema
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configurações de telemetria e perfil de monitoramento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Card 1: Sensibilidade de Monitoramento */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e8f5ee] text-[#2d8653] flex items-center justify-center">
              <Shield size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a334d]">Sensibilidade de Alertas</h3>
              <p className="text-[11px] text-slate-400">Define o limiar para gerar notificações de atenção</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { id: 'alta', label: 'Alta', desc: 'Score < 80' },
              { id: 'moderada', label: 'Moderada', desc: 'Score < 75' },
              { id: 'baixa', label: 'Baixa', desc: 'Score < 60' },
            ].map((opcao) => {
              const ativo = config.sensibilidade === opcao.id;
              return (
                <button
                  key={opcao.id}
                  type="button"
                  onClick={() => setConfig({ ...config, sensibilidade: opcao.id })}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    ativo
                      ? 'border-[#1a334d] bg-[#1a334d] text-white shadow-sm'
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{opcao.label}</span>
                  <span className={`block text-[10px] mt-0.5 ${ativo ? 'text-slate-200' : 'text-slate-400'}`}>
                    {opcao.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card 2: Contato Médico / Cuidador Responsável */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-[#1a334d] flex items-center justify-center">
              <UserCheck size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a334d]">Contato de Referência</h3>
              <p className="text-[11px] text-slate-400">Profissional ou familiar responsável pelo acompanhamento</p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#1a334d] mb-1">
                Nome do Responsável / Médico
              </label>
              <input
                type="text"
                value={config.nomeCuidador}
                onChange={(e) => setConfig({ ...config, nomeCuidador: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#1a334d] focus:outline-none focus:border-[#1a334d]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1a334d] mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  value={config.telefoneEmergencia}
                  onChange={(e) => setConfig({ ...config, telefoneEmergencia: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#1a334d] focus:outline-none focus:border-[#1a334d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a334d] mb-1">
                  E-mail para Relatórios
                </label>
                <input
                  type="email"
                  value={config.emailContato}
                  onChange={(e) => setConfig({ ...config, emailContato: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#1a334d] focus:outline-none focus:border-[#1a334d]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Canais de Notificação */}
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#d97706] flex items-center justify-center">
              <Bell size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a334d]">Notificações Automáticas</h3>
              <p className="text-[11px] text-slate-400">Onde receber alertas de desvios comportamentais</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="text-xs font-bold text-[#1a334d]">Disparar alerta via WhatsApp</span>
              <input
                type="checkbox"
                checked={config.notificarWhatsApp}
                onChange={(e) => setConfig({ ...config, notificarWhatsApp: e.target.checked })}
                className="w-4 h-4 accent-[#1a334d] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <span className="text-xs font-bold text-[#1a334d]">Enviar relatório semanal por E-mail</span>
              <input
                type="checkbox"
                checked={config.notificarEmail}
                onChange={(e) => setConfig({ ...config, notificarEmail: e.target.checked })}
                className="w-4 h-4 accent-[#1a334d] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1a334d] hover:bg-[#122436] text-white rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            {salvo ? (
              <>
                <Check size={16} className="text-emerald-400" />
                Configurações Salvas!
              </>
            ) : (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}