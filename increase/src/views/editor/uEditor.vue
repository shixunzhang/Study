<template>
  <div>
    <UE :defaultMsg="content" id="editor" ref="ue"></UE>
  </div>
</template>

<script>
  import UE from '@/components/uEditor.vue'
  export default {
    name: 'uEditor',
    data () {
      return {
        content: '<p>海宝在Vue中使用ueditor</p>'
      }
    },
    components: {
      UE
    }
  }
</script>

<style scoped>

</style>
