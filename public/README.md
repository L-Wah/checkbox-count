# vue-checkbox-count

_该组件是 `DropdownMenu`下拉菜单 与 `Checkbox`复选框 的结合，特点在于在显示栏处，若多选项溢出显示区域则在最后标记其溢出个数。_

_该组件采用 `Vue@3.4.21`+ `TypeScript@5.2.2` + `Vite@5.2.0` + `Sass@1.75.0` 实现！_<br/>
_样式 `CSS` 使用 `box-sizing: border-box;` 模式！_<br/>
_开箱即用！_

_vue-checkbox-count 适用于 移动端， Vue3 + Typescript 环境！_

## Install & Use

```bash
npm install vue-checkbox-count
# or
yarn add vue-checkbox-count
# or
pnpm i vue-checkbox-count
```

Import and register component

**Global**

```ts
import { createApp } from "vue";
import App from "./App.vue";

import CheckboxCount from "vue-checkbox-count";
import "vue-checkbox-count/style.css";

const app = createApp(App);
app.use(CheckboxCount);
app.mount("#app");
```

**Local**

```vue
<script setup lang="ts">
import { CheckboxCount } from "vue-checkbox-count";
import "vue-checkbox-count/style.css";
</script>
```

## 基本使用

```vue
<script setup lang="ts">
const list = [
  {
    name: "Tom",
  },
  {
    name: "Jerry",
  },
  {
    name: "Lewis",
  },
  {
    name: "Shelly",
  },
];
const value = ref([]);
</script>
<template>
  <CheckboxCount v-model="value" :list="list" name="name"></CheckboxCount>
</template>
```

## 自定义过滤器图标

```vue
<template>
  <CheckboxCount v-model="value" :list="list" name="id">
    <template #panelFilter></template>
  </CheckboxCount>
</template>
```

## 自定义箭头图标

```vue
<template>
  <CheckboxCount v-model="value" :list="list" name="id">
    <template #panelArrow></template>
  </CheckboxCount>
</template>
```

## 自定义多选框图标

可以通过 slotProps 判断是否为选中状态。

```vue
<template>
  <CheckboxCount v-model="value" :list="list" name="id">
    <template #checkboxIcon="props">
      <div class="square" :class="{ checked: props.checked }"></div>
    </template>
  </CheckboxCount>
</template>
```

## 自定义多选框内容文字

```vue
<template>
  <template #checkboxText="props">
    <div style="color: aquamarine">{{ props.listItem }}</div>
  </template>
</template>
```

## APIs

### Props

| 参数                   | 说明                                    | 类型                 | 默认值    |
| ---------------------- | --------------------------------------- | -------------------- | --------- |
| v-model                | 当前选中项对应的 value                  | Array                | []        |
| list                   | 选项数组                                | Array                | []        |
| disabled               | 是否禁用菜单                            | boolean              | false     |
| width                  | 组件宽度，默认单位 px                   | string &#124; number | 300       |
| height                 | 下拉框最大高度，默认单位 px             | string &#124; number | 200       |
| color                  | 文字及图标颜色                          | string               | "#93acd3" |
| direction-down         | 菜单向下展开                            | boolean              | true      |
| duration               | 动画时长，单位秒，设置为 0 可以禁用动画 | string &#124; number | 0.2       |
| z-index                | 菜单栏 z-index 层级                     | string &#124; number | 10        |
| overlay                | 是否显示遮罩层                          | boolean              | true      |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单              | boolean              | true      |
| close-on-click-outside | 是否在点击外部元素后关闭菜单            | boolean              | true      |
| placeholder-text       | 占位文字                                | string               | "Select"  |
| name                   | 标识符，唯一的字符串                    | string               | ""        |
| checkbox-disabled-name | 标识符，根据此属性判断是否禁用复选框    | string               | ""        |

### Events

| 事件名 | 说明                          | 回调参数 |
| ------ | ----------------------------- | -------- |
| change | 点击选项导致 value 变化时触发 | value    |
| open   | 打开菜单栏时触发              | -        |
| close  | 关闭菜单栏时触发              | -        |
| opened | 打开菜单栏且动画结束后触发    | -        |
| closed | 关闭菜单栏且动画结束后触发    | -        |

### updateScroll 方法

通过 ref 可以获取到 Checkbox 实例并调用实例方法，详见[组件实例方法](https://cn.vuejs.org/guide/essentials/template-refs.html#ref-on-component)

| 事件名       | 说明                             | 回调参数 |
| ------------ | -------------------------------- | -------- |
| updateScroll | 更新组件内部对页面滚动状态的控制 | -        |
