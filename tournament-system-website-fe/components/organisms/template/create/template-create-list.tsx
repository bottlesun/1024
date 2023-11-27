import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import React from "react";
import TemplateCreateListView from "./template-create-list.view";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import { ModalContentsProps } from "../../../atoms/modal/modal-contents.view";
import useCreateModal from "../../../../hooks/useCreateModal";
import { TemplateAPI } from "../../../../apis/v1/template.api";
import { useRouter } from "next/router";
import { TemplateV1CreateReq } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.req.dto";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";

const TemplateCreateList = ({ token }: { token: string }) => {
  const client = new TemplateAPI(true, token);

  const router = useRouter();
  const { forms, setForms } = useFormsHook();
  const { open, handleOpen, handleClose } = useCreateModal({ alert: false });
  const { modalContent, setModalContent } = useChangeModalViewHock();
  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
    //console.log(forms);
  };

  const props = {
    template: {
      defaultConfig: {
        onForms: handleForms
      },

      AdditionConfig: {
        onForms: handleForms,
        button: {
          text: "생성",
          onClick: async () => {
            const result = await client.postCreateTemplate({
              body: { ...(forms as TemplateV1CreateReq) }
            });
            handleOpen("alert");
            if (result.status === 401) {
              setModalContent("로그인이 필요합니다.");
              return router.push("/manager/login");
            }
            if (result.status !== 201) {
              return setModalContent("생성에 실패하였습니다.");
            }
            if (result.data.data.row_count === 0) {
              return setModalContent("변경 된 데이터가 없습니다.");
            }
            if (result.data.data.row_count < 0) {
              return setModalContent(
                <>
                  생성에 실패하였습니다.
                  <br />
                  관리자에게 문의해주세요.
                </>
              );
            }
            setModalContent("템플릿이 생성되었습니다.");
            return router.push({
              pathname: "/template/list"
            });
          },
          disabled: false
        }
      }
    },
    modalProps: {
      ModalLogicProps: {
        open: open.alert,
        handleClose: () => handleClose("alert"),
        handleOpen: () => handleOpen("alert")
      },
      ModalTopProps: {
        title: "템플릿 생성"
      },
      ModalContentsProps: {
        textAlign: "center",
        content: modalContent
      } as ModalContentsProps
    }
  };
  return (
    <>
      <TemplateCreateListView {...props.template} />
      <ModalLayoutView {...props.modalProps} />
    </>
  );
};
export default TemplateCreateList;
