<template>
  <div>
    <el-form ref="form" :model="LoginForm" label-width="80px" >
      <el-form-item label="账号">
        <el-input v-model="LoginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="LoginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'
export default {
  components: {},
  props: {},
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      rules: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', message: '年龄必须为数字值' }
      ]
    }
  },
  watch: {},
  computed: {},
  methods: {
    login () {
      api.Login({ 'username': this.LoginForm.username, 'password': this.LoginForm.password }, function (data) {
        console.log(data)
         this.$router.push('/index')
      })
      /* this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      }); */
     
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="css" scoped>
</style>
