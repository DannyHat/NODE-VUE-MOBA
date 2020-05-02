<template>
  <div class="login_container">
    <el-card>
      <div slot="header">登陆页</div>
      <el-form @submit.native.prevent="login()">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="" type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
         <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    async login() {
      console.log('login', this.form)
      let res = await this.$http.post('/login', this.form)
      console.log('res', res)
      localStorage.token = res.data.token
      this.$router.push('/')
    }
  }
}
</script>

<style>
.login_container {
  width: 25rem;
  margin: 10rem auto;
}
</style>