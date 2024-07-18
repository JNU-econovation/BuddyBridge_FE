import classNames from "classnames/bind";

import styles from "@/components/page-layout/chatLayout/components/ChatList/ChatListHeader/ChatListHeader.module.scss";
import { MATCHING_STATE } from "@/components/page-layout/chatLayout/constants/index";

const cn = classNames.bind(styles);

interface ChatListProps {
  matchingState: string;
  setMatchingState: (matchingState: string) => void;
}

export default function ChatListHeader({ matchingState, setMatchingState }: ChatListProps) {
  return (
    <div className={cn("container")}>
      <div className={cn("stateBox")}>
        {MATCHING_STATE.map((state) => (
          <button
            className={cn({ selected: matchingState === state.engState })}
            key={state.state}
            onClick={() => setMatchingState(state.engState)}
          >
            {state.state}
          </button>
        ))}
      </div>
    </div>
  );
}
