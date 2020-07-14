<template>
  <div class="page">
    首页
    <button @click="sse">提交</button>
  </div>
</template>

<script>
import { getUser } from "../../api/login";
export default {
  name: "page",
  components: {},
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {
    async sse(){
      let data = await getUser();
      console.log(data, "我是什么");
    }
  },
  computed: {},
  created() {},
  mounted() {
    async function fun() {
      // let data = await getUser();
      // console.log(data, "我是什么");
      // return data;
    }
    fun()
  },
  destroyed() {}
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
