import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
export class LegendComponent {
    constructor(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    }
    getLegendEntries() {
        const items = [];
        for (const label of this.data) {
            const formattedLabel = formatLabel(label);
            const idx = items.findIndex(i => {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label,
                    formattedLabel,
                    color: this.colors.getColor(label)
                });
            }
        }
        return items;
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.label === d.name;
        });
        return item !== undefined;
    }
    activate(item) {
        this.labelActivate.emit(item);
    }
    deactivate(item) {
        this.labelDeactivate.emit(item);
    }
    trackBy(index, item) {
        return item.label;
    }
}
LegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-legend',
                template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:bold}.chart-legend ul,.chart-legend li{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"]
            },] }
];
LegendComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
LegendComponent.propDecorators = {
    data: [{ type: Input }],
    title: [{ type: Input }],
    colors: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    activeEntries: [{ type: Input }],
    horizontal: [{ type: Input }],
    labelClick: [{ type: Output }],
    labelActivate: [{ type: Output }],
    labelDeactivate: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vbGVnZW5kL2xlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFDTixZQUFZLEVBR1osaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFzQzlDLE1BQU0sT0FBTyxlQUFlO0lBZTFCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBUmhDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbEIsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RELGtCQUFhLEdBQW1DLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkUsb0JBQWUsR0FBbUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvRSxrQkFBYSxHQUFrQixFQUFFLENBQUM7SUFFVSxDQUFDO0lBRTdDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDN0IsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNULEtBQUs7b0JBQ0wsY0FBYztvQkFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2lCQUNuQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWtCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLEtBQUssU0FBUyxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBc0I7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFzQjtRQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWEsRUFBRSxJQUFpQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7O1lBOUZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQ7Z0JBRUQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7O1lBeENDLGlCQUFpQjs7O21CQTBDaEIsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFFTCxNQUFNOzRCQUNOLE1BQU07OEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbG9yLmhlbHBlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGVnZW5kRW50cnkge1xuICBjb2xvcjogc3RyaW5nO1xuICBmb3JtYXR0ZWRMYWJlbDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBbc3R5bGUud2lkdGgucHhdPVwid2lkdGhcIj5cbiAgICAgIDxoZWFkZXIgY2xhc3M9XCJsZWdlbmQtdGl0bGVcIiAqbmdJZj1cInRpdGxlPy5sZW5ndGggPiAwXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kLXRpdGxlLXRleHRcIj57eyB0aXRsZSB9fTwvc3Bhbj5cbiAgICAgIDwvaGVhZGVyPlxuICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC13cmFwXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cImxlZ2VuZC1sYWJlbHNcIiBbY2xhc3MuaG9yaXpvbnRhbC1sZWdlbmRdPVwiaG9yaXpvbnRhbFwiIFtzdHlsZS5tYXgtaGVpZ2h0LnB4XT1cImhlaWdodCAtIDQ1XCI+XG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBlbnRyeSBvZiBsZWdlbmRFbnRyaWVzOyB0cmFja0J5OiB0cmFja0J5XCIgY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgICAgIDxuZ3gtY2hhcnRzLWxlZ2VuZC1lbnRyeVxuICAgICAgICAgICAgICBbbGFiZWxdPVwiZW50cnkubGFiZWxcIlxuICAgICAgICAgICAgICBbZm9ybWF0dGVkTGFiZWxdPVwiZW50cnkuZm9ybWF0dGVkTGFiZWxcIlxuICAgICAgICAgICAgICBbY29sb3JdPVwiZW50cnkuY29sb3JcIlxuICAgICAgICAgICAgICBbaXNBY3RpdmVdPVwiaXNBY3RpdmUoZW50cnkpXCJcbiAgICAgICAgICAgICAgKHNlbGVjdCk9XCJsYWJlbENsaWNrLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbmd4LWNoYXJ0cy1sZWdlbmQtZW50cnk+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogc3RyaW5nW107XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzO1xuICBASW5wdXQoKSBob3Jpem9udGFsID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGxhYmVsQ2xpY2s6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGFiZWxBY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogc3RyaW5nIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGFiZWxEZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8eyBuYW1lOiBzdHJpbmcgfT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbGVnZW5kRW50cmllczogTGVnZW5kRW50cnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5sZWdlbmRFbnRyaWVzID0gdGhpcy5nZXRMZWdlbmRFbnRyaWVzKCk7XG4gIH1cblxuICBnZXRMZWdlbmRFbnRyaWVzKCk6IExlZ2VuZEVudHJ5W10ge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChjb25zdCBsYWJlbCBvZiB0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZExhYmVsID0gZm9ybWF0TGFiZWwobGFiZWwpO1xuXG4gICAgICBjb25zdCBpZHggPSBpdGVtcy5maW5kSW5kZXgoaSA9PiB7XG4gICAgICAgIHJldHVybiBpLmxhYmVsID09PSBmb3JtYXR0ZWRMYWJlbDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBmb3JtYXR0ZWRMYWJlbCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcnMuZ2V0Q29sb3IobGFiZWwpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIGlzQWN0aXZlKGVudHJ5OiBMZWdlbmRFbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5LmxhYmVsID09PSBkLm5hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZW0gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFjdGl2YXRlKGl0ZW06IHsgbmFtZTogc3RyaW5nIH0pIHtcbiAgICB0aGlzLmxhYmVsQWN0aXZhdGUuZW1pdChpdGVtKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoaXRlbTogeyBuYW1lOiBzdHJpbmcgfSkge1xuICAgIHRoaXMubGFiZWxEZWFjdGl2YXRlLmVtaXQoaXRlbSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IExlZ2VuZEVudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5sYWJlbDtcbiAgfVxufVxuIl19