import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import InstancesCreateView from "./instances-create.view";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import React, { useEffect } from "react";
import { ModalContentsProps } from "../../../atoms/modal/modal-contents.view";
import useCreateModal from "../../../../hooks/useCreateModal";
import { useRouter } from "next/router";
import { InstanceAPI } from "../../../../apis/v1/instance.api";
import { ScheduleAPI } from "../../../../apis/v1/schedule.api";
import { ScheduleV1CreateReq } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.req.dto";
import { checkText } from "../../../../utils/public/selectMap";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";

function InstancesCreate({ token }: { token: string }) {
  const client = new InstanceAPI(true, token);
  const Schedule = new ScheduleAPI(true, token);
  const router = useRouter();
  const { forms, setForms } = useFormsHook();
  const { open, handleOpen, handleClose } = useCreateModal({ alert: false });
  const { modalContent, setModalContent } = useChangeModalViewHock();

  useEffect(() => {
    open.alert = false;
  }, [open, forms]);

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
    // console.log(forms);
  };

  const props = {
    instances: {
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
            const result = await Schedule.postCreateSchedule({
              body: { ...(forms as ScheduleV1CreateReq) }
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

            await client.postCreateInstance({ id: result?.data.data.id });
            setModalContent("인스턴스가 생성되었습니다.");
            return router.push({
              pathname: "/instances/list"
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
        title: "인스턴스 생성"
      },
      ModalContentsProps: {
        textAlign: "center",
        content: modalContent
      } as ModalContentsProps
    }
  };
  return (
    <>
      <InstancesCreateView {...props.instances} />
      <ModalLayoutView {...props.modalProps} />
    </>
  );
}

export default InstancesCreate;
