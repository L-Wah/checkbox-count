<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Prism from "prismjs";

onMounted(() => {
  Prism.highlightAll();
});
const list = [
  {
    id: "Tom",
  },
  {
    id: "Jerry",
  },
  {
    id: "Lewis",
  },
  {
    id: "Shelly",
  },
  {
    id: "Adam",
    disabled: null,
  },
  {
    id: "Eve",
    disabled: true,
  },
  {
    id: "abcdefghijkln",
  },
  {
    id: "abcdefghijklnabcdefghijklnabcdefghijkln",
  },
];

const text = ref("");
const open = () => {
  // console.log("open");
  text.value = "打开菜单栏时 open 事件触发";
  showCreate.value = false;
};
const close = () => {
  // console.log("close");
  text.value = "关闭菜单栏时 close 事件触发";
};
// const opened = () => {
// console.log("opened");
// };
const closed = () => {
  // console.log("closed");
  showCreate.value = true;
};
// const change = (e: any) => {
//   console.log("change", e);
// };
const basic = ref(`<script setup lang="ts">
const list = [
  {
    id: "Tom",
  },
  {
    id: "Jerry",
  },
  {
    id: "Lewis",
  },
  {
    id: "Shelly",
  },
  {
    id: "Adam",
    disabled: null,
  },
  {
    id: "Eve",
    disabled: true,
  }
]
<\/script>
<template>
  <CheckboxCount v-model="value" :list="list" name="id" />
</template>`);

const value = ref([]);
const selected = ref(["Tom"]);
const dataList = computed(() => {
  return selected.value.map((item) => {
    if (item === "Adam") {
      return { id: item, disabled: null };
    }
    if (item === "Eve") {
      return { id: item, disabled: true };
    }
    return { id: item };
  });
});

const showCreate = ref(true);
const created = ref(false);
const width = ref(300);
const height = ref(200);
const color = ref("");
const duration = ref(0.2);
const disabled = ref(false);
const overlay = ref(true);
const zIndex = ref(10);
const closeOnClickOverlay = ref(true);
const closeOnClickOutside = ref(true);
const placeholderText = ref("Select");
const checkboxDisabledName = ref(false);
const directionDown = ref(true);
const disabledName = computed(() => {
  return checkboxDisabledName.value ? "disabled" : "";
});
</script>

