
import { KeyboardEvent, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { BsSearch } from 'react-icons/bs';
import AllReviews from '../../components/admin/AllReviews';

const Reviews = () => {

    const [productId, setProductId] = useState("");
    const [productIdValue, setProductIdValue] = useState("");

    const KeyPressForSearchReviews = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevent the default behavior of the Enter key
          setProductId(productIdValue);
        }
      };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main>
                <div className="bar">
                    <input type="text"
                        onChange={(e) => setProductIdValue(e.target.value)}
                        placeholder="Search By Product - id"
                        onKeyDown={KeyPressForSearchReviews}
                    />
                    <button onClick={()=>setProductId(productIdValue)} ><BsSearch size="1.5rem" /></button>
                </div>
                   <h2 className='heading'>Reviews</h2>
               {productId !=="" ? <AllReviews productId={productId} />:<h2 className='mt-24 text-center text-4xl font-light'>Search By Product - Id To See Its Reviews</h2>}
            </main>
        </div>
    )
}

export default Reviews
