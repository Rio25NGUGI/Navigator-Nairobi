import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { suburbs } from "@/lib/suburbs-data";

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


export default function ExplorePage({ searchParams }: { searchParams: { q: string } }) {
    const searchTerm = searchParams.q || '';
    const filteredSuburbs = suburbs.filter(suburb => suburb.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                <section className="py-12 md:py-20">
                    <div className="container">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">Explore Nairobi's Suburbs</h1>
                            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                                Find the perfect neighborhood for your lifestyle.
                            </p>
                        </div>
                        <div className="mt-8 max-w-lg mx-auto">
                            <form>
                                <Input
                                    type="search"
                                    name="q"
                                    defaultValue={searchTerm}
                                    placeholder="Search for a suburb (e.g., Karen, Westlands...)"
                                    className="w-full text-base"
                                />
                            </form>
                        </div>
                    </div>
                </section>

                <section className="pb-16 lg:pb-24">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredSuburbs.map((suburb) => {
                                const image = getImage(suburb.imageId);
                                return (
                                    <Link key={suburb.slug} href={`/suburbs/${suburb.slug}`}>
                                        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                            <CardHeader className="p-0">
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={`View of ${suburb.name}`}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-48 object-cover"
                                                    data-ai-hint={image.imageHint}
                                                />
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <CardTitle className="font-headline">{suburb.name}</CardTitle>
                                                <p className="mt-2 text-muted-foreground">{suburb.description}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                            {filteredSuburbs.length === 0 && (
                                <div className="md:col-span-2 lg:col-span-3 text-center">
                                    <p className="text-lg text-muted-foreground">No suburbs found for &quot;{searchTerm}&quot;.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
