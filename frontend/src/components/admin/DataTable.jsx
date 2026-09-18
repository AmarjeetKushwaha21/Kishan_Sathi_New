import { FiInbox } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

export default function DataTable({ columns, rows, keyField = 'id', actions, emptyText = 'No records found' }) {
  return (
    <Card variant="soft" className="overflow-hidden p-0">
      <div className="no-scrollbar overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">Data table with {rows.length} rows</caption>
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn('whitespace-nowrap px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500', col.className)}
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12">
                  <p className="flex flex-col items-center justify-center gap-2 text-sm text-gray-400">
                    <FiInbox aria-hidden="true" className="text-2xl" />
                    {emptyText}
                  </p>
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row[keyField]} className="transition hover:bg-primary-50/40">
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3.5', col.className)}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-4 py-3.5 text-right">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}