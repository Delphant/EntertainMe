import styles from "../Recommendation/main.module.css";
import ScrollContainer from "react-indiana-drag-scroll";
import { useNavigate } from "react-router-dom";
import scroll from "../scrollbar.module.css";

//endpoint hooks
import useMainQuery, { Title } from "../../Hooks/useMainQuery";
import useGenreColorHook from "../../Hooks/useGenreColor";

const Recommend = () => {
  const { data, error } = useMainQuery();

  interface CategoryProps {
    title: string;
    error?: Error | null;
    data?: Title[] | null;
  }

  const Category: React.FC<CategoryProps> = ({ title, error, data }) => {
    return (
      <>
        <a className={styles.name}>{title}</a>
        <ScrollContainer
          className={[styles.container, scroll.example].join(" ")}
          hideScrollbars={false}
        >
          {error && <div style={{ color: "white" }}>{error.message}</div>}
          {data?.length === 0 ? (
            <div style={{ color: "white" }}>No Titles</div>
          ) : (
            data?.map((title) => (
              <ul
                key={title.title_id}
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <div
                  className={styles.title}
                  style={{
                    backgroundColor: useGenreColorHook(title.genre_name),
                  }}
                  onClick={() => navigate("/title/" + title.title_id)}
                >
                  {title.title_name}
                </div>
              </ul>
            ))
          )}
        </ScrollContainer>
      </>
    );
  };

  const navigate = useNavigate();

  return (
    <div className={[styles.main, scroll].join(" ")}>
      <Category title="Top Rated" error={error} data={data?.top_rating} />
      <Category
        title="Latest Recommendations"
        error={error}
        data={data?.latestrecs}
      />
      <Category title="What's New" error={error} data={data?.whatsnew} />
      <Category title="Watchlist" error={error} data={data?.watchlist} />
    </div>
  );
};

export default Recommend;
