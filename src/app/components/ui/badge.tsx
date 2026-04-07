import { cn } from '@/lib/utils'

export interface BadgeProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Badge({ children, className, style }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5',
        'bg-[var(--color-bg-dim)] text-[var(--color-text-dim)]',
        'text-xs font-bold uppercase tracking-wider whitespace-nowrap',
        className
      )}
      style={style}
    >
      {children}
    </span>
  )
}
