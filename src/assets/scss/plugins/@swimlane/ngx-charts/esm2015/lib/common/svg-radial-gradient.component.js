import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export class SvgRadialGradientComponent {
    constructor() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    get stops() {
        return this.stopsInput || this.stopsDefault;
    }
    set stops(value) {
        this.stopsInput = value;
    }
    ngOnChanges(changes) {
        this.r = '30%';
        if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
            this.stopsDefault = [
                {
                    offset: 0,
                    color: this.color,
                    opacity: this.startOpacity
                },
                {
                    offset: 100,
                    color: this.color,
                    opacity: this.endOpacity
                }
            ];
        }
    }
}
SvgRadialGradientComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-svg-radial-gradient]',
                template: `
    <svg:radialGradient [id]="name" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" gradientUnits="userSpaceOnUse">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
SvgRadialGradientComponent.propDecorators = {
    color: [{ type: Input }],
    name: [{ type: Input }],
    startOpacity: [{ type: Input }],
    endOpacity: [{ type: Input }],
    cx: [{ type: Input }],
    cy: [{ type: Input }],
    stops: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJhZGlhbC1ncmFkaWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3N2Zy1yYWRpYWwtZ3JhZGllbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLHVCQUF1QixFQUFpQixNQUFNLGVBQWUsQ0FBQztBQWlCcEcsTUFBTSxPQUFPLDBCQUEwQjtJQWR2QztRQWtCVyxlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsT0FBRSxHQUFXLENBQUMsQ0FBQztRQUNmLE9BQUUsR0FBVyxDQUFDLENBQUM7SUFpQzFCLENBQUM7SUEvQkMsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFPRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDZixJQUFJLE9BQU8sSUFBSSxPQUFPLElBQUksY0FBYyxJQUFJLE9BQU8sSUFBSSxZQUFZLElBQUksT0FBTyxFQUFFO1lBQzlFLElBQUksQ0FBQyxZQUFZLEdBQUc7Z0JBQ2xCO29CQUNFLE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUMzQjtnQkFDRDtvQkFDRSxNQUFNLEVBQUUsR0FBRztvQkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDekI7YUFDRixDQUFDO1NBQ0g7SUFDSCxDQUFDOzs7WUFwREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQ0FBbUM7Z0JBQzdDLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztvQkFFRSxLQUFLO21CQUNMLEtBQUs7MkJBQ0wsS0FBSzt5QkFDTCxLQUFLO2lCQUNMLEtBQUs7aUJBQ0wsS0FBSztvQkFFTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuL3R5cGVzL2dyYWRpZW50LmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1zdmctcmFkaWFsLWdyYWRpZW50XScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpyYWRpYWxHcmFkaWVudCBbaWRdPVwibmFtZVwiIFthdHRyLmN4XT1cImN4XCIgW2F0dHIuY3ldPVwiY3lcIiBbYXR0ci5yXT1cInJcIiBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cbiAgICAgIDxzdmc6c3RvcFxuICAgICAgICAqbmdGb3I9XCJsZXQgc3RvcCBvZiBzdG9wc1wiXG4gICAgICAgIFthdHRyLm9mZnNldF09XCJzdG9wLm9mZnNldCArICclJ1wiXG4gICAgICAgIFtzdHlsZS5zdG9wLWNvbG9yXT1cInN0b3AuY29sb3JcIlxuICAgICAgICBbc3R5bGUuc3RvcC1vcGFjaXR5XT1cInN0b3Aub3BhY2l0eVwiXG4gICAgICAvPlxuICAgIDwvc3ZnOnJhZGlhbEdyYWRpZW50PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTdmdSYWRpYWxHcmFkaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgc3RhcnRPcGFjaXR5OiBudW1iZXI7XG4gIEBJbnB1dCgpIGVuZE9wYWNpdHkgPSAxO1xuICBASW5wdXQoKSBjeDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgY3k6IG51bWJlciA9IDA7XG5cbiAgQElucHV0KClcbiAgZ2V0IHN0b3BzKCk6IEdyYWRpZW50W10ge1xuICAgIHJldHVybiB0aGlzLnN0b3BzSW5wdXQgfHwgdGhpcy5zdG9wc0RlZmF1bHQ7XG4gIH1cblxuICBzZXQgc3RvcHModmFsdWU6IEdyYWRpZW50W10pIHtcbiAgICB0aGlzLnN0b3BzSW5wdXQgPSB2YWx1ZTtcbiAgfVxuXG4gIHI6IHN0cmluZztcblxuICBwcml2YXRlIHN0b3BzSW5wdXQ6IEdyYWRpZW50W107XG4gIHByaXZhdGUgc3RvcHNEZWZhdWx0OiBHcmFkaWVudFtdO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnIgPSAnMzAlJztcbiAgICBpZiAoJ2NvbG9yJyBpbiBjaGFuZ2VzIHx8ICdzdGFydE9wYWNpdHknIGluIGNoYW5nZXMgfHwgJ2VuZE9wYWNpdHknIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMuc3RvcHNEZWZhdWx0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbG9yLFxuICAgICAgICAgIG9wYWNpdHk6IHRoaXMuc3RhcnRPcGFjaXR5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBvZmZzZXQ6IDEwMCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBvcGFjaXR5OiB0aGlzLmVuZE9wYWNpdHlcbiAgICAgICAgfVxuICAgICAgXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==