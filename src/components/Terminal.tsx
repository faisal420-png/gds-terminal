'use client';

import React, { useState, useEffect, useRef } from 'react';
import HistoryLine from './HistoryLine';
import CommandLine from './CommandLine';
import { parseCommand } from '@/lib/parser';

interface HistoryEntry {
  id: string;
  input: string;
  output: string;
  isError: boolean;
}

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault();
        setHistory([]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleExecute = (input: string) => {
    const { output, isError } = parseCommand(input);
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      input,
      output,
      isError,
    };
    setHistory((prev) => [...prev, newEntry]);
  };

  return (
    <div className="terminal-container font-mono">
      {/* Main Terminal Window */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
      >
        {history.map((entry) => (
          <HistoryLine key={entry.id} {...entry} />
        ))}
        {/* Active Input Line */}
        <CommandLine onExecute={handleExecute} />
      </div>
    </div>
  );
};

export default Terminal;
