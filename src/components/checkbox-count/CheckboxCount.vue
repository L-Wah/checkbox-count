<template>
  <div
    class="wrapper"
    ref="ccRef"
    :style="{
      '--checkboxCountWidth': width + 'px',
      '--textColor': textColor,
      '--maxHeight': maxHeight + 'px',
      '--duration': duration + 's',
      '--zIndex': autoZIndex,
    }"
    :class="{
      'wrapper-radius-down': (showPopover || animationShow) && directionDown,
      'wrapper-radius-up': (showPopover || animationShow) && !directionDown,
    }"
  >
    <!-- 菜单显示区 -->
    <div class="switch" :class="{ 'switch-disabled': disabled }" @click="onSwitch">
      <slot name="panelFilter">
        <svg
          class="icon"
          t="1715138526315"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4197"
          width="18"
          height="18"
        >
          <path
            d="M889.088 147.584a82.368 82.368 0 0 0-76.416-51.008H211.008a82.56 82.56 0 0 0-76.416 51.008 82.368 82.368 0 0 0 17.792 90.112l273.024 263.296v262.016c0 9.28 3.584 18.304 10.112 24.96l125.184 129.536a35.84 35.84 0 0 0 39.424 8.384 36.032 36.032 0 0 0 22.464-33.408V499.328l248.512-261.504a82.56 82.56 0 0 0 17.984-90.24z m-68.864 39.232L561.216 458.88a35.84 35.84 0 0 0-10.496 25.536V806.4l-53.248-57.984v-262.4a36.032 36.032 0 0 0-10.496-25.408L203.52 186.816a9.984 9.984 0 0 1-2.368-11.648 10.048 10.048 0 0 1 9.92-6.592h601.664c5.952 0 8.64 3.648 9.92 6.592a10.048 10.048 0 0 1-2.368 11.648z"
            :fill="textColor"
            fill-opacity="0.8"
            p-id="4198"
          ></path>
        </svg>
      </slot>
      <div class="text" ref="currProviderRef">{{ descText }}</div>
      <div class="extra" v-if="showExtraNum">{{ extraNum }}</div>
      <slot name="panelArrow" :up="showPopover">
        <svg
          t="1715139388901"
          class="arrow"
          :class="{ 'arrow-active-down': showPopover && directionDown, 'arrow-up': !directionDown, 'arrow-active-up': showPopover && !directionDown }"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11045"
          width="15"
          height="15"
        >
          <path
            d="M183.168 332.501333a42.666667 42.666667 0 0 1 57.621333-2.496l2.709334 2.496L512 600.96l268.501333-268.48a42.666667 42.666667 0 0 1 57.621334-2.496l2.709333 2.496a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334-298.666667 298.666666a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709333-2.496-298.666667-298.666666a42.666667 42.666667 0 0 1 0-60.330667z"
            :fill="textColor"
            fill-opacity="0.6"
            p-id="11046"
          ></path>
        </svg>
      </slot>
    </div>

    <div
      class="checkbox"
      :style="{ top: overlayTop, left: overlayLeft, bottom: overlayBottom, height: checkboxHeight }"
      v-show="showPopover || animationShow"
    >
      <!-- 遮罩区 -->
      <div class="overlay" :class="{ 'overlay-enter-leave': animationShow }" v-if="overlay" @click="onClickOverlay"></div>
      <!-- 下拉多选区 -->
      <div
        class="popover"
        ref="popoverRef"
        :class="{
          'popover-down': animationShow && directionDown,
          'popover-up': animationShow && !directionDown,
          'up-bottom': !directionDown,
        }"
      >
        <div
          v-for="(item, i) in dataList"
          :key="i"
          class="item"
          :class="{
            'item-disabled':
              item[props.checkboxDisabledName] ||
              (Number(max) === checkbox.length && (name ? !checkbox.includes(item[name]) : !checkbox.includes(i))),
          }"
          @click="checkboxChange(item, i)"
        >
          <Checkbox :list="checkbox" :item="item" :index="i" :name="name" :checkboxDisabledName="checkboxDisabledName" :max="max">
            <template #checkboxIcon>
              <slot name="checkboxIcon" :checked="name ? checkbox.includes(item[name]) : checkbox.includes(i)"></slot>
            </template>
            <template #checkboxText>
              <slot name="checkboxText" :checked="name ? checkbox.includes(item[name]) : checkbox.includes(i)" :listItem="item[name] || i"></slot>
            </template>
          </Checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "./Checkbox.vue";
