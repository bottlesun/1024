import BoxTextView from "../../../atoms/box/box-text.view";
import React, { useEffect, useState } from "react";
import useCreateModal from "../../../../hooks/useCreateModal";
import ModalLayoutButtonView from "../../../atoms/modal/modal-layout-button.view";
import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import { useRouter } from "next/router";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import TemplateListView from "./template-list.view";
import { TemplateAPI } from "../../../../apis/v1/template.api";
import TemplateTableDefault from "../../../molecules/template/create/template-table-default";
import { ScheduleAPI } from "../../../../apis/v1/schedule.api";
import PaginationView from "../../../atoms/pagination/pagination.view";
import { TemplateV1FindDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.res.dto";
import { ScheduleV1UpdateReq } from "@tournament/tournament-system-admin-api-type/api/v1/schedule-v1/schedule-v1.req.dto";
import { TemplateV1CreateReq } from "@tournament/tournament-system-admin-api-type/api/v1/template-v1/template-v1.req.dto";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";
import useModalPaginationCommonPropsHook from "../../../../hooks/useModalPaginationCommonProps.hook";

type TemplateListProps = {
  body: {
    templateListData: TemplateV1FindDataRes[];
    limit?: number;
    page?: number;
    total?: number;
  };
  token: string;
};

function TemplateList({ body, token }: TemplateListProps) {
  const client = new TemplateAPI(true, token);
  const scheduleAPI = new ScheduleAPI(true, token);
  const page = body.page ? body.page : 1;
  const limit = body.limit ? body.limit : 9;
  const total = body.total ? body.total : 0;

  const router = useRouter();

  const createModal = useCreateModal({ alert: false, modal: false });
  const changeModalViewHock = useChangeModalViewHock();
  const { paginationProps, modalProps, alertProps } = useModalPaginationCommonPropsHook({ ...createModal, ...changeModalViewHock, router, page, limit, total });
  const { forms, setForms } = useFormsHook();

  const [templateListData, setTemplateListData] = useState([...body.templateListData]);

  const { open, handleOpen, handleClose } = createModal;
  const { setModalContent, setModalTitle, setModalButtonItem } = changeModalViewHock;

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
  };
  useEffect(() => {
    setTemplateListData([...body.templateListData]);
  }, [router]);
  /*
   * @name handlePatchModalChange
   * @description 토너먼트 수정 모달
   * */
  const handlePatchModalChange = (e: MouseEvent) => {
    // 토너먼트 수정 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    console.log(templateListData[no - 1]);
    handleOpen("alert");
    setModalTitle(`토너먼트 상세 정보 수정`);
    setModalContent(
      <>
        <TemplateTableDefault forms={forms} onForms={handleForms} readOnly={false} data={templateListData[no - 1]} />
        {/*<TemplateTableAddition onForms={handleForms} readOnly={false} />*/}
      </>
    );
    setModalButtonItem([
      {
        id: "button-1",
        text: "수정",
        onClick: async () => {
          const result = await client.putUpdateTemplate({
            params: { id: String(templateListData[no - 1].id) },
            body: { ...forms }
          });
          // console.log(result);
          // console.log("수정 완료", forms);
          handleOpen("modal");

          if (result.status !== 200) {
            setModalContent("수정에 실패하였습니다.");
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
   * @description 토너먼트 삭제 모달
   * */
  const handleDeleteModalChange = (e: MouseEvent) => {
    // 토너먼트 삭제 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    handleOpen("alert");
    setModalTitle(`템플릿 리스트 삭제`);
    setModalContent(
      <>
        <BoxTextView text={`삭제하면 템플릿 리스트에서 삭제됩니다`} />
        <BoxTextView style={{ fontSize: "12px", opacity: "0.7" }} text={`(해당 템플릿을 템플릿 리스트에서 삭제하겠습니까?)`} />
      </>
    );
    setModalButtonItem([
      {
        id: "button-2",
        text: "삭제",
        onClick: async () => {
          const result = await client.deleteTemplate({ id: templateListData[no - 1].id });
          handleOpen("modal");
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
          setModalContent("템플릿 리스트에서 삭제되었습니다.");
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
   * @description 토너먼트 등록 모달
   * */
  const handleCreateModalChange = (e: MouseEvent) => {
    // 스케줄 등록 모달
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const templateProps = templateListData[no - 1];
    console.log(templateProps, " templateProps");
    handleOpen("alert");
    setModalTitle(`템플릿 등록`);
    setModalContent(
      <>
        <BoxTextView text={`해당 템플릿을 등록 하시겠습니까?`} />
        <BoxTextView style={{ fontSize: "12px", opacity: "0.7" }} text={`(등록하면 해당 템플릿을 스케줄 리스트에 등록합니다.)`} />
      </>
    );
    setModalButtonItem([
      {
        id: "button-1",
        text: "등록",
        onClick: async () => {
          handleOpen("modal");
          handleClose("alert");
          const result = await scheduleAPI.postCreateSchedule({
            body: {
              schedule_name: templateProps.template_name,
              open_date_time: new Date(),
              participating_time: templateProps.participating_time,
              room_headcount: templateProps.room_headcount, // 방 인원
              total_phase: templateProps.phase, // 총 페이즈
              total_participant_count: Math.pow(templateProps.room_headcount, templateProps.phase), // 참가자 수
              participation_fee_currency_code: templateProps.participation_fee_currency_code,
              participation_fee_amount: templateProps.participation_fee_amount,
              participation_commission: templateProps.participation_commission,
              player_game_money: templateProps.player_game_money,
              betting_time_gold: templateProps.betting_time_gold,
              betting_time_none: templateProps.betting_time_none,
              betting_amount_maximum: templateProps.betting_amount_maximum,
              betting_amount_minimum: templateProps.betting_amount_minimum,
              is_allowed_free_coupon: templateProps.is_allowed_free_coupon,
              tournament_type: templateProps.tournament_type as ScheduleV1UpdateReq["tournament_type"],
              image_by_phase: templateProps.image_by_phase,
              event_prize_money: templateProps.event_prize_money
            }
          });

          if (result.status !== 201) {
            setModalContent("스케줄 등록에 실패하였습니다.");
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
                스케줄 등록에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("스케줄이 등록 되었습니다.");
          return router.push("/schedule/list");
        }
      },
      { id: "button-2", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  const templateProps = {
    templateList: {
      templateListData: templateListData as TemplateV1CreateReq[],
      open: open,
      forms: forms,
      button: {
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
      <TemplateListView {...templateProps.templateList} />
      <PaginationView {...templateProps.paginationProps} />
      <ModalLayoutButtonView {...templateProps.alertProps} />
      <ModalLayoutView {...templateProps.modalProps} />
    </>
  );
}

export default TemplateList;
