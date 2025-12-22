import Link from 'next/link';
import { Sparkle } from 'lucide-react';

export default function Logo() {
  return (
    <Link
      href="/"
      className="ml-10 flex items-center gap-2 text-2xl font-semibold"
    >
      <Sparkle className="size-7" />
      Spark
    </Link>
  );
}
