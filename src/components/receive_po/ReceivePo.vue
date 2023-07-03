<template>
    
   <div class="panel-body">
                <div v-if="receiving_no != '' ">
                    <div class="alert alert-success" style="border-radius:0px;"><h2>Receiving #  {{ receiving_no }} has been posted. Pakisulat sa Invoice. </h2></div>
                </div>
                <p class="text-center"> (RECEIVE P.O)</p>
                  <p class="text-center" v-if="showRequest">
                  PAKI PINDOT PO ITO ->  <router-link to="/receive/po/request"> REQUEST </router-link> MAG REQUEST SA PURCHASER NG P.O NA NEED MA POST NA MAY R.S
                </p>
                <table class="table table-bordered">
                    <thead>
                        <tr>

                            <input type="hidden" v-model="p_order_no">
                            <input type="hidden" v-model="p_temp_id">
                            <th>
                                <p v-show="loading_po" class="pull-left" >
                                    <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                </p>
                                <input type="text" id="p_po" class="col-sm-12 form-control input-sm" v-model="p_po" v-on:keyup.13="fetch_po" placeholder="P.O #">
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <!-- <label class="label label-danger col-sm-12" v-if="message_inv">{{ message_inv }} </label> -->
                                <input type="text" class="col-sm-6 col-xs-12 form-control  input-sm" v-model="p_inv_no" v-on:keyup="update_inv" placeholder="INVOICE #">
                            </th>
                        </tr>
                        <tr>
                            <th>{{ supplier_name }}</th>
                        </tr>
                        <tr>
                            <th>{{ date_now }}</th>
                        </tr>
                    </thead>
                </table>
           
            <br>

                <table class="table table-bordered"  v-if="supplier_name != ''">
                    <thead>
                        <tr>
                            <th width="50%;">ITEM NAME</th>
                            <th width="50%;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in temporary_items" :key="i">
                            <td> {{row.item_name }} <br>  
                            QTY -> {{row.qty }}<br>
                            UOM -> {{row.uom }}</td>
                            <td> 
                                <button class="btn btn-danger btn-sm" v-on:click="delete_items(row.temp_receiving_id, row.id)"><i class="icon-cancel-circle2"></i></button>
                            </td>
                        </tr>
                         <tr>
                            <td>
                                <p v-show="loading_barcode" class="pull-left" >
                                    <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                </p>
                                <button v-on:click="openscan()" v-show="deviceScan" class="btn btn-info btn-xs pull-left" style="border-radius:0px;">CLICK TO SCAN BARCODE</button>
                                <input class="form-control" placeholder="Enter Barcode" id="item_barcode" v-model="p_barcode" v-on:keyup.13="fetch_barcode">
                            </td>
                            <td><input  class="form-control"  v-model="p_qty"></td>
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
                            <td style="text-align:center !important" colspan="2">
                                <router-link to="/receive/po/pending" class="btn btn-primary col-sm-4 col-xs-12"> PENDING P.O </router-link>
                                <a href="/" class="btn btn-warning col-sm-4 col-xs-12"> PROCESS NEW P.O </a>
                                <router-link to="/receive/po/po_update" class="btn btn-info col-sm-4 col-xs-12"> UPDATE P.O </router-link>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="left">
                                <input type="checkbox"  class="control-primary"  name="v_show_cv" v-on:click="() => this.v_show_remarks = (this.v_show_remarks === true) ? false : true ">
                                On hold CV (Paki check kung invoice replacement)
                            </td>
                        <tr>
                        <tr v-show="v_show_remarks">
                            <td colspan="4">
                                <textarea name="" id="" class="form-control" placeholder="Remarks" v-model="p_remarks"></textarea>
                            </td>
                        <tr>
                            <td colspan="4">
                              <input class="form-control" multiple style="text-align:left;" id="file" ref="file"  v-on:change="handleFileUpload()" type="file" >
                              ( Maaring Mag upload ng Multipe Scan Invoice Kung ito ay IMAGE file ) <br>
                              ( Kung Ito naman ay pdf file isa lang ang maaring mong ma upload )
                            </td>
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
                <br>
                <table class="table table-bordered" v-if="supplier_name != ''">
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
                </table><br><br>
                <table class="table table-bordered" v-if="supplier_name != ''">
                    <thead>
                        <tr>
                            <th>ITEM NAME</th>
                            <th>QTY</th>
                            <th>UOM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in po_items" :key="i">
                            <td v-if="row.ord_qty != row.qty_scanned"> {{row.description }} </td>
                            <td v-if="row.ord_qty != row.qty_scanned"> {{row.ord_qty - row.qty_scanned }} </td>
                            <td v-if="row.ord_qty != row.qty_scanned"> {{row.unit_id }} </td>
                        </tr>
                    </tbody>
                </table>
    </div>


