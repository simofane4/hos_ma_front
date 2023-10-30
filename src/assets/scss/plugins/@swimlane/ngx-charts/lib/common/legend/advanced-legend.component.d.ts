import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataItem, StringOrNumberOrDate } from '../../models/chart-data.model';
import { ColorHelper } from '../color.helper';
export interface AdvancedLegendItem {
    value: StringOrNumberOrDate;
    _value: StringOrNumberOrDate;
    color: string;
    data: DataItem;
    label: string;
    displayLabel: string;
    originalLabel: string;
    percentage: string;
}
export declare class AdvancedLegendComponent implements OnChanges {
    width: number;
    data: DataItem[];
    colors: ColorHelper;
    label: string;
    animations: boolean;
    select: EventEmitter<DataItem>;
    activate: EventEmitter<DataItem>;
    deactivate: EventEmitter<DataItem>;
    legendItems: AdvancedLegendItem[];
    total: number;
    roundedTotal: number;
    valueFormatting: (value: StringOrNumberOrDate) => any;
    labelFormatting: (value: string) => string;
    percentageFormatting: (value: number) => number;
    defaultValueFormatting: (value: StringOrNumberOrDate) => string;
    ngOnChanges(changes: SimpleChanges): void;
    getTotal(): number;
    update(): void;
    getLegendItems(): AdvancedLegendItem[];
    trackBy(index: number, item: AdvancedLegendItem): string;
}
