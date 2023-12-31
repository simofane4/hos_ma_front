import { OnChanges, SimpleChanges } from '@angular/core';
import { TextAnchor } from '../common/types/text-anchor.enum';
interface Big {
    line: string;
    text: string;
    textAnchor: string;
    textTransform: string;
}
interface Ticks {
    big: Big[];
    small: Array<{
        line: string;
    }>;
}
export declare class GaugeAxisComponent implements OnChanges {
    bigSegments: number;
    smallSegments: number;
    min: number;
    max: number;
    angleSpan: number;
    startAngle: number;
    radius: number;
    valueScale: any;
    tickFormatting: any;
    ticks: Ticks;
    rotationAngle: number;
    rotate: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getTicks(): Ticks;
    getTextAnchor(angle: number): TextAnchor;
    getTickPath(startDistance: number, tickLength: number, angle: number): any;
}
export {};
