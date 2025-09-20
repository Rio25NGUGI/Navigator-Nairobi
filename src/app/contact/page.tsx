
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactFormContainer from './contact-form-container';

function ContactFormLoading() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
                <CardDescription>
                    Have a question or want to book a service? Fill out the form below and we&apos;ll get back to you.
                </CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-10 bg-muted rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-10 bg-muted rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-10 bg-muted rounded w-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-20 bg-muted rounded w-full"></div>
                    </div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                </div>
            </div>
        </Card>
    )
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-16 lg:py-24">
                <div className="container max-w-xl">
                    <Suspense fallback={<ContactFormLoading />}>
                        <ContactFormContainer />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
}
