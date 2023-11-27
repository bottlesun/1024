import { useEffect, useState } from "react";
import TemplateSelectView from "../../molecules/template/forms/template-select.view";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { filePickerData } from "../../../utils/commonProps/select.Props";
import { checkText } from "../../../utils/public/selectMap";

const noneFileStyle = css`
  color: var(--text-color);
  font-size: 12px;
`;

const SelectFilePicker = ({ ...props }) => {
  const { phase, defaultValue, setInputs, imageFile, setImageFile } = props;
  const [fileNames, setFileNames] = useState<string[]>([]);
  // const [image, setImage] = useState<string>("NONE" as string);

  useEffect(() => {
    if (fileNames.length === 0) return setImageFile("NONE");
    setImageFile(checkText(fileNames));
  }, [fileNames]);

  /*
   * @description 기본값이 있으면 파일명 저장
   * */
  useEffect(() => {
    if (defaultValue === null) {
      setImageFile("NONE");
      return setFileNames([]);
    }
    defaultValue && setFileNames(defaultValue);
    defaultValue && setImageFile(checkText(defaultValue));
  }, [defaultValue]);

  /*
   * @description 단계가 변경되면 해당 단계 이후의 파일명을 삭제
   * */
  useEffect(() => {
    // console.log("imageFile", imageFile, phase !== fileNames.length);
    // console.log(defaultValue !== null && imageFile === "NONE");
    if (defaultValue !== null && imageFile === "NONE") return;
    if (phase !== fileNames.length) {
      const newFileNames = Array(Number(phase)).fill(imageFile);
      setFileNames(newFileNames);
      // console.log(fileNames);
      setInputs((inputs: any) => ({ ...inputs, ["image_by_phase"]: newFileNames }));
    }
  }, [phase, imageFile]);

  /*
   * @name handleFileChange
   * @description 파일 업로드시 파일명 저장
   * */
  const handleFileChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newFileNames = Array(Number(phase)).fill(event.target.value as string);
    if (event.target.value === "NONE") {
      return setFileNames([]);
    }
    setImageFile(event.target.value as string);
    setFileNames([...newFileNames]);
    setInputs((inputs: any) => ({ ...inputs, ["image_by_phase"]: newFileNames }));
  };

  const selectProps = {
    select: {
      selectItem: {
        optionData: filePickerData,
        defaultSelect: {
          value: imageFile,
          onChange: handleFileChange
        }
      }
    }
  };
  return <>{phase === "" || phase === undefined ? <Typography css={noneFileStyle}>단계를 설정해주세요.</Typography> : <TemplateSelectView {...selectProps} />}</>;
};

export default SelectFilePicker;
