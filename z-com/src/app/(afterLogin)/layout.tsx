export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>로그인 후 레이아웃{children}</div>;
}
