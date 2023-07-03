<template>
    <div >

        <!-- Page container -->
        <div class="page-container">
            <div class="col-sm-4"></div>
            <!-- Page content -->
            <div class="page-content col-sm-4">

                <!-- Main content -->
                <div class="content-wrapper  col-sm-12">

                    <!-- Simple login form -->
                        <div class="panel panel-body login-form">
                            <div class="text-center">
                              <div class="icon-object border-slate-300 text-slate-300"><i class="icon-reading"></i></div>
                              <h5 class="content-group">SRS RECEIVING <small class="display-block">Enter your credentials below</small></h5>
                            </div>

                            <div class="form-group has-feedback has-feedback-left">
                              <input type="text" class="form-control" placeholder="Username" v-model="p_username">
                              <div class="form-control-feedback">
                                <i class="icon-user text-muted"></i>
                              </div>
                            </div>

                            <div class="form-group has-feedback has-feedback-left">
                                <input type="password" class="form-control" placeholder="Password" v-model="p_password" v-on:keyup.13="auth">
                                <div class="form-control-feedback">
                                  <i class="icon-lock2 text-muted"></i>
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="button" class="btn btn-primary btn-block" v-on:click="auth()">Sign in <i class="icon-circle-right2 position-right"></i></button>
                            </div>
                        </div>
                    <!-- /simple login form -->

                </div>
                <!-- /main content -->

            </div>
            <!-- /page content -->
            <div class="col-sm-4"></div>

        </div>
        <!-- /page container -->
      
    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl,  tokenApi } from './../assets/custom/custom.js'
export default {
    data(){
        return {
            p_password: '',
            p_username: '',
            loading_login: false
        }
    },
    async mounted(){
        await this.check_login()
    },
    methods:{
        async auth(){
            this.loading_login = true //activate loading
            try {
                let data  = {
                    p_password: this.p_password,
                    p_username: this.p_username,
                }
                let result = await axios.post(apiUrl('purchaser/receive_po/auth'), data)
                let res    = result.data
                localStorage.setItem('token',res.token)
                this.$session.start()
                this.$session.set('user_id', res.user_id)
                this.$session.set('user_fullname',  res.fullname)
                this.$session.set('level',  res.level)
                this.$session.set('enablePalengke', res.enablePalengke)
                window.location = '/receive/transfer/receive'
            } catch (error) {
                await this.handdleError(error)
            }
            this.p_password    = ""
            this.p_username    = ""
            this.loading_login = true //activate loading
        },
        async check_login(){
            if (tokenApi('token', 'check') != null ){
                window.location.href = '/receive/transfer/receive'
            }
        },
        async handdleError(error=null){
            if (error != null) {
                const response = JSON.parse(JSON.stringify(error))
                const status = response.response.status.toString()
                const message = (response.response.data.error === undefined) ? response.response.data.message : response.response.data.error.message
                msgError(status, message)
                return true
            }
                msgError(401, "Something Wrong")
        }
    }
}
</script>
