import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle } from "lucide-react";
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

const featuredSuburbs = [
  {
    name: "Karen",
    description: "Known for its large, leafy properties, upscale restaurants, and serene environment.",
    imageId: "suburb-karen"
  },
  {
    name: "Westlands",
    description: "A vibrant, cosmopolitan area with bustling nightlife, shopping malls, and modern apartments.",
    imageId: "suburb-westlands"
  },
  {
    name: "Lavington",
    description: "A blend of residential tranquility and urban convenience, popular with families.",
    imageId: "suburb-lavington"
  },
];

const testimonials = [
  {
    name: "Aisha Mohammed",
    title: "Relocated from London",
    quote: "Nairobi Navigator made our move seamless. The suburb profiles were incredibly detailed and helped us find the perfect home for our family in Karen.",
    imageId: "testimonial-1"
  },
  {
    name: "David Chen",
    title: "Digital Nomad",
    quote: "As a remote worker, finding a neighborhood with good internet and co-working spaces was key. The quiz pointed me to Westlands, and it's been fantastic!",
    imageId: "testimonial-2"
  }
];

const blogPosts = [
  {
    title: "A Guide to Nairobi's Matatu Culture",
    description: "Understanding the city's iconic public transport system.",
    imageId: "blog-1",
    slug: "matatu-culture"
  },
  {
    title: "The Best Cafes for Remote Work in Nairobi",
    description: "Find your new favorite spot to work and sip on amazing Kenyan coffee.",
    imageId: "blog-2",
    slug: "remote-work-cafes"
  }
];

export default function Home() {
  const heroImage = getImage("hero-skyline");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-2xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-white tracking-tight">
              Find Your Perfect Nairobi Neighbourhood
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">
              Discover, compare, and settle into the best suburbs for your lifestyle with our expert guidance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/quiz">Take the Relocation Quiz</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                <Link href="/explore">Explore Suburbs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Suburbs Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">
              Explore Featured Suburbs
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Get a glimpse of what life is like in some of Nairobi's most sought-after neighborhoods.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredSuburbs.map((suburb) => {
                const image = getImage(suburb.imageId);
                return (
                  <Card key={suburb.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                      <CardDescription className="mt-2">{suburb.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="link" className="text-primary p-0 h-auto">
                        <Link href={`/suburbs/${suburb.name.toLowerCase()}`}>Learn More &rarr;</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Premium Services Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">
              Our Premium Services
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Let us handle the details. Choose a package that fits your needs for a stress-free move.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">Relocation Quiz</CardTitle>
                  <CardDescription>Free & Instant</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>Answer a few questions and get a personalized list of suburb recommendations in minutes.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/quiz">Start Quiz</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary border-2 shadow-2xl relative">
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">Suburb Match</CardTitle>
                  <CardDescription>$99 - One-time</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <p>In-depth consultation and curated list of properties in your matched suburbs.</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> 1-on-1 Consultation</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Verified Property Listings</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Neighborhood Welcome Kit</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/services">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">Full Concierge</CardTitle>
                  <CardDescription>Custom Quote</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>The complete, end-to-end relocation experience, handled by our expert team.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">Book Consultation</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">
              What Our Clients Say
            </h2>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => {
                const image = getImage(testimonial.imageId);
                return (
                  <Card key={testimonial.name} className="bg-muted border-0">
                    <CardContent className="p-6">
                      <p className="italic">"{testimonial.quote}"</p>
                      <div className="mt-4 flex items-center">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">
              From Our Blog
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Tips, guides, and stories about life in Nairobi.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {blogPosts.map((post) => {
                const image = getImage(post.imageId);
                return (
                  <Card key={post.slug} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row">
                    <Image
                      src={image.imageUrl}
                      alt={post.title}
                      width={250}
                      height={200}
                      className="w-full sm:w-1/3 h-48 sm:h-auto object-cover"
                      data-ai-hint={image.imageHint}
                    />
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-headline">{post.title}</h3>
                        <p className="mt-2 text-muted-foreground">{post.description}</p>
                      </div>
                      <Button asChild variant="link" className="text-primary p-0 h-auto mt-4 self-start">
                        <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/blog">Visit Our Blog</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
