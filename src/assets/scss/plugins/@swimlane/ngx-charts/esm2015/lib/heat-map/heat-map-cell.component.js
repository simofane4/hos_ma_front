import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { select } from 'd3-selection';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { id } from '../utils/id';
export class HeatMapCellComponent {
    constructor(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barOrientation = BarOrientation;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.transform = `translate(${this.x} , ${this.y})`;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = `url(#${this.gradientId})`;
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
    }
    getGradientStops() {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    loadAnimation() {
        const node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    }
    animateToCurrentForm() {
        const node = select(this.element).select('.cell');
        node.transition().duration(750).attr('opacity', 1);
    }
    onClick() {
        this.select.emit(this.data);
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
}
HeatMapCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-heat-map-cell]',
                template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        (click)="onClick()"
      />
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
HeatMapCellComponent.ctorParameters = () => [
    { type: ElementRef }
];
HeatMapCellComponent.propDecorators = {
    fill: [{ type: Input }],
    x: [{ type: Input }],
    y: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    data: [{ type: Input }],
    gradient: [{ type: Input }],
    animations: [{ type: Input }],
    select: [{ type: Output }],
    activate: [{ type: Output }],
    deactivate: [{ type: Output }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhdC1tYXAtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvaGVhdC1tYXAvaGVhdC1tYXAtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixVQUFVLEVBRVYsdUJBQXVCLEVBQ3ZCLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV0RSxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBMEJqQyxNQUFNLE9BQU8sb0JBQW9CO0lBdUIvQixZQUFZLE9BQW1CO1FBaEJ0QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwRCxlQUFVLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFTaEUsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFHOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO1FBRXBELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUU3QyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU87WUFDTDtnQkFDRSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMzQjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLENBQUM7YUFDWDtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7OztZQXZHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7WUFsQ0MsVUFBVTs7O21CQW9DVCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7bUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBRUwsTUFBTTt1QkFDTixNQUFNO3lCQUNOLE1BQU07MkJBMkROLFlBQVksU0FBQyxZQUFZOzJCQUt6QixZQUFZLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBIb3N0TGlzdGVuZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gJ2QzLXRyYW5zaXRpb24nO1xuaW1wb3J0IHsgQmFyT3JpZW50YXRpb24gfSBmcm9tICcuLi9jb21tb24vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtaGVhdC1tYXAtY2VsbF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJjZWxsXCI+XG4gICAgICA8ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtc3ZnLWxpbmVhci1ncmFkaWVudFxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5WZXJ0aWNhbFwiXG4gICAgICAgICAgW25hbWVdPVwiZ3JhZGllbnRJZFwiXG4gICAgICAgICAgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIlxuICAgICAgICAvPlxuICAgICAgPC9kZWZzPlxuICAgICAgPHN2ZzpyZWN0XG4gICAgICAgIFthdHRyLmZpbGxdPVwiZ3JhZGllbnQgPyBncmFkaWVudFVybCA6IGZpbGxcIlxuICAgICAgICByeD1cIjNcIlxuICAgICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgICBjbGFzcz1cImNlbGxcIlxuICAgICAgICAoY2xpY2spPVwib25DbGljaygpXCJcbiAgICAgIC8+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgSGVhdE1hcENlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBmaWxsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHg6IG51bWJlcjtcbiAgQElucHV0KCkgeTogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgZGF0YTogbnVtYmVyO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgc3RhcnRPcGFjaXR5OiBudW1iZXI7XG4gIGdyYWRpZW50SWQ6IHN0cmluZztcbiAgZ3JhZGllbnRVcmw6IHN0cmluZztcbiAgZ3JhZGllbnRTdG9wczogR3JhZGllbnRbXTtcblxuICBiYXJPcmllbnRhdGlvbiA9IEJhck9yaWVudGF0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy54fSAsICR7dGhpcy55fSlgO1xuXG4gICAgdGhpcy5zdGFydE9wYWNpdHkgPSAwLjM7XG4gICAgdGhpcy5ncmFkaWVudElkID0gJ2dyYWQnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuZ3JhZGllbnRVcmwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcbiAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmdldEdyYWRpZW50U3RvcHMoKTtcblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGdldEdyYWRpZW50U3RvcHMoKTogR3JhZGllbnRbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLnN0YXJ0T3BhY2l0eVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgbG9hZEFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuY2VsbCcpO1xuICAgIG5vZGUuYXR0cignb3BhY2l0eScsIDApO1xuICAgIHRoaXMuYW5pbWF0ZVRvQ3VycmVudEZvcm0oKTtcbiAgfVxuXG4gIGFuaW1hdGVUb0N1cnJlbnRGb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50KS5zZWxlY3QoJy5jZWxsJyk7XG5cbiAgICBub2RlLnRyYW5zaXRpb24oKS5kdXJhdGlvbig3NTApLmF0dHIoJ29wYWNpdHknLCAxKTtcbiAgfVxuXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGEpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQodGhpcy5kYXRhKTtcbiAgfVxufVxuIl19