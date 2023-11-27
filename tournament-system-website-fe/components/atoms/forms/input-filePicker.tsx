import InputFilePickerView from "./input-filePicker.view";
import { ChangeEvent, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";

const noneFileStyle = css`
  color: var(--text-color);
  font-size: 12px;
`;

const InputFilePicker = ({ ...props }) => {
  const { phase, defaultValue, setInputs } = props;
  const [fileNames, setFileNames] = useState<string[]>(defaultValue ? defaultValue : []);

  /*
   * @description 기본값이 있으면 파일명 저장
   * */
  useEffect(() => {
    defaultValue && setFileNames(defaultValue);
  }, [defaultValue]);

  /*
   * @description 단계가 변경되면 해당 단계 이후의 파일명을 삭제
   * */
  useEffect(() => {
    if (phase !== fileNames.length) {
      const newFileNames = [...fileNames];
      newFileNames.splice(phase, fileNames.length - phase);
      setFileNames(newFileNames);
      setInputs((inputs: any) => ({ ...inputs, ["image_by_phase"]: newFileNames }));
    }
  }, [phase]);

  /*
   * @name handleFileChange
   * @description 파일 업로드시 파일명 저장
   * */
  const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newFileNames = [...fileNames];
    newFileNames[index] = event.target.files![0].name;
    setFileNames(newFileNames);
    setInputs((inputs: any) => ({ ...inputs, ["image_by_phase"]: newFileNames }));
  };

  /*
   * @name handleAddFileInput
   * @description 파일 업로드 추가
   * */
  const handleAddFileInput = () => {
    return setFileNames([...fileNames]);
  };

  /*
   * @name handleClearFileInput
   * @description 파일 업로드 취소
   * */
  const handleClearFileInput = (index: number) => {
    const newFileNames = [...fileNames];
    newFileNames.splice(index, 1);
    setFileNames(newFileNames);
    setInputs((inputs: any) => ({ ...inputs, ["image_by_phase"]: newFileNames }));
  };

  const filePickerProps = {
    ...props,
    fileNames: fileNames,
    handleChange: handleFileChange,
    handleAddFileInput: handleAddFileInput,
    handleClearFileInput: handleClearFileInput
  };

  return <>{phase === "" || phase === undefined ? <Typography css={noneFileStyle}>단계를 설정해주세요.</Typography> : <InputFilePickerView {...filePickerProps} />}</>;
};

export default InputFilePicker;
