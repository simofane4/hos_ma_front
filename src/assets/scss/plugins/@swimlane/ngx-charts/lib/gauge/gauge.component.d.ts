import { ElementRef, AfterViewInit, EventEmitter, TemplateRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { ArcItem } from './gauge-arc.component';
import { LegendOptions, LegendPosition } from '../common/types/legend.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
interface Arcs {
    backgroundArc: ArcItem;
    valueArc: ArcItem;
}
export declare class GaugeComponent extends BaseChartComponent implements AfterViewInit {
    legend: boolean;
    legendTitle: string;
    legendPosition: LegendPosition;
    min: number;
    max: number;
    textValue: string;
    units: string;
    bigSegments: number;
    smallSegments: number;
    results: any[];
    showAxis: boolean;
    startAngle: number;
    angleSpan: number;
    activeEntries: any[];
    axisTickFormatting: any;
    tooltipDisabled: boolean;
    valueFormatting: (value: any) => string;
    showText: boolean;
    margin: number[];
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    textEl: ElementRef;
    dims: ViewDimensions;
    domain: any[];
    valueDomain: [number, number];
    valueScale: any;
    colors: ColorHelper;
    transform: string;
    outerRadius: number;
    textRadius: number;
    resizeScale: number;
    rotation: string;
    textTransform: string;
    cornerRadius: number;
    arcs: Arcs[];
    displayValue: string;
    legendOptions: LegendOptions;
    ngAfterViewInit(): void;
    update(): void;
    getArcs(): any[];
    getDomain(): string[];
    getValueDomain(): [number, number];
    getValueScale(): any;
    getDisplayValue(): string;
    scaleText(repeat?: boolean): void;
    onClick(data: any): void;
    getLegendOptions(): LegendOptions;
    setColors(): void;
    onActivate(item: any): void;
    onDeactivate(item: any): void;
    isActive(entry: any): boolean;
    trackBy(index: number, item: Arcs): any;
}
export {};
