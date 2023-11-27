import React, { useEffect, useState } from "react";
import InstancesListView from "./instances-list.view";
import useCreateModal from "../../../../hooks/useCreateModal";
import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import ModalLayoutButtonView from "../../../atoms/modal/modal-layout-button.view";
import { InstanceAPI } from "../../../../apis/v1/instance.api";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import { useRouter } from "next/router";
import InstancesTableReadOnly from "../../../molecules/instances/create/instances-table-readOnly";
import PaginationView from "../../../atoms/pagination/pagination.view";
import { PostDataTypes } from "../../../../apis/types/instance.api.type";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";
import useModalPaginationCommonPropsHook from "../../../../hooks/useModalPaginationCommonProps.hook";

type InstancesListProps = {
  body: {
    instancesListData: PostDataTypes[];
    limit?: number;
    page?: number;
    total?: number;
  };
  token: string;
};

function InstancesList({ body, token }: InstancesListProps) {
  const client = new InstanceAPI(true, token);
  const page = body.page ? body.page : 1;
  const limit = body.limit ? body.limit : 9;
  const total = body.total ? body.total : 0;

  const router = useRouter();
  const createModal = useCreateModal({ alert: false, modal: false });
  const changeModalViewHock = useChangeModalViewHock();
  const { paginationProps, modalProps, alertProps } = useModalPaginationCommonPropsHook({ ...createModal, ...changeModalViewHock, router, page, limit, total });
  const { forms, setForms } = useFormsHook();

  const [instancesListData, setInstancesListData] = useState([...body.instancesListData]);
  const [instancesReadOnlyData, setInstancesReadOnlyData] = useState([]);

  const { open, handleOpen, handleClose } = createModal;
  const { setModalContent, setModalTitle, setModalButtonItem } = changeModalViewHock;

  useEffect(() => {
    setInstancesListData(body.instancesListData);
  }, [body.instancesListData]);

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
    // console.log(forms);
  };
  /*modal*/
  const handleReStartModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);

    handleOpen("alert");
    setModalTitle(`토너먼트 인스턴트 재개`);
    setModalContent(`토너먼트를 재개 하시겠습니까?`);
    setModalButtonItem([
      {
        id: "button-0",
        text: "재개",
        onClick: async () => {
          const Resume = await client.postResumeInstance({ id: id });

          handleOpen("modal");
          if (Resume?.status !== 201) {
            setModalContent("토너먼트 재개 실패하였습니다.");
            return router.push({
              pathname: router.pathname,
              query: { ...router.query }
            });
          }
          if (Resume.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (Resume.data.data.row_count < 0) {
            return setModalContent(
              <>
                토너먼트 재개 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          console.log("재시작 message_id", Resume?.data.data.message_id);
          setModalContent("토너먼트 재개 요청이 완료되었습니다.");
          return router.push({
            pathname: router.pathname,
            query: { ...router.query }
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  const handleStopModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);

    handleOpen("alert");
    setModalTitle(`토너먼트 인스턴트 중지`);
    setModalContent(`토너먼트를 중지 하시겠습니까?`);
    setModalButtonItem([
      {
        id: "button-0",
        text: "중지",
        onClick: async () => {
          const Suspend = await client.postSuspendInstance({ id: id });

          handleOpen("modal");

          if (Suspend?.status !== 201) {
            setModalContent(Suspend?.data.message);
            return router.push({
              pathname: router.pathname
            });
          }

          if (Suspend.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (Suspend.data.data.row_count < 0) {
            return setModalContent(
              <>
                토너먼트 중지에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }

          console.log("중지 message_id", Suspend?.data.data.message_id);
          setModalContent("토너먼트 중지 요청이 완료 되었습니다.");
          return router.push({
            pathname: router.pathname
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  const handleReadModalChange = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);
    const result = await client.getInstance({ id: id });
    const data = result?.data.data;
    setInstancesReadOnlyData(data);
  };

  const handleDeleteModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);
    const suspended = target.dataset?.suspended === "true"; // true or false // 중지 상태인지 확인
    handleOpen("alert");
    setModalTitle(`토너먼트 인스턴트 삭제`);
    setModalContent(`토너먼트를 삭제 하시겠습니까?`);
    setModalButtonItem([
      {
        id: "button-0",
        text: "삭제",
        onClick: async () => {
          if (!suspended) {
            handleOpen("modal");
            setModalContent("토너먼트를 중지 해주세요.");
            return false;
          } else {
            const deleteApi = await client.deleteInstance({ id: id });
            handleOpen("modal");
            if (deleteApi?.status !== 201) {
              setModalContent("삭제에 실패하였습니다.");
              return router.push({
                pathname: router.pathname
              });
            }

            if (deleteApi.data.data.row_count === 0) {
              return setModalContent("변경 된 데이터가 없습니다.");
            }
            if (deleteApi.data.data.row_count < 0) {
              return setModalContent(
                <>
                  삭제에 실패하였습니다.
                  <br />
                  관리자에게 문의해주세요.
                </>
              );
            }

            setModalContent("토너먼트 삭제 요청이 완료되었습니다.");
            return router.push({
              pathname: router.pathname
            });
          }
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  const instancesProps = {
    instancesList: {
      instancesListData: instancesListData,
      open: open,
      handleOpen: handleOpen,
      forms: forms,
      button: {
        readButton: {
          text: "확인",
          onClick: (e: MouseEvent) => handleReadModalChange(e),
          disabled: false
        },
        stopButton: {
          text: "중지",
          onClick: (e: MouseEvent) => handleStopModalChange(e)
        },
        playButton: {
          text: "재개",
          onClick: (e: MouseEvent) => handleReStartModalChange(e)
        },
        deleteButton: {
          text: "삭제",
          onClick: (e: MouseEvent) => handleDeleteModalChange(e)
        }
      }
    },
    alertProps: alertProps,
    modalProps: modalProps,
    paginationProps: paginationProps
  };
  return (
    <>
      <InstancesListView {...instancesProps.instancesList} />
      <PaginationView {...instancesProps.paginationProps} />
      {instancesReadOnlyData.length !== 0 && <InstancesTableReadOnly data={instancesReadOnlyData} />}
      <ModalLayoutButtonView {...instancesProps.alertProps} />
      <ModalLayoutView {...instancesProps.modalProps} />
    </>
  );
}

export default InstancesList;
