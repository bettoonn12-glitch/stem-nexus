import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Layers, Terminal } from 'lucide-react';
import { heroImage } from '../assets/images';

interface Props {
  onStartFirst: () => void;
  onQuickDemo: () => void;
  completedCount: number;
  totalCount: number;
}

export const HeroSection: React.FC<Props> = ({
  onStartFirst,
  onQuickDemo,
  completedCount,
  totalCount,
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0c142b] my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Mission Brief & Actions */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Cross-Disciplinary Learning Laboratory</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>v1.0 Demo Ready</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
              Solving Real-World Problems at the Intersection of Mathematics, Science & ICT
            </h1>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              STEM Nexus merges algebraic modeling, scientific cause-and-effect reasoning, and computational logic. Explore hands-on challenges with live interactive calculations, circuit diagrams, and instant step-by-step derivations.
            </p>
          </div>

          {/* Three Integrated Pillars */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-cyan-400 block">Mathematics</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Ratios, algebra, power models</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-amber-400 block">Science</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Circuits, pH, biology, energy</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 block">ICT Systems</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Binary, logic gates, bandwidth</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartFirst}
              className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 whitespace-nowrap"
            >
              <span>{completedCount === 0 ? 'Start Challenges' : 'Continue Learning'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onQuickDemo}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs md:text-sm rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              title="Loads realistic student answer sample data for immediate presentation demo"
            >
              Quick Presentation Demo Mode
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
          <img
            src={heroImage}
            alt="STEM Nexus Laboratory showing integrated math, science and computing systems"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c142b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0c142b] lg:via-transparent lg:to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-sm p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex justify-between items-center text-slate-400 text-[11px]">
              <span>Active Curriculum Challenges</span>
              <span className="font-mono text-cyan-300 font-bold tabular-nums">
                {completedCount} / {totalCount} Completed
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
