'use client';

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Loader2, Sparkles } from 'lucide-react';

import {
  recommendSuburbs,
  type RecommendSuburbsInput,
  type SuburbRecommendation,
} from '@/ai/flows/recommend-suburbs';
import { getSuburbBySlug } from '@/lib/suburbs-data';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const budgetOptions = [
  { value: 'economy', label: 'Economy ($ - $$)' },
  { value: 'mid-range', label: 'Mid-Range ($$ - $$$)' },
  { value: 'luxury', label: 'Luxury ($$$$ - $$$$$)' },
];

const lifestyleOptions = [
  {
    value: 'quiet',
    label: 'Quiet & Serene',
    description: 'You prefer a peaceful environment, away from the hustle and bustle.',
  },
  {
    value: 'lively',
    label: 'Lively & Vibrant',
    description: 'You enjoy being in the heart of the action with plenty of social venues.',
  },
  {
    value: 'family-friendly',
    label: 'Family-Friendly',
    description: 'You need good schools, parks, and a safe community for your children.',
  },
];

const priorities = [
  { id: 'nightlife', label: 'Vibrant Nightlife' },
  { id: 'dining', label: 'Excellent Dining Options' },
  { id: 'shopping', label: 'Proximity to Shopping Malls' },
  { id: 'nature', label: 'Access to Parks and Greenery' },
  { id: 'schools', label: 'Top-rated Schools' },
  { id: 'security', label: 'High Security' },
];

const formSchema = z.object({
  budget: z.string().min(1, 'Please select a budget.'),
  lifestyle: z.string().min(1, 'Please select a lifestyle preference.'),
  priorities: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'You have to select at least one item.',
    }),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 'budget', title: 'Your Budget', fields: ['budget'] },
  { id: 'lifestyle', title: 'Your Ideal Lifestyle', fields: ['lifestyle'] },
  { id: 'priorities', title: 'Your Priorities', fields: ['priorities'] },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<SuburbRecommendation[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: '',
      lifestyle: '',
      priorities: [],
    },
  });

  const processForm: SubmitHandler<FormData> = async data => {
    startTransition(async () => {
      const recommendations = await recommendSuburbs(data);
      setResults(recommendations);
      setIsFinished(true);
    });
  };

  type FieldName = keyof FormData;

  const nextStep = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await form.trigger(fields, { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await form.handleSubmit(processForm)();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  
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

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground font-headline">Finding your perfect match...</p>
      </div>
    );
  }

  if (isFinished) {
    return (
       <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-16 lg:py-24">
                <div className="container">
                    <div className="text-center mb-12">
                         <h1 className="text-4xl md:text-5xl font-bold font-headline flex items-center justify-center gap-4">
                            <Sparkles className="h-8 w-8 text-accent" />
                            Your Recommended Suburbs
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg">
                            Based on your preferences, here are the top neighborhoods for you in Nairobi.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-8">
                        {results.map((rec, index) => {
                            const suburb = getSuburbBySlug(rec.slug);
                            if (!suburb) return null;
                            const image = getImage(suburb.imageId);
                            return (
                                <Card key={rec.slug} className={`overflow-hidden shadow-lg transition-all ${index === 0 ? 'border-2 border-primary shadow-2xl' : ''}`}>
                                    {index === 0 && (
                                        <div className="bg-primary text-primary-foreground text-sm font-semibold text-center py-1">
                                            Top Match
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <div className="md:col-span-1">
                                             <Image src={image.imageUrl} alt={suburb.name} width={400} height={400} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="md:col-span-2 p-6">
                                            <CardTitle className="font-headline">{suburb.name}</CardTitle>
                                            <p className="text-sm font-bold text-primary mt-1">{rec.matchReasoning.split(':')[0]}</p>
                                            <CardDescription className="mt-2 text-base">{rec.matchReasoning.split(':')[1]}</CardDescription>
                                            <div className="mt-4">
                                                <h4 className="font-semibold">Why it's a good fit:</h4>
                                                <ul className="mt-2 space-y-1 list-disc list-inside text-muted-foreground">
                                                    {rec.highlights.map((highlight, i) => (
                                                        <li key={i}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Button asChild className="mt-6">
                                                <Link href={`/suburbs/${suburb.slug}`}>Explore {suburb.name}</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>

                     <div className="text-center mt-12">
                        <Button variant="outline" onClick={() => { setIsFinished(false); setCurrentStep(0); form.reset(); }}>
                            Start Over
                        </Button>
                    </div>

                </div>
            </main>
            <Footer />
       </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container max-w-2xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">
                Find Your Perfect Suburb
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Answer a few quick questions to get a personalized recommendation.
              </p>
            </div>

            <Card className="mt-10">
              <CardHeader>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Step 1: Budget */}
                        {currentStep === 0 && (
                          <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-2xl font-headline">
                                  What&apos;s your housing budget?
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className="text-lg">
                                      <SelectValue placeholder="Select a budget range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {budgetOptions.map(option => (
                                        <SelectItem
                                          key={option.value}
                                          value={option.value}
                                          className="text-lg"
                                        >
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Step 2: Lifestyle */}
                        {currentStep === 1 && (
                          <FormField
                            control={form.control}
                            name="lifestyle"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <FormLabel className="text-2xl font-headline">
                                  Which lifestyle best describes you?
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-2"
                                  >
                                    {lifestyleOptions.map(option => (
                                      <FormItem
                                        key={option.value}
                                        className="flex items-center space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <div className="p-4 border rounded-lg hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:shadow-lg transition-all">
                                            <RadioGroupItem
                                              value={option.value}
                                              id={option.value}
                                              className="sr-only"
                                            />
                                            <label
                                              htmlFor={option.value}
                                              className="flex flex-col cursor-pointer"
                                            >
                                              <span className="font-bold text-lg">
                                                {option.label}
                                              </span>
                                              <span className="text-muted-foreground">
                                                {option.description}
                                              </span>
                                            </label>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Step 3: Priorities */}
                        {currentStep === 2 && (
                          <FormField
                            control={form.control}
                            name="priorities"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel className="text-2xl font-headline">
                                    What are your top priorities?
                                  </FormLabel>
                                  <FormDescription>
                                    Select up to 3 that are most important to you.
                                  </FormDescription>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                {priorities.map(item => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="priorities"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(
                                                item.id
                                              )}
                                              onCheckedChange={checked => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      item.id,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        value =>
                                                          value !== item.id
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal text-base">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </form>
                </Form>

                <div className="mt-8 flex justify-between">
                  <Button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                  >
                    Back
                  </Button>
                  <Button onClick={nextStep}>
                    {currentStep === steps.length - 1 ? 'Get Results' : 'Next'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
