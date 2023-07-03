<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">EXPECTED DELIVERY</p>
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
                                    <button type="button" :disabled="btn_search" class="btn btn-sm btn-primary col-xs-12" v-on:click="fetch_survey_inquiry()">
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
                            <th>TRANSACTION ID</th>
                            <th>DETAILS</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="(row, i) in list_survey_inquiry" :key="i">
                                <td>{{ row.movementid }}</td>
                                <td>
                                    MOVEMENT #: {{ row.movementno }} <br>
                                    DATE POSTED #: {{ row.posteddate | date }} <br>
                                    DATE POSTED #: {{ row.posteddate | date }} <br>
                                    <a v-on:click="s">VIEW</a>
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
            btn_search: false,
            loading_search: false,
            list_survey_inquiry: []
            
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'PriceSurveyInquiry')
        await this.fetch_survey_inquiry()
    },
    methods:{
        async fetch_survey_inquiry(){
            this.btn_search     = true
            this.loading_search = true
            let from = this.p_date_from
            let to = this.p_date_to
            try {
                let query   = {
                    params: {
                        p_date_from: from,
                        p_date_to: to
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result  = await axios.get(apiUrl('purchaser/receive_po_survey/fetch_survey_inquiry/'), query)
                let data    = result.data
                this.list_survey_inquiry = data.list_survey_inquiry
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

