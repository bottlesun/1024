import ScheduleCreateView from "./schedule-create.view";
import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import { ScheduleAPI } from "../../../../apis/v1/schedule.api";
import { useRouter } from "next/router";
import React from "react";
import useCreateModal from "../../../../hooks/useCreateModal";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import { ModalContentsProps } from "../../../atoms/modal/modal-contents.view";
import { ScheduleV1CreateReq } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.req.dto";
import { checkText } from "../../../../utils/public/selectMap";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";

const ScheduleCreate = ({ token }: { token: string }) => {
  const client = new ScheduleAPI(true, token);

  const router = useRouter();
  const { forms, setForms } = useFormsHook();
  const { open, handleOpen, handleClose } = useCreateModal({ alert: false });
  const { modalContent, setModalContent } = useChangeModalViewHock();
  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
  };

  const props = {
    schedule: {
      defaultConfig: {
        onForms: handleForms
      },

      AdditionConfig: {
        onForms: handleForms,
        button: {
          text: "생성",
          onClick: async () => {
            if (forms.image_by_phase === null || checkText(forms.image_by_phase) === "NONE") {
              handleOpen("alert");
              return setModalContent("이미지를 업로드해주세요.");
            }
            const result = await client.postCreateSchedule({
              body: { ...(forms as ScheduleV1CreateReq) }
            });
            handleOpen("alert");

            if (result.status === 401) {
              setModalContent("로그인이 필요합니다.");
              return router.push("/manager/login");
            }
            if (result.status !== 201) {
              return setModalContent(
                <>
                  생성에 실패하였습니다.
                  <br /> {result.data.message}
                </>
              );
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
            setModalContent("스케줄이 생성되었습니다.");
            return router.push({
              pathname: "/schedule/list"
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
        title: "스케줄 생성"
      },
      ModalContentsProps: {
        textAlign: "center",
        content: modalContent
      } as ModalContentsProps
    }
  };

  return (
    <>
      <ScheduleCreateView {...props.schedule} />
      <ModalLayoutView {...props.modalProps} />
    </>
  );
};
export default ScheduleCreate;
