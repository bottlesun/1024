import React from "react";
import { css } from "@emotion/react";

/**
 * View component props type.
 */
export type ExampleViewProps = {
  text: string;
};

/**
 * View component.
 * @author 박지훈
 * @version 0.1.0
 */
const ExampleView = ({ text }: ExampleViewProps): JSX.Element => {
  /**
   * Emotion Style object.
   */
  const styles = {
    wrap: css`
      width: 100%;
      height: 100%;
    `
  };

  return (
    <>
      <div css={styles.wrap}>{text}</div>
    </>
  );
};

export default ExampleView;
