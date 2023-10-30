import { SimpleChanges, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { DataItem, Series } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
interface Cell {
    cell: DataItem;
    data: number;
    fill: string;
    height: number;
    label: string;
    row: Series;
    series: string;
    width: number;
    x: number;
    y: number;
}
export declare class HeatCellSeriesComponent implements OnChanges, OnInit {
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    tooltipDisabled: boolean;
    tooltipText: any;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<DataItem>;
    activate: EventEmitter<DataItem>;
    deactivate: EventEmitter<DataItem>;
    cells: Cell[];
    placementTypes: typeof PlacementTypes;
    styleTypes: typeof StyleTypes;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCells(): Cell[];
    getTooltipText({ label, data, series }: {
        label: string;
        data: number;
        series: string;
    }): string;
    trackBy(index: number, item: any): string;
    onClick(data: any): void;
}
export {};
