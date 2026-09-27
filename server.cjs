const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.mp4':'video/mp4'};
http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.stat(file,(err,stat)=>{
  if(err||!stat.isFile()){res.writeHead(404).end('Not found');return}
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
  let start=0,end=stat.size-1,status=200;
  if(req.headers.range){
   const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!match||(!match[1]&&!match[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return}
   start=match[1]?Number(match[1]):Math.max(0,stat.size-Number(match[2]));
   end=match[1]&&match[2]?Math.min(Number(match[2]),end):end;
   if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`}).end();return}
   status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
  }
  headers['Content-Length']=end-start+1;res.writeHead(status,headers);
  if(req.method==='HEAD'){res.end();return}
  fs.createReadStream(file,{start,end}).pipe(res);
 });
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
