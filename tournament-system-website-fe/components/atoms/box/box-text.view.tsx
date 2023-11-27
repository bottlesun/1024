import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

const BoxTextView = ({ text, style }: { text: React.ReactNode | string; style?: SxProps<Theme> }) => {
  const css = {
    fontWeight: "300",
    ...style
  };
  return <Typography sx={css}>{text}</Typography>;
};

export default BoxTextView;
