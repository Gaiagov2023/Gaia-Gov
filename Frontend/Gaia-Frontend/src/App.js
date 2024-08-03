import { ThemeProvider } from "@mui/material/styles";
import Router from "./routers/router";
import { Toaster } from "react-hot-toast";
import { toasterConfig } from "./utils/toasterConfig";
import themeConfig from "./utils/themeConfig";
import { Providers } from "./utils/mergeProviders";

function App() {
  return (
    <ThemeProvider theme={themeConfig}>
      <Providers>
        <Router />
      </Providers>
      <Toaster {...toasterConfig} />
    </ThemeProvider>
  );
}

export default App;
