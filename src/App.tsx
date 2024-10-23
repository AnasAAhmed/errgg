import { onAuthStateChanged } from "firebase/auth";
import { lazy, Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header";
import Loader from "./components/loader";
import Home from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import { auth } from "./firebase";
import { getUser } from "./redux/api/userAPI";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { RootState } from "./redux/store";
import { io } from "socket.io-client";


const Search = lazy(() => import("./pages/search"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Collections = lazy(() => import("./pages/Collections"));
const Cart = lazy(() => import("./pages/cart"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/orderDetails"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/not-found"));
const Checkout = lazy(() => import("./pages/checkout"));

// Admin Routes Importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Reviews = lazy(() => import("./pages/admin/Reviews"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);
const socket = io('http://localhost:4000',{
  transports: ['websocket'],
});

const App = () => {

  const [adminNotification, setAdminNotification] = useState<any>(null);
  const { user, loading } = useSelector((state: RootState) => state.userReducer);
  const cartItemsLength = useSelector((state: RootState) => state.cartReducer.cartItems.length);
  const [loadingBar, setLoadingBar] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // Only subscribe to the event when the user is an admin
    if (user && user.role === 'admin') {
      socket.on('adminNotification', (data) => {
        console.log('New Order Notification:', data);
        toast.success(data.message as string);
        setAdminNotification(data);
      });
    }

    return () => {
      socket.off('adminNotification');
    };
  }, [user]);

  return (loading ? (
    <Loader />
  ) :


    <Router>
      <Header cartItemsLength={cartItemsLength} user={user} adminNotification={adminNotification} />
      <div className={`h-[3px] fixed top-0 z-50 ${loadingBar === 100 ? "hidden" : ""} bg-blue-500 animate-pulse transition-all duration-400 ease-out`} style={{ width: `${loadingBar}%` }}></div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search/:category" element={<Search />} />
          <Route path="/collections/:collection" element={<Collections />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductDetails setLoadingBar={setLoadingBar} />} />

          {/* Not logged In Route */}
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login setLoadingBar={setLoadingBar} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <SignUp setLoadingBar={setLoadingBar} />
              </ProtectedRoute>
            }
          />
          {/* Logged In User Routes */}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          {/* Admin Routes */}
          {/* <Route
          element={
            <ProtectedRoute
              isAuthenticated={true}
              adminOnly={true}
              admin={user?.role === "admin" ? true : false}
            />
          }
        > */}

          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customer" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/reviews" element={<Reviews />} />
          {/* Charts */}
          <Route path="/admin/chart/bar" element={<Barcharts />} />
          <Route path="/admin/chart/pie" element={<Piecharts />} />
          <Route path="/admin/chart/line" element={<Linecharts />} />
          {/* Apps */}
          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />

          {/* Management */}
          <Route path="/admin/product/new" element={<NewProduct />} />

          <Route path="/admin/product/:slug" element={<ProductManagement />} />

          <Route
            path="/admin/transaction/:id"
            element={<TransactionManagement />}
          />
          {/* </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>

  );
};

export default App;
