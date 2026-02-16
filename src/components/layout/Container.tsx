export default function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12 max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}
