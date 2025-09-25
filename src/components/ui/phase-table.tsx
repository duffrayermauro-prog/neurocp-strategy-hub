import React from 'react';
import { cn } from '@/lib/utils';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface TableRow {
  [key: string]: string | number | React.ReactNode;
}

interface PhaseTableProps {
  columns: TableColumn[];
  data: TableRow[];
  title?: string;
  className?: string;
}

export const PhaseTable = ({ columns, data, title, className }: PhaseTableProps) => {
  return (
    <div className={cn("card-enhanced", className)}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "text-left py-3 px-4 text-sm font-semibold text-primary",
                    column.width
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-3 px-4 text-sm text-foreground"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};