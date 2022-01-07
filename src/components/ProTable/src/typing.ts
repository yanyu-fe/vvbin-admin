import { ColumnProps } from 'ant-design-vue/es/table/interface';
import { ExtractPropTypes } from 'vue';
export type ProColumnType = {
  // 搜索表单是否存在默认值
  initialValue?: any;
  /** 是否允许被拷贝 */
  copyable?: boolean;
  // 搜索表单
  search?: boolean;
  // 在table中隐藏
  hideInTable?: boolean;
  // 在新建表单中隐藏
  hideInForm?: boolean;
  /** 可编辑表格是否可编辑 */
  editable?: boolean;
} & Partial<ColumnProps>;

export const proTableProps = {
  // 数据源
  columns: {
    type: Array as PropType<ProColumnType[]>,
    required: true,
  },
  // 是否显示搜索表单
  search: {
    type: Boolean,
    default: false,
  },
};

export type ProTableProps = ExtractPropTypes<typeof proTableProps>;

export type FormType = 'input' | 'select' | 'checkbox' | 'switch' | 'timePicker' | 'treeSelect';

export type ProTableForm = {
  type?: FormType;
};
