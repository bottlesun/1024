export type RoutesType = {
  NAME: string;
  URL: string;
};

const ROUTES_SYMBOLIC = [
  {
    NAME: "ABOUT",
    URL: "/about"
  },
  {
    NAME: "WORK",
    URL: "/work"
  },
  {
    NAME: "CAREERS",
    URL: "/careers/create"
  },
  {
    NAME: "CONTACT",
    URL: "/contact/create"
  }
] as RoutesType[];

export default ROUTES_SYMBOLIC;
