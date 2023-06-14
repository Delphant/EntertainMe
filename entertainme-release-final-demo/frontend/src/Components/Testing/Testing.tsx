import styles from "../Recommendation/main.module.css";
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rating, Star } from "@smastrom/react-rating";
import tStyles from "../toast.module.css";

const myStyles = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
  activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
  activeBoxBorderColor: ["#c41400", "#d05e00", "#cca300", "#498d00", "#00724c"],

  inactiveFillColor: "white",
  inactiveBoxColor: "#dddddd",
  inactiveBoxBorderColor: "#a8a8a8",
};

const Styles1 = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
  activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
  activeBoxBorderColor: ["#c41400", "#d05e00", "#cca300", "#498d00", "#00724c"],

  inactiveFillColor: "white",
  inactiveBoxColor: "#dddddd",
  inactiveBoxBorderColor: "#a8a8a8",
};
// toast.success("🦄 Wow so easy!", {
//   position: "top-center",
//   autoClose: 1000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "colored",
// });

export function Testing() {
  const WLtoast = () => {
    toast("Added to watchlist", {
      position: "top-center",
      autoClose: 1000,
      className: tStyles.watchlistToast,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false,
      closeButton: false,
    });
    console.log("clicked");
  };
  const [rating, setRating] = useState(0); // Initial value
  console.log(rating);
  return (
    <div className={styles.main}>
      <Rating
        style={{ maxWidth: 250 }}
        readOnly
        value={2.5}
        radius={"full"}
        itemStyles={myStyles}
        halfFillMode="svg"
      />
      <Rating
        style={{ maxWidth: 250 }}
        isRequired={true}
        value={rating}
        radius={"full"}
        itemStyles={Styles1}
        onChange={setRating}
      />
      <ToastContainer limit={600} />
      <button onClick={WLtoast}>TEST</button>
    </div>
  );
}

export default Testing;
