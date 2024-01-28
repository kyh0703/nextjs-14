import BackButton from '@/app/(afterLogin)/_component/BackButton';
import style from './singlePost.module.css';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import React from 'react';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import { getSinglePostServer } from './_lib/getSinglePostServer';
import { User } from '@/model/User';
import { Post } from '@/model/Post';
import { getUserServer } from '../../_lib/getUserServer';

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ['users', params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ['posts', params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `${user.nickname} (@${user.id})`,
      description: `${user.nickname} (@${user.id})`,
      images:
        post.Images?.length > 0
          ? post.Images?.map((v) => ({
              url: `https://z.com/api/image/${v.link}`,
              width: 400,
              height: 400,
            }))
          : [
              {
                url: `https://z.com/api/image/${user.image}`,
                width: 400,
                height: 400,
              },
            ],
    },
  };
}

type Props = {
  params: { id: string; username: string };
};
export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', id, 'comments'],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
