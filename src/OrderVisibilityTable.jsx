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
import { shuffle } from './helper';

function IndeterminateCheckbox({ indeterminate, className = '', ...rest }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer dsy-checkbox dsy-checkbox-accent dsy-checkbox-xs'}
      {...rest}
    />
  );
}

const OrderVisibilityTable = () => {
  const columnHelper = createColumnHelper();
  const data = useMemo(() => MOCK_DATA, []);
  const columns = [
    columnHelper.accessor('select', {
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),
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
  const randomizeColumns = () => {
    table.setColumnOrder(shuffle(table.getAllLeafColumns().map((d) => d.id)));
  };
  useEffect(() => {
    console.log(table.getState());
  }, [table.getState()]);
  return (
    <div className="bg-[#282C34]">
      <div className="container pt-5 wf">
        <div className="inline-block border border-black shadow rounded w-full bg-white text-gray-900 mb-3">
          <div className="px-1 border-b border-black">
            <label>
              <input
                className="dsy-checkbox dsy-checkbox-accent dsy-checkbox-xs"
                {...{
                  type: 'checkbox',
                  checked: table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                }}
              />{' '}
              Toggle All
            </label>
          </div>
          {table.getAllLeafColumns().map((column) => {
            return (
              <div key={column.id} className="px-1">
                <label>
                  <input
                    className="dsy-checkbox dsy-checkbox-accent dsy-checkbox-xs"
                    {...{
                      type: 'checkbox',
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />{' '}
                  {column.id}
                </label>
              </div>
            );
          })}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => randomizeColumns()}
              className="dsy-btn dsy-btn-outline dsy-btn-success dsy-btn-sm m-2"
            >
              Shuffle Columns
            </button>
          </div>
        </div>
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
        <div className="my-5">
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

export default OrderVisibilityTable;
