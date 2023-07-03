<template>
    <div class="panel-body">
       
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">UPDATE P.O</p>
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
                                    P.O #:
                                </th>
                                <th>
                                    <input type="text" class="form-control" v-model="p_po_no">
                                </th>
                            </tr>
                            <tr>
                                <th colspan="2">
                                    <button type="button" :disabled="btn_search" class="btn btn-sm btn-primary col-xs-12" v-on:click="fetch_po_list()">
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
                            <tr v-for="(row, i) in list_po" :key="i">
                                <th style="text-align:center;font-size:12px;">
                                    P.O #: {{ row.reference }}
                                </th>
                                <th>
                                <button type="button" :disabled="btn_update" class="btn btn-sm btn-primary col-xs-12" v-on:click="update_po(row.trans_id, row.trans_type)">
                                    <div v-if="loading_update">
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </div>
                                    <div v-if="!loading_update">
                                        <i class="icon-search4"></i> UPDATE
                                    </div>
                                </button>
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
import { msgError, msgSuccess, apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'

export default {
    data(){
        return {
            p_po_no: '',
            btn_search: false,
            btn_update: false,
            loading_update: false,
            loading_search: false,
            list_po: []
            
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'PoUpdate')
    },
    methods:{
        async fetch_po_list(){
            this.btn_search     = true
            this.loading_search = true
            try {
                let query   = {
                    params: {
                        p_po_no: this.p_po_no
                    },
                    headers: tokenApi('token', 'header')
                }
                
                let result  = await axios.get(apiUrl('purchaser/receive_po/po/fetch_po_list'), query)
                let data    = result.data

                this.list_po = data.list_po
                
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
        }
    }
}

</script>


