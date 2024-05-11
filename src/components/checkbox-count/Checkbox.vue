<template>
  <!-- 图标默认内容 -->
  <div style="flex-shrink: 0">
    <slot name="checkboxIcon">
      <div class="icon" :class="{ 'icon-disabled': disabled }">
        <svg
          v-show="checked"
          class="icon"
          :class="{ 'icon-checked': checked }"
          t="1714968169291"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9284"
        >
          <path
            d="M884.363636 0a139.636364 139.636364 0 0 1 139.403637 131.444364L1024 139.636364v744.727272a139.636364 139.636364 0 0 1-131.444364 139.403637L884.363636 1024H139.636364a139.636364 139.636364 0 0 1-139.403637-131.444364L0 884.363636V139.636364A139.636364 139.636364 0 0 1 131.444364 0.232727L139.636364 0h744.727272z m-112.034909 346.298182a46.545455 46.545455 0 0 0-65.815272 0l-296.215273 296.168727-98.769455-98.676364a46.545455 46.545455 0 1 0-65.815272 65.768728l131.67709 131.677091a46.545455 46.545455 0 0 0 65.815273 0l329.122909-329.122909a46.545455 46.545455 0 0 0 0-65.861819z"
            fill="#22DD00"
            fill-opacity="1"
            p-id="9285"
          ></path>
        </svg>
      </div>
    </slot>
  </div>
  <!-- 文本默认内容 -->
  <slot name="checkboxText">
    <div class="name" :class="{ 'name-checked': checked, 'name-disabled': disabled }">
      {{ text }}
    </div>
  </slot>
</template>

<script setup lang="ts">
import { computed } from "vue";
defineOptions({
  name: "Checkbox",
});

const props = defineProps({
  list: {
    type: Array,
    default: () => {},
  },
  item: {
    type: Object,
    default: () => {},
  },
  index: {
    type: [Number, String],
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  checkboxDisabledName: {
    type: String,
    default: "",
  },
});

const text = computed(() => {
  return props.name ? props.item[props.name] : props.index;
});

const checked = computed(() => {
  return props.list.includes(text.value);
});

const disabled = computed(() => {
  return Boolean(props.item[props.checkboxDisabledName]);
});
</script>

<style lang="scss" scoped>
$text-color: var(--textColor);

.icon {
  width: 18px;
  height: 18px;
  background-color: #55657e;
  border-radius: 5px;
  margin-inline-end: 8px;
  &-checked {
    background-color: #fff;
  }
  &-disabled {
    background-color: #646566;
  }
}

.name {
  height: 18px;
  line-height: 18px;
  color: $text-color;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &-checked {
    color: #32cd32;
  }
  &-disabled {
    color: #969799;
  }
}
</style>
