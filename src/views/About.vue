<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Align edge / 边缘对齐</Button>
    </Tooltip>
    <Switch v-model:checked="checked" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Tooltip, Button, Switch } from 'ant-design-vue';
export default defineComponent({
  components: {
    Tooltip,
    Button,
    Switch
  },
  setup() {
    const checked = ref<boolean>(false);
    return {
      checked
    }
  }
})
</script>
