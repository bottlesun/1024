import React from "react";
import ExampleView, { ExampleViewProps } from "./example.view";

/**
 * Business logic component props type.
 */
export type ExampleProps = {
  text: string;
};

/**
 * Business logic component.
 * @author 박지훈
 * @version 0.1.0
 */
const Example = ({ text }: ExampleProps): JSX.Element => {
  /**
   * Business logic props object.
   */
  const props = {
    text
  } as ExampleViewProps;

  return (
    <>
      <ExampleView {...props} />
    </>
  );
};

export default Example;
