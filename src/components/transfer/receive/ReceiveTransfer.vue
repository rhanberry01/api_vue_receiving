<template>
    <div class="panel-body">
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">RECEIVE TRANSFER LIST</p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>

                <div class="table-responsive">
                    <div v-if="p_message != undefined ">
                        <div class="alert alert-success" style="border-radius:0px;"><h2>SUCCESSFULLY POSTED </h2></div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr v-show="loading_receive">
                                <th colspan="5"  style="text-align:center">
                                    <p>
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                </th>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <input type="text" class="form-control" v-model="p_transfer_no" v-on:keyup="fetch_receive_transfer()" placeholder="SEARCH #: 1235">
                                </td>
                            </tr>
                            <tr v-show="!loading_receive" v-for="(row, i) in list_receive_transfer" :key="i">
                                <th style="text-align:center">#: {{ row.id }} <br>
                                FROM: {{ row.branch_out }}<br>
                                DELIVERY DATE : {{ row.delivery_date | date }}<br>
                                OR | TERMINAL NO : {{ row.m_no_out }}<br>
                                <a v-on:click="view_receive(row.id)">VIEW</a><br>
                                <a v-on:click="receive_receive(row.id)">RECEIVE</a></th>
                            </tr>
                            <tr>
                                <td colspan="3" align="center">
                                        <paginate
                                        :page-count="page_count"
                                        :container-class="pagination"
                                        :prev-text="prev"
                                        :next-text="next"
                                        :click-handler="fetch_receive_transfer">
                                    </paginate>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { msgError, apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data () {
        return {
            p_message: this.$session.flash.get('p_message'),
            p_transfer_no: '',
            loading_receive: true,
            list_receive_transfer: [],
            page_count: 0,
            page: 0,
            pagination: 'pagination',
            prev: 'PREV',
            next: 'NEXT',
        }
    },
    async mounted(){
        await this.fetch_receive_transfer()
        getSessionCurrentUrl(this, 'TransferReceive')
    },
    methods: {
        async fetch_receive_transfer(page=1) {
            this.loading_receive = true //activate loading
            try {
                let query   = {
                    params: {
                        p_page: page,
                        p_transfer_no: this.p_transfer_no
                    },
                    headers: tokenApi('token', 'header')
                }
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer/receive/fetch_receive_transfer'), query)
                let data    = result.data
                this.list_receive_transfer = data.list_receive_transfers
                this.page_count           = data.page_count
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_receive = false //deactivate loading
        },
        async view_receive(transfer_id) {
            this.$router.push({ name: 'TransferReceiveView', query: { transfer_id } })
        },
        async receive_receive(transfer_id) {
            this.$router.push({ name: 'Receive', query: { transfer_id } })
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
input, textarea{
  border-radius: 0px !important;
   font-size: 10px !important;
   text-align:center;
   resize: none;
}
.btn {
    border-radius: 0px;
}
</style>
