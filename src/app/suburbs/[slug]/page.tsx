import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { suburbs, getSuburbBySlug } from "@/lib/suburbs-data";
import { generateBlogContent } from "@/ai/flows/generate-blog-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const getImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find((img) => img.id === id);
    if (!image) {
      return {
        id,
        description: 'Placeholder Image',
        imageUrl: 'https://picsum.photos/seed/placeholder/1200/600',
        imageHint: 'placeholder',
      };
    }
    return image;
};

export async function generateStaticParams() {
    return suburbs.map((suburb) => ({
        slug: suburb.slug,
    }));
}

export default async function SuburbPage({ params }: { params: { slug: string } }) {
    const suburb = getSuburbBySlug(params.slug);

    if (!suburb) {
        notFound();
    }

    const heroImage = getImage(suburb.imageId);
    
    const [aiContent, otherSuburbs] = await Promise.all([
        generateBlogContent({ topic: suburb.name }),
        (async () => {
            // Get 2 other random suburbs for "Explore More"
            return suburbs.filter(s => s.slug !== suburb.slug).sort(() => 0.5 - Math.random()).slice(0, 2);
        })()
    ]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="relative h-[50vh] flex items-center justify-center text-center text-white">
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint={heroImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 max-w-4xl px-4">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline text-white tracking-tight">
                            {suburb.name}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-white/90">
                            {suburb.description}
                        </p>
                    </div>
                </section>

                <article className="py-16 lg:py-24">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 prose prose-lg max-w-none">
                                <h2 className="text-3xl font-bold font-headline">{aiContent.title}</h2>
                                <div className="mt-6 space-y-6 text-lg text-foreground/80">
                                    {aiContent.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            <aside className="lg:col-span-1 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">Suburb Vitals</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold">Vibe</h4>
                                            <p className="text-muted-foreground">{suburb.vibe}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Best For</h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {suburb.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Explore More</h4>
                                            <div className="space-y-2 mt-2">
                                            {otherSuburbs.map(other => {
                                                const image = getImage(other.imageId);
                                                return (
                                                <Link key={other.slug} href={`/suburbs/${other.slug}`} className="flex items-center gap-4 group">
                                                    <Image src={image.imageUrl} alt={other.name} width={60} height={60} className="rounded-md object-cover h-16 w-16" />
                                                    <div>
                                                        <h5 className="font-semibold group-hover:text-primary">{other.name}</h5>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">{other.description}</p>
                                                    </div>
                                                </Link>
                                                )
                                            })}
                                            </div>
                                             <Button asChild variant="link" className="text-primary p-0 h-auto mt-4">
                                                <Link href="/explore">Explore All &rarr;</Link>
                                             </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </aside>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
