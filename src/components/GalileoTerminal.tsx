'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * ◈ MOCK DATABASE
 */
interface Flight {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  aircraftType: string;
  date: string;
  dayOfWeek: string;
  departureCity: string;
  arrivalCity: string;
  airlineCode: string;
  classes: string;
  stops: number;
}

const MOCK_DATABASE: Flight[] = [
  { flightNumber: 'SQ447', departureTime: '2350', arrivalTime: '0550+1', aircraftType: '781', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'SIN', airlineCode: 'SQ', classes: 'Y9 B9 M9 H9 W9 Q9', stops: 0 },
  { flightNumber: 'SQ449', departureTime: '1250', arrivalTime: '1850', aircraftType: '359', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'SIN', airlineCode: 'SQ', classes: 'Y7 B5 M4 H2 W0 Q0', stops: 0 },
  { flightNumber: 'EK585', departureTime: '0100', arrivalTime: '0430', aircraftType: '77W', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'DXB', airlineCode: 'EK', classes: 'J9 C9 Y9 B9 M9 H9', stops: 0 },
  { flightNumber: 'BG201', departureTime: '1030', arrivalTime: '1615', aircraftType: '789', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'LHR', airlineCode: 'BG', classes: 'C4 J2 Y9 B9 M9 H9', stops: 0 },
  { flightNumber: 'TG322', departureTime: '1335', arrivalTime: '1700', aircraftType: '359', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'BKK', airlineCode: 'TG', classes: 'C9 Y9 B9 M9 H9 W9', stops: 0 },
  { flightNumber: 'BA012', departureTime: '2320', arrivalTime: '0535+1', aircraftType: '388', date: '10DEC', dayOfWeek: 'FR', departureCity: 'SIN', arrivalCity: 'LHR', airlineCode: 'BA', classes: 'F4 J9 C9 W9 Y9 B9', stops: 0 },
];

/**
 * ◈ COMMAND PARSER
 */
const parseCommand = (input: string) => {
  const cmd = input.toUpperCase().trim();
  
  // Galileo Availability: A[Date][Origin][Destination] or A[Date][Origin][Destination]*[Airline]
  // Fixed: Uses * modifier and allows alphanumeric airline codes
  const availabilityRegex = /^A(\d{2}[A-Z]{3})([A-Z]{3})([A-Z]{3})(?:\*([A-Z0-9]{2}))?$/;
  const match = cmd.match(availabilityRegex);

  if (match) {
    const [, date, dep, arr, airline] = match;
    const results = MOCK_DATABASE.filter(f => 
      f.date === date && 
      f.departureCity === dep && 
      f.arrivalCity === arr && 
      (!airline || f.airlineCode === airline)
    );

    if (results.length === 0) return { output: 'NO DIRECT FLIGHTS', isError: false };

    const header = `** GALILEO AVAILABILITY ** ${results[0].dayOfWeek} ${date} ${dep}${arr}\n`;
    const rows = results.map((f, i) => {
      const flightNum = f.flightNumber.replace(f.airlineCode, '').padStart(3, ' ');
      return `${i + 1}  ${f.airlineCode} ${flightNum}  ${f.classes.padEnd(25, ' ')} ${dep}${arr} ${f.departureTime} ${f.arrivalTime.padEnd(7, ' ')} ${f.aircraftType} E 0`;
    }).join('\n');

    return { output: header + rows, isError: false };
  }
  return cmd === 'CLEAR' ? { output: '', isError: false } : { output: 'INVALID COMMAND', isError: true };
};

/**
 * ◈ HISTORY LINE COMPONENT
 */
const HistoryLine = ({ input, output, isError }: { input: string, output: string, isError: boolean }) => {
  const formatOutput = (text: string) => {
    return text.split('\n').map((line, i) => (
      <div key={i} className="whitespace-pre min-h-[1.2em]">
        {line.split(/([A-Z][0-9]\s?)/).map((part, j) => {
          if (/^[A-Z][0-9]\s?$/.test(part)) {
            const count = parseInt(part.substring(1));
            return <span key={j} className={count > 0 ? 'text-[#00FF00]' : 'text-zinc-500'}>{part}</span>;
          }
          return <span key={j}>{part}</span>;
        })}
      </div>
    ));
  };

  return (
    <div className="mb-4 font-mono text-[14px]">
      <div className="text-white flex items-center gap-1">
        <span>{'>'}</span><span className="uppercase">{input}</span>
      </div>
      <div className={`mt-1 ${isError ? 'text-red-500' : 'text-white'}`}>
        {formatOutput(output)}
      </div>
    </div>
  );
};

/**
 * ◈ GALILEO TERMINAL MAIN COMPONENT
 */
export default function GalileoTerminal() {
  const [history, setHistory] = useState<{id: string, input: string, output: string, isError: boolean}[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'w') { e.preventDefault(); setHistory([]); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const { output, isError } = parseCommand(input);
    setHistory([...history, { id: Date.now().toString(), input, output, isError }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-[#000033] text-white font-mono p-4 flex flex-col overflow-hidden selection:bg-white/20">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {history.map(entry => <HistoryLine key={entry.id} {...entry} />)}
        <form onSubmit={handleExecute} className="flex items-center gap-1">
          <span>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white uppercase caret-white"
            spellCheck={false}
            autoComplete="off"
            autoFocus
            onBlur={() => setTimeout(() => inputRef.current?.focus(), 10)}
          />
        </form>
      </div>
    </div>
  );
}
