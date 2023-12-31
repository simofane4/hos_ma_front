import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { pie } from 'd3-shape';
export class PieGridSeriesComponent {
    constructor(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.layout = pie()
            .value(d => d.data.value)
            .sort(null);
        this.arcs = this.getArcs();
    }
    getArcs() {
        return this.layout(this.data).map((arc, index) => {
            const label = arc.data.data.name;
            const other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            const color = this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: this.animations && !other,
                pointerEvents: !other
            };
        });
    }
    onClick(data) {
        this.select.emit(this.data[0].data);
    }
    trackBy(index, item) {
        return item.data.name;
    }
    label(arc) {
        return arc.data.name;
    }
    color(arc) {
        return this.colors(this.label(arc));
    }
}
PieGridSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-pie-grid-series]',
                template: `
    <svg:g class="pie-grid-arcs">
      <svg:g
        ngx-charts-pie-arc
        *ngFor="let arc of arcs; trackBy: trackBy"
        [attr.class]="arc.class"
        [startAngle]="arc.startAngle"
        [endAngle]="arc.endAngle"
        [innerRadius]="innerRadius"
        [outerRadius]="outerRadius"
        [fill]="color(arc)"
        [value]="arc.data.value"
        [data]="arc.data"
        [gradient]="false"
        [pointerEvents]="arc.pointerEvents"
        [animate]="arc.animate"
        (select)="onClick($event)"
        (activate)="activate.emit($event)"
        (deactivate)="deactivate.emit($event)"
      ></svg:g>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
PieGridSeriesComponent.ctorParameters = () => [
    { type: ElementRef }
];
PieGridSeriesComponent.propDecorators = {
    colors: [{ type: Input }],
    data: [{ type: Input }],
    innerRadius: [{ type: Input }],
    outerRadius: [{ type: Input }],
    animations: [{ type: Input }],
    select: [{ type: Output }],
    activate: [{ type: Output }],
    deactivate: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9waWUtY2hhcnQvcGllLWdyaWQtc2VyaWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFHVix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQXdDL0IsTUFBTSxPQUFPLHNCQUFzQjtJQWVqQyxZQUFZLE9BQW1CO1FBWnRCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFPeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQVk7YUFDMUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU87UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWxDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUNwQjtZQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsT0FBTztnQkFDTCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQixLQUFLLEVBQUUsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLO2dCQUM3QixJQUFJLEVBQUUsS0FBSztnQkFDWCxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVO2dCQUN0QyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSztnQkFDbEMsYUFBYSxFQUFFLENBQUMsS0FBSzthQUN0QixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7O1lBN0ZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsK0JBQStCO2dCQUN6QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7O1lBNUNDLFVBQVU7OztxQkE4Q1QsS0FBSzttQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUVMLE1BQU07dUJBQ04sTUFBTTt5QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwaWUgfSBmcm9tICdkMy1zaGFwZSc7XG5pbXBvcnQgeyBQaWVHcmlkRGF0YUl0ZW0gfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBQaWVHcmlkRGF0YSB9IGZyb20gJy4vcGllLWdyaWQuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBQaWVBcmMge1xuICBhbmltYXRlOiBib29sZWFuO1xuICBjbGFzczogc3RyaW5nO1xuICBkYXRhOiBQaWVHcmlkRGF0YUl0ZW07XG4gIGVuZEFuZ2xlOiBudW1iZXI7XG4gIGZpbGw6IHN0cmluZztcbiAgcG9pbnRlckV2ZW50czogYm9vbGVhbjtcbiAgc3RhcnRBbmdsZTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtcGllLWdyaWQtc2VyaWVzXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnIGNsYXNzPVwicGllLWdyaWQtYXJjc1wiPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMtcGllLWFyY1xuICAgICAgICAqbmdGb3I9XCJsZXQgYXJjIG9mIGFyY3M7IHRyYWNrQnk6IHRyYWNrQnlcIlxuICAgICAgICBbYXR0ci5jbGFzc109XCJhcmMuY2xhc3NcIlxuICAgICAgICBbc3RhcnRBbmdsZV09XCJhcmMuc3RhcnRBbmdsZVwiXG4gICAgICAgIFtlbmRBbmdsZV09XCJhcmMuZW5kQW5nbGVcIlxuICAgICAgICBbaW5uZXJSYWRpdXNdPVwiaW5uZXJSYWRpdXNcIlxuICAgICAgICBbb3V0ZXJSYWRpdXNdPVwib3V0ZXJSYWRpdXNcIlxuICAgICAgICBbZmlsbF09XCJjb2xvcihhcmMpXCJcbiAgICAgICAgW3ZhbHVlXT1cImFyYy5kYXRhLnZhbHVlXCJcbiAgICAgICAgW2RhdGFdPVwiYXJjLmRhdGFcIlxuICAgICAgICBbZ3JhZGllbnRdPVwiZmFsc2VcIlxuICAgICAgICBbcG9pbnRlckV2ZW50c109XCJhcmMucG9pbnRlckV2ZW50c1wiXG4gICAgICAgIFthbmltYXRlXT1cImFyYy5hbmltYXRlXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgKGRlYWN0aXZhdGUpPVwiZGVhY3RpdmF0ZS5lbWl0KCRldmVudClcIlxuICAgICAgPjwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgUGllR3JpZFNlcmllc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbG9ycztcbiAgQElucHV0KCkgZGF0YTogUGllR3JpZERhdGFbXTtcbiAgQElucHV0KCkgaW5uZXJSYWRpdXMgPSA3MDtcbiAgQElucHV0KCkgb3V0ZXJSYWRpdXMgPSA4MDtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgbGF5b3V0OiBhbnk7XG4gIGFyY3M6IFBpZUFyY1tdO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxheW91dCA9IHBpZTxhbnksIGFueT4oKVxuICAgICAgLnZhbHVlKGQgPT4gZC5kYXRhLnZhbHVlKVxuICAgICAgLnNvcnQobnVsbCk7XG5cbiAgICB0aGlzLmFyY3MgPSB0aGlzLmdldEFyY3MoKTtcbiAgfVxuXG4gIGdldEFyY3MoKTogUGllQXJjW10ge1xuICAgIHJldHVybiB0aGlzLmxheW91dCh0aGlzLmRhdGEpLm1hcCgoYXJjLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBhcmMuZGF0YS5kYXRhLm5hbWU7XG4gICAgICBjb25zdCBvdGhlciA9IGFyYy5kYXRhLmRhdGEub3RoZXI7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICBhcmMuc3RhcnRBbmdsZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnMobGFiZWwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogYXJjLmRhdGEuZGF0YSxcbiAgICAgICAgY2xhc3M6ICdhcmMgJyArICdhcmMnICsgaW5kZXgsXG4gICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICBzdGFydEFuZ2xlOiBvdGhlciA/IDAgOiBhcmMuc3RhcnRBbmdsZSxcbiAgICAgICAgZW5kQW5nbGU6IGFyYy5lbmRBbmdsZSxcbiAgICAgICAgYW5pbWF0ZTogdGhpcy5hbmltYXRpb25zICYmICFvdGhlcixcbiAgICAgICAgcG9pbnRlckV2ZW50czogIW90aGVyXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgb25DbGljayhkYXRhKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGFbMF0uZGF0YSk7XG4gIH1cblxuICB0cmFja0J5KGluZGV4LCBpdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gaXRlbS5kYXRhLm5hbWU7XG4gIH1cblxuICBsYWJlbChhcmMpOiBzdHJpbmcge1xuICAgIHJldHVybiBhcmMuZGF0YS5uYW1lO1xuICB9XG5cbiAgY29sb3IoYXJjKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcnModGhpcy5sYWJlbChhcmMpKTtcbiAgfVxufVxuIl19