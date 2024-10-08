
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div>
        SIDEBAR
        {children}
   </div>
  );
}
