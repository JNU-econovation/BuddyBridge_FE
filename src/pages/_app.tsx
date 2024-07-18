import "@/styles/reset.scss";
import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";

import { Client } from "@stomp/stompjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { NextPage } from "next";

import type { AppProps } from "next/app";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

interface StompClientContextType {
  stompClient: Client | null;
}

export const StompClientContext = createContext<StompClientContextType | undefined>(undefined);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const client = new Client({
      brokerURL: "wss://buddybridge.13.209.34.25.sslip.io/socket/connect",
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log("WebSocket 서버에 연결되었습니다.", frame);
    };

    client.onStompError = (frame) => {
      console.error("Stomp 오류 발생", frame);
    };

    client.onWebSocketClose = (event) => {
      console.error("WebSocket 연결이 닫혔습니다.", event);
    };

    client.onWebSocketError = (event) => {
      console.error("WebSocket 오류가 발생했습니다.", event);
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StompClientContext.Provider value={{ stompClient }}>
        {getLayout(<Component {...pageProps} />)}
      </StompClientContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}
