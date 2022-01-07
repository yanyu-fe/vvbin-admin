import { defHttp } from '/@/utils/http/axios';
import { MenuResponse, MenuSearchParams, MenuTreeData } from '/@/api/system/model/menuModel';

enum Api {
  getMenus = '/menu',
  getMenuData = '/menu/getMenus',
}

export function getMenus(params: MenuSearchParams) {
  return defHttp.get<MenuResponse>({
    url: Api.getMenus,
    params,
  });
}

export function getMenuData() {
  return defHttp.get<MenuTreeData[]>({
    url: Api.getMenuData,
  });
}
