<template>
  <div class="pro-menu">
    <Form
      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="pro-menu-form"
    >
      <Row>
        <Col :span="12">
          <FormItem label="名称" name="title">
            <Input v-model:value="formState.title" placeholder="菜单名称" />
          </FormItem>
        </Col>
        <Col :span="12">
          <div style="float: right">
            <Space>
              <Button type="primary" @click="onSearch" :loading="loading">搜索</Button>
              <Button @click="onReset">重置</Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
    <div class="pro-menu-table">
      <div class="pro-menu-table-actions">
        <div class="pro-menu-table-actions-left"> 菜单管理 </div>
        <div class="pro-menu-table-actions-right">
          <Space>
            <Button type="primary">刷新</Button>
            <Button @click="newModal = true">新增</Button>
          </Space>
        </div>
      </div>
      <Table
        :pagination="paginate"
        :loading="loading"
        :columns="columns"
        rowKey="id"
        :data-source="dataSource"
      />
    </div>
    <NewFormModel :menus="menuData" v-model:visible="newModal" />
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore
  import { Button, Col, Form, FormItem, Input, Row, Space, Table } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import { getMenuData, getMenus } from '/@/api/system/menu';
  import { MenuData, MenuTreeData } from '/@/api/system/model/menuModel';
  import { usePaginate } from '/@/views/system/menu/usePaginate';
  import NewFormModel from './modules/newFormModel';

  const formRef = ref();
  const menuData = ref<MenuTreeData[]>([]);
  const formState = reactive({
    title: '',
  });
  const labelCol = reactive({
    span: 4,
  });
  const wrapperCol = reactive({
    span: 18,
  });
  const newModal = ref(false);
  const loading = ref(false);

  // 定义行数据
  const columns = [
    {
      title: '索引',
      dataIndex: 'name',
      width: 100,
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'title',
      width: 100,
    },
    {
      title: '地址',
      dataIndex: 'path',
      width: 200,
      ellipsis: true,
    },
    {
      title: '组件地址',
      dataIndex: 'component',
      width: 200,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 200,
    },
  ];
  const dataSource = ref<MenuData[]>([]);
  //  调用获取菜单信息的接口实现功能
  const init = async (page?: number, pageSize?: number) => {
    loading.value = true;
    page = page ?? 1;
    if (typeof page === 'object') {
      page = 1;
    }
    pageSize = pageSize ?? 10;
    try {
      const data = await getMenus({ ...formState, page, pageSize });
      dataSource.value = data.data;
      setTotal(data.total);
      loading.value = false;
    } catch (e) {
      loading.value = false;
    }
  };

  const onSearch = async () => {
    await init();
  };
  const getMenus1 = async () => {
    menuData.value = await getMenuData();
  };
  getMenus1().then(() => {});
  const { paginate, setTotal } = usePaginate(init);
  const onReset = () => {
    // 重置搜索按钮
    formRef.value.resetFields();
    init();
  };

  init();
</script>

<style scoped lang="less">
  .pro-menu {
    margin: 20px;
  }
  .pro-menu-form {
    background: #fff;
    padding: 30px 20px;
    margin-bottom: 20px;
  }
  .pro-menu-table {
    background: white;
    .pro-menu-table-actions {
      padding: 16px;
      display: flex;
      .pro-menu-table-actions-left {
        margin-right: auto;
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
</style>

<style lang="less">
  .pro-menu-form .ant-form-item {
    margin-bottom: 0;
  }
  .pro-menu-table .ant-table-placeholder {
    border-top-width: 0;
  }
</style>
