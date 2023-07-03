import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import ReceivePo from './components/receive_po/ReceivePo.vue'
import RequestPo from './components/receive_po/RequestPo.vue'
import PendingPoRequest from './components/receive_po/PendingPoRequest.vue'
import PoPurchaseInquiry from './components/receive_po/PoPurchaseInquiry.vue'
import ExpectedDelivery from './components/receive_po/ExpectedDelivery.vue'

import ReceivePoSurvey from './components/receive_po_survey/ReceivePoSurvey.vue'
import PriceSurveyInquiry from './components/receive_po_survey/PriceSurveyInquiry.vue'
import ReceivePoFree from './components/receive_po_free/ReceivePoFree.vue'

import PendingPo from './components/receive_po/PendingPo.vue'
import PendingSurvey from './components/receive_po_survey/PendingSurvey.vue'
import PendingFree from './components/receive_po_free/PendingFree.vue'

import TransferDispatch from './components/transfer/dispatch/DispatchTransfer.vue'
import TransferDispatchView from './components/transfer/dispatch/DispatchTransferView.vue'
import TransferDispatchReceive from './components/transfer/dispatch/DispatchReceive.vue'
import TransferDispatchAutoSave from './components/transfer/dispatch_auto_save/DispatchAutoSave.vue'


import Receive from './components/transfer/receive/Receive.vue'
import TransferReceiveView from './components/transfer/receive/ReceiveTransferView.vue'
import TransferReceive from './components/transfer/receive/ReceiveTransfer.vue'

import TransferInquirySlip from './components/transfer/inquiry/TransferInquirySlip.vue'
import TransferInquirySlipItem from './components/transfer/inquiry/TransferInquirySlipItem.vue'

import TransferCommunityPalengkeReceive from './components/transfer_community_palengke/receive/ReceiveTransfer.vue'
import TransferCommunityPalengkeReceiveView from './components/transfer_community_palengke/receive/ReceiveTransferView.vue'
import TransferCommunityPalengkeReceiveReceive from './components/transfer_community_palengke/receive/Receive.vue'

import TransferCommunityPalengkeDispatch from './components/transfer_community_palengke/dispatch/DispatchTransfer.vue'
import TransferCommunityPalengkeDispatchView from './components/transfer_community_palengke/dispatch/DispatchTransferView.vue'
import TransferCommunityPalengkeDispatchReceive from './components/transfer_community_palengke/dispatch/DispatchReceive.vue'

import TransferCommunityPalengkeReturn from './components/transfer_community_palengke/return/DispatchTransfer.vue'
import TransferCommunityPalengkeReturnView from './components/transfer_community_palengke/return/DispatchTransferView.vue'
import TransferCommunityPalengkeReturnReceive from './components/transfer_community_palengke/return/DispatchReceive.vue'

import TransferCommunityPalengkeMakeRequest from './components/transfer_community_palengke/make_request/MakeRequestTransfer.vue'

import TransferCommunityPalengkeInquirySlip from './components/transfer_community_palengke/inquiry/TransferInquirySlip.vue'
import TransferCommunityPalengkeInquirySlipItem from './components/transfer_community_palengke/inquiry/TransferInquirySlipItem.vue'
import TransferCommunityPalengkeInquiryReturn from './components/transfer_community_palengke/return_inquiry/TransferInquirySlip.vue'
import TransferCommunityPalengkeInquiryReturnItem from './components/transfer_community_palengke/return_inquiry/TransferInquirySlipItem.vue'

import OpenPoVariable from './components/receive_open/variable/OpenVariable.vue'
import OpenPoFixed from './components/receive_open/fixed/OpenFixed.vue'
import OpenPoMeat from './components/receive_open/meat/OpenMeat.vue'
import OpenPoInquiry from './components/receive_open/OpenPoInquiry.vue'
import PriceChangeInquiry from './components/receive_open/PriceChangeInquiry.vue'

import PoUpdate from './components/po/PoUpdate.vue'
import UploadInvoice from './components/po/UploadInvoice.vue'
import PriceReport from './components/gulay/PriceReport.vue'

import Help from './components/Help.vue'


