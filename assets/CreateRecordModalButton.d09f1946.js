import{b as f,c as v,d as b,T as s,C as B}from"./index.ce021ef5.js";import{r as C}from"./record.0fa6aed5.js";import{e as w,K as h,i as F,o as y,g as E,h as D,S as x}from"./vendor.961f4417.js";var g={push(t){return f.post("/push",t)}};const A=async t=>{try{const u={to:["Ub3557f7c812e4e78293959fe4fccd414","Ue5746fb7f35d2322a698d62dc9c9a21d"],messages:{type:"text",text:t}};await g.push(u)}catch(u){console.error("error",u)}},R=w({props:{view:null},setup(t){const u=t,o=v(),i=h(),d=F("refetchRecords"),m=async()=>{try{const{value:e}=await b.fire({title:"\u65B0\u589E\u8CC7\u6599",html:`
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
      `,preConfirm:()=>{var n;const a=document.getElementById("swal-item").value,c=document.getElementById("swal-merchant").value,l=document.getElementById("swal-amount").value,r=new Date(document.getElementById("swal-date").value);if((!a||!c||!l||!r)&&x.showValidationMessage("\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01\u82E5\u7D00\u9304\u8005\u70BA\u7A7A\uFF0C\u8ACB\u767B\u5165~"),o.currentUser)return{input:{item:a,merchant:c,amount:l,date:r,UserId:(n=o.currentUser)==null?void 0:n.id}};s.fire({icon:"error",title:"\u7121\u6CD5\u53D6\u5F97\u4F7F\u7528\u8005ID"})}});e!=null&&e.input&&p(e)}catch(e){console.error("error",e)}},p=async function(e){try{await C.create(e.input),s.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u8CC7\u6599\uFF01"}),u.view==="Record"?d():i.push({name:"Record"}),A(`${o.nickName}${o.icon}\u65B0\u589E\u4E86\u4E00\u7B46\u7D00\u9304 \u2192
${e.input.merchant}-${e.input.item} ${e.input.amount}`),B("Speak",`\u6210\u529F\u7D00\u9304${e.input.amount}\u5143`)}catch(a){console.error("error",a),s.fire({icon:"error",title:"\u65B0\u589E\u8CC7\u6599\u5931\u6557\uFF01"})}};return(e,a)=>(y(),E("div",null,[D("button",{type:"button",class:"btn btn-success",onClick:m},"\u65B0\u589E\u8CC7\u6599")]))}});export{R as _,g as l,A as p};
