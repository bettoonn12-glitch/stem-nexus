import React, { useState } from 'react';
import { X, Minus, Square, FileText, Download, Copy, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotepadAppModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<string>(
    `=== CATATAN PENELITIAN STEM NEXUS ===\n` +
    `Kadet: STEM Explorer\n` +
    `Tanggal: 10 November 2026\n\n` +
    `[Rumus Sains & Matematika]:\n` +
    `1. Kecepatan (v) = s / t\n` +
    `2. Hukum Newton II: F = m × a\n` +
    `3. Luas Lingkaran: L = π × r²\n` +
    `4. Energi Kinetik: Ek = 0.5 × m × v²\n\n` +
    `[Trik Kuis]:\n` +
    `- Pada balap mobil, amati jalur A, B, C, D lalu tekan panah ATAS untuk akselerasi.\n` +
    `- Pada sepak bola, arahkan bola ke gawang jawaban yang benar!\n` +
    `- Pada basket, geser target bidikan langsung ke keranjang ring.\n`
  );
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playClick();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'stem_cadet_notes.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linesCount = content.split('\n').length;
  const charsCount = content.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-[#ece9d8] border-2 border-[#0055ea] rounded-t-lg shadow-2xl overflow-hidden font-sans text-xs flex flex-col h-[400px]">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#2484f2] to-[#0058e6] px-3 py-1.5 flex items-center justify-between text-white shadow-inner shrink-0">
          <div className="flex items-center gap-1.5 font-bold tracking-wide">
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>Notepad - Catatan Kadet STEM</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="w-4 h-4 rounded bg-[#0055ea] hover:bg-blue-400 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <button
              type="button"
              className="w-4 h-4 rounded bg-[#0055ea] hover:bg-blue-400 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <Square className="w-2 h-2" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-4 h-4 rounded bg-[#e81123] hover:bg-red-700 border border-white/60 flex items-center justify-center text-[10px]"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-[#ece9d8] border-b border-[#aca899] px-2 py-0.5 text-slate-800 flex items-center justify-between text-[11px] shrink-0">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setContent(''); sound.playClick(); }}
              className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer"
            >
              New
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3 h-3 inline" />
              Save As (.txt)
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600 inline" /> : <Copy className="w-3 h-3 inline" />}
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">UTF-8</span>
        </div>

        {/* Text Area */}
        <div className="flex-1 bg-white p-2 overflow-hidden flex flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 p-2 font-mono text-xs text-slate-900 border-none outline-none resize-none leading-relaxed selection:bg-blue-600 selection:text-white"
            placeholder="Tuliskan catatan, rumus matematika, atau kunci jawaban kuis kamu di sini..."
          />
        </div>

        {/* Status Bar */}
        <div className="bg-[#ece9d8] border-t border-[#aca899] px-3 py-1 flex items-center justify-between text-[11px] text-slate-600 font-mono shrink-0">
          <div className="flex items-center gap-4">
            <span>Baris: {linesCount}</span>
            <span>Karakter: {charsCount}</span>
          </div>
          <span>100% Windows (CRLF)</span>
        </div>
      </div>
    </div>
  );
};