Vue.use(Router)
export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/receive/po',
            name: 'ReceivePo',
            component: ReceivePo
        },
        {
            path: '/receive/po/request',
            name: 'RequestPo',
            component: RequestPo
        },
        {
            path: '/receive/po/request/pending',
            name: 'PendingPoRequest',
            component: PendingPoRequest
        },
        {
            path: '/receive/survey',
            name: 'ReceivePoSurvey',
            component: ReceivePoSurvey
        },
        {
            path: '/receive/free',
            name: 'ReceivePoFree',
            component: ReceivePoFree
        },
        {
            path: '/receive/po/pending',
            name: 'PendingPo',
            component: PendingPo
        },
        {
            path: '/receive/survey/pending',
            name: 'PendingSurvey',
            component: PendingSurvey
        },
        {
            path: '/receive/survey/price_survey_inquiry',
            name: 'PriceSurveyInquiry',
            component: PriceSurveyInquiry
        },
        {
            path: '/receive/free/pending',
            name: 'PendingFree',
            component: PendingFree
        },
        {
            path: '/receive/transfer/dispatch',
            name: 'TransferDispatch',
            component: TransferDispatch
        },
        {
            path: '/receive/transfer/dispatch/view',
            name: 'TransferDispatchView',
            component: TransferDispatchView
        },
        {
            path: '/receive/transfer/dispatch/receive',
            name: 'TransferDispatchReceive',
            component: TransferDispatchReceive
        },
        {
            path: '/receive/transfer/dispatch/receive_auto',
            name: 'TransferDispatchAutoSave',
            component: TransferDispatchAutoSave
        },
        {
            path: '/receive/transfer/receive',
            name: 'TransferReceive',
            component: TransferReceive
        },
        {
            path: '/receive/transfer/receive/view',
            name: 'TransferReceiveView',
            component: TransferReceiveView
        },
        {
            path: '/receive/transfer/receive/receive',
            name: 'Receive',
            component: Receive
        },
        {
            path: '/receive/transfer/inquiry/slip',
            name: 'TransferInquirySlip',
            component: TransferInquirySlip
        },
        {
            path: '/receive/transfer/inquiry/slip/view',
            name: 'TransferInquirySlipItem',
            component: TransferInquirySlipItem
        },
        {
            path: '/receive/transfer-community-palengke/dispatch',
            name: 'TransferCommunityPalengkeDispatch',
            component: TransferCommunityPalengkeDispatch
        },
        {
          path: '/receive/transfer-community-palengke/dispatch/view',
          name: 'TransferCommunityPalengkeDispatchView',
          component: TransferCommunityPalengkeDispatchView
        },
        {
          path: '/receive/transfer-community-palengke/dispatch/receive',
          name: 'TransferCommunityPalengkeDispatchReceive',
          component: TransferCommunityPalengkeDispatchReceive
        },
        {
            path: '/receive/transfer-community-palengke/receive',
            name: 'TransferCommunityPalengkeReceive',
            component: TransferCommunityPalengkeReceive
        },
        {
          path: '/receive/transfer-community-palengke/receive/view',
          name: 'TransferCommunityPalengkeReceiveView',
          component: TransferCommunityPalengkeReceiveView
        },
        {
          path: '/receive/transfer-community-palengke/receive/receive',
          name: 'TransferCommunityPalengkeReceiveReceive',
          component: TransferCommunityPalengkeReceiveReceive
        },
        {
            path: '/receive/transfer-community-palengke/return',
            name: 'TransferCommunityPalengkeReturn',
            component: TransferCommunityPalengkeReturn
        },
        {
          path: '/receive/transfer-community-palengke/return/view',
          name: 'TransferCommunityPalengkeReturnView',
          component: TransferCommunityPalengkeReturnView
        },
        {
          path: '/receive/transfer-community-palengke/return/receive',
          name: 'TransferCommunityPalengkeReturnReceive',
          component: TransferCommunityPalengkeReturnReceive
        },
        {
            path: '/receive/transfer-community-palengke/inquiry/slip',
            name: 'TransferCommunityPalengkeInquirySlip',
            component: TransferCommunityPalengkeInquirySlip
        },
        {
            path: '/receive/transfer-community-palengke/inquiry/slip/view',
            name: 'TransferCommunityPalengkeInquirySlipItem',
            component: TransferCommunityPalengkeInquirySlipItem
        },
        {
          path: '/receive/transfer-community-palengke/inquiry/return',
          name: 'TransferCommunityPalengkeInquiryReturn',
          component: TransferCommunityPalengkeInquiryReturn
      },
        {
            path: '/receive/transfer-community-palengke/inquiry/return/view',
            name: 'TransferCommunityPalengkeInquiryReturnItem',
            component: TransferCommunityPalengkeInquiryReturnItem
        },
        {
            path: '/receive/transfer-community-palengke/make/request',
            name: 'TransferCommunityPalengkeMakeRequest',
            component: TransferCommunityPalengkeMakeRequest
        },
        {
            path: '/receive/op/variable',
            name: 'OpenPoVariable',
            component: OpenPoVariable
        },
        {
            path: '/receive/op/fixed',
            name: 'OpenPoFixed',
            component: OpenPoFixed
        },
        {
            path: '/receive/op/meat',
            name: 'OpenPoMeat',
            component: OpenPoMeat
        },
        {
            path: '/receive/po/purchase',
            name: 'PoPurchaseInquiry',
            component: PoPurchaseInquiry
        },
        {
            path: '/receive/op/open_po_inquiry',
            name: 'OpenPoInquiry',
            component: OpenPoInquiry
        },
        {
            path: '/receive/op/price_change_inquiry',
            name: 'PriceChangeInquiry',
            component: PriceChangeInquiry
        },
        {
            path: '/receive/po/expected_delivery',
            name: 'ExpectedDelivery',
            component: ExpectedDelivery
        },
        {
            path: '/receive/po/po_update',
            name: 'PoUpdate',
            component: PoUpdate
        },
        {
            path: '/receive/po/upload_invoice',
            name: 'UploadInvoice',
            component: UploadInvoice
        },
        {
            path: '/receive/gulay/report',
            name: 'PriceReport',
            component: PriceReport
        },
        {
            path: '/receive/help',
            name: 'Help',
            component: Help
        }
    ]
})