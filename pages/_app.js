import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <main>
      <Component {...pageProps} />
      <Toaster />
    </main>
  );
}
