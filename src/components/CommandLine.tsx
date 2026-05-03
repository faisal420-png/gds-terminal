import React, { useState, useEffect, useRef } from 'react';

interface CommandLineProps {
  onExecute: (cmd: string) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onExecute }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on load and keep it focused
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecute(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 font-mono">
      <span className="text-emerald-500 font-bold">{'>'}</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-zinc-100 uppercase tracking-widest placeholder:text-zinc-700"
        spellCheck={false}
        autoComplete="off"
        placeholder="ENTER COMMAND..."
      />
    </form>
  );
};

export default CommandLine;
