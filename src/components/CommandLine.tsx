import React, { useState, useEffect, useRef } from 'react';

interface CommandLineProps {
  onExecute: (cmd: string) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onExecute }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1 font-mono">
      <span className="text-white">{'>'}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-white uppercase caret-white"
        spellCheck={false}
        autoComplete="off"
        autoFocus
      />
    </form>
  );
};

export default CommandLine;
