import axios from "axios";
import CreateForm from "../Components/Forms/CreateForm";
import styles from "../Components/Forms/formBox.module.css";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ERRtoast from "../Hooks/ErrorToast";

function CreateAccount() {
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
      <CreateForm
        onSubmit={(user) =>
          axios
            .post("http://127.0.0.1:5000/register", {
              first: user.first,
              last: user.last,
              email: user.email,
              password: user.password,
            })
            .then((user) => {
              console.log(user);
              navigate("/");
            })
            .catch((error) => {
              ERRtoast(error.response.data);
            })
        }
      ></CreateForm>
    </div>
  );
}

export default CreateAccount;
