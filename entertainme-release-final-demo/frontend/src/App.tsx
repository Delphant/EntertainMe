import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./Pages/login";
import Footer from "./Components/Footer/Footer";
import CreateAccount from "./Pages/CreateAccount";
import ForgotPassword from "./Pages/ForgotPassword";
import RecMain from "./Pages/RecMain";
import Watchlist from "./Pages/Watchlist";
import Testing from "./Components/Testing/Testing";
import SearchPage from "./Pages/SearchPage";
import Navbar from "./Components/Navbar/Navbar";
import { RequireAuth } from "react-auth-kit";
import TitlePage from "./Pages/TitlePage";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<Login />} />

        <Route
          path="*"
          element={
            <RequireAuth loginPath="/">
              <ErrorPage />
            </RequireAuth>
          }
        />

        <Route
          path="/main"
          element={
            <RequireAuth loginPath="/">
              <RecMain />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/watchlist"
          element={
            <RequireAuth loginPath="/">
              <Watchlist />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/title/:id"
          element={
            <RequireAuth loginPath="/">
              <TitlePage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/search/:text"
          element={
            <RequireAuth loginPath="/">
              <SearchPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/testing"
          element={
            <RequireAuth loginPath="/">
              <Testing />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
