import classNames from "classnames/bind";

import Chat from "@/components/common/Chat/Chat";
import styles from "@/components/page-layout/chatLayout/components/ChatList/ChatListContent/ChatListContent.module.scss";
import NoImg from "@/images/noimg.png";

const cn = classNames.bind(styles);

const mock = [
  {
    name: "민보",
    content: " 안녕하세요 안녕하세요 안녕하세요안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 1,
    img: NoImg,
  },
  {
    name: "민보",
    content: "안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 2,
    img: NoImg,
  },
  {
    name: "민보",
    content: "안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 3,
    img: NoImg,
  },
  {
    name: "민보",
    content: "안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 4,
    img: NoImg,
  },
  {
    name: "민보",
    content: "안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 5,
    img: NoImg,
  },
  {
    name: "민보",
    content: "안녕하세요 안녕하세요 안녕하세요",
    date: "5.5",
    type: "도와줄래요? 201",
    key: 6,
    img: NoImg,
  },
];

export default function ChatListContent() {
  // api 호출

  return (
    <div className={cn("container")}>
      {mock.map((chat) => (
        <Chat
          img={chat.img}
          content={chat.content}
          date={chat.date}
          name={chat.name}
          type={chat.type}
          key={chat.key}
          id={chat.key}
        />
      ))}
    </div>
  );
}
