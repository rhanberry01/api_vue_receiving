<template>
    <div class="panel-body">
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">PENDING P.O REQUEST FOR POSTING</p>
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
                                <th>REMARKS</th>
                                <th>DATE </th>
                                <th>STATUS </th>
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
                            <tr v-show="!loading_pending" v-for="(row, i) in list_pending_po_request" :key="i">
                                <td >{{row.tcode}}</td>
                                <td >{{row.tremarks}} </td>
                                <td >{{row.date_ | date}} </td>
                                <td v-if="row.tapproved == 0"><label class="label label-danger">Pending</label></td>
                                <td v-if="row.tapproved == 1"><label class="label label-success">Approved</label></td>
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
import { msgError,  apiUrl, tokenApi, getSessionCurrentUrl } from './../../assets/custom/custom.js'

export default {
    data () {
        return {
            loading_pending: false,
            list_pending_po_request: []
        }
    },
    async mounted(){
        getSessionCurrentUrl(this, 'PendingPoRequest')
        await this.fetch_pending_po_request()
    },
    methods: {
        async fetch_pending_po_request() {
            this.loading_pending = true //activate loading
            try {
                let result  = await axios.get(apiUrl('purchaser/receive_po/fetch_pending_po_request'), tokenApi())
                let data    = result.data
                this.list_pending_po_request = data.pending_po_request
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_pending = false //deactivate loading
        },
        async view_po(po_no){
            this.$router.push({ name: 'ReceivePo', query: { po_no } })
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
