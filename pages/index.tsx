import React from "react";
import Head from "next/head";
import { Categories, PostCard, PostWidget } from "../components";
import FeaturedPosts from "../sections/FeaturedPosts";
import { getPosts, getRecentPosts } from "../services";
import { Post } from "../lib/types";
import { GetStaticProps } from "next";
import { useEffect } from "react";

function HomePage({
  posts,
  error,
}: {
  posts: Post[] | null;
  error: any | null;
}) {
  console.log(posts);
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>nim blog</title>
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {posts && (
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>
        )}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  let posts: Post[] | null = null;
  let error: any | null = null;
  try {
    const res = await getPosts();
    if (res.length) posts = res.map((edge) => edge.node);
  } catch (err: any) {
    error = err;
  }
  return { props: { posts, error } };
};

export default HomePage;
