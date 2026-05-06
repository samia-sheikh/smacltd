import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense>
    <GoogleOAuthProvider clientId="1015257204006-kmud8rr1esidpead1af0esbc6m2bv6p6.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </Suspense>
);

reportWebVitals();
