import Toolbar from "@/components/toolbar";
import { useRouter } from "next/router";
import styles from "../../styles/Feed.module.css";

function Feed({ pageNumber, articles }) {
  const router = useRouter();
  console.log(articles);
  const handlePreviousPageClick = () => {
    if (pageNumber > 1) {
      router.push(`/feed/${pageNumber - 1}`);
    }
  };
  const handleNextPageClick = () => {
    if (pageNumber < 5) {
      router.push(`/feed/${pageNumber + 1}`);
    }
  };
  return (
    <>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        {/* If page number is 1 then this is not appeared */}
        <div
          onClick={handlePreviousPageClick}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <div>{pageNumber}</div>
        <div
          onClick={handleNextPageClick}
          className={pageNumber > 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      // api lấy ở trang https://newsapi.org, tạo tài khoản cá nhân và lấy api key
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  ).then((res) => res.json());
  const { articles } = await apiResponse;
  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
