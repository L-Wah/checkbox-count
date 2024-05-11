"use strict";
import CheckboxCount from "./CheckboxCount.vue";
import type { App } from "vue";

/**
 * 这里将组件导出，是为了在单独使用组件时，可以按需引入
 * 为了将来支持类似这样按需使用 import { CheckboxCount } from "vue-checkbox-count";
 * 有多少个组件就添加多少个组件
 */
export { CheckboxCount };

const component = [CheckboxCount];

const CheckboxCountUI = {
  install(app: App) {
    component.forEach((item) => {
      app.component(item.name as string, item);
    });
  },
};

/**
 * 这里默认导出一个vue支持的install方法
 * 可以在main.ts中使用以下方式全局导入组件
 *
 * import CheckboxCountUI from "vue-checkbox-count"
 * .....
 * app.use(CheckboxCountUI);
 */
export default CheckboxCountUI;

declare module "vue" {
  export interface GlobalComponents {
    CheckboxCountUI: typeof CheckboxCountUI;
  }
}
