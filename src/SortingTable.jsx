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
} from '@tanstack/react-table';
import iconSortUp from './icon/icon-sort-up.svg';
import iconSortDown from './icon/icon-sort-down.svg';
import iconNoSort from './icon/icon-no-sort.svg';

const SortingTable = () => {
  const columnHelper = createColumnHelper();
  const data = useMemo(() => MOCK_DATA, []);
  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(), //optional
      header: () => 'Id',
      footer: () => 'Id',
      enableSorting: false,
    }),
    columnHelper.accessor('first_name', {
      id: 'first_name',
      cell: (info) => <span className=" text-green-600">{info.getValue()}</span>,
      header: () => 'First Name',
      footer: () => 'First Name',
    }),
    columnHelper.accessor('last_name', {
      id: 'last_name',
      header: () => 'Last Name',
      footer: () => 'Last Name',
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // model Row table
    getSortedRowModel: getSortedRowModel(), // model Sorting Table
    debugTable: true,
  });
  useEffect(() => {
    console.log(table.getState());
  }, [table.getState()]);
  return (
    <div className="bg-[#282C34]">
      <div className="container pt-5 wf">
        <div className="w-full overflow-y-auto ">
          <table className={style['datatable']}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className={style['datatable-thead-tr']} key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className={style['datatable-th']} key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
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
      </div>
    </div>
  );
};

export default SortingTable;
