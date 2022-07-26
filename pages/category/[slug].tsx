import React from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";
import { GetStaticProps } from "next";
import { Post } from "../../lib/types";

const CategoryPost = ({
  posts,
  error,
}: {
  posts: Post[] | null;
  error?: any;
}) => {
  const router = useRouter();

  console.log("posts", posts);
  error && console.log("error", error);
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts &&
            posts.map((post, index) => <PostCard key={index} post={post} />)}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

export const getStaticProps: GetStaticProps = async function ({ params }) {
  let posts: Post[] | null = null;
  try {
    const res =
      params && params.slug
        ? await getCategoryPost(
            Array.isArray(params.slug) ? params.slug[0] : params.slug
          )
        : null;
    if (res && res.length) posts = res.map((r) => r.node);
  } catch (error: any) {
    return {
      props: {
        posts,
        error,
      },
    };
  }
  return {
    props: { posts },
  };
};

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
