'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactForm from '@/components/layout/contact-form';

export default function ContactPage() {
    const searchParams = useSearchParams();
    const service = searchParams.get('service') || 'general';
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    if (isSubmitted) {
        return (
             <div className="flex flex-col min-h-screen bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="container max-w-xl text-center">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Thank You!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground">Your message has been sent successfully. Our team will get back to you shortly.</p>
                                <Button asChild className="mt-8">
                                    <Link href="/">Return to Home</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-16 lg:py-24">
                <div className="container max-w-xl">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
                            <CardDescription>
                                Have a question or want to book a service? Fill out the form below and we&apos;ll get back to you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ContactForm service={service} onSuccess={() => setIsSubmitted(true)} />
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
