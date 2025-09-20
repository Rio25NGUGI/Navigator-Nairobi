
import data from './blog-data.json';

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  imageId: string;
};

export const blogPosts: BlogPost[] = data.blogPosts;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
