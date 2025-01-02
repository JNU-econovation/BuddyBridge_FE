import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import Link from "next/link";
import { useRouter } from "next/router";

import getLogIn from "@/components/common/Header/apis/getLogIn";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";
import ArrowDown from "@/icons/arrow_down.svg";
import ChatArrow from "@/icons/chat_arrow.svg";
import Close from "@/icons/close.svg";

import CertifyVolunteeringModal from "./CertifyVolunteeringModal/CertifyVolunteeringModal";
import CompleteVolunteeringModal from "./CompleteVolunteeringModal/CompleteVolunteeringModal";
import ConfirmVolunteeringModal from "./ConfirmVolunteeringModal/ConfirmVolunteeringModal";
import GetNoVolunteeringModal from "./GetNoVolunteeringModal/GetNoVolunteeringModal";
import MyChat from "./MyChat/MyChat";
import OppositeChat from "./OppositeChat/OppositeChat";
import getChatingRoom from "../../../apis/getChatingRoom";
import putMatchingStatus from "../../../apis/putMatchingStatus";
import { useChatContext } from "../../chatLayout";

const cn = classNames.bind(styles);

interface ReceivedMessage {
  content: string;
  senderId: number;
  createdAt: Date;
  messageType: string;
}

interface ChattingList {
  chatMessages: ReceivedMessage[];
}

interface ChattingRoomContentProps {
  isHamburgerClick: boolean;
  setIsHamburgerClick: Dispatch<SetStateAction<boolean>>;
  matchingState: string;
}

interface putMatchingtype {
  chatingRoomId: number;
  status: string;
}

