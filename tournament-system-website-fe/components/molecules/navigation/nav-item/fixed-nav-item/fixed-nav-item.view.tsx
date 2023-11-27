import { css } from "@emotion/react";
import Link from "next/link";

const FixedNavItemView = ({ ...props }) => {
  const { name, child, depth1Name, depth2Name } = props;
  const ListWrap = css`
    padding: 0 0 0 4rem;
    box-sizing: border-box;
    margin: 0 0 20px;
    p {
      cursor: default;
      font-weight: 500;
      &.active {
        text-decoration: underline;
        color: var(--text-color);
      }
    }

    li {
      margin-top: 3px;
      font-size: 14px;
      &.active {
        font-weight: 400;
        text-decoration: underline;
        a {
          font-weight: 400;
        }
      }
      &:hover {
        a {
          text-decoration: underline;
          font-weight: bold;
        }
      }
    }
  `;

  return (
    <ul css={ListWrap}>
      <p className={depth1Name === name ? "active" : ""}>{name}</p>
      {child.map((subItem: any, index: number) => (
        <li key={index} className={subItem.name === depth2Name ? "active" : ""}>
          {" "}
          <Link href={{ pathname: subItem.path, query: {} }}>{subItem.name}</Link>
        </li>
      ))}
    </ul>
  );
};
export default FixedNavItemView;
