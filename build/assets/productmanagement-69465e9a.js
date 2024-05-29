import{f as oe,u as re,e as le,H as ce,r as o,am as de,an as ne,j as e,N as ie,L as me,i as pe,W as ue,a6 as xe,c as _,o as he,k as ge}from"./index-0f62f80c.js";import{A as be}from"./AdminSidebar-9f8bfcf3.js";import{r as R}from"./features-89b8e0b8.js";const Ne=()=>{const{user:c}=oe(t=>t.userReducer),H=re(),v=le(),{data:s,isLoading:M,isError:$}=ce(H.id),{price:T,cutPrice:B,photos:q,description:G,name:O,stock:n,category:Q,collections:W,size:J,color:K}=(s==null?void 0:s.product)||{photos:[""],category:"",collections:"",name:"",description:"",stock:0,price:0,cutPrice:0,size:[],color:[]},[p,w]=o.useState(T),[u,k]=o.useState(B),[x,S]=o.useState(n),[h,P]=o.useState(O),[g,U]=o.useState(G),[b,C]=o.useState(Q),[j,D]=o.useState(W),[f,z]=o.useState(J),[y,F]=o.useState(K),[N,L]=o.useState([]),[i,E]=o.useState([]),[V,I]=o.useState(!1),[X,A]=o.useState(!1),[Y]=de(),[Z]=ne(),ee=t=>{const a=t.target.files;if(a){const r=[],l=[];Array.from(a).forEach(d=>{const m=new FileReader;m.readAsDataURL(d),m.onloadend=()=>{typeof m.result=="string"&&(r.push(m.result),l.push(d),L([...N,...r]),E([...i,...l]))}})}},te=t=>{L(N.filter((a,r)=>r!==t)),E(i.filter((a,r)=>r!==t))},se=async t=>{t.preventDefault(),I(!0);const a=new FormData;h&&a.set("name",h),g&&a.set("description",g),p&&a.set("price",p.toString()),u&&a.set("cutPrice",u.toString()),x!==void 0&&a.set("stock",x.toString()),b&&a.set("category",b),j&&a.set("collections",j),f.length>0&&f.forEach((l,d)=>{a.append(`size[${d}]`,l)}),i.length>0&&i.forEach(l=>{a.append("photos",l)}),y.length>0&&y.forEach((l,d)=>{a.append(`color[${d}]`,l)});const r=await Y({formData:a,userId:c==null?void 0:c._id,productId:s==null?void 0:s.product._id});I(!1),R(r,v,"/admin/product")},ae=async()=>{A(!0);const t=await Z({userId:c==null?void 0:c._id,productId:s==null?void 0:s.product._id});A(!1),R(t,v,"/admin/product")};return o.useEffect(()=>{s&&(P(s.product.name),U(s.product.description),w(s.product.price),k(s.product.cutPrice),S(s.product.stock),C(s.product.category),D(s.product.collections),z(s.product.size),F(s.product.color))},[s]),$?e.jsx(ie,{to:"/404"}):e.jsxs("div",{className:"admin-container",children:[e.jsx(be,{}),e.jsxs("main",{className:"",children:[e.jsxs(me,{to:"/admin/product",className:"flex items-center text-blue-500 mb-4",children:[e.jsx(pe,{className:"mr-1"})," Back"]}),e.jsx("h2",{className:"heading",children:"Manage-Product"}),M?e.jsx(ue,{length:20}):e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"flex flex-wrap justify-between items-center mx-2",children:[e.jsx("strong",{className:"my-3 sm:my-0",children:e.jsx(xe,{text:s==null?void 0:s.product._id,heading:"ProductID -"})}),n>0?e.jsx(e.Fragment,{children:n<6?e.jsxs("span",{className:"red my-3 sm:my-0",children:[n," Low Stock"]}):e.jsxs("span",{className:"green my-3 sm:my-0",children:[n," Available"]})}):e.jsx("span",{className:"red my-3 sm:my-0",children:"Not Available"}),e.jsx("button",{className:"bg-red-500 my-3 sm:my-0 w-24 mt-2 h-10 text-white text-lg rounded-md mx-2 font-semibold",onClick:ae,children:X?e.jsx(_,{className:"animate-spin text-2xl mx-auto "}):"Delete"})]}),e.jsx("article",{children:e.jsxs("form",{onSubmit:se,className:"grid grid-cols-2 gap-2 sm:gap-4 mx-2 mb-12",children:[e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Name"}),e.jsx("input",{type:"text",placeholder:"Name",value:h,onChange:t=>P(t.target.value),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Description"}),e.jsx("textarea",{required:!0,rows:2,placeholder:"Description",value:g,onChange:t=>U(t.target.value),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Price"}),e.jsx("input",{type:"number",placeholder:"Price",value:p,onChange:t=>w(Number(t.target.value)),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Cut Price"}),e.jsx("input",{type:"number",placeholder:"Cut Price",value:u,onChange:t=>k(Number(t.target.value)),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Stock"}),e.jsx("input",{type:"number",placeholder:"Stock",value:x,onChange:t=>S(Number(t.target.value)),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Category"}),e.jsx("input",{type:"text",placeholder:"eg. laptop, camera etc",value:b,onChange:t=>C(t.target.value),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{children:"collections"}),e.jsx("input",{type:"text",placeholder:"eg. laptop, camera etc",value:j,onChange:t=>D(t.target.value),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Size (comma-separated)"}),e.jsx("input",{type:"text",placeholder:"eg. 0(stock),S(size),0(stock), M(size),0(stock), L(size)",value:f.join(","),onChange:t=>z(t.target.value.split(",").map(a=>a.trim())),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Color (comma-separated)"}),e.jsx("input",{type:"text",placeholder:"eg. 0(stock),Red(color),0(stock), Blue(color),0(stock), Green(color),0(stock) or hex: #000000(color)",value:y.join(","),onChange:t=>F(t.target.value.split(",").map(a=>a.trim())),className:"border border-gray-300 rounded-md w-[96%] px-3 py-3 "})]}),e.jsxs("div",{children:[e.jsx("label",{className:"font-semibold text-sm sm:text-lg block",children:"Update Photo"}),e.jsx("input",{type:"file",onChange:ee})]}),e.jsxs("div",{className:"relative",children:[q.map(t=>e.jsx("img",{src:`${he}/${t}`,alt:"New Image",className:"w-24 border-2 h-24 object-cover"})),e.jsx("span",{className:"absolute top-1  bg-blue-500 text-white rounded-full px-2 text-xs",children:"Old"})]}),e.jsx("div",{className:"flex flex-wrap",children:N.map((t,a)=>e.jsxs("div",{className:"relative m-2",children:[e.jsx("img",{src:t,alt:"New Image",className:"w-24 border-2 h-24 object-cover"}),e.jsx("span",{className:"absolute top-1 bg-blue-500 text-white rounded-full px-2 text-xs",children:"New"}),e.jsx("span",{className:"absolute top-1 right-1 bg-red-500 text-white rounded-full px-4 py-2 text-xs cursor-pointer",onClick:()=>te(a),children:e.jsx(ge,{})})]},a))}),e.jsx("button",{type:"submit",className:"bg-blue-500 w-56 h-10 my-11 flex justify-center items-center text-white text-lg rounded-md font-semibold",children:V?e.jsx(_,{className:"animate-spin text-2xl mx-3 "}):"Update"})]})})]})]})]})};export{Ne as default};