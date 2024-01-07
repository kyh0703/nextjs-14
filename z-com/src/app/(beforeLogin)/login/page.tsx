'use client';

import Main from '@/app/(beforeLogin)/_component/Main';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login');
  return Main;
}

// modal창으로 돌아갈때 redirect는 서버 컴포넌트 용이기에 배경을 넘길 수 없어 router로 대체

// router.push
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
// 직전 페이지로 돌아갈 수 있음

// router.replace
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
// 직전 페이지 다음으로 돌아갈 수 있음
