import { Post } from './Post';

interface UserID {
  userId: string;
}

export interface User {
  id: string;
  nickname: string;
  image: string;
  Posts: Post[];
  Followers: UserID[];
  _count: {
    Followers: number;
    Followings: number;
  };
}
