import React from 'react';

interface HistoryLineProps {
  input: string;
  output: string;
  isError?: boolean;
}

const HistoryLine: React.FC<HistoryLineProps> = ({ input, output, isError }) => {
  // Simple logic to color code classes in output (e.g. Y9 B9)
  // In a real app we'd parse this more precisely
  const formatGalileoOutput = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Color class counts like Y9 B9 etc. in green
      const parts = line.split(/([A-Z][0-9]\s?)/);
      return (
        <div key={i} className="whitespace-pre min-h-[1.2em]">
          {parts.map((part, j) => {
            if (/^[A-Z][0-9]\s?$/.test(part)) {
              return <span key={j} className="text-[#00FF00]">{part}</span>;
            }
            return <span key={j}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="mb-4 font-mono">
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
