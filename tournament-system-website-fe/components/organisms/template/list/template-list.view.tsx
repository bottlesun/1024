import TemplateTableList, { TemplateTableListType } from "../../../molecules/template/list/template-table-list";

function TemplateListView({ ...props }: TemplateTableListType) {
  return <TemplateTableList {...props} />;
}
export default TemplateListView;
