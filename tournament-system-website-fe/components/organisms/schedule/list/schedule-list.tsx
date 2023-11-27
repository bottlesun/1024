import ScheduleListView from "./schedule-list.view";
import BoxTextView from "../../../atoms/box/box-text.view";
import React, { useEffect, useState } from "react";
import useCreateModal from "../../../../hooks/useCreateModal";
import ModalLayoutButtonView from "../../../atoms/modal/modal-layout-button.view";
import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import ScheduleTableDefault from "../../../molecules/schedule/create/schedule-table-default";
import { ScheduleAPI } from "../../../../apis/v1/schedule.api";
import { useRouter } from "next/router";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import { InstanceAPI } from "../../../../apis/v1/instance.api";
import PaginationView from "../../../atoms/pagination/pagination.view";
import { ScheduleV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.res.dto";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";
import useModalPaginationCommonPropsHook from "../../../../hooks/useModalPaginationCommonProps.hook";

type ScheduleListProps = {
  body: {
    scheduleListData: ScheduleV1FindDataRes[];
    limit?: number;
    page?: number;
    total?: number;
  };
  token: string;
};
function ScheduleList({ body, token }: ScheduleListProps) {
  const client = new ScheduleAPI(true, token);
  const instanceAPI = new InstanceAPI(true, token);
  const page = body.page ? body.page : 1;
  const limit = body.limit ? body.limit : 9;
  const total = body.total ? body.total : 0;

  const router = useRouter();

  const createModal = useCreateModal({ alert: false, modal: false });
  const changeModalViewHock = useChangeModalViewHock();
  const { paginationProps, modalProps, alertProps } = useModalPaginationCommonPropsHook({ ...createModal, ...changeModalViewHock, router, page, limit, total });
  const { forms, setForms } = useFormsHook();

  const [scheduleListData, setScheduleListData] = useState([...body.scheduleListData]);

  const { open, handleOpen, handleClose } = createModal;
  const { setModalContent, setModalTitle, setModalButtonItem } = changeModalViewHock;

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
  };

  useEffect(() => {
    setScheduleListData([...body.scheduleListData]);
  }, [router]);

  const handleReadModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);

    // console.log("data", target.dataset.round);
    console.log(scheduleListData[no - 1]);
    handleOpen("alert");
    setModalTitle(`토너먼트 상세 정보 확인`);
    setModalContent(
      <>
        <ScheduleTableDefault onForms={handleForms} readOnly={true} data={scheduleListData[no - 1]} />
        {/*<InstancesTableAddition onForms={handleForms} readOnly={true} />*/}
      </>
    );
    setModalButtonItem([
      {
        id: "button-4",
        text: "확인",
        onClick: () => {
          return handleClose("alert");
        }
      }
    ]);
  };

  /*
   * @name handlePatchModalChange
   * @description 스케쥴 상세정보 수정 모달
   * */
  const handlePatchModalChange = (e: MouseEvent) => {
    // 토너먼트 상세정보 수정 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    handleOpen("alert");
    setModalTitle(`토너먼트 상세 정보 수정`);
    setModalContent(
      <>
        <ScheduleTableDefault forms={forms} onForms={handleForms} readOnly={false} data={scheduleListData[no - 1]} />
        {/*<TemplateTableAddition onForms={handleForms} readOnly={false} />*/}
      </>
    );
    setModalButtonItem([
      {
        id: "button-1",
        text: "수정",
        onClick: async () => {
          const result = await client.putUpdateSchedule({
            params: { id: scheduleListData[no - 1].id },
            body: { ...forms }
          });
          // console.log(result);
          // console.log("수정 완료", forms);
          handleOpen("modal");

          if (result.status !== 200) {
            setModalContent(
              <>
                수정에 실패하였습니다. <br />
                {result.data.message}
              </>
            );
            return router.push({
              pathname: router.pathname
            });
          }
          if (result.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (result.data.data.row_count < 0) {
            return setModalContent(
              <>
                수정에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("수정이 완료되었습니다.");
          return router.push({
            pathname: router.pathname
          });
        }
      },
      {
        id: "button-2",
        text: "아니요",
        onClick: () => {
          return handleClose("alert");
        },
        variant: "outlined"
      }
    ]);
  };

  /*
   * @name handleDeleteModalChange
   * @description 스케쥴 삭제 모달
   * */
  const handleDeleteModalChange = (e: MouseEvent) => {
    // 스케줄 리스트 삭제 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const id = Number(target.dataset?.scheduleid as string);

    handleOpen("alert");
    setModalTitle(`스케줄 리스트 삭제`);
    setModalContent(
      <>
        <BoxTextView text={`삭제하면 스케줄 리스트에서 삭제됩니다`} />
        <BoxTextView style={{ fontSize: "12px", opacity: "0.7" }} text={`(해당 스케줄을 스케줄 리스트에서 삭제하겠습니까?)`} />
      </>
    );
    setModalButtonItem([
      {
        id: "button-2",
        text: "삭제",
        onClick: async () => {
          const result = await client.deleteSchedule({ id: scheduleListData[no - 1].id });
          handleOpen("modal");
          handleClose("alert");
          if (result.status !== 200) {
            setModalContent("삭제에 실패하였습니다.");
            return router.push({
              pathname: router.pathname
            });
          }
          if (result.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (result.data.data.row_count < 0) {
            return setModalContent(
              <>
                삭제에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("스케줄 리스트에서 삭제되었습니다.");
          return router.push({
            pathname: router.pathname
          });
        }
      },
      { id: "button-3", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  /*
   * @name handleCreateModalChange
   * @description 인스턴트 생성 모달
   * */
  const handleCreateModalChange = (e: MouseEvent) => {
    // 인스턴트 생성 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);

    handleOpen("alert");
    setModalTitle(`인스턴스 등록`);
    setModalContent(
      <>
        <BoxTextView text={`해당 스케줄을 등록 하시겠습니까?`} />
        <BoxTextView style={{ fontSize: "12px", opacity: "0.7" }} text={`(등록하면 해당 스케줄을 인스턴스 리스트에 등록 합니다.)`} />
      </>
    );
    setModalButtonItem([
      {
        id: "button-1",
        text: "등록",
        onClick: async () => {
          const result = await instanceAPI.postCreateInstance({ id: scheduleListData[no - 1].id });
          handleOpen("modal");
          handleClose("alert");
          if (result.status !== 201) {
            setModalContent("등록에 실패하였습니다.");
            return router.push({
              pathname: router.pathname
            });
          }
          if (result.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (result.data.data.row_count < 0) {
            return setModalContent(
              <>
                등록에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("인스턴스가 등록되었습니다.");
          return router.push({ pathname: router.pathname });
        }
      },
      { id: "button-2", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  const scheduleProps = {
    scheduleList: {
      scheduleListData: scheduleListData,
      open: open,
      forms: forms,
      button: {
        readButton: {
          text: "확인",
          onClick: (e: MouseEvent) => handleReadModalChange(e),
          disabled: false
        },
        patchButton: {
          text: "수정",
          onClick: (e: MouseEvent) => handlePatchModalChange(e)
        },
        deleteButton: {
          text: "삭제",
          onClick: (e: MouseEvent) => handleDeleteModalChange(e)
        },
        createButton: {
          text: "등록",
          onClick: (e: MouseEvent) => handleCreateModalChange(e)
        }
      }
    },
    alertProps: alertProps,
    modalProps: modalProps,
    paginationProps: paginationProps
  };

  return (
    <>
      <ScheduleListView {...scheduleProps.scheduleList} />
      <PaginationView {...scheduleProps.paginationProps} />
      <ModalLayoutButtonView {...scheduleProps.alertProps} />
      <ModalLayoutView {...scheduleProps.modalProps} />
    </>
  );
}

export default ScheduleList;
