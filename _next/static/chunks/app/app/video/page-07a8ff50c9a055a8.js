(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[363],{99244:function(e,t,n){"use strict";var s=n(26314);t.Z=void 0;var o=s(n(80984)),r=n(57437),a=(0,o.default)((0,r.jsx)("path",{d:"M7 9v6h4l5 5V4l-5 5H7z"}),"VolumeMute");t.Z=a},80984:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s.createSvgIcon}});var s=n(59897)},89915:function(e,t,n){Promise.resolve().then(n.bind(n,64451))},64451:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return W}});var s=n(57437),o=n(24033),r=n(38173),a=(0,r.Z)((0,s.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5 7-4.5-7-4.5v9z"}),"PlayCircleOutlined"),l=(0,r.Z)((0,s.jsx)("path",{d:"M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"}),"RepeatOutlined"),i=(0,r.Z)((0,s.jsx)("path",{d:"M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),c=(0,r.Z)((0,s.jsx)("path",{d:"m22 9.24-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder"),u=n(85884),d=n(27400),h=n(88444),p=n(39227),f=n(47042),x=n(53741),m=n(65498),g=n(55839),v=n(85269),j=n(22079),w=n(91797),S=n(52151),y=n(67248),b=n(49600),Z=n(23575),C=n(91928),_=n(76096),k=n(90250),z=n(2265),E=n(9399),L=n(36005),P=n(57809),T=n(73666);let O=e=>(0,T.z)({url:"/yt-api/videoInfo",method:"GET",params:{link:"https://www.youtube.com/watch?v=".concat(e)}});var M=n(92173),N=n(20261);let D=e=>M.Z.get("https://dictionaryapi.com/api/v3/references/collegiate/json/".concat(e,"?key=66267610-2d63-4ec3-bd5c-31c9be0519fe")).then(e=>{if(200===e.status){console.log(e.data);let t=e.data;return t.map(e=>e.hwi?{word:e.hwi.hw,prs:e.hwi.prs?I(e.hwi.prs):null,fl:e.fl,shortdef:e.shortdef}:null).filter(e=>!!e)}return null},()=>null),I=e=>{let t=null,n=null;return e.forEach(e=>{if(!n&&e.sound&&e.sound.audio){let t=e.sound.audio,s=t.slice(0,1);0===t.indexOf("bix")?s="bix":0===t.indexOf("gg")?s="gg":/^[.,:!?_]/.test(t)&&(s="number"),n="https://media.merriam-webster.com/audio/prons/en/us/mp3/".concat(s,"/").concat(t,".mp3")}!t&&e.mw&&(t=e.mw)}),{label:t,audio_url:n}};var q=n(60722),Y=n(99244);let B=e=>{let{dictData:t}=e;return(0,s.jsx)(p.Z,{children:t.map((e,t)=>(0,s.jsxs)(p.Z,{sx:{marginTop:"12px"},children:[(0,s.jsx)(v.Z,{fontSize:"18px",fontWeight:"700",children:e.word}),(0,s.jsxs)(v.Z,{fontSize:"14px",fontStyle:"italic",children:[e.fl,"\xa0",e.prs&&e.prs.label?(0,s.jsxs)("span",{children:[".\xa0",e.prs.label,"\xa0"]}):null,e.prs&&e.prs.audio_url&&(0,s.jsx)(Y.Z,{sx:{cursor:"pointer"},onClick:()=>{(0,E.A6)(e.prs.audio_url)}})]}),e.shortdef.map((e,t)=>(0,s.jsx)(v.Z,{fontSize:"14px",fontWeight:"400",children:e},t))]},t))})},A=N.Z.span(e=>({borderRight:"2px dotted #ccc",cursor:"text",paddingLeft:e.atBegin?0:"6px"})),R=e=>(0,s.jsx)(A,{atBegin:e.atBegin,className:"sub-words-space-anchor",children:e.atBegin?"":" "});var W=e=>{var t;let{params:n}=e,r=(0,o.useSearchParams)(),[T,N]=(0,z.useState)(0),[I,Y]=(0,z.useState)("auto"),[A,W]=(0,z.useState)("loading"),[V,F]=(0,z.useState)(!0),[H,G]=(0,z.useState)([]),[K,J]=(0,z.useState)([]),[U,Q]=(0,z.useState)(""),[X,$]=(0,z.useState)([]),[ee,et]=(0,z.useState)(""),[en,es]=(0,z.useState)([]),[eo,er]=(0,z.useState)(null),[ea,el]=(0,z.useState)(!1),[ei,ec]=(0,z.useState)(0);(0,z.useEffect)(()=>{let e=null,t=n=>{n(),e=setTimeout(()=>t(n),1e3)};return eo&&t(()=>{ec(eo.getCurrentTime()),console.log("记录播放器进度中！！")}),()=>{console.log("停止记录播放器进度！！"),clearTimeout(e)}},[eo]),(0,z.useEffect)(()=>{let e=Date.now(),t=t=>{let n=(Date.now()-e)/1e3;localStorage.setItem(P.k,"".concat((0,E.D_)(),"#").concat(n))};return window.addEventListener("pagehide",t,!1),()=>{window.removeEventListener("pagehide",t,!1);let n=(Date.now()-e)/1e3;(0,L.o)(n).then(E.P2,()=>{localStorage.setItem(P.k,"".concat((0,E.D_)(),"#").concat(n))})}},[]),(0,z.useEffect)(()=>{let e=parseFloat(getComputedStyle(document.querySelector("#player")).width);console.log("width of video container--->",e),N(e),Y(9*e/16+"px"),(0,E.Km)().then(e=>{let t=new window.YT.Player("player",{height:"360",width:"640",videoId:n.id,playerVars:{autoplay:0,modestbranding:1,enablejsapi:1,color:"white",wmode:"opaque"},events:{onReady:e=>{let n=t.getVideoData();"/app/playlist"===r.get("last_page")||(0,L.nC)({title:n.title,id:n.video_id}).catch(E.P2),er(t)},onStateChange:e=>{}}})})},[n.id,r]);let[eu,ed]=(0,z.useState)(null),[eh,ep]=(0,z.useState)(!1),[ef,ex]=(0,z.useState)([]);(0,z.useEffect)(()=>{console.log("dictionary-data",ef)},[ef]),(0,z.useEffect)(()=>{O(n.id).then(e=>{if(200===e.status){let t=e.data.automatic_captions,n=e.data.subtitles;if(!t&&0==Object.keys(t).length&&!n&&0==Object.keys(n).length){console.log("没字幕");return}let s=[],o=[],r=Object.assign(t,n);Object.keys(r).forEach(e=>{let t=r[e].find(e=>"json3"===e.ext);t&&("en"===e||0===e.indexOf("en-")?s.push(t):o.push(t))}),G(s),J(o)}},E.P2).finally(()=>{})},[n.id]),(0,z.useEffect)(()=>{M.Z.get(ee).then(e=>{200===e.status&&es(e.data.events)})},[ee]),(0,z.useEffect)(()=>{H.length>0&&M.Z.get(H[0].url).then(e=>{200===e.status&&$(e.data.events)}).finally(()=>W("loaded"))},[H]),(0,z.useEffect)(()=>{var e,t;document.body.style.userSelect="none",document.querySelector(".sub-container").style.userSelect="text";let n=e=>{let t=e.target;if(t.classList.contains("sub-words-space-anchor")){var n;null===(n=document.querySelector(".sub-container"))||void 0===n||n.classList.add("user-selecting")}},s=e=>{var t,n,s;let o=null===(n=document.getSelection())||void 0===n?void 0:null===(t=n.toString())||void 0===t?void 0:t.trim();o&&(ek(!0),eE(o),null===(s=document.getSelection())||void 0===s||s.empty())};return null===(e=document.querySelector(".sub-container"))||void 0===e||e.addEventListener("mousedown",n),null===(t=document.querySelector(".sub-container"))||void 0===t||t.addEventListener("mouseup",s),()=>{var e,t;document.body.style.userSelect="auto",null===(e=document.querySelector(".sub-container"))||void 0===e||e.removeEventListener("mousedown",n),null===(t=document.querySelector(".sub-container"))||void 0===t||t.removeEventListener("mouseup",s)}},[]);let[em,eg]=(0,z.useState)(null),ev=(e,t,n)=>{let s=()=>{e.seekTo(t),e.playVideo()};s();let o=setInterval(()=>{e.getCurrentTime()>=n&&s()},300);eg(o)},ej=(0,z.useMemo)(()=>()=>{clearInterval(em)},[em]),[ew,eS]=(0,z.useState)([]);(0,z.useEffect)(()=>{(0,q.Ci)().then(e=>{200===e.status&&eS(e.data.Items.map(e=>e.content))},E.P2)},[]);let[ey,eb]=(0,z.useState)(!1),[eZ,eC]=(0,z.useState)("success"),[e_,ek]=(0,z.useState)(!1),[ez,eE]=(0,z.useState)("hand tools"),[eL,eP]=(0,z.useState)("ready"),[eT,eO]=(0,z.useState)([]),eM=(0,z.useMemo)(()=>()=>{ek(!1),eP("ready"),eE(""),eO([])},[]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(u.Z,{container:!0,spacing:2,sx:{width:"100%"},children:[(0,s.jsx)(u.Z,{xs:8,children:(0,s.jsx)("div",{id:"player",style:{width:"100%",height:I}})}),(0,s.jsxs)(u.Z,{xs:4,sx:{height:"calc(100vh - 64px)"},children:[(0,s.jsx)(d.Z,{control:(0,s.jsx)(h.Z,{size:"small",checked:V,onChange:e=>{F(e.target.checked)},inputProps:{"aria-label":"controlled"}}),label:V?"close captions":"open captions"}),(0,s.jsxs)(p.Z,{className:"sub-container",sx:{height:"calc(100% - 60px)",overflowY:"auto"},children:["loading"===A&&(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[(0,s.jsx)(f.Z,{}),(0,s.jsx)("span",{children:"loading captions..."})]}),"loaded"===A&&V&&X.map((e,t)=>{let n=t===X.length-1,o=!e.segs||0===e.segs.map(e=>e.utf8.trim()).join().length,r=1e3*ei>=e.tStartMs&&(n||1e3*ei<X[t+1].tStartMs);return o?null:(0,s.jsxs)(p.Z,{className:"flex flex-row items-center sub-row ".concat(r?"active":""),children:[(0,s.jsx)(p.Z,{sx:{maxWidth:"calc(100% - 46px)",wordWrap:"break-word"},children:e.segs.map((e,n)=>{let o=e.utf8.match(/([\w'",.]+[.,]?)/g)||[],r=e.utf8.trim();return 1==o.length?(0,s.jsxs)("span",{children:[(0,s.jsx)(R,{atBegin:0===n}),(0,s.jsx)("span",{onClick:e=>{ed(e.currentTarget),ep(!0),D(e.currentTarget.textContent).then(e=>{e&&ex(e)}).finally(()=>{ep(!1)})},className:"sub-word ".concat(ew.includes(r.toLowerCase())?"marked":""),children:r},t)]},n):o.map((e,o)=>(0,s.jsxs)("span",{children:[(0,s.jsx)(R,{atBegin:0===n&&0===o}),(0,s.jsx)("span",{onClick:e=>{ed(e.currentTarget),ep(!0),D(e.currentTarget.textContent).then(e=>{e&&ex(e)}).finally(()=>{ep(!1)})},className:"sub-word ".concat(ew.includes(e.toLowerCase())?"marked":""),children:e},t)]},o))})}),(0,s.jsxs)(p.Z,{className:"flex flex-row w-11 sub-row-icons",children:[(0,s.jsx)(x.Z,{title:"Play from here",placement:"top-start",children:(0,s.jsx)(a,{onClick:()=>{if(eo){let t=e.tStartMs/1e3;eo.seekTo(t,!0),eo.playVideo()}},sx:{cursor:"pointer",marginRight:"4px"},fontSize:"small"})}),(0,s.jsx)(x.Z,{title:"Play repeatedly",placement:"top-start",children:(0,s.jsx)(l,{onClick:()=>{if(eo){let t=e.tStartMs/1e3,n=(e.tStartMs+e.segs[e.segs.length-1].tOffsetMs)/1e3;ev(eo,t,n),el(!0)}},sx:{cursor:"pointer"},fontSize:"small"})})]})]},t)})]})]})]}),(0,s.jsx)(m.Z,{sx:{color:"#fff",fontSize:"18px",zIndex:e=>e.zIndex.drawer+1},open:ea,onClick:()=>{el(!1),ej()},children:"You are in repeat mode, press anywhere to exit！"}),(0,s.jsx)(g.ZP,{open:!!eu,anchorReference:"anchorPosition",anchorPosition:{top:65,left:200+T-340},onClose:()=>ed(null),children:(0,s.jsxs)(p.Z,{sx:{width:"340px",padding:"6px",maxHeight:"500px"},children:[eh&&"Searching...",!eh&&0===ef.length&&"No results",!eh&&ef.length>0&&(0,s.jsxs)(p.Z,{children:[(0,s.jsxs)(p.Z,{className:"flex flex-row justify-between items-center",sx:{borderBottom:"1px solid #ccc",paddingBottom:"8px"},children:[(0,s.jsx)(v.Z,{fontSize:"28px",fontWeight:"700",children:null==eu?void 0:null===(t=eu.textContent)||void 0===t?void 0:t.trim()}),ew.indexOf(null==eu?void 0:eu.textContent.trim().toLowerCase())>-1?(0,s.jsx)(x.Z,{title:"Remove from Notebook",placement:"top-start",children:(0,s.jsx)(i,{onClick:()=>{var e;let t=null==eu?void 0:null===(e=eu.textContent)||void 0===e?void 0:e.trim().toLowerCase();(0,q.gW)(t).then(e=>{200===e.status&&(eb(!0),eC("success"),eS(e=>{let n=Object.assign([],e);return n.splice(n.indexOf(t),1),n}))},e=>{eb(!0),eC("error")})},sx:{cursor:"pointer"}})}):(0,s.jsx)(x.Z,{title:"Save to Notebook",placement:"top-start",children:(0,s.jsx)(c,{onClick:()=>{var e;let t=null==eu?void 0:null===(e=eu.textContent)||void 0===e?void 0:e.trim().toLowerCase();(0,q.tK)(t,{dict_type:"webster",dict_data:ef}).then(e=>{200===e.status&&(eb(!0),eC("success"),eS(e=>{let n=Object.assign([],e);return n.unshift(t),n}))},e=>{eb(!0),eC("error")})},sx:{cursor:"pointer"}})})]}),(0,s.jsx)(B,{dictData:ef})]})]})}),(0,s.jsxs)(j.Z,{open:e_,children:[(0,s.jsx)(w.Z,{children:"Phrase & Expression"}),(0,s.jsx)(S.Z,{children:(0,s.jsxs)(p.Z,{sx:{width:"500px"},children:[(0,s.jsxs)(p.Z,{children:[(0,s.jsx)(y.Z,{value:ez,onChange:e=>{eE(e.target.value),eP("ready")},autoFocus:!0,variant:"standard"}),(0,s.jsx)(b.Z,{sx:{marginLeft:"18px"},size:"small",variant:"outlined",onClick:e=>{eP("loading"),D(ez).then(e=>{e&&eO(e)}).finally(()=>eP("loaded"))},children:"Search"}),"loaded"===eL&&eT.length&&(0,s.jsx)(b.Z,{component:"label",sx:{marginLeft:"18px"},variant:"contained",startIcon:(0,s.jsx)(c,{}),size:"small",onClick:()=>{let e=ez.trim().toLowerCase();if(!ez){alert("Please enter valid phrase");return}eM(),(0,q.tK)(e,{dict_type:"webster",dict_data:eT}).then(t=>{200===t.status&&(eb(!0),eC("success"),eS(t=>{let n=Object.assign([],t);return n.unshift(e),n}))},e=>{eb(!0),eC("error")})},children:"Save it"})]}),"loading"===eL&&"loading data...","loaded"===eL&&0===eT.length&&(0,s.jsxs)(Z.Z,{className:"mt-4",children:["No results for"," ",(0,s.jsx)(v.Z,{component:"span",fontStyle:"italic",children:ez}),", Please try something else"]}),(0,s.jsx)(B,{dictData:eT})]})}),(0,s.jsx)(C.Z,{children:(0,s.jsx)(b.Z,{onClick:eM,children:"Close"})})]}),(0,s.jsx)(_.Z,{open:ey,autoHideDuration:2e3,onClose:()=>eb(!1),children:(0,s.jsx)(k.Z,{onClose:()=>eb(!1),severity:eZ,sx:{width:"100%"},children:"success"===eZ?"Operation completed":"operation failed"})})]})}},60722:function(e,t,n){"use strict";n.d(t,{Ci:function(){return o},gW:function(){return a},tK:function(){return r}});var s=n(73666);let o=()=>(0,s.z)({url:"/notebook/query",method:"GET"}),r=(e,t)=>(0,s.z)({url:"/notebook/create_delete",method:"POST",data:{content:e,dict_object:t}}),a=e=>(0,s.z)({url:"/notebook/create_delete",method:"DELETE",data:{content:e}})},73666:function(e,t,n){"use strict";n.d(t,{z:function(){return a}});var s,o=n(57809),r=n(92173);let a=r.Z.create({baseURL:"https://9gc3ha01gb.execute-api.us-east-1.amazonaws.com/dev",timeout:6e4,headers:{"Content-Type":"Application/json","auth-header":null===(s=JSON.parse(localStorage.getItem(o.j)||"null"))||void 0===s?void 0:s.id_token}});a.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),a.interceptors.response.use(function(e){return e},function(e){return console.log(e),e&&e.response&&401===e.response.status&&(location.href="https://ytenglishhub.auth.us-east-1.amazoncognito.com/login?client_id=7id87glt4q3pl65c29ghqu3ff3&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprepare"),200!=e.response.status&&console.error(e),Promise.reject(e)})},36005:function(e,t,n){"use strict";n.d(t,{MO:function(){return i},O3:function(){return r},TY:function(){return c},nC:function(){return a},o:function(){return l}});var s=n(9399),o=n(73666);let r=()=>(0,o.z)({url:"/video/watch_list",method:"GET"}),a=e=>(0,o.z)({url:"/video/watch_list",method:"POST",data:e}),l=(e,t)=>(0,o.z)({url:"/user/watch_time",method:"POST",data:{watch_time:e,date:t||(0,s.D_)()}}),i=()=>(0,o.z)({url:"/user/watch_time",method:"GET"}),c=()=>(0,o.z)({url:"/notebook/query",method:"GET"})},57809:function(e,t,n){"use strict";n.d(t,{j:function(){return s},k:function(){return o}});let s="YTEnglish-S-Auth",o="".concat("YTEnHub","_CachedWatchTime")},9399:function(e,t,n){"use strict";n.d(t,{A6:function(){return i},D_:function(){return l},Km:function(){return r},P2:function(){return a}});var s=n(74548),o=n.n(s);let r=()=>new Promise(e=>{let t=setInterval(()=>{window.YTIframeAPIReady&&(clearInterval(t),e(!0))},300)}),a=()=>{},l=e=>o()(e?new Date(e):new Date).format("YYYY-MM-DD"),i=e=>{let t=new Audio;t.src=e,t.play()}},24033:function(e,t,n){e.exports=n(50094)},26314:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}},function(e){e.O(0,[683,589,57,648,434,20,175,971,472,744],function(){return e(e.s=89915)}),_N_E=e.O()}]);