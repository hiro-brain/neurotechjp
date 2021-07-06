import Link from "next/link";
import React from "react";
import { GetStaticPropsResult } from "next";

import Footer from "~/components/Footer";
import Header from "~/components/Header";

import { Meta } from "~/components/Meta";
import type { PostData } from "~/hooks/loader";
import { loadBlogENPosts } from "~/hooks/loader";

type BlogPageProps = {
  posts: PostData[];
};

const BlogPage: React.FC<BlogPageProps> = props => {
  return (
    <>
      <Meta
        meta={{
          title: "NeurotechJP",
          desc: 'NeurotechJP is running to reveal “The killer use cases of Neurotech".We will publish trends, columns, and interviews with pioneers who are working at the cutting edge of the neurotech field.',
          link: "https://neurotechjp.com",
          image: "https://neurotechjp.com/ogp.png",
        }}
      />
      <div className="blog__bg">
        <Header isBgTransparent={true} />
        <div className="blog">
          <div className="blog--title">Blog</div>
          <div className="blog--subtitle">
            Interviews with those who are active in the front lines all over the
            world in Neurotech.
          </div>
        </div>
      </div>
      <div className="blog-container">
        {props.posts.map((post, j) => {
          return <BlogItem key={j} post={post} />;
        })}
      </div>
      <Footer />
    </>
  );
};

const BlogItem: React.FC<{ post: PostData }> = props => {
  const post = props.post;
  return (
    <Link href={`/${post.path}`}>
      <div className="blog-item">
        <div className="blog-item--pic">
          <img
            src={post.bannerPhoto}
            alt={`NeurotechJP bannar ${post.title}`}
          />
        </div>
        <div className="blog-item--container">
          <div className="blog-item--container-title">{post.title}</div>
          <div className="blog-item--container-category">{post.category}</div>
          <div className="blog-item--container-subtitle">{post.subtitle}</div>
          <div className="blog-item--container-readmore">READ MORE..</div>
        </div>
        <div className="blog-item--date">{post.datePublished}</div>
      </div>
    </Link>
  );
};

export default BlogPage;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogPageProps>
> => {
  const posts = await loadBlogENPosts();
  const props = {
    posts,
  };

  return { props };
};