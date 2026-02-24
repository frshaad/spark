export default function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <button className='group text-left' type='button'>
      <p className='text-foreground text-2xl leading-none tracking-tight md:text-3xl'>{value}</p>
      <p className='text-muted-foreground group-hover:text-foreground mt-1 text-xs tracking-wide uppercase transition-colors'>
        {label}
      </p>
    </button>
  );
}