import { ref, onMounted, computed, watch, onUnmounted, Ref, nextTick } from "vue";
import eventCount from "./eventCount";

defineOptions({
  name: "CheckboxCount",
});

/**
 * 接收传过来的值
 *
 * @param modelValue 双向绑定的数据
 * @param list 多选框数据
 * @param disabled 是否禁用菜单
 * @param width 组件宽度，默认300px
 * @param height 下拉框最大高度，默认200px
 * @param color 文字及图标颜色，默认"#93acd3"，禁用时为"#969799"
 * @param directionDown 菜单向下展开，默认true
 * @param duration 动画时长，单位秒，设置为 0 可以禁用动画
 * @param z-index 菜单栏 z-index 层级，默认10
 * @param overlay 是否显示遮罩层，默认true
 * @param close-on-click-overlay 是否在点击遮罩层后关闭菜单，默认true
 * @param close-on-click-outside 是否在点击外部元素后关闭菜单，默认true
 * @param placeholderText 占位文字，默认Select
 * @param name 标识符，用于显示列表数据文本
 * @param checkboxDisabledName 标识符，根据此属性判断是否禁用复选框
 * @param max 最大选项可选数，-1 为无限制
 */
const props = defineProps({
  modelValue: {
    type: Array,
  },
  list: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: 300,
  },
  height: {
    type: [Number, String],
    default: 200,
  },
  color: {
    type: String,
    default: "",
  },
  directionDown: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: [Number, String],
    default: 0.2,
  },
  zIndex: {
    type: [Number, String],
    default: 10,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
  placeholderText: {
    type: String,
    default: "Select",
  },
  name: {
    type: String,
    default: "",
  },
  checkboxDisabledName: {
    type: String,
    default: "",
  },
  max: {
    type: [Number, String],
    default: -1,
  },
});

const dataList: { [x: string]: any } = computed(() => {
  if (Array.isArray(props.list)) {
    return props.list;
  }
  return [];
});

// 显示框文本颜色
const textColor = computed(() => {
  return props.color ? props.color : props.disabled ? "#969799" : "#a3bded";
});

// 当前组件ref
const ccRef: Ref<HTMLElement | null> = ref(null);
// 下拉框最大高度
const maxHeight = ref(0);
// 背景遮罩位置Top
const overlayTop = ref("");
// 背景遮罩位置Left
const overlayLeft = ref("");
// 背景遮罩位置Bottom
const overlayBottom = ref("");
// 背景遮罩高度
const checkboxHeight = ref("unset");
// 下拉区组件ref
const popoverRef: Ref<HTMLElement | null> = ref(null);

const setPopoverPosition = () => {
  overlayLeft.value = (ccRef.value as HTMLElement).getBoundingClientRect().left + "px";
  // 获取视口高度
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  if (props.directionDown) {
    const bottomSize = (ccRef.value as HTMLElement).getBoundingClientRect().bottom;
    overlayTop.value = bottomSize + "px";
    // 距离底部距离
    const distanceToBottom = viewportHeight - bottomSize;
    if (distanceToBottom >= Number(props.height)) {
      maxHeight.value = Number(props.height);
    } else {
      maxHeight.value = distanceToBottom - 10;
    }
    if (props.overlay) {
      overlayBottom.value = "0";
      checkboxHeight.value = "unset";
    } else {
      overlayBottom.value = "unset";
      nextTick(() => {
        checkboxHeight.value = (popoverRef.value as HTMLElement).offsetHeight + "px";
      });
    }
  } else {
    // 距离顶部距离
    const topSize = (ccRef.value as HTMLElement).getBoundingClientRect().top;
    overlayBottom.value = viewportHeight - topSize + "px";
    if (topSize >= Number(props.height)) {
      maxHeight.value = Number(props.height);
    } else {
      maxHeight.value = topSize - 10;
    }
    if (props.overlay) {
      overlayTop.value = "0";
      checkboxHeight.value = "unset";
    } else {
      overlayTop.value = "unset";
      nextTick(() => {
        checkboxHeight.value = (popoverRef.value as HTMLElement).offsetHeight + "px";
      });
    }
  }
};

