import { Typography } from "@mui/material";

const BoxFilePickerView = ({ img }: { img: string[] }) => {
  // console.log(img);
  return (
    <>
      <Typography sx={{ fontSize: 14 }}>{img && img[0]}</Typography>
    </>
  );
};
export default BoxFilePickerView;
