export interface Flight {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  aircraftType: string;
  date: string;
  departureCity: string;
  arrivalCity: string;
  airlineCode: string;
  classes: string; // e.g. "Y9 B9 M9 H9 W9 Q9"
}

export const mockFlights: Flight[] = [
  {
    flightNumber: 'SQ447',
    departureTime: '2350',
    arrivalTime: '0550+1',
    aircraftType: '781',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ',
    classes: 'Y9 B9 M9 H9 W9 Q9'
  },
  {
    flightNumber: 'SQ449',
    departureTime: '1250',
    arrivalTime: '1850',
    aircraftType: '359',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ',
    classes: 'Y9 B9 M9 H9 W9 Q9'
  },
  {
    flightNumber: 'SQ441',
    departureTime: '0800',
    arrivalTime: '1400',
    aircraftType: '77W',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ',
    classes: 'Y9 B9 M9 H9 W9 Q9'
  }
];
