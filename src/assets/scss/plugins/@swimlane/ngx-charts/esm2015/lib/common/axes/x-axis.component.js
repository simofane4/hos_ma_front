import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';
export class XAxisComponent {
    constructor() {
        this.rotateTicks = true;
        this.showGridLines = false;
        this.xOrient = Orientation.Bottom;
        this.xAxisOffset = 0;
        this.dimensionsChanged = new EventEmitter();
        this.xAxisClassName = 'x axis';
        this.labelOffset = 0;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.padding = 5;
        this.orientation = Orientation;
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.transform = `translate(0,${this.xAxisOffset + this.padding + this.dims.height})`;
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    }
    emitTicksHeight({ height }) {
        const newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(() => {
                this.dimensionsChanged.emit({ height });
            }, 0);
        }
    }
}
XAxisComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-x-axis]',
                template: `
    <svg:g [attr.class]="xAxisClassName" [attr.transform]="transform">
      <svg:g
        ngx-charts-x-axis-ticks
        *ngIf="xScale"
        [trimTicks]="trimTicks"
        [rotateTicks]="rotateTicks"
        [maxTickLength]="maxTickLength"
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="xScale"
        [orient]="xOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
        [width]="dims.width"
        [tickValues]="ticks"
        (dimensionsChanged)="emitTicksHeight($event)"
      />
      <svg:g
        ngx-charts-axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="labelOffset"
        [orient]="orientation.Bottom"
        [height]="dims.height"
        [width]="dims.width"
      ></svg:g>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
XAxisComponent.propDecorators = {
    xScale: [{ type: Input }],
    dims: [{ type: Input }],
    trimTicks: [{ type: Input }],
    rotateTicks: [{ type: Input }],
    maxTickLength: [{ type: Input }],
    tickFormatting: [{ type: Input }],
    showGridLines: [{ type: Input }],
    showLabel: [{ type: Input }],
    labelText: [{ type: Input }],
    ticks: [{ type: Input }],
    xAxisTickCount: [{ type: Input }],
    xOrient: [{ type: Input }],
    xAxisOffset: [{ type: Input }],
    dimensionsChanged: [{ type: Output }],
    ticksComponent: [{ type: ViewChild, args: [XAxisTicksComponent,] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC1heGlzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vYXhlcy94LWF4aXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLE1BQU0sRUFDTixZQUFZLEVBRVosU0FBUyxFQUNULHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFxQ3hELE1BQU0sT0FBTyxjQUFjO0lBbEMzQjtRQXNDVyxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUt0QixZQUFPLEdBQWdCLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFDMUMsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFdkIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFXLFFBQVEsQ0FBQztRQUlsQyxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixTQUFJLEdBQVcsTUFBTSxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsZUFBVSxHQUFXLE1BQU0sQ0FBQztRQUM1QixnQkFBVyxHQUFXLE1BQU0sQ0FBQztRQUM3QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRVgsZ0JBQVcsR0FBRyxXQUFXLENBQUM7SUF5QnJDLENBQUM7SUFyQkMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUV0RixJQUFJLE9BQU8sSUFBSSxDQUFDLGNBQWMsS0FBSyxXQUFXLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxlQUFlLENBQUMsRUFBRSxNQUFNLEVBQUU7UUFDeEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkMsSUFBSSxjQUFjLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2QyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztZQUNsQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNQO0lBQ0gsQ0FBQzs7O1lBdEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7cUJBRUUsS0FBSzttQkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7b0JBQ0wsS0FBSzs2QkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSztnQ0FFTCxNQUFNOzZCQWVOLFNBQVMsU0FBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBYQXhpc1RpY2tzQ29tcG9uZW50IH0gZnJvbSAnLi94LWF4aXMtdGlja3MuY29tcG9uZW50JztcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSAnLi4vdHlwZXMvb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL3R5cGVzL3ZpZXctZGltZW5zaW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy14LWF4aXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgW2F0dHIuY2xhc3NdPVwieEF4aXNDbGFzc05hbWVcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy14LWF4aXMtdGlja3NcbiAgICAgICAgKm5nSWY9XCJ4U2NhbGVcIlxuICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1UaWNrc1wiXG4gICAgICAgIFtyb3RhdGVUaWNrc109XCJyb3RhdGVUaWNrc1wiXG4gICAgICAgIFttYXhUaWNrTGVuZ3RoXT1cIm1heFRpY2tMZW5ndGhcIlxuICAgICAgICBbdGlja0Zvcm1hdHRpbmddPVwidGlja0Zvcm1hdHRpbmdcIlxuICAgICAgICBbdGlja0FyZ3VtZW50c109XCJ0aWNrQXJndW1lbnRzXCJcbiAgICAgICAgW3RpY2tTdHJva2VdPVwidGlja1N0cm9rZVwiXG4gICAgICAgIFtzY2FsZV09XCJ4U2NhbGVcIlxuICAgICAgICBbb3JpZW50XT1cInhPcmllbnRcIlxuICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgW2dyaWRMaW5lSGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgICBbdGlja1ZhbHVlc109XCJ0aWNrc1wiXG4gICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJlbWl0VGlja3NIZWlnaHQoJGV2ZW50KVwiXG4gICAgICAvPlxuICAgICAgPHN2ZzpnXG4gICAgICAgIG5neC1jaGFydHMtYXhpcy1sYWJlbFxuICAgICAgICAqbmdJZj1cInNob3dMYWJlbFwiXG4gICAgICAgIFtsYWJlbF09XCJsYWJlbFRleHRcIlxuICAgICAgICBbb2Zmc2V0XT1cImxhYmVsT2Zmc2V0XCJcbiAgICAgICAgW29yaWVudF09XCJvcmllbnRhdGlvbi5Cb3R0b21cIlxuICAgICAgICBbaGVpZ2h0XT1cImRpbXMuaGVpZ2h0XCJcbiAgICAgICAgW3dpZHRoXT1cImRpbXMud2lkdGhcIlxuICAgICAgPjwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgWEF4aXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB4U2NhbGU7XG4gIEBJbnB1dCgpIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHJvdGF0ZVRpY2tzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgbWF4VGlja0xlbmd0aDogbnVtYmVyO1xuICBASW5wdXQoKSB0aWNrRm9ybWF0dGluZztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lcyA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93TGFiZWw6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGxhYmVsVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSB0aWNrczogYW55W107XG4gIEBJbnB1dCgpIHhBeGlzVGlja0NvdW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIHhPcmllbnQ6IE9yaWVudGF0aW9uID0gT3JpZW50YXRpb24uQm90dG9tO1xuICBASW5wdXQoKSB4QXhpc09mZnNldDogbnVtYmVyID0gMDtcblxuICBAT3V0cHV0KCkgZGltZW5zaW9uc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgeEF4aXNDbGFzc05hbWU6IHN0cmluZyA9ICd4IGF4aXMnO1xuXG4gIHRpY2tBcmd1bWVudHM6IG51bWJlcltdO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgbGFiZWxPZmZzZXQ6IG51bWJlciA9IDA7XG4gIGZpbGw6IHN0cmluZyA9ICdub25lJztcbiAgc3Ryb2tlOiBzdHJpbmcgPSAnc3Ryb2tlJztcbiAgdGlja1N0cm9rZTogc3RyaW5nID0gJyNjY2MnO1xuICBzdHJva2VXaWR0aDogc3RyaW5nID0gJ25vbmUnO1xuICBwYWRkaW5nOiBudW1iZXIgPSA1O1xuXG4gIHJlYWRvbmx5IG9yaWVudGF0aW9uID0gT3JpZW50YXRpb247XG5cbiAgQFZpZXdDaGlsZChYQXhpc1RpY2tzQ29tcG9uZW50KSB0aWNrc0NvbXBvbmVudDogWEF4aXNUaWNrc0NvbXBvbmVudDtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoMCwke3RoaXMueEF4aXNPZmZzZXQgKyB0aGlzLnBhZGRpbmcgKyB0aGlzLmRpbXMuaGVpZ2h0fSlgO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnhBeGlzVGlja0NvdW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy50aWNrQXJndW1lbnRzID0gW3RoaXMueEF4aXNUaWNrQ291bnRdO1xuICAgIH1cbiAgfVxuXG4gIGVtaXRUaWNrc0hlaWdodCh7IGhlaWdodCB9KTogdm9pZCB7XG4gICAgY29uc3QgbmV3TGFiZWxPZmZzZXQgPSBoZWlnaHQgKyAyNSArIDU7XG4gICAgaWYgKG5ld0xhYmVsT2Zmc2V0ICE9PSB0aGlzLmxhYmVsT2Zmc2V0KSB7XG4gICAgICB0aGlzLmxhYmVsT2Zmc2V0ID0gbmV3TGFiZWxPZmZzZXQ7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHsgaGVpZ2h0IH0pO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG59XG4iXX0=