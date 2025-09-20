'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { submitContactForm } from '@/ai/flows/submit-contact-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Please enter a valid email address.'),
    service: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
    service?: string;
    onSuccess?: () => void;
}

export default function ContactForm({ service = 'general', onSuccess }: ContactFormProps) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            service: service,
            message: '',
        },
    });

    const onSubmit: SubmitHandler<ContactFormData> = (data) => {
        startTransition(async () => {
            try {
                const result = await submitContactForm(data);
                if (onSuccess) {
                    onSuccess();
                }
                toast({
                    title: 'Message Sent!',
                    description: result.message,
                });
                if (!onSuccess) {
                    form.reset();
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'There was a problem submitting your message. Please try again.',
                });
            }
        });
    };
    
    return (
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
                <Textarea id="message" rows={4} {...form.register('message')} />
                 {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Message
            </Button>
        </form>
    );
}
