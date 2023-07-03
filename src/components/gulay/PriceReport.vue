<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <!-- <div class="panel-heading">
                    <p class="panel-title">UPDATE P.O</p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div> -->
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead >
                            <!-- <tr>
                                <th style="text-align:center;font-size:12px;">
                                    P.O #:
                                </th>
                                <th>
                                    <input type="text" class="form-control" v-model="p_po_no">
                                </th>
                            </tr> -->
                            <tr>
                                <th colspan="2">
                                    <div class="col-xs-4 col-md-4">
                                      <select class="form-control" v-model="v_code" v-on:change="fetch_gulay_list()">
                                        <option v-for="(row, i) in branches" :key="i" :value="row.code"> {{ row.name }} </option>
                                      </select>
                                    </div>
                                    <!-- <button type="button" :disabled="btn_search" style="border-radius:0px;" class="btn btn-sm btn-primary col-xs-4" v-on:click="fetch_gulay_list()">
                                        <div v-if="loading_search">
                                            <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                        </div>
                                        <div v-if="!loading_search">
                                            <i class="fa fa-cancel"></i> FRESH
                                        </div>
                                    </button> -->
                                    <button type="button" :disabled="btn_search" style="border-radius:0px;" class="btn btn-sm btn-warning col-xs-8" v-on:click="fetch_gulay_list('update_scale')">
                                        <div v-if="loading_search">
                                            <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                        </div>
                                        <div v-if="!loading_search">
                                            <!-- <i class="icon-search4"></i> -->
                                             UPDATE WEIGHING SCALE
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
                    <p class="panel-title">SRS GULAY PRICE REPORT</p>
                    <p class="panel-title" v-for="(ping, i) in is_connected" :key="i">
                      <label class="label label-danger" v-if="!ping.is_connected"> {{ (ping.w_s_type === 1) ? 'VEGE' : 'MEAT' }} STATUS OFFLINE</label>
                      <label class="label label-success" v-else> {{ (ping.w_s_type === 1) ? 'VEGE' : 'MEAT' }} STATUS ONLINE</label>
                    </p>
                    <p class="panel-title">DATE PRICE UPDATED <b> {{ dateNow }} </b></p>
                </div>

                <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Barcode</th>
                          <th>Description</th>
                          <th>SRP POS</th>
                          <th>SRP TIMBANGAN</th>
                          <th>DIF</th>
                        </tr>
                      </thead>
                        <tbody>
                            <tr v-for="(row, i) in gulayList" :key="i">
                                <td style="text-align:center;font-size:12px;">
                                   {{ row.barcode }}
                                </td>
                                <td style="text-align:center;font-size:12px;" v-html="row.description">
                                </td>
                                <td style="text-align:center;font-size:12px;">
                                   {{ row.pos_srp | toFixed2 }}
                                </td>
                                <td style="text-align:center;font-size:12px;">
                                   {{ row.srp | toFixed2 }}
                                </td>
                                <td style="text-align:center;font-size:12px;">
                                   <p class="text-danger">{{ getDif(row.srp, row.pos_srp) }}</p>
                                </td>
                            </tr>
                        </tbody>
                         <tfoot>
                          <tr>
                            <th>Barcode</th>
                            <th>Description</th>
                            <th>SRP POS</th>
                            <th>SRP TIMBANGAN</th>
                            <th>DIF</th>
                          </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <!-- End Main content -->

    </div>
</template>

<script>
import axios from 'axios';
import { msgError, msgSuccess, apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'
import moment from 'moment'
export default {
    data(){
        return {
            p_po_no: '',
            btn_search: false,
            btn_update: false,
            loading_update: false,
            loading_search: false,
            dateNow: moment().format('DD-MMM-YY hh:mm A').toUpperCase(),
            gulayList: [],
            branches: [],
            is_connected: [],
            v_code: 'srsn'
            
        }   
    },
    async mounted(){
      await this.fetch_gulay_list()
        getSessionCurrentUrl(this, 'PriceReport')
    },
    methods:{
        async fetch_gulay_list(update_scale=''){
            this.gulayList = []
            this.btn_search     = true
            this.loading_search = true
            try {
                let query   = {
                    params: {
                        update_scale,
                        v_code: this.v_code
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result  = await axios.get(apiUrl('purchaser/receive_po/timbangan/report'), query)
                let data    = result.data
                this.branches = data.branches
                this.gulayList = data.gulayList
                this.is_connected = data.is_connected
                this.dateNow = moment(data.dateModify).format('MM-DD-YYYY hh:mm A').toUpperCase()
                
            } catch (error) {
                await this.handdleError(error)
            }
            this.btn_search     = false
            this.loading_search = false
        },
        async update_po(trans_id, trans_type) {
            this.btn_update     = true
            this.loading_update = true
            try {
                let query   = {
                    params: {
                        p_trans_id: trans_id,
                        p_trans_type: trans_type
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result = await axios.get(apiUrl('purchaser/receive_po/po/update_po'), query)
                let data = result.data
                if(data.message != "" ){
                     msgError(401, data.message)
                } else {
                    msgSuccess(200, "Successfully updated items")
                }
            } catch (error) { 
                await this.handdleError(error)
            }
            this.btn_update     = false
            this.loading_update = false
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
        getDif(srp, srp1) {
          srp = parseFloat(srp)
          srp = srp.toFixed(2)
          srp1 = parseFloat(srp1)
          srp1 = srp1.toFixed(2)
          let total = srp - srp1
          if(total === 0) {
            return ''
          }
          return total.toFixed(2)
        }
    }
}

</script>


