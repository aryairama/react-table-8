/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import style from './style.module.css';
import MOCK_DATA from './MOCK_DATA.json';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import iconSortUp from './icon/icon-sort-up.svg';
import iconSortDown from './icon/icon-sort-down.svg';
import iconNoSort from './icon/icon-no-sort.svg';
import Pagination from './Pagination';

const PaginationTable = () => {
  const columnHelper = createColumnHelper();
  const data = useMemo(() => MOCK_DATA, []);
  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(), //optional
      header: 'Id',
      footer: 'Id',
      enableSorting: false,
    }),
    columnHelper.accessor('first_name', {
      id: 'first_name',
      cell: (info) => <span className=" text-green-600">{info.getValue()}</span>,
      header: 'First Name',
      footer: 'First Name',
    }),
    columnHelper.accessor('last_name', {
      id: 'last_name',
      header: 'Last Name',
      footer: 'Last Name',
    }),
    columnHelper.accessor('first_name', {
      id: 'fullname',
      header: 'Fullname',
      enableSorting: false,
      cell: (info) => (
        <span className="text-red-800">
          {info.getValue()} {info.row.original.last_name}
        </span> // formating cell and access value other row
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // model Row table
    getSortedRowModel: getSortedRowModel(), // model Sorting Table
    getFilteredRowModel: getFilteredRowModel(), // model filter data
    getPaginationRowModel: getPaginationRowModel(), // model pagination
  });
  useEffect(() => {
    console.log(table.getState());
  }, [table.getState()]);
  return (
    <div className="bg-[#282C34]">
      <div className="container pt-5 wf">
        <input
          value={table.getState().globalFilter || ''}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          type="text"
          placeholder="Search"
          className="dsy-input dsy-input-bordered dsy-input-md w-full max-w-xs bg-white mb-3 float-right font-normal text-gray-900 placeholder:text-gray-900"
        />
        <div className="w-full overflow-y-auto ">
          <table className={style['datatable']}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className={style['datatable-thead-tr']} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className={style['datatable-th']} key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <React.Fragment>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none flex items-center gap-2'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <span className="flex-shrink-0">
                                {header.column.getIsSorted() === 'asc' || header.column.getIsSorted() === 'desc' ? (
                                  <>
                                    {header.column.getIsSorted() === 'asc' && (
                                      <img width="8px" height="8px" src={iconSortUp} alt="icon-sort-up" />
                                    )}
                                    {header.column.getIsSorted() === 'desc' && (
                                      <img width="8px" height="8px" src={iconSortDown} alt="icon-sort-down" />
                                    )}
                                  </>
                                ) : (
                                  <img width="8px" height="5px" src={iconNoSort} alt="icon-no-sort" />
                                )}
                              </span>
                            )}
                          </div>
                          {header.column.getCanFilter() && (
                            <input
                              placeholder={`Search ${header.column.columnDef.header}`}
                              value={header.column.getFilterValue() || ''}
                              onChange={(e) => header.column.setFilterValue(e.target.value)}
                              type="text"
                              className="dsy-input dsy-input-bordered dsy-input-xs text-gray-900 placeholder:text-gray-900 bg-white border-gray-900 mt-1"
                            />
                          )}
                        </React.Fragment>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <thead>
              <tr>
                <td className="p-2"></td>
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr className={style['datatable-tbody-tr']} key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className={style['datatable-td']} key={cell.id}>
                      <div className={style['datatable-td-content']}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <thead>
              <tr>
                <td className="p-2"></td>
              </tr>
            </thead>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr className={style['datatable-thead-tr']} key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th className={style['datatable-th']} key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
        <div className="flex items-center gap-2 my-5">
          <button
            className="border rounded p-1 bg-white text-gray-900"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1 bg-white text-gray-900"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1 bg-white text-gray-900"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1 bg-white text-gray-900"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-white text-gray-900"
            />
          </span>
          <select
            className="bg-white text-gray-900"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <Pagination
            totalData={data.length}
            pageSize={table.getState().pagination.pageSize}
            currentPage={table.getState().pagination.pageIndex + 1}
            numberOfButtons={5}
            setPage={table.setPageIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
