import { ROUTE } from "@/constants/route";

export const MY_PAGE_NAV = [
  {
    title: "내 정보 관리",
    content: [
      {
        name: "내정보",
        href: ROUTE.MY_PAGE,
      },
      {
        name: "찜한 목록",
        href: ROUTE.MY_PAGE_Likes,
      },
    ],
  },
  {
    title: "내가 쓴 글",
    content: [
      {
        name: "도와줄래요?",
        href: ROUTE.MY_PAGE_HELP_ME,
      },
      {
        name: "도와줄게요!",
        href: ROUTE.MY_PAGE_HELP_YOU,
      },
    ],
  },
];
