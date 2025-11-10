import { ParkingStatus } from '../components/atoms/StatusBadge';

export interface ParkingSpot {
  id: string;
  code: string;
  level: string;
  type: 'auto' | 'moto' | 'vip';
  status: ParkingStatus;
  nextReservation?: string;
}

export interface ReservationRecord {
  id: string;
  spotCode: string;
  customer: string;
  vehicle: string;
  start: string;
  end: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
}

export interface PaymentRecord {
  id: string;
  amount: number;
  currency: string;
  concept: string;
  method: 'card' | 'cash' | 'mp';
  status: 'paid' | 'pending';
  issuedAt: string;
}

export const parkingSpotsMock: ParkingSpot[] = [
  { id: '1', code: 'A-01', level: 'P1', type: 'auto', status: 'occupied', nextReservation: '14:30 - Juan P.' },
  { id: '2', code: 'A-02', level: 'P1', type: 'auto', status: 'reserved', nextReservation: '15:00 - Ana G.' },
  { id: '3', code: 'A-03', level: 'P1', type: 'auto', status: 'available' },
  { id: '4', code: 'B-05', level: 'P2', type: 'vip', status: 'occupied', nextReservation: '16:00 - VIP' },
  { id: '5', code: 'B-06', level: 'P2', type: 'vip', status: 'available' },
  { id: '6', code: 'C-11', level: 'P3', type: 'moto', status: 'maintenance' },
  { id: '7', code: 'C-12', level: 'P3', type: 'moto', status: 'available' },
  { id: '8', code: 'D-01', level: 'P4', type: 'auto', status: 'reserved', nextReservation: '14:45 - Pedro Q.' }
];

export const reservationsMock: ReservationRecord[] = [
  {
    id: 'r-1001',
    spotCode: 'A-02',
    customer: 'Ana García',
    vehicle: 'Ford Focus - ABC123',
    start: '2025-02-14T14:45:00',
    end: '2025-02-14T16:00:00',
    status: 'scheduled',
    paymentStatus: 'paid'
  },
  {
    id: 'r-1002',
    spotCode: 'B-05',
    customer: 'Carlos Ruiz',
    vehicle: 'BMW X5 - MNO456',
    start: '2025-02-14T13:30:00',
    end: '2025-02-14T15:30:00',
    status: 'in-progress',
    paymentStatus: 'pending'
  },
  {
    id: 'r-1003',
    spotCode: 'D-01',
    customer: 'Pedro Quiroga',
    vehicle: 'Renault Clio - HJK987',
    start: '2025-02-14T14:30:00',
    end: '2025-02-14T17:00:00',
    status: 'scheduled',
    paymentStatus: 'pending'
  }
];

export const paymentsMock: PaymentRecord[] = [
  {
    id: 'pay-245',
    amount: 3200,
    currency: 'ARS',
    concept: 'Reserva A-02',
    method: 'card',
    status: 'paid',
    issuedAt: '2025-02-14T12:45:00'
  },
  {
    id: 'pay-246',
    amount: 4500,
    currency: 'ARS',
    concept: 'Check-out B-05',
    method: 'mp',
    status: 'pending',
    issuedAt: '2025-02-14T13:55:00'
  },
  {
    id: 'pay-247',
    amount: 1800,
    currency: 'ARS',
    concept: 'Reserva D-01',
    method: 'cash',
    status: 'pending',
    issuedAt: '2025-02-14T14:10:00'
  }
];
