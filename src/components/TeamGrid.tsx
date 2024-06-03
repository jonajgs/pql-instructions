import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import React, {createContext, useCallback, useEffect, useState} from "react";
import {Team} from "../models/Team.tsx";
import PlayerService from "../services/PlayerService";
import {Member} from "../models/Member.tsx";
import TeamService from "../services/TeamService";
import {useDispatch, useSelector} from "react-redux";
import {setTeams} from "../reducers/team";
import {useTranslation} from "react-i18next";

const TableGrid = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const teams = useSelector((state:any) => state.teams.value);
    const columns:ColumnDef<Team>[] = [
        {
            accessorFn: row => row.name,
            id: 'name',
            cell: info => info.getValue(),
            header: () => <span>{t('name')}</span>,
        },
    ];
    const table = useReactTable({
        columns,
        data: teams,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const listTeamsFn = useCallback(() => {
        TeamService
            .get()
            .then(response => {
                dispatch(setTeams(response));
            })
            .catch(err => {
                console.log('err', err);
            })
    }, [])

    useEffect(() => {
        listTeamsFn();
    }, []);

    return (
        <div>
            <p className="text-xl">{t('title_teams')}</p>
            <table>
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
        </div>
    );
};

export default TableGrid;
