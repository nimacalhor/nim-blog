import { getPosts, getPostDetails } from "../../services";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from "../../components";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post, PostDetailType } from "../../lib/types";

function PostDetailPage({
  detail,
  error,
}: {
  detail: PostDetailType | null;
  error?: any;
}) {
  console.log("detail", detail);
  error && console.log("error", error);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {detail && <PostDetail detail={detail} />}
          {detail?.author && <Author author={detail.author} />}
          {detail?.slug && <CommentForm slug={detail.slug} />}
          {detail?.slug && <Comments slug={detail.slug} />}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {detail?.categories && detail.slug && (
              <PostWidget
                slug={detail.slug}
                categories={detail.categories.map((ctg) => ctg.slug)}
              />
            )}
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  let detail: PostDetailType | null = null;
  try {
    const res = await getPostDetails(
      params
        ? params.slug
          ? Array.isArray(params.slug)
            ? params.slug[0]
            : params.slug
          : ""
        : ""
    );
    detail = res;
  } catch (error: any) {
    return {
      props: {
        error,
        detail,
      },
    };
  }
  return {
    props: { detail },
  };
};

export const getStaticPaths: GetStaticPaths = async function () {
  let posts: Post[] | null = null;
  try {
    const res = await getPosts();
    if (res) posts = res.map((edge) => edge.node);
  } catch (error: any) {}
  return {
    paths: posts ? posts.map(({ slug }) => ({ params: { slug } })) : [],
    fallback: true,
  };
};

export default PostDetailPage;
