import { EventEmitter, TemplateRef, TrackByFunction } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { BaseChartComponent } from '../common/base-chart.component';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
export declare class BarVertical2DComponent extends BaseChartComponent {
    legend: boolean;
    legendTitle: string;
    legendPosition: LegendPosition;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: boolean;
    showYAxisLabel: boolean;
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipDisabled: boolean;
    scaleType: ScaleType;
    gradient: boolean;
    showGridLines: boolean;
    activeEntries: any[];
    schemeType: ScaleType;
    trimXAxisTicks: boolean;
    trimYAxisTicks: boolean;
    rotateXAxisTicks: boolean;
    maxXAxisTickLength: number;
    maxYAxisTickLength: number;
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
    xAxisTicks: any[];
    yAxisTicks: any[];
    groupPadding: number;
    barPadding: number;
    roundDomains: boolean;
    roundEdges: boolean;
    yScaleMax: number;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    noBarWhenZero: boolean;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    groupDomain: string[];
    innerDomain: string[];
    valueDomain: [number, number];
    groupScale: any;
    innerScale: any;
    valueScale: any;
    transform: string;
    colors: ColorHelper;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: LegendOptions;
    dataLabelMaxHeight: any;
    barOrientation: typeof BarOrientation;
    update(): void;
    onDataLabelMaxHeightChanged(event: any, groupIndex: number): void;
    getGroupScale(): any;
    getInnerScale(): any;
    getValueScale(): any;
    getGroupDomain(): string[];
    getInnerDomain(): string[];
    getValueDomain(): [number, number];
    groupTransform(group: DataItem): string;
    onClick(data: any, group?: DataItem): void;
    trackBy: TrackByFunction<DataItem>;
    setColors(): void;
    getLegendOptions(): LegendOptions;
    updateYAxisWidth({ width }: {
        width: number;
    }): void;
    updateXAxisHeight({ height }: {
        height: number;
    }): void;
    onActivate(event: any, group: DataItem, fromLegend?: boolean): void;
    onDeactivate(event: any, group: DataItem, fromLegend?: boolean): void;
}
