export interface MenuSearchParams {
  title?: string;
  page?: number;
  pageSize?: number;
}

export interface MenuData {
  title: string;
  name: string;
  path: string;
  id: string;
  component: string;
  alias?: string;
  redirect?: string;
  locale?: string;
  icon?: string;
  create_at?: string;
  hideBreadCrumb?: number | null;
  hideMenu?: number | null;
}

export interface MenuResponse {
  data: MenuData[];
  total: number;
}

export interface MenuTreeData {
  id: string | number;
  pid: string | number;
  title: string;
  children?: MenuTreeData[];
}
