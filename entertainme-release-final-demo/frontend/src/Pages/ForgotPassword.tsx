import axios from "axios";
import ForgotForm from "../Components/Forms/ForgotForm";
import styles from "../Components/Forms/formBox.module.css";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect } from "react";
import ERRtoast from "../Hooks/ErrorToast";
import { ToastContainer, toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.login}>
      <ToastContainer />
      <ForgotForm
        onSubmit={(user) => {
          axios
            .post("http://127.0.0.1:5000/forgotpassword", {
              email: user.email,
              password: user.password,
            })
            .then((user) => {
              console.log(user);
              navigate("/");
            })
            .catch((error) => {
              ERRtoast(error.response.data);
            });
        }}
      ></ForgotForm>
    </div>
  );
}

export default ForgotPassword;
