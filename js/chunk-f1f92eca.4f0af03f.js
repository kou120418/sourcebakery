(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f1f92eca"],{b0c0:function(e,t,c){var a=c("83ab"),o=c("5e77").EXISTS,n=c("9bf2").f,l=Function.prototype,r=l.toString,s=/^\s*function ([^ (]*)/,d="name";a&&!o&&n(l,d,{configurable:!0,get:function(){try{return r.call(this).match(s)[1]}catch(e){return""}}})},b5b8:function(e,t,c){"use strict";c.r(t);c("b0c0");var a=c("7a23"),o={id:"main",class:"container-lg content"},n=Object(a["createElementVNode"])("h2",{class:"p-5"},null,-1),l={class:"container"},r=Object(a["createElementVNode"])("div",{class:"bg-light p-3 pb-1 my-3"},[Object(a["createElementVNode"])("figure",{class:"text-center mx-auto"},[Object(a["createElementVNode"])("h2",null,"購物車明細")])],-1),s={class:"w-100 w-lg-75 mx-auto"},d={class:"row justify-content-center mt-3 mt-md-5"},i={class:"col-12"},b={class:"bg-opacity p-3"},m=Object(a["createElementVNode"])("h3",{class:"text-center mb-3"},"購買品項",-1),u={class:"p-table table align-middle mx-auto"},j=Object(a["createElementVNode"])("thead",{class:"p-table__head"},[Object(a["createElementVNode"])("tr",{class:"text-light"},[Object(a["createElementVNode"])("th",{width:"40%",class:"text-center fs-7 fs-sm-6"},"商品"),Object(a["createElementVNode"])("th",{class:"p-table__th--num text-center fs-7 fs-sm-6"},"數量")])],-1),O={class:"p-table__body"},p={class:"d-sm-flex align-items-center"},g=["src","alt"],E={class:"ps-2"},N={class:"badge bg-nobeta"},h={class:"fs-7 fs-sm-6"},V={class:"text-center"},f={class:"p-table__foot"},y={class:"text-light"},k=Object(a["createElementVNode"])("td",{class:"text-end"},"總計",-1),v={class:"text-center"},x={class:"row justify-content-center mt-3 mt-md-5 g-0"},w={class:"bg-opacity p-3"},S={class:"col-12 col-md-6 mx-auto"},_=Object(a["createElementVNode"])("h3",{class:"text-center mb-3"},"顧客資訊",-1),B={key:0},D={class:"goods-detail-description"},$=Object(a["createElementVNode"])("dt",null,"姓名",-1),L={class:"goods-detail-description"},A=Object(a["createElementVNode"])("dt",null,"寄送地址",-1),I={class:"goods-detail-description"},C=Object(a["createElementVNode"])("dt",null,"E-mail信箱",-1),F={class:"text-break"},T={class:"goods-detail-description"},J=Object(a["createElementVNode"])("dt",null,"付款方式",-1),P={class:"d-flex justify-content-center mt-4"},q={class:"setDisplay"},z={key:0,class:"bi bi-arrow-repeat rotating me-1"},U={key:1,class:"bi bi-check-lg me-1"},X=Object(a["createTextVNode"])("完成付款 ");function G(e,t,c,G,H,K){var M=Object(a["resolveComponent"])("Loading");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(M,{active:H.isLoading,"z-index":1500},null,8,["active"]),Object(a["createElementVNode"])("main",o,[n,Object(a["createElementVNode"])("div",l,[r,Object(a["createElementVNode"])("div",s,[Object(a["createElementVNode"])("div",d,[Object(a["createElementVNode"])("div",i,[Object(a["createElementVNode"])("div",b,[m,Object(a["createElementVNode"])("table",u,[j,Object(a["createElementVNode"])("tbody",O,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(H.order.products,(function(e){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:e},[Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("figure",p,[Object(a["createElementVNode"])("img",{class:"product-img",src:e.product.imageUrl,alt:e.product.title},null,8,g),Object(a["createElementVNode"])("figcaption",E,[Object(a["createElementVNode"])("span",N,Object(a["toDisplayString"])(e.product.category),1),Object(a["createElementVNode"])("p",h,Object(a["toDisplayString"])(e.product.title),1)])])]),Object(a["createElementVNode"])("td",V,Object(a["toDisplayString"])(e.qty),1)])})),128))]),Object(a["createElementVNode"])("tfoot",f,[Object(a["createElementVNode"])("tr",y,[k,Object(a["createElementVNode"])("td",v,Object(a["toDisplayString"])(e.$filters.currency(H.order.total))+" NTD",1)])])])])])]),Object(a["createElementVNode"])("div",x,[Object(a["createElementVNode"])("div",w,[Object(a["createElementVNode"])("div",S,[_,H.order.user?(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",B,[Object(a["createElementVNode"])("dl",D,[$,Object(a["createElementVNode"])("dd",null,Object(a["toDisplayString"])(H.order.user.name),1)]),Object(a["createElementVNode"])("dl",L,[A,Object(a["createElementVNode"])("dd",null,Object(a["toDisplayString"])(H.order.user.address),1)]),Object(a["createElementVNode"])("dl",I,[C,Object(a["createElementVNode"])("dd",F,Object(a["toDisplayString"])(H.order.user.email),1)]),Object(a["createElementVNode"])("dl",T,[J,Object(a["createElementVNode"])("dd",null,Object(a["toDisplayString"])(H.order.user.payment_method),1)])])):Object(a["createCommentVNode"])("",!0)]),Object(a["createElementVNode"])("div",P,[Object(a["createElementVNode"])("button",{type:"button",class:"btn btn-danger",onClick:t[0]||(t[0]=function(e){return K.goPayment()})},[Object(a["createElementVNode"])("span",q,[2===H.loadingStatus.loadingItem?(Object(a["openBlock"])(),Object(a["createElementBlock"])("i",z)):(Object(a["openBlock"])(),Object(a["createElementBlock"])("i",U)),X])])])])])])])])],64)}c("99af");var H={data:function(){return{isLoading:!1,loadingStatus:{loadingItem:""},order:{}}},methods:{showAlert:function(e){this.$swal(e.data.message)},showErrorAlert:function(e){this.$swal({title:e,icon:"error"})},getOrder:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id,c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("kouyu_api_practice","/order/").concat(t);this.$http.get(c).then((function(t){e.order=t.data.order,e.isLoading=!1})).catch((function(t){e.showErrorAlert(t)}))},goPayment:function(){var e=this;this.loadingStatus.loadingItem=2;var t=this.$route.params.id,c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("kouyu_api_practice","/pay/").concat(t);this.$http.post(c).then((function(c){c.data.success&&(e.loadingStatus.loadingItem="",e.showAlert(c),e.$router.push("/cartpayment/".concat(t)))})).catch((function(t){e.showErrorAlert(t)}))}},mounted:function(){this.getOrder()}},K=c("6b0d"),M=c.n(K);t["default"]=M()(H,[["render",G]])}}]);
//# sourceMappingURL=chunk-f1f92eca.4f0af03f.js.map