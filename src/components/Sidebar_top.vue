<style scoped>
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
.el-container {
  height: 1000px;
}
</style>
<template>
  <div class="g-body">
    <el-container>
      <el-header>
        <el-row type="flex"
                class="g-head">
          <a href="http://refined-x.com"
             target="_blank"
             title="Vue权限控制"
             class="logo">一个比较垃圾的权限管理</a>
          <div class="nav">
            <div class="usermenu">
              欢迎您：{{$store.state.user.name}}
              <router-link :to="{path: '/'}">
                <i class="el-icon-location"></i>首页
              </router-link>

              <a href="javascript:;"
                 @click="logout">
                <i class="el-icon-circle-close"></i>退出
              </a>

            </div>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="2"
                       class="el-menu-vertical-demo">
                <el-submenu v-for="(init,index) in routers"
                            :index="index+''"
                            v-if="!init.hidden">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{init.meta.title}}</span>
                  </template>
                  <el-menu-item-group v-if="!init.children==''">
                    <el-menu-item v-for="(inte,inde) in init.children"
                                  index="1-1"
                                  @click.native="$router.push(inte.path)">{{inte.meta.title}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div>
            <el-breadcrumb separator="/"
                           style="padding: 0px 0px 15px 0;">
              <el-breadcrumb-item :to="{ path: item.path }"
                                  v-for="item in breadcrumb">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- <Slider></Slider> -->

          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { generateTitle } from "../utils/i18n";
// import { getToken } from '../utils/auth'
// import Slider from './Header'
export default {
  components: {
    // Slider
  },
  data() {
    return {
      routers: this.$store.state.permission.routers,
      addRouters: this.$store.state.permission.addRouters,
      loginForm: {
        username: "",
        password: ""
      }
    };
  },

  mounted() {
    console.log(this.routers);
    console.log(this.addRouters);
  },
  // 这个是计算属性监听路由器的变化,形成面包屑
  computed: {
    breadcrumb() {
      console.log(this.$route, 11111111111);
      return this.$route.matched;
    }
  },
  methods: {
    generateTitle,
    // 这个是退出按钮
    logout: function() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          localStorage.removeItem("ms_username");
          this.$store.dispatch("LogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        })
        .catch(() => {});
    }
  },
  created: function() {
    // if (!this.user) {
    //   this.$router.push({ path: "/login" });
    // }
  }
};
</script>
