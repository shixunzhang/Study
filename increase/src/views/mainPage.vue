<template>
    <div>
      <div @click="goToHtml(1)">跳转1</div>
      <div @click="goToHtml(2)">天气展示</div>
      <div @click="goToHtml(3)">输入框判断</div>
    </div>
</template>

<script>
    export default {
      name: "mainPage",
      methods: {
        goToHtml(num){
          if(num===1) {
            window.location.href='/static/pages/index1.html'
          } else if(num===2) {
            window.location.href='/static/pages/index2.html'
          }else if(num===3){
            window.location.href='/static/pages/index3.html'
          } else {

          }
        }
      }
    }
</script>

<style scoped>

</style>