<template>
  <div class="app">
    <h1><em>vue-checkbox-count</em></h1>
    <br />

    <pre style="user-select: text; width: 80vw"><code class="language-js line-numbers">{{ basic }}</code></pre>
    <br />

    <div>
      <div v-for="(item, i) in list" :key="i" style="margin-bottom: 5px">
        <input style="transform: scale(1.5)" type="checkbox" :id="item.id" :value="item.id" v-model="selected" />
        <label :for="item.id">&nbsp&nbsp&nbsp&nbsp{{ item.id }}</label>
      </div>
    </div>
    <br />

    <h2>------ 基本使用 ------</h2>
    <br />
    <em style="color: red">效果请使用移动端模式查看</em>
    <br />
    <div style="display: flex; justify-content: center">
      <CheckboxCount v-model="value" :list="dataList" name="id" />
    </div>
    <br />

    <h2>------ 自定义内容 ------</h2>
    <br />
    <div class="home">
      <CheckboxCount v-model="value" :list="dataList" name="id" checkbox-disabled-name="disabled">
        <template #panelFilter>😀&nbsp;</template>
        <template #panelArrow="props"><span :class="{ transform: props.up }">👇</span></template>
        <template #checkboxIcon="props">
          <div class="square" :class="{ 'square-checked': props.checked }"></div>
        </template>
        <template #checkboxText="props">
          <div class="text" :class="{ 'text-checked': props.checked }">{{ props.listItem }}</div>
        </template>
      </CheckboxCount>
    </div>
    <br />

    <h2>------ 启用配置项 ------</h2>
    <br />
    <input
      v-if="showCreate"
      type="button"
      value="创建新组件"
      style="background-color: navajowhite; transform: scale(1.5)"
      @click="created = !created"
    />
    <div v-else>{{ text }}</div>

    <div v-if="!created">
      <br />
      <h3>Width：组件宽度</h3>
      <div style="display: flex">
        <input type="range" min="100" max="600" v-model="width" />
        <div>&nbsp;&nbsp;</div>
        <div>{{ width }}</div>
      </div>
      <h3>Height：下拉框最大高度</h3>
      <div style="display: flex">
        <input type="range" min="100" max="1000" v-model="height" />
        <div>&nbsp;&nbsp;</div>
        <div>{{ height }}</div>
      </div>
      <h3>Duration：动画时长</h3>
      <div style="display: flex">
        <input type="range" min="0" max="5" step="0.1" v-model="duration" />
        <div>&nbsp;&nbsp;</div>
        <div>{{ duration }}</div>
      </div>
      <h3>zIndex：菜单栏层级</h3>
      <div style="display: flex">
        <input type="range" min="1" max="20" step="1" v-model="zIndex" />
        <div>&nbsp;&nbsp;</div>
        <div>{{ zIndex }}</div>
      </div>
      <br />

      <h3>Disabled：</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="disabled" v-model="disabled" />
        <div>&nbsp;&nbsp;</div>
        <label for="disabled">是否禁用菜单</label>
      </div>
      <h3>Overlay：</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="overlay" v-model="overlay" />
        <div>&nbsp;&nbsp;</div>
        <label for="overlay">是否显示遮罩层</label>
      </div>
      <h3>CloseOnClickOverlay：</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="closeOnClickOverlay" v-model="closeOnClickOverlay" />
        <div>&nbsp;&nbsp;</div>
        <label for="closeOnClickOverlay">是否在点击遮罩层后关闭菜单</label>
      </div>
      <h3>CloseOnClickOutside</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="closeOnClickOutside" v-model="closeOnClickOutside" />
        <div>&nbsp;&nbsp;</div>
        <label for="closeOnClickOutside">是否在点击外部元素后关闭菜单</label>
      </div>
      <h3>CheckboxDisabledName</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="checkboxDisabledName" v-model="checkboxDisabledName" />
        <div>&nbsp;&nbsp;</div>
        <label for="checkboxDisabledName">根据字段禁用复选框，配置为"disabled"</label>
      </div>
      <h3>DirectionDown</h3>
      <div style="display: flex">
        <input style="transform: scale(1.5)" type="checkbox" id="directionDown" v-model="directionDown" />
        <div>&nbsp;&nbsp;</div>
        <label for="directionDown">是否向下展开</label>
      </div>
      <br />

      <div>
        <h3>Color：文字及图标颜色(默认#93acd3)</h3>
        <input v-model="color" />
      </div>
      <div>
        <h3>PlaceholderText：占位文字</h3>
        <input v-model="placeholderText" />
      </div>
    </div>
    <br />
    <CheckboxCount
      v-if="created"
      v-model="value"
      :list="dataList"
      name="id"
      :disabled="disabled"
      :width="width"
      :height="height"
      :color="color"
      :duration="duration"
      :overlay="overlay"
      :zIndex="zIndex"
      :closeOnClickOverlay="closeOnClickOverlay"
      :closeOnClickOutside="closeOnClickOutside"
      :placeholderText="placeholderText"
      :checkboxDisabledName="disabledName"
      :directionDown="directionDown"
      @open="open"
      @close="close"
      @closed="closed"
    />
    <br />
    <div>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum id modi aut saepe? Quisquam odio consectetur aut dolorem aperiam omnis!
      Mollitia, labore! Aut sed quas illum quos ipsum consectetur exercitationem, id aspernatur adipisci, voluptatibus molestiae possimus obcaecati
      reiciendis harum eos debitis eaque cumque ex assumenda inventore earum eum? Architecto sapiente culpa dolor cum ipsa eveniet sed nihil officia
      laborum dolore. Expedita eaque quis beatae blanditiis commodi fuga asperiores quas, hic soluta dolorem velit reprehenderit, accusamus quaerat
      necessitatibus rem nostrum. Qui omnis ab maxime ex rerum molestias cum natus aliquid, id incidunt nam fuga reiciendis quas enim iste totam?
      Officia, velit iste harum mollitia fuga ea consequuntur, voluptate atque amet voluptatum enim autem rerum numquam sit corrupti quasi assumenda
      beatae molestiae quidem neque dignissimos incidunt, quos labore esse. Corporis quia temporibus nam ab, ipsam perferendis assumenda quod,
      distinctio praesentium amet dolor exercitationem officia voluptatibus dignissimos cum molestias cumque atque omnis et illo tempora, ipsum hic.
      Nulla natus, quam officiis odio corporis illum tempora? Harum beatae dolorum voluptates praesentium possimus. Vitae, excepturi labore. Vero
      error magnam unde obcaecati eius. Maxime corrupti suscipit harum sapiente. Nihil dicta ullam reiciendis consequatur sunt cumque, exercitationem
      similique qui quos sequi, consequuntur possimus reprehenderit voluptates error perspiciatis officia unde assumenda. Fugit et delectus, obcaecati
      aperiam fuga odio quo error asperiores optio similique magni. Quod perferendis consequuntur illo possimus laudantium, vel consequatur blanditiis
      inventore. Tempore expedita aliquam quos, enim, necessitatibus nostrum recusandae consequuntur libero rem consequatur aspernatur in culpa
      obcaecati autem labore praesentium nobis doloremque blanditiis ad nulla voluptates totam facilis. Laudantium aspernatur, autem distinctio
      numquam itaque nulla alias? Iusto voluptates atque, nisi cumque modi a suscipit illo beatae eaque qui perferendis fuga hic sequi laudantium
      mollitia rerum asperiores quae aperiam quis dolorum sint deleniti reiciendis. Praesentium nihil voluptate officiis aut libero esse nobis sed
      ipsa qui sint.
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;

  // 自定义内容
  .home {
    .transform {
      transform: rotate(180deg);
    }

    .square {
      width: 18px;
      height: 18px;
      background: #55657e;
      border-radius: 5px;
      margin-inline-end: 8px;

      &-checked {
        background: orange;
      }
    }

    .text {
      color: aquamarine;

      &-checked {
        background: darkcyan;
      }
    }

    // 修改组件内部样式
    :deep(.wrapper) {
      background-image: linear-gradient(to top, #09203f 0%, #537895 100%);

      .item-disabled {
        .square {
          background-color: #646566;
        }

        .text {
          color: #969799;
        }
      }
    }
  }
}
</style>
