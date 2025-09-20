import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-data";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";

const getImage = (id: string): ImagePlaceholder => {
    const image = PlaceHolderImages.find((img) => img.id === id);
    if (!image) {
      return {
        id,
        description: 'Placeholder Image',
        imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
        imageHint: 'placeholder',
      };
    }
    return image;
};

export default function BlogPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 md:py-20">
                    <div className="container">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">From the Blog</h1>
                            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                                Tips, guides, and stories about life in Nairobi.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="pb-16 lg:pb-24">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => {
                                const image = getImage(post.imageId);
                                return (
                                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                            <CardHeader className="p-0">
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={post.title}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-48 object-cover"
                                                    data-ai-hint={image.imageHint}
                                                />
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                                                <p className="mt-2 text-muted-foreground">{post.description}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
