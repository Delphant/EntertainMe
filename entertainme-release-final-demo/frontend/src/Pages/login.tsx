import axios from "axios";
import LoginForm from "../Components/Forms/LoginForm";
import styles from "../Components/Forms/formBox.module.css";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ERRtoast from "../Hooks/ErrorToast";

function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className={styles.login}>
      <ToastContainer />
      <LoginForm
        onSubmit={(user) =>
          axios
            .post("http://localhost:5000/token", {
              email: user.email,
              password: user.password,
            })
            .then((response) => {
              if (
                signIn({
                  token: response.data.access_token,
                  expiresIn: response.data.access_token_exp, //time for token expiration min
                  tokenType: "Bearer",
                  authState: { userId: response.data.user_id },
                  refreshToken: response.data.refresh_token,
                  refreshTokenExpireIn: response.data.refresh_token_exp,
                })
              ) {
                navigate("/main");
              } else {
                console.log("ERROR Login Fail");
              }
            })
            .catch((error) => {
              ERRtoast(error.response.data);
            })
        }
      ></LoginForm>
    </div>
  );
}

export default Login;
