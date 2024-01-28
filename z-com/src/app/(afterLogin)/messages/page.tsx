import { Metadata } from 'next';
import style from './message.module.css';
import Room from '@/app/(afterLogin)/messages/_component/Room';
import { getRooms } from './_lib/getRooms';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: '쪽지',
  description: '쪽지',
};

export default async function Home() {
  const session = await auth();
  const rooms = session?.user?.email
    ? await getRooms(session.user.email)
    : null;

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      $
      {rooms.map((room) => (
        <Room key={room.room} room={room} />
      ))}
    </main>
  );
}
