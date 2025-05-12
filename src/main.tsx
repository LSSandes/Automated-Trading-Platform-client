import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
// import { WhopProvider } from "./context/WhopContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ReduxProvider store={store}>
          <GoogleOAuthProvider clientId="579336041727-ugm3o0uvteodirpjas3c15r981dju9je.apps.googleusercontent.com">
            {/* <WhopProvider> */}
              <App />
            {/* </WhopProvider> */}
          </GoogleOAuthProvider>
        </ReduxProvider>
      </JotaiProvider>
    </QueryClientProvider>
  </StrictMode>
);
