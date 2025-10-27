import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TaskTable = ({ data }) => {
  const columns = [
    {
      header: "ID",
      accessorKey: "task_id",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (info) => (
        <span className="line-clamp-1">{info.getValue() || "-"}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => {
        const status = info.getValue();
        const color =
          status === "COMPLETED"
            ? "text-green-600 bg-green-100"
            : status === "IN_PROGRESS"
            ? "text-yellow-600 bg-yellow-100"
            : "text-gray-600 bg-gray-100";
        return (
          <span className={`px-2 py-1 text-sm font-medium rounded-md ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: (info) => {
        const date = info.getValue();
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <button className="text-blue-600 hover:underline">Edit</button>
          <button className="text-red-600 hover:underline">Delete</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-base-100 text-base-900 p-6 rounded-lg shadow-md overflow-x-auto">
      <table className="min-w-full border border-base-300">
        <thead className="bg-base-900 text-base-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-base-200 hover:bg-base-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-base-900"
              >
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
