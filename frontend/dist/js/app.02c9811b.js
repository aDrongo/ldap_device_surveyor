(function(e){function t(t){for(var r,i,o=t[0],c=t[1],u=t[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(p.length)p.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(s.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},s=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0138":function(e,t,n){"use strict";var r=n("2040"),a=n.n(r);a.a},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},2040:function(e,t,n){},"28d1":function(e,t,n){},3459:function(e,t,n){"use strict";var r=n("28d1"),a=n.n(r);a.a},"34a0":function(e,t,n){"use strict";var r=n("9733"),a=n.n(r);a.a},"507f":function(e,t,n){"use strict";var r=n("f057"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("ac1f"),n("1276"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.loading_devices?[n("div",{staticClass:"d-flex justify-content-center m-5"},[n("b-spinner",{attrs:{large:"",label:"Loading..."}})],1)]:e._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading_devices,expression:"!(loading_devices)"}],key:e.renderKey,staticClass:"main"},[n("NavBar",{attrs:{user:e.user},on:{"scan-all":e.scanAll,"modify-device":e.modifyDevice,"do-login":e.login,"do-logout":e.logout,"modify-user":e.modifyUser,"pause-timer":e.pauseTimer}}),e._l(e.locations,(function(t){return n("div",{key:t,staticClass:"locations"},[n("Location",{attrs:{location:t,locationDevices:e.getLocationDevices(e.devices,t),opened:e.opened},on:{"scan-device":e.scanDevice,"opened-location":e.openedLocation}})],1)}))],2)],2)},s=[],i=(n("d3b7"),n("96cf"),n("1da1")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"navbar navbar-expand-sm bg-dark navbar-dark"},[e._m(0),n("ul",{staticClass:"navbar-nav mr-auto"},[e._m(1),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",on:{click:function(t){return e.$emit("scan-all")}}},[e._v("Scan")])]),e.user?[n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link"},[n("ModifyDevice",{on:{"modify-device":e.modifyDevice,"pause-timer":e.pauseTimer}})],1)]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link"},[n("ModifyUsers",{on:{"modify-user":e.modifyUser,"pause-timer":e.pauseTimer}})],1)]),n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link"},[n("Logs",{on:{"pause-timer":e.pauseTimer}})],1)])]:e._e()],2),n("ul",{staticClass:"navbar-nav"},[n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link"},[n("Login",{attrs:{user:e.user},on:{"do-login":e.login,"do-logout":e.logout,"pause-timer":e.pauseTimer}})],1)])])])},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[n("img",{staticStyle:{width:"40px"},attrs:{src:"https://cdn.nwmsrocks.com/img/3dc41c7.png",alt:"Logo"}})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"#"}},[e._v("Home")])])}],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modify-device"},[n("a",{on:{click:e.show}},[e._v("Modify Device")]),n("b-modal",{ref:"modal",attrs:{id:"modal-modify-device",title:"Modify Device"},on:{show:e.resetModal,hidden:e.hideModal,ok:e.handleOk}},[n("form",{ref:"form",on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[n("b-form-group",{attrs:{state:e.idState,"invalid-feedback":"ID is required"}},[n("b-form-input",{staticClass:"mt-1",attrs:{id:"id-input",state:e.idState,required:""},model:{value:e.id,callback:function(t){e.id=t},expression:"id"}}),n("b-form-radio-group",{staticClass:"mt-1",attrs:{id:"radio-group-1",options:e.options,name:"radio-options"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1)])],1)},l=[],d={name:"ModifyDevice",props:{},data:function(){return{id:"",idState:null,selected:"Add",options:[{text:"Add",value:"Add"},{text:"Remove",value:"Remove"}]}},methods:{show:function(){this.$bvModal.show("modal-modify-device"),this.$emit("pauseTimer",!0)},checkFormValidity:function(){var e=this.$refs.form.checkValidity();return this.idState=e,e},hideModal:function(){this.resetModal(),this.$emit("pauseTimer",!1)},resetModal:function(){this.id="",this.idState=null},handleOk:function(e){e.preventDefault(),this.handleSubmit()},handleSubmit:function(){var e=this;this.checkFormValidity()&&(this.$emit("modify-device",{id:this.id,modify:this.selected}),this.$nextTick((function(){e.$bvModal.hide("modal-modify-device")})))}}},p=d,f=(n("3459"),n("2877")),m=Object(f["a"])(p,u,l,!1,null,"06beacf7",null),v=m.exports,h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modify-user"},[n("a",{on:{click:e.show}},[e._v("Modify User")]),n("b-modal",{ref:"modal",attrs:{id:"modal-modify-user",title:"Modify User"},on:{show:e.resetModal,hidden:e.hideModal,ok:e.handleOk}},[n("b-list-group",e._l(e.users,(function(t){return n("b-list-group-item",{key:t,staticClass:"pointer",on:{click:function(n){return e.select(t)}}},[e._v(" "+e._s(t)+" ")])})),1),n("form",{ref:"form",staticClass:"mt-5",on:{submit:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit(t)}}},[n("b-form-group",{attrs:{state:e.userState}},[n("b-form-radio-group",{staticClass:"mt-1",attrs:{id:"radio-group-1",options:e.options,name:"radio-options"},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),n("b-form-input",{staticClass:"mt-1",attrs:{user:"user-input",placeholder:"username",state:e.userState,required:""},model:{value:e.user,callback:function(t){e.user=t},expression:"user"}}),"Reset Password"==e.selected||"Add User"==e.selected?[n("b-form-input",{staticClass:"mt-1",attrs:{password:"password-input",placeholder:"set password",type:"password",state:e.userState},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})]:e._e()],2)],1)],1)],1)},g=[],b=n("bc3a"),w=n.n(b);w.a.interceptors.request.use((function(e){var t=localStorage.getItem("lds-user-token");return t&&(e.headers["Authorization"]=t),e}),(function(e){return Promise.reject(e)}));var k={getDevices:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/devices");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getDevice:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.a.get("/api/device/"+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0.response),t.abrupt("return",t.t0.response);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},getLocations:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/locations");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},scanDevice:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.a.get("/api/scan/"+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0.response),t.abrupt("return",t.t0.response);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},scanAll:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/scan");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},addDevice:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.a.post("/api/device/"+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0.response),t.abrupt("return",t.t0.response);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},removeDevice:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w.a.delete("/api/device/"+e);case 3:return n=t.sent,t.abrupt("return",n.data);case 7:return t.prev=7,t.t0=t["catch"](0),console.log(t.t0.response),t.abrupt("return",t.t0.response);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})))()},getLogs:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/logs/json");case 3:return t=e.sent,e.abrupt("return",t.data);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},login:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={headers:{username:e,password:t}},a={},n.prev=2,n.next=5,w.a.post("/api/login",a,r);case 5:return s=n.sent,n.abrupt("return",s);case 9:return n.prev=9,n.t0=n["catch"](2),console.log(n.t0.response),n.abrupt("return",n.t0.response);case 13:case"end":return n.stop()}}),n,null,[[2,9]])})))()},checkAuth:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/login");case 3:return t=e.sent,e.abrupt("return",t);case 7:return e.prev=7,e.t0=e["catch"](0),e.abrupt("return",e.t0.response);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getUsers:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.get("/api/users");case 3:return t=e.sent,e.abrupt("return",t);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0.response),e.abrupt("return",e.t0.response);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))()},updateUser:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function n(){var r,a,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r={headers:{username:e,password:t}},a={},n.prev=2,n.next=5,w.a.post("/api/users",a,r);case 5:return s=n.sent,n.abrupt("return",s);case 9:return n.prev=9,n.t0=n["catch"](2),console.log(n.t0.response),n.abrupt("return",n.t0.response);case 13:case"end":return n.stop()}}),n,null,[[2,9]])})))()},removeUser:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={headers:{username:e}},t.prev=1,t.next=4,w.a.delete("/api/users",n);case 4:return r=t.sent,t.abrupt("return",r);case 8:return t.prev=8,t.t0=t["catch"](1),console.log(t.t0.response),t.abrupt("return",t.t0.response);case 12:case"end":return t.stop()}}),t,null,[[1,8]])})))()}},y={name:"ModifyUsers",props:{},data:function(){return{users:null,user:"",password:"",userState:null,selected:"Reset Password",options:[{text:"Reset Password",value:"Reset Password"},{text:"Add",value:"Add User"},{text:"Remove",value:"Remove User"}]}},methods:{show:function(){this.getUsers(),this.$bvModal.show("modal-modify-user"),this.$emit("pauseTimer",!0)},checkFormValidity:function(){var e=this.$refs.form.checkValidity();return this.userState=e,e},resetModal:function(){this.users=null,this.user="",this.password="",this.selected="Reset Password",this.userState=null},hideModal:function(){this.$emit("pauseTimer",!1),this.resetModal()},handleOk:function(e){e.preventDefault(),this.handleSubmit()},handleSubmit:function(){var e=this;this.checkFormValidity()&&(this.$emit("modify-user",{username:this.user,modify:this.selected,password:this.password}),this.$nextTick((function(){e.$bvModal.hide("modal-modify-user")})))},select:function(e){this.user=e},getUsers:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.getUsers();case 2:n=t.sent.data,e.users=n;case 4:case"end":return t.stop()}}),t)})))()}}},x=y,_=(n("80e9"),Object(f["a"])(x,h,g,!1,null,"243ef44e",null)),R=_.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-form"},[null!=e.user&&"null"!=e.user?[n("span",{attrs:{title:"Logout"}},[n("a",{staticClass:"pointer",on:{click:e.logout}},[e._v(e._s(e.user))])])]:e._e(),null==e.user||"null"==e.user?[n("a",{staticClass:"pointer",on:{click:e.show}},[e._v("Login")]),n("b-modal",{ref:"login-modal",attrs:{id:"modal-login",title:"Login"},on:{show:e.resetModal,hidden:e.resetModal,ok:e.handleOk}},[n("form",{ref:"login-form",on:{submit:e.handleSubmit}},[n("b-form-group",{attrs:{state:e.loginState,"invalid-feedback":"Invalid input"}},[n("b-form-input",{staticClass:"mt-1",attrs:{id:"name-input",state:e.loginState,placeholder:"Username",required:""},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}},[e._v("Username ")]),n("b-form-input",{staticClass:"mt-1",attrs:{id:"password-input",type:"password",state:e.loginState,placeholder:"Password",required:""},nativeOn:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleSubmit(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}},[e._v("Password ")])],1)],1)])]:e._e()],2)},O=[],S={name:"Login",props:["user"],data:function(){return{username:"",password:"",loginState:null}},methods:{show:function(){this.$bvModal.show("modal-login"),this.$emit("pauseTimer",!0)},checkFormValidity:function(){var e=this.$refs["login-form"].checkValidity();return this.loginState=e,e},resetModal:function(){this.username="",this.password="",this.loginState=null},handleOk:function(e){e.preventDefault(),this.handleSubmit()},handleSubmit:function(){var e=this;this.checkFormValidity()&&(this.$emit("do-login",{username:this.username,password:this.password}),this.$nextTick((function(){e.$bvModal.hide("modal-login"),e.$emit("pauseTimer",!1)})))},logout:function(){this.$emit("do-logout")}}},C=S,j=(n("34a0"),Object(f["a"])(C,D,O,!1,null,"458307c1",null)),$=j.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal-lg"},[n("a",{on:{click:e.show}},[e._v("Logs")]),n("b-modal",{attrs:{id:"modal-logs",title:"Logs",size:"xl",scrollable:""},on:{hidden:e.hideModal}},[n("pre",{staticClass:"my-4"},[e._v("          "+e._s(e.logs)+"\n      ")])])],1)},L=[],U={name:"Logs",props:{},data:function(){return{logs:""}},methods:{show:function(){this.getLogs(),this.$bvModal.show("modal-logs"),this.$emit("pauseTimer",!0)},getLogs:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.getLogs();case 2:n=t.sent.reverse(),e.logs=JSON.stringify(n,null,2);case 4:case"end":return t.stop()}}),t)})))()},hideModal:function(){this.$emit("pauseTimer",!1)}}},T=U,A=(n("507f"),Object(f["a"])(T,M,L,!1,null,"583561b8",null)),P=A.exports,I={name:"NavBar",components:{ModifyDevice:v,ModifyUsers:R,Login:$,Logs:P},props:["user"],methods:{pauseTimer:function(e){this.$emit("pauseTimer",e)},modifyDevice:function(e){this.$emit("modify-device",e)},modifyUser:function(e){this.$emit("modify-user",e)},login:function(e){this.$emit("do-login",e)},logout:function(){this.$emit("do-logout")}}},N=I,E=Object(f["a"])(N,o,c,!1,null,"f8881844",null),F=E.exports,V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.locationDevices.length>0?[n("div",{staticClass:"Location m-1",attrs:{id:e.location}},[n("div",{staticClass:"row m-2"},[n("div",{staticClass:"col-"},[n("b-button",{on:{click:function(t){return e.$emit("opened-location",e.location)}}},[e._v(" "+e._s(e.location)+" ")])],1),n("div",{staticClass:"col-"},[n("DevicesOverview",{attrs:{locationDevices:e.locationDevices,location:e.location},on:{"scan-device":e.emitScanDevice}})],1)]),n("b-collapse",{attrs:{id:"collapse-"+e.removeSpace(e.location),visible:e.location===e.opened}},[n("Devices",{attrs:{locationDevices:e.locationDevices,location:e.location},on:{"scan-device":e.emitScanDevice}})],1)],1)]:e._e()],2)},B=[],q=(n("5319"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:".table-responsive m-3"},[n("b-table",{attrs:{responsive:"",small:"",striped:"","sort-icon-left":"",hover:"",scrollable:"",items:e.locationDevices,fields:e.fields,"sort-by":e.sortBy,"sort-desc":e.sortDesc,"tbody-tr-class":"pointer","head-variant":"dark"},on:{"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t},"row-clicked":e.clicked}})],1)}),J=[],K={name:"Devices",props:["locationDevices","location"],data:function(){return{sortBy:"ping_code",sortDesc:!0,selectMode:"single",fields:[{key:"ping_code",sortable:!0,label:"Status",tdClass:"ping_code_class",thClass:"thead-dark"},{key:"id",sortable:!0,label:"ID"},{key:"description",sortable:!0,label:"Description"},{key:"group",sortable:!0,label:"Group"},{key:"ip",sortable:!0,label:"IP"},{key:"ping_time",sortable:!0,label:"Latency"},{key:"time_stamp",sortable:!0,label:"Last Checked",formatter:"get_time"},{key:"lastup",sortable:!0,label:"Last Up",formatter:"get_time"},{key:"os",sortable:!0,label:"OS"},{key:"version",sortable:!0,label:"Version"},{key:"attribute1",sortable:!0,label:"Attribute1"},{key:"attribute2",sortable:!0,label:"Attribute2"},{key:"attribute3",sortable:!0,label:"Attribute3"},{key:"attribute4",sortable:!0,label:"Attribute4"},{key:"attribute5",sortable:!0,label:"Attribute5"}]}},methods:{ping_code_class:function(e){return 0==e?"up":1==e?"dns":"down"},get_time:function(e){if(null==e)return"-";var t=Math.round((Date.now()-Date.parse(e+"+0000"))/6e4);return t>=60&&t<1440?t=Math.round(t/60)+"h":t>=1440?t=Math.round(t/60/24)+"d":t+="m",t},clicked:function(e){this.$emit("scan-device",e.id)}}},z=K,H=Object(f["a"])(z,q,J,!1,null,"31ed6c2b",null),G=H.exports,W=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-table-simple",{attrs:{small:""}},[n("b-tr",e._l(e.locationDevices,(function(t){return n("b-td",{key:t.id,class:e.ping_code_class(t.ping_code),attrs:{title:t.id},on:{click:function(n){return n.stopPropagation(),e.clicked(t)}}},[n("div",{staticClass:"overview-td"},[e._v(" "+e._s(t.ping_code)+" ")])])})),1)],1)},Q=[],X={name:"DevicesOverview",props:["locationDevices","location"],methods:{ping_code_class:function(e){return 0==e?"up":1==e?"dns":"down"},clicked:function(e){this.$emit("scan-device",e.id)}}},Y=X,Z=(n("0138"),Object(f["a"])(Y,W,Q,!1,null,"83141470",null)),ee=Z.exports,te={name:"Location",components:{Devices:G,DevicesOverview:ee},props:["locationDevices","location","opened"],methods:{emitScanDevice:function(e){this.$emit("scan-device",e)},removeSpace:function(e){return e.replace(" ","-")}}},ne=te,re=(n("5e9b"),Object(f["a"])(ne,V,B,!1,null,"1a089a38",null)),ae=re.exports,se={name:"App",components:{NavBar:F,Location:ae},data:function(){return{loading_devices:!0,devices:[],loading_locaitons:!0,locations:[],renderKey:0,opened:null,user:null}},methods:{pauseTimer:function(e){e?clearInterval(this.interval):e||(this.interval=setInterval(this.intervalFunc(),6e4))},toast:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t||(t="Notification"),this.$bvToast.toast(e,{title:t,autoHideDelay:3e3})},openedLocation:function(e){this.opened===e?this.opened=null:this.opened=e},getLocationDevices:function(e,t){for(var n=[],r=0;r<e.length;r++)e[r].location==t&&n.push(e[r]);return n.sort((function(e,t){return e.ping_code<t.ping_code?1:-1})),n},logout:function(){this.toast("Logging out "+this.user,"Notification"),this.user=null,localStorage.setItem("lds-user",null),localStorage.setItem("lds-user-token",null)},login:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,k.login(e.username,e.password).then(function(){var n=Object(i["a"])(regeneratorRuntime.mark((function n(r){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:200==r.status?(t.toast("Welcome "+e.username,"Notification"),t.user=e.username,localStorage.setItem("lds-user",e.username),localStorage.setItem("lds-user-token",r.data.token)):401==r.status&&alert("Incorrect Login");case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}());case 2:case"end":return n.stop()}}),n)})))()},scanDevice:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.toast("Scanning "+e,"Notification"),n.next=3,k.scanDevice(e).then(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.refreshData();case 2:t.toast(n[0].id+" is "+t.convertCode(n[0].ping_code),"Notification");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return n.stop()}}),n)})))()},convertCode:function(e){return 0==e?"Up":1==e?"Not Found":2==e?"Down":void 0},scanAll:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.toast("Scanning All","Notification"),t.next=3,k.scanAll().then(Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.refreshData();case 2:e.toast("Scan Completed","Notification");case 3:case"end":return t.stop()}}),t)}))));case 3:case"end":return t.stop()}}),t)})))()},refreshData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.getDevices().then((function(t){e.devices=t})).finally((function(){e.renderKey++}));case 2:case"end":return t.stop()}}),t)})))()},modifyDevice:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("Add"!=e.modify){n.next=5;break}return n.next=3,k.addDevice(e.id).then(Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.scanDevice(e.id);case 2:case"end":return n.stop()}}),n)}))));case 3:n.next=8;break;case 5:if("Remove"!=e.modify){n.next=8;break}return n.next=8,k.removeDevice(e.id).then(Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.refreshData().then((function(){t.toast("Removed "+e.id,"Notification")}));case 2:case"end":return n.stop()}}),n)}))));case 8:case"end":return n.stop()}}),n)})))()},modifyUser:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("Add User"!=e.modify&&"Reset Password"!=e.modify){n.next=5;break}return n.next=3,k.updateUser(e.username,e.password).then((function(n){200==n.status&&t.toast("Completed: "+e.modify+" for "+e.username)}));case 3:n.next=8;break;case 5:if("Remove User"!=e.modify){n.next=8;break}return n.next=8,k.removeUser(e.username).then((function(n){200==n.status&&t.toast("Completed: "+e.modify+" for "+e.username)}));case 8:case"end":return n.stop()}}),n)})))()},intervalFunc:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.checkAuth().then((function(t){210==t.status&&e.user&&"null"!=e.user&&e.logout()}));case 2:return t.next=4,e.refreshData();case 4:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;this.user=localStorage.getItem("lds-user"),k.getDevices().then((function(t){e.devices=t})).finally((function(){e.loading_devices=!1})),k.getLocations().then((function(t){e.locations=t})).finally((function(){e.loading_locations=!1}))},mounted:function(){this.interval=setInterval(this.intervalFunc(),6e4)},beforeDestroy:function(){clearInterval(this.interval)},computed:{show:function(){return!0!==this.loading_devices&&!0!==this.loading_locations}}},ie=se,oe=(n("034f"),Object(f["a"])(ie,a,s,!1,null,null,null)),ce=oe.exports,ue=n("5f5b"),le=n("b1e0");n("f9e3"),n("2dd8");r["default"].use(ue["a"]),r["default"].use(le["a"]),r["default"].config.productionTip=!1,w.a.defaults.baseURL=window.location.origin.split(":")[0]+":"+window.location.origin.split(":")[1]+":5000",console.log(w.a.defaults.baseURL),new r["default"]({render:function(e){return e(ce)}}).$mount("#app")},"5e9b":function(e,t,n){"use strict";var r=n("ec05"),a=n.n(r);a.a},"80e9":function(e,t,n){"use strict";var r=n("d933"),a=n.n(r);a.a},"85ec":function(e,t,n){},9733:function(e,t,n){},d933:function(e,t,n){},ec05:function(e,t,n){},f057:function(e,t,n){}});
//# sourceMappingURL=app.02c9811b.js.map