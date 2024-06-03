import React, { useContext } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel, PaginationState,
    useReactTable,
} from '@tanstack/react-table'
import { Member } from "../models/Member.tsx";
import {getSpecialAbility} from "../models/Position.tsx";
import { MembersContext } from "./FormTeam.tsx";
import {useTranslation} from "react-i18next";

interface AvailableMembersProps {
    members: Member[],
    children: React.ReactNode
}

const AvailableMembers = (props: AvailableMembersProps) => {
    const { t } = useTranslation();
    const ctx = useContext(MembersContext);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const columns:ColumnDef<Member>[] = [
        {
            accessorFn: row => row.name,
            id: 'name',
            cell: info => info.getValue(),
            header: () => <span>{t('name')}</span>,
        },
        {
            accessorFn: row => row.age,
            id: 'age',
            cell: info => info.getValue(),
            header: () => <span>{t('age')}</span>,
        },
        {
            accessorFn: row => row.position,
            id: 'position',
            cell: info => {
                // @ts-ignore
                return t(info.getValue());
            },
            header: () => <span>{t('position')}</span>,
        },
        {
            accessorFn: row => getSpecialAbility(row.position),
            id: 'ability',
            cell: info => {
                // @ts-ignore
                return t(info.getValue());
            },
            header: () => <span>{t('special_ability')}</span>,
        },
        {
            id: 'actions',
            cell: info => (
                <>
                    {ctx?.state.members.find(id => id === info.row.original.id) ? (
                        <button
                            type="button"
                            onClick={() => removeMember(info.row.original.id)}
                            className="rounded-[4px] bg-red-500 px-2 py-1 text-xs text-white"
                        >
                            {t('remove')}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => addMember(info.row.original.id)}
                            className="rounded-[4px] bg-green-500 px-2 py-1 text-xs text-white"
                        >
                            {t('add')}
                        </button>
                    )}
                </>

            ),
        },
    ];

    const table = useReactTable({
        columns,
        data: props.members,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    })

    const addMember = (id: number) => {
        ctx?.dispatch({ type: 'ADD_MEMBERS', payload: [id] });
    };

    const removeMember = (id: number) => {
        ctx?.dispatch({ type: 'REMOVE_MEMBER', id });
    };

    return (
        <div className="my-6">
            <p className="block text-gray-700 text-sm font-bold">{t('ready_soar')}</p>
            {props.children && (
                <div>
                    {props.children}
                </div>
            )}
            <table className="mt-2">
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : ''
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                            title={
                                                header.column.getCanSort()
                                                    ? header.column.getNextSortingOrder() === 'asc'
                                                        ? 'Sort ascending'
                                                        : header.column.getNextSortingOrder() === 'desc'
                                                            ? 'Sort descending'
                                                            : 'Clear sort'
                                                    : undefined
                                            }
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table
                    .getRowModel()
                    .rows
                    .map(row => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>{t('page')}</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} {t('of')}{' '}
                            {table.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    <button
                        type="button"
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                </div>
                <div>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {t('show')} {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AvailableMembers;
