import React from 'react';
import { X, Award, Sparkles, Heart, Users, Star, Code2, Cpu, Gamepad2, BrainCircuit } from 'lucide-react';
import { sound } from '../../utils/audio';
import { Language } from '../../utils/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export const CreditsModal: React.FC<Props> = ({ isOpen, onClose, lang = 'id' }) => {
  if (!isOpen) return null;

  const teamMembers = [
    {
      name: 'Derren Oktoviano',
      roleEn: 'Leader of the project',
      roleId: 'Pemimpin Proyek STEM Nexus',
      badge: '⭐ Project Leader',
      avatarBg: 'from-amber-400 to-orange-500',
    },
    {
      name: 'Muhammad Ahnaf Fayyan Satyawira',
      roleEn: 'Member',
      roleId: 'Anggota Tim Pengembang',
      badge: '⚡ Member',
      avatarBg: 'from-cyan-400 to-blue-600',
    },
    {
      name: 'Khavendra Kenzie',
      roleEn: 'Member',
      roleId: 'Anggota Tim Pengembang',
      badge: '🎮 Member',
      avatarBg: 'from-emerald-400 to-teal-600',
    },
    {
      name: 'Lleyton Firdaus .S',
      roleEn: 'Member',
      roleId: 'Anggota Tim Pengembang',
      badge: '💻 Member',
      avatarBg: 'from-purple-400 to-indigo-600',
    },
    {
      name: 'Athaya Pradipta Arsineo',
      roleEn: 'Member',
      roleId: 'Anggota Tim Pengembang',
      badge: '📚 Member',
      avatarBg: 'from-rose-400 to-pink-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-gradient-to-b from-[#143d83] via-[#0d2a5c] to-[#071738] border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.4)] rounded-3xl overflow-hidden font-game text-white">
        {/* Retro XP Title Bar */}
        <div className="bg-gradient-to-r from-[#174899] via-[#2060c5] to-[#3a8ef5] px-4 py-2.5 border-b-2 border-white/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 border border-white/40 flex items-center justify-center shadow">
              <Users className="w-4 h-4 text-cyan-200" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-wide">
                {lang === 'id' ? 'TIM PENGEMBANG STEM NEXUS' : 'STEM NEXUS DEVELOPMENT TEAM'}
              </h3>
              <p className="text-[10px] text-cyan-200 font-mono">
                {lang === 'id' ? 'Kredit Pembuat Aplikasi' : 'App Creators & Engineering Credits'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-lg bg-rose-600 hover:bg-rose-500 border border-rose-300 text-white flex items-center justify-center text-xs font-bold shadow cursor-pointer active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
          {/* Header Banner */}
          <div className="text-center bg-gradient-to-r from-blue-950/80 via-indigo-900/50 to-blue-950/80 p-4 rounded-2xl border border-cyan-500/40 shadow-inner">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>STEM NEXUS CREATORS</span>
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <h2 className="text-lg font-black text-yellow-300 drop-shadow">
              {lang === 'id' ? 'Dibuat & Dikembangkan Oleh:' : 'Created & Engineered By:'}
            </h2>
            <p className="text-xs text-cyan-200 mt-1 max-w-md mx-auto">
              {lang === 'id'
                ? 'Platform kuis dan game edukasi interaktif untuk siswa SD Kelas 1 hingga SMP Kelas 9.'
                : 'Interactive educational quiz and minigame platform for students from SD Grade 1 to SMP Grade 9.'}
            </p>
          </div>

          {/* Members List */}
          <div className="space-y-2.5">
            {teamMembers.map((member, idx) => (
              <div
                key={member.name}
                className="bg-slate-900/80 hover:bg-slate-900 border border-blue-400/30 hover:border-cyan-400 p-3 rounded-2xl flex items-center justify-between gap-3 transition-all shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-slate-950 font-black text-sm shadow border border-white/50 shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {lang === 'id' ? member.roleId : member.roleEn}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-950 text-amber-300 border border-amber-400/40 shadow-xs">
                    {member.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Special Dedication Note */}
          <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse shrink-0" />
            <span>
              {lang === 'id'
                ? 'Dipersembahkan untuk pembelajaran sains, matematika, dan teknologi yang menyenangkan bagi anak-anak Indonesia!'
                : 'Dedicated to making Science, Technology, and Math fun and accessible for young learners!'}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-blue-400/30 flex items-center justify-between text-xs font-mono text-cyan-300">
          <span>STEM Nexus • Windows Aero v2.6</span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black font-game text-xs shadow active:scale-95 cursor-pointer border border-blue-400"
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