export default function ChattingRoomContent({
  isHamburgerClick,
  setIsHamburgerClick,
  matchingState,
}: ChattingRoomContentProps) {
  const { chatingRoomNumber, chattingRoomType } = useChatContext();
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [, setConnectionStatus] = useState("Disconnected");
  const clientRef = useRef<Client | null>(null);
  const { register, handleSubmit, reset } = useForm<ReceivedMessage>();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [isMatchingBtnClick, setIsMatchingBtnClick] = useState(false);
  const router = useRouter();
  const stateChangeRoomRef = useRef(null);
  const [isConfirmVolunteeringModalOpen, setIsConfirmVolunteeringModalOpen] = useState(false);
  const [isCompleteVolunteeringModalOpen, setIsCompleteVolunteeringModalOpen] = useState(false);
  const [isGetNoVolunteeringModalOpen, setIsGetNoVolunteeringModalOpen] = useState(false);
  const [isHelpDone, setIsHelpDone] = useState(false);

  const queryClient = useQueryClient();

  const [lastRef, inView] = useInView();
  const accessToken = localStorage.getItem("accessToken");

  const { data } = useQuery({
    queryKey: ["userLogIn"],
    queryFn: () => getLogIn(),
  });

  const {
    data: chattingData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["chatingRoom", chatingRoomNumber],
    queryFn: async ({ pageParam }) => {
      const result = await getChatingRoom(5, pageParam, chatingRoomNumber as number);
      queryClient.invalidateQueries({ queryKey: ["chatList", matchingState] });
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!chatingRoomNumber,
  });

  const chatAcceptMutation = useMutation({
    mutationFn: ({ chatingRoomId, status }: putMatchingtype) => putMatchingStatus(chatingRoomId, status),
    onSuccess: () => {
      router.reload();
    },
  });

  const sendMessage = useCallback(
    (data: ReceivedMessage) => {
      if (clientRef.current && clientRef.current.active) {
        clientRef.current.publish({
          destination: `/api/app/chat/${chatingRoomNumber}`,
          body: JSON.stringify({
            content: data.content,
            messageType: "CHAT",
          }),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        reset();
      }
    },
    [chatingRoomNumber, reset, accessToken],
  );

  const handleMatchingCompleteClick = () => {
    chatAcceptMutation.mutate({ chatingRoomId: chatingRoomNumber as number, status: "DONE" });
  };

  const handleMatchingIngClick = () => {
    chatAcceptMutation.mutate({ chatingRoomId: chatingRoomNumber as number, status: "PENDING" });
  };

  useOutsideClick([stateChangeRoomRef], () => setIsHamburgerClick(false));

  useEffect(() => {
    const chatingMessageList: ReceivedMessage[] = [];
    chattingData?.pages.map((chatingList: ChattingList) =>
      chatingList.chatMessages.map((chatMessages: ReceivedMessage) => chatingMessageList.push(chatMessages)),
    );
    setReceivedMessages(chatingMessageList.slice().reverse());

    const client = new Client({
      brokerURL: "wss://buddybridge.13.209.34.25.sslip.io/socket/connect",
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        console.log(str);
      },
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected");
        setConnectionStatus("Connected");
        client.subscribe(`/api/queue/chat/${chatingRoomNumber}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setReceivedMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        setConnectionStatus("Error: " + frame.headers["message"]);
      },
      onWebSocketError: (event) => {
        console.error("WebSocket error", event);
        setConnectionStatus("WebSocket Error");
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setConnectionStatus("Disconnected");
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [chatingRoomNumber, chattingData?.pages, accessToken]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [receivedMessages]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(sendMessage)();
    }
  };

  const handleHelpBtnClick = () => {
    setIsConfirmVolunteeringModalOpen((prev) => !prev);
    setIsHamburgerClick(false);
  };

  return (
    <>
      <div className={cn("container")}>
        <div className={cn("chattingBox")} ref={chatBoxRef}>
          <div ref={lastRef}></div>
          {receivedMessages?.map((msg, index) =>
            msg.messageType === "INFO" ? (
              <div className={cn("firstMessageContainer")} key={index}>
                <p className={cn("firstMessage")}>매칭이 생성되었습니다.</p>
              </div>
            ) : data?.memberId === msg.senderId ? (
              <MyChat date={msg.createdAt} chat={msg.content} key={index} />
            ) : (
              <OppositeChat
                date={msg.createdAt}
                key={index}
                oppsiteUser={chattingData?.pages[0].receiver}
                chat={msg.content}
              />
            ),
          )}
        </div>
        <form className={cn("form")} onSubmit={handleSubmit(sendMessage)}>
          <textarea
            className={cn("textarea")}
            placeholder="메시지를 입력하세요."
            onKeyDown={handleKeyDown}
            {...register("content", { required: true })}
          />
          <button type="submit" className={cn("sendBtn")}>
            <ChatArrow />
          </button>
        </form>
      </div>
      {isHamburgerClick && (
        <div className={cn("chatingOutContainer")}>
          <div className={cn("grayContainer")}></div>
          <div className={cn("whiteContainer")} ref={stateChangeRoomRef}>
            <Link href={ROUTE.CHAT} className={cn("chatingRoomOutButton")} onClick={() => setIsHamburgerClick(false)}>
              채팅방 나가기
            </Link>
            {data.memberId === chattingData?.pages[0].postAuthorId && (
              <div className={cn("stateChangeContainer")}>
                <p className={cn("stateChange")}>상태변경</p>
                <div className={cn("state")}>
                  {chattingRoomType === "DONE" ? "매칭완료" : "매칭중"}
                  <ArrowDown
                    className={cn("arrow", { arrowDown: isMatchingBtnClick })}
                    width={15}
                    height={15}
                    onClick={() => setIsMatchingBtnClick((prev) => !prev)}
                  />
                  {isMatchingBtnClick && (
                    <div className={cn("matchingStateContainer")}>
                      <button onClick={handleMatchingIngClick} className={cn("matchingBtn")}>
                        매칭중
                      </button>
                      <button onClick={handleMatchingCompleteClick} className={cn("matchingDoneBtn")}>
                        매칭완료
                      </button>
                    </div>
                  )}
                </div>
                {chattingRoomType === "DONE" && (
                  <button className={cn("helpBtn")} onClick={handleHelpBtnClick}>
                    도움을 받았나요?
                  </button>
                )}
              </div>
            )}
            {/* 도와줄래요?에서 봉사자에게 나오게 할 문장  */}
            <button
              className={cn("helpBtn")}
              onClick={() => {
                setIsHelpDone((prev) => !prev);
                setIsHamburgerClick(false);
              }}
            >
              도움을 주었나요?
            </button>
            <Close
              className={cn("close")}
              onClick={() => {
                setIsMatchingBtnClick(false);
                setIsHamburgerClick(!isHamburgerClick);
              }}
            />
          </div>
        </div>
      )}
      {isConfirmVolunteeringModalOpen && (
        <ConfirmVolunteeringModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsConfirmVolunteeringModalOpen}
          setIsCompleteVolunteeringModalOpen={setIsCompleteVolunteeringModalOpen}
          setIsGetNoVolunteeringModalOpen={setIsGetNoVolunteeringModalOpen}
        />
      )}
      {isCompleteVolunteeringModalOpen && (
        <CompleteVolunteeringModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsCompleteVolunteeringModalOpen}
        />
      )}
      {isGetNoVolunteeringModalOpen && (
        <GetNoVolunteeringModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsGetNoVolunteeringModalOpen}
          nickName={chattingData?.pages[0].receiver.receiverName}
        />
      )}
      {isHelpDone && (
        <CertifyVolunteeringModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsHelpDone}
          email={data.email}
        />
      )}
    </>
  );
}
