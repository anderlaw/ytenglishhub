(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[947],{39227:function(e,t,n){"use strict";var r=n(28480),i=n(25097),o=n(16778),a=n(53469),l=n(84040);let u=(0,o.Z)(),c=(0,r.Z)({themeId:a.Z,defaultTheme:u,defaultClassName:l.Z.root,generateClassName:i.Z.generate});t.Z=c},84040:function(e,t,n){"use strict";var r=n(26520);let i=(0,r.Z)("MuiBox",["root"]);t.Z=i},85884:function(e,t,n){"use strict";n.d(t,{Z:function(){return R}});var r=n(13428),i=n(20791),o=n(2265),a=n(57042),l=n(95600),u=n(25702),c=n(8051),s=n(39190),d=n(48153),p=n(95270),f=n(43381),m=n(5825);let v=(e,t)=>e.filter(e=>t.includes(e)),h=(e,t,n)=>{let r=e.keys[0];if(Array.isArray(t))t.forEach((t,r)=>{n((t,n)=>{r<=e.keys.length-1&&(0===r?Object.assign(t,n):t[e.up(e.keys[r])]=n)},t)});else if(t&&"object"==typeof t){let i=Object.keys(t).length>e.keys.length?e.keys:v(e.keys,Object.keys(t));i.forEach(i=>{if(-1!==e.keys.indexOf(i)){let o=t[i];void 0!==o&&n((t,n)=>{r===i?Object.assign(t,n):t[e.up(i)]=n},o)}})}else("number"==typeof t||"string"==typeof t)&&n((e,t)=>{Object.assign(e,t)},t)};function g(e){return e?`Level${e}`:""}function b(e){return e.unstable_level>0&&e.container}function w(e){return function(t){return`var(--Grid-${t}Spacing${g(e.unstable_level)})`}}function x(e){return function(t){return 0===e.unstable_level?`var(--Grid-${t}Spacing)`:`var(--Grid-${t}Spacing${g(e.unstable_level-1)})`}}function y(e){return 0===e.unstable_level?"var(--Grid-columns)":`var(--Grid-columns${g(e.unstable_level-1)})`}let $=({theme:e,ownerState:t})=>{let n=w(t),r={};return h(e.breakpoints,t.gridSize,(e,i)=>{let o={};!0===i&&(o={flexBasis:0,flexGrow:1,maxWidth:"100%"}),"auto"===i&&(o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}),"number"==typeof i&&(o={flexGrow:0,flexBasis:"auto",width:`calc(100% * ${i} / ${y(t)}${b(t)?` + ${n("column")}`:""})`}),e(r,o)}),r},_=({theme:e,ownerState:t})=>{let n={};return h(e.breakpoints,t.gridOffset,(e,r)=>{let i={};"auto"===r&&(i={marginLeft:"auto"}),"number"==typeof r&&(i={marginLeft:0===r?"0px":`calc(100% * ${r} / ${y(t)})`}),e(n,i)}),n},Z=({theme:e,ownerState:t})=>{if(!t.container)return{};let n=b(t)?{[`--Grid-columns${g(t.unstable_level)}`]:y(t)}:{"--Grid-columns":12};return h(e.breakpoints,t.columns,(e,r)=>{e(n,{[`--Grid-columns${g(t.unstable_level)}`]:r})}),n},S=({theme:e,ownerState:t})=>{if(!t.container)return{};let n=x(t),r=b(t)?{[`--Grid-rowSpacing${g(t.unstable_level)}`]:n("row")}:{};return h(e.breakpoints,t.rowSpacing,(n,i)=>{var o;n(r,{[`--Grid-rowSpacing${g(t.unstable_level)}`]:"string"==typeof i?i:null==(o=e.spacing)?void 0:o.call(e,i)})}),r},j=({theme:e,ownerState:t})=>{if(!t.container)return{};let n=x(t),r=b(t)?{[`--Grid-columnSpacing${g(t.unstable_level)}`]:n("column")}:{};return h(e.breakpoints,t.columnSpacing,(n,i)=>{var o;n(r,{[`--Grid-columnSpacing${g(t.unstable_level)}`]:"string"==typeof i?i:null==(o=e.spacing)?void 0:o.call(e,i)})}),r},k=({theme:e,ownerState:t})=>{if(!t.container)return{};let n={};return h(e.breakpoints,t.direction,(e,t)=>{e(n,{flexDirection:t})}),n},O=({ownerState:e})=>{let t=w(e),n=x(e);return(0,r.Z)({minWidth:0,boxSizing:"border-box"},e.container&&(0,r.Z)({display:"flex",flexWrap:"wrap"},e.wrap&&"wrap"!==e.wrap&&{flexWrap:e.wrap},{margin:`calc(${t("row")} / -2) calc(${t("column")} / -2)`},e.disableEqualOverflow&&{margin:`calc(${t("row")} * -1) 0px 0px calc(${t("column")} * -1)`}),(!e.container||b(e))&&(0,r.Z)({padding:`calc(${n("row")} / 2) calc(${n("column")} / 2)`},(e.disableEqualOverflow||e.parentDisableEqualOverflow)&&{padding:`${n("row")} 0px 0px ${n("column")}`}))},E=e=>{let t=[];return Object.entries(e).forEach(([e,n])=>{!1!==n&&void 0!==n&&t.push(`grid-${e}-${String(n)}`)}),t},G=(e,t="xs")=>{function n(e){return void 0!==e&&("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e&&e>0)}if(n(e))return[`spacing-${t}-${String(e)}`];if("object"==typeof e&&!Array.isArray(e)){let t=[];return Object.entries(e).forEach(([e,r])=>{n(r)&&t.push(`spacing-${e}-${String(r)}`)}),t}return[]},q=e=>void 0===e?[]:"object"==typeof e?Object.entries(e).map(([e,t])=>`direction-${e}-${t}`):[`direction-xs-${String(e)}`];var N=n(57437);let C=["className","children","columns","container","component","direction","wrap","spacing","rowSpacing","columnSpacing","disableEqualOverflow","unstable_level"],P=(0,m.Z)(),T=(0,s.Z)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>t.root});function z(e){return(0,d.Z)({props:e,name:"MuiGrid",defaultTheme:P})}var A=n(35843),M=n(87927);let D=function(e={}){let{createStyledComponent:t=T,useThemeProps:n=z,componentName:s="MuiGrid"}=e,d=o.createContext(void 0),m=(e,t)=>{let{container:n,direction:r,spacing:i,wrap:o,gridSize:a}=e,c={root:["root",n&&"container","wrap"!==o&&`wrap-xs-${String(o)}`,...q(r),...E(a),...n?G(i,t.breakpoints.keys[0]):[]]};return(0,l.Z)(c,e=>(0,u.Z)(s,e),{})},v=t(Z,j,S,$,k,O,_),h=o.forwardRef(function(e,t){var l,u,s,h,g,b,w,x;let y=(0,p.Z)(),$=n(e),_=(0,f.Z)($),Z=o.useContext(d),{className:S,children:j,columns:k=12,container:O=!1,component:E="div",direction:G="row",wrap:q="wrap",spacing:P=0,rowSpacing:T=P,columnSpacing:z=P,disableEqualOverflow:A,unstable_level:M=0}=_,D=(0,i.Z)(_,C),R=A;M&&void 0!==A&&(R=e.disableEqualOverflow);let I={},Y={},W={};Object.entries(D).forEach(([e,t])=>{void 0!==y.breakpoints.values[e]?I[e]=t:void 0!==y.breakpoints.values[e.replace("Offset","")]?Y[e.replace("Offset","")]=t:W[e]=t});let B=null!=(l=e.columns)?l:M?void 0:k,F=null!=(u=e.spacing)?u:M?void 0:P,L=null!=(s=null!=(h=e.rowSpacing)?h:e.spacing)?s:M?void 0:T,H=null!=(g=null!=(b=e.columnSpacing)?b:e.spacing)?g:M?void 0:z,J=(0,r.Z)({},_,{level:M,columns:B,container:O,direction:G,wrap:q,spacing:F,rowSpacing:L,columnSpacing:H,gridSize:I,gridOffset:Y,disableEqualOverflow:null!=(w=null!=(x=R)?x:Z)&&w,parentDisableEqualOverflow:Z}),K=m(J,y),U=(0,N.jsx)(v,(0,r.Z)({ref:t,as:E,ownerState:J,className:(0,a.Z)(K.root,S)},W,{children:o.Children.map(j,e=>{if(o.isValidElement(e)&&(0,c.Z)(e,["Grid"])){var t;return o.cloneElement(e,{unstable_level:null!=(t=e.props.unstable_level)?t:M+1})}return e})}));return void 0!==R&&R!==(null!=Z&&Z)&&(U=(0,N.jsx)(d.Provider,{value:R,children:U})),U});return h.muiName="Grid",h}({createStyledComponent:(0,A.ZP)("div",{name:"MuiGrid2",slot:"Root",overridesResolver:(e,t)=>t.root}),componentName:"MuiGrid2",useThemeProps:e=>(0,M.Z)({props:e,name:"MuiGrid2"})});var R=D},39190:function(e,t,n){"use strict";var r=n(61047);let i=(0,r.ZP)();t.Z=i},30280:function(e,t,n){Promise.resolve().then(n.bind(n,96644))},96644:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(57437),i=n(85884),o=n(39227),a=n(85269),l=n(2265),u=n(24033);let c=e=>{let{id:t,title:n,thumbnail:i}=e,c=(0,u.useRouter)(),[s,d]=(0,l.useState)("");return(0,l.useEffect)(()=>{let e=document.createElement("img");e.onload=n=>{120===e.width&&90===e.height?d("https://img.youtube.com/vi/".concat(t,"/hqdefault.jpg")):d("https://img.youtube.com/vi/".concat(t,"/hq720.jpg"))},e.src="https://img.youtube.com/vi/".concat(t,"/hq720.jpg")},[t]),(0,r.jsxs)(o.Z,{sx:{maxWidth:345,cursor:"pointer"},onClick:()=>{c.push("/app/video?video_id=".concat(t,"&last_page=").concat(location.pathname))},children:[(0,r.jsx)(o.Z,{sx:{borderRadius:"6px",marginBottom:"20px",overflow:"hidden",position:"relative",zIndex:-1},children:(0,r.jsx)("img",{src:s,width:"100%",alt:"video's thumbnail"})}),(0,r.jsx)(a.Z,{gutterBottom:!0,variant:"body1",component:"h3",children:n})]})};var s=n(36005);function d(){let[e,t]=(0,l.useState)([]);return(0,l.useEffect)(()=>{(0,s.O3)().then(e=>{200===e.status&&t(e.data.Items||[])}).catch(e=>{console.log(e)})},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(i.Z,{container:!0,spacing:2,paddingX:2,sx:{width:"100%"},children:e.map(e=>(0,r.jsx)(i.Z,{xs:3,children:(0,r.jsx)(c,{...e})},e.id))})})}},73666:function(e,t,n){"use strict";n.d(t,{z:function(){return a}});var r,i=n(57809),o=n(92173);let a=o.Z.create({baseURL:"https://9gc3ha01gb.execute-api.us-east-1.amazonaws.com/dev",timeout:6e4,headers:{"Content-Type":"Application/json","auth-header":null===(r=JSON.parse(localStorage.getItem(i.j)||"null"))||void 0===r?void 0:r.id_token}});a.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),a.interceptors.response.use(function(e){return e},function(e){return console.log(e),e&&e.response&&401===e.response.status&&(location.href="https://ytenglishhub.auth.us-east-1.amazoncognito.com/login?client_id=7id87glt4q3pl65c29ghqu3ff3&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprepare"),200!=e.response.status&&console.error(e),Promise.reject(e)})},36005:function(e,t,n){"use strict";n.d(t,{MO:function(){return u},O3:function(){return o},TY:function(){return c},nC:function(){return a},o:function(){return l}});var r=n(9399),i=n(73666);let o=()=>(0,i.z)({url:"/video/watch_list",method:"GET"}),a=e=>(0,i.z)({url:"/video/watch_list",method:"POST",data:e}),l=(e,t)=>(0,i.z)({url:"/user/watch_time",method:"POST",data:{watch_time:e,date:t||(0,r.D_)()}}),u=()=>(0,i.z)({url:"/user/watch_time",method:"GET"}),c=()=>(0,i.z)({url:"/notebook/query",method:"GET"})},57809:function(e,t,n){"use strict";n.d(t,{j:function(){return r},k:function(){return i}});let r="YTEnglish-S-Auth",i="".concat("YTEnHub","_CachedWatchTime")},9399:function(e,t,n){"use strict";n.d(t,{A6:function(){return u},D_:function(){return l},Km:function(){return o},P2:function(){return a}});var r=n(74548),i=n.n(r);let o=()=>new Promise(e=>{let t=setInterval(()=>{window.YTIframeAPIReady&&(clearInterval(t),e(!0))},300)}),a=()=>{},l=e=>i()(e?new Date(e):new Date).format("YYYY-MM-DD"),u=e=>{let t=new Audio;t.src=e,t.play()}},24033:function(e,t,n){e.exports=n(50094)}},function(e){e.O(0,[683,589,971,472,744],function(){return e(e.s=30280)}),_N_E=e.O()}]);