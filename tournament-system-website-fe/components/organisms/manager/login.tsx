import React, { useEffect, useState } from "react";
import LoginView from "./login.view";
import { useRouter } from "next/router";
import { BrandLogo } from "../../../utils/menu/menu";
import useFormsHook, { Forms } from "../../../hooks/useForms.hook";
import { ManagerAPI } from "../../../apis/v1/manager.api";
import { useCookies } from "react-cookie";

const client = new ManagerAPI(true);
const Login = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["access-token"]);

  const { forms, setForms } = useFormsHook();
  const [error, setError] = useState<{ id: boolean; password: boolean }>({ id: false, password: false });
  const [formHelperText, setFormHelperText] = useState<{ id: string; password: string }>({ id: "", password: "" });

  const handleForms = (key: string, value: any): void => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    const save = localStorage.getItem("save");
    if (id != null) {
      handleForms("id", id.toString());
    }
    if (save != null) {
      handleForms("save", JSON.parse(save));
    }
  }, [forms]);

  /**
   * 아이디 및 비밀번호 입력 변경 이벤트 함수.
   */
  // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
  //   setFormHelperText({ id: "", password: "" });
  //   setError({ id: false, password: false });
  //   handleForms(event.target.name, event.target.value);
  // };

  /*
   * key 입력 이벤트 함수.
   * */
  const handleInputKeyboard = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<boolean | void> => {
    if (event.key === "Enter") return handleSubmit();
  };

  /**
   * 로그인 버튼 이벤트 함수.
   */
  const handleSubmit = async (): Promise<boolean | void> => {
    console.dir("forms", forms);
    // 아이디 비밀번호 둘다 없음
    if (!forms.id && !forms.password) {
      console.log("아이디 비밀번호가 없음", forms);
      setFormHelperText({ id: "아이디를 입력해주세요.", password: "비밀번호를 입력해주세요." });
      setError({ id: true, password: true });
      return false;
    }

    if (!forms.id) {
      console.log("아이디가 없음", forms);
      setFormHelperText({ id: "아이디를 입력해주세요.", password: "" });
      setError({ id: true, password: false });
      return false;
    }

    if (!forms.password) {
      console.log("비밀번호가 없음", forms);
      setFormHelperText({ id: "아이디를 입력해주세요.", password: "비밀번호를 입력해주세요" });
      setError({ id: false, password: true });
      return false;
    }

    const result = await client.postLogin({
      user_id: forms.id,
      user_pw: forms.password
    });

    if (result?.status !== 201) {
      setFormHelperText({ id: "", password: "올바른 계정정보가 아닙니다. 다시 입력해주세요." });
      setError({ id: true, password: true });

      return false;
    }

    // 쿠키에 토큰 저장
    setCookie("access-token", result.data.data.access_token, { path: "/" });

    if (forms.save) {
      localStorage.setItem("id", forms.id);
      localStorage.setItem("save", forms.save);
    } else {
      localStorage.removeItem("id");
      localStorage.removeItem("save");
    }

    return router.push("/instances/battle");
  };
  const props = {
    logo: {
      ...BrandLogo
    },
    onSubmit: handleSubmit,
    onInputKeyDown: handleInputKeyboard,
    formHelperText,
    error,
    forms,
    onForms: handleForms,
    buttonProps: {
      size: "large",
      text: "로그인",
      onClick: () => handleSubmit()
    }
  };

  return <LoginView {...props} />;
};
export default Login;
