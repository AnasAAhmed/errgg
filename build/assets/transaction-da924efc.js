import{f as m,ab as l,r as o,_ as x,j as e,a6 as p,L as h,c as f}from"./index-0f62f80c.js";import{A as j}from"./AdminSidebar-9f8bfcf3.js";import{T as g}from"./TableHOC-6c71695a.js";const b=[{Header:"User",accessor:"user"},{Header:"userId",accessor:"userId"},{Header:"Amount",accessor:"amount"},{Header:"Discount",accessor:"discount"},{Header:"Quantity",accessor:"quantity"},{Header:"Status",accessor:"status"},{Header:"Action",accessor:"action"}],T=()=>{const{user:a}=m(s=>s.userReducer),{isLoading:n,data:t,isError:c,error:d}=l(a==null?void 0:a._id),[r,i]=o.useState([]);if(c){const s=d;x.error(s.data.message)}o.useEffect(()=>{t&&i(t.orders.map(s=>({user:s.user.name,userId:e.jsxs("div",{className:"line-clamp-2",children:[e.jsx(p,{text:s.user._id}),"..."]}),amount:s.total,discount:s.discount,quantity:s.orderItems.length,status:e.jsx("span",{className:s.status==="Processing"?"red":s.status==="Shipped"?"green":"purple",children:s.status}),action:e.jsx(h,{className:"text-md font-medium py-1 px-2 rounded-md hover:bg-black hover:text-white",to:`/admin/transaction/${s._id}`,children:"Manage"})})))},[t]);const u=g(b,r,"dashboard-product-box","Transactions",r.length>6)();return e.jsxs("div",{className:"admin-container",children:[e.jsx(j,{}),e.jsx("main",{children:n?e.jsx(f,{className:"animate-spin h-44 w-44 my-40 mx-auto text-gray-500"}):u})]})};export{T as default};
