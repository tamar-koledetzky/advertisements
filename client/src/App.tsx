import Layout from "./layouts/Layout";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import InitializeAuth from "./auth/InitializeAuth";
// import ThemeProvider from "@mui/material/styles/ThemeProvider";
// import theme from "./Theme";


function App() {
  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <Provider store={store}>
          <InitializeAuth>
            <RouterProvider router={router} />
          </InitializeAuth>
        </Provider>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
