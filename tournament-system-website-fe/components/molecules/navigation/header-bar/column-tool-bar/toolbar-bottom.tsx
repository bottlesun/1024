import React, { ChangeEvent, useEffect, useState } from "react";
import ToolbarBottomView from "./toolbar-bottom.view";
import useInputHooks from "../../../../../hooks/useInput.hooks";
import { useRouter } from "next/router";

function ToolbarBottom({ ...props }) {
  const { onChange, inputs } = useInputHooks({ search: "" });
  const [switchSearch, setSwitchSearch] = useState(false);
  const { search } = inputs;
  const router = useRouter();

  useEffect(() => {
    if (router.query.filter) {
      router.push({
        pathname: router.pathname,
        query: {}
      });
    }
  }, []);

  useEffect(() => {
    // console.log(router.query.is_done);
    if (router.query.is_done === undefined) {
      setSwitchSearch(false);
    }
  }, [router.query.is_done]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchSearch(event.target.checked);

    return router.push({
      pathname: router.pathname,
      query: { is_done: !switchSearch }
    });
  };

  const ToolbarBottomProps = {
    ...props,
    inputProps: {
      placeholder: "조회 내용을 입력해주세요",
      value: search,
      onChange: onChange,
      name: "search"
    },
    searchButtonProps: {
      text: "조회",
      onClick: () => {
        inputs.search = "";

        if (search === "")
          return router.push({
            pathname: router.pathname,
            query: {}
          });

        return router.push({
          pathname: router.pathname,
          query: { filter: search }
        });
      }
    },
    switchSearchProps: {
      checked: switchSearch,
      onChange: handleSwitchChange,
      label: "완료된 토너먼트"
    }
  };

  return <ToolbarBottomView {...ToolbarBottomProps} />;
}

export default ToolbarBottom;
