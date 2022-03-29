import{f as F,i as _,o as m,c as v,S as I,x as k,p as P,w as O,h as t,j as x,n as M,k as L,F as S,t as w,P as T,m as g,l as z,g as D,U as Y,y as N,V as J,C as A,R as q,T as G}from"./vendor.495b01ec.js";import{a as b,_ as R,d as U,T as y,R as K,c as j}from"./index.e0544e65.js";import{d as V,g as Q}from"./dateFormat.26b8f760.js";import{S as W}from"./Spinner.5acc2245.js";import{_ as X,d as Z}from"./dateFilter.34232561.js";var B={expense:{getAll(){return b.get("/expense/all")},getOne(c){return b.get(`/expense/${c}`)},create(c){return b.post("/expense/create",c)},edit(c,u){return b.put(`/expense/edit/${c}`,u)},delete(c){return b.delete(`/expense/delete/${c}`)}},category:{getAll(){return b.get("/category/all")},getOne(c){return b.get(`/category/${c}`)},create(c){return b.post("/category/create",c)},edit(c,u){return b.put(`/category/edit/${c}`,u)},delete(c){return b.delete(`/category/delete/${c}`)}}};const ee=F({setup(c){const u=_("refetchCategories"),n=async()=>{try{const{value:a}=await U.fire({title:"\u65B0\u589E\u985E\u5225",html:`
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
      `,preConfirm:()=>{const s=document.getElementById("swal-expense").checked,e=document.getElementById("swal-name").value,r=document.getElementById("swal-icon").value,l=document.getElementById("swal-photoUrl").value;return e?!r&&!l&&I.showValidationMessage("Icon\u548CPhotoUrl\u6B04\u4F4D\u5FC5\u9808\u64C7\u4E00\u586B\u5BEB\uFF01"):I.showValidationMessage("\u540D\u7A31\u6B04\u4F4D\u5FC5\u586B\uFF01"),{input:{type:s?"\u652F\u51FA":"\u6536\u5165",name:e,icon:r===""?null:r,photoUrl:l===""?null:l}}}});a&&d(a)}catch(a){console.error("error",a)}},d=async function(a){try{console.log("formValues.input",a.input);const{data:s}=await B.category.create(a.input);u(),y.fire({icon:"success",title:`\u6210\u529F\u5EFA\u7ACB\u985E\u5225[${s.data.name}]`})}catch(s){console.error("error",s),y.fire({icon:"error",title:"\u65B0\u589E\u985E\u5225\u5931\u6557\uFF01"})}};return(a,s)=>(m(),v("span",{class:"badge bg-success",onClick:n},"+"))}});var te=R(ee,[["__scopeId","data-v-5061c15d"]]);const se=F({props:{category:null},setup(c){const u=c,n=_("refetchCategories"),d=async()=>{try{const{isConfirmed:s}=await U.fire({title:`\u78BA\u5B9A\u522A\u9664[${u.category.name}]\u985E\u5225\u561B\uFF1F`,showCancelButton:!0});s&&a(u.category.id)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await B.category.delete(s);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);n(),y.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u985E\u5225[${e.data.name}]`})}catch(e){console.error("error",e),y.fire({icon:"error",title:"\u522A\u9664\u985E\u5225\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-trash",onClick:d}))}});var le=R(se,[["__scopeId","data-v-3a3dba24"]]);const ae=F({props:{category:null},setup(c){const u=c,n=_("refetchCategories"),d=async()=>{try{const s=u.category,{value:e}=await U.fire({title:"\u7DE8\u8F2F\u985E\u5225",html:`
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
      `,preConfirm:()=>{const r=document.getElementById("swal-expense").checked,l=document.getElementById("swal-name").value,i=document.getElementById("swal-icon").value,f=document.getElementById("swal-photoUrl").value;return l?!i&&!f&&I.showValidationMessage("Icon\u548CPhotoUrl\u6B04\u4F4D\u5FC5\u9808\u64C7\u4E00\u586B\u5BEB\uFF01"):I.showValidationMessage("\u540D\u7A31\u6B04\u4F4D\u5FC5\u586B\uFF01"),{input:{type:r?"\u652F\u51FA":"\u6536\u5165",name:l,icon:i===""?null:i,photoUrl:f===""?null:f}}}});e&&a(e)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await B.category.edit(u.category.id,s.input);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);n(),y.fire({icon:"success",title:`\u6210\u529F\u7DE8\u8F2F\u985E\u5225[${e.data.name}]`})}catch(e){console.error("error",e),y.fire({icon:"error",title:"\u7DE8\u8F2F\u985E\u5225\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-edit ms-2",onClick:d}))}});var oe=R(ae,[["__scopeId","data-v-cd15d4ec"]]);const ce={class:"text-dark mb-3"},ne=z(" \u8A18\u5E33\u985E\u5225 "),ue={class:"nav nav-tabs mb-2"},re={class:"nav-item"},ie={class:"nav-item"},de={class:"scroll"},me={class:"list-group"},pe={key:0,class:"list-group-item d-flex mb-2 border"},ve={class:"col-2"},fe={class:"col-10"},he={class:"text-nowrap text-start ms-3"},_e={class:"align-middle"},ye=F({setup(c){const u=_("categories"),n=_("categoryRPOpen"),d=k("\u652F\u51FA");return(a,s)=>(m(),P(K,{onRPOpen:s[2]||(s[2]=e=>n.value=!1)},{title:O(()=>[t("h5",ce,[ne,x(te)])]),content:O(()=>[t("ul",ue,[t("li",re,[t("span",{class:M(["nav-link",{active:d.value==="\u652F\u51FA"}]),onClick:s[0]||(s[0]=e=>d.value="\u652F\u51FA")},"\u652F\u51FA",2)]),t("li",ie,[t("span",{class:M(["nav-link",{active:d.value==="\u6536\u5165"}]),onClick:s[1]||(s[1]=e=>d.value="\u6536\u5165")},"\u6536\u5165",2)])]),t("div",de,[t("ul",me,[(m(!0),v(S,null,L(g(u),(e,r)=>(m(),v(S,{key:r},[e.type===d.value?(m(),v("li",pe,[t("div",ve,[t("i",{class:M(`${e.icon} fa-2x text-warning`)},null,2)]),t("div",fe,[t("div",he,[t("span",_e,w(e.name),1),x(oe,{category:e,class:"align-middle"},null,8,["category"]),x(le,{class:"ms-2 align-middle",category:e},null,8,["category"])])])])):T("",!0)],64))),128))])])]),_:1}))}});var ge=R(ye,[["__scopeId","data-v-661d09f9"]]);const be=F({setup(c){const u=j(),n=_("refetchExpenses"),d=_("categories"),a=D(()=>{let r='<select class="form-select" id="swal-categoryId">';return d.value.forEach(l=>r+=`<option value="${l.id}">${l.name}</option>`),r+="</select>",r}),s=async()=>{try{const{value:r}=await U.fire({title:"\u65B0\u589E\u8A18\u5E33",html:`
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
      `,preConfirm:()=>{var o;const l=document.getElementById("swal-categoryId").value,i=document.getElementById("swal-item").value,f=document.getElementById("swal-amount").value,C=new Date(document.getElementById("swal-date").value),$=document.getElementById("swal-note").value;return(!i||!f||!C)&&I.showValidationMessage("\u9664\u4E86[\u5099\u8A3B]\uFF0C\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),{input:{UserId:(o=u.currentUser)==null?void 0:o.id,CategoryId:Number(l),item:i,amount:f,note:$,date:C}}}});r&&e(r)}catch(r){console.error("error",r)}},e=async function(r){try{await B.expense.create(r.input),n(),y.fire({icon:"success",title:"\u6210\u529F\u5EFA\u7ACB\u8A18\u5E33\uFF01"})}catch(l){console.error("error",l),y.fire({icon:"error",title:"\u65B0\u589E\u8A18\u5E33\u5931\u6557\uFF01"})}};return(r,l)=>(m(),v("button",{type:"button",class:"btn btn-primary me-3",onClick:s},"\u65B0\u589E\u8A18\u5E33"))}});const Ee=F({props:{expense:null},setup(c){const u=c,n=j(),d=_("refetchExpenses"),a=_("categories"),s=D(()=>{let l='<select class="form-select" id="swal-categoryId">';return a.value.forEach(i=>{i.id===u.expense.Category.id?l+=`<option selected value="${i.id}">${i.name}</option>`:l+=`<option value="${i.id}">${i.name}</option>`}),l+="</select>",l}),e=async()=>{try{const l=u.expense,{value:i}=await U.fire({title:"\u7DE8\u8F2F\u8A18\u5E33",html:`
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
      `,preConfirm:()=>{var E;const f=document.getElementById("swal-categoryId").value,C=document.getElementById("swal-item").value,$=document.getElementById("swal-amount").value,o=new Date(document.getElementById("swal-date").value),p=document.getElementById("swal-note").value;return(!C||!$||!o)&&I.showValidationMessage("\u9664\u4E86[\u5099\u8A3B]\uFF0C\u6240\u6709\u8CC7\u6599\u90FD\u662F\u5FC5\u586B\uFF01"),{input:{UserId:(E=n.currentUser)==null?void 0:E.id,CategoryId:Number(f),item:C,amount:$,note:p,date:o}}}});i&&r(i)}catch(l){console.error("error",l)}},r=async function(l){try{const{data:i}=await B.expense.edit(u.expense.id,l.input);if(i.status!=="success")throw new Error(`[SERVER ERROR] ${i.message}`);d(),y.fire({icon:"success",title:`\u6210\u529F\u7DE8\u8F2F\u8A18\u5E33[${i.data.item}]`})}catch(i){console.error("error",i),y.fire({icon:"error",title:"\u7DE8\u8F2F\u8A18\u5E33\u5931\u6557\uFF01"})}};return(l,i)=>(m(),v("i",{class:"fas fa-edit",onClick:e}))}});var we=R(Ee,[["__scopeId","data-v-49eac3b5"]]);const xe=F({props:{expense:null},setup(c){const u=c,n=_("refetchExpenses"),d=async()=>{try{const{isConfirmed:s}=await U.fire({title:`\u78BA\u5B9A\u522A\u9664\u8A18\u5E33[${u.expense.item}]\u561B\uFF1F`,showCancelButton:!0});s&&a(u.expense.id)}catch(s){console.error("error",s)}},a=async function(s){try{const{data:e}=await B.expense.delete(s);if(e.status!=="success")throw new Error(`[SERVER ERROR] ${e.message}`);n(),y.fire({icon:"success",title:`\u6210\u529F\u522A\u9664\u8A18\u5E33[${e.data.item}]`})}catch(e){console.error("error",e),y.fire({icon:"error",title:"\u522A\u9664\u8A18\u5E33\u5931\u6557\uFF01"})}};return(s,e)=>(m(),v("i",{class:"fas fa-trash",onClick:d}))}});var Fe=R(xe,[["__scopeId","data-v-5dc5c3f6"]]);const Ce={class:"bg-secondary me-3 p-3"},ke={class:"form-check form-switch mb-4"},Be=t("label",{class:"form-check-label",for:"flexSwitchCheckChecked"},"\u5168\u9078",-1),$e=["value","id","checked","onClick"],Ae=["for"],De=F({props:{allCategories:null},setup(c){const u=c,n=k(!0),d=_("categoriesByType"),a=_("categoryFilters"),s=e=>{a.value.includes(e)?a.value.forEach((r,l)=>{if(e===r){a.value.splice(l,1);return}}):a.value.push(e)};return Y(n,()=>{n.value?a.value=u.allCategories:a.value=[]}),(e,r)=>(m(),v("div",Ce,[t("div",ke,[Be,N(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"flexSwitchCheckChecked","onUpdate:modelValue":r[0]||(r[0]=l=>n.value=l)},null,512),[[J,n.value]])]),(m(!0),v(S,null,L(g(d),(l,i)=>(m(),v("div",{class:"form-check mb-2",key:i},[t("input",{class:"form-check-input",type:"checkbox",value:l.id,id:l.name,checked:g(a).includes(l.id),onClick:f=>s(l.id)},null,8,$e),t("label",{class:"form-check-label",for:l.name},w(l.name),9,Ae)]))),128))]))}}),Ie={key:0},Re={class:"d-flex mb-3",style:{width:"100vw"}},Ue={class:"d-flex mb-4",style:{width:"100%"}},Me={class:"mt-4",style:{width:"50px"}},Ve=t("label",{for:"type",style:{float:"left","font-size":"0.7em"}},"TYPE",-1),Se=t("option",{selected:""},"ALL",-1),Pe=t("option",null,"\u652F\u51FA",-1),Oe=t("option",null,"\u6536\u5165",-1),Le=[Se,Pe,Oe],Te={class:"d-flex align-items-center mb-4",style:{width:"100%"}},Ye={class:"badge bg-warning text-dark fs-3"},Ne=t("i",{class:"fas fa-minus mx-2"},null,-1),je={class:"badge bg-success fs-3"},He=t("i",{class:"fas fa-equals mx-2"},null,-1),ze={class:"badge bg-info fs-3"},Je={class:"d-flex align-items-start"},qe={key:0,class:"table table-striped table-success table-hover"},Ge=t("thead",null,[t("tr",{class:"table-light"},[t("th",{scope:"col"},"#"),t("th",{scope:"col"},"#"),t("th",{scope:"col"},"\u985E\u5225"),t("th",{scope:"col"},"\u9805\u76EE"),t("th",{scope:"col"},"\u91D1\u984D"),t("th",{scope:"col"},"\u5099\u8A3B"),t("th",{scope:"col"},"\u65E5\u671F")])],-1),Ke={key:1,class:"img-fluid",src:"https://stickershop.line-scdn.net/stickershop/v1/sticker/208430466/iPhone/sticker_animation@2x.png",alt:"img"},tt=F({setup(c){const u=k(),n=k(),d=k(!1),a=k([]),s=k({searchMode:"\u6708\u4EFD",filter:{year:V().year(),month:V().month()+1,startDate:V().startOf("month").format("YYYY-MM-DD hh:mm:ss"),finishDate:V().endOf("month").format("YYYY-MM-DD hh:mm:ss")}}),e=k("ALL"),r=D(()=>e.value!=="ALL"?n.value.filter(o=>o.type===e.value).map(o=>o.id):n.value.map(o=>o.id)),l=D(()=>e.value==="ALL"?n.value:n.value.filter(o=>o.type===e.value)),i=D(()=>{let o=[];return o=u.value.filter(p=>a.value.includes(p.Category.id)),Z(s.value,o)}),f=D(()=>{let o=0,p=0;return i.value.forEach(E=>{E.Category.type==="\u652F\u51FA"?p+=E.amount:o+=E.amount}),{income:o,expense:p}}),C=async function(){try{const{data:o}=await B.expense.getAll();u.value=o.data}catch(o){console.error("error",o)}},$=async()=>{try{const{data:o}=await B.category.getAll();n.value=o.data,a.value=n.value.map(p=>p.id)}catch(o){console.error("error",o)}};return C(),$(),Y(e,o=>{o!=="ALL"?a.value=n.value.filter(p=>p.type===e.value).map(p=>p.id):a.value=n.value.map(p=>p.id)}),A("refetchExpenses",C),A("refetchCategories",$),A("categories",n),A("categoryFilters",a),A("dateFilterData",s),A("categoryRPOpen",d),A("categoriesByType",l),(o,p)=>{var E;return u.value&&n.value?(m(),v("div",Ie,[t("div",Re,[x(be),t("button",{type:"button",class:"btn btn-warning text-dark",onClick:p[0]||(p[0]=h=>d.value=!0)},"\u67E5\u770B\u985E\u5225")]),t("div",Ue,[t("div",Me,[Ve,N(t("select",{class:"form-select",id:"type","aria-label":"Default select example","onUpdate:modelValue":p[1]||(p[1]=h=>e.value=h)},Le,512),[[q,e.value]])]),t("div",null,[x(X,{style:{width:"250px"}})])]),t("div",Te,[t("span",Ye,"\u6536\u5165 $ "+w(g(f).income),1),Ne,t("span",je,"\u652F\u51FA $ "+w(g(f).expense),1),He,t("span",ze,"$ "+w(g(f).income-g(f).expense),1)]),t("div",Je,[x(De,{allCategories:g(r)},null,8,["allCategories"]),(E=g(i))!=null&&E.length?(m(),v("table",qe,[Ge,t("tbody",null,[(m(!0),v(S,null,L(g(i),(h,H)=>(m(),v("tr",{key:H,class:M(h.Category.type==="\u652F\u51FA"?"table-success":"table-warning")},[t("td",null,[x(we,{expense:h},null,8,["expense"])]),t("td",null,[x(Fe,{expense:h},null,8,["expense"])]),t("td",null,[t("i",{class:M(h.Category.icon)},null,2)]),t("td",null,w(h.item),1),t("td",null,w(h.amount),1),t("td",null,w(h.note),1),t("td",null,w(new Date(h.date).toLocaleDateString()+" "+g(Q)(h.date)),1)],2))),128))])])):(m(),v("img",Ke))]),x(G,{name:"slide-right"},{default:O(()=>[d.value?(m(),P(ge,{key:0})):T("",!0)]),_:1})])):(m(),P(W,{key:1}))}}});export{tt as default};
