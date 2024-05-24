import { useState, useEffect, RefObject, SetStateAction, Dispatch } from "react";

type UseDetectCloseReturn = [boolean, Dispatch<SetStateAction<boolean>>];

const useDetectClose = (ref: RefObject<HTMLElement>, initialState: boolean): UseDetectCloseReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen, ref]);
  return [isOpen, setIsOpen];
};

export default useDetectClose;
