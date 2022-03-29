import{d as h,u as p,T as i,_ as b}from"./index.e0544e65.js";import{S as E}from"./Spinner.5acc2245.js";import{f as v,i as F,o as n,c,S as D,x as y,C as w,r as B,h as s,j as f,F as x,k,t as _,w as C,p as R}from"./vendor.495b01ec.js";const g=v({setup(d){const a=F("refetchRoles"),r=async()=>{try{const{value:o}=await h.fire({title:"\u65B0\u589E\u89D2\u8272",html:`
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-name" class="col-form-label">\u4E2D\u6587\u540D\u7A31</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-name" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-nameEn" class="col-form-label">\u82F1\u6587\u540D\u7A31</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-nameEn" class="form-control" >
        </div>
      </div>
      `,preConfirm:()=>{const e=document.getElementById("swal-name").value,t=document.getElementById("swal-nameEn").value;return(!e||!t)&&D.showValidationMessage("\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\uFF01"),{input:{name:e,name_en:t}}}});o&&u(o)}catch(o){console.error("error",o)}},u=async function(o){try{await p.role.create(o.input),a(),i.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u89D2\u8272\uFF01"})}catch(e){console.error("error",e),i.fire({icon:"error",title:"\u65B0\u589E\u89D2\u8272\u5931\u6557\uFF01"})}};return(o,e)=>(n(),c("button",{type:"button",class:"btn btn-primary",onClick:r},"\u65B0\u589E\u89D2\u8272"))}});const A=v({props:{role:null},setup(d){const a=d,r=F("refetchRoles"),u=async()=>{try{const e=a.role,{value:t}=await h.fire({title:"\u89D2\u8272\u7DE8\u8F2F",html:`
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-name" class="col-form-label">\u4E2D\u6587\u540D\u7A31</label>
        </div>
        <div class="col-auto">
          <input value="${e.name}" type="text" id="swal-name" class="form-control"/>
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-nameEn" class="col-form-label">\u82F1\u6587\u540D\u7A31</label>
        </div>
        <div class="col-auto">
          <input value="${e.name_en}" type="text" id="swal-nameEn" class="form-control" >
        </div>
      </div>
      `,preConfirm:()=>{const l=document.getElementById("swal-name").value,m=document.getElementById("swal-nameEn").value;return(!l||!m)&&D.showValidationMessage("\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),{id:e.id,input:{name:l,name_en:m}}}});t&&o(t)}catch(e){console.error("error",e)}},o=async function(e){try{await p.role.edit(e.id,e.input),r(),i.fire({icon:"success",title:"\u6210\u529F\u7DE8\u8F2F\u89D2\u8272\uFF01"})}catch(t){console.error("error",t),i.fire({icon:"error",title:"\u7DE8\u8F2F\u89D2\u8272\u5931\u6557\uFF01"})}};return(e,t)=>(n(),c("i",{class:"fas fa-edit",onClick:u}))}});var I=b(A,[["__scopeId","data-v-e57c2fb4"]]);const $=v({props:{role:null},setup(d){const a=d,r=F("refetchRoles"),u=async()=>{try{const{isConfirmed:e}=await h.fire({title:`\u78BA\u5B9A\u522A\u9664\u89D2\u8272[${a.role.name}]\u561B\uFF1F`,showCancelButton:!0});e&&o(a.role.id)}catch(e){console.error("error",e)}},o=async function(e){try{const{data:t}=await p.role.delete(e);if(t.status!=="success")throw new Error(`[SERVER ERROR] ${t.message}`);r(),i.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u89D2\u8272[${t.data.name}]`})}catch(t){console.error("error",t),i.fire({icon:"error",title:"\u522A\u9664\u89D2\u8272\u5931\u6557\uFF01"})}};return(e,t)=>(n(),c("i",{class:"fas fa-trash",onClick:u}))}});var V=b($,[["__scopeId","data-v-4544867f"]]);const M={key:0},S={class:"d-flex my-3"},j={key:0,class:"table table-striped table-danger table-hover"},L=s("thead",null,[s("tr",null,[s("th",{scope:"col"},"ID"),s("th",{scope:"col"},"\u4E2D\u6587\u540D\u7A31"),s("th",{scope:"col"},"\u82F1\u6587\u540D\u7A31"),s("th",{scope:"col"},"\u555F\u7528"),s("th",{scope:"col"},"#")])],-1),N=s("i",{class:"fa-solid fa-circle-question"},null,-1),P={key:1,class:"img-fluid",src:"https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png",alt:"img"},X=v({setup(d){const a=y(!0),r=y([]),u=async function(){try{const{data:o}=await p.role.getAll();r.value=o.data,a.value=!1}catch(o){console.error("error",o)}};return u(),w("refetchRoles",u),(o,e)=>{const t=B("router-link");return a.value?(n(),R(E,{key:1})):(n(),c("div",M,[s("div",S,[f(g)]),r.value.length?(n(),c("table",j,[L,s("tbody",null,[(n(!0),c(x,null,k(r.value,(l,m)=>(n(),c("tr",{key:m},[s("td",null,_(l.id),1),s("td",null,_(l.name),1),s("td",null,_(l.name_en),1),s("td",null,_(l.deletedAt===null?"V":"X"),1),s("td",null,[f(t,{to:{name:"Admin-Role-Access",params:{id:l.id}}},{default:C(()=>[N]),_:2},1032,["to"]),f(I,{role:l,class:"ms-2"},null,8,["role"]),f(V,{role:l,class:"ms-2"},null,8,["role"])])]))),128))])])):(n(),c("img",P))]))}}});export{X as default};
