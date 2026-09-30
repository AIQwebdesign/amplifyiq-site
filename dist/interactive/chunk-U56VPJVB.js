import{a as D,b as M}from"./chunk-WQJ2GEGS.js";var w=D(M(),1);var O=e=>e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();function H(e,a,o=[]){if(a==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:O(e),size:24,node:a,...o.length>0?{aliases:o}:{}}}var v=e=>{let a="",o=!1;for(let t of e){if(t==="-"||t==="_"||t<=" "){o=a.length>0;continue}a.length===0?a+=t.toLowerCase():a+=o?t.toUpperCase():t,o=!1}return a};var G=e=>{let a=v(e);return a.charAt(0).toUpperCase()+a.slice(1)};var S=D(M(),1);var h=(...e)=>e.filter((a,o,t)=>!!a&&a.trim()!==""&&t.indexOf(a)===o).join(" ").trim();var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};function F(e){return e!=null}function W(e,a={}){let o=a.attributeNames??{},t=d=>o[d]??d,s=e.size??e.width??l.width,I=e.size??e.height??l.height,x=e.aliases?.filter(d=>typeof d=="string"&&d.trim()!=="").map(d=>`lucide-${d}`)??[],C=[...e.name?[`lucide-${e.name}`]:[],...x],f=a.className?.split(" ").filter(Boolean)??[],g=a.includeDefaultClasses===!1?h(...f):h("lucide",...C,...f),A=a.absoluteStrokeWidth?Number(a.strokeWidth??l["stroke-width"])*Number(e.size??e.width??l.width)/Number(a.size??a.width??l.width):a.strokeWidth??l["stroke-width"];return["svg",{...Object.entries(l).reduce((d,[r,i])=>(d[t(r)]=i,d),{}),..."color"in a&&a.color&&{[t("stroke")]:a.color},..."size"in a&&F(a.size)&&{[t("width")]:a.size,[t("height")]:a.size},..."width"in a&&F(a.width)&&{[t("width")]:a.width},..."height"in a&&F(a.height)&&{[t("height")]:a.height},[t("stroke-width")]:A,...g&&{[t("class")]:g},[t("viewBox")]:`0 0 ${s} ${I}`,...a.hasA11yProp===!1?{[t("aria-hidden")]:"true"}:{},..."attributes"in a&&a.attributes},e.node.map(d=>{let[r,i,k]=d,P=a.nonScalingStroke?{[t("vector-effect")]:"non-scaling-stroke",...i}:i;return k?[r,P,k]:[r,P]})]}function V(e,a={}){return W(e,{...a,attributeNames:{...a.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}var E=e=>{for(let a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0;return!1};var c=D(M(),1);var sa=(0,c.createContext)({});var z=()=>(0,c.useContext)(sa);var X=(0,S.forwardRef)(({color:e,size:a,width:o,height:t,strokeWidth:s,absoluteStrokeWidth:I,nonScalingStroke:x,className:C="",children:f,iconNode:g=[],icon:A={node:g,aliases:[],size:24},...B},d)=>{let{size:r=24,strokeWidth:i=2,absoluteStrokeWidth:k=!1,nonScalingStroke:P=!1,color:ea="currentColor",className:ta=""}=z()??{},ua=!!f||E(B),[oa,da,la=[]]=V(A,{color:e??ea,width:o??a??r,height:t??a??r,strokeWidth:s??i,absoluteStrokeWidth:I??k,nonScalingStroke:x??P,className:h(ta,C),hasA11yProp:ua,attributes:B});return(0,S.createElement)(oa,{ref:d,...da},[...la.map(([fa,ra])=>(0,S.createElement)(fa,ra)),...Array.isArray(f)?f:[f]])});function u(e,a=[],o=[]){let t=typeof e=="string"?H(e,a,o):e,s=(0,w.forwardRef)(({className:I,...x},C)=>(0,w.createElement)(X,{ref:C,icon:t,className:I,...x}));return t.name&&(s.displayName=G(t.name)),s}var N={name:"arrow-up-right",size:24,node:[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]};N.node;var R=u(N);var K={name:"house",size:24,node:[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],aliases:["home"]};K.node;var n=u(K);var Z={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};Z.node;var p=u(Z);var Q={name:"panels-top-left",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],aliases:["layout"]};Q.node;var L=u(Q);var J={name:"route",size:24,node:[["circle",{cx:"6",cy:"19",r:"3",key:"1kj8tv"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",key:"1d8sl"}],["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}]]};J.node;var y=u(J);var _={name:"user-round",size:24,node:[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]],aliases:["user-2"]};_.node;var m=u(_);var j={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};j.node;var T=u(j);var Y={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};Y.node;var q=u(Y);var $={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};$.node;var b=u($);var aa={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};aa.node;var U=u(aa);export{T as a,q as b,R as c,n as d,p as e,b as f,L as g,y as h,m as i,U as j};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-react/dist/esm/context.mjs:
lucide-react/dist/esm/Icon.mjs:
lucide-react/dist/esm/createLucideIcon.mjs:
lucide-react/dist/esm/icons/arrow-up-right.mjs:
lucide-react/dist/esm/icons/house.mjs:
lucide-react/dist/esm/icons/layers.mjs:
lucide-react/dist/esm/icons/panels-top-left.mjs:
lucide-react/dist/esm/icons/route.mjs:
lucide-react/dist/esm/icons/user-round.mjs:
lucide-react/dist/esm/icons/arrow-left.mjs:
lucide-react/dist/esm/icons/arrow-right.mjs:
lucide-react/dist/esm/icons/menu.mjs:
lucide-react/dist/esm/icons/x.mjs:
lucide-react/dist/esm/lucide-react.mjs:
  (**
   * @license lucide-react v1.48.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
