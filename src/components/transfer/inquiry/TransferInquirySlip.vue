<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">VIEW / PRINT TRANSFER SLIP </p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <div v-if="p_message != undefined ">
                        <div class="alert alert-success" style="border-radius:0px;"><h2>SUCCESSFULLY CONFIRM ITEM RECEIVE </h2></div>
                    </div>
                    <table class="table table-bordered">
                        <thead >
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    TRANSFER #:
                                </th>
                                <th>
                                    <input type="text" class="form-control" v-model="p_transfer_no">
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    FROM
                                </th>
                                <th>
                                    <input type="date" class="form-control" v-model="p_date_from">
                                </th>
                            </tr>
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    TO
                                </th>
                                <th>
                                    <input type="date" class="form-control"  v-model="p_date_to">
                                </th>
                            </tr>
                            <tr>
                                <th colspan="2">
                                    <button type="button" :disabled="btn_search" class="btn btn-sm btn-primary col-xs-12" v-on:click="fetch_transfer_slip()">
                                        <div v-if="loading_search">
                                            <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                        </div>
                                        <div v-if="!loading_search">
                                            <i class="icon-search4"></i> SEARCH
                                        </div>
                                    </button>
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
                            <tr v-for="(row, i) in list_transfer_slip" :key="i">
                                <th style="text-align:center;font-size:12px;">
                                    DATE CREATED #: {{ row.date_created | date }}<br>
                                    TRANSFER #: {{ row.id }} <br>
                                    DATE OUT:  {{ row.transfer_out_date  | date }} <br>
                                    DATE IN:  {{ row.transfer_in_date  | date }} <br>
                                    FROM BRANCH:  {{ row.branch_from }} <br>
                                    TO BRANCH:  {{ row.branch_to }} <br>
                                    CHECKED BY: {{ row.checked_by }} <br>
                                    DELIVERED BY: {{ row.delivered_by }} <br>
                                    MEMO: {{ row.memo_ }} <br>
                                    <a v-on:click="view_transfer_slip_item(row.id)">VIEW</a></th>
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
import { msgError,  apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'
import moment from 'moment'

export default {
    data(){
        return {
            p_message: this.$session.flash.get('p_message'),
            p_date_from: moment().format('YYYY-MM-DD'),
            p_date_to: moment().format('YYYY-MM-DD'),
            p_transfer_no: '',
            btn_search: false,
            loading_search: false,
            list_transfer_slip: []
            
        }
    },
    async mounted(){
        await this.fetch_transfer_slip()
        getSessionCurrentUrl(this, 'TransferInquirySlip')
    },
    methods:{
        async fetch_transfer_slip(){
            this.btn_search     = true
            this.loading_search = true
            let from = this.p_date_from
            let to = this.p_date_to
            try {
                let query   = {
                    params: {
                        p_transfer_no: this.p_transfer_no,
                        p_date_from: from,
                        p_date_to: to
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer/inquiry/fetch_transfer_slip'), query)
                let data    = result.data

                this.list_transfer_slip = data.transfer_slip
                
            } catch (error) {
                await this.handdleError(error)
            }
            this.btn_search     = false
            this.loading_search = false
        },
        async view_transfer_slip_item(transfer_id) {
            try {
                this.$router.push({ name: 'TransferInquirySlipItem', query: { transfer_id } })
            } catch (error) {
                await this.handdleError(error)
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


