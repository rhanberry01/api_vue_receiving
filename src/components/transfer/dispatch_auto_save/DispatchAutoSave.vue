<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p>
                         <a style="border-radius:0px;">&nbsp;&nbsp;<i class="icon icon-undo"></i><router-link to="/receive/transfer/dispatch"> CLICK ME TO BACK</router-link> </a>
                    </p>
                    <p class="panel-title">ITEMS FOR TRANSFER # {{ p_transfer_no }} </p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead >
                            <tr v-show="loading_dispatch_details">
                                <th colspan="2"  style="text-align:center">
                                    <p>
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                </th>
                            </tr>
                            <tr v-show="!loading_dispatch_details">
                                <th style="text-align:center;font-size:12px;">
                                    TRANSFER #: {{ p_transfer_no }}<br>
                                    OUT FROM BRANCH DATE: {{ p_delivery_date | date  }}<br>
                                    FROM BRANCH:  {{ p_br_code_out }}
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    REQUESTED BY: {{ p_requested_by | uppercase }}<br>
                                    DATE CREATED: {{ p_date_created | date }}<br>
                                    TO BRANCH: {{ p_br_code_in }}
                                </th>
                            </tr>
                        </thead>
                    </table>
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
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in temporary_items" :key="i">
                                <td> {{row.item_name }} <br>  
                                QTY -> <input type="text" v-model="row.qty" v-on:blur="updateQty(row)" /> <br>
                                UOM -> {{row.uom }} </td>
                                <td> 
                                    <button class="btn btn-danger btn-sm" v-on:click="delete_items(row.temp_receiving_id, row.id)"><i class="icon-cancel-circle2"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p v-show="loading_barcode" class="pull-center" >
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT WHILE IMPORTING GULAY ITEM..
                                    </p>
                                    <!-- <button v-on:click="openscan()" v-show="deviceScan" class="btn btn-info btn-xs pull-left" style="border-radius:0px;">CLICK TO SCAN BARCODE</button>
                                    <input class="form-control" placeholder="Enter Barcode"  id="item_barcode" v-model="p_barcode" v-on:keyup.13="fetch_barcode"> -->
                                </td>
                                <td><input  style="text-align:left;" class="form-control"  v-model="p_qty"></td>
                            <tr>
                            <tr>
                                <td style="text-align:center !important">SKU SCANNED: {{ total_sku }}</td>
                                <td style="text-align:center !important">SKU REMAINING:  {{ total_sku_remaining }}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center !important">TOTAL QTY SCANNED:  {{ total_qty_scanned }}</td>
                                <td style="text-align:center !important">REMAINING ITEMS:  {{ total_remaining_item }}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center !important">TOTAL PO QTY POSTED:  {{ total_qty_receive }}</td>
                                <td style="text-align:center !important">TOTAL PO QTY: {{ total_qty_ordered }}</td>
                            </tr>
                            <tr>
                            <td colspan="4">
                                    <input class="form-control"  v-model="p_checked_by" placeholder="Checked By">
                                </td>
                            <tr>
                                <td colspan="4"> <input class="form-control"  v-model="p_delivered_by" placeholder="Delivered By	"></td>
                            <tr>
                            <tr>
                                <td colspan="4">
                                    <button type="button" :disabled="btn_post" class="btn btn-sm btn-primary col-xs-12" v-on:click="post_receiving()">
                                        <div v-if="loading_post">
                                            <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                        </div>
                                        <div v-if="!loading_post">
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
        <!-- last item  -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">LAST ITEM SCANNED</p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ITEM NAME</th>
                                <th>UOM</th>
                                <th>REMAINING QTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in last_item_scanned" :key="i">
                                <td> {{row.description }} </td>
                                <td> {{row.unit_id }} </td>
                                <td> {{row.remaining }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- last item  -->

        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">ITEMS FOR TRANSFER</p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item name</th>
                                <th>Qty</th>
                                <th>UOM</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in dispatch_items" :key="i">
                                <td v-if="row.qty_out != row.qty_scanned"> {{row.description }} </td>
                                <td v-if="row.qty_out != row.qty_scanned"> {{row.qty_out - row.qty_scanned }} </td>
                                <td v-if="row.qty_out != row.qty_scanned"> {{row.unit_id }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl, msgSuccess, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data(){
        return {
            p_checked_by: '',
            p_delivered_by: '',
            p_requested_by: '',
            p_delivery_date: '',
            p_date_created: '',
            p_br_code_out: '',
            p_br_code_in: '',
            p_qty: 1,
            p_barcode: '',
            p_transfer_no: this.$route.query.transfer_id,
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
            last_item_scanned: []
        }
    },
    async mounted(){
      await this.getPlatform()
      await this.fetch_dispatch_transfer_details()
      await this.fetch_temporary_items(this.p_transfer_no)
      getSessionCurrentUrl(this, 'TransferDispatch')
    },
    methods:{
        async openscan(){
            window.qsprint.openscan()
        },
        async fetch_barcode(barcode, qty) {
            
            try {
                let data  = {
                    p_barcode: barcode,
                    p_qty: qty,
                    p_transfer_no: this.p_transfer_no
                }
                // console.log()
                await axios.post(apiUrl('purchaser/receive_po/transfer/dispatch/fetch_barcode'), data, tokenApi())
                // await this.fetch_temporary_items(this.p_transfer_no)
            } catch (error) {
                await this.handdleError(error)
            }
            this.p_barcode = ""
            this.p_qty = 1
            // this.loading_barcode = false //deactivate loading
        },
        async fetch_temporary_items(transfer_id) {
            this.loading_barcode = true //activate loading
            this.btn_post = true
            try {
                let query  = {
                    params: {
                        p_transfer_no: transfer_id
                    },
                    headers: tokenApi('token', 'header')
                }
                let result = await axios.get(apiUrl('purchaser/receive_po/transfer/dispatch/fetch_temporary_items'), query)
                let data   = result.data
                this.btn_post       = (data.temporary_items.length == 0) ? true : false
                this.dispatch_items = data.dispatch_items
                this.temporary_items= data.temporary_items

                this.total_sku           = data.total_sku
                this.total_qty_receive   = data.total_qty_receive
                this.total_qty_ordered   = data.total_qty_ordered
                this.total_qty_scanned   = data.total_qty_scanned
                this.total_sku_remaining = data.dispatch_items.length - data.total_all_sku
                this.total_remaining_item= data.total_qty_ordered - data.total_qty_scanned
                this.last_item_scanned = data.last_item_scanned

                for(const row of data.dispatch_items) {
                  const index = data.temporary_items.findIndex((temp) => row.barcode === temp.barcode)
                  if(index === -1) {
                    await this.fetch_barcode(row.barcode, row.qty_out)
                  }
                }
                
                await this.fetch_temporary_items_2(this.p_transfer_no)
                this.loading_barcode = false //activate loading
                this.btn_post = false
            } catch (error) {
                await this.handdleError(error)
            }
        },
        async fetch_temporary_items_2(transfer_id) {
            this.loading_barcode = true //activate loading
            try {
                let query  = {
                    params: {
                        p_transfer_no: transfer_id
                    },
                    headers: tokenApi('token', 'header')
                }
                let result = await axios.get(apiUrl('purchaser/receive_po/transfer/dispatch/fetch_temporary_items'), query)
                let data   = result.data
                this.btn_post       = (data.temporary_items.length == 0) ? true : false
                this.dispatch_items = data.dispatch_items
                this.temporary_items= data.temporary_items

                this.total_sku           = data.total_sku
                this.total_qty_receive   = data.total_qty_receive
                this.total_qty_ordered   = data.total_qty_ordered
                this.total_qty_scanned   = data.total_qty_scanned
                this.total_sku_remaining = data.dispatch_items.length - data.total_all_sku
                this.total_remaining_item= data.total_qty_ordered - data.total_qty_scanned
                this.last_item_scanned = data.last_item_scanned
                if(data.temporary_items.length === 0) {
                  return window.location.href = '/receive/transfer/dispatch'
                }
                this.loading_barcode = false //activate loading
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
                        p_transfer_no: this.p_transfer_no, 
                        p_id: id
                    }
                    let result = await axios.post(apiUrl('purchaser/receive_po/transfer/dispatch/delete_items'), data, tokenApi())
                    let res   = result.data
                    
                    await this.fetch_temporary_items_2(this.p_transfer_no)
                    msgSuccess(200, "Successfully deleted items")
                    if (res.count_items == 1) {
                        await this.refresh()
                    }
                }
            } catch (error) {
                this.handdleError(error)
            }
            
        },
        async fetch_dispatch_transfer_details(){
           this.loading_dispatch_details = true //activate loading
            try {
                let query   = {
                    params: {
                        p_transfer_no: this.p_transfer_no
                    },
                    headers: tokenApi('token', 'header')
                }
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer/dispatch/fetch_dispatch_transfer_details'), query)
                let data    = result.data
                this.p_requested_by   = data.transfer.requested_by
                this.p_delivery_date  = data.transfer.delivery_date
                this.p_date_created   = data.transfer.date_created
                this.p_br_code_out    = data.transfer.br_code_out
                this.p_br_code_in     = data.transfer.br_code_in
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_dispatch_details = false //deactivate loading
        },
        async post_receiving() {
            this.btn_post = true
            this.loading_post = true
            try {
                let data = {
                    p_checked_by: this.p_checked_by,
                    p_delivered_by: this.p_delivered_by,
                    p_transfer_no: this.p_transfer_no
                }
                
                await axios.post(apiUrl('purchaser/receive_po/transfer/dispatch/post_receiving'), data, tokenApi())
                this.$session.flash.set('p_message', 'OK')
                this.$router.push({ name: 'TransferDispatch' })
                await this.refresh()

            } catch (error) {
                this.handdleError(error)
            }
            this.btn_post = false
            this.loading_post = false
        },
        async refresh() {
            this.p_requested_by = ''
            this.p_delivery_date = ''
            this.p_date_created = ''
            this.p_br_code_out = ''
            this.p_br_code_in = ''
            this.p_qty = 1
            this.p_barcode = ''
            this.p_transfer_no = this.$route.query.transfer_id
            this.total_sku = 0
            this.total_qty_receive = 0
            this.total_qty_ordered = 0
            this.total_qty_scanned = 0
            this.total_sku_remaining = 0
            this.total_remaining_item = 0
            this.loading_po = false
            this.loading_barcode = false
            this.temporary_items = []
            this.loading_dispatch_details = false
            this.list_dispatch_transfer_details = []
            this.list_dispatch_transfer_details_temp = []
            this.dispatch_items = []
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
        async updateQty(item) {
          try {
            const res = await axios.post(apiUrl('purchaser/receive_po/transfer/dispatch/update_qty'), {
              ...item,
              transfer_id: this.p_transfer_no
            }, tokenApi())
          } catch (error) {
            this.handdleError(error)
          }
        }
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
