import React from "react";
import mStyles from "../Recommendation/main.module.css";
import wlStyles from "../Watchlist/watchlist.module.css";
import { useNavigate, useParams } from "react-router-dom";
import useSearchQuery, { Title } from "../../Hooks/useSearchQuery";
import useGenreColorHook from "../../Hooks/useGenreColor";

//make new style for larger tiles.
const Search = () => {
  const params = useParams();
  const ID = params.text || "";
  const { data: search, error: erTR } = useSearchQuery(ID);

  interface CategoryProps {
    error?: Error | null;
    data?: Title[] | null;
  }

  const Category: React.FC<CategoryProps> = ({ error, data }) => {
    return (
      <>
        <div className={wlStyles.wlContainer}>
          {erTR && <div>{erTR.message}</div>}
          {search?.map((title) => (
            <ul key={title.title_id} style={{ margin: 0, padding: 0 }}>
              <div
                className={mStyles.title}
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
      </>
    );
  };

  const navigate = useNavigate();

  return (
    <div className={[mStyles.main, scroll].join(" ")}>
      <Category error={erTR} data={search} />
    </div>
  );
};
export default Search;
