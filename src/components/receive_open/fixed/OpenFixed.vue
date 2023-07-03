<template>
    
   <div class="panel-body">
    <!-- Main content -->
    <div class="content-wrapper  col-sm-12">
        <div class="panel panel-flat">
            <div class="table-responsive">
                <div v-if="receiving_no != '' ">
                    <div class="alert alert-success" style="border-radius:0px;"><h2>Receiving #  {{ receiving_no }} has been posted. Pakisulat sa Invoice. </h2></div>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>INVOICE #:</th>
                            <th>
                                <input type="hidden" id="p_temp_id" class="col-sm-12 form-control input-sm" v-model="p_temp_id">
                                <input type="text" id="p_invoice_no" class="col-sm-12 form-control input-sm" v-model="p_invoice_no">
                            </th>
                        </tr>
                        <tr>
                            <th>SUPPLIER :</th>
                            <th>
                                <select v-model="p_supplier" id="p_supplier" class="col-sm-12 form-control input-sm">
                                    <option value=""> -- SELECT --</option>
                                    <option v-bind:value="row.vendor_code" v-for="(row, i) in list_supplier_open" :key="i"> {{ row.description }}</option>
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <th>DATE RECEIVE : </th>
                            <th>
                                <input type="date" id="p_date" class="col-sm-12 form-control input-sm" v-model="p_date">
                            </th>
                        </tr>
                        <tr>
                            <th> </th>
                            <th>
                                <button type="button" class="col-sm-6 col-xs-12 btn btn-primary" v-on:click="approve()">APPROVE</button>
                                <button type="button" class="col-sm-6 col-xs-12 btn btn-danger" :disabled="!btn_cancel" v-on:click="cancel(p_temp_id, p_supplier)">CANCEL</button>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <!-- Main content -->
    <div class="content-wrapper  col-sm-12" v-show="temporary_show">
        <div class="panel panel-flat">
            <div class="panel-heading">
                <p class="panel-title">ITEM SCANNED</p>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ITEM NAME</th>
                            <th>DETAILS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in list_temporary_items" :key="i">
                            <td> {{row.item_name }} </td>
                            <td> 
                                QTY: {{row.qty }} <br>
                                UOM: {{row.uom }} <br>
                                UNIT COST: {{row.price | toFixed2 }} <br>
                                TOTAL: {{row.net_price | toFixed2}} <br>
                            </td>
                            <td> 
                                <button class="btn btn-danger btn-sm" v-on:click="delete_items(row.temp_open_po_id, row.d_id)"><i class="icon-cancel-circle2"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                TOTAL: {{ totalCost(list_temporary_items) | toFixed2 }}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <p v-show="loading_barcode" class="pull-left" >
                                    <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                </p>
                                <input type="hidden" class="form-control" v-model="p_pos_barcode" v-on:keyup.13="fetch_barcode">
                                <input type="hidden" class="form-control" v-model="p_pos_markup" v-on:keyup.13="fetch_barcode">
                                <input type="hidden" class="form-control" v-model="p_pos_product_id" v-on:keyup.13="fetch_barcode">
                                <input class="form-control" placeholder="Enter Barcode" v-model="p_barcode" v-on:keyup.13="fetch_barcode">
                                <select v-model="p_uom" id="p_uom" class="col-sm-12 form-control input-sm">
                                    <option value=""> -- UOM -- </option>
                                    <option v-bind:value="row.a1" v-for="(row, i) in list_uoms" :key="i"> {{ row.a1 }}</option>
                                </select>
                            </td>
                            <td>
                                <input class="form-control" style="text-align:left;"  v-model="p_qty" placeholder="QTY">
                                <input class="form-control" style="text-align:left;" :disabled="true" v-model="p_unit_cost" placeholder="UNIT COST">
                            </td>
                            <td>
                                <button class="btn btn-primary" v-on:click="add_item()"><i class="icon-plus3"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center !important">SKU SCANNED: {{ total_sku }}</td>
                            <td style="text-align:center !important">TOTAL SCAN QTY:   {{ totalSkuScan(list_temporary_items) }}</td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <textarea name="" id="" class="form-control" placeholder="Remarks" v-model="p_remarks"></textarea>
                            </td>
                        <tr>
                            <td colspan="3">
                              <input class="form-control" style="text-align:left;" id="file" ref="file"  v-on:change="handleFileUpload()" type="file" >
                              ( Maaring Mag upload ng Multipe Scan Invoice Kung ito ay IMAGE file ) <br>
                              ( Kung Ito naman ay pdf file isa lang ang maaring mong ma upload )
                            </td>
                        <tr>
                        <tr>
                            <td colspan="3">
                                
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

        
    </div>


