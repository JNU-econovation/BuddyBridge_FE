import { useEffect } from "react";

function useOutsideClick(refs: React.RefObject<HTMLElement>[], callback: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (refs.some((ref) => ref.current && ref.current.contains(event.target as Node))) {
        return;
      }
      callback();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
}

export default useOutsideClick;
