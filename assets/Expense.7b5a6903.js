import{e as F,i as y,o as m,g as v,S as I,x as C,p as P,w as O,h as t,j as w,n as M,k as L,F as S,t as E,P as T,m as g,l as z,f as D,U as Y,y as N,V as J,C as $,R as q,T as G}from"./vendor.961f4417.js";import{a as b,_ as U,d as R,T as h,R as K,c as j}from"./index.baafafcd.js";import{d as V,g as Q}from"./dateFormat.a9df66b7.js";import{S as W}from"./Spinner.beaa716d.js";import{_ as X,d as Z}from"./dateFilter.a11ea60c.js";var k={expense:{getAll(){return b.get("/expense/all")},getOne(i){return b.get(`/expense/${i}`)},create(i){return b.post("/expense/create",i)},edit(i,o){return b.put(`/expense/edit/${i}`,o)},delete(i){return b.delete(`/expense/delete/${i}`)}},category:{getAll(){return b.get("/category/all")},getOne(i){return b.get(`/category/${i}`)},create(i){return b.post("/category/create",i)},edit(i,o){return b.put(`/category/edit/${i}`,o)},delete(i){return b.delete(`/category/delete/${i}`)}}};const ee=F({setup(i){const o=y("refetchCategories"),u=async()=>{try{const{value:a}=await R.fire({title:"\u65B0\u589E\u985E\u5225",html:`
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">\u7A2E\u985E</label>
          </div>
          <div class="col-auto my-auto">
            <input class="form-check-input" type="radio" name="type" id="swal-expense" value="\u652F\u51FA" checked>
            <label class="form-check-label me-3" for="swal-expense">\u652F\u51FA</label>
            <input class="form-check-input" type="radio" name="type" id="swal-income" value="\u6536\u5165">
            <label class="form-check-label" for="swal-income">\u6536\u5165</label>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">\u540D\u7A31</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-name" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-icon" class="col-form-label">Icon</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-icon" class="form-control" >
          </div>
          <a class="ms-4 mt-1" href="https://fontawesome.com/v5.15/icons?d=gallery&p=2" target="_blank">
            <span class="badge bg-info text-dark">\u627EIcon</span>
          </a>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-photoUrl" class="col-form-label">PhotoUrl</label>
          </div>
          <div class="col-auto">
            <input type="text" id="swal-photoUrl" class="form-control" >
          </div>
        </div>
      `,preConfirm:()=>{const s=document.getElementById("swal-expense").checked,e=document.getElementById("swal-name").value,n=document.getElementById("swal-icon").value,l=document.getElementById("swal-photoUrl").value;return e?!n&&!l&&I.showValidationMessage("Icon\u548CPhotoUrl\u6B04\u4F4D\u5FC5\u9808\u64C7\u4E00\u586B\u5BEB\uFF01"):I.showValidationMessage("\u540D\u7A31\u6B04\u4F4D\u5FC5\u586B\uFF01"),{input:{type:s?"\u652F\u51FA":"\u6536\u5165",name:e,icon:n===""?null:n,photoUrl:l===""?null:l}}}});a&&d(a)}catch(a){console.error("error",a)}},d=async function(a){try{console.log("formValues.input",a.input);const{data:s}=await k.category.create(a.input);o(),h.fire({icon:"success",title:`\u6210\u529F\u5EFA\u7ACB\u985E\u5225[${s.data.name}]`})}catch(s){console.error("error",s),h.fire({icon:"error",title:"\u65B0\u589E\u985E\u5225\u5931\u6557\uFF01"})}};return(a,s)=>(m(),v("span",{class:"badge bg-success",onClick:u},"+"))}});var te=U(ee,[["__scopeId","data-v-28cddca8"]]);const se=F({props:{category:null},setup(i){const o=i,u=y("refetchCategories"),d=async()=>{try{const{isConfirmed:s}=await R.fire({title:`\u78BA\u5B9A\u522A\u9664[${o.category.name}]\u985E\u5225\u561B\uFF1F`,showCancelButton:!0});s&&a(o.category.id)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await k.category.delete(s);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);u(),h.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u985E\u5225[${e.data.name}]`})}catch(e){console.error("error",e),h.fire({icon:"error",title:"\u522A\u9664\u985E\u5225\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-trash",onClick:d}))}});var le=U(se,[["__scopeId","data-v-3a3dba24"]]);const ae=F({props:{category:null},setup(i){const o=i,u=y("refetchCategories"),d=async()=>{try{const s=o.category,{value:e}=await R.fire({title:"\u7DE8\u8F2F\u985E\u5225",html:`
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">\u7A2E\u985E</label>
          </div>
          <div class="col-auto my-auto">
            <input class="form-check-input" type="radio" name="type" id="swal-expense" value="\u652F\u51FA" ${s.type==="\u652F\u51FA"?"checked":""}>
            <label class="form-check-label me-3" for="swal-expense">\u652F\u51FA</label>
            <input class="form-check-input" type="radio" name="type" id="swal-income" value="\u6536\u5165" ${s.type==="\u6536\u5165"?"checked":""}>
            <label class="form-check-label" for="swal-income">\u6536\u5165</label>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-name" class="col-form-label">\u540D\u7A31</label>
          </div>
          <div class="col-auto">
            <input value="${s.name}" type="text" id="swal-name" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-icon" class="col-form-label">Icon</label>
          </div>
          <div class="col-auto">
            <input value="${s.icon===null?"":s.icon}" type="text" id="swal-icon" class="form-control" >
          </div>
          <a class="ms-4 mt-1" href="https://fontawesome.com/v5.15/icons?d=gallery&p=2" target="_blank">
            <span class="badge bg-info text-dark">\u627EIcon</span>
          </a>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-photoUrl" class="col-form-label">PhotoUrl</label>
          </div>
          <div class="col-auto">
            <input value="${s.photoUrl===null?"":s.photoUrl}" type="text" id="swal-photoUrl" class="form-control" >
          </div>
          <a class="ms-4 mt-1" href="${s.photoUrl===null?"https://www.google.com/":s.photoUrl}" target="_blank">
            <span class="badge bg-success">\u5716\u7247\u9023\u7D50</span>
          </a>
        </div>
      `,preConfirm:()=>{const n=document.getElementById("swal-expense").checked,l=document.getElementById("swal-name").value,c=document.getElementById("swal-icon").value,f=document.getElementById("swal-photoUrl").value;return l?!c&&!f&&I.showValidationMessage("Icon\u548CPhotoUrl\u6B04\u4F4D\u5FC5\u9808\u64C7\u4E00\u586B\u5BEB\uFF01"):I.showValidationMessage("\u540D\u7A31\u6B04\u4F4D\u5FC5\u586B\uFF01"),{input:{type:n?"\u652F\u51FA":"\u6536\u5165",name:l,icon:c===""?null:c,photoUrl:f===""?null:f}}}});e&&a(e)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await k.category.edit(o.category.id,s.input);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);u(),h.fire({icon:"success",title:`\u6210\u529F\u7DE8\u8F2F\u985E\u5225[${e.data.name}]`})}catch(e){console.error("error",e),h.fire({icon:"error",title:"\u7DE8\u8F2F\u985E\u5225\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-edit ms-2",onClick:d}))}});var oe=U(ae,[["__scopeId","data-v-8a7b6312"]]);const ce={class:"text-dark mb-3"},ue=z(" \u8A18\u5E33\u985E\u5225 "),ne={class:"nav nav-tabs mb-2"},re={class:"nav-item"},ie={class:"nav-item"},de={class:"scroll"},me={class:"list-group"},pe={key:0,class:"list-group-item d-flex mb-2 border"},ve={class:"col-2"},fe={class:"col-10"},he={class:"text-nowrap text-start ms-3"},_e={class:"align-middle"},ye=F({setup(i){const o=y("categories"),u=y("categoryRPOpen"),d=C("\u652F\u51FA");return(a,s)=>(m(),P(K,{onRPOpen:s[2]||(s[2]=e=>u.value=!1)},{title:O(()=>[t("h5",ce,[ue,w(te)])]),content:O(()=>[t("ul",ne,[t("li",re,[t("span",{class:M(["nav-link",{active:d.value==="\u652F\u51FA"}]),onClick:s[0]||(s[0]=e=>d.value="\u652F\u51FA")},"\u652F\u51FA",2)]),t("li",ie,[t("span",{class:M(["nav-link",{active:d.value==="\u6536\u5165"}]),onClick:s[1]||(s[1]=e=>d.value="\u6536\u5165")},"\u6536\u5165",2)])]),t("div",de,[t("ul",me,[(m(!0),v(S,null,L(g(o),(e,n)=>(m(),v(S,{key:n},[e.type===d.value?(m(),v("li",pe,[t("div",ve,[t("i",{class:M(`${e.icon} fa-2x text-warning`)},null,2)]),t("div",fe,[t("div",he,[t("span",_e,E(e.name),1),w(oe,{category:e,class:"align-middle"},null,8,["category"]),w(le,{class:"ms-2 align-middle",category:e},null,8,["category"])])])])):T("",!0)],64))),128))])])]),_:1}))}});var ge=U(ye,[["__scopeId","data-v-661d09f9"]]);const be=F({setup(i){const o=j(),u=y("refetchExpenses"),d=y("categories"),a=D(()=>{let n='<select class="form-select" id="swal-categoryId">';return d.value.forEach(l=>n+=`<option value="${l.id}">${l.name}</option>`),n+="</select>",n}),s=async()=>{try{const{value:n}=await R.fire({title:"\u65B0\u589E\u8A18\u5E33",html:`
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-categoryId" class="col-form-label">\u985E\u5225</label>
        </div>
        <div class="col-auto">
          ${a.value}
        </div>
      </div>
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
          <label for="swal-amount" class="col-form-label">\u91D1\u984D</label>
        </div>
        <div class="col-auto">
          <input type="number" id="swal-amount" class="form-control" >
        </div>
      </div>
      <div class="d-flex mb-2">
        <div class="col-auto me-3">
          <label for="swal-note" class="col-form-label">\u5099\u8A3B</label>
        </div>
        <div class="col-auto">
          <input type="text" id="swal-note" class="form-control" >
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
      `,preConfirm:()=>{var r;const l=document.getElementById("swal-categoryId").value,c=document.getElementById("swal-item").value,f=document.getElementById("swal-amount").value,x=new Date(document.getElementById("swal-date").value),B=document.getElementById("swal-note").value;if((!c||!f||!x)&&I.showValidationMessage("\u9664\u4E86[\u5099\u8A3B]\uFF0C\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),console.log("store.currentUser",o.currentUser),console.log("store.currentUser?.id",(r=o.currentUser)==null?void 0:r.id),o.currentUser)return{input:{UserId:o.currentUser.id,CategoryId:Number(l),item:c,amount:f,note:B,date:x}};h.fire({icon:"error",title:"\u7121\u6CD5\u53D6\u5F97\u4F7F\u7528\u8005ID"})}});n!=null&&n.input&&e(n)}catch(n){console.error("error",n)}},e=async function(n){try{await k.expense.create(n.input),u(),h.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u8A18\u5E33\uFF01"})}catch(l){console.error("error",l),h.fire({icon:"error",title:"\u65B0\u589E\u8A18\u5E33\u5931\u6557\uFF01"})}};return(n,l)=>(m(),v("button",{type:"button",class:"btn btn-primary me-3",onClick:s},"\u65B0\u589E\u8A18\u5E33"))}});const Ee=F({props:{expense:null},setup(i){const o=i,u=j(),d=y("refetchExpenses"),a=y("categories"),s=D(()=>{let l='<select class="form-select" id="swal-categoryId">';return a.value.forEach(c=>{c.id===o.expense.Category.id?l+=`<option selected value="${c.id}">${c.name}</option>`:l+=`<option value="${c.id}">${c.name}</option>`}),l+="</select>",l}),e=async()=>{try{const l=o.expense,{value:c}=await R.fire({title:"\u7DE8\u8F2F\u8A18\u5E33",html:`
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-categoryId" class="col-form-label">\u985E\u5225</label>
          </div>
          <div class="col-auto">
            ${s.value}
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-item" class="col-form-label">\u9805\u76EE</label>
          </div>
          <div class="col-auto">
            <input value="${l.item}" type="text" id="swal-item" class="form-control"/>
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-amount" class="col-form-label">\u91D1\u984D</label>
          </div>
          <div class="col-auto">
            <input value="${l.amount}" type="number" id="swal-amount" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-note" class="col-form-label">\u5099\u8A3B</label>
          </div>
          <div class="col-auto">
            <input value="${l.note}" type="text" id="swal-note" class="form-control" >
          </div>
        </div>
        <div class="d-flex mb-2">
          <div class="col-auto me-3">
            <label for="swal-date" class="col-form-label">\u65E5\u671F</label>
          </div>
          <div class="col-auto">
            <input value="${new Date(l.date).toJSON().substring(0,10)}" type="date" id="swal-date" class="form-control">
          </div>
      `,preConfirm:()=>{const f=document.getElementById("swal-categoryId").value,x=document.getElementById("swal-item").value,B=document.getElementById("swal-amount").value,r=new Date(document.getElementById("swal-date").value),p=document.getElementById("swal-note").value;if((!x||!B||!r)&&I.showValidationMessage("\u9664\u4E86[\u5099\u8A3B]\uFF0C\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),u.currentUser)return{input:{UserId:u.currentUser.id,CategoryId:Number(f),item:x,amount:B,note:p,date:r}};h.fire({icon:"error",title:"\u7121\u6CD5\u53D6\u5F97\u4F7F\u7528\u8005ID"})}});console.log("formValues",c),c!=null&&c.input&&n(c)}catch(l){console.error("error",l)}},n=async function(l){try{const{data:c}=await k.expense.edit(o.expense.id,l.input);if(c.status!=="success")throw new Error(`[SERVER ERROR] ${c.message}`);d(),h.fire({icon:"success",title:`\u6210\u529F\u7DE8\u8F2F\u8A18\u5E33[${c.data.item}]`})}catch(c){console.error("error",c),h.fire({icon:"error",title:"\u7DE8\u8F2F\u8A18\u5E33\u5931\u6557\uFF01"})}};return(l,c)=>(m(),v("i",{class:"fas fa-edit",onClick:e}))}});var we=U(Ee,[["__scopeId","data-v-05ea8b43"]]);const Fe=F({props:{expense:null},setup(i){const o=i,u=y("refetchExpenses"),d=async()=>{try{const{isConfirmed:s}=await R.fire({title:`\u78BA\u5B9A\u522A\u9664\u8A18\u5E33[${o.expense.item}]\u561B\uFF1F`,showCancelButton:!0});s&&a(o.expense.id)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await k.expense.delete(s);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);u(),h.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u8A18\u5E33[${e.data.item}]`})}catch(e){console.error("error",e),h.fire({icon:"error",title:"\u522A\u9664\u8A18\u5E33\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-trash",onClick:d}))}});var xe=U(Fe,[["__scopeId","data-v-5dc5c3f6"]]);const Ce={class:"bg-secondary me-3 p-3"},ke={class:"form-check form-switch mb-4"},Be=t("label",{class:"form-check-label",for:"flexSwitchCheckChecked"},"\u5168\u9078",-1),$e=["value","id","checked","onClick"],Ae=["for"],De=F({props:{allCategories:null},setup(i){const o=i,u=C(!0),d=y("categoriesByType"),a=y("categoryFilters"),s=e=>{a.value.includes(e)?a.value.forEach((n,l)=>{if(e===n){a.value.splice(l,1);return}}):a.value.push(e)};return Y(u,()=>{u.value?a.value=o.allCategories:a.value=[]}),(e,n)=>(m(),v("div",Ce,[t("div",ke,[Be,N(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"flexSwitchCheckChecked","onUpdate:modelValue":n[0]||(n[0]=l=>u.value=l)},null,512),[[J,u.value]])]),(m(!0),v(S,null,L(g(d),(l,c)=>(m(),v("div",{class:"form-check mb-2",key:c},[t("input",{class:"form-check-input",type:"checkbox",value:l.id,id:l.name,checked:g(a).includes(l.id),onClick:f=>s(l.id)},null,8,$e),t("label",{class:"form-check-label",for:l.name},E(l.name),9,Ae)]))),128))]))}}),Ie={key:0},Ue={class:"d-flex mb-3",style:{width:"100vw"}},Re={class:"d-flex mb-4",style:{width:"100%"}},Me={class:"mt-4",style:{width:"100px"}},Ve=t("label",{for:"type",style:{float:"left","font-size":"0.7em"}},"TYPE",-1),Se=t("option",{selected:""},"ALL",-1),Pe=t("option",null,"\u652F\u51FA",-1),Oe=t("option",null,"\u6536\u5165",-1),Le=[Se,Pe,Oe],Te={class:"d-flex align-items-center mb-4",style:{width:"100%"}},Ye={class:"badge bg-warning text-dark fs-3"},Ne=t("i",{class:"fas fa-minus mx-2"},null,-1),je={class:"badge bg-success fs-3"},He=t("i",{class:"fas fa-equals mx-2"},null,-1),ze={class:"badge bg-info fs-3"},Je={class:"d-flex align-items-start"},qe={key:0,class:"table table-striped table-success table-hover"},Ge=t("thead",null,[t("tr",{class:"table-light"},[t("th",{scope:"col"},"#"),t("th",{scope:"col"},"#"),t("th",{scope:"col"},"\u985E\u5225"),t("th",{scope:"col"},"\u9805\u76EE"),t("th",{scope:"col"},"\u91D1\u984D"),t("th",{scope:"col"},"\u5099\u8A3B"),t("th",{scope:"col"},"\u65E5\u671F")])],-1),Ke={key:1,class:"img-fluid",src:"https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png",alt:"img"},tt=F({setup(i){const o=C(),u=C(),d=C(!1),a=C([]),s=C({searchMode:"\u6708\u4EFD",filter:{year:V().year(),month:V().month()+1,startDate:V().startOf("month").format("YYYY-MM-DD hh:mm:ss"),finishDate:V().endOf("month").format("YYYY-MM-DD hh:mm:ss")}}),e=C("ALL"),n=D(()=>e.value!=="ALL"?u.value.filter(r=>r.type===e.value).map(r=>r.id):u.value.map(r=>r.id)),l=D(()=>e.value==="ALL"?u.value:u.value.filter(r=>r.type===e.value)),c=D(()=>{let r=[];return r=o.value.filter(p=>a.value.includes(p.Category.id)),Z(s.value,r)}),f=D(()=>{let r=0,p=0;return c.value.forEach(A=>{A.Category.type==="\u652F\u51FA"?p+=A.amount:r+=A.amount}),{income:r,expense:p}}),x=async function(){try{const{data:r}=await k.expense.getAll();o.value=r.data}catch(r){console.error("error",r)}},B=async()=>{try{const{data:r}=await k.category.getAll();u.value=r.data,a.value=u.value.map(p=>p.id)}catch(r){console.error("error",r)}};return x(),B(),Y(e,r=>{r!=="ALL"?a.value=u.value.filter(p=>p.type===e.value).map(p=>p.id):a.value=u.value.map(p=>p.id)}),$("refetchExpenses",x),$("refetchCategories",B),$("categories",u),$("categoryFilters",a),$("dateFilterData",s),$("categoryRPOpen",d),$("categoriesByType",l),(r,p)=>{var A;return o.value&&u.value?(m(),v("div",Ie,[t("div",Ue,[w(be),t("button",{type:"button",class:"btn btn-warning text-dark",onClick:p[0]||(p[0]=_=>d.value=!0)},"\u67E5\u770B\u985E\u5225")]),t("div",Re,[t("div",Me,[Ve,N(t("select",{class:"form-select",id:"type","aria-label":"Default select example","onUpdate:modelValue":p[1]||(p[1]=_=>e.value=_)},Le,512),[[q,e.value]])]),t("div",null,[w(X,{style:{width:"250px"}})])]),t("div",Te,[t("span",Ye,"\u6536\u5165 $ "+E(g(f).income),1),Ne,t("span",je,"\u652F\u51FA $ "+E(g(f).expense),1),He,t("span",ze,"$ "+E(g(f).income-g(f).expense),1)]),t("div",Je,[w(De,{allCategories:g(n)},null,8,["allCategories"]),(A=g(c))!=null&&A.length?(m(),v("table",qe,[Ge,t("tbody",null,[(m(!0),v(S,null,L(g(c),(_,H)=>(m(),v("tr",{key:H,class:M(_.Category.type==="\u652F\u51FA"?"table-success":"table-warning")},[t("td",null,[w(we,{expense:_},null,8,["expense"])]),t("td",null,[w(xe,{expense:_},null,8,["expense"])]),t("td",null,[t("i",{class:M(_.Category.icon)},null,2)]),t("td",null,E(_.item),1),t("td",null,E(_.amount),1),t("td",null,E(_.note),1),t("td",null,E(new Date(_.date).toLocaleDateString()+" "+g(Q)(_.date)),1)],2))),128))])])):(m(),v("img",Ke))]),w(G,{name:"slide-right"},{default:O(()=>[d.value?(m(),P(ge,{key:0})):T("",!0)]),_:1})])):(m(),P(W,{key:1}))}}});export{tt as default};
