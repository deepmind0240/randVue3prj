<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialogContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixin/ToggleMixin';
export default {
  name: 'base-dialog',
  mixins: [toggleMixin],
}
</script>

<style>
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
}

.dialogContent {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 30px;
}
</style>