import { mockFlights } from './database';

export interface ParseResult {
  output: string;
  isError: boolean;
}

export const parseCommand = (input: string): ParseResult => {
  const cmd = input.toUpperCase().trim();

  const availabilityRegex = /^A(\d{2}[A-Z]{3})([A-Z]{3})([A-Z]{3})(?:\/([A-Z]{2}))?$/;
  const match = cmd.match(availabilityRegex);

  if (match) {
    const [, date, dep, arr, airline] = match;
    
    const results = mockFlights.filter(f => 
      f.date === date && 
      f.departureCity === dep && 
      f.arrivalCity === arr && 
      (!airline || f.airlineCode === airline)
    );

    if (results.length === 0) {
      return { output: 'NO DIRECT FLIGHTS', isError: false };
    }

    const dayOfWeek = results[0].dayOfWeek;
    const header = `** GALILEO AVAILABILITY ** ${dayOfWeek} ${date} ${dep}${arr}\n`;
    
    const rows = results.map((f, i) => {
      const lineNum = i + 1;
      const airlineCode = f.airlineCode;
      const flightNum = f.flightNumber.replace(airlineCode, '').trim();
      
      // Formatting to match Galileo precision
      // 1  SQ 447  Y9 B9 M9 H9 W9 Q9 DAC SIN 2350 0550+1 781 E 0
      return `${lineNum}  ${airlineCode} ${flightNum.padStart(3, ' ')}  ${f.classes.padEnd(25, ' ')} ${dep}${arr} ${f.departureTime} ${f.arrivalTime.padEnd(7, ' ')} ${f.aircraftType} E 0`;
    }).join('\n');

    return { output: header + rows, isError: false };
  }

  if (cmd === 'CLEAR') return { output: '', isError: false };

  return { output: 'INVALID COMMAND', isError: true };
};
