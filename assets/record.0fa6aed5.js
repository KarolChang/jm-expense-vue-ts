import{a as r}from"./index.ce021ef5.js";var l={getAll(){return r.get("/record/all")},getOne(e){return r.get(`/record/${e}`)},create(e){return r.post("/record/create",e)},edit(e,t){return r.put(`/record/edit/${e}`,t)},delete(e){return r.delete(`/record/delete/${e}`)},close(e){return r.put("/close",e)},getLogs(){return r.get("/log/all")}};export{l as r};