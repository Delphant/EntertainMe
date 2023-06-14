import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Favicon from "react-favicon";
import favIcon from "./assets/Efavicon.ico";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@smastrom/react-rating/style.css";

import { AuthProvider } from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./Services/scrollToTop";
import refreshApi from "./Services/refresh";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
      refresh={refreshApi}
    >
      <BrowserRouter>
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <Favicon url={favIcon} />
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
