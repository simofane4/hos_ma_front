import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { TooltipService } from '../tooltip/tooltip.service';
import { LegendType, LegendPosition } from '../types/legend.model';
import { ScaleType } from '../types/scale-type.enum';
export class ChartComponent {
    constructor() {
        this.showLegend = false;
        this.animations = true;
        this.legendLabelClick = new EventEmitter();
        this.legendLabelActivate = new EventEmitter();
        this.legendLabelDeactivate = new EventEmitter();
        this.LegendPosition = LegendPosition;
        this.LegendType = LegendType;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        let legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (!this.legendOptions || this.legendOptions.position === LegendPosition.Right) {
                if (this.legendType === LegendType.ScaleLegend) {
                    legendColumns = 1;
                }
                else {
                    legendColumns = 2;
                }
            }
        }
        const chartColumns = 12 - legendColumns;
        this.chartWidth = Math.floor((this.view[0] * chartColumns) / 12.0);
        this.legendWidth =
            !this.legendOptions || this.legendOptions.position === LegendPosition.Right
                ? Math.floor((this.view[0] * legendColumns) / 12.0)
                : this.chartWidth;
    }
    getLegendType() {
        return this.legendOptions.scaleType === ScaleType.Linear ? LegendType.ScaleLegend : LegendType.Legend;
    }
}
ChartComponent.decorators = [
    { type: Component, args: [{
                providers: [TooltipService],
                selector: 'ngx-charts-chart',
                template: `
    <div class="ngx-charts-outer" [style.width.px]="view[0]">
      <svg class="ngx-charts" [attr.width]="chartWidth" [attr.height]="view[1]">
        <ng-content></ng-content>
      </svg>
      <ngx-charts-scale-legend
        *ngIf="showLegend && legendType === LegendType.ScaleLegend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [valueRange]="legendOptions.domain"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
      >
      </ngx-charts-scale-legend>
      <ngx-charts-legend
        *ngIf="showLegend && legendType === LegendType.Legend"
        class="chart-legend"
        [horizontal]="legendOptions && legendOptions.position === LegendPosition.Below"
        [data]="legendOptions.domain"
        [title]="legendOptions.title"
        [colors]="legendOptions.colors"
        [height]="view[1]"
        [width]="legendWidth"
        [activeEntries]="activeEntries"
        (labelClick)="legendLabelClick.emit($event)"
        (labelActivate)="legendLabelActivate.emit($event)"
        (labelDeactivate)="legendLabelDeactivate.emit($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
ChartComponent.propDecorators = {
    view: [{ type: Input }],
    showLegend: [{ type: Input }],
    legendOptions: [{ type: Input }],
    legendType: [{ type: Input }],
    activeEntries: [{ type: Input }],
    animations: [{ type: Input }],
    legendLabelClick: [{ type: Output }],
    legendLabelActivate: [{ type: Output }],
    legendLabelDeactivate: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9jaGFydHMvY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQWlCLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUF1Q3JELE1BQU0sT0FBTyxjQUFjO0lBckMzQjtRQXVDVyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBSTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUMzRCwwQkFBcUIsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQU05RCxtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUNoQyxlQUFVLEdBQUcsVUFBVSxDQUFDO0lBZ0NuQyxDQUFDO0lBOUJDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQy9FLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFO29CQUM5QyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDTCxhQUFhLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1NBQ0Y7UUFFRCxNQUFNLFlBQVksR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBRXhDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVc7WUFDZCxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEtBQUssY0FBYyxDQUFDLEtBQUs7Z0JBQ3pFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3hHLENBQUM7OztZQXJGRixTQUFTLFNBQUM7Z0JBQ1QsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUMzQixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OzttQkFFRSxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzsrQkFFTCxNQUFNO2tDQUNOLE1BQU07b0NBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcFNlcnZpY2UgfSBmcm9tICcuLi90b29sdGlwL3Rvb2x0aXAuc2VydmljZSc7XG5pbXBvcnQgeyBMZWdlbmRPcHRpb25zLCBMZWdlbmRUeXBlLCBMZWdlbmRQb3NpdGlvbiB9IGZyb20gJy4uL3R5cGVzL2xlZ2VuZC5tb2RlbCc7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuLi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgcHJvdmlkZXJzOiBbVG9vbHRpcFNlcnZpY2VdLFxuICBzZWxlY3RvcjogJ25neC1jaGFydHMtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtY2hhcnRzLW91dGVyXCIgW3N0eWxlLndpZHRoLnB4XT1cInZpZXdbMF1cIj5cbiAgICAgIDxzdmcgY2xhc3M9XCJuZ3gtY2hhcnRzXCIgW2F0dHIud2lkdGhdPVwiY2hhcnRXaWR0aFwiIFthdHRyLmhlaWdodF09XCJ2aWV3WzFdXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvc3ZnPlxuICAgICAgPG5neC1jaGFydHMtc2NhbGUtbGVnZW5kXG4gICAgICAgICpuZ0lmPVwic2hvd0xlZ2VuZCAmJiBsZWdlbmRUeXBlID09PSBMZWdlbmRUeXBlLlNjYWxlTGVnZW5kXCJcbiAgICAgICAgY2xhc3M9XCJjaGFydC1sZWdlbmRcIlxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09IExlZ2VuZFBvc2l0aW9uLkJlbG93XCJcbiAgICAgICAgW3ZhbHVlUmFuZ2VdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxuICAgICAgICBbY29sb3JzXT1cImxlZ2VuZE9wdGlvbnMuY29sb3JzXCJcbiAgICAgICAgW2hlaWdodF09XCJ2aWV3WzFdXCJcbiAgICAgICAgW3dpZHRoXT1cImxlZ2VuZFdpZHRoXCJcbiAgICAgID5cbiAgICAgIDwvbmd4LWNoYXJ0cy1zY2FsZS1sZWdlbmQ+XG4gICAgICA8bmd4LWNoYXJ0cy1sZWdlbmRcbiAgICAgICAgKm5nSWY9XCJzaG93TGVnZW5kICYmIGxlZ2VuZFR5cGUgPT09IExlZ2VuZFR5cGUuTGVnZW5kXCJcbiAgICAgICAgY2xhc3M9XCJjaGFydC1sZWdlbmRcIlxuICAgICAgICBbaG9yaXpvbnRhbF09XCJsZWdlbmRPcHRpb25zICYmIGxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09IExlZ2VuZFBvc2l0aW9uLkJlbG93XCJcbiAgICAgICAgW2RhdGFdPVwibGVnZW5kT3B0aW9ucy5kb21haW5cIlxuICAgICAgICBbdGl0bGVdPVwibGVnZW5kT3B0aW9ucy50aXRsZVwiXG4gICAgICAgIFtjb2xvcnNdPVwibGVnZW5kT3B0aW9ucy5jb2xvcnNcIlxuICAgICAgICBbaGVpZ2h0XT1cInZpZXdbMV1cIlxuICAgICAgICBbd2lkdGhdPVwibGVnZW5kV2lkdGhcIlxuICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgICAgKGxhYmVsQ2xpY2spPVwibGVnZW5kTGFiZWxDbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAobGFiZWxBY3RpdmF0ZSk9XCJsZWdlbmRMYWJlbEFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIChsYWJlbERlYWN0aXZhdGUpPVwibGVnZW5kTGFiZWxEZWFjdGl2YXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICA8L25neC1jaGFydHMtbGVnZW5kPlxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHZpZXc6IFtudW1iZXIsIG51bWJlcl07XG4gIEBJbnB1dCgpIHNob3dMZWdlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbGVnZW5kT3B0aW9uczogTGVnZW5kT3B0aW9ucztcbiAgQElucHV0KCkgbGVnZW5kVHlwZTogTGVnZW5kVHlwZTtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W107XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBsZWdlbmRMYWJlbEFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcjx7IG5hbWU6IHN0cmluZyB9PigpO1xuICBAT3V0cHV0KCkgbGVnZW5kTGFiZWxEZWFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcjx7IG5hbWU6IHN0cmluZyB9PigpO1xuXG4gIGNoYXJ0V2lkdGg6IG51bWJlcjtcbiAgdGl0bGU6IHN0cmluZztcbiAgbGVnZW5kV2lkdGg6IG51bWJlcjtcblxuICByZWFkb25seSBMZWdlbmRQb3NpdGlvbiA9IExlZ2VuZFBvc2l0aW9uO1xuICByZWFkb25seSBMZWdlbmRUeXBlID0gTGVnZW5kVHlwZTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBsZXQgbGVnZW5kQ29sdW1ucyA9IDA7XG4gICAgaWYgKHRoaXMuc2hvd0xlZ2VuZCkge1xuICAgICAgdGhpcy5sZWdlbmRUeXBlID0gdGhpcy5nZXRMZWdlbmRUeXBlKCk7XG5cbiAgICAgIGlmICghdGhpcy5sZWdlbmRPcHRpb25zIHx8IHRoaXMubGVnZW5kT3B0aW9ucy5wb3NpdGlvbiA9PT0gTGVnZW5kUG9zaXRpb24uUmlnaHQpIHtcbiAgICAgICAgaWYgKHRoaXMubGVnZW5kVHlwZSA9PT0gTGVnZW5kVHlwZS5TY2FsZUxlZ2VuZCkge1xuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlZ2VuZENvbHVtbnMgPSAyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhcnRDb2x1bW5zID0gMTIgLSBsZWdlbmRDb2x1bW5zO1xuXG4gICAgdGhpcy5jaGFydFdpZHRoID0gTWF0aC5mbG9vcigodGhpcy52aWV3WzBdICogY2hhcnRDb2x1bW5zKSAvIDEyLjApO1xuICAgIHRoaXMubGVnZW5kV2lkdGggPVxuICAgICAgIXRoaXMubGVnZW5kT3B0aW9ucyB8fCB0aGlzLmxlZ2VuZE9wdGlvbnMucG9zaXRpb24gPT09IExlZ2VuZFBvc2l0aW9uLlJpZ2h0XG4gICAgICAgID8gTWF0aC5mbG9vcigodGhpcy52aWV3WzBdICogbGVnZW5kQ29sdW1ucykgLyAxMi4wKVxuICAgICAgICA6IHRoaXMuY2hhcnRXaWR0aDtcbiAgfVxuXG4gIGdldExlZ2VuZFR5cGUoKTogTGVnZW5kVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMubGVnZW5kT3B0aW9ucy5zY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIgPyBMZWdlbmRUeXBlLlNjYWxlTGVnZW5kIDogTGVnZW5kVHlwZS5MZWdlbmQ7XG4gIH1cbn1cbiJdfQ==