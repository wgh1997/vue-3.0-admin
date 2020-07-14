<template>
<div>
  404
</div>
</template>


<script>
export default {
  methods: {
    logout() {
      this.$store.state.openTab = [];
      this.$store.state.activeIndex = "/main";
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.header {
  background-color: rgb(85, 201, 236);
  height: 40px;
}
h1 {
  margin: 0;
}
</style>
