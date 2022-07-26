import { request, gql } from "graphql-request";
import {
  Category,
  CategoryPost,
  Comment,
  Edge,
  Post,
  RecentPost,
} from "../lib/types";
const graphqlApi = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";
export const getPosts: () => Promise<Edge[]> = async function () {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const res = await request(graphqlApi, query);
  return res.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.post;
};

export const getRecentPosts: () => Promise<RecentPost[]> = async function () {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featuredImage{
          url
        }
        createdAt
        slug
      }
      
    }
  `;
  const res = await request(graphqlApi, query);
  return res.posts;
};

export const getSimilarPosts = async (
  categories: string[],
  slug: string
): Promise<Post[]> => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlApi, query, { slug, categories });

  return result.posts;
};

export const getCategories: () => Promise<Category[]> = async function () {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `;
  const res = await request(graphqlApi, query);
  return res.categories;
};

export const submitComment = async function (obj: {
  name: string;
  email: string;
  comment: string;
  slug: string;
}) {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};

export const getComments = async (slug: string): Promise<Comment[]> => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlApi, query);

  return result.posts;
};

export const getCategoryPost = async (slug: string): Promise<CategoryPost[]> => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlApi, query, { slug });

  return result.postsConnection.edges;
};