// 是否展示多选项数组列表
const showPopover = ref(false);
// 动画显示控制
const animationShow = ref(false);
const emit = defineEmits(["open", "close", "opened", "closed", "change", "update:modelValue"]);
const autoZIndex = ref(props.zIndex);

const onSwitch = () => {
  if (props.disabled) {
    return;
  }
  if (animationShow.value) {
    return;
  }
  if (!showPopover.value) {
    // 打开下拉菜单
    emit("open");
    showPopover.value = true;
    // 增加层级
    autoZIndex.value = Number(props.zIndex) + eventCount.activeCount;
    // 禁止滚动
    eventCount.increment(id.value);
    // 动画效果
    animationShow.value = true;
    window.requestAnimationFrame(() => {
      animationShow.value = false;
    });
    setPopoverPosition();
    setTimeout(() => {
      emit("opened");
    }, Number(props.duration) * 1000);
  } else {
    // 关闭下拉菜单
    emit("close");
    showPopover.value = false;
    // 动画效果
    animationShow.value = true;
    setTimeout(() => {
      animationShow.value = false;
      // 恢复滚动
      eventCount.decrement(id.value);
      emit("closed");
    }, Number(props.duration) * 1000);
  }
};

// 点击遮罩层
const onClickOverlay = () => {
  if (props.closeOnClickOverlay && showPopover.value) {
    onSwitch();
  }
};

// 选中选项的文字
const currSelect = computed(() => {
  let tempStr = "";
  checkbox.value.forEach((element, i) => {
    if (i === 0) {
      tempStr += element;
    } else {
      tempStr += ", " + element;
    }
  });
  return tempStr;
});

// 计算文字宽度
const measureText = (val: string, font: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  (context as CanvasRenderingContext2D).font = font;
  const { width } = (context as CanvasRenderingContext2D).measureText(val);
  return Number(width);
};

// 文字计算加入省略号
const calcDescText = (font: string, spaceTotal: number) => {
  let tempStr = "";
  for (const item of checkbox.value) {
    if (item === checkbox.value[0]) {
      tempStr += item;
      checkboxCount.value = 1;
      if (measureText(tempStr, font) > spaceTotal) {
        // 第一个数据就超出显示范围的时候，手动加省略号，且隐藏统计数字
        showExtraNum.value = false;
        let fontStr = "";
        for (const i of tempStr) {
          fontStr += i;
          if (measureText(fontStr + ", ", font) > spaceTotal) {
            descText.value = fontStr + "...";
            break;
          }
        }
      } else {
        descText.value = tempStr + ", ...";
        showExtraNum.value = true;
      }
    } else if (measureText(tempStr + ", " + item + ", ...", font) < spaceTotal) {
      // 在显示范围内自动调整显示数据
      tempStr += ", " + item;
      checkboxCount.value += 1;
      descText.value = tempStr + ", ...";
      showExtraNum.value = true;
    } else {
      showExtraNum.value = true;
      break;
    }
  }
};

// 点击组件区域外部空间
const handleClickOutside = (e: MouseEvent) => {
  if (!ccRef.value?.contains(e.target as Element)) {
    if (showPopover.value) {
      onSwitch();
    }
  }
};

// 当前文字占据的空间
const currSpaceCount = ref();
// 文字区组件ref
const currProviderRef: Ref<HTMLElement | null> = ref(null);
// 多选项数组列表
const checkbox = Array.isArray(props.modelValue) ? ref([...props.modelValue]) : ref([]);
// 显示已选中的文字
const descText = ref("");
// 没溢出的数组个数
const checkboxCount = ref(0);
// 是否显示超出范围外的数目
const showExtraNum = ref(false);
// 超出范围外的数目
const extraNum = ref("");
// 组件id
const id = ref("");

const handleResize = () => {
  if (showPopover.value) {
    setPopoverPosition();
  }
};

