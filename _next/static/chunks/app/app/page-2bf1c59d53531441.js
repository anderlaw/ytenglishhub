(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[191],{67098:function(e,t,n){Promise.resolve().then(n.bind(n,13280))},13280:function(e,t,n){"use strict";n.r(t);var o=n(57437),r=n(2265),a=n(21100),i=n(64742),s=n(24033),u=n(85269),c=n(39227),l=n(67248),d=n(49600),h=n(57809),p=n(9399),_=n(36005);t.default=(0,a.Pi)(function(){let[e,t]=(0,r.useState)(!0),[n,a]=(0,r.useState)([]);(0,r.useEffect)(()=>{try{let e=localStorage.getItem(h.k),t=e.split("#")[0],n=Number(e.split("#")[1]);n&&t&&(0,_.o)(n,t).then(()=>{localStorage.removeItem(h.k)},()=>{localStorage.setItem(h.k,"".concat((0,p.D_)(),"#").concat(n))})}catch(e){}},[]),(0,r.useContext)(i.xf);let g=(0,s.useRouter)(),[f,m]=(0,r.useState)("video"),[S,k]=(0,r.useState)("");return(0,o.jsx)("div",{children:(0,o.jsxs)("div",{className:"flex flex-col mt-40 container items-center",children:[(0,o.jsx)(u.Z,{color:"text.primary",fontSize:30,fontWeight:500,fontStyle:"italic",sx:{WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",WebkitBoxDecorationBreak:"clone",backgroundImage:"linear-gradient(to left, #cf22ee 0%, #34a4f2 100%)"},children:"Welcome To YTEnglishHub.com"}),(0,o.jsxs)(c.Z,{className:"flex justify-between items-center mt-14 gap-10",children:[(0,o.jsx)(l.Z,{placeholder:"Please Enter A Youtube Video URL Address",variant:"standard",sx:{width:"500px"},value:S,onChange:e=>k(e.target.value)}),(0,o.jsx)(d.Z,{variant:"outlined",size:"small",onClick:()=>{try{let e=new URL(S),t=e.searchParams.get("v");g.push("/app/video/"+t)}catch(e){alert("请输入有效的视频链接")}},children:"Get Started"})]})]})})})},73666:function(e,t,n){"use strict";n.d(t,{z:function(){return i}});var o,r=n(57809),a=n(92173);let i=a.Z.create({baseURL:"https://9gc3ha01gb.execute-api.us-east-1.amazonaws.com/dev",timeout:6e4,headers:{"Content-Type":"Application/json","auth-header":null===(o=JSON.parse(localStorage.getItem(r.j)||"null"))||void 0===o?void 0:o.id_token}});i.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),i.interceptors.response.use(function(e){return e},function(e){return console.log(e),e&&e.response&&401===e.response.status&&(location.href="https://ytenglishhub.auth.us-east-1.amazoncognito.com/login?client_id=7id87glt4q3pl65c29ghqu3ff3&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprepare"),200!=e.response.status&&console.error(e),Promise.reject(e)})},36005:function(e,t,n){"use strict";n.d(t,{MO:function(){return u},O3:function(){return a},TY:function(){return c},nC:function(){return i},o:function(){return s}});var o=n(9399),r=n(73666);let a=()=>(0,r.z)({url:"/video/watch_list",method:"GET"}),i=e=>(0,r.z)({url:"/video/watch_list",method:"POST",data:e}),s=(e,t)=>(0,r.z)({url:"/user/watch_time",method:"POST",data:{watch_time:e,date:t||(0,o.D_)()}}),u=()=>(0,r.z)({url:"/user/watch_time",method:"GET"}),c=()=>(0,r.z)({url:"/notebook/query",method:"GET"})},64742:function(e,t,n){"use strict";n.d(t,{xf:function(){return c},Ux:function(){return u}});var o=n(2265),r=n(24256);class a{get getLoginStatus(){return this.loginStatus}updateUserInfo(e){this.userInfo=e}updateLoginStatus(e){this.loginStatus=e}constructor(){this.userInfo={email:"",photoURL:"",username:""},this.loginStatus=!1,(0,r.ky)(this)}}let i=new a;class s{get addURLDialog_open(){return this._addURLDialog_open}update_addURLDialog_open(e){this._addURLDialog_open=e}get categoryDialog_open(){return this._categoryDialog_open}update_categoryDialog_open(e){this._categoryDialog_open=e}get fullScreenLoading_open(){return this._fullsScreenLoading_open}update_fullsScreenLoading_open(e){this._fullsScreenLoading_open=e}get category_list(){return this._category_list}update_category_list(e){this._category_list=e}get snackBar_open(){return this._snackBar_open}update_snackBar_open(e){this._snackBar_open=e}constructor(){this._addURLDialog_open=!1,this._categoryDialog_open=!1,this._fullsScreenLoading_open=!1,this._category_list=[],this._snackBar_open=!1,(0,r.ky)(this),this.userStore=i}}let u=new s,c=(0,o.createContext)(u)},57809:function(e,t,n){"use strict";n.d(t,{j:function(){return o},k:function(){return r}});let o="YTEnglish-S-Auth",r="".concat("YTEnHub","_CachedWatchTime")},9399:function(e,t,n){"use strict";n.d(t,{A6:function(){return u},D_:function(){return s},Km:function(){return a},P2:function(){return i}});var o=n(74548),r=n.n(o);let a=()=>new Promise(e=>{let t=setInterval(()=>{window.YTIframeAPIReady&&(clearInterval(t),e(!0))},300)}),i=()=>{},s=e=>r()(e?new Date(e):new Date).format("YYYY-MM-DD"),u=e=>{let t=new Audio;t.src=e,t.play()}}},function(e){e.O(0,[147,683,589,57,648,89,971,472,744],function(){return e(e.s=67098)}),_N_E=e.O()}]);