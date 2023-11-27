import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

const Index: NextPage = (): JSX.Element => {
  const router = useRouter();
  router.push("/manager/login");

  return <>Index</>;
};

export default Index;
