import BattleListFilter, { battleListFilterProps } from "../../../molecules/instances/battle-list-contents/battle-list-filter";
import React, { useEffect, useState } from "react";
import useFormsHook, { Forms } from "../../../../hooks/useForms.hook";
import { ModalTopProps } from "../../../atoms/modal/modal-top.view";
import { ModalContentsProps } from "../../../atoms/modal/modal-contents.view";
import { buttonGroupProps } from "../../../atoms/button/button-group.view";
import { ModalBottomProps } from "../../../atoms/modal/modal-bottom.view";
import useCreateModal from "../../../../hooks/useCreateModal";
import { useRouter } from "next/router";
import { InstanceAPI } from "../../../../apis/v1/instance.api";
import { RoomAPI } from "../../../../apis/v1/room.api";
import { MatchAPI } from "../../../../apis/v1/match.api";
import BattleResultTableInformation from "../../../molecules/instances/battle-list-contents/battle-result-table-information";
import TableBattleJumpedInCount from "../../../atoms/tables/table-battle/table-battle-JumpedInCount";
import dayjs from "dayjs";
import BattleUserList from "../../../molecules/instances/battle-list-contents/battle-user-list";
import BattleSummaryInformation from "../../../molecules/instances/battle-list-contents/battle-summary-information";
import ModalLayoutButtonView from "../../../atoms/modal/modal-layout-button.view";
import BattleDetailsRoom from "../../../molecules/instances/battle-list-contents/battle-details-room";
import ModalLayoutView from "../../../atoms/modal/modal-layout.view";
import { MatchV1FindPhaseRes, MatchV1PhaseFindDataRes, MatchV1ProgressDataRes } from "@tournament/tournament-system-admin-api-type/api/v1/match-v1/match-v1.res.dto";
import BattleProgressSummaryInformation from "../../../molecules/instances/battle-list-contents/battle-progress-summary-information";
import useChangeModalViewHock from "../../../../hooks/useChangeModalView.hock";

type InstancesListProps = {
  body: {
    matchListData: any;
    matchProgressData: any;
    limit?: number;
    page?: number;
    total?: number;
  };
  token: string;
};

