import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { DataItem, StringOrNumberOrDate } from '../models/chart-data.model';
import { ColorHelper } from '../common/color.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { BarChartType } from './types/bar-chart-type.enum';
import { Bar } from './types/bar.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
export declare class SeriesHorizontal implements OnChanges {
    dims: ViewDimensions;
    type: BarChartType;
    series: DataItem[];
    xScale: any;
    yScale: any;
    colors: ColorHelper;
    tooltipDisabled: boolean;
    gradient: boolean;
    activeEntries: DataItem[];
    seriesName: StringOrNumberOrDate;
    tooltipTemplate: TemplateRef<any>;
    roundEdges: boolean;
    animations: boolean;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    noBarWhenZero: boolean;
    select: EventEmitter<DataItem>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dataLabelWidthChanged: EventEmitter<{
        size: Event;
        index: number;
    }>;
    tooltipPlacement: PlacementTypes;
    tooltipType: StyleTypes;
    bars: Bar[];
    barsForDataLabels: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        total: number;
        series: string;
    }>;
    barOrientation: typeof BarOrientation;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    updateDataLabels(): void;
    updateTooltipSettings(): void;
    isActive(entry: DataItem): boolean;
    getLabel(dataItem: DataItem): StringOrNumberOrDate;
    trackBy(index: number, bar: Bar): string;
    trackDataLabelBy(index: number, barLabel: any): string;
    click(data: DataItem): void;
}
