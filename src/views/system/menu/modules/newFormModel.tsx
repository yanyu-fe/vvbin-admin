import { computed, defineComponent, reactive, ref, toRefs, VNode } from 'vue';
import {
  Modal,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Switch,
  InputNumber,
  TreeSelect,
  TreeSelectNode,
} from 'ant-design-vue';
import './newFormModal.less';
import { MenuTreeData } from '/@/api/system/model/menuModel';
export default defineComponent({
  name: 'MenuNewFormModel',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array as PropType<MenuTreeData[]>,
      default: () => [],
    },
  },
  emits: ['visible', 'update:visible'],
  setup(_props, { emit }) {
    const { menus: propsMenus } = toRefs(_props);
    const onCancel = () => {
      emit('update:visible', !_props.visible);
    };
    const formData = reactive({
      title: '',
      locale: '',
      name: '',
      component: '',
      path: '',
      redirect: '',
      hideBreadcrumb: true,
      hideMenu: true,
      orderNo: 0,
      pid: 0,
    });
    const labelCol = reactive({
      span: 6,
    });
    const wrapperCol = reactive({
      span: 16,
    });
    const menuData = ref<VNode[]>([]);
    menuData.value.push(<TreeSelectNode key={0} title="根节点" value={0} />);
    const menuNodes = (menus?: MenuTreeData[]) => {
      // 获取数据
      const menusDataInfo: VNode[] = [];
      if (menus && menus.length > 0) {
        for (const menu of menus) {
          if (menu.children && menu.children.length > 0) {
            menusDataInfo.push(
              <TreeSelectNode key={menu.id} value={menu.id} title={menu.title}>
                {menuNodes(menu.children)}
              </TreeSelectNode>,
            );
          } else {
            menusDataInfo.push(<TreeSelectNode key={menu.id} value={menu.id} title={menu.title} />);
          }
        }
      }
      return menusDataInfo;
    };
    const menuDataComp = computed(() => {
      const menuInfoData = menuNodes(propsMenus.value);
      if (menuInfoData && menuInfoData.length > 0) {
        return [...menuData.value, ...menuInfoData];
      }
      return menuData.value;
    });

    return () => {
      return (
        <>
          <Modal title="新增菜单" width={750} visible={_props.visible} onCancel={onCancel}>
            <Form labelCol={labelCol} wrapperCol={wrapperCol} class="new-form-modal">
              <Row>
                <Col span={12}>
                  <FormItem name="title" label="名称">
                    <Input v-model:value={formData.title} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="locale" label="多语言">
                    <Input v-model:value={formData.locale} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="name" label="标识">
                    <Input v-model:value={formData.name} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="component" label="组件">
                    <Input v-model:value={formData.component} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="path" label="地址">
                    <Input v-model:value={formData.path} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="redirect" label="重定向">
                    <Input v-model:value={formData.redirect} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="pid" label="父级菜单">
                    <TreeSelect
                      showSearch
                      placeholder="选择关联菜单"
                      v-model:value={formData.pid}
                      allowClear
                      treeDefaultExpandAll
                    >
                      {menuDataComp.value}
                    </TreeSelect>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="orderNo" label="排序">
                    <InputNumber v-model:value={formData.orderNo} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="hideBreadcrumb" label="面包屑">
                    <Switch
                      v-model:checked={formData.hideBreadcrumb}
                      checkedChildren={'显'}
                      unCheckedChildren={'隐'}
                    />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="hideMenu" label="是否显示">
                    <Switch
                      v-model:checked={formData.hideMenu}
                      checkedChildren={'显'}
                      unCheckedChildren={'隐'}
                    />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </Modal>
        </>
      );
    };
  },
});
