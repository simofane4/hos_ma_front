import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
import { ViewDimensions } from '../types/view-dimension.interface';
export declare class XAxisComponent implements OnChanges {
    xScale: any;
    dims: ViewDimensions;
    trimTicks: boolean;
    rotateTicks: boolean;
    maxTickLength: number;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: boolean;
    labelText: string;
    ticks: any[];
    xAxisTickCount: number;
    xOrient: Orientation;
    xAxisOffset: number;
    dimensionsChanged: EventEmitter<any>;
    xAxisClassName: string;
    tickArguments: number[];
    transform: string;
    labelOffset: number;
    fill: string;
    stroke: string;
    tickStroke: string;
    strokeWidth: string;
    padding: number;
    readonly orientation: typeof Orientation;
    ticksComponent: XAxisTicksComponent;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    emitTicksHeight({ height }: {
        height: any;
    }): void;
}
