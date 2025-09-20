import { notFound } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";
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
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const heroImage = getImage(post.imageId);
    // We can reuse the suburb content generator for this, just passing the post title
    const aiContent = await generateBlogContent({ suburbName: post.title });

    // Get 2 other random posts for "Explore More"
    const otherPosts = blogPosts.filter(p => p.slug !== post.slug).sort(() => 0.5 - Math.random()).slice(0, 2);

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
                            {post.title}
                        </h1>
                    </div>
                </section>

                <article className="py-16 lg:py-24">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 prose prose-lg max-w-none">
                                <div className="mt-6 space-y-6 text-lg text-foreground/80">
                                    {aiContent.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                            <aside className="lg:col-span-1 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">Explore More</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-4">
                                        {otherPosts.map(other => {
                                            const image = getImage(other.imageId);
                                            return (
                                            <Link key={other.slug} href={`/blog/${other.slug}`} className="flex items-center gap-4 group">
                                                <Image src={image.imageUrl} alt={other.title} width={60} height={60} className="rounded-md object-cover h-16 w-16" />
                                                <div>
                                                    <h5 className="font-semibold group-hover:text-primary">{other.title}</h5>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">{other.description}</p>
                                                </div>
                                            </Link>
                                            )
                                        })}
                                        </div>
                                         <Button asChild variant="link" className="text-primary p-0 h-auto mt-4">
                                            <Link href="/blog">View All Posts &rarr;</Link>
                                        </Button>
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
