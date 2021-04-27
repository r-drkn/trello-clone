import { GlobalContextProvider } from "../context/GlobalContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
