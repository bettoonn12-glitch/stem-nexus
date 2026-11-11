import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Clock, Calculator, Zap, Cpu, Compass } from 'lucide-react';
import { Challenge, UserAnswerRecord } from '../types';
import { sound } from '../utils/audio';
import { Language } from '../utils/i18n';
import { getChallengeTitle, getChallengeSubtitle, getChallengeQuestion } from '../utils/languageHelpers';

interface Props {
  challenge: Challenge;
  record?: UserAnswerRecord;
  onOpen: () => void;
  lang?: Language;
}

export const ChallengeCard: React.FC<Props> = ({ challenge, record, onOpen, lang = 'en' }) => {
  const isCompleted = !!record;
  const isCorrect = record?.isCorrect ?? false;

  const subjectIcon =
    challenge.subject === 'math' ? <Calculator className="w-4 h-4 text-purple-300" /> :
    challenge.subject === 'science' ? <Zap className="w-4 h-4 text-emerald-300" /> :
    challenge.subject === 'ict' ? <Cpu className="w-4 h-4 text-cyan-300" /> :
    <Compass className="w-4 h-4 text-amber-300" />;

  const subjectColor =
    challenge.subject === 'math' ? 'text-purple-300' :
    challenge.subject === 'science' ? 'text-emerald-300' :
    challenge.subject === 'ict' ? 'text-cyan-300' : 'text-amber-300';

  const badgeBg =
    challenge.subject === 'math' ? 'bg-purple-950/60 border-purple-400/40' :
    challenge.subject === 'science' ? 'bg-emerald-950/60 border-emerald-400/40' :
    challenge.subject === 'ict' ? 'bg-cyan-950/60 border-cyan-400/40' : 'bg-amber-950/60 border-amber-400/40';

  const subjectName =
    challenge.subject === 'math' ? (lang === 'id' ? 'Matematika' : 'Mathematics') :
    challenge.subject === 'science' ? (lang === 'id' ? 'Sains / IPA' : 'Science') :
    challenge.subject === 'ict' ? (lang === 'id' ? 'Informatika' : 'Technology') :
    (lang === 'id' ? 'Misi Terpadu' : 'Grand Quest');

  const titleText = getChallengeTitle(challenge, lang);
  const subtitleText = getChallengeSubtitle(challenge, lang);
  const questionText = getChallengeQuestion(challenge, lang);

  return (
    <div
      onClick={() => {
        sound.playClick();
        onOpen();
      }}
      className={`group relative rounded-3xl p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 font-game select-none border-2 shadow-xl ${
        isCompleted
          ? isCorrect
            ? 'bg-gradient-to-br from-[#0c3928]/90 via-[#0a4733]/80 to-[#103577]/90 border-emerald-400 shadow-[0_4px_16px_rgba(16,185,129,0.3)]'
            : 'bg-gradient-to-br from-[#451020]/90 via-[#3a1525]/80 to-[#103577]/90 border-rose-400 shadow-[0_4px_16px_rgba(244,63,94,0.3)]'
          : 'aero-window bg-[#103577]/85 hover:bg-[#15428f] border-[#6ec3ff] hover:scale-[1.02]'
      }`}
    >
      <div className="space-y-2.5">
        {/* Header Metadata */}
        <div className="flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${badgeBg}`}>
            {subjectIcon}
            <span className={`font-black ${subjectColor}`}>{subjectName}</span>
            <span className="text-white/40">·</span>
            <span className="text-blue-200 text-[11px]">{challenge.difficulty}</span>
          </div>

          <div className="font-mono text-yellow-300 font-extrabold text-xs bg-blue-950/80 px-2 py-0.5 rounded-lg border border-yellow-400/40 shadow">
            +{challenge.points} pts
          </div>
        </div>

        {/* Card Title & Subtitle in Selected Language */}
        <div>
          <h3 className="text-base font-extrabold text-white group-hover:text-cyan-200 transition-colors drop-shadow leading-snug">
            {titleText}
          </h3>
          <p className="text-[11px] text-blue-200 mt-1 line-clamp-2 leading-relaxed">
            {subtitleText}
          </p>
        </div>

        {/* Question snippet in Selected Language */}
        <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-400/30 text-xs text-slate-200 line-clamp-2">
          {questionText}
        </div>
      </div>

      {/* Card Footer: Status & Action */}
      <div className="flex items-center justify-between pt-2 border-t border-blue-400/30 text-xs">
        {isCompleted ? (
          isCorrect ? (
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{lang === 'id' ? `Selesai (+${record.scoreAwarded} poin)` : `Solved (+${record.scoreAwarded} pts)`}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-300 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{lang === 'id' ? 'Perlu Diulang' : 'Needs Revision'}</span>
            </div>
          )
        ) : (
          <div className="flex items-center gap-1.5 text-sky-200">
            <Clock className="w-3.5 h-3.5 text-cyan-300" />
            <span>{lang === 'id' ? 'Siap Dikerjakan' : 'Ready to Play'}</span>
          </div>
        )}

        <div className="flex items-center gap-1 text-yellow-300 font-bold group-hover:translate-x-0.5 transition-transform">
          <span>{isCompleted ? (lang === 'id' ? 'Tinjau' : 'Review') : (lang === 'id' ? 'Mulai' : 'Play')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
