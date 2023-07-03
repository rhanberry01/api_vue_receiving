<template>
    <!-- Second navbar -->
	<div class="navbar navbar-default" id="navbar-second">
		<ul class="nav navbar-nav no-border visible-xs-block">
			<li><a class="text-center collapsed" data-toggle="collapse" data-target="#navbar-second-toggle" ><i class="icon-menu7"></i></a></li>
		</ul>

		<div class="navbar-collapse collapse" id="navbar-second-toggle" >
			<ul class="nav navbar-nav">
				<!-- <li v-on:click="menuHide(true)"><router-link to="/"><i class="icon-display4 position-left"></i> Dashboard </router-link></li> -->

				<!-- <li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle" v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-box position-left"></i> P.O <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-6">
									<ul class="menu-list" v-on:click="menuHide()">
										<li><router-link to="/receive/po">RECEIVE P.O</router-link></li>
										<li><router-link to="/receive/po/pending">PENDING P.O</router-link></li>
										<li><router-link to="/receive/po/request/pending">PENDING P.O REQUEST FOR POSTING</router-link></li>
										<li><router-link to="/receive/po/purchase">DAILY PURCHASE REGISTER FOR DELIVERIES</router-link></li>
										<li><router-link to="/receive/po/expected_delivery">EXPECTED DELIVERY</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> -->
<!-- 
				<li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-box position-left"></i> FREE <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">	
										<li><router-link to="/receive/free">FREE GOODS</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> -->

			<!-- 	<li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-box position-left"></i> SURVEY <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
										<li><router-link to="/receive/survey">RECEIVE PRICE SURVEY</router-link></li>
										<li><router-link to="/receive/survey/price_survey_inquiry">PRICE SURVEY INQUIRY</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> -->

				 <li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-box position-left"></i> OPEN P.O <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
										<li><router-link to="/receive/op/variable">VARIABLE</router-link></li>
										<!-- <li><router-link to="/receive/op/fixed">FIXED PRICING</router-link></li> -->
										<!-- <li><router-link to="/receive/op/meat">MEAT</router-link></li> -->
										<li><router-link to="/receive/op/open_po_inquiry">OPEN P.O INQUIRY</router-link></li>
										<!-- <li><router-link to="/receive/op/price_change_inquiry">PRICE CHANGE INQUIRY</router-link></li> -->
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> 

				<li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-truck position-left"></i> TRANSFERS <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
										<!-- <li><router-link to="/receive/transfer/dispatch">DISPATCH TRANSFER</router-link></li> -->
										<li><router-link to="/receive/transfer/receive">RECEIVE TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer/inquiry/slip">VIEW / PRINT TRANSFER SLIP</router-link></li>
										<!-- <li><a v-bind:href="authToken">(TEST TRANSFERS FOR TEST ONLY)</a></li> -->
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>

        <!-- <li class="dropdown mega-menu mega-menu-wide" v-if="enablePalengke">
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-truck position-left"></i> TRANSFERS COMMUNITY PALENGKE <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
                    
										<li><router-link to="/receive/transfer-community-palengke/make/request">MAKE REEQUEST TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer-community-palengke/dispatch">DISPATCH TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer-community-palengke/receive">RECEIVE TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer-community-palengke/return/receive">RETURN RECEIVE ITEM</router-link></li>
										<li><router-link to="/receive/transfer-community-palengke/inquiry/slip">TRANSFER REPORT LIST</router-link></li>
										<li><router-link to="/receive/transfer-community-palengke/inquiry/return">RETURN REPORT LIST</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> -->

				<!-- <li class="dropdown mega-menu mega-menu-wide" >
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-truck position-left"></i> SETTINGS <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
										<li><router-link to="/receive/po/po_update">UPDATE P.O</router-link></li>
										<li><router-link to="/receive/po/upload_invoice">REUPLOAD INVOICE ATTACHMENT</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li> 
 -->
				<!-- <li class="dropdown mega-menu mega-menu-wide">
					<a href="#" class="dropdown-toggle"  v-on:click="menuHide(true)" data-toggle="dropdown" ><i class="icon-truck position-left"></i> INQUIRY <span class="caret"></span></a>
					<div class="dropdown-menu dropdown-content" v-show="menu_list">
						<div class="dropdown-content-body">
							<div class="row">
								<div class="col-md-3">
									<ul class="menu-list" v-on:click="menuHide()">
										<li><router-link to="/receive/transfer/dispatch">DISPATCH TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer/receive">RECEIVE TRANSFER</router-link></li>
										<li><router-link to="/receive/transfer/inquiry/slip">VIEW / PRINT TRANSFER SLIP</router-link></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</li>  --> 
<!-- 				<li v-on:click="menuHide(true)" v-if="isVisor"><router-link to="/receive/gulay/report"><i class="icon-box position-left"></i> GULAY PRICE REPORT </router-link></li>
				<li v-on:click="menuHide(true)"><router-link to="/receive/help"><i class="icon-box position-left"></i> HELP </router-link></li> -->
			</ul>

		</div>
	</div>
	<!-- /second navbar -->
</template>

<script>
let urlAuth = (window.url) ? window.url :  'http://localhost:1200/api/'
export default {
	data(){
		return{
      isVisor: (this.$session.get('level')) ? (this.$session.get('level') == 3) ? true : false : false,
      menu_list: true,
      enablePalengke:  (this.$session.get('enablePalengke')) ? (this.$session.get('enablePalengke') == '1') ? true : false : false,
      authToken: urlAuth+'purchaser/receive_po/third_pary/php?user_id='+this.$session.get('user_id')+'&fullname='+this.$session.get('user_fullname'),
      fullName: ''
		}
  },
	methods:{
		async menuHide(type=false){
			this.menu_list = type
		},
  },

}
</script>
