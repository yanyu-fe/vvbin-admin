export interface MenuSearchParams {
  title?: string;
  page?: number;
  pageSize?: number;
}

export interface MenuData {
  title: string;
  name: string;
  path: string;
  id: string | number;
  component: string;
  alias?: string;
  redirect?: string;
  locale?: string;
  icon?: string;
  create_at?: string;
  hideBreadcrumb?: number | null | boolean;
  hideMenu?: number | null | boolean;
  pid: string | number;
  orderNo?: number;
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

export interface FormTreeData {
  id?: string | number;
  pid: string | number;
  title: string;
  name: string;
  path: string;
  component: string;
  redirect?: string | null;
  locale?: string;
  hideBreadcrumb?: number | null | boolean;
  hideMenu?: number | null | boolean;
  orderNo?: number;
  icon?: string;
}
