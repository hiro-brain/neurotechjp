import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { PostData, loadBlogPosts } from "~/hooks/loader";

const Home = (props: {posts: PostData[]}) => {
  return (
    <>
      <Header />
      <div className="index">
        <div className="index--title">Blog</div>
        <div className="index--subtitle">
          Neurotechnology blogs through interviews all over the world
        </div>
      </div>
      <div className="blog-container_bg">
        <div className="blog-container">
          {props.posts.map((post, j) => {
            return <BlogItem post={post} key={j} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

const BlogItem: React.FC<{ post: PostData }> = (props) => {
  const post = props.post
  //TODO: link ref
  return (
    <div className="blog-item">
      <div className="blog-item--pic"> <img src={post.bannerPhoto} /></div>
      <div className="blog-item--container">
        <div className="blog-item--container-title">
          {post.title}
        </div>
        <div className="blog-item--container-subtitle">
          {post.subtitle}
        </div>
        <div className="blog-item--container-readmore">READ MORE..</div>
      </div>
      <div className="blog-item--date">
        {post.datePublished}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = await loadBlogPosts();
  const props = {
    posts,
  };

  return { props };
};