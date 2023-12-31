import { EventEmitter, ElementRef, SimpleChanges, OnChanges, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import { GridData } from '../common/grid-layout.helper';
export declare class CardComponent implements OnChanges, OnDestroy {
    private cd;
    private zone;
    private platformId;
    color: string;
    bandColor: string;
    textColor: string;
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    data: GridData;
    medianSize: number;
    valueFormatting: any;
    labelFormatting: any;
    animations: boolean;
    select: EventEmitter<any>;
    textEl: ElementRef;
    element: HTMLElement;
    value: string;
    transform: string;
    formattedLabel: string;
    cardWidth: number;
    cardHeight: number;
    textWidth: number;
    textFontSize: number;
    textTransform: string;
    initialized: boolean;
    animationReq: number;
    bandHeight: number;
    transformBand: string;
    textPadding: number[];
    labelFontSize: number;
    bandPath: string;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone, platformId: any);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    update(): void;
    paddedValue(value: string): string;
    startCount(): void;
    scaleText(): void;
    scaleTextSSR(): void;
    setPadding(): void;
    onClick(): void;
}
