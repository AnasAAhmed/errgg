import { FormEvent, useState } from 'react'
import { BiChevronRight, BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const Search = ({ item }: { item: string }) => {
    const router = useNavigate();
    const [query, setQuery] = useState('');

    const itemName = item === 'Products' ? 'product' : item === 'Transactions' ? 'transaction' : 'customer'

    const fields = {
        'product': ['name', 'category', '_id', 'collections', 'price'],
        'transaction': ['user', 'status', '_id', 'createdAt'],
        'customer': ['email', 'phone', '_id', 'name', 'gender', 'role'],
    }
    const values: string[] = fields[itemName]
    const [key, setKey] = useState(values[0]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query) {
            const queryValue = key === 'createdAt' ? new Date(query).toISOString() : query;
            router(`/admin/${itemName}?key=${key}&query=${queryValue}`);
        } else {
            router(`/admin/${itemName}`);
        }
    };
    const handleSearchButton = () => {
        if (query) {
            const queryValue = key === 'createdAt' ? new Date(query).toISOString() : query;
            router(`/admin/${itemName}?key=${key}&query=${queryValue}`);
        } else {
            router(`/admin/${itemName}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center flex-col sm:flex-row gap-3">
            {key === 'price' || key === 'phone' ? (
                <input
                    placeholder={`Search by ${key}...`}
                    type="number"
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-10 border px-2 rounded-md"
                    min={3}
                />
            ) : key === 'createdAt' ? (
                <input
                    placeholder={`Search by date...`}
                    type="date"
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-10 border px-2 rounded-md"
                />
            ) : (
                <input
                    placeholder={`Search by ${key}...`}
                    type="search"
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-10 border px-2 rounded-md"
                    minLength={key === '_id' || key === 'user' ? 24 : 1}
                />
            )}
            <button type='button' onClick={handleSearchButton}>
                <abbr title="Search" className='no-underline'><BiSearch /></abbr>
            </button>
            <DropDown currentValue={key} setSearchValue={setKey} values={values}></DropDown>
           
            {query && <p>Result For ({query})</p>}
        </form>
    )
}

type DropSearchProps = {
    setSearchValue: any;
    currentValue?: string;
    values: string[]
}
const DropDown = ({ currentValue, setSearchValue, values }: DropSearchProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onBlur={() => setTimeout(() => setOpen(false), 130)}>
            <button type='button' onClick={() => setOpen(!open)} className="flex font-semibold text-lgitems-center space-x-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:border-blue-400">
                <span>{currentValue ? currentValue : "Filters"}</span>
                <BiChevronRight className={`transition-all duration-200 h-5 w-5 ${open && "rotate-90"}`} />
            </button>
            {open && (
                <div className="absolute z-30 left-0 mt-2 w-44 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {values.map((value, index) => (
                        <button type='button' key={index} onClick={() => setSearchValue(value)} className="block px-2 font-semibold w-full border-b py-2 text-left text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900">{value}</button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Search;