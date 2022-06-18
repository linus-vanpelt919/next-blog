import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/post";
import utilStyle from "../../styles/utils.module.css";
// import dompurify from "dompurify";

export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false, //trueにすると存在しないページでも自動で生成してくれる(エラーになる)
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingX1}>{postData.title}</h1>
        <br />
        <div className={utilStyle.lightText}>{postData.date}</div>
        <br />
        {/* htmlを差し込むプロパティ */}
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
