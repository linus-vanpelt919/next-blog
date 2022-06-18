import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps() {
  //外部から一度だけデータを取ってくる
  const allPostData = getPostsData(); //id title
  console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostData }) {
  return (
    <div>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyle.headingMd}>
          <p>
            私は現在Next.jsエンジニアを目指しています。
            ReactとTypescriptでの開発を学習中です。
          </p>
        </section>

        <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
          <h2>🗒エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostData.map(({ id, title, date, thumbnail }) => (
              <article key={id}>
                <Link href={`posts/${id}`}>
                  <img
                    src={thumbnail}
                    alt=""
                    className={styles.thumbnailImage}
                  />
                </Link>
                <Link href={`posts/${id}`}>
                  <a className={utilStyle.boldText}>{title}</a>
                </Link>
                <br />
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}
