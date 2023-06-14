import styles from "../Title/title.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Rating, Star } from "@smastrom/react-rating";
import { useState } from "react";
import button from "../button.module.css";

export const Styles1 = {
  itemShapes: Star,
  boxBorderWidth: 3,

  activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
  activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
  activeBoxBorderColor: ["#c41400", "#d05e00", "#cca300", "#498d00", "#00724c"],

  inactiveFillColor: "white",
  inactiveBoxColor: "#dddddd",
  inactiveBoxBorderColor: "#a8a8a8",
};

// Zod modify validations
const schema = z.object({
  title: z
    .string()
    .min(2, { message: "Title is required" })
    .max(30, { message: "Title can not exceed 30 characters" }),
  review: z.string().min(2, { message: "Review is required" }),
});

// Zod infer data to ReviewFormData
type ReviewFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: ReviewFormData) => void;
}

const ReviewForm = ({ onSubmit }: Props) => {
  const [rating, setRating] = useState(0); // Initial value
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit = (data: ReviewFormData) => {
    const formDataWithRating = { ...data, rating };
    onSubmit(formDataWithRating);
    setRating(0);
    reset();
  };

  return (
    <form
      className={styles.reviewForm}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.topRow}>
        <input
          {...register("title")}
          id="title"
          placeholder="Add Title"
          className={styles.inputForm}
        ></input>
        <Rating
          style={{ maxWidth: 200 }}
          id="rating"
          value={rating}
          radius={"full"}
          itemStyles={Styles1}
          onChange={setRating}
        />
      </div>
      {errors.title && (
        <div className={styles.danger}>{errors.title.message}</div>
      )}
      <textarea
        {...register("review")}
        id="review"
        placeholder="Add Review"
        className={styles.textAreaForm}
      ></textarea>
      {errors.review && (
        <div className={styles.danger}>{errors.review.message}</div>
      )}
      <button className={button.btn}>Submit Review</button>
    </form>
  );
};

export default ReviewForm;
