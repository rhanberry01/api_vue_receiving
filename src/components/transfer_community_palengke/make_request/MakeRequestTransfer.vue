<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">REQUEST ITEMS PL# {{ pl_no }}</p>
                    <p class="panel-title"> 
                      <select class="form-control" v-model="v_code" v-on:change="fetch_temporary_items()">
                        <option value=""> SELECT COMMUNITY PALENGKE</option>
                        <option v-for="(row, i) in branches" :key="i" :value="row.code"> {{ row.branch_name }} </option>
                      </select>
                    </p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>

            <!-- Main content -->
        <div class="content-wrapper  col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">Item Scanned</p>
                </div>

                <div class="table-responsive">
                    <div v-if="p_message == 'OK'">
                        <div class="alert alert-success" style="border-radius:0px;"><h2>SUCCESSFULLY POSTED </h2></div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item name</th>
                                <th></th>
                                <!-- <th></th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in temporary_items" :key="i">
                                <td> {{row.description }} <br>  
                                QTY -> {{row.qty_out }} <br>
                                UOM -> {{row.uom }} </td>
                                <td> 
                                    <button class="btn btn-danger btn-sm" v-on:click="delete_items(row.transfer_id, row.id)"><i class="icon-cancel-circle2"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p v-show="loading_barcode" class="pull-center" >
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                    <button v-on:click="openscan()" v-show="deviceScan" class="btn btn-info btn-xs pull-left" style="border-radius:0px;">CLICK TO SCAN BARCODE</button>
                                    <input class="form-control" placeholder="Enter Barcode"  id="item_barcode" v-model="p_barcode" v-on:keyup.13="fetch_barcode">
                                </td>
                                <!-- <td>
                                  <select v-model="p_uom" id="p_uom" class="col-sm-12 form-control input-sm">
                                      <option value=""> -- UOM -- </option>
                                      <option v-bind:value="row.a1" v-for="(row, i) in list_uoms" :key="i"> {{ row.a1 }}</option>
                                  </select>
                                </td> -->
                                <td><input  style="text-align:left;" class="form-control"  v-model="p_qty"></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center !important">TOTAL QTY SCANNED:  {{ total_qty_scanned }}</td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <button type="button" :disabled="btn_post" class="btn btn-sm btn-primary col-xs-12" v-on:click="post_receiving()">
                                        <div v-if="loading_post">
                                            <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                        </div>
                                        <div v-if="!loading_post" >
                                            <i class="icon-checkmark"></i> POST
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- End Main content -->

        <!-- Main content -->
    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl, msgSuccess, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data(){
        return {
            p_message: this.$session.flash.get('p_message'),
            p_checked_by: '',
            pl_no: 0,
            p_delivered_by: '',
            p_requested_by: '',
            p_delivery_date: '',
            p_date_created: '',
            p_br_code_out: '',
            p_br_code_in: '',
            p_qty: 1,
            p_barcode: '',
            p_transfer_no: '',
            total_sku: 0,
            total_qty_receive: 0,
            total_qty_ordered: 0,
            total_qty_scanned: 0,
            total_sku_remaining: 0,
            total_remaining_item: 0,
            loading_po: false,
            loading_barcode: false,
            btn_post: true,
            loading_post: false,
            deviceScan: false,
            temporary_items: [],
            loading_dispatch_details: false,
            list_dispatch_transfer_details: [],
            list_dispatch_transfer_details_temp: [],
            dispatch_items: [],
            last_item_scanned: [],
            p_username: '',
            list_uoms: [],
            branches: [],
            p_uom: '',
            p_password: '',
            v_code: 'srssananacp',
            isVisor: (this.$session.get('level')) ? (this.$session.get('level') == 3) ? true : false : false
        }
    },
    async mounted(){
      await this.getPlatform()
      // await this.fetch_list_uom()
      await this.fetch_temporary_items()
      getSessionCurrentUrl(this, 'TransferCommunityPalengkeMakeRequest')
    },
    methods:{
        async openscan(){
            window.qsprint.openscan()
        },
        async fetch_barcode() {
            this.loading_barcode = true //activate loading
            try {
                let data  = {
                    p_barcode: $('#item_barcode').val(),
                    p_qty: this.p_qty,
                    p_transfer_no: this.p_transfer_no,
                    p_uom: this.p_uom,
                    p_code: this.v_code
                }
                await axios.post(apiUrl('purchaser/receive_po/transfer-community-palengke/request/fetch_barcode'), data, tokenApi())
                await this.fetch_temporary_items(this.p_transfer_no)
            } catch (error) {
                await this.handdleError(error)
            }
            this.p_barcode = ""
            this.p_qty = 1
            this.loading_barcode = false //deactivate loading
        },
        async fetch_temporary_items() {
            try {
                let query  = {
                    headers: tokenApi('token', 'header'),
                    params: { 
                      v_code: this.v_code
                    }
                }
                let result = await axios.get(apiUrl('purchaser/receive_po/transfer-community-palengke/request/fetch_temporary_items'), query)
                let data   = result.data
                this.btn_post       = (data.temporary_items.length == 0) ? true : false
                this.temporary_items= data.temporary_items
                this.pl_no = data.pl_no
                this.p_transfer_no = data.pl_no
                this.branches = data.branches
               
            } catch (error) {
                await this.handdleError(error)
            }
        },
        async delete_items(temp_receiving_id, id) {
            try {
                let confirm = window.confirm('Confirm delete');
                if(confirm) {
                    let data = {
                        p_temp_id: temp_receiving_id,
                        p_id: id
                    }
                    let result = await axios.post(apiUrl('purchaser/receive_po/transfer-community-palengke/request/delete_items'), data, tokenApi())
                    let res   = result.data
                    await this.fetch_temporary_items()
                    msgSuccess(200, "Successfully deleted items")
                    if (res.count_items == 1) {
                        await this.refresh()
                    }
                }
            } catch (error) {
                this.handdleError(error)
            }
            
        },
        async post_receiving() {
            this.btn_post = true
            this.loading_post = true
            try {
                let data = {
                  temp_id: this.pl_no
                }
                await axios.post(apiUrl('purchaser/receive_po/transfer-community-palengke/request/post_receiving'), data, tokenApi())
                this.$session.flash.set('p_message', 'OK')
                this.$router.push({ name: 'TransferCommunityPalengkeMakeRequest' })
                location.reload()
                await this.refresh()

            } catch (error) {
                this.handdleError(error)
            }
            this.btn_post = false
            this.loading_post = false
        },
        async refresh() {
          
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
        },
        async  getPlatform() {
          let platform = ["Win32", "Android", "iOS", "Linux armv8l"];
          for (let i = 0; i < platform.length; i++) {
              if (navigator.platform.indexOf(platform[i]) >- 1) {
                if(platform[i] == 'Linux armv8l') {
                  this.deviceScan = true
                }
              }
          }
        },
        async fetch_list_uom(){
          try {
              let query = {
                  headers: tokenApi('token', 'header')
              }
              let result = await axios.get(apiUrl('purchaser/receive_po/op/variable/fetch_list_uom'), query)
              let data   = result.data
              this.list_uoms = data.list_uoms
          } catch (error) {
              await this.handdleError(error)
          }
      },
    }
}

</script>


<style scoped>
th,td {
  padding: 10px !important;
  font-size: 10px;
  text-align: center !important;
}
</style>