</template>

<script>
import axios from 'axios';
import { msgError, msgSuccess, apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'

export default {
    data(){
        return {
            showRequest: (window.showRequest == false) ? false : window.showRequest ,
            supplier_name: '',
            receiving_no: '',
            date_now: '',
            v_show_remarks: false,
            p_po: (this.$route.query.po_no == undefined) ? 'PO' : this.$route.query.po_no,
            p_remarks: '',
            p_barcode: '',
            p_qty: 1,
            p_inv_no: '',
            p_order_no: '',
            p_temp_id: '',
            file: '',
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
            message_inv: false,
            po_items: [],
            temporary_items: [],
            last_item_scanned: []
        }
    },
    async mounted(){
      await this.getPlatform()
      getSessionCurrentUrl(this, 'ReceivePo')
      if(this.$route.query.po_no != undefined) {
          await this.fetch_po()
      }
    },
    methods:{
        async openscan(){
            window.qsprint.openscan()
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
        async fetch_po() {
            this.loading_po = true //activate loading
            try {
                this.p_po = `PO`+this.p_po.replace(/[^\d]/g, '')
                this.p_po =  this.p_po.toUpperCase()
                let p_po    = this.p_po
                let result  = await axios.get(apiUrl('purchaser/receive_po/fetch_po?p_po='+p_po), tokenApi())
                let data    = result.data
                let temp_id = data.temp_id

                this.p_inv_no       = data.inv_no
                this.supplier_name  = data.supplier_name
                this.date_now       = data.to_date
                this.p_temp_id      = temp_id
                
                if(data.rs_message != '') {
                    PNotify.removeAll()
                    msgError('NOTIFY', data.rs_message)
                }
                await this.fetch_temporary_items(p_po, temp_id)
            } catch (error) {
                this.p_po = "PO"
                await this.handdleError(error)
                await this.refresh(true)
            }
            this.loading_po = false //deactivate loading
        },
        async update_inv(){
            this.loading_po = true //activate loading

            if(this.p_temp_id == '') {
               return msgError(401, "MAG SCAN MUNA NG ITEM")
            }

            if(this.p_po == '') {
               return msgError(401, "MAG SCAN MUNA NG P.O")
            }

            try {
                let params = {
                    p_inv_no: this.p_inv_no,
                    p_po: this.p_po,
                    p_temp_id: this.p_temp_id
                }
                let result = await axios.post(apiUrl('purchaser/receive_po/update_inv'), params , tokenApi())
                let data   = result.data
                if(data.status == 'isExist') {
                    this.btn_post = true
                    msgError(401, data.message.toUpperCase())
                } else {
                    PNotify.removeAll()
                    msgSuccess(200, 'Successfully updated invoice'.toUpperCase())
                    this.btn_post = false
                }
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_po = false //deactivate loading

        },
        async fetch_temporary_items(p_po, p_temp_id) {
            try {

                let result = await axios.get(apiUrl('purchaser/receive_po/fetch_temporary_items?p_po='+p_po+'&p_temp_id='+p_temp_id), tokenApi())
                let data   = result.data

                this.btn_post       = (data.temporary_items.length == 0) ? true : false

                this.p_order_no     = data.order_no
                this.po_items       = data.po_items
                this.temporary_items= data.temporary_items

                this.total_sku           = data.total_sku
                this.total_qty_receive   = data.total_qty_receive
                this.total_qty_ordered   = data.total_qty_ordered
                this.total_qty_scanned   = data.total_qty_scanned
                this.total_sku_remaining = data.po_items.length - data.total_all_sku
                this.total_remaining_item= data.total_qty_ordered - data.total_qty_scanned
                this.last_item_scanned = data.last_item_scanned
            } catch (error) {
                await this.handdleError(error)
            }
        },
        async fetch_barcode() {
            this.loading_barcode = true //activate loading
            try {
                let data  = {
                    p_barcode: $('#item_barcode').val(),
                    p_qty: this.p_qty,
                    p_po: this.p_po,
                    p_order_no: this.p_order_no,
                    p_temp_id: this.p_temp_id,
                    p_inv_no: this.p_inv_no
                }
       
                let result = await axios.post(apiUrl('purchaser/receive_po/fetch_barcode'), data , tokenApi())
                let res    = result.data
                
                this.p_temp_id = res.p_temp_id
                // this.temporary_items = res.temporary_items
                // this.loading_barcode = false
                await this.fetch_temporary_items(this.p_po, this.p_temp_id)
            } catch (error) {
                await this.handdleError(error)
            }
            this.p_barcode = ""
            this.p_qty = 1
            this.loading_barcode = false //deactivate loading
        },
        async delete_items(temp_receiving_id, id) {
            try {
                let confirm = window.confirm('Confirm delete');
                if(confirm) {
                    let data = {
                        p_temp_id: temp_receiving_id,
                        p_po: this.p_po, 
                        p_id: id
                    }
                    let result = await axios.post(apiUrl('purchaser/receive_po/delete_items'), data , tokenApi())
                    let res   = result.data
                    
                    await this.fetch_temporary_items(this.p_po, temp_receiving_id)
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
            try {
               if(this.v_show_remarks === true) {
                    return msgError(401, "Remarks is required")
                }

                let formData = new FormData()
                if (this.file == "") {
                    return msgError(401, "Invoice file is required")
                }

                this.btn_post = true
                this.loading_post = true
                for (let i = 0; i < this.file.length; i++) {
                    let file = this.file[i]
                    formData.append('file[' + i + ']', file);
                }
                formData.append('p_inv_no', this.p_inv_no)
                formData.append('p_po', this.p_po)
                formData.append('p_temp_id', this.p_temp_id)
                formData.append('p_remarks', this.p_remarks)
                
                let result = await axios.post(apiUrl('purchaser/receive_po/post_receiving'), formData, tokenApi())
                let res    = result.data

                this.$session.flash.set('receiving_no', res.receiving_no)
                this.receiving_no = this.$session.flash.get('receiving_no')
                this.$router.push({ name: 'ReceivePo' })
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
        async refresh(enable=false) {
            if(enable === false) {
              let input = this.$refs.file;
              input.type = 'text';
              input.type = 'file';
            }
            this.file          = ''
            this.supplier_name = ''
            this.date_now      = ''
            this.p_po          = ''
            this.p_remarks     = ''
            this.p_barcode     = ''
            this.p_qty         = 1
            this.p_inv_no      = ''
            this.p_order_no    = ''
            this.p_temp_id     = ''
            this.total_sku     = 0
            this.total_qty_receive    = 0
            this.total_qty_ordered    = 0
            this.total_qty_scanned    = 0
            this.total_sku_remaining  = 0
            this.total_remaining_item = 0
            this.loading_po      = false
            this.loading_barcode = false
            this.po_items        = []
            this.temporary_items = []
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
        }

    }
}

</script>


<style scoped>
input, textarea{
  border-radius: 0px !important;
   font-size: 10px !important;
   text-align:center;
   resize: none;
}
.btn {
    border-radius: 0px;
}
th,td {
  padding: 10px !important;
  font-size: 10px;
  text-align: center !important;
}
</style>

