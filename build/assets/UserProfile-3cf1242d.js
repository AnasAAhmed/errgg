import{e as D,f as I,g as E,r as l,h as P,j as e,L as T,i as _,k as B,l as R,c as y,s as z,m as G,_ as a}from"./index-0f62f80c.js";import{r as H}from"./features-89b8e0b8.js";import{M as Y}from"./index.esm-cbc4486d.js";const V=()=>{const v=D(),{user:t}=I(s=>s.userReducer),[w]=E(),[S,o]=l.useState(!1),[k,r]=l.useState(!1),[C,c]=l.useState(!1),[M,n]=l.useState(!1),[i,d]=l.useState(""),[u,m]=l.useState(""),[x,f]=l.useState(""),[b,h]=l.useState(0);l.useEffect(()=>{t&&(d(t.name),m(t.dob.toString().split("T")[0]),f(t.gender),h(t.phone))},[t]);const p=()=>o(!1),L=()=>o(!0),g=()=>r(!1),O=()=>r(!0),j=s=>{s.target===s.currentTarget&&(p(),g())},N=async()=>{try{await z(G),a.success("Signed out successfully")}catch{a.error("Sign out failed")}},A=async s=>{s.preventDefault();try{c(!0),await w({id:t._id,name:i,dob:u,gender:x,phone:b}).unwrap(),a.success("user! updated successfully"),location.reload()}catch{a.error("Failed to update profile")}finally{c(!1)}},[F]=P(),U=async()=>{try{n(!0);const s=await F({userId:t._id});N(),H(s,v,"/"),n(!1)}catch{a.error("Failed to Delete Account"),n(!1)}};return e.jsx("div",{className:"flex items-center justify-center",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg w-full max-w-lg p-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs(T,{to:"/",className:"text-blue-500 flex items-center",children:[e.jsx(_,{className:"mr-2"})," Back"]}),e.jsx("h3",{className:"text-xl font-semibold",children:"Account"}),e.jsx("h3",{className:"text-xl invisible font-semibold",children:"Profile"})]}),e.jsxs("form",{onSubmit:A,className:"space-y-4",children:[e.jsx("div",{className:"flex flex-col items-center mb-6 ",children:e.jsx("img",{src:t==null?void 0:t.photo,alt:"user",className:"w-16 h-16 rounded-full mb-4"})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"Name:"}),e.jsx("input",{type:"text",value:i,onChange:s=>d(s.target.value),className:"flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"Gender:"}),e.jsxs("select",{value:x,onChange:s=>f(s.target.value),className:"flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300",children:[e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"})]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"Email:"}),e.jsx("span",{className:"flex-1 truncate",children:t.email})]}),(t==null?void 0:t.role)==="admin"&&e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"Role:"}),e.jsx("span",{className:"flex-1",children:t.role})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"Phone:"}),e.jsx("input",{type:"number",value:b,onChange:s=>h(Number(s.target.value)),className:"flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("label",{className:"font-semibold w-24",children:"DOB:"}),e.jsx("input",{type:"date",value:u,onChange:s=>m(s.target.value),className:"flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"})]})]}),e.jsxs("div",{className:"flex flex-wrap sm:flex-row justify-between items-center mt-6",children:[e.jsxs("button",{type:"button",onClick:L,className:"flex items-center mt-4 xsm:mt-0 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 focus:outline-none",children:["Save ",e.jsx(Y,{className:"ml-2"})]}),e.jsxs("button",{type:"button",onClick:O,className:"flex items-center mt-4 xsm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none",children:["Delete ",e.jsx(B,{className:"ml-2"})]}),e.jsxs("button",{type:"button",onClick:N,className:"flex items-center bg-indigo-500 mt-4 xsm:mt-0 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none",children:["Logout ",e.jsx(R,{className:"ml-2"})]})]}),S&&e.jsx("div",{className:"fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50",onClick:j,children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 w-[80%] sm:w-[40%]",children:[e.jsx("p",{className:"text-center mb-4",children:"Are you sure you want to update your profile?"}),e.jsxs("div",{className:"flex justify-center",children:[e.jsx("button",{type:"submit",className:"flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",children:C?e.jsx(y,{className:"animate-spin mx-[1.1rem]"}):"Update"}),e.jsx("button",{type:"button",onClick:p,className:"ml-2 flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none",children:"No"})]})]})})]}),k&&e.jsx("div",{className:"fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50",onClick:j,children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6 w-[80%] sm:w-[40%]",children:[e.jsx("p",{className:"text-center mb-4",children:"Are you sure you want to delete your account?"}),e.jsxs("div",{className:"flex justify-center",children:[e.jsx("button",{type:"button",onClick:U,className:"flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",children:M?e.jsx(y,{className:"animate-spin mx-1"}):"Yes"}),e.jsx("button",{type:"button",onClick:g,className:"ml-2 flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none",children:"No"})]})]})})]})})};export{V as default};
