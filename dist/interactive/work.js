import{c as Se}from"./chunk-U56VPJVB.js";import{a as L,b as Ae,d as ct,e as N}from"./chunk-WQJ2GEGS.js";var De=L(ct(),1);var j=L(Ae(),1);var p=L(Ae(),1),f=L(N(),1),T=.09,st=.11;function F(r,i,u){return i<=0?0:u?(r%i+i)%i:Math.min(Math.max(r,0),i-1)}function lt(r){let i=Math.hypot(1,r);return[1/i,r/i]}function Ce(r,i,u){let n=[0,i*r[0],r[1],i*r[0]+r[1]],d=Math.min(...n),_=Math.max(...n);return{rest:_+.001,gone:d-u*1.6,mid:(d+_)/2,lo:d}}function ut(r,i,u){let n=Math.max(i,0),d=Math.PI*u;return n<d?r-n:r-n/2-d/2}function dt(r,i,u){let n=Math.max(r-i,0),d=Math.PI*u;return n<d?n:2*n-d}function ft(r,i,u){return Math.abs(u)>st?u>0:r>i}function pt(r,i,u){return Math.min(Math.max((r+u-i)/(u*.6),0),1)}var re=4.5,mt=.3,ht=.2;function gt(r,i,u,n,d){let _=-n*n*(r-u)-2*n*i,I=i+_*d;return[r+I*d,I]}var Le=-.4,vt=.22,bt=.07,xt=16,Et=`
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,kt=`
precision highp float;

uniform sampler2D u_from;
uniform sampler2D u_to;
uniform vec2 u_res;
uniform float u_fromAspect;
uniform float u_toAspect;
uniform vec2 u_dir;
uniform float u_fold;
uniform float u_r;
uniform float u_shade;
uniform float u_turning;
uniform vec3 u_paper;

varying vec2 v_uv;

const float PI = 3.14159265;
// Light from above and slightly toward the free edge, so the roll catches a
// highlight band just short of its top instead of shading evenly.
const vec2 LIGHT = vec2(0.33, 0.944);

float stageAspect() { return u_res.x / u_res.y; }

// Contain the complete customer screenshot, including differing aspect ratios.
vec3 sampleContain(sampler2D tex, float imgAspect, vec2 P) {
  float a = stageAspect();
  vec2 uv = vec2(P.x / a, P.y);
  vec2 s = a > imgAspect ? vec2(a / imgAspect, 1.0) : vec2(1.0, imgAspect / a);
  vec2 mapped = (uv - 0.5) * s + 0.5;
  if (mapped.x < 0.0 || mapped.x > 1.0 || mapped.y < 0.0 || mapped.y > 1.0) return vec3(0.031, 0.09, 0.14);
  return texture2D(tex, mapped).rgb;
}

float sdPage(vec2 P) {
  vec2 h = vec2(stageAspect(), 1.0) * 0.5;
  vec2 q = abs(P - h) - h;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
}

// Antialiased "is there paper at this point of the sheet".
float onSheet(vec2 P, float aa) { return clamp(0.5 - sdPage(P) / aa, 0.0, 1.0); }

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// The outer face of the roll and the flipped-over back. theta runs from PI/2
// at the roll's silhouette to PI on top, where the back lies flat.
float backLight(float theta) {
  vec2 n = vec2(sin(theta), -cos(theta));
  float diff = dot(n, LIGHT);
  return 0.64 + 0.34 * clamp(diff, 0.0, 1.0) + pow(max(diff, 0.0), 14.0) * 0.07;
}

// Paper stock with the print ghosting through it, mirrored, like a sheet held
// to the light. Grain is keyed to the sheet, so it travels with the paper.
vec3 paperBack(vec2 P, float light) {
  vec3 ink = sampleContain(u_from, u_fromAspect, P);
  float lum = dot(ink, vec3(0.299, 0.587, 0.114));
  vec3 c = u_paper * mix(1.0, 0.72 + 0.28 * lum, 0.35);
  float tooth = hash(floor(P * u_res.y * 0.7)) - 0.5;
  float fibre = hash(vec2(floor(P.x * 9.0), floor(P.y * u_res.y * 0.25))) - 0.5;
  return (c + tooth * 0.03 + fibre * 0.012) * light;
}

