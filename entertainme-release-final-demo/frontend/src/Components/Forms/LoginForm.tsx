import styles from "../Forms/formBox.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import button from "../button.module.css";

// Zod modify validations
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

// Zod infer data to LoginFormData
type LoginFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ onSubmit }: Props) => {
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
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formbox}>
        <input
          {...register("email")}
          id="email"
          autoComplete="email"
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
          autoComplete="email"
          className={styles.fieldBox}
          placeholder={"Enter Password"}
        />

        {/* displaying password errors to user */}
        {errors.password && (
          <div className={styles.danger}>{errors.password.message}</div>
        )}
      </div>

      <a
        className={[styles.forgot, styles.link].join(" ")}
        onClick={() => navigate("/forgot-password")}
      >
        Forgot Password?
      </a>

      <button className={button.btn}>Login</button>

      <p className={styles.forgot}>
        Not Registered?{" "}
        <a className={styles.link} onClick={() => navigate("create-account")}>
          Create Account
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
