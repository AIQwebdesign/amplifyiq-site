import{a as ce}from"./chunk-OYDW5YW7.js";import{a as B}from"./chunk-FSIQMXKB.js";import{d as me,e as fe,f as ye,g as ut,h as I}from"./chunk-OXXLQ55W.js";import{a as he,b as ue}from"./chunk-O3R2W2FE.js";import{c as $,e as T,f as k,g as ht}from"./chunk-OFPF5XTL.js";import{a as ge}from"./chunk-QL73AEOX.js";import{a as J}from"./chunk-GWQ7C2J2.js";import{a as xe}from"./chunk-TTVJO3RH.js";import{b as ve}from"./chunk-KLRTCIER.js";import{a as oe,b as le}from"./chunk-OJBRXOQQ.js";import{a as pe}from"./chunk-XYLENX5A.js";import{b as de}from"./chunk-XWAXW3JC.js";import{fa as pt,ha as ae,ia as C,q as ct}from"./chunk-QG4R2TS3.js";import{a as lt,c as ie,e as re,h as x,v as dt}from"./chunk-BBC56QJ6.js";import{a as Pt,b as F,c as q,d as St,f as Y,i as Bt,j as Q}from"./chunk-GWRFDJA3.js";import{c as z,e as L,g as X}from"./chunk-C2DNP2OJ.js";import{Aa as se,a as Kt,b as Ht,da as ee,ja as ne,l as $t,n as ot,o as Jt,x as te}from"./chunk-SNK2HWMJ.js";import{Aa as it,Ba as zt,Dc as b,Ec as at,Fc as y,Gc as jt,Ge as Zt,Ja as Ot,Oa as rt,Oc as S,Ra as Wt,Tc as _t,Vc as Ut,Xc as Z,Yc as Nt,Zc as kt,bd as K,cd as Gt,ce as Xt,dd as H,kd as Vt,l as Dt,ld as Ft,mc as Tt,md as qt,n as Rt,nd as N,od as Yt,pd as Qt,qd as Lt,za as Et}from"./chunk-3YINNC53.js";import{c as W}from"./chunk-2PGLAE7T.js";var xt=null;function pn(t){xt=t}var Ae=new WeakMap,Oe=1;function be(t){let e=Ae.get(t);return e===void 0&&(e=Oe++,Ae.set(t,e)),e}function We(t,e,n,s){let i=t,r=e;return[be(n),be(s),i.layers?.mask??0,i.renderOrder??0,(i.castShadow??r.castShadow)===!0?1:0,(i.receiveShadow??r.receiveShadow)===!0?1:0].join(":")}var vt=[8,32,128,512],we=vt[vt.length-1],mt=new S().makeScale(0,0,0),Te=class extends Lt{constructor(t,e,n,s){super(t,e,n),this.isInstanceGroup=!0,this.members=new Array(n).fill(null),this.raycast=()=>{},this.matrixAutoUpdate=!1,this.frustumCulled=!1,this.adoptPassState(s);for(let i=0;i<n;i++)this.setMatrixAt(i,mt);this.instanceMatrix.needsUpdate=!0}adoptPassState(t){this.layers.mask=t.layers.mask,this.renderOrder=t.renderOrder,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow}assign(t,e){this.members[t]=e}writeSlot(t,e,n){return n===!1?(this.setMatrixAt(t,mt),!1):(this.setMatrixAt(t,e.matrixWorld),!0)}park(t){this.members[t]=null,this.setMatrixAt(t,mt)}get memberCount(){let t=0;for(let e of this.members)e!==null&&t++;return t}};function Re(t,e){let n=e.get(t);if(n!==void 0)return n;let s=t.visible&&(t.parent===null||Re(t.parent,e));return e.set(t,s),s}var hn=8,je=class{constructor(t=8){this.minGroupSize=t,this.groups=[],this.groupKeys=new WeakMap,this.placements=new Map,this.visibilityMemo=new Map,this.page=null,this.stats={instancingGroups:0,instancedDrawsSaved:0,instancingRegroups:0,instancingParks:0,instancingIneligible:{}}}update(t,e){this.page!==t&&(this.teardown(),this.page=t,e=!0),t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),e&&this.reconcile(t),this.refresh()}reconcile(t){let e={},n=new Map;t.traverse(r=>{if(r.isInstanceGroup===!0)return;let a=(function(l){if(l.isMesh!==!0)return"not-a-mesh";if(q(l)||Y(l)||F(l)||Pt(l))return"excluded-type";let d=(function(f){let w=Bt(f)?f.object:f;return w.geometry!==void 0?w:void 0})(l);if(d===void 0)return"not-a-mesh";let p=d.material;if(p===void 0)return"not-a-mesh";if(Array.isArray(p))return"array-material";let c=d.builtSharedGeometry;if(c===void 0)return"unrealized-geometry";if(!(function(f){return f.isShared===!0})(c))return"unshared-geometry";if(c.attributes.position===void 0)return"empty-geometry";if(c.morphAttributes.position!==void 0)return"morph";if(d.isSkinnedMesh===!0)return"skinned";let h=d.morphTargetInfluences;if(h!==void 0&&h.length>0)return"morph";if(c.drawRange.start!==0||c.drawRange.count!==Number.POSITIVE_INFINITY)return"draw-range";let u=p;return u.positionNode!=null||u.castShadowPositionNode!=null?"position-node":u.transparent===!0?"transparent":d.userData?.__splinePlanarMirror!==void 0?"reflection":(function(f){let w=f;for(;w!==null;){let m=w.states;if(m!==void 0&&Object.keys(m).length>0)return!0;w=w.parent}return!1})(d)?"interaction-states":{object:l,owner:d,geometry:c,material:p,key:We(l,d,c,p)}})(r);if(typeof a=="string")return void(e[a]=(e[a]??0)+1);let o=n.get(a.key);o===void 0?n.set(a.key,[a]):o.push(a)});let s=new Map;for(let[r,a]of n)for(let o of a)s.set(o.object,r);let i=!1;for(let[r,a]of this.placements)s.get(r)!==this.groupKeys.get(a.group)&&this.parkPlacement(r,a);for(let r=this.groups.length-1;r>=0;r--){let a=this.groups[r];a.memberCount>=this.minGroupSize||(this.destroyGroup(a),this.groups.splice(r,1),i=!0)}for(let[r,a]of n){let o=a.filter(d=>!this.placements.has(d.object));if(o.length===0)continue;let l=0;for(let d of this.groups){if(l>=o.length)break;if(this.groupKeys.get(d)!==r)continue;let{members:p}=d;for(let c=0;c<p.length&&l<o.length;c++)p[c]===null&&this.place(d,c,o[l++].object)}for(;o.length-l>=this.minGroupSize;){let d=o.slice(l,l+we);this.groups.push(this.createGroup(t,r,d)),l+=d.length,i=!0}}i&&this.stats.instancingRegroups++,this.publishGroupStats(),this.stats.instancingIneligible=e}createGroup(t,e,n){let s=n[0],i=new Te(s.geometry,s.material,(function(r){for(let a of vt)if(r<=a)return a;return we})(n.length),s.object);this.groupKeys.set(i,e);for(let r=0;r<n.length;r++)this.place(i,r,n[r].object);return t.add(i),i}destroyGroup(t){for(let e=0;e<t.members.length;e++){let n=t.members[e];n!==null&&this.parkPlacement(n,{group:t,slot:e})}t.removeFromParent(),t.dispose()}place(t,e,n){t.assign(e,n),this.placements.set(n,{group:t,slot:e}),n.isDrawSuppressed=!0}parkPlacement(t,e){e.group.park(e.slot),e.group.instanceMatrix.needsUpdate=!0,this.placements.delete(t),t.isDrawSuppressed=!1,this.stats.instancingParks++}refresh(){this.visibilityMemo.clear();for(let t of this.groups){let{members:e}=t,n=null;for(let s=0;s<e.length;s++){let i=e[s];i!==null&&(n===null&&(n=i),t.writeSlot(s,i,Re(i,this.visibilityMemo)))}n!==null&&(t.adoptPassState(n),t.instanceMatrix.needsUpdate=!0)}}teardown(){for(let t of this.groups)this.destroyGroup(t);this.groups.length=0;for(let t of this.placements.keys())t.isDrawSuppressed=!1;this.placements.clear(),this.publishGroupStats()}dispose(){this.teardown(),this.page=null}publishGroupStats(){let t=0;for(let e of this.groups){let n=e.memberCount;n>0&&(t+=n-1)}this.stats.instancingGroups=this.groups.length,this.stats.instancedDrawsSaved=t}},ft=(function(){let t=new Float32Array(1),e=new Int32Array(t.buffer);return function(n){return t[0]=n,e[0]}})(),_e=function(t,e,n,s){return t+(e<<8)+(n<<16)+(s<<24)},tt=new b;function un(t){let e=!1;return t.scene.objects.traverse((n,s)=>{if(s.visible===!1)return!0;s.type==="Splat"&&(e=!0)}),e}var Ee,Ce,nt=class extends Ft{constructor(t,e,n,s,i=!1,r=1,a,o){super(n,s),this.splatCount=e,this.meshIndexIntervals=a,this.meshMatrixWorlds=o,this.splatBuffers=t,this.geometry=n,this.material=s,this.splatDataTextures=null,this.halfPrecisionCovariancesOnGPU=i,this.devicePixelRatio=r,this.resetLocalSplatDataAndTexturesFromSplatBuffer()}static buildMesh(t,e,n=!1,s=1,i,r){let a=nt.buildGeomtery(e),o=nt.buildMaterial(i);return new nt(t,e,a,o,n,s,i,r)}static buildMaterial(t){if(ct()==="webgpu"&&xt)return xt.createSplatMaterial(t);let e={covariancesTexture:{type:"t",value:null},centersColorsTexture:{type:"t",value:null},meshIndexIntervals:{value:t},meshMatrixWorldsTexture:{type:"t",value:null},focal:{type:"v2",value:new b},viewport:{type:"v2",value:new b},basisViewport:{type:"v2",value:new b},debugColor:{type:"v3",value:new _t},covariancesTextureSize:{type:"v2",value:new b(1024,1024)},centersColorsTextureSize:{type:"v2",value:new b(1024,1024)},orthoZoom:{type:"f",value:-1}};return new Xt({uniforms:e,vertexShader:`
            precision highp float;
            #include <common>

            attribute uint splatIndex;

            uniform highp sampler2D covariancesTexture;
            uniform highp usampler2D centersColorsTexture;
            uniform vec2 focal;
            uniform vec2 viewport;
            uniform vec2 basisViewport;
            uniform vec2 covariancesTextureSize;
            uniform vec2 centersColorsTextureSize;
						uniform highp sampler2D meshMatrixWorldsTexture;
						uniform uint meshIndexIntervals[257];
						uniform float orthoZoom;

            varying vec4 vColor;
            varying vec2 vUv;

            varying vec2 vPosition;

            const vec4 encodeNorm4 = vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0);
            const uvec4 mask4 = uvec4(uint(0x000000FF), uint(0x0000FF00), uint(0x00FF0000), uint(0xFF000000));
            const uvec4 shift4 = uvec4(0, 8, 16, 24);
            vec4 uintToRGBAVec (uint u) {
               uvec4 urgba = mask4 & u;
               urgba = urgba >> shift4;
               vec4 rgba = vec4(urgba) * encodeNorm4;
               return rgba;
            }

            vec2 getDataUV(in int stride, in int offset, in vec2 dimensions) {
                vec2 samplerUV = vec2(0.0, 0.0);
                float d = float(splatIndex * uint(stride) + uint(offset)) / dimensions.x;
                samplerUV.y = float(floor(d)) / dimensions.y;
                samplerUV.x = fract(d);
                return samplerUV;
            }

            void main () {
                uvec4 sampledCenterColor = texture(centersColorsTexture, getDataUV(1, 0, centersColorsTextureSize));
                vec3 splatCenter = uintBitsToFloat(uvec3(sampledCenterColor.gba));
                vColor = uintToRGBAVec(sampledCenterColor.r);

                vPosition = position.xy * 2.0;

								uint meshIndex;
								for (int i = 1; i < 257; i++) {
									if (splatIndex < meshIndexIntervals[i]) {
										meshIndex = uint(i - 1);
										break;
									}
								}

								float strideMulmeshIndex = float(4u*meshIndex);
								float meshMatrixWorldsTextureLength = float(256*4);

								mat4 modelMat = mat4(
									texture(meshMatrixWorldsTexture, vec2((strideMulmeshIndex+0.0)/meshMatrixWorldsTextureLength, 0)),
									texture(meshMatrixWorldsTexture, vec2((strideMulmeshIndex+1.0)/meshMatrixWorldsTextureLength, 0)),
									texture(meshMatrixWorldsTexture, vec2((strideMulmeshIndex+2.0)/meshMatrixWorldsTextureLength, 0)),
									texture(meshMatrixWorldsTexture, vec2((strideMulmeshIndex+3.0)/meshMatrixWorldsTextureLength, 0))
								);
								mat4 modelViewMat = viewMatrix * modelMat;
								vec4 viewCenter = modelViewMat * vec4(splatCenter, 1.0); 
                vec4 clipCenter = projectionMatrix * viewCenter;

                vec2 sampledCovarianceA = texture(covariancesTexture, getDataUV(3, 0, covariancesTextureSize)).rg;
                vec2 sampledCovarianceB = texture(covariancesTexture, getDataUV(3, 1, covariancesTextureSize)).rg;
                vec2 sampledCovarianceC = texture(covariancesTexture, getDataUV(3, 2, covariancesTextureSize)).rg;

                vec3 cov3D_M11_M12_M13 = vec3(sampledCovarianceA.rg, sampledCovarianceB.r);
                vec3 cov3D_M22_M23_M33 = vec3(sampledCovarianceB.g, sampledCovarianceC.rg);

                
                mat3 Vrk = mat3(
                    cov3D_M11_M12_M13.x, cov3D_M11_M12_M13.y, cov3D_M11_M12_M13.z,
                    cov3D_M11_M12_M13.y, cov3D_M22_M23_M33.x, cov3D_M22_M23_M33.y,
                    cov3D_M11_M12_M13.z, cov3D_M22_M23_M33.y, cov3D_M22_M23_M33.z
                );
                float s = 1.0 / (viewCenter.z * viewCenter.z);

                mat3 W = transpose(mat3(modelViewMat));
                mat3 T = orthoZoom > 0.0 ? W : W * mat3(
									focal.x / viewCenter.z, 0., -(focal.x * viewCenter.x) * s,
									0., focal.y / viewCenter.z, -(focal.y * viewCenter.y) * s,
									0., 0., 0.
								);
                mat3 cov2Dm = transpose(T) * Vrk * T;
                cov2Dm[0][0] += 0.3;
                cov2Dm[1][1] += 0.3;

                
                
                
                
                vec3 cov2Dv = vec3(cov2Dm[0][0], cov2Dm[0][1], cov2Dm[1][1]);

                vec3 ndcCenter = clipCenter.xyz / clipCenter.w;

                
                
                
                
                
                
                
                
                float a = cov2Dv.x;
                float d = cov2Dv.z;
                float b = cov2Dv.y;
                float D = a * d - b * b;
                float trace = a + d;
                float traceOver2 = 0.5 * trace;
                float term2 = sqrt(trace * trace / 4.0 - D);
                float eigenValue1 = traceOver2 + term2;
								float eigenValue2 = max(traceOver2 - term2, 0.00); 

                const float maxSplatSize = 1024.0;
                vec2 eigenVector1 = normalize(vec2(b, eigenValue1 - a));
                
                vec2 eigenVector2 = vec2(eigenVector1.y, -eigenVector1.x);
                vec2 basisVector1 = eigenVector1 * min(sqrt(2.0 * eigenValue1), maxSplatSize);
                vec2 basisVector2 = eigenVector2 * min(sqrt(2.0 * eigenValue2), maxSplatSize);

                vec2 ndcOffset = vec2(vPosition.x * basisVector1 + vPosition.y * basisVector2) * basisViewport;

								if (orthoZoom > 0.0) {
									ndcOffset *= orthoZoom;
								}

                gl_Position = vec4(ndcCenter.xy + ndcOffset, ndcCenter.z, 1.0);
            }`,fragmentShader:`
            precision highp float;
            #include <common>

            uniform vec3 debugColor;

            varying vec4 vColor;
            varying vec2 vUv;

            varying vec2 vPosition;
						layout(location = 1) out vec4 gVelocity; 

            void main () {
                
                
                float A = -dot(vPosition, vPosition);
                if (A < -4.0) discard;
                vec3 color = vColor.rgb;
                A = exp(A) * vColor.a;
                gl_FragColor = vec4(color.rgb, A);
								gVelocity = vec4(0.0); 
            }`,transparent:!0,alphaTest:1,blending:Rt,depthTest:!0,depthWrite:!1,side:Dt})}static buildGeomtery(t){let e=new H;e.setIndex([0,1,2,0,2,3]);let n=new Float32Array(12),s=new kt(n,3);e.setAttribute("position",s),s.setXYZ(0,-1,-1,0),s.setXYZ(1,-1,1,0),s.setXYZ(2,1,1,0),s.setXYZ(3,1,-1,0),s.needsUpdate=!0;let i=new Zt().copy(e),r=new Uint32Array(t),a=new Qt(r,1,!1);return a.setUsage(Tt),i.setAttribute("splatIndex",a),i.instanceCount=t,i}resetLocalSplatDataAndTexturesFromSplatBuffer(){this.updateLocalSplatDataFromSplatBuffer(),this.allocateAndStoreLocalSplatDataInTextures()}updateLocalSplatDataFromSplatBuffer(){this.splatBuffers.forEach(s=>s.buildPreComputedBuffers()),this.covariances=new Float32Array(6*this.splatCount),this.colors=new Uint8Array(4*this.splatCount),this.centers=new Float32Array(3*this.splatCount);let t=0,e=0,n=0;for(let s of this.splatBuffers){let i=s.nsplats;this.colors.subarray(t,t+4*i).set(s.colorsA),t+=4*i,this.centers.subarray(e,e+3*i).set(s.decoded.xyz.denormDequant().data),e+=3*i,this.covariances.subarray(n,n+6*i).set(new Float32Array(s.precomputedCovarianceBufferData)),n+=6*i}}allocateAndStoreLocalSplatDataInTextures(){let t=this.splatCount,e=new b(4096,1024);for(;e.x*e.y*2<6*t;)e.y*=2;let n,s,i=new b(4096,1024);for(;i.x*i.y*4<4*t;)i.y*=2;if(this.halfPrecisionCovariancesOnGPU){s=new Uint16Array(e.x*e.y*2);for(let d=0;d<this.covariances.length;d++)s[d]=Nt.toHalfFloat(this.covariances[d]);n=new N(s,e.x,e.y,rt,zt)}else s=new Float32Array(e.x*e.y*2),s.set(this.covariances),n=new N(s,e.x,e.y,rt,it);n.needsUpdate=!0,this.material.uniforms.covariancesTexture.value=n,this.material.uniforms.covariancesTextureSize.value.copy(e);let r=new Uint32Array(i.x*i.y*4);for(let d=0;d<t;d++){let p=4*d,c=3*d,h=4*d;r[h]=_e(this.colors[p],this.colors[p+1],this.colors[p+2],this.colors[p+3]),r[h+1]=ft(this.centers[c]),r[h+2]=ft(this.centers[c+1]),r[h+3]=ft(this.centers[c+2])}let a=new N(r,i.x,i.y,Wt,Et);ct()!=="webgpu"&&(a.internalFormat="RGBA32UI"),a.needsUpdate=!0,this.material.uniforms.centersColorsTexture.value=a,this.material.uniforms.centersColorsTextureSize.value.copy(i);let o=new Float32Array(4096);for(let d=0;d<this.meshMatrixWorlds.length;d++)o.set(this.meshMatrixWorlds[d].elements,16*d);let l=new N(o,1024,1,Ot,it);l.needsUpdate=!0,this.material.uniforms.meshMatrixWorldsTexture.value=l,this.material.uniformsNeedUpdate=!0,this.splatDataTextures={covariances:{data:s,texture:n,size:e},centerColors:{data:r,texture:a,size:i},meshMatrixWorlds:{data:o,texture:l}}}updateIndexes(t){let e=this.geometry;e.attributes.splatIndex.set(t),e.attributes.splatIndex.needsUpdate=!0,e.instanceCount=t.length}updateUniforms(t,e,n,s){this.splatCount>0&&(tt.set(t.x*this.devicePixelRatio,t.y*this.devicePixelRatio),this.material.uniforms.viewport.value.copy(tt),this.material.uniforms.basisViewport.value.set(2/tt.x,2/tt.y),this.material.uniforms.focal.value.set(e,n),this.material.uniforms.orthoZoom.value=s,this.material.uniformsNeedUpdate=!0)}getSplatDataTextures(){return this.splatDataTextures}getSplatCount(){return this.splatCount}getCenters(){return this.centers}getColors(){return this.colors}getCovariances(){return this.covariances}dispose(){this.geometry.dispose(),this.material.dispose(),this.splatDataTextures&&(this.splatDataTextures.covariances.texture.dispose(),this.splatDataTextures.centerColors.texture.dispose(),this.splatDataTextures.meshMatrixWorlds.texture.dispose()),this.removeFromParent()}},Ue=new Promise(t=>{Ee=t}),Ie=!1;function mn(){if(!Ie)return Ce||(Ce=(async function(){let t=await import("./gaussian-splat-compression-AWZTQEXU.js");Ee(t),Ie=!0})())}var G=new S,et=new jt,M=new y,D=new y,R=new y,g=new y,Me=new y,O=new y;function Ne(t,e,n){n.length=0;let{axis:s,sign:i,limit:r}=e;for(let a=0;a<t.length;a++){let o=t[a],l=t[(a+1)%t.length],d=(s===0?o.px:s===1?o.py:o.pz)*i-r,p=(s===0?l.px:s===1?l.py:l.pz)*i-r,c=d<=0,h=p<=0;if(c&&n.push(o),c!==h){let u=d/(d-p);n.push({px:o.px+(l.px-o.px)*u,py:o.py+(l.py-o.py)*u,pz:o.pz+(l.pz-o.pz)*u,nx:o.nx+(l.nx-o.nx)*u,ny:o.ny+(l.ny-o.ny)*u,nz:o.nz+(l.nz-o.nz)*u})}}return n}function ke(t,e,n,s,i,r,a,o,l){let d=t.geometry,p=d.getAttribute("position");if(p===void 0||p.count===0)return!0;let c=d.getAttribute("normal"),h=d.getIndex(),u=h!==null?h.count:p.count;if(u>15e5)return!0;let f=d.drawRange.start,w=f+(d.drawRange.count===1/0?u-f:Math.min(d.drawRange.count,u-f));G.copy(t.objectToDecal),et.getNormalMatrix(G);let m=[],wt=[];for(let P=f;P+2<w;P+=3){let Ct=h!==null?h.getX(P):P,It=h!==null?h.getX(P+1):P+1,Mt=h!==null?h.getX(P+2):P+2;if(M.fromBufferAttribute(p,Ct).applyMatrix4(G),D.fromBufferAttribute(p,It).applyMatrix4(G),R.fromBufferAttribute(p,Mt).applyMatrix4(G),M.z>n&&D.z>n&&R.z>n||M.z<-n&&D.z<-n&&R.z<-n)continue;g.subVectors(D,M),Me.subVectors(R,M),O.crossVectors(g,Me);let st=O.length();if(!(st===0||O.z/st<=.01)){if(m.length=0,c!==void 0)g.fromBufferAttribute(c,Ct).applyMatrix3(et),m.push({px:M.x,py:M.y,pz:M.z,nx:g.x,ny:g.y,nz:g.z}),g.fromBufferAttribute(c,It).applyMatrix3(et),m.push({px:D.x,py:D.y,pz:D.z,nx:g.x,ny:g.y,nz:g.z}),g.fromBufferAttribute(c,Mt).applyMatrix3(et),m.push({px:R.x,py:R.y,pz:R.z,nx:g.x,ny:g.y,nz:g.z});else{O.divideScalar(st);for(let v of[M,D,R])m.push({px:v.x,py:v.y,pz:v.z,nx:O.x,ny:O.y,nz:O.z})}for(let v of e){if(m.length===0)break;let A=Ne(m,v,wt);wt=m,m=A}if(!(m.length<3)){if(a.length/3+3*(m.length-2)>3e5)return!1;for(let v=1;v+1<m.length;v++)for(let A of[m[0],m[v],m[v+1]]){l.push(A.px*s+.5,A.py*i+.5);let j=A.nx,_=A.ny,U=A.nz,V=Math.hypot(j,_,U);V>0?(j/=V,_/=V,U/=V):(j=0,_=0,U=1),a.push(A.px+j*r,A.py+_*r,A.pz+U*r),o.push(j,_,U)}}}}return!0}var yt=new Z,Pe=new Z,Se=new S,Be=new y,At=class extends ae{constructor(t,e,n){super(t,e),this.data=e,this.geometry=new H,this.lastSignature=[],this.nextSignature=[],this.scanned=[],this.lastParams={width:0,height:0,depth:0,offset:0},this.targetFilter=new Set,this.context=n;let s=this.data.geometry;this.lastParams={width:this.resolveNumber(s.width,0),height:this.resolveNumber(s.height,0),depth:this.resolveNumber(s.depth,0),offset:s.offset??0},this.geometry.userData={type:"DecalGeometry",parameters:{...this.lastParams}}}get isLOD(){return this.updateDecal(),!1}get isDecalObject(){return!0}resolveNumber(t,e){if(typeof t=="number")return t;let n=Number(this.context.shared.getVariable(t));return Number.isFinite(n)?n:e}currentParams(){let t=this.dataPatched.geometry;return{width:this.resolveNumber(t.width,this.lastParams.width),height:this.resolveNumber(t.height,this.lastParams.height),depth:this.resolveNumber(t.depth,this.lastParams.depth),offset:t.offset??0}}projectionRoot(){let t=this.parent;for(;t!==null&&x.is(t);){if(t.data?.type==="Page")return t;t=t.parent}return this.context.scene}currentTargetFilter(){let t=this.dataPatched.geometry;if(t.projection!=="select")return null;let e=t.projectionTargets;if(e!==this.targetFilterSource&&(this.targetFilterSource=e,this.targetFilter.clear(),e!==void 0))for(let n of e)this.targetFilter.add(n);return this.targetFilter}static matchesTargetFilter(t,e,n){let s=t;for(;s!==null&&s!==n;){if(e.has(s.uuid))return!0;s=s.parent}return!1}scanTargets(t,e,n){let s=this.scanned;s.length=0;let i=this.projectionRoot();if(i===null)return s;let r=this.currentTargetFilter();if(r!==null&&r.size===0)return s;yt.makeEmpty();for(let a=0;a<8;a++)Be.set((1&a?.5:-.5)*t,(2&a?.5:-.5)*e,(4&a?.5:-.5)*n).applyMatrix4(this.matrixWorld),yt.expandByPoint(Be);return i.traverse(a=>{if(a===this||!x.is(a)||!(a instanceof dt)||a instanceof At||a.dataPatched?.type!=="Mesh"||!a.visible||a.destroyedInAction||512&a.layers.mask||r!==null&&!At.matchesTargetFilter(a,r,i))return;let o=a.geometry,l=o?.getAttribute("position");l===void 0||l.count===0||o.drawRange.count!==0&&(o.boundingBox===null&&o.computeBoundingBox(),Pe.copy(o.boundingBox).applyMatrix4(a.matrixWorld),yt.intersectsBox(Pe)&&s.push(a))}),s}collectSignature(t,e,n){t.length=0,t.push(n.width,n.height,n.depth,n.offset);for(let s of this.matrixWorld.elements)t.push(s);for(let s of e){t.push(s.id,s.geometry.id);let i=s.geometry.getAttribute("position");t.push(i===void 0?-1:"version"in i?i.version:i.data.version);let r=s.geometry.getIndex();t.push(r!==null?r.version:-1),t.push(s.geometry.drawRange.count===1/0?-1:s.geometry.drawRange.count);for(let a of s.matrixWorld.elements)t.push(a)}}signaturesEqual(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}updateDecal(){if(this.disposed)return!1;this.updateWorldMatrix(!0,!1);let t=this.currentParams(),e=this.scanTargets(t.width,t.height,t.depth);if(this.collectSignature(this.nextSignature,e,t),this.signaturesEqual(this.nextSignature,this.lastSignature))return!1;let n=this.lastSignature;this.lastSignature=this.nextSignature,this.nextSignature=n,this.lastParams=t,Se.copy(this.matrixWorld).invert();let s=e.map(i=>({geometry:i.geometry,objectToDecal:new S().multiplyMatrices(Se,i.matrixWorld)}));return this.geometry.dispose(),this.geometry=(function(i,r){let a=Math.max(Math.abs(r.width),1e-6),o=Math.max(Math.abs(r.height),1e-6),l=Math.max(Math.abs(r.depth),1e-6),d=[{axis:0,sign:1,limit:a/2},{axis:0,sign:-1,limit:a/2},{axis:1,sign:1,limit:o/2},{axis:1,sign:-1,limit:o/2},{axis:2,sign:1,limit:l/2},{axis:2,sign:-1,limit:l/2}],p=[],c=[],h=[];for(let f of i)if(!ke(f,d,l/2,1/a,1/o,r.offset,p,c,h))break;let u=new H;return u.setAttribute("position",new K(p,3)),u.setAttribute("normal",new K(c,3)),u.setAttribute("uv",new K(h,2)),p.length===0?(u.setDrawRange(0,0),u.boundingSphere=new Gt):u.computeBoundingSphere(),u})(s,t),this.geometry.userData={type:"DecalGeometry",parameters:{width:t.width,height:t.height,depth:t.depth}},oe(this),le(this),this.resetBBoxNeedsUpdate(),!0}updateByPatchedOp(t,e,n){super.updateByPatchedOp(t,e,n),ie(t.path,["geometry"])&&this.resetBBoxNeedsUpdate()}updateEntityBoxSize(t,e){let n=this.currentParams();t.setScalar(0),e.set(n.width,n.height,n.depth).multiplyScalar(.5)}dispose(){super.dispose(),this.geometry.dispose()}},Ge=class extends de(qt,pe){constructor(t,e){super(),this.super_Entity(t,e),this.objectHelper.update(),this.matrixAutoUpdate=!0}updateState(t,e){this.updateState_Entity(t,e)}},gt=(function(){try{let t=window.location.href;if(t.includes("reducesubdiv=")){let e=t.indexOf("reducesubdiv=")+13;return parseInt(t.slice(e,e+1))}}catch{}})();function bt(t,e,n){if(console.assert(e.type!==void 0),e.type==="Mesh")return(function(s,i,r){let a;if(gt!==void 0&&i?.geometry&&"subdivisions"in i.geometry&&(i.geometry.subdivisions??0)>gt&&Object.assign(i.geometry,{subdivisions:gt}),i.geometry.type==="TextGeometry"||i.geometry.type==="InputGeometry"){let o=X(i.geometry.type);return o?o(s,i,r):(z(i.geometry.type==="InputGeometry"?"textinputs":"text",`a Mesh with ${i.geometry.type}`),new C(s,i,r))}if(i.geometry.type==="SubdivGeometry")a=new ve(s,i,r);else if(i.geometry.type==="PathGeometry"||i.geometry.type==="VectorGeometry"||i.geometry.type==="ShapeBlendGeometry"){let o=X(i.geometry.type);o?a=o(s,i,r):(z(i.geometry.type==="ShapeBlendGeometry"?"shape-blends":i.geometry.type==="PathGeometry"?"3d-paths":"vector-shapes",`a Mesh with ${i.geometry.type}`),a=new C(s,i,r))}else if(i.geometry.type==="BooleanGeometry")a=new $(s,i,r);else if(i.geometry.type==="DecalGeometry")a=new At(s,i,r);else if(i.geometry.type==="UIGeometry"){let o=X("UIGeometry");o?a=o(s,i,r):(z("ui-2d","a Mesh with UIGeometry"),a=new C(s,i,r))}else a=new C(s,i,r);return a})(t,e,n);if(e.type==="Empty")return new B(t,e);if(e.type==="Particle"){let s=L("Particle");return s?s(t,e,n):(z("particles","a Particle system"),new B(t,e))}if(e.type==="ParticleCollider")return new xe(t,e,n);if(e.type==="Hair"){let s=L("Hair");return s?s(t,e,n):(z("hair","a Hair System"),new B(t,e))}if(e.type==="Splat")return new B(t,e);if(e.type==="Bone")return new Ge(t,e);if(e.type==="Page")return new I(t,e,n);if(e.type==="PointLight")return new ce(t,e,n);if(e.type==="SpotLight")return new ue(t,e,n);if(e.type==="DirectionalLight")return new he(t,e,n);if(e.type==="Component"||e.type==="Instance"){let s=L(e.type);return s?s(t,e,n):(z("components",`a ${e.type}`),new B(t,e))}return Jt.is(e.type)?new J(t,e):(console.error(e),new B(t,e))}lt.createEntity=bt,lt.changeEntityProptotype=function(t,e,n){let s=bt(t.identity,e,n),i=t.children,r=t.attachedPaths,a=t.parent,o=t.component,l=t.instances,d=t.overrideData,p=t.uuid,c=t.stateSelection;t.dispose();for(let h of Object.keys(t))delete t[h];Object.setPrototypeOf(t,Object.getPrototypeOf(s));for(let h of Object.keys(s))t[h]=s[h];t.children=[...t.children,...i],t.attachedPaths=r,t.parent=a,t.component=o,t.instances=l,t.uuid=p,t.overrideData=d,t.updateState(t.data,n),c&&t.changeSelectedState(c,n),t.resetBBoxNeedsUpdate()};var ze,Ve=class{constructor(){this._constraints=new Map}setConstraint(t,e){e===null?this._constraints.delete(t):this._constraints.set(t,e)}removeDependencies(t){this._constraints.delete(t)}applyConstraints(t){let e=new Set;this._constraints.forEach((n,s)=>{let i=[s,n],r=n;for(;this._constraints.has(r);){if(r=this._constraints.get(r),i.includes(r)){console.warn(`circular dependency detected: ${i.join(" -> ")}`);break}e.has(r)||i.push(r)}for(let a=i.length-2;a>=0;a--)if(!e.has(i[a])){let o=t.find(i[a]);o?o.applyPathSnapping(t):console.warn(`missing entity ${i[a]}`),e.add(i[a])}})}findDependency(t,e){let n=t;for(;this._constraints.has(n);)if(n=this._constraints.get(n),n===e)return!0;return!1}},E=class{};W(E,"DepthMapRange",65536),W(E,"MemoryPageSize",65536),W(E,"BytesPerFloat",4),W(E,"BytesPerInt",4),Ue.then(t=>ze=t);var Fe=class{constructor(t={}){W(this,"updateView",(function(){let e=new S,n=[],s=new y(0,0,-1),i=new y(0,0,-1),r=new y,a=new y;return function(o=!1,l){let d=this.updateMatrixWorldsInWorkerIfNeeded(),p=this.cropsChanged();if(!o){i.set(0,0,-1).applyQuaternion(l.quaternion);let h=!1,u=!1;if(i.dot(s)<=.95&&(h=!0),a.copy(l.position).sub(r).length()>=1&&(u=!0),!(h||u||d||p||this.needsInitialRender))return}this.needsInitialRender=!1,r.copy(l.position),s.copy(i),e.copy(l.matrixWorld).invert(),e.premultiply(this.dummyPerspectiveMatrix),n[0]=l.position.x,n[1]=l.position.y,n[2]=l.position.z;let c={sort:{view:e.elements,cameraPosition:n,splatRenderCount:this.splatRenderCount,splatSortCount:this.splatRenderCount},...d?{newMatrixWorlds:this.meshMatrixWorlds}:{},...p?{newCropsArray:this.cropsArray}:{}};this.sortRunning?this.queuedMessage=c:(this.queuedMessage=null,this.sortRunning=!0,this.sortWorker.postMessage(c))}})()),this.scene=t.scene,this.currentPage=null,this.devicePixelRatio=window.devicePixelRatio,this.sortWorker=null,this.splatRenderCount=0,this.splatSortCount=0,this.splatMesh=null,this.sortRunning=!1,this.meshMatrixWorlds=null,this.meshMatrixWorldsOld=null,this.cropsArray=null,this.splatEntries=null,this.queuedMessage=null,this.needsInitialRender=!0,this.dummyPerspectiveMatrix=new S().makePerspective(-1,1,-1,1,.1,1e3)}updateSplatMeshUniforms(t,e){let n=new b;this.splatMesh!==null&&this.splatMesh.getSplatCount()>0&&(t.getSize(n),this.cameraFocalLengthX=e.projectionMatrix.elements[0]*this.devicePixelRatio*n.x*.45,this.cameraFocalLengthY=e.projectionMatrix.elements[5]*this.devicePixelRatio*n.y*.45,this.splatMesh.updateUniforms(n,this.cameraFocalLengthX,this.cameraFocalLengthY,e.isPerspectiveCamera?-1:e.zoom*this.devicePixelRatio))}loadSplat(t={}){this.activePage=this.scene.activePage,t.position&&(t.position=new y().fromArray(t.position)),t.orientation&&(t.orientation=new at().fromArray(t.orientation)),t.halfPrecisionCovariances=!!t.halfPrecisionCovariances;let e=[];if(this.splatEntries=e,this.activePage.traverseVisibleEntity(r=>{r.data.type==="Splat"&&e.push(r)}),this.splatMesh&&this.splatMesh.dispose(),e.length===0)return this.splatMesh=null,!1;this.meshMatrixWorlds=e.map(r=>r.matrixWorld),this.meshMatrixWorldsOld=e.map(r=>r.matrixWorld.clone()),this.cropsArray=e.map(r=>r.data.crops.map(a=>a.data)),this._splatBufferCache??(this._splatBufferCache=new WeakMap);let n=e.map(r=>{let a=this._splatBufferCache.get(r.data.buffer);return a===void 0&&(a=new ze.GSplineBuffer(new Uint8Array(r.data.buffer).buffer),this._splatBufferCache.set(r.data.buffer,a)),a}),s=0,i=[0];for(let r of n)s+=r.getSplatCount(),i.push(s);return this.setupSplatMesh(n,s,t.position,t.orientation,t.halfPrecisionCovariances,this.devicePixelRatio,i,this.meshMatrixWorlds),this.setupSortWorker(s),!0}updateMatrixWorldsInWorkerIfNeeded(){let t=this.splatDataTextures.meshMatrixWorlds.data;for(let e=0;e<this.meshMatrixWorlds.length;e++)t.set(this.meshMatrixWorlds[e].elements,16*e);return this.splatDataTextures.meshMatrixWorlds.texture.needsUpdate=!0,!this.meshMatrixWorlds.every((e,n)=>e.equals(this.meshMatrixWorldsOld[n]))&&(this.meshMatrixWorldsOld=this.meshMatrixWorlds.map(e=>e.clone()),!0)}cropsChanged(){let t=!1;return this.splatEntries.forEach((e,n)=>{e.data.crops.forEach((s,i)=>{this.cropsArray[n][i]===void 0?(t=!0,this.cropsArray[n][i]=s.data):Object.entries(s.data).forEach(([r,a])=>{(Array.isArray(a)&&a.some((o,l)=>o!==this.cropsArray[n][i][r][l])||a!==this.cropsArray[n][i]?.[r])&&(t=!0,this.cropsArray[n][i][r]=a)})}),e.data.crops.length!==this.cropsArray[n]?.length&&(this.cropsArray[n].length=e.data.crops.length,t=!0)}),t}setupSplatMesh(t,e,n=new y,s=new at,i=!1,r=1,a,o){this.splatMesh=nt.buildMesh(t,e,i,r,a,o),this.splatMesh.position.copy(n),this.splatMesh.quaternion.copy(s),this.splatMesh.frustumCulled=!1,this.splatMesh.renderOrder=99999,this.splatRenderCount=e,this.splatMesh.onBeforeRender=(l,d,p)=>this.update(l,p)}setupSortWorker(t){this.sortWorker=(function(e){let n=new Worker(URL.createObjectURL(new Blob(["(",`
function sortWorker(self) {
	let wasmInstance;
	let splatCount;
	let splatRC;
	let indexesOffset;
	let positionsOffset;
	let viewProjOffset;
	let frequenciesOffset;
	let indexesOutOffset;
	let sortBuffersOffset;
	let wasmMemory;
	let positions;

	let Constants;
	let floatPositions;
	let meshIndexIntervals;
	let meshMatrixWorlds;
	let cropsArray;

	function sort(viewProj) {
		// console.time('WASM SORT');
		const viewProjArray = new Float64Array(wasmMemory, viewProjOffset, 16);
		for (let i = 0; i < 16; i++) {
			viewProjArray[i] = viewProj[i];
		}
		let indexesBuffer;
		// console.timeEnd('WASM SORT');
		if (splatRC > 1) {
			wasmInstance.exports.sortIndexes(
				indexesOffset,
				positionsOffset,
				sortBuffersOffset,
				viewProjOffset,
				frequenciesOffset,
				indexesOutOffset,
				Constants.DepthMapRange,
				splatRC
			);
			const indexes = new Uint32Array(splatRC);
			indexesBuffer = indexes.buffer;
			indexes.set(new Uint32Array(wasmMemory, indexesOutOffset, splatRC));
		} else if (splatRC === 1) {
			const indexes = new Uint32Array(splatRC);
			indexes[0] = new Uint32Array(wasmMemory, indexesOffset, splatCount)[0];
			indexesBuffer = indexes.buffer;
		} else {
			indexesBuffer = new ArrayBuffer(0);
		}

		self.postMessage(
			{
				sortDone: true,
				indexesBuffer,
			},
			[indexesBuffer]
		);
	}
	function updateRenderedSplats(
		meshMatrixWorlds,
		cropsArray,
		meshIndexIntervals
	) {
		const renderedPositions = new Float32Array(
			wasmMemory,
			positionsOffset,
			splatCount * 3
		);
		splatRC = 0;
		const wasmMemoryIndexes = new Uint32Array(
			wasmMemory,
			indexesOffset,
			splatCount
		);
		for (let i = 0; i < meshIndexIntervals.length - 1; i++) {
			const crops = cropsArray[i];
			const matrixWorld = meshMatrixWorlds[i].elements;
			const paramsIn = crops
				.filter((a) => a.enabled && a.mode === 'Include')
				.map((c) =>
					c.type === 'Box'
						? computeBoundingBoxVertices(c)
						: computeEllipsoidParams(c)
				);
			const paramsOut = crops
				.filter((a) => a.enabled && a.mode === 'Exclude')
				.map((c) =>
					c.type === 'Box'
						? computeBoundingBoxVertices(c)
						: computeEllipsoidParams(c)
				);
			for (let j = meshIndexIntervals[i]; j < meshIndexIntervals[i + 1]; j++) {
				const x = floatPositions[j * 3];
				const y = floatPositions[j * 3 + 1];
				const z = floatPositions[j * 3 + 2];
				if (
					(paramsIn.length === 0 || isInBounds(x, y, z, paramsIn)) &&
					(paramsOut.length === 0 || !isInBounds(x, y, z, paramsOut))
				) {
					const w =
						1 /
						(matrixWorld[3] * x +
							matrixWorld[7] * y +
							matrixWorld[11] * z +
							matrixWorld[15]);
					renderedPositions[splatRC * 3] =
						(matrixWorld[0] * x +
							matrixWorld[4] * y +
							matrixWorld[8] * z +
							matrixWorld[12]) *
						w;
					renderedPositions[splatRC * 3 + 1] =
						(matrixWorld[1] * x +
							matrixWorld[5] * y +
							matrixWorld[9] * z +
							matrixWorld[13]) *
						w;
					renderedPositions[splatRC * 3 + 2] =
						(matrixWorld[2] * x +
							matrixWorld[6] * y +
							matrixWorld[10] * z +
							matrixWorld[14]) *
						w;
					wasmMemoryIndexes[splatRC] = j;
					splatRC++;
				}
			}
		}
	}
	function getOutOfBoundsIndexes(floatPositions, crops) {
		const outOfBoundsIndexes = [];
		const paramsIn = crops
			.filter((a) => a.enabled && a.mode === 'Include')
			.map((c) =>
				c.type === 'Box'
					? computeBoundingBoxVertices(c)
					: computeEllipsoidParams(c)
			);
		const paramsOut = crops
			.filter((a) => a.enabled && a.mode === 'Exclude')
			.map((c) =>
				c.type === 'Box'
					? computeBoundingBoxVertices(c)
					: computeEllipsoidParams(c)
			);

		const len = floatPositions.length;
		for (let j = 0; j < len; j += 3) {
			const x = floatPositions[j];
			const y = floatPositions[j + 1];
			const z = floatPositions[j + 2];
			if (
				(paramsIn.length === 0 || isInBounds(x, y, z, paramsIn)) &&
				(paramsOut.length === 0 || !isInBounds(x, y, z, paramsOut))
			) {
				// in bounds: intentionally skip
			} else {
				outOfBoundsIndexes.push(j / 3);
			}
		}
		// console.log(outOfBoundsIndexes);
		return outOfBoundsIndexes;
	}

	function isInBounds(x, y, z, params, mode) {
		return params[mode === 'Intersect' ? 'every' : 'some']((param) => {
			const t = applyRotationMatrix(
				x,
				y,
				z,
				param.invRotationMatrix,
				param.cropCenter
			);
			return Array.isArray(param)
				? isVertexInsideBoundingBox(t.x, t.y, t.z, param)
				: isPointInsideEllipsoid(t.x, t.y, t.z, param);
		});
	}
	function applyRotationMatrix(_x, _y, _z, e, pivot) {
		const x = _x - pivot[0];
		const y = _y - pivot[1];
		const z = _z - pivot[2];
		const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
		return {
			x: (e[0] * x + e[4] * y + e[8] * z + e[12]) * w + pivot[0],
			y: (e[1] * x + e[5] * y + e[9] * z + e[13]) * w + pivot[1],
			z: (e[2] * x + e[6] * y + e[10] * z + e[14]) * w + pivot[2],
		};
	}
	function computeBoundingBoxVertices(box) {
		const halfSizeX = box.cropSize[0] / 2;
		const halfSizeY = box.cropSize[1] / 2;
		const halfSizeZ = box.cropSize[2] / 2;
		const bounds = [
			box.cropCenter[0] - halfSizeX,
			box.cropCenter[1] - halfSizeY,
			box.cropCenter[2] - halfSizeZ,
			box.cropCenter[0] + halfSizeX,
			box.cropCenter[1] + halfSizeY,
			box.cropCenter[2] + halfSizeZ,
		];
		const invRotationMatrix = getInvRotationMatrix(box.cropRotation);
		return Object.assign(bounds, {
			invRotationMatrix,
			cropCenter: box.cropCenter,
		});
	}
	function getInvRotationMatrix(_rotation) {
		const te = [];
		const x = (_rotation[0] * Math.PI) / 180,
			y = (_rotation[1] * Math.PI) / 180,
			z = (_rotation[2] * Math.PI) / 180;
		const a = Math.cos(x),
			b = Math.sin(x);
		const c = Math.cos(y),
			d = Math.sin(y);
		const e = Math.cos(z),
			f = Math.sin(z);
		const ae = a * e,
			af = a * f,
			be = b * e,
			bf = b * f;

		te[0] = c * e;
		te[1] = -c * f;
		te[2] = d;

		te[4] = af + be * d;
		te[5] = ae - bf * d;
		te[6] = -b * c;

		te[8] = bf - ae * d;
		te[9] = be + af * d;
		te[10] = a * c;

		te[12] = 0;
		te[13] = 0;
		te[14] = 0;

		te[3] = 0;
		te[7] = 0;
		te[11] = 0;
		te[15] = 1;

		return te;
	}
	function isVertexInsideBoundingBox(x, y, z, bounds) {
		return (
			x >= bounds[0] &&
			x <= bounds[3] &&
			y >= bounds[1] &&
			y <= bounds[4] &&
			z >= bounds[2] &&
			z <= bounds[5]
		);
	}
	function computeEllipsoidParams(ellipsoid) {
		// Precompute the scaling factors
		const invRadiusX = 2 / ellipsoid.cropSize[0];
		const invRadiusY = 2 / ellipsoid.cropSize[1];
		const invRadiusZ = 2 / ellipsoid.cropSize[2];
		const invRotationMatrix = getInvRotationMatrix(ellipsoid.cropRotation);
		return {
			invRadiusX,
			invRadiusY,
			invRadiusZ,
			cropCenter: ellipsoid.cropCenter,
			invRotationMatrix,
		};
	}
	function isPointInsideEllipsoid(x, y, z, ellipsoidParams) {
		const _x = (x - ellipsoidParams.cropCenter[0]) * ellipsoidParams.invRadiusX;
		const _y = (y - ellipsoidParams.cropCenter[1]) * ellipsoidParams.invRadiusY;
		const _z = (z - ellipsoidParams.cropCenter[2]) * ellipsoidParams.invRadiusZ;
		return _x * _x + _y * _y + _z * _z <= 1;
	}

	self.onmessage = (e) => {
		if (e.data.getCroppedIndexes) {
			const outOfBoundsIndexes = new Uint32Array(
				getOutOfBoundsIndexes(new Float32Array(e.data.positions), e.data.crops)
			).buffer;
			self.postMessage(
				{
					outOfBoundsIndexes,
				},
				[outOfBoundsIndexes]
			);
		} else if (e.data.positions) {
			positions = e.data.positions;
			floatPositions = new Float32Array(positions);
			meshMatrixWorlds = e.data.meshMatrixWorlds;
			cropsArray = e.data.cropsArray;
			meshIndexIntervals = e.data.meshIndexIntervals;
			updateRenderedSplats(meshMatrixWorlds, cropsArray, meshIndexIntervals);
			self.postMessage({
				sortSetupComplete: true,
			});
		} else if (e.data.sort || e.data.newMatrixWorlds || e.data.newCropsArray) {
			if (e.data.newMatrixWorlds || e.data.newCropsArray) {
				cropsArray = e.data.newCropsArray || cropsArray;
				meshMatrixWorlds = e.data.newMatrixWorlds || meshMatrixWorlds;
				updateRenderedSplats(meshMatrixWorlds, cropsArray, meshIndexIntervals);
			}
			sort(e.data.sort.view, e.data.sort.cameraPosition);
		} else if (e.data.init) {
			// Yep, this is super hacky and gross :(
			Constants = e.data.init.Constants;

			splatCount = e.data.init.splatCount;

			const INDEXES_BYTES_PER_ENTRY = Constants.BytesPerInt;
			const POSITIONS_BYTES_PER_ENTRY = Constants.BytesPerFloat * 3;

			const sorterWasmBytes = new Uint8Array(e.data.init.sorterWasmBytes);
			const memoryBytesPerVertex =
				INDEXES_BYTES_PER_ENTRY + POSITIONS_BYTES_PER_ENTRY;
			const memoryRequiredForVertices = splatCount * memoryBytesPerVertex;
			const memoryRequiredForSortBuffers =
				splatCount * Constants.BytesPerInt * 2 +
				Constants.DepthMapRange * Constants.BytesPerInt * 2;
			const extraMemory = Constants.MemoryPageSize * 32;
			const totalRequiredMemory =
				memoryRequiredForVertices + memoryRequiredForSortBuffers + extraMemory;
			const totalPagesRequired =
				Math.floor(totalRequiredMemory / Constants.MemoryPageSize) + 1;
			const sorterWasmImport = {
				module: {},
				env: {
					memory: new WebAssembly.Memory({
						initial: totalPagesRequired * 2,
						maximum: totalPagesRequired * 3,
						shared: true,
					}),
				},
			};
			WebAssembly.compile(sorterWasmBytes)
				.then((wasmModule) => {
					return WebAssembly.instantiate(wasmModule, sorterWasmImport);
				})
				.then((instance) => {
					wasmInstance = instance;
					indexesOffset = 0;
					positionsOffset = splatCount * INDEXES_BYTES_PER_ENTRY;
					viewProjOffset =
						positionsOffset + splatCount * POSITIONS_BYTES_PER_ENTRY;
					sortBuffersOffset = viewProjOffset + 16 * Constants.BytesPerFloat * 2;
					frequenciesOffset =
						sortBuffersOffset + splatCount * Constants.BytesPerInt;
					indexesOutOffset =
						frequenciesOffset + Constants.DepthMapRange * Constants.BytesPerInt;
					wasmMemory = sorterWasmImport.env.memory.buffer;
					self.postMessage({
						sortSetupPhase1Complete: true,
					});
				});
		}
	};
}
`,")(self)"],{type:"application/javascript"}))),s=atob("AGFzbQEAAAAADwhkeWxpbmsuMAEEAAAAAAETA2AAAGAIf39/f39/f38AYAABfwISAQNlbnYGbWVtb3J5AgMAgIAEAwQDAAECBzkDEV9fd2FzbV9jYWxsX2N0b3JzAAALc29ydEluZGV4ZXMAARNlbXNjcmlwdGVuX3Rsc19pbml0AAIK3gMDAwABC9IDAwF/BnwBfgJAIAdFDQAgAysDUCEMIAMrAzAhDSADKwMQIQ5BACEDRP///////+9/IQtEAAAAAAAAEAAhCgNAIAIgA0ECdGoCfyAOIAEgA0EMbGoiCCoCALuiIA0gCCoCBLuioCAMIAgqAgi7oqBEAAAAAAAAsECiIgmZRAAAAAAAAOBBYwRAIAmqDAELQYCAgIB4CzYCACAJIAsgCSALYxshCyAJIAogCSAKZBshCiADQQFqIgMgB0cNAAsgB0UNACAGuCAKIAuhoyEJQQAhAwNAAn8gCSACIANBAnRqIgEoAgC3IAuhoiIKmUQAAAAAAADgQWMEQCAKqgwBC0GAgICAeAshCCABIAg2AgAgBCAIQQJ0aiIBIAEoAgBBAWo2AgAgA0EBaiIDIAdHDQALCyAGQQJPBEAgBCgCACEIQQEhAwNAIAQgA0ECdGoiASABKAIAIAhqIgg2AgAgA0EBaiIDIAZHDQALCyAHQQFrIgGtIQ8DQCAEIAIgD6dBAnQiA2ooAgBBAnRqIgcgBygCAEEBayIHNgIAIAUgASAHa0ECdGogACADaigCADYCACAPUCEDIA9CAX0hDyADRQ0ACyAGBEAgBEEAIAZBAnT8CwALCwQAQQAL"),i=new Uint8Array(s.length);for(let r=0;r<s.length;r++)i[r]=s.charCodeAt(r);return n.postMessage({init:{sorterWasmBytes:i.buffer,splatCount:e,Constants:{BytesPerFloat:E.BytesPerFloat,BytesPerInt:E.BytesPerInt,DepthMapRange:E.DepthMapRange,MemoryPageSize:E.MemoryPageSize}}}),n})(t),this.sortWorker.onmessage=e=>{e.data.sortDone?(this.sortRunning=!1,this.splatMesh?.updateIndexes(new Uint32Array(e.data.indexesBuffer)),this.lastSortTime=e.data.sortTime,this.queuedMessage&&(this.sortWorker.postMessage(this.queuedMessage),this.queuedMessage=null)):e.data.sortCanceled?this.sortRunning=!1:e.data.sortSetupPhase1Complete?this.sortWorker.postMessage({positions:this.splatMesh.getCenters().buffer,meshMatrixWorlds:this.splatMesh.meshMatrixWorlds,meshIndexIntervals:this.splatMesh.meshIndexIntervals,cropsArray:this.cropsArray}):e.data.sortSetupComplete&&(this.splatDataTextures=this.splatMesh.getSplatDataTextures(),this.scene.activePage.add(this.splatMesh),this.needsInitialRender=!0)}}update(t,e){this.splatMesh!==null&&(this.updateSplatMeshUniforms(t,e),this.updateView(!1,e))}getSplatMesh(){return this.splatMesh}},qe=new Vt;qe.wireframe=!0;var De=new y,fn=class extends Ut{constructor(t,e){super(),this.data=t,this.sharedAssets=e,this.enableHelpers=!1,this.wireframeState=!1,this.needsTransmissionDirty=!0,this.needsNormalDirty=!0,this.needsReflectionDirty=!0,this._needsTransmission=!1,this._needsNormal=!1,this._normalPassNeeds={outline:!1,cavity:!1},this._needsReflection=!1,this.geometryCacheChanged=!1,this.splatViewer=null,this.shapeBlendIntances=[],this.hairInstances=[],this.shadowsDirty=!0,this.instanceGroupsDirty=!0,this._autoInstancing=null,this.entityByUuid={},this.entityIdentityToEntity={},this.toExpandCloner=new Set,this.toUpdateCloner=new Set,this.pendingCommands=[],this.pathConstraints=new Ve,this.invisibleObjects=new B("jflkdsafjasdifjaslk",{...ee.defaultData,visible:!1,name:"buildin invisible"}),this.needsRecomputeInstances=!1,this.init(t,e),this.matrixAutoUpdate=!1,this.errorPage=new I("fdasfa",{...ne.defaultData,name:""},{shared:e,scene:this})}markGeometryCacheDirty(){this.geometryCacheChanged=!0}markShadowsDirty(){this.shadowsDirty=!0}markInstanceGroupsDirty(){this.instanceGroupsDirty=!0}get autoInstancing(){return this._autoInstancing}updateInstanceGroups(t,e){let n=this._autoInstancing;(n===null||n.minGroupSize!==e)&&(n?.dispose(),n=new je(e),this._autoInstancing=n);let s=this.instanceGroupsDirty;return this.instanceGroupsDirty=!1,n.update(t,s),n.stats}releaseInstanceGroups(){this._autoInstancing?.teardown(),this.instanceGroupsDirty=!0}markNeedsUpdateRendererDirty(){this.needsTransmissionDirty=!0,this.needsNormalDirty=!0,this.needsReflectionDirty=!0,this.shadowsDirty=!0,this.instanceGroupsDirty=!0}needsTransmission(){return this.needsTransmissionDirty&&(this._needsTransmission=fe(this),this.needsTransmissionDirty=!1),this._needsTransmission}needsNormal(){return this.needsNormalDirty&&(this._normalPassNeeds=me(this),this._needsNormal=this._normalPassNeeds.outline||this._normalPassNeeds.cavity,this.needsNormalDirty=!1),this._needsNormal}normalPassNeeds(){return this.needsNormal(),this._normalPassNeeds}needsReflection(){return this.needsReflectionDirty&&(this._needsReflection=ye(this),this.needsReflectionDirty=!1),this._needsReflection}registerInstanceAndSetUuid(t){let e=t.identity.join("-"),n=this.entityIdentityToEntity[e];n&&(t.uuid=n.uuid),this.entityIdentityToEntity[e]=t,this.entityByUuid[t.uuid]=t}markPenumbraSizeDirty(){for(let t of this.children)t instanceof I&&(t.penumbraSizeArrayCache=null)}findInstance(t){return this.entityIdentityToEntity[t.join("-")]}get bgColor(){return this.activePage.bgColor}get postprocessing(){return this.activePage.data.postprocessing}getWithSortKey(t){let e=this.find(t);if(e===void 0)return;let n=[],s=e;for(;s!==this;){let i=s;s=s.parent;let r=s.children.indexOf(i);n.splice(0,0,r)}return{entity:e,sortKey:n}}getAllSorted(t){let e=[];for(let n of t){let s=this.getWithSortKey(n.id);s!==void 0&&e.push(s)}return e.sort((n,s)=>Ht(n.sortKey,s.sortKey)),e.map(n=>n.entity)}nonExistOrDescendantOf(t,e){let n=this.find(t);if(n===void 0)return!0;for(;n;){if(n.uuid===e)return!0;n=n.parent}return!1}find(t){if(this.activePage&&this.activePage.personalCamera.parent){if(t==="f23858d0-4a3b-4bd8-8173-66ed0af7f6fb-personalCamera")return this.activePage.personalCamera;if(t===te)return this.activePage.personalCamera}if(t===""||t===void 0)return;let e=this.entityByUuid[t];return e===void 0?this.getObjectByProperty("uuid",t):e}find2D(t){for(let e of this.children)if(e instanceof I&&e.uiScene){let n=e.uiScene.find(t);if(n)return n}}findScene2DfromObject2D(t){for(let e of this.children)if(e instanceof I&&e.uiScene&&e.uiScene.find(t))return e.uiScene}find2DInUIObjects(t){let e;return this.traverseEntity(n=>{e===void 0&&Y(n)&&(e=n.uiCanvas.find(t))}),e}traverse2D(t){for(let e of this.children)e instanceof I&&e.uiScene&&e.uiScene.traverse(t)}debugEnsureEntity(t){let e=this.find(t);e?Array.isArray(e.identity)&&this.findInstance(e.identity)===void 0&&console.error("not found instance"):console.error("not found")}addPendingExpandCloner(t){this.toExpandCloner.add(t)}addPendingUpdateCloner(t){this.toUpdateCloner.add(t)}markToExpandCloner(t){this.toExpandCloner.add(t),t.traverseEntityAncestors(e=>{this.toExpandCloner.add(e)})}doPendingExpandCloner(t){this.toExpandCloner.forEach(e=>{e.expandCloner(t)}),this.toExpandCloner.clear()}doPendingUpdateCloner(t){this.toUpdateCloner.forEach(e=>{e.cloner?.update(t)}),this.toUpdateCloner.clear()}doPendingUpdates(t){this.doPendingExpandCloner(t),this.doPendingUpdateCloner(t),this.applyPendingCommands()}addPendingCommand(t){this.pendingCommands.push(t)}applyPendingCommands(){this.pendingCommands.forEach(t=>t()),this.pendingCommands.length=0}updateByLibOp(t,e){t.path.length===1&&t.path[0]==="components"&&t.type===1&&this.createChildrenObjects([{...t.data.asset,id:t.id}],this.invisibleObjects,e)}updateTreeByOp(t,e){if(t.path.length===0&&t.type===7){let n=t.parent===null?this:this.find(t.parent);if(n===void 0)throw new Error(`scene tree add: parent ${t.parent} not found for object ${t.id}`);let s=this.createObject(t.id,t.data,t.children,n,t.localIndex,e);s.updateVisible(this),s.resetBBoxNeedsUpdate(),T(s)&&k(s.parent)&&(s.invalidateUpstreamBooleanData(),s.parent.invalidateDownstreamBooleanData().recomputeBoolean()),this.markNeedsRecomputeInstancesForAncessors(n),this.markNeedsRecomputeInstancesForChildren(s),this.markToExpandCloner(s),this.markPenumbraSizeDirty(),s.updatePathSnapping()}else if(t.path.length===0&&t.type===8){let n=this.find(t.id);if(n===void 0)throw new Error(`scene tree delete: object ${t.id} not found`);n.traverseEntity(i=>{q(i)&&(this.shapeBlendIntances=this.shapeBlendIntances.filter(r=>r!==i)),F(i)&&(this.hairInstances=this.hairInstances.filter(r=>r!==i))}),this.markToExpandCloner(n),n.resetBBoxNeedsUpdate(),this.unregisterObject(n);let s=n.parent;this.markNeedsRecomputeInstancesForAncessors(s),this.markNeedsRecomputeInstancesForChildren(n),this.markPenumbraSizeDirty(),n.parent.remove(n),k(n.parent)&&(n.parent.invalidateUpstreamBooleanData(),n.parent.invalidateDownstreamBooleanData().recomputeBoolean()),T(n)&&(n.freeBooleanPointer(),s instanceof $&&s.invalidateDownstreamBooleanData().recomputeBoolean()),St(n)&&n.detachShape(),this.disposeAndUnregisterEntityRecursivelyIfNotReregistered(n),this.pathConstraints.removeDependencies(n.uuid),n.updatePathSnapping()}else if(t.path.length===0&&t.type===9){let n=this.find(t.id);if(n===void 0)throw new Error(`scene tree move: object ${t.id} not found`);this.markNeedsRecomputeInstancesForChildren(n);let s=n.parent;this.markNeedsRecomputeInstancesForAncessors(s),n.cloner?.resetOnMove(),this.markToExpandCloner(n);let i=t.parent===null?this:this.find(t.parent);if(i===void 0)throw new Error(`scene tree move: new parent ${t.parent} not found for object ${t.id}`);i.add(n),this.markNeedsRecomputeInstancesForAncessors(i),this.markToExpandCloner(n),n.invalidateClonerTransform(n),n.updateVisible(this),n.resetBBoxNeedsUpdate(),this.markPenumbraSizeDirty();let r=t.localIndex;i.children.splice(r,0,i.children.pop()),T(n)&&(n.invalidateUpstreamBooleanData(),k(n.parent)?n.parent.invalidateDownstreamBooleanData().recomputeBoolean():s instanceof $&&s.invalidateDownstreamBooleanData().recomputeBoolean()),n.updatePathSnapping()}this.markNeedsUpdateRendererDirty(),this.markGeometryCacheDirty()}get playPage(){return this.find(this.data.publish.playPage)??this.errorPage}updatePage(t){this.shadowsDirty=!0,this.activePage&&this.activePage.onDeactive(),this.activePage=this.errorPage;for(let e of this.children)e instanceof I&&(e.visible=e.uuid===t,e.visible&&(this.activePage=e,this.activePage.onActive(this)));this.activePage!==this.splatViewer?.activePage&&this.reloadSplats()}updateEntityByOp(t,e,n,s){if(this.shadowsDirty=!0,e.type===0){if(("overrides"in e.props||"component"in e.props)&&this.markNeedsRecomputeInstances(),"visible"in e.props&&this.markPenumbraSizeDirty(),e.path.includes("overrides")&&"states"in e.props){let{rest:r}=e.props;e={...e,props:r},this.markNeedsRecomputeInstances()}e.path[0]==="pathSnapping"&&e.props.pathId!==void 0&&this.pathConstraints.setConstraint(t,e.props.pathId)}let i=this.find(t);if(i)try{(function(r,a,o,l){r.updateByOp(a,o,l,!1)})(i,e,n,{scene:this,shared:s}),i instanceof C&&i.updateGeometryGroupsIfNeeded()}catch(r){console.error(r)}}updateEntity2DByOp(t,e,n,s,i,r=[]){t.updateEntityByOp(e,n,s,i),this.traverseEntity(a=>{(Y(a)||a instanceof I)&&(r.includes(a.frameId??"")||a.frameId===e)&&a.updateEntity2DByOp(e,n,s,i)})}get activeCamera(){return this.activePage.activeCamera}switchActiveCamera(t){this.activePage.switchActiveCamera(t)}isInvisibleObjects(t){return t===this.invisibleObjects||t.hasAnccestor(this.invisibleObjects)}init(t,e){let n=Object.entries(e.data.lib.components).map((s,i)=>({data:s[1].asset.data,children:s[1].asset.children,id:s[0],fi:i}));this.invisibleObjects.updateState(this.invisibleObjects.data,{scene:this,shared:e}),this.add(this.invisibleObjects),this.createChildrenObjects(n,this.invisibleObjects,e),this.createChildrenObjects(t.objects,this,e),this.updatePage(t.publish.playPage),this.activePage.switchToPlayCamera(),this.expandInstances(e,!0),this.traverseEntity(s=>{s instanceof J&&s.updateUp()}),this.doPendingExpandCloner({scene:this,shared:e}),this.applyPendingCommands()}markNeedsRecomputeInstances(){this.needsRecomputeInstances=!0}markNeedsRecomputeInstancesForChildren(t){t.traverseEntity(e=>{(e.data.type==="Component"||e.data.type==="Instance")&&this.markNeedsRecomputeInstances()})}markNeedsRecomputeInstancesForAncessors(t){x.is(t)&&(t.data.type==="Component"&&this.markNeedsRecomputeInstances(),t.traverseAncestors(e=>{x.is(e)&&e.data.type==="Component"&&this.markNeedsRecomputeInstances()}))}relativeizeInner(t,e,n,s,i,r,a){if(t){let o=s.find(t);o&&o!==s&&i.forInstancesRec(l=>{l.data=ot(l.data,d=>{let p=d.events.data(a.id),c=l.goUp(r);if(c){let h=[...Kt(c.identity),t].join("-"),u=this.entityIdentityToEntity[h];if(u){let f=u.uuid;$t.zoom(p,e)[n]=f}else console.warn("cannot find instance")}}).data})}}rewriteActions(t,e,n,s,i,r){t.forEach(a=>{a.data.type==="Transition"||a.data.type==="Animation"&&a.data.object?this.relativeizeInner(a.data.object,[...e,a.id],"object",n,s,i,r):a.data.type==="Conditional"&&(this.rewriteActions(a.data.ifActions,[...e,a.id,"ifActions"],n,s,i,r),this.rewriteActions(a.data.elseActions,[...e,a.id,"elseActions"],n,s,i,r))})}rewriteEventsBeforeGoToPlayMode(){this.traverseEntity(t=>{if(Q(t)&&typeof t.identity=="string"&&t.data.type==="Component")return t.traverseEntity((e,n)=>{e.data.events.forEach(s=>{if(s.data.type==="GameControl"){let i=!1;if(e.forInstancesRec(r=>{r.data=ot(r.data,a=>{r.isInstanceRoot||(a.events.delete(s.id),i=!0)}).data}),i===!1)for(let r of se.list)this.rewriteActions(s.data.gameActions[r],["gameActions",r],t,e,n,s)}else s.data.type==="Conditional"?(s.data.condition.type==="Distance"?(this.relativeizeInner(s.data.condition.fromObject,["condition"],"fromObject",t,e,n,s),this.relativeizeInner(s.data.condition.toObject,["condition"],"toObject",t,e,n,s)):s.data.condition.type==="State"?this.relativeizeInner(s.data.condition.object,["condition"],"object",t,e,n,s):s.data.condition.type==="Comparison"&&(s.data.condition.lOperand.type==="Property"&&this.relativeizeInner(s.data.condition.lOperand.value[0],["condition","lOperand","value"],0,t,e,n,s),s.data.condition.rOperand.type==="Property"&&this.relativeizeInner(s.data.condition.rOperand.value[0],["condition","rOperand","value"],0,t,e,n,s)),this.rewriteActions(s.data.inActions,["inActions"],t,e,n,s),this.rewriteActions(s.data.outActions,["outActions"],t,e,n,s)):"actions"in s.data&&this.rewriteActions(s.data.actions,["actions"],t,e,n,s)})}),!0})}expandInstances(t,e,n){let s=new Set;this.traverseEntity(i=>{if(Q(i)&&i.isInstanceRoot)return i.expandInstanceChildren({scene:this,shared:t,pendingDeletes:s}),e||i.resetBBoxNeedsUpdate(),n&&i.traverseEntity(r=>{n.addClip(r)}),!0});for(let i of s)this.disposeAndUnregisterEntityRecursivelyIfNotReregistered(i),ge(i)}recomputeInstances(t,e){this.needsRecomputeInstances&&(this.needsRecomputeInstances=!1,this.traverseEntity(n=>{Q(n)&&n.isInstanceRoot&&(n.component=void 0)}),this.expandInstances(t,!1,e))}disposeAndUnregisterEntityRecursivelyIfNotReregistered(t){t.traverseEntity(e=>{let n=typeof e.identity=="string"?e.identity:e.identity.join("-");this.entityIdentityToEntity[n]===e&&(delete this.entityByUuid[e.uuid],delete this.entityIdentityToEntity[n]),e.dispose()})}clearScene(){this._autoInstancing?.dispose(),this._autoInstancing=null,this.instanceGroupsDirty=!0;for(let t of this.children)x.is(t)&&t.disposeRecursively();this.children.length=0}resetAfterClear(t,e){this.init(t,e)}raycast(t){return this.raycast1(t,!1)}raycast1(t,e){let n=[],s=i=>{for(let r of i.children){let a=r.cloner;if(x.is(r)&&!r.raycastLock&&(r.visible||a?.object.data.visible))if(e===!0&&r.isInstanceRoot){let o=[];if(t.intersectObject(r,!0,o),o.length){let l=o[0];l.object=r,l.point.applyMatrix4(l.object.matrixWorld);let d=r.matrixWorld.clone().invert();l.point.applyMatrix4(d),n.push(l)}}else(T(r)||ht(r)&&this.enableHelpers&&r.objectHelper.visible)&&(t.intersectObject(r,!1,n),ut(r,t,n)),s(r)}};return s(this.activePage),n}raycastWithClones(t){let e=[],n=s=>{for(let i of s.children){let r=i.cloner;x.is(i)&&(i.visible||r?.object.data.visible)&&((T(i)||ht(i)&&this.enableHelpers&&i.objectHelper.visible)&&(t.intersectObject(i,!1,e),ut(i,t,e,!0)),n(i))}};return n(this),e}forEachEntity(t){for(let e of this.children)x.is(e)&&t(e)}traverseConcreteEntity(t){for(let e of this.children)x.is(e)&&e.isConcreteEntity&&e.traverseEntity(t)}traverseEntity(t){for(let e of this.children)x.is(e)&&e.traverseEntity(t)}updateFont(t,e){this.traverseEntity(n=>{if(n instanceof C&&n.data.type==="Mesh"&&(n.data.geometry.type==="TextGeometry"||n.data.geometry.type==="InputGeometry")&&n.data.geometry.font===t){let s=n.geometry,i=n.data.geometry;s.updateFont(t,e).then(()=>{s.update(i,e);let r=n.invalidateDownstreamBooleanData();k(r)&&r.recomputeBoolean()})}})}traverseObject(t){for(let e of this.children)re.is(e)&&e.traverseObject(t)}traverseVisibleEntity(t){for(let e of this.children)x.is(e)&&e.visible&&e.traverseVisibleEntity(t)}dispose(){this.clearScene()}createChildrenObjects(t,e,n){let s=0;for(let i of t)this.createObject(i.id,i.data,i.children,e,s,n),s+=1}registerObjectCreatedInLegacy(t){this.entityByUuid[t.uuid]=t}unregisterObject(t){delete this.entityByUuid[t.uuid];for(let e of t.children)this.unregisterObject(e)}createObject(t,e,n,s,i,r){let a={scene:this,shared:r},o=bt(t,e,a);return q(o)&&this.shapeBlendIntances.push(o),F(o)&&this.hairInstances.push(o),o&&(this.entityByUuid[t]=o,s.add(o),s.children.splice(i,0,s.children.pop()),n.length>0&&(o.isInstanceRoot?console.error("instance should not have children!"):this.createChildrenObjects(n,o,r)),o.updateState(e,a),o instanceof C&&o.updateGeometryGroupsIfNeeded(),o.updateVisible(this),o.cloner&&this.toExpandCloner.add(o),e.pathSnapping?.pathId&&this.pathConstraints.setConstraint(t,e.pathSnapping.pathId)),e.type==="Empty"&&e.animations&&o.traverseEntity(l=>{let d=l.dataPatched;if(l instanceof C&&d.bones&&d.boneInverses){let p=d.bones.map(u=>this.find(u)),c=d.boneInverses.map(u=>new S().fromArray(u)),h=new Yt(p,c);l.bind(h,l.bindMatrix)}else l.matrixAutoUpdate=!0}),o}getCenter(t){let e=[];for(let s=0,i=t.length;s<i;++s){let{id:r,recursive:a}=t[s],o=this.find(r),l=a?o.recursiveBBox:o.singleBBox;e.push(...l.vertices)}let n=new Z;return n.setFromPoints(e),n.getCenter(De),De}copyMatrixWorld(t,e){if(t===null)return void e.identity();let n=this.find(t);n?(n.updateWorldMatrix(!0,!1),e.copy(n.matrixWorld)):e.identity()}copyParentMatrixWorld(t,e){if(t===null)return void e.identity();let n=this.find(t)?.parent;n?(n.updateWorldMatrix(!0,!1),e.copy(n.matrixWorld)):e.identity()}traverseMaterial(t){this.traverseEntity(e=>{if(e instanceof dt)if(Array.isArray(e.material))for(let n=0;n<e.material.length;n++)pt(e.material[n])&&t(e.material[n]);else pt(e.material)&&t(e.material)})}updateViewPlaneSize(t,e,n=!1){this.traverseConcreteEntity(s=>{s instanceof J&&s.setViewplaneSize(t,e,n)})}initializeSplatViewer(){this.splatViewer=new Fe({scene:this}),this.reloadSplats()}reloadSplats(){this.splatViewer?.loadSplat()}};export{pn as a,hn as b,un as c,mn as d,qe as e,fn as f};
