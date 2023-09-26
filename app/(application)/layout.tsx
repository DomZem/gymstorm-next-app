export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      Shared space in app
      {children}
    </div>
  );
}