void main() {
  vec2 p = vec2(v_uv.x * stageAspect(), v_uv.y);
  float aa = 1.2 / u_res.y;
  float grain = (hash(floor(v_uv * u_res)) - 0.5) * 0.024;

  if (u_turning < 0.5) {
    gl_FragColor = vec4(sampleContain(u_from, u_fromAspect, p) + grain, 1.0);
    return;
  }

  float d = dot(p, u_dir);
  float f = u_fold;
  float R = u_r;

  // 1. The next sheet, under the roll's shadow. The shadow only falls where
  //    the sheet exists at this point along the fold, so a lifted corner
  //    shades a corner rather than a whole band.
  vec3 col = sampleContain(u_to, u_toAspect, p) + grain;
  vec2 rollTop = p + u_dir * (f + R * PI * 0.5 - d);
  float along = 1.0 - smoothstep(0.0, R * 0.8, sdPage(rollTop));
  float beyond = max(d - f - R, 0.0);
  col *= 1.0 - 0.42 * u_shade * along * exp(-beyond / (R * 0.8)) * step(f, d);

  // 2. The unlifted front of this sheet, darkened in the gutter by the fold
  //    and just outside the flipped-over back that lies on top of it.
  vec2 laid = p + u_dir * (2.0 * f + PI * R - 2.0 * d);
  if (d < f) {
    float occl = 0.3 * exp(-max(sdPage(laid), 0.0) / (R * 0.28));
    float gutter = 0.1 * exp(-(f - d) / (R * 0.4));
    col = (sampleContain(u_from, u_fromAspect, p) + grain) * (1.0 - occl - gutter);
  }

  // 3. The roll: the underside first, then the back coming over the top.
  float inRoll = step(f, d) * (1.0 - smoothstep(f + R - aa, f + R, d));
  if (inRoll > 0.0) {
    float a = asin(clamp((d - f) / R, 0.0, 1.0));

    vec2 under = p + u_dir * (f + R * a - d);
    float lightIn = 0.42 + 0.6 * clamp(dot(vec2(-sin(a), cos(a)), LIGHT), 0.0, 1.0);
    col = mix(col, (sampleContain(u_from, u_fromAspect, under) + grain) * lightIn, onSheet(under, aa) * inRoll);

    float theta = PI - a;
    vec2 over = p + u_dir * (f + R * theta - d);
    col = mix(col, paperBack(over, backLight(theta)), onSheet(over, aa) * inRoll);
  }

  // 4. The flipped-over back, lying flat on top.
  if (d < f) {
    col = mix(col, paperBack(laid, backLight(PI)), onSheet(laid, aa));
  }

  gl_FragColor = vec4(col, 1.0);
}
`,Ie=(r,i,u)=>{let n=r.createShader(i);if(!n)throw new Error("could not create shader");if(r.shaderSource(n,u),r.compileShader(n),!r.getShaderParameter(n,r.COMPILE_STATUS)){let d=r.getShaderInfoLog(n);throw r.deleteShader(n),new Error("shader compile failed: "+d)}return n},Rt=r=>{let i=Ie(r,r.VERTEX_SHADER,Et),u=Ie(r,r.FRAGMENT_SHADER,kt),n=r.createProgram();if(!n)throw new Error("could not create program");if(r.attachShader(n,i),r.attachShader(n,u),r.linkProgram(n),r.deleteShader(i),r.deleteShader(u),!r.getProgramParameter(n,r.LINK_STATUS)){let d=r.getProgramInfoLog(n);throw r.deleteProgram(n),new Error("program link failed: "+d)}return n},yt=r=>new Promise((i,u)=>{let n=new Image;n.crossOrigin="anonymous",n.decoding="async",n.onload=()=>i(n),n.onerror=()=>u(new Error("could not load "+r)),n.src=r}),wt=r=>{let i=/^#?([0-9a-f]{6})$/i.exec(r.trim()),u=parseInt(i?i[1]:"EDEEE9",16);return[(u>>16&255)/255,(u>>8&255)/255,(u&255)/255]},Me=r=>String(r).padStart(2,"0"),Tt=".pcc-root{position:relative;display:flex;flex-direction:column;width:100%;overflow:hidden;background:var(--color-background,#FFFFFF);color:var(--color-foreground,#111111)}.pcc-stage{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;cursor:grab;touch-action:pan-y;user-select:none;-webkit-user-select:none;outline:none}.pcc-stage[data-holding='true']{cursor:grabbing}.pcc-stage:focus-visible{box-shadow:inset 0 0 0 2px var(--color-primary,#111111)}.pcc-canvas,.pcc-fallback{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none}.pcc-canvas{transition:opacity 400ms ease}.pcc-fallback{object-fit:contain}.pcc-rail{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px;flex-shrink:0;padding:0 16px 0 24px;border-top:1px solid var(--color-border,#E4E4E4)}.pcc-caption{display:flex;align-items:baseline;gap:20px;min-width:0;font-size:15px;line-height:20px}.pcc-caption>*{animation:pcc-in 260ms cubic-bezier(0.23,1,0.32,1) both}.pcc-caption>:nth-child(2){animation-delay:40ms}.pcc-caption>:nth-child(3){animation-delay:80ms}.pcc-count{flex-shrink:0;width:56px;font-size:13px;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:var(--color-muted-foreground,#767676)}.pcc-count b{font-weight:700;color:var(--color-foreground,#111111)}.pcc-title{flex-shrink:0;font-weight:700}.pcc-sub{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--color-muted-foreground,#6B6B6B)}.pcc-controls{display:flex;gap:8px;flex-shrink:0}.pcc-btn{position:relative;display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border-radius:50%;border:1px solid var(--color-border,#D4D4D4);background:transparent;color:inherit;cursor:pointer;transition:transform 160ms ease-out,border-color 200ms ease}.pcc-btn:active{transform:scale(0.97)}.pcc-btn:disabled{opacity:.35;cursor:default}.pcc-btn:focus-visible{outline:2px solid var(--color-primary,#111111);outline-offset:2px}@media (hover:hover) and (pointer:fine){.pcc-btn:hover:not(:disabled){border-color:var(--color-muted-foreground,#8A8A8A)}}.pcc-ring{position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);pointer-events:none;transform:rotate(-90deg)}.pcc-ring circle{fill:none;stroke:currentColor;stroke-width:1.5;stroke-dasharray:121;stroke-dashoffset:121;animation:pcc-ring linear forwards}.pcc-clock{position:absolute;width:0;height:0;animation:pcc-clock linear forwards}.pcc-root[data-paused='true'] .pcc-ring circle,.pcc-root[data-paused='true'] .pcc-clock{animation-play-state:paused}.pcc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@keyframes pcc-in{from{opacity:0;transform:translateY(6px)}}@keyframes pcc-fade{from{opacity:0}}@keyframes pcc-ring{to{stroke-dashoffset:0}}@keyframes pcc-clock{from{opacity:0}to{opacity:0}}@media (prefers-reduced-motion:reduce){.pcc-caption>*{animation-name:pcc-fade}}@media (max-width:560px){.pcc-sub{display:none}.pcc-rail{padding:0 12px 0 16px}}";function ne({items:r,height:i="100svh",autoplay:u=0,loop:n=!0,paper:d="#EDEEE9",rail:_=!0,index:I,defaultIndex:Fe=0,onIndexChange:ae,className:Ue=""}){let v=r.length,ie=p.useRef(null),ce=p.useRef(null),[Xe,Be]=p.useState(()=>F(Fe,v,n)),m=F(I===void 0?Xe:I,v,n),[U,z]=p.useState(!1),[X,se]=p.useState(!1),[Ge,He]=p.useState(0),[C,Ye]=p.useState(()=>matchMedia("(prefers-reduced-motion: reduce)").matches),[qe,We]=p.useState(!1),[Ve,Oe]=p.useState(!1),[je,Ke]=p.useState(!0),[ze,le]=p.useState(!1),[ue,de]=p.useState(!1),[$e,fe]=p.useState(0),[Qe,pe]=p.useState(!1),[$,B]=p.useState(!1);p.useEffect(()=>{let e=(g,k)=>{let h=window.matchMedia(g);k(h.matches);let E=A=>k(A.matches);return h.addEventListener("change",E),()=>h.removeEventListener("change",E)},t=e("(prefers-reduced-motion: reduce)",Ye),o=e("(hover: hover) and (pointer: fine)",We),a=()=>Oe(document.hidden);return a(),document.addEventListener("visibilitychange",a),()=>{t(),o(),document.removeEventListener("visibilitychange",a)}},[]),p.useEffect(()=>{let e=ie.current;if(!e||typeof IntersectionObserver>"u")return;let t=new IntersectionObserver(([o])=>Ke(o.isIntersecting),{threshold:.25});return t.observe(e),()=>t.disconnect()},[]);let M=p.useCallback(e=>{let t=F(e,v,n);I===void 0&&Be(t),ae?.(t)},[I,v,n,ae]),G=p.useRef({reduced:C,loop:n,n:v,paper:d});G.current={reduced:C,loop:n,n:v,paper:d};let c=p.useRef({cur:m,turn:null,aspect:1.6,kick:()=>{}}).current,W=(e,t,o,a,g)=>{let k=lt(t),h=Ce(k,c.aspect,T),E=e===1?h.rest:h.gone;return{kind:e,from:o,to:a,dir:k,ends:h,fold:E,v:0,target:E,omega:g?xt:re,peek:g,dragging:!1}},Q=e=>e.kind===1?e.ends.rest:e.ends.gone,Z=e=>e.kind===1?e.ends.gone:e.ends.rest,me=e=>e.kind===1?e.to:e.from,V=(e,t)=>{c.cur=t===e.ends.gone?e.to:e.from,c.turn=null},he=()=>{let e=c.turn;e&&V(e,e.target===e.ends.gone||e.target===e.ends.rest?e.target:Q(e))},J=p.useRef(m),Ze=e=>{J.current=e,M(e)};p.useEffect(()=>{if(J.current===m)return;J.current=m;let e=c.turn;if(e&&me(e)===m){e.peek=!1,e.dragging=!1,e.omega=re,e.target=Z(e),G.current.reduced&&V(e,e.target),c.kick();return}if(he(),m!==c.cur)if(G.current.reduced)c.cur=m;else{let{n:t,loop:o}=G.current,g=(o?(m-c.cur+t)%t*2<=t:m>c.cur)?W(1,Le,c.cur,m,!1):W(-1,Le,m,c.cur,!1);g.target=Z(g),c.turn=g}c.kick()},[m]);let Je=r.map(e=>e.src).join(`
`);p.useEffect(()=>{let e=ce.current;if(!e||v===0)return;let t=e.getContext("webgl",{alpha:!1,antialias:!1})??e.getContext("experimental-webgl");if(!t){z(!0);return}let o=null,a=null,g=r.map(()=>null),k=r.map(()=>1),h={},E=0,A=0,y=!1,D=!1,O=s=>{s.preventDefault(),cancelAnimationFrame(E),E=0,se(!1)},Y=()=>He(s=>s+1);e.addEventListener("webglcontextlost",O),e.addEventListener("webglcontextrestored",Y);let ke=s=>g[s]??g.find(b=>b)??null,te=()=>{if(y||!D)return;let s=c.turn,b=s?s.from:c.cur,l=s?s.to:c.cur,x=ke(b),w=ke(l);!x||!w||(t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,x),t.uniform1i(h.from,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,w),t.uniform1i(h.to,1),t.uniform2f(h.res,e.width,e.height),t.uniform1f(h.fromAspect,k[b]??1),t.uniform1f(h.toAspect,k[l]??1),t.uniform3fv(h.paper,wt(G.current.paper)),t.uniform1f(h.turning,s?1:0),s&&(t.uniform2f(h.dir,s.dir[0],s.dir[1]),t.uniform1f(h.fold,s.fold),t.uniform1f(h.r,T),t.uniform1f(h.shade,pt(s.fold,s.ends.lo,T))),t.drawArrays(t.TRIANGLE_STRIP,0,4))},Re=s=>s.target===s.ends.gone||s.target===s.ends.rest,ye=s=>!!s&&!s.dragging&&(Re(s)||Math.abs(s.fold-s.target)>.0015||Math.abs(s.v)>.02),we=s=>{E=0;let b=Math.min((s-A)/1e3,1/20);A=s;let l=c.turn;if(l&&!l.dragging){let x=Re(l),w=x?l.target===l.ends.gone?l.target-mt:l.target+ht:l.target,[S,q]=gt(l.fold,l.v,w,l.omega,b);l.fold=Math.min(Math.max(S,l.ends.gone),l.ends.rest),l.v=l.fold===S?q:0,x&&l.fold===l.target?V(l,l.target):!x&&!ye(l)&&(l.fold=l.target,l.v=0)}te(),ye(c.turn)&&(E=requestAnimationFrame(we))};c.kick=()=>{E||y||(A=performance.now(),E=requestAnimationFrame(we))};let Te=()=>{let s=Math.min(window.devicePixelRatio||1,2),b=Math.round(e.clientWidth*s),l=Math.round(e.clientHeight*s);if(!(b===0||l===0)){if(Math.abs(c.aspect-b/l)>.001&&c.turn){let x=c.turn,w=x.ends,S=Ce(x.dir,b/l,T),q=(S.rest-S.gone)/(w.rest-w.gone);x.fold=S.gone+(x.fold-w.gone)*q,x.target=x.target===w.rest?S.rest:x.target===w.gone?S.gone:S.gone+(x.target-w.gone)*q,x.v*=q,x.ends=S}c.aspect=b/l,(e.width!==b||e.height!==l)&&(e.width=b,e.height=l,t.viewport(0,0,b,l)),te()}},_e=new ResizeObserver(Te);_e.observe(e);let Pe=()=>{y=!0,cancelAnimationFrame(E),c.kick=()=>{},_e.disconnect(),e.removeEventListener("webglcontextlost",O),e.removeEventListener("webglcontextrestored",Y);for(let s of g)s&&t.deleteTexture(s);a&&t.deleteBuffer(a),o&&t.deleteProgram(o)};try{o=Rt(t),t.useProgram(o),a=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);let s=t.getAttribLocation(o,"a_position");t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0);for(let b of["from","to","res","fromAspect","toAspect","dir","fold","r","shade","turning","paper"])h[b]=t.getUniformLocation(o,"u_"+b);t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0)}catch{return z(!0),Pe}return r.forEach((s,b)=>{yt(s.src).then(l=>{if(y)return;let x=t.createTexture();t.bindTexture(t.TEXTURE_2D,x),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),g[b]=x,k[b]=l.naturalWidth/Math.max(l.naturalHeight,1),D?te():(D=!0,se(!0),Te())}).catch(()=>{y||z(!0)})}),Pe},[Je,Ge,v]),p.useEffect(()=>c.kick(),[d,c]);let H=p.useRef(null),ge=e=>v>1&&(n||(e===1?c.cur<v-1:c.cur>0)),ve=(e,t)=>(.5-(e-t.top)/t.height)*.9,be=e=>e===1?[c.cur,F(c.cur+1,v,n)]:[F(c.cur-1,v,n),c.cur],xe=(e,t)=>{let o=c.turn;if(!(o&&!o.peek)){if(e===0||!ge(e)){o&&(o.target=Q(o),c.kick());return}if(o&&o.kind!==e&&(c.turn=null,o=null),!o){let[a,g]=be(e);o=c.turn=W(e,t,a,g,!0)}o.target=e===1?o.ends.rest-vt:o.ends.lo-T+bt,c.kick()}},et=e=>{if(e.button!==0||!X||U||C)return;B(!0);let t=e.currentTarget.getBoundingClientRect(),o=e.clientX-t.left>t.width/2?1:-1;if(!ge(o))return;let a=c.turn;if(a&&!(a.peek&&a.kind===o)&&(he(),a=null),!a){let[k,h]=be(o);a=c.turn=W(o,ve(e.clientY,t),k,h,!1),o===-1&&(a.fold=a.ends.lo-T)}a.dragging=!0,a.peek=!1,a.v=0;let g=o===1?dt(a.ends.rest,a.fold,T):Math.max(a.fold-(a.ends.lo-T),0);e.currentTarget.setPointerCapture?.(e.pointerId),H.current={id:e.pointerId,x0:e.clientX,y0:e.clientY,lastX:e.clientX,lastY:e.clientY,lastT:e.timeStamp,h:t.height,grab:g,vel:0,moved:!1},de(!0),c.kick()},tt=e=>{let t=H.current,o=c.turn;if(!t||e.pointerId!==t.id||!o){if(!t&&qe&&!C&&!U&&X){let y=e.currentTarget.getBoundingClientRect(),D=(e.clientX-y.left)/y.width,O=Math.min(Math.max(ve(e.clientY,y)*1.8,-.75),.75),Y=D>.86?1:D<.14?-1:0;fe(Y),xe(Y,O)}return}let a=o.kind===1?-1:1,g=((e.clientX-t.x0)*o.dir[0]-(e.clientY-t.y0)*o.dir[1])/t.h,k=t.grab+a*g,h=o.kind===1?ut(o.ends.rest,k,T):o.ends.lo-T+Math.max(k,0);o.fold=Math.min(Math.max(h,o.ends.gone),o.ends.rest);let E=Math.max(e.timeStamp-t.lastT,1),A=((e.clientX-t.lastX)*o.dir[0]-(e.clientY-t.lastY)*o.dir[1])*a;t.vel=t.vel*.6+A/E*.4,t.lastX=e.clientX,t.lastY=e.clientY,t.lastT=e.timeStamp,Math.hypot(e.clientX-t.x0,e.clientY-t.y0)>6&&(t.moved=!0),c.kick()},Ee=(e,t)=>{let o=H.current;if(!o||e.pointerId!==o.id)return;H.current=null,de(!1);let a=c.turn;if(!a)return;a.dragging=!1,a.omega=re;let{rest:g,gone:k,mid:h}=a.ends,E=!1;t||(E=o.moved?ft(a.kind===1?g-a.fold:a.fold-k,a.kind===1?g-h:h-k,o.vel):!0),a.target=E?Z(a):Q(a);let A=o.vel*1e3/o.h,y=a.kind===1&&g-a.fold>=Math.PI*T?.5:1;a.v=o.moved?(a.kind===1?-A:A)*y:0,E&&Ze(me(a)),C&&V(a,a.target),c.kick()},rt=e=>{(e.key==="ArrowRight"||e.key==="ArrowLeft")&&B(!0),e.key==="ArrowRight"?(e.preventDefault(),M(m+1)):e.key==="ArrowLeft"&&(e.preventDefault(),M(m-1))},ee=u>0&&!C&&v>1&&X&&!$&&(n||m<v-1),nt=$e!==0||Qe||ze||ue||Ve||!je,P=r[m],ot=!n&&m===0,at=!n&&m===v-1,it=P?(P.title??P.alt??"Slide")+", "+(m+1)+" of "+v:"";return(0,f.jsxs)("section",{ref:ie,className:"pcc-root "+Ue,style:{height:i},role:"region","aria-roledescription":"carousel","aria-label":"Selected websites","data-paused":nt,onFocus:()=>le(!0),onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||le(!1)},children:[(0,f.jsx)("style",{children:Tt}),(0,f.jsxs)("div",{className:"pcc-stage",style:{background:d},tabIndex:0,"aria-label":"Slides. Drag a sheet or use the arrow keys to turn it.","data-holding":ue,onKeyDown:rt,onClick:e=>{if(!U&&!C)return;let t=e.currentTarget.getBoundingClientRect();M(m+(e.clientX-t.left>t.width/2?1:-1))},onPointerDown:et,onPointerMove:tt,onPointerUp:e=>Ee(e,!1),onPointerCancel:e=>Ee(e,!0),onPointerLeave:()=>{fe(0),H.current||xe(0,0)},children:[P&&(0,f.jsx)("img",{className:"pcc-fallback",src:P.src,alt:P.alt??"",draggable:!1}),!U&&(0,f.jsx)("canvas",{ref:ce,className:"pcc-canvas",style:{opacity:X&&!C?1:0},"aria-hidden":"true"})]}),_&&v>0?(0,f.jsxs)("div",{className:"pcc-rail",onPointerEnter:()=>pe(!0),onPointerLeave:()=>pe(!1),children:[(0,f.jsxs)("div",{className:"pcc-caption",children:[(0,f.jsxs)("span",{className:"pcc-count",children:[(0,f.jsx)("b",{children:Me(m+1)})," / ",Me(v)]}),P?.title?(0,f.jsx)("span",{className:"pcc-title",children:P.title}):null,P?.caption?(0,f.jsx)("span",{className:"pcc-sub",children:P.caption}):null]},m),(0,f.jsxs)("div",{className:"pcc-controls",children:[u>0&&!C&&X&&!U&&v>1&&(0,f.jsx)("button",{type:"button",className:"pcc-btn",onClick:()=>B(e=>!e),"aria-label":$?"Play carousel":"Pause carousel",children:$?(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:(0,f.jsx)("path",{d:"M8 5v14l11-7z"})}):(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:(0,f.jsx)("path",{d:"M6 5h4v14H6zm8 0h4v14h-4z"})})}),(0,f.jsx)("button",{type:"button",className:"pcc-btn",onClick:()=>{B(!0),M(m-1)},disabled:ot||v<2,"aria-label":"Previous slide",children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,f.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,f.jsxs)("button",{type:"button",className:"pcc-btn",onClick:()=>{B(!0),M(m+1)},disabled:at||v<2,"aria-label":"Next slide",children:[ee?(0,f.jsx)("svg",{className:"pcc-ring",viewBox:"0 0 40 40","aria-hidden":"true",children:(0,f.jsx)("circle",{cx:"20",cy:"20",r:"19.25",style:{animationDuration:u+"ms"}})},"ring-"+m):null,(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,f.jsx)("polyline",{points:"9 18 15 12 9 6"})})]})]})]}):null,ee?(0,f.jsx)("span",{className:"pcc-clock",style:{animationDuration:u+"ms"},onAnimationEnd:()=>M(m+1),"aria-hidden":"true"},"clock-"+m):null,(0,f.jsx)("p",{className:"pcc-sr","aria-live":ee?"off":"polite",children:it})]})}var R=L(N(),1);function oe({items:r}){let[i,u]=(0,j.useState)(0);if((0,j.useEffect)(()=>{let d=document.getElementById("work-count");d&&(d.textContent=String(i+1).padStart(2,"0"))},[i]),!r.length)return null;let n=r[i];return(0,R.jsxs)("div",{className:"customer-paper-carousel",children:[(0,R.jsxs)("div",{className:"customer-paper-top",children:[(0,R.jsx)("span",{className:"mono",children:"SELECTED WEBSITES"}),(0,R.jsx)("span",{children:"Drag or tap to turn the page"})]}),(0,R.jsx)(ne,{items:r.map(d=>({src:d.img,title:d.title,alt:d.alt})),index:i,onIndexChange:u,autoplay:3e3,paper:"#d9edf6",height:"auto"}),(0,R.jsxs)("div",{className:"customer-paper-details",children:[(0,R.jsxs)("div",{children:[(0,R.jsxs)("div",{className:"mono",children:[n.tag," \xB7 ",n.location]}),(0,R.jsx)("h3",{children:n.title}),(0,R.jsx)("p",{children:n.desc})]}),(0,R.jsxs)("a",{href:n.url,target:"_blank",rel:"noopener","aria-label":`View ${n.title} website`,children:["View website ",(0,R.jsx)(Se,{size:18})]})]}),(0,R.jsx)("div",{className:"customer-paper-dots","aria-label":"Choose a project",children:r.map((d,_)=>(0,R.jsx)("button",{onClick:()=>u(_),"aria-label":`Show project ${_+1}: ${d.title}`,"aria-current":_===i?"true":void 0,children:(0,R.jsx)("span",{})},d.url))})]})}var Ne=L(N(),1),K=document.querySelector(".work-track");if(K){let r=[...K.querySelectorAll(".project")].map(i=>({title:i.querySelector("h3").textContent,tag:i.querySelector(".project-meta span").textContent,location:i.querySelector(".project-meta span:last-child").textContent,desc:[...i.querySelector(".project-bottom p").childNodes].map(u=>u.nodeName==="BR"?" ":u.textContent).join("").replace(/\s+/g," ").trim(),img:i.querySelector("img").getAttribute("src"),alt:i.querySelector("img").alt,url:i.querySelector(".project-image").href}));K.className="paper-curl-root",(0,De.createRoot)(K).render((0,Ne.jsx)(oe,{items:r}))}
