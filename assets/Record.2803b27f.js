import{r as h}from"./record.0fa6aed5.js";import{g as S}from"./dateFormat.a9df66b7.js";import{_ as y,c as b,d as R,T as _}from"./index.ce021ef5.js";import{S as I}from"./Spinner.80e7cf17.js";import{p as E,_ as U}from"./CreateRecordModalButton.d09f1946.js";import{e as D,i as k,o as r,g as m,S as N,F as B,j as x,h as o,t as v,x as C,C as M,k as L,n as j,p as F,m as $,P as T,A as O,B as P}from"./vendor.961f4417.js";const z=D({props:{record:null},setup(d){const p=d,n=b(),a=k("refetchRecords"),u=async()=>{try{const e=p.record,{value:l}=await R.fire({title:"\u8CC7\u6599\u7DE8\u8F2F",html:`
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-item" class="col-form-label">\u9805\u76EE</label>
        </div>
        <div class="col-auto">
          <input value="${e.item}" type="text" id="swal-item" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-merchant" class="col-form-label">\u5546\u5BB6</label>
        </div>
        <div class="col-auto">
          <input value="${e.merchant}" type="text" id="swal-merchant" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-amount" class="col-form-label">\u91D1\u984D</label>
        </div>
        <div class="col-auto">
          <input value="${e.amount}" type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-date" class="col-form-label">\u65E5\u671F</label>
        </div>
        <div class="col-auto">
          <input value="${new Date(e.date).toISOString().substring(0,10)}" type="date" id="swal-date" class="form-control" >
        </div>
      </div>
      `,preConfirm:()=>{const t=document.getElementById("swal-item").value,c=document.getElementById("swal-merchant").value,s=document.getElementById("swal-amount").value,f=new Date(document.getElementById("swal-date").value);if((!t||!c||!s||!f)&&N.showValidationMessage("\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01\u82E5\u7DE8\u8F2F\u8005\u70BA\u7A7A\uFF0C\u8ACB\u767B\u5165~"),n.currentUser)return{id:e.id,input:{item:t,merchant:c,amount:s,date:f,UserId:n.currentUser.id}};_.fire({icon:"error",title:"\u7121\u6CD5\u53D6\u5F97\u4F7F\u7528\u8005ID"})}});l!=null&&l.input&&i(l)}catch(e){console.error("error",e)}},i=async function(e){try{await h.edit(e.id,e.input),a(),_.fire({icon:"success",title:"\u6210\u529F\u7DE8\u8F2F\u8CC7\u6599\uFF01"}),E(`${n.nickName}${n.icon}\u7DE8\u8F2F\u4E86\u4E00\u7B46\u7D00\u9304 \u2192
${e.input.merchant}-${e.input.item} $${e.input.amount}`)}catch(l){console.error("error",l),_.fire({icon:"error",title:"\u7DE8\u8F2F\u8CC7\u6599\u5931\u6557\uFF01"})}};return(e,l)=>(r(),m("i",{class:"fas fa-edit",onClick:u}))}});var q=y(z,[["__scopeId","data-v-34229604"]]);const G={class:"d-flex mb-3",style:{width:"100vw"}},H={class:"btn btn-info fw-bold"},J=D({props:{propData:null},emits:["closeFunction"],setup(d,{emit:p}){const n=d,a=b(),u=k("refetchRecords"),i=async()=>{var t;const{isConfirmed:l}=await R.fire({icon:"info",title:"\u78BA\u5B9A\u7D50\u7B97\u8CC7\u6599\uFF1F",text:`\u7D50\u7B97\u91D1\u984D\u70BA $${n.propData.closeRecordsAmount} [\u7D50\u7B97\u8005: ${(t=a.currentUser)==null?void 0:t.displayName}]`});l&&e(n.propData.closeRecordsAmount)},e=async l=>{var t;try{if(a.currentUser){const{data:c}=await h.close({records:n.propData.closeRecords.toString(),totalAmount:l,UserId:(t=a.currentUser)==null?void 0:t.id});p("closeFunction","closeRecord"),u(),c.data.recordsNotFound.length||c.data.recordsClosedBefore.length?_.fire({icon:"success",title:"\u6210\u529F\u7D50\u7B97\u8CC7\u6599\uFF01\u6709\u90E8\u5206\u8CC7\u6599\u672A\u80FD\u627E\u5230\u6216\u662F\u5DF2\u7D93\u7D50\u7B97\u904E\u3002"}):_.fire({icon:"success",title:"\u6210\u529F\u7D50\u7B97\u8CC7\u6599\uFF01"}),E(`${a.nickName}${a.icon}\u7D50\u7B97\u7D00\u9304 \u2192 \u7E3D\u91D1\u984D $${l}`)}}catch(c){console.error("error",c),_.fire({icon:"error",title:"\u7D50\u7B97\u8CC7\u6599\u5931\u6557\uFF01"})}};return(l,t)=>(r(),m("div",G,[d.propData.isCloseStatus?(r(),m(B,{key:1},[o("div",H,"\u7D50\u7B97\u91D1\u984D $"+v(d.propData.closeRecordsAmount),1),o("button",{type:"button",class:"btn btn-secondary ms-3",onClick:t[1]||(t[1]=c=>p("closeFunction","cancelBtnClick"))}," \u53D6\u6D88\u7D50\u7B97 "),o("button",{type:"button",class:"btn btn-success ms-3",onClick:i},"\u78BA\u5B9A\u7D50\u7B97")],64)):(r(),m(B,{key:0},[x(U,{view:"Record",class:"me-3"}),o("button",{type:"button",class:"btn btn-danger",onClick:t[0]||(t[0]=c=>p("closeFunction","closeBtnClick"))},"\u958B\u59CB\u7D50\u7B97")],64))]))}});const K=D({props:{record:null},setup(d){const p=d,n=k("refetchRecords"),a=async()=>{try{const{isConfirmed:i}=await R.fire({title:`\u78BA\u5B9A\u522A\u9664\u7D00\u9304[${p.record.item}]\u561B\uFF1F`,showCancelButton:!0});i&&u(p.record.id)}catch(i){console.error("error",i)}},u=async function(i){try{const{data:e}=await h.delete(i);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);n(),_.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u7D00\u9304[${e.data.item}]`})}catch(e){console.error("error",e),_.fire({icon:"error",title:"\u522A\u9664\u7D00\u9304\u5931\u6557\uFF01"})}};return(i,e)=>(r(),m("i",{class:"fas fa-trash",onClick:a}))}});var Q=y(K,[["__scopeId","data-v-841b8e8a"]]);const V=d=>(O("data-v-072f01d7"),d=d(),P(),d),W={key:0},X={key:0,class:"table table-info table-hover"},Y=V(()=>o("thead",null,[o("tr",null,[o("th",{scope:"col"},"#"),o("th",{scope:"col"}),o("th",{scope:"col"},"\u9805\u76EE"),o("th",{scope:"col"},"\u5546\u5BB6"),o("th",{scope:"col"},"\u91D1\u984D"),o("th",{scope:"col"},"\u65E5\u671F"),o("th",{scope:"col",id:"column-item"},"\u9996\u6B21\u8A18\u9304\u8005"),o("th",{scope:"col",id:"column-item"},"\u9996\u6B21\u8A18\u9304\u6642\u9593"),o("th",{scope:"col",id:"column-item"},"\u66F4\u65B0\u6642\u9593")])],-1)),Z=["onClick"],ee=["checked"],te={id:"column-item"},oe={id:"column-item"},se={id:"column-item"},ue={key:1,class:"img-fluid",src:"https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1581909112681.jpg",alt:""},ce=D({setup(d){const p=b(),n=C(!0),a=C([]),u=C({isCloseStatus:!1,closeRecords:[],closeRecordsAmount:0}),i=async function(){try{const{data:t}=await h.getAll();a.value=t.data.filter(c=>c.isClosed===!1),n.value=!1}catch(t){console.error("error",t)}},e=(t,c)=>{if(console.log("checkboxClick"),u.value.isCloseStatus){const s=u.value.closeRecords.findIndex(f=>f===t);s!==void 0&&(s!==-1?(u.value.closeRecords.splice(s,1),u.value.closeRecordsAmount-=c):(u.value.closeRecords.push(t),u.value.closeRecordsAmount+=c))}},l=t=>{if(t==="cancelBtnClick"&&(u.value.isCloseStatus=!1,u.value.closeRecords=[],u.value.closeRecordsAmount=0),t==="closeBtnClick"){u.value.isCloseStatus=!0;const c=[];let s=0;for(let f of a.value)c.push(f.id),s+=f.amount;u.value.closeRecords=c,u.value.closeRecordsAmount=s}t==="closeRecord"&&(u.value.isCloseStatus=!1)};return i(),M("refetchRecords",i),(t,c)=>n.value?(r(),F(I,{key:1})):(r(),m("div",W,[x(J,{propData:u.value,onCloseFunction:l},null,8,["propData"]),a.value.length?(r(),m("table",X,[Y,o("tbody",null,[(r(!0),m(B,null,L(a.value,(s,f)=>{var w,g,A;return r(),m("tr",{key:f,class:j({"table-success":(w=u.value.closeRecords)==null?void 0:w.includes(s.id)}),onClick:le=>e(s.id,s.amount)},[o("td",null,[u.value.isCloseStatus?(r(),m("input",{key:0,class:"form-check-input",type:"checkbox",checked:(g=u.value.closeRecords)==null?void 0:g.includes(s.id)},null,8,ee)):(r(),F(q,{key:1,record:s},null,8,["record"]))]),o("td",null,[((A=$(p).currentUser)==null?void 0:A.Role.name_en)==="root"?(r(),F(Q,{key:0,record:s},null,8,["record"])):T("",!0)]),o("td",null,v(s.item),1),o("td",null,v(s.merchant),1),o("td",null,v(s.amount),1),o("td",null,v(new Date(s.date).toLocaleDateString()+" "+$(S)(s.date)),1),o("td",te,v(s.User.displayName),1),o("td",oe,v(new Date(s.createdAt).toLocaleString()),1),o("td",se,v(new Date(s.updatedAt).toLocaleString()),1)],10,Z)}),128))])])):(r(),m("img",ue))]))}});var pe=y(ce,[["__scopeId","data-v-072f01d7"]]);export{pe as default};