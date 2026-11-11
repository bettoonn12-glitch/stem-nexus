import React, { useState } from 'react';
import { X, Minus, Square, Calculator as CalcIcon } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorAppModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    sound.playClick();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    sound.playClick();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    sound.playClick();
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    sound.playClick();
    setDisplay('0');
  };

  const handleBackspace = () => {
    sound.playClick();
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOperator = (op: string) => {
    sound.playClick();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue;
      let result = current;
      if (operation === '+') result = current + inputValue;
      else if (operation === '-') result = current - inputValue;
      else if (operation === '×' || operation === '*') result = current * inputValue;
      else if (operation === '÷' || operation === '/') result = inputValue !== 0 ? current / inputValue : 0;
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(op);
  };

  const handleEquals = () => {
    sound.playClick();
    const inputValue = parseFloat(display);
    if (prevValue !== null && operation) {
      let result = prevValue;
      if (operation === '+') result = prevValue + inputValue;
      else if (operation === '-') result = prevValue - inputValue;
      else if (operation === '×' || operation === '*') result = prevValue * inputValue;
      else if (operation === '÷' || operation === '/') result = inputValue !== 0 ? prevValue / inputValue : 0;
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleSqrt = () => {
    sound.playClick();
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
      setWaitingForOperand(true);
    }
  };

  const handlePercent = () => {
    sound.playClick();
    const val = parseFloat(display);
    setDisplay(String(val / 100));
    setWaitingForOperand(true);
  };

  const handleInvert = () => {
    sound.playClick();
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(1 / val));
      setWaitingForOperand(true);
    }
  };

  const handleToggleSign = () => {
    sound.playClick();
    const val = parseFloat(display);
    setDisplay(String(-val));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs select-none">
      <div className="w-72 bg-[#ece9d8] border-2 border-[#0055ea] rounded-t-lg shadow-2xl overflow-hidden font-sans text-xs">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#0058e6] via-[#2484f2] to-[#0058e6] px-3 py-1.5 flex items-center justify-between text-white shadow-inner">
          <div className="flex items-center gap-1.5 font-bold tracking-wide">
            <CalcIcon className="w-3.5 h-3.5 text-yellow-300" />
            <span>Kalkulator STEM</span>
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
        <div className="bg-[#ece9d8] border-b border-[#aca899] px-2 py-0.5 text-slate-800 flex gap-3 text-[11px]">
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
        </div>

        {/* Main Body */}
        <div className="p-2.5 space-y-2">
          {/* Display */}
          <div className="bg-white border-2 border-inset border-[#7f9db9] p-2 text-right font-mono text-xl font-bold text-slate-900 overflow-x-auto shadow-inner rounded-xs">
            {display}
          </div>

          {/* Top buttons: Backspace, CE, C */}
          <div className="flex gap-1.5">
            <div className="w-12 h-6 border border-[#aca899] bg-[#d4d0c8] flex items-center justify-center font-bold text-red-700 text-[10px] shadow-xs">
              {memory !== 0 ? 'M' : ''}
            </div>
            <button
              type="button"
              onClick={handleBackspace}
              className="flex-1 h-6 bg-[#f0ede4] hover:bg-white active:bg-[#dcd8ce] border border-[#7f9db9] text-blue-900 font-bold rounded-xs shadow-xs"
            >
              Backspace
            </button>
            <button
              type="button"
              onClick={handleClearEntry}
              className="w-12 h-6 bg-[#f0ede4] hover:bg-white active:bg-[#dcd8ce] border border-[#7f9db9] text-red-700 font-bold rounded-xs shadow-xs"
            >
              CE
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-12 h-6 bg-[#f0ede4] hover:bg-white active:bg-[#dcd8ce] border border-[#7f9db9] text-red-700 font-bold rounded-xs shadow-xs"
            >
              C
            </button>
          </div>

          {/* Memory and Keypad Grid */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {/* Row 1 */}
            <button
              type="button"
              onClick={() => { setMemory(0); sound.playClick(); }}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold"
            >
              MC
            </button>
            <button
              type="button"
              onClick={() => handleDigit('7')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => handleDigit('8')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => handleDigit('9')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              9
            </button>
            <button
              type="button"
              onClick={() => handleOperator('÷')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold text-sm"
            >
              /
            </button>

            {/* Row 2 */}
            <button
              type="button"
              onClick={() => { setDisplay(String(memory)); setWaitingForOperand(true); sound.playClick(); }}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold"
            >
              MR
            </button>
            <button
              type="button"
              onClick={() => handleDigit('4')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => handleDigit('5')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => handleDigit('6')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => handleOperator('×')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold text-sm"
            >
              *
            </button>

            {/* Row 3 */}
            <button
              type="button"
              onClick={() => { setMemory(parseFloat(display)); sound.playClick(); }}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold"
            >
              MS
            </button>
            <button
              type="button"
              onClick={() => handleDigit('1')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => handleDigit('2')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => handleDigit('3')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => handleOperator('-')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold text-sm"
            >
              -
            </button>

            {/* Row 4 */}
            <button
              type="button"
              onClick={() => { setMemory(memory + parseFloat(display)); sound.playClick(); }}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold"
            >
              M+
            </button>
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleToggleSign}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-xs"
            >
              +/-
            </button>
            <button
              type="button"
              onClick={handleDecimal}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-950 font-bold text-sm"
            >
              .
            </button>
            <button
              type="button"
              onClick={() => handleOperator('+')}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-red-700 font-bold text-sm"
            >
              +
            </button>
          </div>

          {/* Row 5: Equals & scientific helpers */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleSqrt}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-900 font-bold text-xs"
            >
              sqrt
            </button>
            <button
              type="button"
              onClick={handlePercent}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-900 font-bold text-xs"
            >
              %
            </button>
            <button
              type="button"
              onClick={handleInvert}
              className="h-7 bg-[#f0ede4] hover:bg-white border border-[#7f9db9] text-blue-900 font-bold text-xs"
            >
              1/x
            </button>
            <button
              type="button"
              onClick={handleEquals}
              className="h-7 bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] hover:from-blue-500 hover:to-blue-700 text-white font-bold text-base shadow border border-blue-900"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