const BattleList = ({ body, token }: InstancesListProps) => {
  const instanceClient = new InstanceAPI(true, token);
  const matchClient = new MatchAPI(true, token);
  const roomClient = new RoomAPI(true, token);
  const router = useRouter();
  const { forms, setForms } = useFormsHook();
  const { open, handleOpen, handleClose } = useCreateModal({ alert: false, breakInUser: false, modal: false });
  const { modalContent, setModalContent, modalTitle, setModalTitle, modalButtonItem, setModalButtonItem } = useChangeModalViewHock();
  const [roomListData, setRoomListData] = useState<MatchV1PhaseFindDataRes[] | any>([]);
  const [roomTotal, setRoomTotal] = useState<number>(0);
  const [userListData, setUserListData] = useState<any>([]);
  const [clickTableState, setClickTableState] = useState(false);
  const [modalChange, setModalChange] = useState("alert");
  const [matchSelect, setMatchSelect] = useState<MatchV1ProgressDataRes[]>([]);
  const page = body.page ? body.page : 1;
  const limit = body.limit ? body.limit : 5;
  const total = body.total ? body.total : 0;
  const id = router.query.id !== "all" && router.query.id !== undefined ? Number(router.query.id) : undefined;
  const phase = router.query.phase !== "all" && router.query.phase !== undefined ? Number(router.query.phase) : undefined;
  const room = router.query.room !== "all" && router.query.room !== undefined ? Number(router.query.room) : undefined;
  const roomPage = router.query.roomPage ? Number(router.query.roomPage) : 1;
  const userId = router.query.userID ? String(router.query.userID) : undefined;
  const idFilter = id === undefined ? {} : { id: Number(id) };
  const start_at = router.query.started_at ? String(router.query.started_at) : dayjs().add(-7, "day").format("YYYY-MM-DD");
  const end_at = router.query.ended_at ? String(router.query.ended_at) : dayjs().format("YYYY-MM-DD");
  const schedule_name = router.query.schedule_name ? String(router.query.schedule_name) : undefined;
  useEffect(() => {
    (async () => {
      const matchResultFilter = await matchClient.postMatchInstanceOption({
        // 필터 리스트
        body: {
          filter: {
            ...idFilter,
            user_id: userId ? userId : undefined,
            start_at: start_at ? start_at : dayjs().format("YYYY-MM-DD"),
            end_at: end_at ? end_at : dayjs().format("YYYY-MM-DD"),
            schedule_name: schedule_name ? schedule_name : undefined
          }
        }
      });

      matchResultFilter?.data.data && setMatchSelect([...matchResultFilter?.data.data]);
    })();

    (async () => {
      if (!id) return false;
      const result = await matchClient.postFindMatchPhase({
        // 토너먼트 라운드별 방 조회
        params: {
          limit: 20,
          offset: 20 * (roomPage - 1)
        },
        body: {
          filter: {
            id: id,
            phase: phase
          }
        }
      });
      if (result?.data.data) setRoomListData([...result?.data.data]);
      if (result?.data.data) setRoomTotal(result?.data.meta.total_count);
    })();

    (async () => {
      if (!id) return false;
      const result = await matchClient.postFindMatchPhaseRoom({
        body: {
          filter: {
            id: id,
            phase: phase === undefined ? 1 : phase,
            sequence: room === undefined ? 1 : room
          }
        }
      });
      if (result?.data.data) setUserListData([...result?.data.data]);
    })();
  }, [router.query]);

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
    // console.log("forms = ", forms);
  };

  /*SummaryInformation modal*/

  /*
   * @name handleReadModalChange
   * @description 토너먼트 인스턴트 상세보기 모달
   * */
  const handleReadModalChange = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);
    const result = await instanceClient.getInstance({ id: id });
    const date = dayjs(result?.data.data?.instance_started_at).format("YYYY-MM-DD");
    // console.log("handleReadModalChange id = ", id);

    return router.push({
      pathname: router.pathname,
      query: { id: id, is_done: router.query.is_done }
    });
  };

  /*
   * @name handleReStartModalChange
   * @description 토너먼트 인스턴트 재개 모달
   * */
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
          const Resume = await instanceClient.postResumeInstance({ id: id });
          handleOpen("modal");

          if (Resume?.status !== 201) {
            setModalContent("수정에 실패하였습니다.");
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
                수정에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          console.log("재시작 message_id", Resume?.data.data.message_id);
          setModalContent("토너먼트 재개가 완료되었습니다.");
          return router.push({
            pathname: router.pathname,
            query: { ...router.query }
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  /*
   * @name handleStopModalChange
   * @description 토너먼트 인스턴트 중지 모달
   * */
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
          const Suspend = await instanceClient.postSuspendInstance({ id: id });

          handleOpen("modal");

          if (Suspend?.status !== 201) {
            setModalContent("수정에 실패하였습니다.");
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
                수정에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }

          console.log("중지 message_id", Suspend?.data.data.message_id);
          setModalContent("토너먼트 중지 요청이 완료되었습니다.");
          return router.push({
            pathname: router.pathname
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };

  /*
   * @name handleDeleteModalChange
   * @description 토너먼트 인스턴트 삭제 모달
   * */
  const handleDeleteModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const id = Number(target.dataset?.id as string);
    const suspended = target.dataset?.suspended === "true";
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
            const deleteApi = await instanceClient.deleteInstance({ id: id });
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

  /*room modal*/

  /*
   * @name handleCancelModalChange
   * @description 방 취소 모달
   * */
  const handleCancelModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const id = Number(target.dataset?.id as string);

    setModalChange("alert");
    handleOpen("alert");
    setModalTitle(`토너먼트 인스턴스 취소`);
    setModalContent(`토너먼트를 취소 하시겠습니까?`);
    setModalButtonItem([
      {
        id: "button-0",
        text: "취소",
        onClick: async () => {
          const Cancel = await roomClient.postCancelRoom({
            filter: {
              id: id,
              phase: roomListData[no - 1].phase, // 단계
              sequence: no // 방번호
            }
          });

          handleOpen("modal");

          if (Cancel?.status !== 201) {
            setModalContent("수정에 실패하였습니다.");
            return router.push({
              pathname: router.pathname,
              query: { ...router.query }
            });
          }

          if (Cancel.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (Cancel.data.data.row_count < 0) {
            return setModalContent(
              <>
                수정에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("토너먼트 취소가 완료되었습니다.");
          return router.push({
            pathname: router.pathname,
            query: { ...router.query }
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };
  /*
   * @name handleReplayModalChange
   * @description 방 재경기 모달
   * */
  const handleReplayModalChange = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const id = Number(target.dataset?.id as string);

    handleOpen("alert");
    setModalTitle(`토너먼트 인스턴스 재경기`);
    setModalContent(`토너먼트를 재경기 하시겠습니까?`);
    setModalButtonItem([
      {
        id: "button-0",
        text: "재경기",
        onClick: async () => {
          const Replay = await roomClient.postReplayRoom({
            filter: {
              id: id,
              phase: roomListData[no - 1].phase, // 단계
              sequence: no // 방번호
            }
          });

          handleOpen("modal");
          if (Replay?.status !== 201) {
            setModalContent("수정에 실패하였습니다.");
            return router.push({
              pathname: router.pathname,
              query: { ...router.query }
            });
          }

          if (Replay.data.data.row_count === 0) {
            return setModalContent("변경 된 데이터가 없습니다.");
          }
          if (Replay.data.data.row_count < 0) {
            return setModalContent(
              <>
                수정에 실패하였습니다.
                <br />
                관리자에게 문의해주세요.
              </>
            );
          }
          setModalContent("토너먼트 경기가 다시 시작됩니다.");
          return router.push({
            pathname: router.pathname,
            query: { ...router.query }
          });
        }
      },
      { id: "button-1", text: "아니요", onClick: () => handleClose("alert"), variant: "outlined" }
    ]);
  };
  /*
   * @name handleRoomRead
   * @description 방 상세보기
   * */
  const handleRoomRead = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    // const id = Number(target.dataset?.id as string);

    return router.push({
      pathname: router.pathname,
      query: { ...router.query, phase: roomListData[no - 1].phase }
    });
  };

  /*
   * @name handleGameResultModalChange
   * @description 게임 결과 확인 모달
   * */
  const handleGameResultModalChange = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const id = Number(target.dataset?.id as string);
    const roomListDone = roomListData.filter((item: MatchV1FindPhaseRes) => item.status === "done");
    // console.log(roomListDone, "roomListDone");
    const roomListInfo = {
      room_started_at: roomListDone[no - 1].room_started_at,
      win_amount: roomListDone[no - 1].win_amount,
      winner_user_id: roomListDone[no - 1].winner_user_id
    };
    setModalChange("alert");
    const matchResult = await matchClient.postFindMatchPhaseRoom({
      body: {
        filter: {
          id: id,
          phase: roomListDone[no - 1].phase,
          sequence: no
        }
      }
    });

    handleOpen("alert");
    setModalTitle(`게임결과`);
    setModalContent(<BattleResultTableInformation data={matchResult?.data.data} roomListInfo={roomListInfo} />);
    setModalButtonItem([{ id: "button-1", text: "확인", onClick: () => handleClose("alert"), variant: "outlined" }]);
  };

  /*
   * @name handleJumpedInCountButtonModalChange
   * @description 난입유저 확인 모달
   * */
  const handleJumpedInCountButtonModalChange = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const id = Number(target.dataset?.id as string);

    const matchResult = await matchClient.postFindMatchPhaseRoom({
      body: {
        filter: {
          id: id,
          phase: roomListData[no - 1].phase,
          sequence: no
        }
      }
    });
    // console.log([...matchResult?.data.data], "matchResult?.data.data");
    setModalChange("alert");
    handleOpen("alert");
    setModalContent(<TableBattleJumpedInCount data={matchResult?.data.data} />);
    setModalTitle("난입유저");
    setModalButtonItem([{ id: "buttons", text: "확인", onClick: () => handleClose("alert") }]);
    return router.push(
      {
        pathname: router.pathname,
        query: { ...router.query }
      },
      "/instances/battle"
    );
  };
  const modalChangeMap: { [key: string]: boolean } = {
    alert: open.alert,
    breakInUser: open.breakInUser
  };

  const commonModalProps = {
    ModalTopProps: {
      title: modalTitle
    } as ModalTopProps,
    ModalContentsProps: {
      textAlign: "center",
      content: modalContent
    } as ModalContentsProps,
    ModalBottomProps: {
      buttonProps: {
        buttonItem: modalButtonItem,
        buttonPosition: {
          justifyContent: "center",
          fill: "100%"
        }
      } as buttonGroupProps
    } as ModalBottomProps
  };
  const commonProps = {
    forms,
    clickTableState,
    open,
    handleOpen: handleOpen,
    total: total,
    page: page,
    limit: limit,
    setModalContent,
    setModalTitle,
    setModalButtonItem,
    setModalChange,
    onForms: handleForms
  };
  const commonBattleTableProps = {
    handleClose,
    ...commonProps,
    commonModalProps
  };
  const battleListProps = {
    battleListFilterProps: {
      ...commonProps,
      roomListData,
      // uniqueDates,
      matchSelectData: matchSelect,
      setClickTableState
    } as battleListFilterProps,
    matchListTableProps: {
      ...commonBattleTableProps,
      matchListData: body?.matchListData.data, //matchTestDummy[0].data
      matchListMeta: body?.matchListData.meta ? body?.matchListData.meta : { total_count: 0, max_phase: 0 }, //matchTestDummy[0].meta
      button: {
        readButton: {
          //SummaryInformation
          text: "확인",
          onClick: (e: MouseEvent) => handleReadModalChange(e),
          disabled: false
        },
        stopButton: {
          // SummaryInformation
          text: "중지",
          onClick: (e: MouseEvent) => handleStopModalChange(e)
        },
        playButton: {
          // SummaryInformation
          text: "재개",
          onClick: (e: MouseEvent) => handleReStartModalChange(e)
        },
        deleteButton: {
          text: "삭제",
          onClick: (e: MouseEvent) => handleDeleteModalChange(e)
        }
      }
    },
    matchListProgressTableProps: {
      ...commonBattleTableProps,
      matchListData: body?.matchProgressData.data,
      matchListMeta: body?.matchProgressData.meta ? body?.matchProgressData.meta : { total_count: 0, max_phase: 0 },
      button: {
        readButton: {
          //SummaryInformation
          text: "확인",
          onClick: (e: MouseEvent) => handleReadModalChange(e),
          disabled: false
        },
        stopButton: {
          // SummaryInformation
          text: "중지",
          onClick: (e: MouseEvent) => handleStopModalChange(e)
        },
        playButton: {
          // SummaryInformation
          text: "재개",
          onClick: (e: MouseEvent) => handleReStartModalChange(e)
        },
        deleteButton: {
          text: "삭제",
          onClick: (e: MouseEvent) => handleDeleteModalChange(e)
        }
      }
    },
    roomListTableProps: {
      ...commonBattleTableProps,
      roomListData: roomListData ? roomListData : [],
      roomTotal: roomTotal,
      max_phase: body?.matchListData.meta ? body?.matchListData.meta.max_phase : 0,
      button: {
        readRoomButton: {
          // room
          text: "확인",
          onClick: (e: MouseEvent) => handleRoomRead(e)
        },
        cancelButton: {
          // room
          text: "취소",
          onClick: (e: MouseEvent) => handleCancelModalChange(e)
        },
        gameResultButton: {
          // room
          text: "결과",
          onClick: (e: MouseEvent) => handleGameResultModalChange(e)
        },
        roomReplayButton: {
          // room
          text: "재경기",
          onClick: (e: MouseEvent) => handleReplayModalChange(e)
        },
        jumpedInCountButton: {
          onClick: (e: MouseEvent) => handleJumpedInCountButtonModalChange(e)
        }
      }
    },
    userListTableProps: {
      userListData: userListData ? userListData : []
    },
    alertProps: {
      ModalLogicProps: {
        open: modalChangeMap[modalChange],
        handleOpen: () => handleOpen(modalChange),
        handleClose: () => handleClose(modalChange)
      },
      ...commonModalProps
    },
    modalProps: {
      ModalLogicProps: {
        open: open.modal,
        handleOpen: () => handleOpen("modal"),
        handleClose: () => handleClose("modal")
      },
      ...commonModalProps
    }
  };

  return (
    <>
      <BattleListFilter {...battleListProps.battleListFilterProps} />
      <BattleProgressSummaryInformation {...battleListProps.matchListProgressTableProps} />
      <BattleSummaryInformation {...battleListProps.matchListTableProps} />
      {router.query.id !== "all" && router.query.id !== undefined && <BattleDetailsRoom {...battleListProps.roomListTableProps} />}
      {router.query.phase !== "all" && router.query.phase !== undefined && <BattleUserList {...battleListProps.userListTableProps} />}
      <ModalLayoutButtonView {...battleListProps.alertProps} />
      <ModalLayoutView {...battleListProps.modalProps} />
    </>
  );
};

export default BattleList;
