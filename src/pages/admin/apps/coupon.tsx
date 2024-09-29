import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [delLoad, setDelLoad] = useState<boolean>(false);
  const [savLoad, setSavLoad] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [coupons, setCoupons] = useState<{ _id: string, code: string, amount: number }[]>([]);
  const { user } = useSelector((state: RootState) => state.userReducer);

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    toast.success(`Coupon "${coupon}" Copied`)
  };

  // Generate the coupon code
  const generate = () => {

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return toast.error("Please Select One At Least");


    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setCoupon(result);
  }
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavLoad(true);
    const uniqueCheque = coupons.find((i) => i.code === coupon);

    if (uniqueCheque) return toast.error("Coupon should be unique"), setSavLoad(false);
    const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/new?id=${user?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coupon, amount }), // adjust the amount accordingly
    });

    if (!response.ok) return toast.error("Error saving coupon" + response.statusText), setSavLoad(false);

    fetchCoupons();
    toast.success("Coupon saved successfully");
  }

  // Fetch all coupons
  const fetchCoupons = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/all?id=${user?._id}`);
    if (!response.ok) return toast.error(response.statusText);
    const data = await response.json();
    setCoupons(data.coupons);
    setSavLoad(false);
    setDelLoad(false);
  };

  // Delete a coupon
  const deleteCoupon = async (id: string) => {
    setDelLoad(true);
    const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/payment/coupon/${id}?id=${user?._id}`, {
      method: "DELETE",
    });

    if (!response.ok) return toast.error("Error deleting coupon" + response.statusText), setDelLoad(false);;
    toast.success("Coupon deleted successfully");
    fetchCoupons();
    setDelLoad(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, [coupon]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
            />
            <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />
            <input
              type="number"
              placeholder="amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />


            <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset>
            {coupon && (
              <code>
                {coupon}{" "}
                <span onClick={() => copyText(coupon)}>
                  Copy
                </span>{" "}
              </code>
            )}
            <button type="button" onClick={generate}>Generate</button>
            <button type="submit">
              {savLoad ? <FaSpinner className="animate-spin text-2xl mx-auto" /> : "Save"}
            </button>
          </form>

          <div className="relative" style={{ opacity: delLoad ? 0.45 : 1 }}>
            {delLoad && < div className="absolute left-32 top-16 pb-8">
              <BiLoader className="animate-spin text-gray-500 w-16 h-16 text-2xl mx-auto" />
            </div>}
            <h2>All Coupons</h2>
            <ul>
              {coupons.map((c) => (
                <li key={c._id} className="my-2">
                  code: <span className="cursor-pointer" onClick={() => copyText(c.code)}>
                    <abbr title="copy" className="no-underline"> {c.code}</abbr>
                  </span>{" "} - amount: {c.amount}{" "}
                  <button className="bg-red-500 my-3 sm:my-0 w-24 mt-2 h-10 text-white text-lg rounded-md mx-2 font-semibold"
                    onClick={() => deleteCoupon(c._id)}
                    disabled={delLoad}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>
    </div >
  );
};

export default Coupon;
