export interface Flight {
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
  terminalDep?: string;
  terminalArr?: string;
}

export const mockFlights: Flight[] = [
  // 10DEC (FRIDAY)
  { flightNumber: 'SQ447', departureTime: '2350', arrivalTime: '0550+1', aircraftType: '781', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'SIN', airlineCode: 'SQ', classes: 'Y9 B9 M9 H9 W9 Q9', stops: 0, terminalDep: '2', terminalArr: '3' },
  { flightNumber: 'SQ449', departureTime: '1250', arrivalTime: '1850', aircraftType: '359', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'SIN', airlineCode: 'SQ', classes: 'Y7 B5 M4 H2 W0 Q0', stops: 0, terminalDep: '2', terminalArr: '3' },
  { flightNumber: 'EK585', departureTime: '0100', arrivalTime: '0430', aircraftType: '77W', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'DXB', airlineCode: 'EK', classes: 'J9 C9 Y9 B9 M9 H9', stops: 0, terminalDep: '1', terminalArr: '3' },
  { flightNumber: 'BG201', departureTime: '1030', arrivalTime: '1615', aircraftType: '789', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'LHR', airlineCode: 'BG', classes: 'C4 J2 Y9 B9 M9 H9', stops: 0, terminalDep: '2', terminalArr: '4' },
  { flightNumber: 'TG322', departureTime: '1335', arrivalTime: '1700', aircraftType: '359', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'BKK', airlineCode: 'TG', classes: 'C9 Y9 B9 M9 H9 W9', stops: 0, terminalDep: '2', terminalArr: 'M' },
  { flightNumber: 'BS213', departureTime: '1140', arrivalTime: '1510', aircraftType: '73H', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'BKK', airlineCode: 'BS', classes: 'Y9 B9 M9 H9 W9 Q9', stops: 0, terminalDep: '2', terminalArr: 'I' },
  { flightNumber: 'BA012', departureTime: '2320', arrivalTime: '0535+1', aircraftType: '388', date: '10DEC', dayOfWeek: 'FR', departureCity: 'SIN', arrivalCity: 'LHR', airlineCode: 'BA', classes: 'F4 J9 C9 W9 Y9 B9', stops: 0, terminalDep: '1', terminalArr: '5' },
  { flightNumber: 'QR641', departureTime: '1940', arrivalTime: '2250', aircraftType: '77W', date: '10DEC', dayOfWeek: 'FR', departureCity: 'DAC', arrivalCity: 'DOH', airlineCode: 'QR', classes: 'J9 C9 Y9 B9 M9 H9', stops: 0, terminalDep: '2', terminalArr: 'H' },

  // 11DEC (SATURDAY)
  { flightNumber: 'SQ447', departureTime: '2350', arrivalTime: '0550+1', aircraftType: '781', date: '11DEC', dayOfWeek: 'SA', departureCity: 'DAC', arrivalCity: 'SIN', airlineCode: 'SQ', classes: 'Y9 B9 M9 H9 W9 Q9', stops: 0, terminalDep: '2', terminalArr: '3' },
  { flightNumber: 'EK587', departureTime: '1915', arrivalTime: '2245', aircraftType: '77W', date: '11DEC', dayOfWeek: 'SA', departureCity: 'DAC', arrivalCity: 'DXB', airlineCode: 'EK', classes: 'J9 C9 Y9 B9 M9 H9', stops: 0, terminalDep: '1', terminalArr: '3' },
  { flightNumber: 'BG201', departureTime: '1030', arrivalTime: '1615', aircraftType: '789', date: '11DEC', dayOfWeek: 'SA', departureCity: 'DAC', arrivalCity: 'LHR', airlineCode: 'BG', classes: 'C9 J9 Y9 B9 M9 H9', stops: 0, terminalDep: '2', terminalArr: '4' }
];
