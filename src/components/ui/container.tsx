export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto max-w-7xl px-4 ${className}`}>
      {children}
    </div>
  );
}
