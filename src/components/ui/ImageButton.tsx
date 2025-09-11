import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'icon-only' | 'text-only';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  children?: ReactNode;
}

export default function ImageButton({
  variant = 'default',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}: ImageButtonProps) {
  const baseClasses = 'imageButton inline-flex items-center justify-center gap-2 cursor-pointer border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2';
  
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };
  
  const variantClasses = {
    default: 'bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--accent)] text-[var(--text)]',
    'icon-only': 'bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--accent)] text-[var(--text)]',
    'text-only': 'bg-transparent border-transparent hover:bg-[var(--accent)] text-[var(--text)]'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button className={classes} {...props}>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children && variant !== 'icon-only' && <span>{children}</span>}
    </button>
  );
}
