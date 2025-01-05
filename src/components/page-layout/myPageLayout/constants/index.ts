import { ROUTE } from "@/constants/route";

export const MY_PAGE_NAV = [
  {
    title: "마이",
    content: [
      {
        name: "내정보",
        href: ROUTE.MY_PAGE,
        subPath: [ROUTE.MY_PAGE_EDIT],
      },
      {
        name: "찜한 목록",
        href: ROUTE.MY_PAGE_Likes,
      },
      {
        name: "내가 쓴 글",
        href: ROUTE.MY_PAGE_HELP_ME,
      },
      {
        name: "매칭된 봉사",
        href: ROUTE.MY_PAGE_Finished,
      },
    ],
  }
];
