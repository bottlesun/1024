import { Box, Button, Container, Typography } from "@mui/material";
import { css } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";

const filePickerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const filePickerBoxStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  p {
    font-size: 12px;
  }
`;

const filePickerButtons = css`
  span {
    font-size: 12px;
    border-radius: 5px;
    padding: 2px;
    color: var(--text-color);
    border: var(--border-line);
  }
`;

const closeIconStyle = css`
  margin: 0;
  padding: 0;
  min-width: 20px;
  svg {
    font-size: 16px;
  }
`;

const InputFilePickerView = ({ ...props }) => {
  return (
    <>
      {new Array(Number(props.phase)).fill(0).map((_, i) => {
        return (
          <Container key={i} css={filePickerStyle}>
            <Box css={filePickerBoxStyle}>
              <Typography>
                {i + 1} 단계 : {props.fileNames[i]}
              </Typography>
              <Box css={{ marginLeft: "5px" }}>
                <input disabled={props.readOnly} accept="image/*" style={{ display: "none" }} id={"file" + i} type="file" onChange={(event) => props.handleChange(i, event)} />
                <label htmlFor={"file" + i} css={filePickerButtons} onClick={props.handleAddFileInput}>
                  <Button component="span">업로드</Button>
                </label>

                <Button component="span" css={closeIconStyle} onClick={() => props.handleClearFileInput(i)}>
                  <CloseIcon />
                </Button>
              </Box>
            </Box>
          </Container>
        );
      })}
    </>
  );
};
export default InputFilePickerView;
