import { ReactNode } from 'react';
import styles from '@/app/page.module.css';

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}

// 주소가 z.com일 때는 children->page.tsx, modal->@modal/default.tsx
