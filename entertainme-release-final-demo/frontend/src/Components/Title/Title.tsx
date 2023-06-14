//React Imports
import { useEffect, useMemo, useState } from "react";

//Style Imports
import Mstyles from "../Recommendation/main.module.css";
import styles from "../Title/title.module.css";
import ReviewForm, { Styles1 } from "./reviewForm";

//Packages
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { RxDotFilled } from "react-icons/Rx";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";

//Scrolling
import ScrollContainer from "react-indiana-drag-scroll";
import scroll from "../scrollbar.module.css";

//Toasts
import { ToastContainer } from "react-toastify";
import ERRtoast from "../../Hooks/ErrorToast";

//Hooks
import useRecsQuery, { RecTitle } from "../../Hooks/useGetRecsQuery";
import useGenreColorHook from "../../Hooks/useGenreColor";
import useReviewQuery from "../../Hooks/useReviewQuery";
import useTitleQuery from "../../Hooks/useTitleQuery";
import apiTest from "../../Services/api-test";

interface CategoryProps {
  error?: Error | null;
  data?: RecTitle[] | null;
}

const Title = () => {
  //getting the search text
  const params = useParams();
  const ID = params.id || "";

  //navigate
  const navigate = useNavigate();

  //user authentication
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();

  // Get title data hook with ID
  const { data: title, error: TE } = useTitleQuery(ID);
  const { data: Recs, error: erRec } = useRecsQuery(ID);
  //get review data hook
  const { data: reviews, error: RE } = useReviewQuery(ID);

  // Memoize the title data using useMemo
  const memoizedTitle = useMemo(() => title, [title]);

  //state to see if in watchlist or not
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<
    boolean | undefined
  >(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //checks if the title is on watchlist or not and assigns the correct check state
  useEffect(() => {
    if (memoizedTitle) {
      setIsAddedToWatchlist(memoizedTitle?.user_watchlist);
    }
  }, [memoizedTitle]);

  //genre_name can possibly be null
  const genreName = memoizedTitle?.genre_name ?? "";

  //summons backend to add or delete title from watchlist based on bool
  const handleWatchlistToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (isLoading) {
      return;
    }
    try {
      //DELETE
      if (isAddedToWatchlist) {
        await apiTest
          .delete(`/userwatchlist/${memoizedTitle?.title_id}`, {
            headers: {
              Authorization: authHeader(),
              userId: authUser()?.userId,
            },
          })
          .then((res) => {
            setIsAddedToWatchlist(false);
            ERRtoast(res.data);
          })
          .catch((error) => {
            // console.error(
            //   "Error deleting title from watchlist:",
            //   error.message
            // );
            setIsAddedToWatchlist(true);
            ERRtoast(error.response.data);
          });
      }
      //ADD
      else {
        await apiTest
          .post(
            "/userwatchlist",
            {
              title_id: ID,
              user_watchlist_favorite: true,
              user_id: authUser()?.userId,
            },
            {
              headers: {
                Authorization: authHeader(),
                userId: authUser()?.userId,
              },
            }
          )
          .then((res) => {
            setIsAddedToWatchlist(true);
            ERRtoast(res.data);
          })
          .catch((error) => {
            // console.error("Error adding title to watchlist:", error.message);
            setIsAddedToWatchlist(false);
            ERRtoast(error.response.data);
          });
      }
    } catch (error) {
      // Handle error if API request fails
      setError("Failed to update watchlist");
    } finally {
      setIsLoading(false);
    }
  };

  interface ActorCrewListProps {
    title: string;
    names: string[];
  }

  const ActorCrewList = ({ title, names }: ActorCrewListProps) => {
    return (
      <div className={styles.actors}>
        {title}
        {names.map((name, index) => (
          <div key={index}>
            <span style={{ marginLeft: "6px" }}>{name}</span>
            {index !== names.length - 1 && <span>, </span>}
          </div>
        ))}
      </div>
    );
  };

  //submitting the review form to backend
  const submitReviewForm = (data: any) =>
    apiTest
      .post(
        "/review",
        {
          title_id: ID,
          user_review_description: data.review,
          user_review_title: data.title,
          user_review_rating: data.rating,
          user_id: authUser()?.userId,
        },
        {
          headers: {
            Authorization: authHeader(),
            userId: authUser()?.userId,
          },
        }
      )
      .then((data) => {
        window.location.reload();
        ERRtoast(data.data);
      })
      .catch((error) => {
        ERRtoast(error.response.data);
      });

  //function to display rec container
  const Category = ({ error, data }: CategoryProps) => {
    return (
      <>
        <ScrollContainer
          className={[Mstyles.container, scroll.example].join(" ")}
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
                  className={Mstyles.title}
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

  return (
    <div className={Mstyles.main}>
      <ToastContainer />
      <div className={Mstyles.container}>
        <div
          className={styles.titleMain}
          style={{
            backgroundColor: useGenreColorHook(genreName),
          }}
        >
          {memoizedTitle?.title_name != undefined
            ? memoizedTitle.title_name
            : "Title Not Found"}
        </div>
        <div className={styles.information}>
          <div className={styles.name_title}>
            <a className={styles.name}>
              {memoizedTitle?.title_name != undefined
                ? memoizedTitle.title_name
                : "Title Not Found"}
            </a>
            <a className={styles.yearGen}>
              {memoizedTitle?.title_release_year ? (
                <>
                  {memoizedTitle.title_release_year} <RxDotFilled /> {genreName}
                </>
              ) : (
                ""
              )}
            </a>
            <label className={styles.lab}>
              Watchlist
              <input
                type="checkbox"
                name="watchlistToggle"
                checked={isAddedToWatchlist}
                onChange={(event) => handleWatchlistToggle(event)}
                disabled={isLoading}
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          {memoizedTitle?.director_names &&
            memoizedTitle.director_names.length > 0 && (
              <ActorCrewList
                title="Dir."
                names={memoizedTitle.director_names}
              />
            )}
          {memoizedTitle?.actor_names &&
            memoizedTitle.actor_names.length > 0 && (
              <ActorCrewList title="Cast." names={memoizedTitle.actor_names} />
            )}
          <Rating
            style={{ maxWidth: 200 }}
            readOnly
            value={memoizedTitle?.avg_rating || 0}
            radius={"full"}
            halfFillMode="box"
            itemStyles={Styles1}
          />
          <a className={styles.description}>
            {memoizedTitle?.title_description}
          </a>
        </div>
      </div>

      <a className={Mstyles.name}>You May Also Like...</a>
      <Category error={erRec} data={Recs} />

      <a className={Mstyles.name}>Add Review</a>
      <div className={Mstyles.container}>
        <ReviewForm onSubmit={(data) => submitReviewForm(data)} />
      </div>

      <a className={Mstyles.name}>Reviews</a>
      {/* will map reviews here */}
      {RE && (
        <div className={Mstyles.container} style={{ color: "white" }}>
          {RE.message}
        </div>
      )}
      {reviews?.length === 0 ? (
        <div className={Mstyles.container} style={{ color: "white" }}>
          No Reviews Found
        </div>
      ) : (
        reviews?.map((review) => (
          <ul
            key={review.user_review_id}
            className={[Mstyles.container, styles.reviews].join(" ")}
          >
            <div className={styles.top}>
              <a className={styles.icon}></a>
              <a className={styles.reviewTitle}>{review.user_review_title}</a>
              <Rating
                style={{ maxWidth: 160 }}
                readOnly
                value={review.user_review_rating}
                radius={"full"}
                itemStyles={Styles1}
              />
              <a className={styles.nameDate}>
                {review.reviewer_name}
                <RxDotFilled />
                {review.review_date}
              </a>
            </div>
            <a className={styles.reviewDesc}>
              {review.user_review_description}
            </a>
          </ul>
        ))
      )}
    </div>
  );
};

export default Title;
