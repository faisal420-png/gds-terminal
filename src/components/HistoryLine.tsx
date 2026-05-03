import React from 'react';

interface HistoryLineProps {
  input: string;
  output: string;
  isError?: boolean;
}

const HistoryLine: React.FC<HistoryLineProps> = ({ input, output, isError }) => {
  return (
    <div className="mb-6 font-mono animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-zinc-500 mb-1 flex items-center gap-2">
        <span className="text-emerald-500 font-bold">{'>'}</span>
        <span className="tracking-widest uppercase">{input}</span>
      </div>
      <div className={`whitespace-pre-wrap leading-relaxed ${isError ? 'text-red-400' : 'text-zinc-100'}`}>
        {output}
      </div>
    </div>
  );
};

export default HistoryLine;
