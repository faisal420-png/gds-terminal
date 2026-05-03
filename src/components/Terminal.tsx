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
    // Handle CTRL+W shortcut
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
    // Scroll to bottom on history change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleExecute = (input: string) => {
    const { output, isError } = parseCommand(input);
    const newEntry: HistoryEntry = {
      id: Math.random().toString(36).substr(2, 9),
      input,
      output,
      isError,
    };
    setHistory((prev) => [...prev, newEntry]);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-5xl mx-auto bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-medium">
          GDS Terminal v1.0.0 — System Ready
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Terminal History */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
      >
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-mono space-y-4 opacity-50">
            <div className="text-4xl">◈</div>
            <div className="text-xs tracking-widest text-center max-w-xs leading-relaxed uppercase">
              Enter command to begin<br/>
              <span className="text-[10px] opacity-60 mt-2 block">Shortcut: CTRL+W to clear</span>
            </div>
          </div>
        ) : (
          history.map((entry) => (
            <HistoryLine key={entry.id} {...entry} />
          ))
        )}
      </div>

      {/* Terminal Input */}
      <div className="p-6 bg-zinc-900/30 border-t border-zinc-800/50 backdrop-blur-md">
        <CommandLine onExecute={handleExecute} />
      </div>
    </div>
  );
};

export default Terminal;
