import classNames from "classnames/bind";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import styles from "@/components/page-layout/chattingRoomDeclarationDetailLayout/components/chattingRoomDeclarationDetailLayout.module.scss";

import ChattingRoomContent from "./ChattingRoomContent/ChattingRoomContent";

const cn = classNames.bind(styles);

export default function ChattingRoomDeclarationDetailLayout() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <DeclarationDetail />
          <ChattingRoomContent />
        </div>
      </div>
    </div>
  );
}
