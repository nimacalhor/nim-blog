export interface Root {
  data: Data;
}

export interface Data {
  postsConnection: PostsConnection;
}

export interface PostsConnection {
  edges: Edge[];
}

export interface Edge {
  node: Post;
}

export interface Post {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage | null;
  categories: Category[];
}

export interface Author {
  bio: string;
  name: string;
  id: string;
  photo: Photo;
}

export interface Photo {
  url: string;
}

export interface FeaturedImage {
  url: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface RecentPost {
  title: string;
  featuredImage: FeaturedImage;
  createdAt: string;
  slug: string;
}

export interface PostDetailType {
  title: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  author: Author;
  createdAt: string;
  slug: string;
  content: Content;
  categories: Category[];
}

export interface FeaturedImage {
  url: string;
}

export interface Author {
  name: string;
  bio: string;
  photo: Photo;
}

export interface Photo {
  url: string;
}

export interface Content {
  raw: Raw;
}

export interface Raw {
  children: Children[];
}

export interface Children {
  type: string;
  children: Children2[];
}

export interface Children2 {
  text?: string;
  rel?: string;
  href?: string;
  type?: string;
  children?: Children3[];
  className?: string;
  openInNewTab?: boolean;
  code?: boolean;
}

export interface Children3 {
  text: string;
}

export interface Comment {
  name: string;
  createdAt: string;
  comment: string;
}

export interface CategoryPost {
  cursor: string;
  node: Post;
}
