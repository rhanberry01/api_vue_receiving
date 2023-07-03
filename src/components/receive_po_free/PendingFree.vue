<template>
    <div class="panel-body">
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">PENDING FREE GOODS</p>
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
                                <th>P.O #</th>
                                <th>INVOICE #</th>
                                <th>DATE </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-show="loading_pending" >
                                <td colspan="3"  style="text-align:center">
                                    <p>
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                </td>
                            </tr>
                            <tr v-show="!loading_pending" v-for="(row, i) in list_pending_po" :key="i">
                                <td >
                                <button  v-on:click="view_po(row.po_no)" class="btn btn-sm btn-primary" style="border-radius:0px;">{{ row.po_no }}</button>
                                </td>
                                <td >{{row.inv_no}} </td>
                                <td >{{row.date_ | date}} </td>
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
import { msgError,  apiUrl, tokenApi } from './../../assets/custom/custom.js'

export default {
    data () {
        return {
            loading_pending: false,
            list_pending_po: []
        }
    },
    async mounted(){
        await this.fetch_pending_po()
    },
    methods: {
        async fetch_pending_po() {
            this.loading_pending = true //activate loading
            try {
                let result  = await axios.get(apiUrl('purchaser/receive_po_free/fetch_pending_free'),tokenApi)
                let data    = result.data
                this.list_pending_po = data.pending_po
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_pending = false //deactivate loading
        },
        async view_po(po_no){
            this.$router.push({ name: 'ReceivePoFree', query: { po_no } })
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
