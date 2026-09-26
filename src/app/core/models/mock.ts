export type FlightStatus = 'Active' | 'Delayed' | 'Arrived';

// Leaflet uses coordinates in [latitude, longitude] order.
export type Coordinates = [number, number];

export interface Airport {
  code: string;
  name: string;
  city: string;
  coordinates: Coordinates;
}

export interface Flight {
  id: number;
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  status: FlightStatus;
  currentPosition: Coordinates;
  estimatedDepartureTime: string;
  estimatedArrivalTime: string;
}

export const AIRPORTS: Record<string, Airport> = {
  DEL: {
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    coordinates: [28.5562, 77.1]
  },
  BOM: {
    code: 'BOM',
    name: 'Chhatrapati Shivaji Maharaj International Airport',
    city: 'Mumbai',
    coordinates: [19.0896, 72.8656]
  },
  HYD: {
    code: 'HYD',
    name: 'Rajiv Gandhi International Airport',
    city: 'Hyderabad',
    coordinates: [17.2403, 78.4294]
  },
  BLR: {
    code: 'BLR',
    name: 'Kempegowda International Airport',
    city: 'Bengaluru',
    coordinates: [13.1986, 77.7066]
  },
  MAA: {
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    coordinates: [12.9941, 80.1709]
  },
  CCU: {
    code: 'CCU',
    name: 'Netaji Subhas Chandra Bose International Airport',
    city: 'Kolkata',
    coordinates: [22.6547, 88.4467]
  },
  AMD: {
    code: 'AMD',
    name: 'Sardar Vallabhbhai Patel International Airport',
    city: 'Ahmedabad',
    coordinates: [23.0772, 72.6347]
  },
  COK: {
    code: 'COK',
    name: 'Cochin International Airport',
    city: 'Kochi',
    coordinates: [10.152, 76.4019]
  }
};

