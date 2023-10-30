import { EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { ColorHelper } from './color.helper';
import { DataItem, Series, StringOrNumberOrDate } from '../models/chart-data.model';
import { PlacementTypes } from './tooltip/position';
import { StyleTypes } from './tooltip/style.type';
import { BarOrientation } from './types/bar-orientation.enum';
import { Gradient } from './types/gradient.interface';
import { ScaleType } from './types/scale-type.enum';
export declare enum SeriesType {
    Standard = "standard",
    Stacked = "stacked"
}
export interface Circle {
    classNames: string[];
    value: string | number;
    label: string;
    data: DataItem;
    cx: number;
    cy: number;
    radius: number;
    height: number;
    tooltipLabel: string;
    color: string;
    opacity: number;
    seriesName: string;
    gradientStops: Gradient[];
    min: number;
    max: number;
}
export declare class CircleSeriesComponent implements OnChanges, OnInit {
    data: Series;
    type: SeriesType;
    xScale: any;
    yScale: any;
    colors: ColorHelper;
    scaleType: ScaleType;
    visibleValue: boolean;
    activeEntries: any[];
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    select: EventEmitter<DataItem>;
    activate: EventEmitter<{
        name: StringOrNumberOrDate;
    }>;
    deactivate: EventEmitter<{
        name: StringOrNumberOrDate;
    }>;
    areaPath: any;
    circle: Circle;
    barVisible: boolean;
    gradientId: string;
    gradientFill: string;
    barOrientation: typeof BarOrientation;
    placementTypes: typeof PlacementTypes;
    styleTypes: typeof StyleTypes;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getActiveCircle(): Circle;
    mapDataPointToCircle(d: any, i: number): Circle;
    getTooltipText({ tooltipLabel, value, seriesName, min, max }: {
        tooltipLabel: string;
        value: any;
        seriesName: string;
        min: number;
        max: number;
    }): string;
    getTooltipMinMaxText(min: number, max: number): string;
    getGradientStops(color: string): Gradient[];
    onClick(data: DataItem): void;
    isActive(entry: any): boolean;
    activateCircle(): void;
    deactivateCircle(): void;
}
