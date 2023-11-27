export const timeConvertor = (dateStr: string): string => {
  return dateStr?.trim().split("T")[0];
};
