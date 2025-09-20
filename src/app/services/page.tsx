
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const services = [
    {
        name: "Suburb Match",
        price: "$99",
        description: "Perfect for those who want expert guidance without the full commitment. We'll help you find the right neighborhood and properties.",
        features: [
            "Personalized suburb recommendations based on an in-depth consultation.",
            "A curated list of up to 10 verified property listings in your top 2 suburbs.",
            "Digital welcome kit with key contacts and information for your chosen area.",
            "Email support from our relocation experts.",
        ],
        cta: "Purchase Suburb Match",
        href: "/contact?service=suburb-match",
        popular: true,
    },
    {
        name: "Full Concierge",
        price: "Custom Quote",
        description: "Our all-inclusive, white-glove service. We manage your entire relocation process from start to finish for a seamless move.",
        features: [
            "Includes everything in the Suburb Match package.",
            "Arranged viewings for shortlisted properties.",
            "School search and application assistance.",
            "Settling-in services (utilities, bank accounts, etc.).",
            "Personalized city tour and orientation.",
        ],
        cta: "Book a Free Consultation",
        href: "/contact?service=full-concierge",
        popular: false,
    },
];

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-16 lg:py-24 bg-muted">
                    <div className="container">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">Premium Relocation Services</h1>
                            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                                We offer tailored packages to make your move to Nairobi as smooth as possible.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 lg:py-24">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                            {services.map((service) => (
                                <Card key={service.name} className={`flex flex-col shadow-lg ${service.popular ? 'border-primary border-2' : ''}`}>
                                    {service.popular && (
                                         <div className="bg-primary text-primary-foreground text-sm font-semibold text-center py-1">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className="font-headline">{service.name}</CardTitle>
                                        <CardDescription className="text-2xl font-bold text-foreground">{service.price}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="mb-6">{service.description}</p>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-full" variant={service.popular ? 'default' : 'outline'}>
                                            <Link href={service.href}>{service.cta}</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                 <section className="py-16 lg:py-24 bg-muted text-center">
                    <div className="container">
                        <h2 className="text-3xl font-bold font-headline">Not sure which to choose?</h2>
                        <p className="mt-4 max-w-xl mx-auto text-muted-foreground text-lg">
                            Start with our free quiz to get instant suburb recommendations based on your preferences.
                        </p>
                        <div className="mt-8">
                            <Button size="lg" asChild>
                                <Link href="/quiz">Take the Free Quiz</Link>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
