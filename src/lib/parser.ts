import { mockFlights, Flight } from './database';

export interface ParseResult {
  output: string;
  isError: boolean;
}

export const parseCommand = (input: string): ParseResult => {
  const cmd = input.toUpperCase().trim();

  // Handle Clear Window (though typically handled by UI state)
  if (cmd === 'CLEAR') {
    return { output: '', isError: false };
  }

  // Handle Availability: A[Date][Dep][Arr]*[AirlineCode]
  // Example: A10DECDACSIN*SQ
  const availabilityRegex = /^A(\d{2}[A-Z]{3})([A-Z]{3})([A-Z]{3})\*([A-Z]{2})$/;
  const match = cmd.match(availabilityRegex);

  if (match) {
    const [, date, dep, arr, airline] = match;
    
    const results = mockFlights.filter(f => 
      f.date === date && 
      f.departureCity === dep && 
      f.arrivalCity === arr && 
      f.airlineCode === airline
    );

    if (results.length === 0) {
      return { output: 'NO DIRECT FLIGHTS', isError: false };
    }

    const header = `** AVAILABILITY ${date} ${dep}${arr} **\n\n`;
    const rows = results.map((f, i) => {
      return `${i + 1}  ${f.airlineCode}${f.flightNumber.replace(f.airlineCode, '')}  ${f.departureTime}  ${f.arrivalTime}  ${f.aircraftType}`;
    }).join('\n');

    return { output: header + rows, isError: false };
  }

  return { output: 'INVALID COMMAND', isError: true };
};
