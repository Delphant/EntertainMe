import styles from "../Forms/formBox.module.css";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import button from "../button.module.css";

// Zod modify validations
const schema = z
  .object({
    email: z.string().email(),
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
    message: "Passwords do not match",
    path: ["repassword"],
  });

type LoginFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

const ForgotForm = ({ onSubmit }: Props) => {
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
      <h1 className={styles.title}>Change Password</h1>
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

        <input
          {...register("password")}
          type="password"
          id="password"
          className={styles.fieldBox}
          placeholder="Enter New Password"
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
          placeholder="Re-Enter New Password"
        />

        {/* displaying password errors to user */}
        {errors.repassword && (
          <div className={styles.danger}>{errors.repassword.message}</div>
        )}
      </div>
      <button className={button.btn}>Change Password</button>
      <p className={styles.forgot}>
        Remembered Password?
        <a className={styles.link} onClick={() => navigate("/")}>
          Login
        </a>
      </p>
      <p className={styles.forgot}>
        Not Registered?
        <a className={styles.link} onClick={() => navigate("/create-account")}>
          Create Account
        </a>
      </p>
    </form>
  );
};

export default ForgotForm;
