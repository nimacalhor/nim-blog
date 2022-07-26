import React, { useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { Category, Post, RecentPost } from "../lib/types";
import { useState } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";

function PostWidget({
  slug,
  categories,
}: {
  slug?: string;
  categories?: Category["slug"][];
}) {
  const [posts, setPosts] = useState<Post[] | RecentPost[]>();
  useEffect(() => {
    if (slug && categories) {
      getSimilarPosts(categories, slug).then((res) => {
        setPosts(res);
        console.log(res)
      });
    } else {
      getRecentPosts().then((res) => setPosts(res));
    }
  }, [slug]);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "related posts" : "recent posts"}
      </h3>
      {posts &&
        posts.map((p) => (
          <div key={p.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              {p.featuredImage?.url && (
                <Image
                  className="align-middle rounded-full"
                  alt={p.title}
                  height={60}
                  width={60}
                  src={p.featuredImage.url}
                />
              )}
            </div>
            <div className="flex-row ml-4">
              <p className="text-gray-500 font-xs">
                {moment(p.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/posts/${p.slug || "link"}`} className="text-md">
                {p.title}
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostWidget;
