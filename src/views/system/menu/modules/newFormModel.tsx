import { computed, defineComponent, reactive, ref, toRefs, VNode, watch, nextTick } from 'vue';
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
import { FormTreeData, MenuData, MenuTreeData } from '/@/api/system/model/menuModel';
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
    edit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object as PropType<MenuData>,
      default: () => ({}),
    },
  },
  emits: ['update:visible', 'update:edit'],
  setup(_props, { emit }) {
    const { menus: propsMenus } = toRefs(_props);
    const formData = reactive<FormTreeData>({
      title: '',
      locale: '',
      name: '',
      component: '',
      path: '',
      redirect: null,
      hideBreadcrumb: true,
      hideMenu: true,
      orderNo: 0,
      pid: 0,
      icon: '',
    });
    const labelCol = reactive({
      span: 6,
    });
    const wrapperCol = reactive({
      span: 16,
    });
    const { editData } = toRefs(_props);
    watch(
      () => _props.edit,
      (value) => {
        // 如果变成了edit，自动赋值
        if (value) {
          nextTick(() => {
            // 赋值
            formData.pid = editData.value.pid;
            formData.id = editData.value.id;
            formData.hideBreadcrumb =
              editData.value.hideBreadcrumb === 0 || !editData.value.hideBreadcrumb;
            formData.hideMenu = editData.value.hideMenu === 0 || !editData.value.hideMenu;
            formData.title = editData.value.title;
            formData.name = editData.value.name;
            formData.component = editData.value.component;
            formData.path = editData.value.path;
            formData.locale = editData.value.locale;
            formData.orderNo = editData.value.orderNo;
            formData.icon = editData.value.icon;
          });
        }
      },
    );
    const menuData = ref<VNode[]>([]);
    const rules = reactive({
      title: [
        {
          required: true,
          message: '请输入菜单名称',
        },
      ],
      locale: [
        {
          required: true,
          message: '请先配置国际化',
        },
      ],
      name: [
        {
          required: true,
          message: '页面标识不能为空',
        },
      ],
      component: [
        {
          required: true,
          message: '组件地址不能为空',
        },
      ],
      path: [
        {
          required: true,
          message: '访问地址不能为空',
        },
      ],
    });
    const { validate, resetFields, validateInfos } = Form.useForm(formData, rules);
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
    const onSubmit = () => {
      validate()
        .then(() => {
          // 验证通过
        })
        .catch(() => {
          // TODO
        });
    };
    const onCancel = () => {
      resetFields();
      emit('update:visible', !_props.visible);
      if (_props.edit) {
        emit('update:edit', false);
      }
    };
    return () => {
      return (
        <>
          <Modal
            title={_props.edit ? '编辑菜单' : '新增菜单'}
            width={750}
            onOk={onSubmit}
            visible={_props.visible}
            onCancel={onCancel}
          >
            <Form labelCol={labelCol} wrapperCol={wrapperCol} class="new-form-modal">
              <Row>
                <Col span={12}>
                  <FormItem {...validateInfos.title} label="名称">
                    <Input v-model:value={formData.title} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.locale} label="多语言">
                    <Input v-model:value={formData.locale} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.name} label="标识">
                    <Input v-model:value={formData.name} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.component} label="组件">
                    <Input v-model:value={formData.component} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.path} label="地址">
                    <Input v-model:value={formData.path} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.redirect} label="重定向">
                    <Input v-model:value={formData.redirect} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.pid} label="父级菜单">
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
                  <FormItem {...validateInfos.orderNo} label="排序">
                    <InputNumber v-model:value={formData.orderNo} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.hideBreadcrumb} label="面包屑">
                    <Switch
                      v-model:checked={formData.hideBreadcrumb}
                      checkedChildren={'显'}
                      unCheckedChildren={'隐'}
                    />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...validateInfos.hideMenu} label="是否显示">
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
