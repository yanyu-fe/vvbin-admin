import { ProColumnType, ProTableForm, ProTableProps } from '/@/components/ProTable/src/typing';

const useProTable = (props: ProTableProps) => {
  // 获取当前的表单要显示的数据
  const columns = props.columns || [];
  const formList = useProTableForm(columns);
  return {
    formList,
  };
};

export const useProTableForm = (columns: ProColumnType[]) => {
  const formArr: ProTableForm[] = [];
  for (const column of columns) {
    // 生成数据
    if (column.search) {
      // 定义当前的属性和当前要显示的数据类型
      formArr.push({
        type: 'timePicker',
      });
    }
  }
  return formArr;
};

export default useProTable;
