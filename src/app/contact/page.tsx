
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { submitContactForm } from '@/ai/flows/submit-contact-form';

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    service: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            service: searchParams.get('service') || 'general',
            message: '',
        },
    });

    const onSubmit: SubmitHandler<ContactFormData> = (data) => {
        startTransition(async () => {
            try {
                await submitContactForm(data);
                setIsSubmitted(true);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'There was a problem submitting your message. Please try again.',
                });
            }
        });
    };
    
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
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" {...form.register('name')} />
                                    {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" {...form.register('email')} />
                                    {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="service">Service of Interest</Label>
                                    <Select defaultValue={form.getValues('service')} onValueChange={(value) => form.setValue('service', value)}>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                            <SelectItem value="suburb-match">Suburb Match ($99)</SelectItem>
                                            <SelectItem value="full-concierge">Full Concierge (Custom)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" rows={6} {...form.register('message')} />
                                     {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}

