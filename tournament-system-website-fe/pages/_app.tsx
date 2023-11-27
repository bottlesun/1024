import React, { ReactElement, ReactNode, useMemo } from "react";
import { CacheProvider, EmotionCache, Global } from "@emotion/react";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import createEmotionCache from "../utils/public/createEmotionCache";
import global from "../styles/global";
import { ThemeProvider } from "@mui/material/styles";
import { useColorStore } from "../stores/useColor.store";
import { NextPage } from "next";
import { createTheme } from "@mui/material";
import { getTheme } from "../constants/theme";
import NextConsole from "../utils/public/next.console";

// 브라우저에서 사용자의 전체 세션에 대해 공유되는 클라이언트 측 캐시입니다.
const clientSideEmotionCache = createEmotionCache();
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
};

const MyApp = (props: MyAppProps): JSX.Element => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const colors = useColorStore((state) => state.colors);
  const mode = colors ? "dark" : "light";
  let theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Global styles={global} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext): Promise<{ pageProps: any }> => {
  const props = await App.getInitialProps(context);
  NextConsole.info("getInitialProps!", "server", "/pages/_app.tsx", 29);
  return { ...props };
};

export default MyApp;
