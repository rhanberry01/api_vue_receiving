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
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">ITEM DETAILS</p>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr v-for="(row, i) in list_dispatch_transfer_details_temp" :key="i">
                                <th style="text-align:center;font-size:12px;">
                                    BARCODE #: {{ row.barcode }}<br>
                                       DESCRIPTION	: {{ row.description }} <br>
                                    UOM: {{ row.uom }} <br> 
                                    QTY:  {{ row.qty_out }} 
                                    
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    TOTAL QTY: {{ total_qty(list_dispatch_transfer_details_temp) }}
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <!-- End Main content -->

    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data(){
        return {
            p_requested_by: '',
            p_delivery_date: '',
            p_date_created: '',
            p_br_code_out: '',
            p_br_code_in: '',
            p_transfer_no: this.$route.query.transfer_id,
            loading_dispatch_details: false,
            list_dispatch_transfer_details: [],
            list_dispatch_transfer_details_temp: []
        }
    },
    async mounted(){
        await this.fetch_dispatch_transfer_details()
        await this.fetch_dispatch_transfer_details_temp()
        getSessionCurrentUrl(this, 'TransferDispatch')
    },
    methods:{
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
        async fetch_dispatch_transfer_details_temp(){
           this.loading_dispatch_details = true //activate loading
            try {
                let query   = {
                    params: {
                        p_transfer_no: this.p_transfer_no
                    },
                    headers: tokenApi('token', 'header')
                }
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer/dispatch/fetch_dispatch_transfer_details_temp'), query)
                let data    = result.data
                
                this.list_dispatch_transfer_details_temp = data.list_dispatch_transfer_details_temp
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_dispatch_details = false //deactivate loading
        },
        total_qty(values){
            return values.reduce((acc, val) =>{
                return acc + parseInt(val.qty_out)
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


