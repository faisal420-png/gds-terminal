import { mockFlights } from './database';

export interface ParseResult {
  output: string;
  isError: boolean;
  rawResults?: any[];
}

export const parseCommand = (input: string): ParseResult => {
  const cmd = input.toUpperCase().trim();

  // Galileo Availability: A[Date][Origin][Destination] or A[Date][Origin][Destination]/[Airline]
  // Example: A10DECDACSIN or A10DECDACSIN/SQ
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

    // Galileo header style
    const header = `${date} ${dep}${arr}\n`;
    
    // Formatting rows for Galileo
    // 1  SQ 447  Y9 B9 M9 H9 W9 Q9 DAC SIN 2350 0550+1 781 0
    const rows = results.map((f, i) => {
      const lineNum = i + 1;
      const airlineCode = f.airlineCode;
      const flightNum = f.flightNumber.replace(airlineCode, '').trim();
      
      return `${lineNum}  ${airlineCode} ${flightNum.padStart(3, ' ')}  ${f.classes} ${dep}${arr} ${f.departureTime} ${f.arrivalTime} ${f.aircraftType} 0`;
    }).join('\n');

    return { output: header + rows, isError: false, rawResults: results };
  }

  if (cmd === 'CLEAR') return { output: '', isError: false };

  return { output: 'INVALID COMMAND', isError: true };
};
