<template>
    <div class="panel-body">

      <!-- Accordion with different panel styling -->
      <h7 class="content-group text-semibold">PINDUTIN ANG TYPE NG ERROR PARA MAKITA ANG DETAILS</h7><br>
      <h7 class="content-group text-semibold">PAG MAG REREPORT NG ERROR SA PROGRAM SIGURADUHING MAY SCREENSHOT KAYO NG ERROR</h7><br>
      <h7 class="content-group text-semibold">WALANG MAG REREPORT NA HINDI MAKA PAG POST MAGING SPECIFIC PO TAYO SA PROBLEMA PARA MABILIS TAYO</h7><br>
      <h7 class="content-group text-semibold">KAPAG HINDI KAYO NI REPLYAN IBIG SABIHIN HINDI NYO SINUNOD YUNG INSTRUCTIONS NA NAKALAGAY SA BAWAT LIST</h7>
      <br><br>
      <div class="panel-group" id="accordion-styled">

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group0">NO CONNECTION RECEIVING</a>
            </h6>
          </div>
          <div id="accordion-styled-group0" class="panel-collapse collapse in">
            <div class="panel-body">
              <li>MAARING MAG CHAT SA TECHNICAL / PROGRAMMER KASAMA ANG SCREENSHOT</li>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group1">INVALID P.O / CANCELLED / EXPIRED</a>
            </h6>
          </div>
          <div id="accordion-styled-group1" class="panel-collapse collapse">
            <div class="panel-body">
              <li>MAARING ANG IYONG P.O AY HINDI UPDATED SAINYONG BRANCH MAARI KAYONG MAG UPDATE SA LINK NA ITO -> <router-link to="/receive/po/po_update">UPDATE P.O</router-link></li>
              <li>KUNG ANG PAG UPDATE NG P.O AY MAY ( ERROR CONNECTION OR CONNECTION TIMEOUT ) NA LUMABAS MAG CHAT SA TECHNICAL AT PROGRAMMER PARA MAG PA UPDATE KASAMA ANG SCREENSHOT NG ERROR</li>
              <li>KUNG ANG P.O AY CANCELLED OR EXPIRED MAARING MAG CONCERN KAY PURCHASER HINDI SA PROGRAMMER AT TECHNICAL KAPAG NA UPDATE NA NG PURCHASER ANG CANCELLED P.O OR EXPIRED P.O MAG ANTAY NG 30 MINS TO 50 MINS PARA MA UPDATE SAINYONG BRANCH</li>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group2">COST OF SALES IS GREATER THAN SRP / BARCODE DOES NOT EXIST / DECIMAL ERROR</a>
            </h6>
          </div>
          <div id="accordion-styled-group2" class="panel-collapse collapse">
            <div class="panel-body">
              <li>MAARING MAG CONCERN SA PURCHASER PARA MAG UPDATE NG SRP AT COST OF SALES KASAMA ANG SCREENSHOT</li>
              <li>KAPAG BARCODE DOES NOT EXIST NAMAN MAARING MAG CONCERN KAY SIR RICHARD QUIA / PROGRAMMER KASAMA ANG BARCODE</li>
              <li>KAPAG DECIMAL ERROR NAMAN MAARING MAG CHAT SA PROGRAMMER KASAMA ANG BARCODE</li>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group3">ERROR POSTING / PENDING RS / PENDING PICKUP</a>
            </h6>
          </div>
          <div id="accordion-styled-group3" class="panel-collapse collapse">
            <div class="panel-body">
              <li>ERROR POSTING KAPAG LUMABAS ANG ERROR TIME OUT REQUEST FAILED TO COMPLETE IN 15000 MS (MAARING MABAGAL ANG IYONG CONNECTION PA PUNTA SA SERVER) MAARING MAG REFRESH NG BROWSER AT SUBUKAN ULIT</li>
              <li>PENDING RS AT PENDING PICKUP MAG CHAT KAY B.O NA MAG POST NA NG MGA PENDING SCAN AT FOR PICKUP NA B.O</li>
              <li>WALA SI B.O ? HINDI MAKAPAG POST ? MAARING MAG REQUEST SA LINK NA ITO ( <router-link to="/receive/po/request">REQUEST P.O FOR POSTING</router-link> ) MAARING MAG CHAT SA PURCHASER OR KAY MAAM ROWENA VILLAR AT IBIGAY ANG P.O NA NEED FOR APPROVAL DITO MAKIKITA SA LINK NA ITO ( <router-link to="/receive/po/request/pending">PENDING P.O REQUEST FOR FOSTING</router-link> ) ANG MGA STATUS NG MGA P.O NA PWEDI NG MAG POST KAHIT MAY PENDING RS PA</li>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group4">ITEM NOT IN TRANSFER </a>
            </h6>
          </div>
          <div id="accordion-styled-group4" class="panel-collapse collapse">
            <div class="panel-body">
              <li>PAKI CHAT SA PROGRAMMER KASAMA ANG BARCODE AT PACKING LIST # PATI SCREENSHOT</li>
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-heading bg-danger">
            <h6 class="panel-title">
              <a class="collapsed" data-toggle="collapse" data-parent="#accordion-styled" href="#accordion-styled-group5">ERROR PROGRAM</a>
            </h6>
          </div>
          <div id="accordion-styled-group5" class="panel-collapse collapse">
            <div class="panel-body">
              <li>KAPAG WALA SA LIST ANG ERROR PAKI CHAT SA PROGRAMMER KASAMA ANG SCREENSHOT NG ERROR</li>
            </div>
          </div>
        </div>
      </div>
      <!-- /accordion with different panel styling -->

            
    </div>
</template>


<script>
export default {
  
}
</script>
