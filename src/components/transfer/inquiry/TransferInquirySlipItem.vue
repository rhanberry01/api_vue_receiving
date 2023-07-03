<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p><a style="border-radius:0px;">&nbsp;&nbsp;<i class="icon icon-undo"></i><router-link to="/receive/transfer/inquiry/slip"> CLICK ME TO BACK</router-link> </a>
                    </p>
                    <p class="panel-title">TRANSFER SLIP {{ p_transfer_no }} </p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead >
                            <tr v-show="loading_transfer_slip">
                                <th colspan="2"  style="text-align:center">
                                    <p>
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                </th>
                            </tr>
                            <tr>
                                <th>DATE CREATED: </th>
                                <th> {{ date_created | date }} </th>
                            </tr>
                            <tr>
                                <th>TRANSFER OUT DATE:</th>
                                <th>{{ date_transfer | date }} </th>
                            </tr>
                            <tr>
                                <th>FROM </th>
                                <th>{{ branch_from | uppercase }}</th>
                            </tr>
                            <tr>
                                <th>TO </th>
                                <th>{{ branch_to | uppercase}} </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">ITEM DETAILS</p>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                              <th>PRODUCT</th>
                              <th>UOM</th>
                              <th>QTY</th>
                              <th>Confirm Receive ( Please mark check if the item is receive from the branch )</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in list_transfer_slip_item" :key="i">
                                <td>{{ row.description }}</td>
                                <td>{{ row.uom }}</td>
                                <td>{{ row.actual_qty_out }}</td>
                                <td  v-if="row.confirm_name === '' ">
                                  <input type="checkbox"  class="control-primary"  name="v_confirm" v-model="v_confirm" :value="row.id">
                                </td>
                                <td v-else>
                                  <span> {{ row.confirm_name }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="right"> TOTAL </td>
                                <td >
                                    {{ total_qty(list_transfer_slip_item) }} 
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colspan="1" align="right">  </td>
                                <td >
                                    <b> (PINDUTIN KUNG ANG GAMIT NA UNIT AY COMPUTER) </b>
                                    <button type="button" class="btn btn-primary col-sm-12" v-on:click="print_pc()">PRINT FROM PC</button>
                                </td>
                                <td >
                                      (PINDUTIN KUNG ANG GAMIT NA UNIT AY DEVICE OR DATA COLLECTOR)
                                    <button type="button" class="btn btn-primary col-sm-12" v-on:click="print()">PRINT FROM DEVICE</button>
                                </td>
                                <td >
                                      (CONFIRM ITEM RECEIVE)
                                    <button type="button" class="btn btn-primary col-sm-12" v-on:click="confirmItem()">CONFIRM ITEM RECEIVE</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- End Main content -->

    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { msgError, apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data(){
        return {
           p_transfer_no: this.$route.query.transfer_id,
           date_created: '',
           date_transfer: '',
           branch_from: '',
           branch_to: '',
           loading_transfer_slip: false,
           list_transfer_slip_item: [],
           requested_by: '',
           v_confirm: []
        }
    },
    async mounted(){
       await this.fetch_transfer_slip_item()
       getSessionCurrentUrl(this, 'TransferInquirySlip')
    },
    methods:{
        async confirmItem() {
          let data = {
            v_confirm: this.v_confirm
          }
          if(this.v_confirm.length !== this.list_transfer_slip_item.length) {
            return msgError(401, "NOTE !! BAGO PINDUTIN ANG CONFIRM RECEIVE ITEM AY DAPAT NAKA CHECK ANG LAHAT NG SKU AT SIGURADUHIN NA ANG LALAGYAN NG MARK AY TUGMA SA ACTUAL ITEM")
          }
          await axios.post(apiUrl('purchaser/receive_po/transfer/inquiry/fetch_transfer_slip_item/confirm'), data, tokenApi())
          this.$session.flash.set('p_message', 'OK')
          this.$router.push({ name: 'TransferInquirySlip' })
        },
        async print(){
            let trans_no      = this.p_transfer_no
            let list_items    = this.list_transfer_slip_item
            let requested_by  = this.requested_by.toUpperCase()
            let datecreated   = moment(this.date_created).format('MM/DD/YYYY')
            let transferoutdate = moment(this.date_transfer).format('MM/DD/YYYY')
            let strtbl = ""
            let strspc = ""
            //let strnl = ""
            let strbr = "---------------------------------------------------\n"
            let strbr2 = "- - - - - - - - - - - - - - - - - - - - - - - - - -\n"
            //console.log(po_items)
            let str = "San Roque Supermarket\nRetail Systems Inc. \nREG.TIN# 007-492-840-003 \n" +
                     "\n-ORIGINAL COPY- \nTransfer Slip \nTransfer #: "+trans_no+" \n\nDate Created: "+datecreated+" \nTransfer Out Date: " +transferoutdate +"\n"
            let str2 = "From: "+this.branch_from+"\nTo: "+this.branch_to+"\n\n"
            strtbl += "Product                                           UOM   Qty\n"
            for(const row_1 of list_items){
                let desc = row_1.description.replace(/\s+/g, '')
                //let desc = row_1.description
                let lngth = desc.length
                if(lngth < 20)
                {
                    let spc = 20 - lngth
                    for (let i = 0; i < spc; i++) {
                        strspc += " "
                    }
                    desc += strspc
                    //strnl = ""
                }
                else{
                    //strnl = desc.substr(18, 30) + "\n"
                }
                let strdesc = desc.substr(0, 18);
                strtbl += strdesc + "  " +row_1.uom +"    "+row_1.actual_qty_out+"\n"
                //+"\n"+strnl
            }
            let str3 = "                        TOTAL QTY:   "+this.total_qty(this.list_transfer_slip_item)+"\n"
            let str4 = "Prepared by: "+requested_by+" \n Witnessed By:__________________ \n Delivered By:___________________ \n Received By:____________________ \n"
            
            let strdup = "San Roque Supermarket\nRetail Systems Inc. \nREG.TIN# 007-492-840-003 \n" +
                     "\n-DUPLICATE COPY- \nTransfer Slip \nTransfer #: "+trans_no+" \n\nDate Created: "+datecreated+" \nTransfer Out Date: " +transferoutdate +"\n"
           window.qsprint.print2(str, strbr, str2, strtbl, str3, str4, strbr2, strdup)
           //window.qsprint.print2(supplier_name);
        },
        async print_pc() {
            window.open(apiUrl('purchaser/receive_po/transfer/inquiry/print_slip?trans_no='+this.p_transfer_no), "sss", "width=330,height=600");
        },
        async fetch_transfer_slip_item(){
           this.loading_transfer_slip = true
           try {
               let query   = {
                    params: {
                        p_transfer_no: this.p_transfer_no
                    },
                    headers: tokenApi('token', 'header')
                }
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer/inquiry/fetch_transfer_slip_item'), query)
                let data    = result.data
                
                let transfer_slip_header     = data.transfer_slip_header
                this.list_transfer_slip_item = data.transfer_slip_item
                this.date_created            = transfer_slip_header.date_created
                this.date_transfer           = transfer_slip_header.transfer_out_date
                this.branch_from             = transfer_slip_header.branch_from
                this.branch_to               = transfer_slip_header.branch_to
                this.requested_by            = transfer_slip_header.requested_by
           } catch (error) {
               await this.handdleError(error)
           }
           this.loading_transfer_slip = false
        },
        total_qty(values){
            return values.reduce((acc, val) =>{
                return acc + parseFloat(val.actual_qty_out)
            }, 0)
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


<style scoped>
.btn, input {
    border-radius: 0px;
}
</style>
