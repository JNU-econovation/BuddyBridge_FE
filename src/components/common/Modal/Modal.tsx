import { Dispatch, ReactNode, SetStateAction, useRef } from "react";

import classNames from "classnames/bind";

import styles from "@/components/common/Modal/Modal.module.scss";
import useOutsideClick from "@/hooks/useOutsideClick";

import ModalPortal from "../ModalPortal/ModalPortal";

const cn = classNames.bind(styles);

interface ModalProps {
  children: ReactNode;
  className: string;
  setState: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ children, className, setState }: ModalProps) {
  const modalRef = useRef(null);

  useOutsideClick([modalRef], () => setState(false));

  return (
    <ModalPortal>
      <div className={cn("container")}>
        <div ref={modalRef} className={cn("box", className)}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
