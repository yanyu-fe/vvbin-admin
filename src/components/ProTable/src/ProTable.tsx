import { defineComponent, ref } from 'vue';
import { Table } from 'ant-design-vue';
import { proTableProps } from '/@/components/ProTable/src/typing';
import { omit } from 'lodash-es';
export default defineComponent({
  name: 'ProTable',
  props: proTableProps,
  setup(_props, { attrs, slots }) {
    const table = ref();
    const tableSlots = omit(slots, ['default', 'header']);
    return () => {
      return (
        <>
          {/*自定义的头部header*/}
          {slots.header && slots.header()}
          {/*表格*/}
          <Table ref={table} v-slots={tableSlots} {...attrs} columns={_props.columns} />
        </>
      );
    };
  },
});
