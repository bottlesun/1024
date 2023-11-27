import ColumnToolbarList from "../../molecules/navigation/header-bar/column-tool-bar/column-toolbar-list";
import React, { useEffect, useState } from "react";
import useCreateModal from "../../../hooks/useCreateModal";
import { ModalContentsProps } from "../../atoms/modal/modal-contents.view";
import ModalLayoutView from "../../atoms/modal/modal-layout.view";
import { Cookies } from "react-cookie";
import { TemplateAPI } from "../../../apis/v1/template.api";
import TableTemplateLoad from "../../atoms/tables/table-template-load";
import useFormsHook, { Forms } from "../../../hooks/useForms.hook";
import { minuteToSecond, PowNumber } from "../../../utils/public/formatNumber";
import { useFormDataStore } from "../../../stores/useFormData.store";
import { useRouter } from "next/router";
import useChangeModalViewHock from "../../../hooks/useChangeModalView.hock";

export type depthProps = {
  name: string;
  icon: string;
  path: string;
};

export type depthTypes = {
  depth1Name?: string;
  depth2Name?: string;
  depth2?: depthProps;
};

export type toolbarProps = {
  headerTop: boolean;
  onClick?: () => void;
  disabled?: boolean;
};
const HeaderBar = (Toolbar: toolbarProps & depthTypes) => {
  const { open, handleOpen, handleClose } = useCreateModal({ loadModal: false });
  const { modalContent, setModalContent } = useChangeModalViewHock();

  const cookies = new Cookies();
  const token = cookies.get("access-token");
  const client = new TemplateAPI(true, token);
  const router = useRouter();
  const limit = Number(router.query.limit === undefined ? 5 : router.query.limit);
  const page = Number(router.query.page === undefined ? 1 : router.query.page);

  const { forms, setForms } = useFormsHook();
  const { setFormData } = useFormDataStore();
  const [readData, setReadData] = useState<any>([]);

  useEffect(() => {
    if (router.route === "/schedule/create" || router.route === "/instances/create") {
      (async () => {
        const result = await client.postFindTemplate({
          params: {
            offset: Number(limit) * (Number(page) - 1),
            limit: Number(limit)
          },
          body: {
            sort: {
              created_at: -1
            }
          }
        });

        if (result.status !== 201)
          return setModalContent(
            <>
              템플릿을 불러오는데
              <br />
              실패했습니다.
            </>
          );
        const props = {
          data: result.data.data,
          total: result.data.meta.total_count,
          limit: limit,
          page: page,
          button: readButtonProps,
          setReadData: setReadData,
          readData: readData,
          open: open
        };
        setModalContent(<TableTemplateLoad {...props} />);
        setReadData(result.data.data);
      })();
    }
  }, [token, open, router.query]);

  const handleForms = (key: string, value: any): void | boolean => {
    setForms((state: Forms) => {
      state[key] = value;
      return state;
    });
  };

  const handleReadModalChange = async (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const no = Number(target.dataset?.no as string);
    const result = await client.getTemplate({ id: Number(target.dataset.id) });
    const thisTemplateData = result.data.data;
    // 전달 데이터
    // console.log(readData[no - 1]);
    handleForms("schedule_name", thisTemplateData.template_name);
    handleForms("participating_time", minuteToSecond(thisTemplateData.participating_time)); // 참가 시간
    handleForms("room_headcount", Number(thisTemplateData.room_headcount)); // 방 인원
    handleForms("total_phase", Number(thisTemplateData.phase)); // 총 단계
    handleForms("image_by_phase", thisTemplateData.image_by_phase); // 이미지 설정
    handleForms("participation_fee_currency_code", thisTemplateData.participation_fee_currency_code);
    handleForms("participation_fee_amount", Number(thisTemplateData.participation_fee_amount));
    handleForms("participation_commission", Number(thisTemplateData.participation_commission));
    handleForms("total_participant_count", PowNumber(thisTemplateData.room_headcount, thisTemplateData.phase));
    handleForms("betting_amount_minimum", Number(thisTemplateData.betting_amount_minimum));
    handleForms("betting_amount_maximum", Number(thisTemplateData.betting_amount_maximum));
    handleForms("player_game_money", Number(thisTemplateData.player_game_money));
    handleForms("betting_time_gold", Number(thisTemplateData.betting_time_gold));
    handleForms("betting_time_none", Number(thisTemplateData.betting_time_none));
    handleForms("event_prize_money", Number(thisTemplateData.event_prize_money)); // 이벤트 우승 상금
    handleForms("is_allowed_free_coupon", thisTemplateData.is_allowed_free_coupon); // 무료 쿠폰 사용 여부
    handleForms("tournament_type", thisTemplateData.tournament_type); // 토너먼트 타입

    // console.log(forms, "forms");
    setFormData({ ...forms });
    handleClose("loadModal");

    return router.push({
      pathname: router.pathname,
      query: {}
    });
  };

  const readButtonProps = {
    text: "불러오기",
    onClick: (e: MouseEvent) => handleReadModalChange(e)
  };

  const props = {
    toolbarProps: {
      ...Toolbar,
      LoadButton: {
        text: (
          <p>
            템플릿
            <br /> 불러오기
          </p>
        ),
        onClick: () => handleOpen("loadModal"),
        disabled: false
      }
    },
    LoadModalProps: {
      ModalLogicProps: {
        open: open.loadModal,
        handleOpen: () => handleOpen("loadModal"),
        handleClose: () => {
          handleClose("loadModal");
          return router.push({
            pathname: router.pathname,
            query: {}
          });
        }
      },
      ModalTopProps: {
        title: "템플릿 불러오기"
      },
      ModalContentsProps: {
        textAlign: "center",
        content: modalContent
      } as ModalContentsProps
    }
  };

  return (
    <>
      <ColumnToolbarList {...props.toolbarProps} />
      <ModalLayoutView {...props.LoadModalProps} />
    </>
  );
};

export default HeaderBar;
