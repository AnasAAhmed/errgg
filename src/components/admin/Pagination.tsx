import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div className="table-pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>{`${currentPage} of ${totalPages}`}</span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
