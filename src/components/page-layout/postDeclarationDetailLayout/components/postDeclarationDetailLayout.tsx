import classNames from "classnames/bind";

import AdminNav from "@/components/common/AdminNav/AdminNav";
import DeclarationDetail from "@/components/common/DeclarationDetail/DeclarationDetail";
import styles from "@/components/page-layout/postDeclarationDetailLayout/components/postDeclarationDetailLayout.module.scss";

import PostContent from "./PostContent/PostContent";

const cn = classNames.bind(styles);

export default function PostDeclarationDetailLayout() {
  return (
    <div className={cn("container")}>
      <div className={cn("box")}>
        <AdminNav />
        <div className={cn("adminContainer")}>
          <DeclarationDetail />
          <PostContent />
        </div>
      </div>
    </div>
  );
}
