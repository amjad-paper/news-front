import { GeneralContextProvider } from "@/stores/general";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { SearchAppBar } from "@/components/SearchAppBar/SearchAppBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { Footer } from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GeneralContextProvider>
        <Head>
          <title>News Paper</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <SearchAppBar />
        <Component {...pageProps} />
        <Footer></Footer>
      </GeneralContextProvider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
