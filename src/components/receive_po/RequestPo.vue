<template>
  <div class="panel-body">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>
            P.O #
          </th>
          <th>
            <input type="text" id="p_po" v-model="p_po" class="col-sm-12 form-control input-sm">
          </th>
        </tr>
        <tr>
          <th>
            Remarks
          </th>
          <th>
              <input type="text" v-model="p_remarks" class="col-sm-6 col-xs-12 form-control  input-sm" >
          </th>
        </tr>
        <tr>
          <th>
            Action
          </th>
          <th>
            <button type="button" :disabled="btn_post" v-on:click="requestpo" class="btn btn-sm btn-primary col-xs-12" >
                <div v-if="loading_post">
                    <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                </div>
                <div v-if="!loading_post">
                    <i class="icon-checkmark"></i> REQUEST
                </div>
            </button>
          </th>
        </tr>
    </thead>
</table>
  </div>
</template>

<script >
import axios from 'axios';
import { msgError, msgSuccess, apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'

export default {
   data() {
    return {
      p_remarks: '',
      p_po: '',
      btn_post: false,
      loading_post: false,
    }
  },
  async mounted () {
    getSessionCurrentUrl(this, 'RequestPo')
  },
  methods: {
    async requestpo(){
      if(this.p_po == '') {
        return msgError('P.O #', 'is required')
      }

      if(this.p_remarks == '') {
        return msgError('Remarks', 'is required')
      }

      let params = {
        p_po: this.p_po,
        p_remarks: this.p_remarks
      }
      this.btn_post = true
      this.loading_post = true

      try {
        await axios.post(apiUrl('purchaser/receive_po/request'), params , tokenApi())
        msgSuccess('OKAY', 'ANG IYONG REQUEST AY NA PROCESS NA PAKI ANTAY NA MA APPROVED NG PURCHASER')
      } catch (error) {
        this.handdleError(error)
      }
      this.p_remarks = ''
      this.p_po = ''
      this.btn_post = false
      this.loading_post = false
    },
    async handdleError(error=null) {
      if (error != null) {
        const response = JSON.parse(JSON.stringify(error))
        const status = response.response.status.toString()
        const message = (response.response.data.error === undefined) ? response.response.data.message : response.response.data.error.message
        msgError(status, message)
        return true
      }
      msgError(401, "Something Wrong")
    },
  }
}
 
</script>

<style scoped>

</style>