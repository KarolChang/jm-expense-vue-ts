import{f,K as v,i as b,o as B,c as w,h as C,S as h}from"./vendor.495b01ec.js";import{b as y,c as E,d as F,T as n,C as x}from"./index.e0544e65.js";import{r as g}from"./record.faac3df9.js";var A={push(t){return y.post("/push",t)}};const D=async t=>{try{const a={to:["Ub3557f7c812e4e78293959fe4fccd414","Ue5746fb7f35d2322a698d62dc9c9a21d"],messages:{type:"text",text:t}};await A.push(a)}catch(a){console.error("error",a)}},R=f({props:{view:null},setup(t){const a=t,s=E(),i=v(),d=b("refetchRecords"),m=async()=>{try{const{value:e}=await F.fire({title:"\u65B0\u589E\u8CC7\u6599",html:`
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-item" class="col-form-label">\u9805\u76EE</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-item" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-merchant" class="col-form-label">\u5546\u5BB6</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-merchant" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-amount" class="col-form-label">\u91D1\u984D</label>
          </div>
          <div class="col-auto">
            <input type="number" id="swal-amount" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-date" class="col-form-label">\u65E5\u671F</label>
          </div>
          <div class="col-auto">
            <input type="date" id="swal-date" class="form-control" value="${new Date().toJSON().substring(0,10)}">
          </div>
        </div>
      `,preConfirm:()=>{var r;const o=document.getElementById("swal-item").value,u=document.getElementById("swal-merchant").value,c=document.getElementById("swal-amount").value,l=new Date(document.getElementById("swal-date").value);return(!o||!u||!c||!l)&&h.showValidationMessage("\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01\u82E5\u7D00\u9304\u8005\u70BA\u7A7A\uFF0C\u8ACB\u767B\u5165~"),{input:{item:o,merchant:u,amount:c,date:l,UserId:(r=s.currentUser)==null?void 0:r.id}}}});e&&p(e)}catch(e){console.error("error",e)}},p=async function(e){try{await g.create(e.input),n.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u8CC7\u6599\uFF01"}),a.view==="Record"?d():i.push({name:"Record"}),D(`${s.nickName}${s.icon}\u65B0\u589E\u4E86\u4E00\u7B46\u7D00\u9304 \u2192
${e.input.merchant}-${e.input.item} ${e.input.amount}`),x("Speak",`\u6210\u529F\u7D00\u9304${e.input.amount}\u5143`)}catch(o){console.error("error",o),n.fire({icon:"error",title:"\u65B0\u589E\u8CC7\u6599\u5931\u6557\uFF01"})}};return(e,o)=>(B(),w("div",null,[C("button",{type:"button",class:"btn btn-success",onClick:m},"\u65B0\u589E\u8CC7\u6599")]))}});export{R as _,A as l,D as p};