</template>

<script>
import axios from 'axios';
import { msgError, msgSuccess, apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'
import moment from 'moment'

export default {
    data(){
        return {
            total_sku: 0,
            p_invoice_no: '',
            receiving_no: '',
            p_date: moment().format('YYYY-MM-DD'),
            p_supplier: '',
            p_barcode: '',
            p_uom: '',
            file: '',
            p_temp_id: '',
            p_pos_markup: '',
            p_qty: 1,
            p_pos_barcode: '',
            p_remarks: '',
            p_pos_product_id: '',
            p_unit_cost:'',
            temporary_show: false,
            loading_post: false,
            loading_barcode: false,
            btn_cancel: false,
            btn_post: true,
            list_supplier_open: [],
            list_temporary_items: [],
            list_uoms:[]
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'OpenPoFixed')
        await this.fetch_supplier_open()
        await this.fetch_list_uom()
    },
    methods:{
        async fetch_supplier_open() {
           let query = {
               headers: tokenApi('token', 'header')
           }
           try {
               let result = await axios.get(apiUrl('purchaser/receive_po/op/fixed/fetch_supplier_open'), query)
               let data   = result.data
               this.list_supplier_open = data.list_supplier_open
           } catch (error) {
               await this.handdleError(error)
           }
        },
        async fetch_barcode(){
            let query = {
               params: {
                    p_barcode: this.p_barcode,
                    p_vendor_code: this.p_supplier
               },
               headers: tokenApi('token', 'header')
           }
           try {
               let result = await axios.get(apiUrl('purchaser/receive_po/op/fixed/fetch_barcode'), query)
               let data   = result.data
               
               this.p_barcode = data.vendor_product.description
               if (this.p_uom == "") {
                   this.p_uom = data.pos_product[0].uom
               }
               if (this.p_unit_cost == "") {
                   this.p_unit_cost = data.vendor_product.cost.toFixed(3)
               }
               this.p_pos_barcode    = data.pos_product[0].barcode
               this.p_pos_product_id = data.vendor_product.productid
               this.p_pos_markup     = data.pos_product[0].markup

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
                        p_invoice_no: this.p_invoice_no, 
                        p_supplier: this.p_supplier,
                        p_id: id
                    }
                    let result = await axios.post(apiUrl('purchaser/receive_po/op/fixed/delete_items'), data , tokenApi())
                    let res    = result.data
                    let query = {
                        p_invoice_no: this.p_invoice_no,
                        p_supplier: this.p_supplier
                    }

                    await this.fetch_temporary_item(query)
                    msgSuccess(200, "Successfully deleted items")
                    if (res.count_items == 1) {
                        window.location.href = '/receive/op/fixed'
                    }
                }
            } catch (error) {
                await this.handdleError(error)
            }
        },
        async add_item(){
            try {
                let data = {
                    p_vendor_code  : this.p_supplier,
                    p_invoice_no   : this.p_invoice_no,
                    p_date_deliver : this.p_date,

                    p_product_id : this.p_pos_product_id,
                    p_barcode: this.p_pos_barcode,
                    p_item_name: this.p_barcode,
                    p_uom: this.p_uom,
                    p_qty: this.p_qty,
                    p_price: this.p_unit_cost,
                    p_markup: this.p_pos_markup
                }

                await axios.post(apiUrl('purchaser/receive_po/op/fixed/add_item'), data , tokenApi())
                let query = {
                    p_invoice_no: this.p_invoice_no,
                    p_supplier: this.p_supplier
                }

                await this.fetch_temporary_item(query)
            } catch (error) {
                await this.handdleError(error)
            }
        },
        async approve(){
            let invoice_no = this.p_invoice_no
            let supplier   = this.p_supplier
            let date       = this.p_date

            if (invoice_no == "") {
                return msgError(401, 'INVOICE NUMBER IS REQUIRED')
            }

            if (supplier == "") {
                return msgError(401, 'SUPPLIER IS REQUIRED')
            }

            if (date == "") {
                return msgError(401, 'DATE IS REQUIRED')
            }
            let query = {
                p_invoice_no: invoice_no,
                p_supplier: supplier
            }
            
            await this.fetch_temporary_item(query, 'check_supplier')
            this.temporary_show  = true
        },
        async fetch_list_uom(){
            try {
                let query = {
                    headers: tokenApi('token', 'header')
                }
                let result = await axios.get(apiUrl('purchaser/receive_po/op/fixed/fetch_list_uom'), query)
                let data   = result.data
                this.list_uoms = data.list_uoms
            } catch (error) {
                console.log(error)
                await this.handdleError(error)
            }
        },
        async refresh(){
            this.file =  ''
            this.p_invoice_no =  ''
            this.p_date =  moment().format('YYYY-MM-DD')
            this.p_supplier =  ''
            this.p_barcode =  ''
            this.p_uom =  ''
            this.p_temp_id =  ''
            this.p_pos_markup =  ''
            this.p_qty =  1
            this.p_pos_barcode =  ''
            this.p_remarks =  ''
            this.p_pos_product_id =  ''
            this.p_unit_cost = ''
            this.temporary_show =  false
            this.loading_post =  false
            this.loading_barcode =  false
            this.btn_cancel =  false
            this.btn_post =  true
            this.list_temporary_items =  []
        },
        async cancel(temp_receiving_id, p_supplier) {
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                html: false
            }, async function(){
                 let data = {
                    p_temp_id: temp_receiving_id,
                    p_supplier: p_supplier,
                    p_id: null,
                    p_type: 'cancel'
                }
                await axios.post(apiUrl('purchaser/receive_po/op/fixed/delete_items'), data , tokenApi())
                window.location.href = '/receive/op/fixed'
            })
        },
        async post_receiving() {
            try {
                let formData = new FormData()
                if (this.file == "") {
                    return msgError(401, "Invoice file is required")
                }

                if (this.p_temp_id == "") {
                    return msgError(401, "NO TEMPORARY ID")
                }

                this.btn_post = true
                this.loading_post = true

                formData.append('file', this.file)
                formData.append('p_inv_no', this.p_invoice_no)
                formData.append('p_vendor_code', this.p_supplier)
                formData.append('p_remarks', this.p_remarks)
                formData.append('p_temp_id', this.p_temp_id)
                
                let result = await axios.post(apiUrl('purchaser/receive_po/op/fixed/post_receiving'), formData, tokenApi())
                let res    = result.data

                this.$session.flash.set('receiving_no', res.receiving_no)
                this.receiving_no = this.$session.flash.get('receiving_no')
                this.$router.push({ name: 'OpenPoFixed' })
                await this.refresh()
            } catch (error) {
                this.handdleError(error)
            }
            this.btn_post = false
            this.loading_post = false
        },
        async fetch_temporary_item(params, check_supplier=""){
          try {
              this.btn_cancel = false
              let query = {
                  headers : tokenApi('token', 'header'),
                  params : params
              }
              let result = await axios.get(apiUrl('purchaser/receive_po/op/fixed/fetch_temporary_item'), query)
              let data   = result.data
              if (data.list_temporary_items.length > 0) {
                    this.btn_cancel = true
                    this.btn_post   = false
              }
              this.p_temp_id            = data.temp_id
              this.list_temporary_items = data.list_temporary_items
               this.total_sku = data.list_temporary_items.length
              this.temporary_show  = true
          } catch (error) {
              if (check_supplier == "check_supplier") {
                    this.temporary_show = false
              }
              await this.handdleError(error)
          }  
            this.p_barcode = ''
            this.p_uom = ''
            this.p_pos_markup = ''
            this.p_qty = 1
            this.p_pos_barcode = ''
            this.p_pos_product_id = ''
            this.p_unit_cost =''
        },
        async handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        
        totalCost(values){
            return values.reduce((acc, val) =>{
                return acc + parseFloat(val.net_price)
            }, 0)
        },
        totalSkuScan(values){
            return values.reduce((acc, val) =>{
                return acc + parseFloat(val.qty)
            }, 0)
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
input, textarea, select, option{
  border-radius: 0px !important;
   font-size: 10px !important;
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

