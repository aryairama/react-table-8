import React, { useMemo } from 'react';
import style from './style.module.css';
import MOCK_DATA from './MOCK_DATA.json';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const BasicTable = () => {
  const columnHelper = createColumnHelper();
  const data = useMemo(() => MOCK_DATA, []);
  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(), //optional
      header: () => 'Id',
      footer: () => 'Id',
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
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="container bg-red-500 pt-5">
      <div className="w-full overflow-y-auto ">
        <table className={style['datatable']}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={style['datatable-thead-tr']} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className={style['datatable-th']} key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
  );
};

export default BasicTable;
