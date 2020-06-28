<template>
  <div class="page">
    首页
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
  methods: {},
  computed: {},
  created() {},
  mounted() {
    async function fun() {
      let data = await getUser();
      console.log(data, "我是什么");
      return data;
    }
    fun()
      .then(stream => {
        console.log("我运行木有", stream);
      })
      .catch(stream => {
        console.log("我运行木有", stream);
      });
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
