import { Toaster } from "react-hot-toast";
import "../styles/index.scss";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
