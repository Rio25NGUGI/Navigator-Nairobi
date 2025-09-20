import data from './suburbs-data.json';

export type Suburb = {
  name: string;
  slug: string;
  description: string;
  imageId: string;
  vibe: string;
  tags: string[];
};

export const suburbs: Suburb[] = data.suburbs;

export function getSuburbBySlug(slug: string): Suburb | undefined {
  return suburbs.find((suburb) => suburb.slug === slug);
}
