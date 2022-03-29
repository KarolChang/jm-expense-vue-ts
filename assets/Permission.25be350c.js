import{d as F,u as v,T as d,_ as y}from"./index.e0544e65.js";import{S as A}from"./Spinner.5acc2245.js";import{f as _,i as E,g as C,o as a,c as u,S as w,x as b,C as g,h as o,j as h,F as x,k as P,t as f,p as $}from"./vendor.495b01ec.js";const k=_({setup(m){const i=["\u67E5\u770B","\u65B0\u589E","\u7DE8\u8F2F","\u522A\u9664","\u505C\u7528","\u64CD\u4F5C"],r=E("refetchPermissions"),n=C(()=>{let e='<select class="form-select" id="swal-action">';return i.forEach(t=>e+=`<option value="${t}">${t}</option>`),e+="</select>",e}),c=async()=>{try{const{value:e}=await F.fire({title:"\u65B0\u589E\u6B0A\u9650",html:`
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-action" class="col-form-label">ACTION</label>
        </div>
        <div class="col-auto">
          ${n.value}
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-item" class="col-form-label">ITEM</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-item" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-description" class="col-form-label">DESCRIPTION</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-description" class="form-control" >
        </div>
      </div>
      `,preConfirm:()=>{const t=document.getElementById("swal-action").value,s=document.getElementById("swal-item").value,p=document.getElementById("swal-description").value;return(!t||!s)&&w.showValidationMessage("\u9664\u4E86[DESCRIPTION]\uFF0C\u6240\u6709\u6B04\u4F4D\u90FD\u662F\u5FC5\u586B\uFF01"),{input:{action:t,item:s,description:p}}}});e&&l(e)}catch(e){console.error("error",e)}},l=async function(e){try{await v.permission.create(e.input),r(),d.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u6B0A\u9650\uFF01"})}catch(t){console.error("error",t),d.fire({icon:"error",title:"\u65B0\u589E\u6B0A\u9650\u5931\u6557\uFF01"})}};return(e,t)=>(a(),u("button",{type:"button",class:"btn btn-primary",onClick:c},"\u65B0\u589E\u6B0A\u9650"))}});const D=_({props:{permission:null},setup(m){const i=m,r=["\u67E5\u770B","\u65B0\u589E","\u7DE8\u8F2F","\u522A\u9664","\u505C\u7528","\u64CD\u4F5C"],n=E("refetchPermissions"),c=C(()=>{let t='<select class="form-select" id="swal-action">';return r.forEach(s=>{s===i.permission.action?t+=`<option selected value="${s}">${s}</option>`:t+=`<option value="${s}">${s}</option>`}),t+="</select>",t}),l=async()=>{try{const t=i.permission,{value:s}=await F.fire({title:"\u7DE8\u8F2F\u6B0A\u9650",html:`
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-action" class="col-form-label">ACTION</label>
          </div>
          <div class="col-auto">
            ${c.value}
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-item" class="col-form-label">ITEM</label>
          </div>
          <div class="col-auto">
            <input value="${t.item}" type="text" id="swal-item" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-description" class="col-form-label">DESCRIPTION</label>
          </div>
          <div class="col-auto">
            <input value="${t.description===null?"":t.description}" type="text" id="swal-description" class="form-control" >
          </div>
        </div>
      `,preConfirm:()=>{const p=document.getElementById("swal-action").value,B=document.getElementById("swal-item").value,I=document.getElementById("swal-description").value;return(!p||!B)&&w.showValidationMessage("\u9664\u4E86[DESCRIPTION]\uFF0C\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),{input:{action:p,item:B,description:I}}}});s&&e(s)}catch(t){console.error("error",t)}},e=async function(t){try{const{data:s}=await v.permission.edit(i.permission.id,t.input);if(s.status!=="success")throw new Error(`[SERVER ERROR] ${s.message}`);n(),d.fire({icon:"success",title:`\u6210\u529F\u7DE8\u8F2F\u6B0A\u9650[${s.data.action}-${s.data.item}]`})}catch(s){console.error("error",s),d.fire({icon:"error",title:"\u7DE8\u8F2F\u6B0A\u9650\u5931\u6557\uFF01"})}};return(t,s)=>(a(),u("i",{class:"fas fa-edit",onClick:l}))}});var R=y(D,[["__scopeId","data-v-7a0ff386"]]);const T=_({props:{permission:null},setup(m){const i=m,r=E("refetchPermissions"),n=async()=>{try{const{isConfirmed:l}=await F.fire({title:`\u78BA\u5B9A\u522A\u9664\u6B0A\u9650[${i.permission.action}-${i.permission.item}]\u561B\uFF1F`,showCancelButton:!0});l&&c(i.permission.id)}catch(l){console.error("error",l)}},c=async function(l){try{const{data:e}=await v.permission.delete(l);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);r(),d.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u6B0A\u9650[${e.data.action}-${e.data.item}]`})}catch(e){console.error("error",e),d.fire({icon:"error",title:"\u522A\u9664\u6B0A\u9650\u5931\u6557\uFF01"})}};return(l,e)=>(a(),u("i",{class:"fas fa-trash",onClick:n}))}});var S=y(T,[["__scopeId","data-v-3846beed"]]);const N={key:0},O={class:"d-flex my-3"},M={key:0,class:"table table-striped table-danger table-hover"},V=o("thead",null,[o("tr",null,[o("th",{scope:"col"},"ID"),o("th",{scope:"col"},"ACTION"),o("th",{scope:"col"},"ITEM"),o("th",{scope:"col"},"DESCRIPTION"),o("th",{scope:"col"},"#")])],-1),j={key:1,class:"img-fluid",src:"https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png",alt:"img"},z=_({setup(m){const i=b(!0),r=b([]),n=async function(){try{const{data:c}=await v.permission.getAll();r.value=c.data,i.value=!1}catch(c){console.error("error",c)}};return n(),g("refetchPermissions",n),(c,l)=>i.value?(a(),$(A,{key:1})):(a(),u("div",N,[o("div",O,[h(k)]),r.value.length?(a(),u("table",M,[V,o("tbody",null,[(a(!0),u(x,null,P(r.value,(e,t)=>(a(),u("tr",{key:t},[o("td",null,f(e.id),1),o("td",null,f(e.action),1),o("td",null,f(e.item),1),o("td",null,f(e.description),1),o("td",null,[h(R,{permission:e},null,8,["permission"]),h(S,{permission:e,class:"ms-2"},null,8,["permission"])])]))),128))])])):(a(),u("img",j))]))}});export{z as default};
