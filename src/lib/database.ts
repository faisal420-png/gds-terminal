export interface Flight {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  aircraftType: string;
  date: string;
  departureCity: string;
  arrivalCity: string;
  airlineCode: string;
}

export const mockFlights: Flight[] = [
  {
    flightNumber: 'SQ447',
    departureTime: '23:50',
    arrivalTime: '05:50+1',
    aircraftType: 'B787-10',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ'
  },
  {
    flightNumber: 'SQ449',
    departureTime: '12:50',
    arrivalTime: '18:50',
    aircraftType: 'A350-900',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ'
  },
  {
    flightNumber: 'SQ441',
    departureTime: '08:00',
    arrivalTime: '14:00',
    aircraftType: 'B777-300ER',
    date: '10DEC',
    departureCity: 'DAC',
    arrivalCity: 'SIN',
    airlineCode: 'SQ'
  }
];
