<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">DAILY PURCHASE REGISTER FOR DELIVERIES </p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead >
                            <tr>
                                <th style="text-align:center;font-size:12px;">
                                    RR #:
                                </th>
                                <th>
                                    <input type="text" class="form-control" v-model="p_rr_no">
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
                                    <button type="button" :disabled="btn_search" class="btn btn-sm btn-primary col-xs-12" v-on:click="fetch_po_inquiry()">
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
                            <tr>
                            <th>SEQ</th>
                            <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, i) in list_po_inquiry" :key="i">
                                <td>{{ 1+i++ }}</td>
                                <td>
                                    SUPPLIER: {{ row.description }}<br>
                                    INVOICE #: {{ row.remarks }} <br>
                                    RR #: {{ row.receivingno }} <br>
                                    <label for="" class="label label-danger" v-if="!row.isFileExist">NO ATTACHMENT</label>
                                    <label class="label label-success" v-else>ATTACHMENT AVAILABLE</label>
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
import { msgError,  apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'
import moment from 'moment'

export default {
    data(){
        return {
            p_date_from: moment().format('YYYY-MM-DD'),
            p_date_to: moment().format('YYYY-MM-DD'),
            p_rr_no: '',
            btn_search: false,
            loading_search: false,
            list_po_inquiry: []
            
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'PoPurchaseInquiry')
        await this.fetch_po_inquiry()
    },
    methods:{
        async fetch_po_inquiry(){
            this.btn_search     = true
            this.loading_search = true
            let from = this.p_date_from
            let to = this.p_date_to
            try {
                let query   = {
                    params: {
                        p_rr_no: this.p_rr_no,
                        p_date_from: from,
                        p_date_to: to
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result  = await axios.get(apiUrl('purchaser/receive_po/fetch_po_inquiry/'), query)
                let data    = result.data
                this.list_po_inquiry = data.list_po_inquiry
            } catch (error) {
                await this.handdleError(error)
            }
            this.btn_search     = false
            this.loading_search = false
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


