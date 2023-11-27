import Router from "next/router";

export default class NextRedirect {
  public static server = (url: string): any => {
    return {
      redirect: {
        permanent: false,
        destination: url
      }
    };
  };

  public static client = async (url: string): Promise<boolean> => {
    return await Router.push(url);
  };
}
