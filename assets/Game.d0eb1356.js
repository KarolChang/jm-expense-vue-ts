import{_ as B}from"./index.e0544e65.js";import{f as $,x as h,o as u,c as n,h as e,t as a,F as p,k as f,n as y,A as x,B as A,p as F,P as E}from"./vendor.495b01ec.js";const D=d=>(x("data-v-275901cc"),d=d(),A(),d),S={key:0,class:"container"},w={class:"row"},N={class:"col col-sm-6"},R={class:"d-flex justify-content-center mb-3"},I={class:"num-block"},W={class:"num-block"},j={class:"num-block"},G={class:"num-block"},T={class:"d-flex flex-wrap justify-content-center"},M=["onClick"],O={class:"d-flex justify-content-center mb-3"},K={class:"col col-sm-6"},U=D(()=>e("h4",{class:"text-center"},"GUESS RECORDS",-1)),V={class:"list-group"},z={class:"d-flex align-items-center"},L=$({setup(d){const v=Array.from({length:10},(l,t)=>t),o=[];for(let l=0;l<4;l++){const t=Math.floor(Math.random()*v.length);o.push(v[t]),v.splice(t,1)}console.log("answer",o);const s=h([]),_=h(Array(10)),r=h([]),k=h(!1),b=l=>{if(s.value.length>=4)return alert("\u6578\u5B57\u5DF2\u6EFF\uFF01");if(s.value.includes(l))return alert("\u6578\u5B57\u91CD\u8907\uFF01");s.value.push(l)},g=()=>{if(console.log("enterClick"),s.value.length!==4)return alert("\u6578\u5B57\u672A\u9054\u56DB\u4F4D\uFF01");let l=0;if(s.value.forEach((t,i)=>{t===o[i]?(_.value[t]="success",l+=1):o.includes(t)?_.value[t]="warning":_.value[t]="secondary"}),r.value.push({number:s.value,status:[..._.value]}),l===4)return k.value=!0,alert(`\u606D\u559C\u7B54\u5C0D\uFF01\u4F60\u771F\u5E78\u904B~
\u7E3D\u6B21\u6578:${r.value.length}\u6B21`);s.value=[]},c=()=>{s.value=[],r.value=[],_.value=Array(10),k.value=!1};return(l,t)=>k.value?(u(),n("img",{key:1,src:"https://i.imgur.com/OmkEpSv.jpg",alt:"",class:"img-fluid",onClick:c})):(u(),n("div",S,[e("div",w,[e("div",N,[e("div",R,[e("div",I,a(s.value[0]),1),e("div",W,a(s.value[1]),1),e("div",j,a(s.value[2]),1),e("div",G,a(s.value[3]),1)]),e("div",T,[(u(!0),n(p,null,f(_.value,(i,m)=>(u(),n("div",{key:m,onClick:C=>b(m),class:y(`num-btn bg-${i||"light"}`)},a(m),11,M))),128))]),e("div",O,[k.value?(u(),n("div",{key:0,class:"btn-customer reset-btn",onClick:c},"RESET")):(u(),n(p,{key:1},[e("div",{class:"btn-customer back-btn col-6",onClick:t[0]||(t[0]=i=>s.value.pop())},"BACK"),e("div",{class:"btn-customer enter-btn col-6",onClick:g},"ENTER")],64))])]),e("div",K,[U,e("ul",V,[(u(!0),n(p,null,f(r.value,(i,m)=>(u(),n("li",{class:"list-group-item mx-auto",key:m},[e("div",z,[(u(!0),n(p,null,f(i.number,C=>(u(),n("div",{class:y("num-block bg-"+i.status[C]),key:C},a(C),3))),128))])]))),128))])])])]))}});var P=B(L,[["__scopeId","data-v-275901cc"]]);const q=d=>(x("data-v-92108812"),d=d(),A(),d),H={key:0,class:"container"},J={class:"row"},Q={class:"col col-sm-6"},X={class:"d-flex justify-content-center mb-3"},Y={class:"num-block"},Z={class:"num-block"},ee={class:"num-block"},se={class:"num-block"},te={class:"d-flex flex-wrap justify-content-center"},ue=["onClick"],le={class:"d-flex justify-content-center mb-3"},ne={class:"col col-sm-6"},ce=q(()=>e("h4",{class:"text-center"},"GUESS RECORDS",-1)),oe={class:"list-group"},ae={class:"d-flex align-items-center"},re={class:"ms-2"},ie=$({setup(d){const v=Array.from({length:10},(c,l)=>l),o=[];for(let c=0;c<4;c++){const l=Math.floor(Math.random()*v.length);o.push(v[l]),v.splice(l,1)}console.log("answer",o);const s=h([]),_=h([]),r=h(!1),k=c=>{if(s.value.length>=4)return alert("\u6578\u5B57\u5DF2\u6EFF\uFF01");if(s.value.includes(c))return alert("\u6578\u5B57\u91CD\u8907\uFF01");s.value.push(c)},b=()=>{if(console.log("enterClick"),s.value.length!==4)return alert("\u6578\u5B57\u672A\u9054\u56DB\u4F4D\uFF01");let c=0,l=0;if(s.value.forEach((t,i)=>{t===o[i]?c+=1:o.includes(t)&&(l+=1)}),_.value.push({number:s.value,status:`${c?c+"A":""}${l?l+"B":""}`}),c===4)return r.value=!0,alert(`\u606D\u559C\u7B54\u5C0D\uFF01\u4F60\u771F\u5E78\u904B~
\u7E3D\u6B21\u6578:${_.value.length}\u6B21`);s.value=[]},g=()=>{s.value=[],_.value=[],r.value=!1};return(c,l)=>r.value?(u(),n("img",{key:1,src:"https://i.imgur.com/OmkEpSv.jpg",alt:"",class:"img-fluid",onClick:g})):(u(),n("div",H,[e("div",J,[e("div",Q,[e("div",X,[e("div",Y,a(s.value[0]),1),e("div",Z,a(s.value[1]),1),e("div",ee,a(s.value[2]),1),e("div",se,a(s.value[3]),1)]),e("div",te,[(u(),n(p,null,f(10,t=>e("div",{key:t,onClick:i=>k(t-1),class:"num-btn"},a(t-1),9,ue)),64))]),e("div",le,[r.value?(u(),n("div",{key:0,class:"btn-customer reset-btn",onClick:g},"RESET")):(u(),n(p,{key:1},[e("div",{class:"btn-customer back-btn col-6",onClick:l[0]||(l[0]=t=>s.value.pop())},"BACK"),e("div",{class:"btn-customer enter-btn col-6",onClick:b},"ENTER")],64))])]),e("div",ne,[ce,e("ul",oe,[(u(!0),n(p,null,f(_.value,(t,i)=>(u(),n("li",{class:"list-group-item mx-auto",key:i},[e("div",ae,[(u(!0),n(p,null,f(t.number,m=>(u(),n("div",{class:y("num-block bg-"+t.status[m]),key:m},a(m),3))),128)),e("h3",re,a(t.status),1)])]))),128))])])])]))}});var _e=B(ie,[["__scopeId","data-v-92108812"]]);const de={class:"d-flex justify-content-center m-2 mb-5"},ve=["onClick"],me=$({setup(d){const v=h(["\u731C\u6578\u5B57(Wordle)","\u731C\u6578\u5B57(AB)"]),o=h("\u731C\u6578\u5B57(Wordle)");return(s,_)=>(u(),n("div",null,[e("div",de,[(u(!0),n(p,null,f(v.value,(r,k)=>(u(),n("button",{key:k,type:"button",class:y(`btn btn-${o.value!==r?"outline-":""}danger me-2`),onClick:b=>o.value=r},a(r),11,ve))),128))]),o.value==="\u731C\u6578\u5B57(Wordle)"?(u(),F(P,{key:0})):E("",!0),o.value==="\u731C\u6578\u5B57(AB)"?(u(),F(_e,{key:1})):E("",!0)]))}});var ke=B(me,[["__scopeId","data-v-56bac710"]]);export{ke as default};
