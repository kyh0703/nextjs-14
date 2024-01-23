import style from './profile.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import UserPosts from '@/app/(afterLogin)/[username]/_component/UserPosts';
import UserInfo from '@/app/(afterLogin)/[username]/_component/UserInfo';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { getUserPosts } from '@/app/(afterLogin)/[username]/_lib/getUserPosts';
import { auth } from '@/auth';
import { User } from '@/model/User';

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ['users', params.username],
  });
  return {
    title: `${user.nickname} (@${user.id})`,
    description: `${user.nickname} (@${user.id})`,
  };
}

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
