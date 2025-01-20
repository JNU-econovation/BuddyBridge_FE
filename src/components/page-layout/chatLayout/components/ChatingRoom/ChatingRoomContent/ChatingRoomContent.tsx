import { Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

import { Client } from "@stomp/stompjs";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

import { useRouter } from "next/router";

import getLogIn from "@/components/common/Header/apis/getLogIn";
import openToast from "@/components/common/Toast/features/openToast";
import styles from "@/components/page-layout/chatLayout/components/ChatingRoom/ChatingRoomContent/ChatingRoomContent.module.scss";
import { ROUTE } from "@/constants/route";
import useOutsideClick from "@/hooks/useOutsideClick";
import ArrowDown from "@/icons/arrow_down.svg";
import ChatArrow from "@/icons/chat_arrow.svg";
import Close from "@/icons/close.svg";
import Declaration from "@/icons/declaration.svg";

import CertifyVolunteeringModal from "./CertifyVolunteeringModal/CertifyVolunteeringModal";
import CompleteVolunteeringModal from "./CompleteVolunteeringModal/CompleteVolunteeringModal";
import ConfirmVolunteeringModal from "./ConfirmVolunteeringModal/ConfirmVolunteeringModal";
import DeclarationModal from "./DeclarationModal/DeclarationModal";
import GetNoVolunteeringModal from "./GetNoVolunteeringModal/GetNoVolunteeringModal";
import MyChat from "./MyChat/MyChat";
import OppositeChat from "./OppositeChat/OppositeChat";
import RegisterCertifyVolunteeringModal from "./RegisterCertifyVolunteeringModal/RegisterCertifyVolunteeringModal";
import deleteMatching from "../../../apis/deleteMatching";
import getChatingRoom from "../../../apis/getChatingRoom";
import postCertificationRequest from "../../../apis/postCertificationRequest";
import putMatchingStatus from "../../../apis/putMatchingStatus";

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

interface putMatchingType {
  chattingRoomId: number;
  status: string;
}

interface deleteMatchingErrorResponse {
  error: {
    message: string;
  };
}

export default function ChattingRoomContent({
  isHamburgerClick,
  setIsHamburgerClick,
  matchingState,
}: ChattingRoomContentProps) {
  const router = useRouter();
  const chatingRoomNumber = Number(router.query["id"]);
  const [receivedMessages, setReceivedMessages] = useState<ReceivedMessage[]>([]);
  const [, setConnectionStatus] = useState("Disconnected");
  const clientRef = useRef<Client | null>(null);
  const { register, handleSubmit, reset } = useForm<ReceivedMessage>();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [isMatchingBtnClick, setIsMatchingBtnClick] = useState(false);
  const stateChangeRoomRef = useRef(null);
  const matchingStatusChangeRef = useRef(null);
  const [isConfirmVolunteeringModalOpen, setIsConfirmVolunteeringModalOpen] = useState(false);
  const [isCompleteVolunteeringModalOpen, setIsCompleteVolunteeringModalOpen] = useState(false);
  const [isGetNoVolunteeringModalOpen, setIsGetNoVolunteeringModalOpen] = useState(false);
  const [isHelpDone, setIsHelpDone] = useState(false);
  const [isCertificationClick, setIsCertificationClick] = useState(false);
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false);
  DeclarationModal;
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
      const result = await getChatingRoom(5, pageParam, chatingRoomNumber);
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      lastPage.nextPage ? lastPage.cursor : undefined,
    enabled: !!chatingRoomNumber,
  });

  const { data: chattingRoomData } = useQuery({
    queryKey: ["chattingRoomData", chatingRoomNumber],
    queryFn: () => getChatingRoom(1, 0, chatingRoomNumber),
  });

  const changeMatchingStatusMutation = useMutation({
    mutationFn: ({ chattingRoomId, status }: putMatchingType) => putMatchingStatus(chattingRoomId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList", matchingState] });
      queryClient.invalidateQueries({ queryKey: ["chattingRoomData", chatingRoomNumber] });
    },
    onError: (error: AxiosError<deleteMatchingErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const postCertificationRequestMutation = useMutation({
    mutationFn: () => postCertificationRequest(chatingRoomNumber),
    onSuccess: () => {
      openToast("success", "봉사 인증 요청이 완료되었습니다.");
    },
    onError: (error: AxiosError<deleteMatchingErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const deleteMatchingMutation = useMutation({
    mutationFn: () => deleteMatching(chatingRoomNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList", matchingState] });
      router.push(ROUTE.CHAT);
      openToast("success", "매칭이 삭제되었습니다.");
      () => setIsHamburgerClick(false);
    },
    onError: (error: AxiosError<deleteMatchingErrorResponse>) => {
      if (error.response) {
        openToast("error", error.response.data.error.message);
      }
    },
  });

  const chattingRoomType = chattingRoomData?.matchingStatus;

  useOutsideClick([stateChangeRoomRef], () => setIsHamburgerClick(false));
  useOutsideClick([matchingStatusChangeRef], () => setIsMatchingBtnClick(false));

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

  const handleMatchingStatusChangeClick = () => {
    changeMatchingStatusMutation.mutate({ chattingRoomId: chatingRoomNumber as number, status: "TOGGLE_DONE" });
    setIsMatchingBtnClick(false);
  };

  const handleDeleteMatching = () => {
    deleteMatchingMutation.mutate();
  };

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
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected");
        setConnectionStatus("Connected");
        queryClient.invalidateQueries({ queryKey: ["chatList", matchingState] });

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
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();
      handleSubmit(sendMessage)();
    }
  };

  const handleHelpBtnClick = () => {
    setIsConfirmVolunteeringModalOpen((prev) => !prev);
    setIsHamburgerClick(false);
  };

  const handleHelpRequestBtnClick = () => {
    setIsHamburgerClick(false);
    postCertificationRequestMutation.mutate();
  };

  return (
    <>
      <div className={cn("container")}>
        <div className={cn("chattingBox")} ref={chatBoxRef}>
          <div ref={lastRef}></div>
          {receivedMessages?.map((msg, index) =>
            msg.messageType === "INFO" ? (
              <div className={cn("firstMessageContainer")} key={index}>
                <p className={cn("firstMessage")}>{msg.content}</p>
              </div>
            ) : msg.messageType === "REQUEST" &&
              ((chattingData?.pages[0].postType === "TAKER" && data?.memberId !== msg.senderId) ||
                (chattingData?.pages[0].postType === "GIVER" && data?.memberId !== msg.senderId)) ? (
              <OppositeChat
                date={msg.createdAt}
                key={index}
                oppsiteUser={chattingData?.pages[0].receiver}
                chat={msg.content}
              />
            ) : msg.messageType === "REQUEST" &&
              ((chattingData?.pages[0].postType === "TAKER" && data?.memberId === msg.senderId) ||
                (chattingData?.pages[0].postType === "GIVER" && data?.memberId === msg.senderId)) ? (
              <MyChat date={msg.createdAt} chat={msg.content} key={index} />
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
            <button className={cn("chatingRoomOutButton")} onClick={handleDeleteMatching}>
              채팅방 나가기
            </button>
            {data.memberId === chattingData?.pages[0].postAuthorId && (
              <div className={cn("stateChangeContainer")}>
                <p className={cn("stateChange")}>상태변경</p>
                <div className={cn("state")}>
                  {chattingRoomType === "DONE" ||
                  chattingRoomType === "VOLUNTEERING_COMPLETED" ||
                  chattingRoomType === "VOLUNTEERING_VERIFIED"
                    ? "매칭완료"
                    : "매칭중"}
                  <ArrowDown
                    className={cn("arrow", { arrowDown: isMatchingBtnClick })}
                    width={15}
                    height={15}
                    onClick={() => setIsMatchingBtnClick((prev) => !prev)}
                  />
                  {isMatchingBtnClick && (
                    <div className={cn("matchingStateContainer")} ref={matchingStatusChangeRef}>
                      <button onClick={handleMatchingStatusChangeClick} className={cn("matchingBtn")}>
                        매칭중
                      </button>
                      <button onClick={handleMatchingStatusChangeClick} className={cn("matchingDoneBtn")}>
                        매칭완료
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {chattingRoomType === "DONE" &&
              ((chattingData?.pages[0].postType === "TAKER" && data.memberId === chattingData?.pages[0].postAuthorId) ||
                (chattingData?.pages[0].postType === "GIVER" &&
                  data.memberId !== chattingData?.pages[0].postAuthorId)) && (
                <button className={cn("helpBtn")} onClick={handleHelpBtnClick}>
                  도움을 받았나요?
                </button>
              )}
            {chattingRoomType === "VOLUNTEERING_COMPLETED" &&
              ((chattingData?.pages[0].postType === "TAKER" && data.memberId !== chattingData?.pages[0].postAuthorId) ||
                (chattingData?.pages[0].postType === "GIVER" &&
                  data.memberId === chattingData?.pages[0].postAuthorId)) && (
                <button
                  className={cn("helpBtn")}
                  onClick={() => {
                    setIsHelpDone((prev) => !prev);
                    setIsHamburgerClick(false);
                  }}
                >
                  도움을 주었나요?
                </button>
              )}
            {chattingRoomType === "VOLUNTEERING_VERIFIED" &&
              ((chattingData?.pages[0].postType === "TAKER" && data.memberId !== chattingData?.pages[0].postAuthorId) ||
                (chattingData?.pages[0].postType === "GIVER" &&
                  data.memberId === chattingData?.pages[0].postAuthorId)) && (
                <button
                  className={cn("helpBtn")}
                  onClick={() => {
                    setIsCertificationClick((prev) => !prev);
                    setIsHamburgerClick(false);
                  }}
                >
                  도움을 줬어요!
                </button>
              )}
            {chattingRoomData.canVerificationRequest &&
              chattingRoomType === "DONE" &&
              ((chattingData?.pages[0].postType === "TAKER" && data.memberId !== chattingData?.pages[0].postAuthorId) ||
                (chattingData?.pages[0].postType === "GIVER" &&
                  data.memberId === chattingData?.pages[0].postAuthorId)) && (
                <button className={cn("helpBtn")} onClick={handleHelpRequestBtnClick}>
                  봉사 인증 요청하기
                </button>
              )}
            <button
              className={cn("declarationBtn")}
              onClick={() => {
                setIsDeclarationModalOpen(true);
                setIsHamburgerClick(false);
              }}
            >
              <Declaration />
              신고하기
            </button>
            <Close
              className={cn("close")}
              onClick={() => {
                setIsMatchingBtnClick(false);
                setIsHamburgerClick(false);
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
          volunteeringMutation={(data: putMatchingType, options?: any) =>
            changeMatchingStatusMutation.mutate(data, options)
          }
          chattingRoomId={chatingRoomNumber as number}
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
        <RegisterCertifyVolunteeringModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsHelpDone}
          email={data.email}
          name={data.name}
          matchingId={chatingRoomNumber as number}
        />
      )}
      {isCertificationClick && (
        <CertifyVolunteeringModal setState={setIsCertificationClick} matchingId={chatingRoomNumber as number} />
      )}
      {isDeclarationModalOpen && (
        <DeclarationModal
          postType={chattingData?.pages[0].postType}
          postId={chattingData?.pages[0].postId}
          setState={setIsDeclarationModalOpen}
          name={chattingData?.pages[0].receiver.receiverName}
          chattingRoomId={chatingRoomNumber as number}
        />
      )}
    </>
  );
}
