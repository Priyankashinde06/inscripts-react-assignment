import { useMemo } from "react";
import { useTable, useSortBy, type Column } from "react-table";

interface TableData {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
}

interface TableProps {
  data: TableData[];
  viewMode: 'table' | 'card';
}

export const Table = ({ data, viewMode }: TableProps) => {
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'In-process':
        return <span className="px-2 py-[2px] rounded-full text-xs font-medium bg-[#FFF3D6] text-[#85640B]">In-process</span>;
      case 'Need to start':
        return <span className="px-2 py-[2px] rounded-full text-xs font-medium bg-[#E2E8F0] text-[#475569]">Need to start</span>;
      case 'Complete':
        return <span className="px-2 py-[2px] rounded-full text-xs font-medium bg-green-100 text-green-800">Complete</span>;
      case 'Blocked':
        return <span className="px-2 py-[2px] rounded-full text-xs font-medium bg-red-100 text-red-800">Blocked</span>;
      default:
        return <span className="px-2 py-[2px] rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-[2px] rounded-full text-[13px] font-bold text-[#ef4d44]">High</span>;
      case 'Medium':
        return <span className="px-2 py-[2px] rounded-full text-[13px] font-bold  text-[#c29210]">Medium</span>;
      case 'Low':
        return <span className="px-2 py-[2px] rounded-full text-[13px] font-bold  text-[#1a8cff]">Low</span>;
      default:
        return <span className="px-2 py-[2px] rounded-full text-[13px] font-bold  text-gray-800">{priority}</span>;
    }
  };
  const columns: Column<TableData>[] = useMemo(() => [
    {
      Header: '#',
      accessor: 'id',
      width: 36
    },
    {
      Header: 'Job Request',
      accessor: 'jobRequest',
      width: 307
    },
    {
      Header: 'Submitted',
      accessor: 'submitted',
      width: 150
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: 150,
      Cell: ({ value }: { value: string }) => renderStatusBadge(value)
    },
    {
      Header: 'Submitter',
      accessor: 'submitter',
      width: 150
    },
    {
      Header: 'URL',
      accessor: 'url',
      width: 207,
      Cell: ({ value }: { value: string }) => (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {value}
        </a>
      )
    },
    {
      Header: 'Assigned',
      accessor: 'assigned',
      width: 160
    },
    {
      Header: 'Priority',
      accessor: 'priority',
      width: 150,
      Cell: ({ value }: { value: string }) => renderPriorityBadge(value)
    },
    {
      Header: 'Due Date',
      accessor: 'dueDate',
      width: 150
    },
    {
      Header: 'Est. Value',
      accessor: 'estValue',
      width: 157
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<TableData>(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="flex-1 overflow-hidden">
      <div className="overflow-auto h-full scrollbar-hide" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {viewMode === 'table' ? (
          <table {...getTableProps()} className="w-full border-collapse">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="sticky top-0 z-10 bg-white">
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-2 py-1 text-sm font-semibold text-gray-700 border border-[#eeeeee] truncate"
                      style={{
                        width: column.width,
                        minWidth: 50,
                        backgroundColor: 'rgb(243, 243, 243)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <span>{column.render('Header')}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                  <th className="px-2 py-1 text-sm font-semibold text-gray-700 border-x-2 border-gray-300 border-dashed truncate" style={{ width: 167, minWidth: 50, backgroundColor: 'rgb(243, 243, 243)' }}></th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee]"
                          style={{ width: cell.column.width }}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                    <td className="px-2 py-1 text-sm text-gray-700 border  w-[117px] border-x-2 border-gray-300 border-dashed"></td>
                  </tr>
                );
              })}

              {rows.length < 20 &&
                Array.from({ length: 20 - rows.length }).map((_, i) => (
                  <tr key={`empty-${i}`} className="hover:bg-gray-50">
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee]">{rows.length + i + 1}</td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] truncate" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] text-end" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] text-center" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee]" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-blue-600 border border-[#eeeeee] underline truncate" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee]" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] text-center" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] text-end" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-[#eeeeee] text-end" contentEditable></td>
                    <td className="px-2 py-1 text-sm text-gray-700 border border-x-2 border-gray-300 border-dashed" contentEditable></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((row) => (
              <div key={row.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{row.jobRequest}</h3>
                  {renderStatusBadge(row.status)}
                </div>
                <div className="mt-2 space-y-1">
                  <p><span className="font-medium">Submitted:</span> {row.submitted}</p>
                  <p><span className="font-medium">Submitter:</span> {row.submitter}</p>
                  <p><span className="font-medium">Assigned:</span> {row.assigned}</p>
                  <p><span className="font-medium">Priority:</span> {row.priority}</p>
                  <p><span className="font-medium">Due Date:</span> {row.dueDate}</p>
                  <p><span className="font-medium">Est. Value:</span> {row.estValue}</p>
                  {row.url && (
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View URL
                    </a>
                  )}
                </div>
              </div>
            ))}
            {data.length < 20 &&
              Array.from({ length: 20 - data.length }).map((_, i) => (
                <div key={`empty-card-${i}`} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
};