// Fictional flight records for the assessment.
// Times are fixed ISO strings in UTC, indicated by "Z".
export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 1,
    flightNumber: 'AI 202',
    callsign: 'AIC202',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['DEL'],
    destination: AIRPORTS['BOM'],
    status: 'Active',
    currentPosition: [23.8, 75.1],
    estimatedDepartureTime: '2026-09-26T08:00:00Z',
    estimatedArrivalTime: '2026-09-26T10:15:00Z'
  },
  {
    id: 2,
    flightNumber: '6E 543',
    callsign: 'IGO543',
    aircraftType: 'Airbus A321',
    origin: AIRPORTS['HYD'],
    destination: AIRPORTS['BLR'],
    status: 'Active',
    currentPosition: [15.3, 78.1],
    estimatedDepartureTime: '2026-09-26T08:45:00Z',
    estimatedArrivalTime: '2026-09-26T09:55:00Z'
  },
  {
    id: 3,
    flightNumber: 'AI 804',
    callsign: 'AIC804',
    aircraftType: 'Boeing 787',
    origin: AIRPORTS['BLR'],
    destination: AIRPORTS['DEL'],
    status: 'Active',
    currentPosition: [20.5, 77.4],
    estimatedDepartureTime: '2026-09-26T07:45:00Z',
    estimatedArrivalTime: '2026-09-26T10:30:00Z'
  },
  {
    id: 4,
    flightNumber: '6E 321',
    callsign: 'IGO321',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['BOM'],
    destination: AIRPORTS['MAA'],
    status: 'Active',
    currentPosition: [16.2, 76.4],
    estimatedDepartureTime: '2026-09-26T08:15:00Z',
    estimatedArrivalTime: '2026-09-26T10:15:00Z'
  },
  {
    id: 5,
    flightNumber: 'SG 815',
    callsign: 'SEJ815',
    aircraftType: 'Boeing 737',
    origin: AIRPORTS['DEL'],
    destination: AIRPORTS['CCU'],
    status: 'Active',
    currentPosition: [25.7, 82.6],
    estimatedDepartureTime: '2026-09-26T08:10:00Z',
    estimatedArrivalTime: '2026-09-26T10:25:00Z'
  },
  {
    id: 6,
    flightNumber: 'AI 615',
    callsign: 'AIC615',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['BOM'],
    destination: AIRPORTS['HYD'],
    status: 'Active',
    currentPosition: [18.2, 75.8],
    estimatedDepartureTime: '2026-09-26T08:35:00Z',
    estimatedArrivalTime: '2026-09-26T10:00:00Z'
  },
  {
    id: 7,
    flightNumber: '6E 728',
    callsign: 'IGO728',
    aircraftType: 'Airbus A321',
    origin: AIRPORTS['CCU'],
    destination: AIRPORTS['BLR'],
    status: 'Active',
    currentPosition: [18.1, 83.2],
    estimatedDepartureTime: '2026-09-26T07:55:00Z',
    estimatedArrivalTime: '2026-09-26T10:25:00Z'
  },
  {
    id: 8,
    flightNumber: 'SG 420',
    callsign: 'SEJ420',
    aircraftType: 'Boeing 737',
    origin: AIRPORTS['AMD'],
    destination: AIRPORTS['DEL'],
    status: 'Active',
    currentPosition: [25.8, 74.9],
    estimatedDepartureTime: '2026-09-26T08:30:00Z',
    estimatedArrivalTime: '2026-09-26T10:05:00Z'
  },
  {
    id: 9,
    flightNumber: 'AI 509',
    callsign: 'AIC509',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['MAA'],
    destination: AIRPORTS['DEL'],
    status: 'Active',
    currentPosition: [20.7, 78.6],
    estimatedDepartureTime: '2026-09-26T07:40:00Z',
    estimatedArrivalTime: '2026-09-26T10:30:00Z'
  },
  {
    id: 10,
    flightNumber: '6E 902',
    callsign: 'IGO902',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['COK'],
    destination: AIRPORTS['BOM'],
    status: 'Active',
    currentPosition: [14.6, 74.6],
    estimatedDepartureTime: '2026-09-26T08:15:00Z',
    estimatedArrivalTime: '2026-09-26T10:20:00Z'
  },
  {
    id: 11,
    flightNumber: 'AI 772',
    callsign: 'AIC772',
    aircraftType: 'Airbus A321',
    origin: AIRPORTS['HYD'],
    destination: AIRPORTS['CCU'],
    status: 'Active',
    currentPosition: [19.9, 83.4],
    estimatedDepartureTime: '2026-09-26T08:20:00Z',
    estimatedArrivalTime: '2026-09-26T10:20:00Z'
  },
  {
    id: 12,
    flightNumber: '6E 118',
    callsign: 'IGO118',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['BLR'],
    destination: AIRPORTS['COK'],
    status: 'Active',
    currentPosition: [11.7, 77.1],
    estimatedDepartureTime: '2026-09-26T09:00:00Z',
    estimatedArrivalTime: '2026-09-26T10:00:00Z'
  },
  {
    id: 13,
    flightNumber: 'SG 301',
    callsign: 'SEJ301',
    aircraftType: 'Boeing 737',
    origin: AIRPORTS['DEL'],
    destination: AIRPORTS['HYD'],
    status: 'Delayed',
    currentPosition: [...AIRPORTS['DEL'].coordinates],
    estimatedDepartureTime: '2026-09-26T10:30:00Z',
    estimatedArrivalTime: '2026-09-26T12:45:00Z'
  },
  {
    id: 14,
    flightNumber: '6E 654',
    callsign: 'IGO654',
    aircraftType: 'Airbus A321',
    origin: AIRPORTS['MAA'],
    destination: AIRPORTS['BOM'],
    status: 'Delayed',
    currentPosition: [...AIRPORTS['MAA'].coordinates],
    estimatedDepartureTime: '2026-09-26T10:15:00Z',
    estimatedArrivalTime: '2026-09-26T12:20:00Z'
  },
  {
    id: 15,
    flightNumber: 'AI 918',
    callsign: 'AIC918',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['AMD'],
    destination: AIRPORTS['BLR'],
    status: 'Delayed',
    currentPosition: [...AIRPORTS['AMD'].coordinates],
    estimatedDepartureTime: '2026-09-26T10:45:00Z',
    estimatedArrivalTime: '2026-09-26T13:00:00Z'
  },
  {
    id: 16,
    flightNumber: 'AI 101',
    callsign: 'AIC101',
    aircraftType: 'Boeing 787',
    origin: AIRPORTS['DEL'],
    destination: AIRPORTS['BLR'],
    status: 'Arrived',
    currentPosition: [...AIRPORTS['BLR'].coordinates],
    estimatedDepartureTime: '2026-09-26T05:00:00Z',
    estimatedArrivalTime: '2026-09-26T07:45:00Z'
  },
  {
    id: 17,
    flightNumber: '6E 225',
    callsign: 'IGO225',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['BOM'],
    destination: AIRPORTS['AMD'],
    status: 'Arrived',
    currentPosition: [...AIRPORTS['AMD'].coordinates],
    estimatedDepartureTime: '2026-09-26T06:00:00Z',
    estimatedArrivalTime: '2026-09-26T07:10:00Z'
  },
  {
    id: 18,
    flightNumber: 'SG 612',
    callsign: 'SEJ612',
    aircraftType: 'Boeing 737',
    origin: AIRPORTS['CCU'],
    destination: AIRPORTS['DEL'],
    status: 'Arrived',
    currentPosition: [...AIRPORTS['DEL'].coordinates],
    estimatedDepartureTime: '2026-09-26T05:15:00Z',
    estimatedArrivalTime: '2026-09-26T07:40:00Z'
  },
  {
    id: 19,
    flightNumber: 'AI 430',
    callsign: 'AIC430',
    aircraftType: 'Airbus A320',
    origin: AIRPORTS['HYD'],
    destination: AIRPORTS['MAA'],
    status: 'Arrived',
    currentPosition: [...AIRPORTS['MAA'].coordinates],
    estimatedDepartureTime: '2026-09-26T06:30:00Z',
    estimatedArrivalTime: '2026-09-26T07:45:00Z'
  },
  {
    id: 20,
    flightNumber: '6E 810',
    callsign: 'IGO810',
    aircraftType: 'Airbus A321',
    origin: AIRPORTS['BLR'],
    destination: AIRPORTS['HYD'],
    status: 'Arrived',
    currentPosition: [...AIRPORTS['HYD'].coordinates],
    estimatedDepartureTime: '2026-09-26T06:15:00Z',
    estimatedArrivalTime: '2026-09-26T07:25:00Z'
  }
];