onMounted(() => {
  id.value = Math.random().toString(20).substring(2, 9);
  eventCount.components.push({
    id: id.value,
    state: showPopover.value,
  });
  // 初始化时定义组件所处的位置，显示框能容纳的空间大小
  window.addEventListener("resize", handleResize);
  // 点击外部收起列表
  if (props.closeOnClickOutside) {
    document.addEventListener("click", handleClickOutside);
  }

  const font = getComputedStyle(currProviderRef.value as HTMLElement).font;
  // 能容纳的空间
  const spaceTotal = (currProviderRef.value as HTMLElement).clientWidth - measureText(`...+${props.list.length}`, font);

  watch(
    currSelect,
    (newVal) => {
      currSpaceCount.value = measureText(newVal, font);
    },
    { immediate: true }
  );

  watch(
    currSpaceCount,
    (newVal, oldVal) => {
      if (newVal > spaceTotal) {
        // 溢出计算可显示个数
        calcDescText(font, spaceTotal);
      } else {
        // 不溢出不显示
        showExtraNum.value = false;
        // 溢出前递增，且每添加一个数据此数组同时加一，溢出后不再增加
        if (newVal > oldVal) {
          checkboxCount.value += 1;
        } else {
          // 减少数组数据的时候将数组长度同步为已选择数据的长度
          checkboxCount.value = checkbox.value.length;
        }
        descText.value = currSelect.value ? currSelect.value : props.placeholderText;
      }
      extraNum.value = `+${checkbox.value.length - checkboxCount.value}`;
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  const index = eventCount.components.findIndex((item) => {
    return id.value === item.id;
  });
  eventCount.components.splice(index, 1);
  window.removeEventListener("resize", handleResize);
  if (props.closeOnClickOutside) {
    document.removeEventListener("click", handleClickOutside);
  }
});

const checkboxChange = (item: { [x: string]: any }, i: number | string) => {
  const { name } = props;
  let id = name ? item[name] : i;
  if (item[props.checkboxDisabledName] || (Number(props.max) === checkbox.value.length && !checkbox.value.includes(id))) {
    return;
  }
  emit("change", item);

  if (checkbox.value.includes(id)) {
    // 取消选中
    let index = checkbox.value.findIndex((item) => {
      return id === item;
    });
    checkbox.value.splice(index, 1);
    emit("update:modelValue", checkbox.value);
  } else {
    // 新增选中
    checkbox.value.push(id);
    emit("update:modelValue", checkbox.value);
  }
};

defineExpose({
  updateScroll: eventCount.update.bind(eventCount),
});
</script>

<style scoped lang="scss">
.wrapper {
  $width: var(--checkboxCountWidth);
  $text-color: var(--textColor);
  position: relative;

  width: $width;
  background-color: #10161f;
  border-radius: 8px;

  &-radius-down {
    border-radius: 8px 8px 0 0;
  }
  &-radius-up {
    border-radius: 0 0 8px 8px;
  }

  .switch {
    padding: 8px;
    height: 50px;
    display: flex;
    align-items: center;

    &-disabled {
      cursor: not-allowed;
    }

    .icon {
      flex-shrink: 0;
      margin-inline-end: 4px;
    }

    .text {
      width: 200px;
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      color: $text-color;
      white-space: nowrap;
    }

    .extra {
      font-size: 14px;
      font-weight: 600;
      color: $text-color;
      text-align: center;
    }

    .arrow {
      flex-shrink: 0;
      &-active-down {
        transform: rotate(180deg);
      }
      &-up {
        transform: rotate(180deg);
      }
      &-active-up {
        transform: rotate(0);
      }
    }
  }

  .checkbox {
    width: $width;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: var(--zIndex);

    .overlay {
      position: absolute;
      width: $width;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      transition: opacity var(--duration);
      opacity: 1;
    }
    .overlay-enter-leave {
      opacity: 0;
    }

    .popover {
      width: $width;
      position: absolute;
      background: rgba(22, 31, 44, 0.95);
      padding: 16px;
      max-height: var(--maxHeight);
      overflow: auto;
      transition: transform var(--duration);
      transform: translate3d(0, 0, 0);

      &-down {
        transform: translate3d(0, -100%, 0);
      }
      &-up {
        transform: translate3d(0, 100%, 0);
      }

      .item {
        display: flex;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        user-select: none;
        padding-bottom: 10px;
        &:last-child {
          padding-bottom: 0;
        }
        &-disabled {
          cursor: not-allowed;
        }
      }
    }

    .up-bottom {
      bottom: 0;
    }
  }
}
</style>
