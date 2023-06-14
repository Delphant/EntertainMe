import styles from "../Components/Recommendation/main.module.css";

function ErrorPage() {
  return (
    <>
      <div className={styles.main} style={{ color: "white" }}>
        <img
          src="/logo.png"
          alt="EntertainMe! Logo"
          style={{ width: "150px", height: "150px" }}
        />
        <h1>Error 404</h1>
        <a>This page does not exist</a>
      </div>
    </>
  );
}

export default ErrorPage;
