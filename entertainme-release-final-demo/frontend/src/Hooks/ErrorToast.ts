import { ToastContainer, toast } from "react-toastify";
import tStyles from "../Components/toast.module.css";

const ERRtoast = (data: string) => {
    toast(data, {
        position: "top-center",
        autoClose: 2000,
        className: tStyles.watchlistToast,
        style: { borderRadius: '20px' },
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false,
        closeButton: false,
    });
};

export default ERRtoast;