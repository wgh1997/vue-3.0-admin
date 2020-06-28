<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { generateTitle } from './utils/i18n'
export default {};
</script>
<style>
@import "../static/css/main.css";
@import "../static/css/theme-green/color-green.css";
.g-statues-bar {
  position: fixed;
  z-index: 90;
  top: 55px;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-left: 270px;
  background: #fff;
}

.g-statues-bar .bread {
  line-height: 40px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 230px;
  height: 100%;
  padding-top: 55px;
  border-right: 1px solid #dedede;
  overflow-y: auto;
}

.logo {
  float: left;
  text-align: center;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color: #fff;
}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color: #fff;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color: inherit;
}
#main {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
