import styles from "../Forms/formBox.module.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import button from "../button.module.css";

// Zod modify validations
const schema = z
  .object({
    email: z.string().email(),
    first: z
      .string()
      .min(2, { message: "First name is required" })
      .regex(new RegExp("^[A-Za-z]+$"), {
        message: "Must contain letters",
      }),
    last: z
      .string()
      .min(2, { message: "Last name is required" })
      .regex(new RegExp("^[A-Za-z]+$"), {
        message: "Must contain letters",
      }),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" })
      .regex(new RegExp(".*[A-Z].*"), {
        message: "Must contain at least one uppercase letter",
      })
      .regex(new RegExp(".*[a-z].*"), {
        message: "Must contain at least one lowercase letter",
      })
      .regex(new RegExp(".*[0-9].*"), {
        message: "Must contain at least one number",
      })
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
        message: "Must contain at least one special character",
      }),
    repassword: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" })
      .regex(new RegExp(".*[A-Z].*"), {
        message: "Must contain at least one uppercase letter",
      })
      .regex(new RegExp(".*[a-z].*"), {
        message: "Must contain at least one lowercase letter",
      })
      .regex(new RegExp(".*[0-9].*"), {
        message: "Must contain at least one number",
      })
      .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), {
        message: "Must contain at least one special character",
      }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Password does not match",
    path: ["repassword"],
  });

// Zod infer data to LoginFormData
type LoginFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

const CreateForm = ({ onSubmit }: Props) => {
  const navigate = useNavigate();

  // Resolving Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      className={styles.box}
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <h1 className={styles.title}>Create Account</h1>
      <div className={styles.formbox}>
        <input
          {...register("email")}
          id="email"
          className={styles.fieldBox}
          placeholder="Enter Email"
        />

        {/* displaying email errors to user */}
        {errors.email && (
          <div className={styles.danger}>{errors.email.message}</div>
        )}

        <div className={styles.formbox2}>
          <input
            {...register("first")}
            id="first"
            className={styles.fieldBox}
            placeholder="First Name"
          />

          <input
            {...register("last")}
            id="last"
            className={styles.fieldBox}
            placeholder="Last Name"
          />
        </div>
        <div className={styles.formbox2}>
          {errors.first && (
            <div className={styles.danger}>{errors.first.message}</div>
          )}
          {errors.last && (
            <div className={styles.danger}>{errors.last.message}</div>
          )}
        </div>

        <input
          {...register("password")}
          type="password"
          id="password"
          className={[styles.fieldBox, styles["fieldBox:focus"]].join(" ")}
          placeholder="Enter Password"
        />

        {/* displaying password errors to user */}
        {errors.password && (
          <div className={styles.danger}>{errors.password.message}</div>
        )}

        <input
          {...register("repassword")}
          type="password"
          id="repassword"
          className={styles.fieldBox}
          placeholder="Re-Enter Password"
        />

        {/* displaying password errors to user */}
        {errors.repassword && (
          <div className={styles.danger}>{errors.repassword.message}</div>
        )}
      </div>
      <button className={button.btn}>Create Account</button>

      <p className={styles.forgot}>
        Already Registered?
        <a className={styles.link} onClick={() => navigate("/")}>
          Login
        </a>
      </p>
    </form>
  );
};

export default CreateForm;
