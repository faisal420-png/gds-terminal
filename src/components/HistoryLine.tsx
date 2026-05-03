import React from 'react';

interface HistoryLineProps {
  input: string;
  output: string;
  isError?: boolean;
}

const HistoryLine: React.FC<HistoryLineProps> = ({ input, output, isError }) => {
  const formatGalileoOutput = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Color class counts: Green if > 0, Grey if 0
      const parts = line.split(/([A-Z][0-9]\s?)/);
      return (
        <div key={i} className="whitespace-pre min-h-[1.2em]">
          {parts.map((part, j) => {
            if (/^[A-Z][0-9]\s?$/.test(part)) {
              const count = parseInt(part.substring(1));
              const colorClass = count > 0 ? 'text-[#00FF00]' : 'text-zinc-500';
              return <span key={j} className={colorClass}>{part}</span>;
            }
            return <span key={j}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="mb-4 font-mono text-[14px]">
      <div className="text-white flex items-center gap-1">
        <span>{'>'}</span>
        <span className="uppercase">{input}</span>
      </div>
      <div className={`mt-1 ${isError ? 'text-red-500' : 'text-white'}`}>
        {formatGalileoOutput(output)}
      </div>
    </div>
  );
};

export default HistoryLine;
