import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { escapeLabel } from '../common/label.helper';
import { StyleTypes } from '../common/tooltip/style.type';
import { PlacementTypes } from '../common/tooltip/position';
export class TreeMapCellSeriesComponent {
    constructor() {
        this.gradient = false;
        this.tooltipDisabled = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.styleTypes = StyleTypes;
        this.placementTypes = PlacementTypes;
    }
    ngOnChanges(changes) {
        this.cells = this.getCells();
    }
    getCells() {
        return this.data.children
            .filter(d => {
            return d.depth === 1;
        })
            .map((d, index) => {
            const label = d.id;
            return {
                data: d.data,
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: this.colors.getColor(label),
                label,
                value: d.value
            };
        });
    }
    getTooltipText({ label, value }) {
        return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
    }
    onClick(data) {
        this.select.emit(data);
    }
    trackBy(index, item) {
        return item.label;
    }
}
TreeMapCellSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-tree-map-cell-series]',
                template: `
    <svg:g
      ngx-charts-tree-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [data]="c.data"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [gradient]="gradient"
      [animations]="animations"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="placementTypes.Top"
      [tooltipType]="styleTypes.tooltip"
      [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="c.data"
    ></svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
TreeMapCellSeriesComponent.propDecorators = {
    data: [{ type: Input }],
    dims: [{ type: Input }],
    colors: [{ type: Input }],
    valueFormatting: [{ type: Input }],
    labelFormatting: [{ type: Input }],
    gradient: [{ type: Input }],
    tooltipDisabled: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    animations: [{ type: Input }],
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tYXAtY2VsbC1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL3RyZWUtbWFwL3RyZWUtbWFwLWNlbGwtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLHVCQUF1QixFQUV4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQTRDNUQsTUFBTSxPQUFPLDBCQUEwQjtJQTlCdkM7UUFvQ1csYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBR3RDLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUF5Q2xDLENBQUM7SUF2Q0MsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDdEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVuQixPQUFPO2dCQUNMLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQkFDWixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1AsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO2dCQUNQLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNsQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakMsS0FBSztnQkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7YUFDZixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBOEI7UUFDekQsT0FBTztvQ0FDeUIsV0FBVyxDQUFDLEtBQUssQ0FBQztrQ0FDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRTtLQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7O1lBckZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0NBQW9DO2dCQUM5QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5QlQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OzttQkFFRSxLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBEYXRhSXRlbSB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IFN0eWxlVHlwZXMgfSBmcm9tICcuLi9jb21tb24vdG9vbHRpcC9zdHlsZS50eXBlJztcbmltcG9ydCB7IFBsYWNlbWVudFR5cGVzIH0gZnJvbSAnLi4vY29tbW9uL3Rvb2x0aXAvcG9zaXRpb24nO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcblxuaW50ZXJmYWNlIFRyZWVNYXBDZWxsIHtcbiAgZGF0YTogRGF0YUl0ZW07XG4gIGZpbGw6IHN0cmluZztcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBhbnk7XG4gIHdpZHRoOiBudW1iZXI7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtdHJlZS1tYXAtY2VsbC1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5neC1jaGFydHMtdHJlZS1tYXAtY2VsbFxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY2VsbHM7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgW2RhdGFdPVwiYy5kYXRhXCJcbiAgICAgIFt4XT1cImMueFwiXG4gICAgICBbeV09XCJjLnlcIlxuICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgW2hlaWdodF09XCJjLmhlaWdodFwiXG4gICAgICBbZmlsbF09XCJjLmZpbGxcIlxuICAgICAgW2xhYmVsXT1cImMubGFiZWxcIlxuICAgICAgW3ZhbHVlXT1cImMudmFsdWVcIlxuICAgICAgW3ZhbHVlRm9ybWF0dGluZ109XCJ2YWx1ZUZvcm1hdHRpbmdcIlxuICAgICAgW2xhYmVsRm9ybWF0dGluZ109XCJsYWJlbEZvcm1hdHRpbmdcIlxuICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgbmd4LXRvb2x0aXBcbiAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgIFt0b29sdGlwUGxhY2VtZW50XT1cInBsYWNlbWVudFR5cGVzLlRvcFwiXG4gICAgICBbdG9vbHRpcFR5cGVdPVwic3R5bGVUeXBlcy50b29sdGlwXCJcbiAgICAgIFt0b29sdGlwVGl0bGVdPVwidG9vbHRpcFRlbXBsYXRlID8gdW5kZWZpbmVkIDogZ2V0VG9vbHRpcFRleHQoYylcIlxuICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgW3Rvb2x0aXBDb250ZXh0XT1cImMuZGF0YVwiXG4gICAgPjwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNYXBDZWxsU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogYW55OyAvLyB0eXBlIHRoaXNcbiAgQElucHV0KCkgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBsYWJlbEZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9vbHRpcERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjZWxsczogVHJlZU1hcENlbGxbXTtcbiAgc3R5bGVUeXBlcyA9IFN0eWxlVHlwZXM7XG4gIHBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXM7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmdldENlbGxzKCk7XG4gIH1cblxuICBnZXRDZWxscygpOiBUcmVlTWFwQ2VsbFtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmNoaWxkcmVuXG4gICAgICAuZmlsdGVyKGQgPT4ge1xuICAgICAgICByZXR1cm4gZC5kZXB0aCA9PT0gMTtcbiAgICAgIH0pXG4gICAgICAubWFwKChkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGQuaWQ7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkYXRhOiBkLmRhdGEsXG4gICAgICAgICAgeDogZC54MCxcbiAgICAgICAgICB5OiBkLnkwLFxuICAgICAgICAgIHdpZHRoOiBkLngxIC0gZC54MCxcbiAgICAgICAgICBoZWlnaHQ6IGQueTEgLSBkLnkwLFxuICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKSxcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICB2YWx1ZTogZC52YWx1ZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRUb29sdGlwVGV4dCh7IGxhYmVsLCB2YWx1ZSB9OiB7IGxhYmVsOiBhbnk7IHZhbHVlOiBhbnkgfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC1sYWJlbFwiPiR7ZXNjYXBlTGFiZWwobGFiZWwpfTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwidG9vbHRpcC12YWxcIj4ke3ZhbHVlLnRvTG9jYWxlU3RyaW5nKCl9PC9zcGFuPlxuICAgIGA7XG4gIH1cblxuICBvbkNsaWNrKGRhdGEpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleCwgaXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gIH1cbn1cbiJdfQ==