function r(o){let t=!1;return o.scene.objects.traverse((a,e)=>{(e.type==="Mesh"&&e.geometry.type==="UIGeometry"||e.type==="Page"&&e.uiFrame!==void 0)&&(t=!0)}),t}export{r as a};
