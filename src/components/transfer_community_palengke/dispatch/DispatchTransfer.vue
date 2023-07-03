<template>
    <div class="panel-body">
        <!-- Main content -->
        <div class="content-wrapper col-sm-12" >
            <div class="panel panel-flat">
                <div class="panel-heading">
                    <p class="panel-title">DISPATCH TRANSFER LIST</p>
                    <div class="heading-elements">
                        <ul class="icons-list">
                            <li><a data-action="collapse"></a></li>
                        </ul>
                    </div>
                </div>

                <div class="table-responsive">
                    <div v-if="p_message == 'OK'">
                        <div class="alert alert-success" style="border-radius:0px;"><h2>SUCCESSFULLY POSTED </h2></div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr v-show="loading_dispatch">
                                <th colspan="5"  style="text-align:center">
                                    <p>
                                        <i class="icon-spinner4 spinner position-left"></i> PLEASE WAIT ..
                                    </p>
                                </th>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    <input type="text" class="form-control" v-model="p_transfer_no" v-on:keyup="fetch_dispatch_transfer()" placeholder="SEARCH #: 1235">
                                </td>
                            </tr>
                            <tr v-show="!loading_dispatch" v-for="(row, i) in list_dispatch_transfer" :key="i">
                                <th style="text-align:center">#: {{ row.id }} <br>
                                TO: {{ row.name }}<br>
                                DELIVERY DATE {{ row.delivery_date | date }}<br>
                                <a v-on:click="view_dispatch(row.id)">VIEW</a><br>
                                <a v-on:click="receive_dispatch(row.id)">DISPATCH</a></th>
                            </tr>
                            <tr>
                                <td colspan="3" align="center">
                                        <paginate
                                        :page-count="page_count"
                                        :container-class="pagination"
                                        :prev-text="prev"
                                        :next-text="next"
                                        :click-handler="fetch_dispatch_transfer">
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
import { msgError,  apiUrl, tokenApi, getSessionCurrentUrl } from './../../../assets/custom/custom.js'

export default {
    data () {
        return {
            p_message: this.$session.flash.get('p_message'),
            p_transfer_no: '',
            loading_dispatch: true,
            list_dispatch_transfer: [],
            page_count: 0,
            page: 0,
            pagination: 'pagination',
            prev: 'PREV',
            next: 'NEXT',
        }
    },
    async mounted(){
        await this.fetch_dispatch_transfer()
        getSessionCurrentUrl(this, 'TransferCommunityPalengkeDispatch')
    },
    methods: {
        async fetch_dispatch_transfer(page=1) {
            this.loading_dispatch = true //activate loading
            try {
                let query   = {
                    params: {
                        p_page: page,
                        p_transfer_no: this.p_transfer_no
                    },
                    headers: tokenApi('token', 'header')
                }
                let result  = await axios.get(apiUrl('purchaser/receive_po/transfer-community-palengke/dispatch/fetch_dispatch_transfer'), query)
                let data    = result.data
                this.list_dispatch_transfer = data.list_dispatch_transfers
                this.page_count           = data.page_count
            } catch (error) {
                await this.handdleError(error)
            }
            this.loading_dispatch = false //deactivate loading
        },
        async view_dispatch(transfer_id) {
            this.$router.push({ name: 'TransferCommunityPalengkeDispatchView', query: { transfer_id } })
        },
        async receive_dispatch(transfer_id) {
            this.$router.push({ name: 'TransferCommunityPalengkeDispatchReceive', query: { transfer_id } })
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
