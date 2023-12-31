import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Orientation } from '../types/orientation.enum';
export class AxisLabelComponent {
    constructor(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case Orientation.Top:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Bottom:
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case Orientation.Left:
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case Orientation.Right:
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    }
}
AxisLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-axis-label]',
                template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
    >
      {{ label }}
    </svg:text>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
AxisLabelComponent.ctorParameters = () => [
    { type: ElementRef }
];
AxisLabelComponent.propDecorators = {
    orient: [{ type: Input }],
    label: [{ type: Input }],
    offset: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhpcy1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL2F4ZXMvYXhpcy1sYWJlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUE0Qix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFpQnhELE1BQU0sT0FBTyxrQkFBa0I7SUFnQjdCLFlBQVksT0FBbUI7UUFIL0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBR1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLEtBQUssV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLE1BQU07Z0JBQ3JCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNSLEtBQUssV0FBVyxDQUFDLElBQUk7Z0JBQ25CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQy9CLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxLQUFLO2dCQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztnQkFDL0IsTUFBTTtZQUNSLFFBQVE7U0FDVDtJQUNILENBQUM7OztZQWpFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0dBVVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQWpCMEIsVUFBVTs7O3FCQW1CbEMsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JpZW50YXRpb24gfSBmcm9tICcuLi90eXBlcy9vcmllbnRhdGlvbi5lbnVtJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWF4aXMtbGFiZWxdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOnRleHRcbiAgICAgIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgW2F0dHIueV09XCJ5XCJcbiAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiXG4gICAgPlxuICAgICAge3sgbGFiZWwgfX1cbiAgICA8L3N2Zzp0ZXh0PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBeGlzTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBvcmllbnQ6IE9yaWVudGF0aW9uO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBvZmZzZXQ6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG5cbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBzdHJva2VXaWR0aDogc3RyaW5nO1xuICB0ZXh0QW5jaG9yOiBzdHJpbmc7XG4gIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIHRleHRIZWlnaHQgPSAyNTtcbiAgbWFyZ2luID0gNTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdHJva2VXaWR0aCA9ICcwLjAxJztcbiAgICB0aGlzLnRleHRBbmNob3IgPSAnbWlkZGxlJztcbiAgICB0aGlzLnRyYW5zZm9ybSA9ICcnO1xuXG4gICAgc3dpdGNoICh0aGlzLm9yaWVudCkge1xuICAgICAgY2FzZSBPcmllbnRhdGlvbi5Ub3A6XG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0O1xuICAgICAgICB0aGlzLnggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLkJvdHRvbTpcbiAgICAgICAgdGhpcy55ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT3JpZW50YXRpb24uTGVmdDpcbiAgICAgICAgdGhpcy55ID0gLSh0aGlzLm9mZnNldCArIHRoaXMudGV4dEhlaWdodCArIHRoaXMubWFyZ2luKTtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSAncm90YXRlKDI3MCknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT3JpZW50YXRpb24uUmlnaHQ6XG4gICAgICAgIHRoaXMueSA9IHRoaXMub2Zmc2V0ICsgdGhpcy5tYXJnaW47XG4gICAgICAgIHRoaXMueCA9IC10aGlzLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gJ3JvdGF0ZSgyNzApJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfVxufVxuIl19