export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 active:scale-95';
  const variants = {
    primary: 'bg-bombers-yellow text-bombers-navy hover:bg-yellow-600',
    secondary: 'bg-bombers-navy text-white hover:bg-navy-600',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
