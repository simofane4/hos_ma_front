import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';
var ElementType;
(function (ElementType) {
    ElementType["Value"] = "value";
    ElementType["Units"] = "units";
})(ElementType || (ElementType = {}));
export class LinearGaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
        this.barOrientation = BarOrientation;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.scaleText(ElementType.Value);
            this.scaleText(ElementType.Units);
        });
    }
    update() {
        super.update();
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
        this.valueTranslate = `translate(0, -15)`;
        this.unitsTranslate = `translate(0, 15)`;
        if (isPlatformServer(this.platformId)) {
            this.scaleTextSSR('value');
            this.scaleTextSSR('units');
        }
        else {
            setTimeout(() => this.scaleText(ElementType.Value), 50);
            setTimeout(() => this.scaleText(ElementType.Units), 50);
        }
    }
    getValueDomain() {
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
    }
    getDisplayValue() {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    }
    scaleText(element, repeat = true) {
        let el;
        let resizeScale;
        if (element === ElementType.Value) {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        const { width, height } = el.nativeElement.getBoundingClientRect();
        if (width === 0 || height === 0)
            return;
        const oldScale = resizeScale;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === ElementType.Value) {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            this.cd.markForCheck();
            if (repeat && isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    this.scaleText(element, false);
                }, 50);
            }
        }
    }
    scaleTextSSR(element) {
        let resizeScale = 1;
        const value = element === 'value' ? this.displayValue : this.units;
        const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
        const height = 25;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (element === 'value') {
            this.valueResizeScale = resizeScale;
            this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
        }
        else {
            this.unitsResizeScale = resizeScale;
            this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
        }
        this.cd.markForCheck();
    }
    onClick() {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, [this.value], this.customColors);
    }
}
LinearGaugeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-linear-gauge',
                template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g
          ngx-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>
        <svg:g
          ngx-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text
              #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge"
            >
              {{ displayValue }}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text
              #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge"
            >
              {{ units }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:#0000000d}.linear-gauge .units{fill:#666}\n"]
            },] }
];
LinearGaugeComponent.propDecorators = {
    min: [{ type: Input }],
    max: [{ type: Input }],
    value: [{ type: Input }],
    units: [{ type: Input }],
    previousValue: [{ type: Input }],
    valueFormatting: [{ type: Input }],
    valueTextEl: [{ type: ViewChild, args: ['valueTextEl',] }],
    unitsTextEl: [{ type: ViewChild, args: ['unitsTextEl',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9nYXVnZS9saW5lYXItZ2F1Z2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsRUFFVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXRFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFNUQsSUFBSyxXQUdKO0FBSEQsV0FBSyxXQUFXO0lBQ2QsOEJBQWUsQ0FBQTtJQUNmLDhCQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFvRkQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGtCQUFrQjtJQWxGNUQ7O1FBbUZXLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFD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S0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7NEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzBCQUVMLFNBQVMsU0FBQyxhQUFhOzBCQUN2QixTQUFTLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XG5cbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBjYWxjdWxhdGVUZXh0V2lkdGggfSBmcm9tICcuLi91dGlscy9jYWxjdWxhdGUtd2lkdGgnO1xuaW1wb3J0IHsgVkVSREFOQV9GT05UX1dJRFRIU18xNl9QWCB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMvZm9udC13aWR0aHMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuXG5lbnVtIEVsZW1lbnRUeXBlIHtcbiAgVmFsdWUgPSAndmFsdWUnLFxuICBVbml0cyA9ICd1bml0cydcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1saW5lYXItZ2F1Z2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0IFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiIFtzaG93TGVnZW5kXT1cImZhbHNlXCIgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6ZyBjbGFzcz1cImxpbmVhci1nYXVnZSBjaGFydFwiPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICBuZ3gtY2hhcnRzLWJhclxuICAgICAgICAgIGNsYXNzPVwiYmFja2dyb3VuZC1iYXJcIlxuICAgICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcbiAgICAgICAgICBbaGVpZ2h0XT1cIjNcIlxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXG4gICAgICAgICAgW2RhdGFdPVwie31cIlxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgPjwvc3ZnOmc+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtYmFyXG4gICAgICAgICAgW3dpZHRoXT1cInZhbHVlU2NhbGUodmFsdWUpXCJcbiAgICAgICAgICBbaGVpZ2h0XT1cIjNcIlxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXG4gICAgICAgICAgW2ZpbGxdPVwiY29sb3JzLmdldENvbG9yKHVuaXRzKVwiXG4gICAgICAgICAgW2RhdGFdPVwie31cIlxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgPjwvc3ZnOmc+XG5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgKm5nSWY9XCJoYXNQcmV2aW91c1ZhbHVlXCJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtTGluZVwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICB5MT1cIjVcIlxuICAgICAgICAgIHgyPVwiMFwiXG4gICAgICAgICAgeTI9XCIxNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6bGluZVxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgeTE9XCItNVwiXG4gICAgICAgICAgeDI9XCIwXCJcbiAgICAgICAgICB5Mj1cIi0xNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ2YWx1ZVRyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICAgICN2YWx1ZVRleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInZhbHVlXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidmFsdWVUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYWZ0ZXItZWRnZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IGRpc3BsYXlWYWx1ZSB9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICA8L3N2ZzpnPlxuXG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ1bml0c1RyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICAgICN1bml0c1RleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInVuaXRzXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidW5pdHNUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYmVmb3JlLWVkZ2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyB1bml0cyB9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lYXJHYXVnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcbiAgQElucHV0KCkgcHJldmlvdXNWYWx1ZTogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcblxuICBAVmlld0NoaWxkKCd2YWx1ZVRleHRFbCcpIHZhbHVlVGV4dEVsOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd1bml0c1RleHRFbCcpIHVuaXRzVGV4dEVsOiBFbGVtZW50UmVmO1xuXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICB2YWx1ZURvbWFpbjogW251bWJlciwgbnVtYmVyXTtcbiAgdmFsdWVTY2FsZTogYW55O1xuXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBtYXJnaW46IG51bWJlcltdID0gWzEwLCAyMCwgMTAsIDIwXTtcbiAgdHJhbnNmb3JtTGluZTogc3RyaW5nO1xuXG4gIHZhbHVlUmVzaXplU2NhbGU6IG51bWJlciA9IDE7XG4gIHVuaXRzUmVzaXplU2NhbGU6IG51bWJlciA9IDE7XG4gIHZhbHVlVGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XG4gIHZhbHVlVHJhbnNsYXRlOiBzdHJpbmcgPSAnJztcbiAgdW5pdHNUZXh0VHJhbnNmb3JtOiBzdHJpbmcgPSAnJztcbiAgdW5pdHNUcmFuc2xhdGU6IHN0cmluZyA9ICcnO1xuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgaGFzUHJldmlvdXNWYWx1ZTogYm9vbGVhbjtcblxuICBiYXJPcmllbnRhdGlvbiA9IEJhck9yaWVudGF0aW9uO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2NhbGVUZXh0KEVsZW1lbnRUeXBlLlZhbHVlKTtcbiAgICAgIHRoaXMuc2NhbGVUZXh0KEVsZW1lbnRUeXBlLlVuaXRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIHRoaXMuaGFzUHJldmlvdXNWYWx1ZSA9IHRoaXMucHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMudmFsdWUpO1xuICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB0aGlzLnByZXZpb3VzVmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG5cbiAgICBjb25zdCB4T2Zmc2V0ID0gdGhpcy5tYXJnaW5bM10gKyB0aGlzLmRpbXMud2lkdGggLyAyO1xuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eE9mZnNldH0sICR7eU9mZnNldH0pYDtcbiAgICB0aGlzLnRyYW5zZm9ybUxpbmUgPSBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW5bM10gKyB0aGlzLnZhbHVlU2NhbGUodGhpcy5wcmV2aW91c1ZhbHVlKX0sICR7eU9mZnNldH0pYDtcbiAgICB0aGlzLnZhbHVlVHJhbnNsYXRlID0gYHRyYW5zbGF0ZSgwLCAtMTUpYDtcbiAgICB0aGlzLnVuaXRzVHJhbnNsYXRlID0gYHRyYW5zbGF0ZSgwLCAxNSlgO1xuXG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5zY2FsZVRleHRTU1IoJ3ZhbHVlJyk7XG4gICAgICB0aGlzLnNjYWxlVGV4dFNTUigndW5pdHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dChFbGVtZW50VHlwZS5WYWx1ZSksIDUwKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoRWxlbWVudFR5cGUuVW5pdHMpLCA1MCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWVEb21haW4oKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLm1pbiwgdGhpcy5tYXhdO1xuICB9XG5cbiAgZ2V0VmFsdWVTY2FsZSgpOiBhbnkge1xuICAgIHJldHVybiBzY2FsZUxpbmVhcigpLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKS5kb21haW4odGhpcy52YWx1ZURvbWFpbik7XG4gIH1cblxuICBnZXREaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIHNjYWxlVGV4dChlbGVtZW50OiBFbGVtZW50VHlwZSwgcmVwZWF0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGxldCBlbDtcbiAgICBsZXQgcmVzaXplU2NhbGU7XG4gICAgaWYgKGVsZW1lbnQgPT09IEVsZW1lbnRUeXBlLlZhbHVlKSB7XG4gICAgICBlbCA9IHRoaXMudmFsdWVUZXh0RWw7XG4gICAgICByZXNpemVTY2FsZSA9IHRoaXMudmFsdWVSZXNpemVTY2FsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSB0aGlzLnVuaXRzVGV4dEVsO1xuICAgICAgcmVzaXplU2NhbGUgPSB0aGlzLnVuaXRzUmVzaXplU2NhbGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHJldHVybjtcbiAgICBjb25zdCBvbGRTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xuICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IE1hdGgubWF4KHRoaXMuZGltcy5oZWlnaHQgLyAyIC0gMTUsIDApO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlV2lkdGggPSBNYXRoLmZsb29yKChhdmFpbGFibGVXaWR0aCAvICh3aWR0aCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlSGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlSGVpZ2h0IC8gKGhlaWdodCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIHJlc2l6ZVNjYWxlID0gTWF0aC5taW4ocmVzaXplU2NhbGVIZWlnaHQsIHJlc2l6ZVNjYWxlV2lkdGgpO1xuXG4gICAgaWYgKHJlc2l6ZVNjYWxlICE9PSBvbGRTY2FsZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IEVsZW1lbnRUeXBlLlZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWVSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnZhbHVlVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3Jlc2l6ZVNjYWxlfSwgJHtyZXNpemVTY2FsZX0pYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudW5pdHNSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnVuaXRzVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3Jlc2l6ZVNjYWxlfSwgJHtyZXNpemVTY2FsZX0pYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICBpZiAocmVwZWF0ICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY2FsZVRleHQoZWxlbWVudCwgZmFsc2UpO1xuICAgICAgICB9LCA1MCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2NhbGVUZXh0U1NSKGVsZW1lbnQpIHtcbiAgICBsZXQgcmVzaXplU2NhbGUgPSAxO1xuXG4gICAgY29uc3QgdmFsdWUgPSBlbGVtZW50ID09PSAndmFsdWUnID8gdGhpcy5kaXNwbGF5VmFsdWUgOiB0aGlzLnVuaXRzO1xuICAgIGNvbnN0IHdpZHRoID0gY2FsY3VsYXRlVGV4dFdpZHRoKFZFUkRBTkFfRk9OVF9XSURUSFNfMTZfUFgsIHZhbHVlLCAxMCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gMjU7XG5cbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBNYXRoLm1heCh0aGlzLmRpbXMuaGVpZ2h0IC8gMiAtIDE1LCAwKTtcbiAgICBjb25zdCByZXNpemVTY2FsZVdpZHRoID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlV2lkdGggLyAod2lkdGggLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCByZXNpemVTY2FsZUhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsYWJsZUhlaWdodCAvIChoZWlnaHQgLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICByZXNpemVTY2FsZSA9IE1hdGgubWluKHJlc2l6ZVNjYWxlSGVpZ2h0LCByZXNpemVTY2FsZVdpZHRoKTtcblxuICAgIGlmIChlbGVtZW50ID09PSAndmFsdWUnKSB7XG4gICAgICB0aGlzLnZhbHVlUmVzaXplU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICAgIHRoaXMudmFsdWVUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVuaXRzUmVzaXplU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICAgIHRoaXMudW5pdHNUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogJ1ZhbHVlJyxcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBzZXRDb2xvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIFNjYWxlVHlwZS5PcmRpbmFsLCBbdGhpcy52YWx1ZV0sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxufVxuIl19