import { parkingSpotsMock, reservationsMock, paymentsMock, ParkingSpot, ReservationRecord, PaymentRecord } from '../data/mockData';
import { ParkingStatus } from '../components/atoms/StatusBadge';

const latency = (min = 180, max = 420) => Math.floor(Math.random() * (max - min + 1) + min);

const withLatency = async <T,>(payload: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(payload)), latency());
  });

let parkingSpots = structuredClone(parkingSpotsMock);
let reservations = structuredClone(reservationsMock);
let payments = structuredClone(paymentsMock);

export const parkingService = {
  async listSpots() {
    return withLatency(parkingSpots);
  },
  async listReservations() {
    return withLatency(reservations);
  },
  async listPayments() {
    return withLatency(payments);
  },
  async createReservation(reservation: Omit<ReservationRecord, 'id' | 'paymentStatus'>) {
    const newReservation: ReservationRecord = {
      ...reservation,
      id: `r-${Date.now()}`,
      paymentStatus: 'pending'
    };
    reservations = [newReservation, ...reservations];
    parkingSpots = parkingSpots.map((spot) =>
      spot.code === reservation.spotCode ? { ...spot, status: 'reserved', nextReservation: reservation.start } : spot
    );
    return withLatency(newReservation);
  },
  async updateSpotStatus(spotCode: string, status: ParkingStatus) {
    parkingSpots = parkingSpots.map((spot) => (spot.code === spotCode ? { ...spot, status } : spot));
    return withLatency(
      parkingSpots.find((spot) => spot.code === spotCode) ?? {
        id: spotCode,
        code: spotCode,
        level: 'P1',
        type: 'auto',
        status
      }
    );
  },
  async registerPayment(payload: Omit<PaymentRecord, 'id' | 'status'> & { status?: PaymentRecord['status'] }) {
    const record: PaymentRecord = {
      ...payload,
      id: `pay-${Date.now()}`,
      status: payload.status ?? 'paid'
    };
    payments = [record, ...payments];
    return withLatency(record);
  }
};

export type { ParkingSpot, ReservationRecord, PaymentRecord };
