<template>
    <div class="panel-body">
      <div v-if="p_message != '' ">
          <div class="alert alert-success" style="border-radius:0px;"><h2>Successfully Upload Scanned Invoice </h2></div>
      </div>
       <table class="table table-bordered">
         <thead>
          <tr>
            <th>P.O # - RECEIVING NO</th>
            <th >
                <p>EXAMPLE FORMAT (P.O#-RECEIVING#) -> PO21345-12345 OR PO21345-0000012345</p>
                <input type="text" id="" class="form-control" placeholder="PO21345-123456 OR PO21345-0000012345" v-model="p_name">
            </th>
          </tr>
          <tr>
            <th  width="20%;" style="text-align:right">UPLOAD INVOICE ATTACHMENT</th>
            <th  width="50%;"><input class="form-control" multiple style="text-align:left;" id="file" ref="file"  v-on:change="handleFileUpload()" type="file" ></th>
          </tr>
          <tr>
            <th colspan="2">
                <button type="button" :disabled="btn_post" class="btn btn-sm btn-primary col-xs-12" v-on:click="post_receiving()">
                    <div v-if="loading_post">
                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                    </div>
                    <div v-if="!loading_post">
                        <i class="icon-checkmark"></i> UPLOAD
                    </div>
                </button>
            </th>
          </tr>
         </thead>
       </table>
    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'

export default {
    data(){
        return {
          btn_post: false,
          loading_post: false,
          file: '',
          p_name: '',
          p_message: ''
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'UploadInvoice')
    },
    methods:{
      async post_receiving() {
            try {
                let formData = new FormData()
                if (this.file == "") {
                    return msgError(401, "Invoice file is required")
                }

                if(this.p_name == "") {
                  return msgError(401, "P.O# AND RECEIVING NO# IS REQUIRED SAMPLE FORMAT (P.O#-RECEIVING#) -> PO21345-123456 OR PO21345-0000012345")
                }
                this.btn_post = true
                this.loading_post = true
                for (let i = 0; i < this.file.length; i++) {
                    let file = this.file[i]
                    formData.append('file[' + i + ']', file);
                }
                formData.append('p_name', this.p_name)
                await axios.post(apiUrl('purchaser/receive_po/po/post_upload_invoice'), formData, tokenApi())

                this.$session.flash.set('p_message', 'Success')
                this.p_message = this.$session.flash.get('p_message')
                
                this.$router.push({ name: 'UploadInvoice' })
                
                await this.refresh()

            } catch (error) {
                this.handdleError(error)
            }
            this.btn_post = false
            this.loading_post = false
        },
        async handleFileUpload() {
            this.file = this.$refs.file.files;
        },
        async refresh(enable=false){
          if(enable === false) {
              let input = this.$refs.file;
              input.type = 'text';
              input.type = 'file';
            }
          this.file = ''
          this.p_name = ''
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


