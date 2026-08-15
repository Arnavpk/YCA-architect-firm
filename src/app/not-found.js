import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-16 bg-white min-h-[70vh] flex flex-col items-center justify-center text-center">
      <span className="text-gold/20 font-serif text-[120px] md:text-[180px] leading-none mb-4">404</span>
      <h1 className="font-serif text-display text-charcoal mb-4">Page not found</h1>
      <p className="text-dark-grey/50 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-luxury btn-gold">
        <span>Back to Home</span>
      </Link>
    </section>
  );
}
