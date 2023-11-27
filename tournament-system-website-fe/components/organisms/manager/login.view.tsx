import React, { memo } from "react";
import ButtonView from "../../../components/atoms/button/button.view";
import { css } from "@emotion/react";
import Image from "next/image";
import LoginForm from "../../molecules/manager/login-Form";
import LoginCheckBox from "../../molecules/manager/login-checkBox";

const LoginView = ({ ...props }) => {
  const loginWrap = css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      width: 100%;
      min-width: 350px;
      max-width: 400px;
      min-height: 500px;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
  `;
  const loginHeader = css`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
      font-size: 28px;
      text-align: center;
      margin-top: 20px;
      cursor: default;
    }
    ul {
      padding-bottom: 10px;
    }
  `;

  const loginLink = css`
    margin-top: 10px;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 10px 0;
      li {
        a {
          font-size: 12px;
          text-decoration: underline;
        }
      }
    }
  `;

  return (
    <article css={loginWrap}>
      <form onSubmit={props.onSubmit}>
        <div css={loginHeader}>
          <h1>{1 <= props.logo.img.src.length ? <Image {...props.logo.img} /> : props.logo.text}</h1>
          <ul>
            <li>안녕하세요</li>
            <li>어드민페이지 입니다.</li>
          </ul>
        </div>
        <LoginForm {...props} />
        <div css={loginLink}>
          <ul>
            <li>
              <LoginCheckBox onForms={props.onForms} />
            </li>
            <li>{/*<Link href={"/instances/battle"}>회원가입하기</Link>*/}</li>
          </ul>
        </div>
        <ButtonView sx={{ margin: "5px 0 0" }} {...props.buttonProps} />
      </form>
    </article>
  );
};

export default memo(LoginView);
