import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";
import { Skeleton } from "../loader";
import Search from "./Search";

function TableHOC<T extends Object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  isLoading: boolean = false,
  totalItems?: number,
  isSearch: boolean = false,
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 10,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      // nextPage,
      // pageCount,
      // state: { pageIndex },
      // previousPage,
      // canNextPage,
      // canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading} ({totalItems})</h2>
        {isSearch && <Search item={heading} />}

        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>
                        {" "}
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {!isLoading && <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>}
        </table>
        {isLoading && <Skeleton length={6} width="100%" />}

        {/* {showPagination && <div className="table-pagination">
          <button disabled={!canPreviousPage} onClick={previousPage}>
            Prev
          </button>
          <span>{`${pageIndex + 1} of ${pageCount}`}</span>
          <button disabled={!canNextPage} onClick={nextPage}>
            Next
          </button>
        </div>} */}
      </div>
    );
  };
}

export default TableHOC;
