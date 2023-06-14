import { useNavigate } from "react-router-dom";
import useWatchlistQuery, { Title } from "../../Hooks/useWatchlistQuery";
import styles from "../Recommendation/main.module.css";
import wlStyles from "./watchlist.module.css";
import useGenreColorHook from "../../Hooks/useGenreColor";

interface CategoryProps {
  error?: Error | null;
  data?: Title[] | null;
}

const WatchlistComp = () => {
  const { data: watchlist, error: erTR } = useWatchlistQuery();
  const navigate = useNavigate();

  const Category: React.FC<CategoryProps> = ({ error, data }) => {
    return (
      <div className={wlStyles.wlContainer}>
        {erTR && <div>{erTR.message}</div>}
        {watchlist?.map((title) => (
          <ul key={title.title_id} style={{ margin: 0, padding: 0 }}>
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
        ))}
      </div>
    );
  };

  return (
    <div className={[styles.main, scroll].join(" ")}>
      <div className={styles.name}>Watchlist</div>
      <Category error={erTR} data={watchlist} />
    </div>
  );
};

export default WatchlistComp;
