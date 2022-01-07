import { reactive } from 'vue';

export const usePaginate = (callback?: Function) => {
  const paginate = reactive({
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
    onChange: (page: number, pageSize: number) => {
      callback && typeof callback === 'function' && callback(page, pageSize);
    },
    onShowSizeChange: (current: number, size: number) => {
      callback && typeof callback === 'function' && callback(current, size);
    },
  });

  const setTotal = (total: number) => {
    paginate.total = total;
  };
  const setPage = (page: number) => {
    paginate.current = page;
  };
  const setPageSize = (pageSize: number) => {
    paginate.pageSize = pageSize;
  };
  return { paginate, setPage, setPageSize, setTotal };
};
