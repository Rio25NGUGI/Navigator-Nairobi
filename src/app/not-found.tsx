
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="container">
            <h1 className="text-6xl md:text-8xl font-bold font-headline text-primary">404</h1>
            <p className="mt-4 text-2xl md:text-3xl font-semibold">Page Not Found</p>
            <p className="mt-2 text-lg text-muted-foreground">
                Sorry, the page you are looking for does not exist.
            </p>
            <Button asChild className="mt-8">
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
