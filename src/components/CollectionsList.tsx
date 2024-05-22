import { CustomError } from "../types/api-types";
import toast from 'react-hot-toast';
import { useCollectionsQuery } from '../redux/api/productAPI';
import { Link } from 'react-router-dom';

const CollectionsList = () => {
    const {
        data,
        isLoading,
        isError,
        error
    } = useCollectionsQuery("");

    if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
        return <div>Error: {err.data.message}</div>;
    }

    return (
        <div>
            {isLoading ? (
                <ul className="flex flex-wrap justify-center mx-8 mt-3">
               { Array.from({ length:import.meta.env.VITE_COLLECTION_LIST_COUNT ||4}, (_,i) => (
                    <div key={i} className="mx-2 mt-2 bg-gray-300 rounded-md py-4 px-8 hover:bg-gray-200 animate-pulse"></div>
                ))}
                </ul>
            ) : (
                <ul className="flex flex-wrap justify-center mx-8 mt-3">
                    {data?.collections?.map((collection, i) => (
                        <Link key={i} onClick={()=>window.scroll(0,0)} className="mx-2 mt-2 bg-gray-300 text-gray-600 rounded-md py-1 px-2 font-semibold hover:bg-gray-200" to={`collections/${collection}`}>{collection.toUpperCase()}</Link>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CollectionsList;
