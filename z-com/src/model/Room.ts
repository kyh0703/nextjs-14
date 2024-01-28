import { User } from 'next-auth';

export interface Room {
  room: string;
  Receiver: User;
  content: string;
  createAt: Date;
}
