var k=()=>({handler:null,middleware:[],staticChildren:{},dynamicChild:null,dynamicName:null}),v=k();var z=(f)=>{let c=v;const b=f.split("/").filter(Boolean),S={};for(let j of b)if(c.staticChildren[j])c=c.staticChildren[j];else if(c.dynamicChild)c=c.dynamicChild,S[c.dynamicName]=j;else return null;if(!c.handler)return null;return{handler:c.handler,middleware:c.middleware,params:S}};var F=async(f)=>{const c=new URL(f.url),b=z(c.pathname);if(!b)return new Response(`Path: '${c.pathname}' not found in the Igloo Router`,{status:404,statusText:"Not Found"});if(typeof b.handler==="function"){for(let S of b.middleware)if(typeof S==="function")await S(f);return b.handler(f,b.params)}return new Response(JSON.stringify({pathname:c.pathname,route:b}))};var K=(f,c,b)=>{let S=v;const j=f.split("/").filter(Boolean);for(let x of j)if(x[0]===":")S=S.dynamicChild??=k(),S.dynamicName=x.slice(1);else S=S.staticChildren[x]??=k();S.handler=b,S.middleware=c};export{v as root,F as handler,z as findRoute,k as createNode,K as addRoute};

//# debugId=9C020093642B81F864756e2164756e21