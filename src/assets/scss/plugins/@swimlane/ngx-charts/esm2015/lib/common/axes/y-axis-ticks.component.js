import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
import { isPlatformBrowser } from '@angular/common';
import { Orientation } from '../types/orientation.enum';
import { TextAnchor } from '../types/text-anchor.enum';
export class YAxisTicksComponent {
    constructor(platformId) {
        this.platformId = platformId;
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.trimTicks = true;
        this.maxTickLength = 16;
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = TextAnchor.Middle;
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
        this.Orientation = Orientation;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngAfterViewInit() {
        setTimeout(() => this.updateDims());
    }
    updateDims() {
        if (!isPlatformBrowser(this.platformId)) {
            // for SSR, use approximate value instead of measured
            this.width = this.getApproximateAxisWidth();
            this.dimensionsChanged.emit({ width: this.width });
            return;
        }
        const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width });
            setTimeout(() => this.updateDims());
        }
    }
    update() {
        let scale;
        const sign = this.orient === Orientation.Top || this.orient === Orientation.Right ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth
            ? function (d) {
                return scale(d) + scale.bandwidth() * 0.5;
            }
            : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case Orientation.Top:
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = TextAnchor.Middle;
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case Orientation.Bottom:
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = TextAnchor.Middle;
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case Orientation.Left:
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = TextAnchor.End;
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case Orientation.Right:
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = TextAnchor.Start;
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(() => this.updateDims());
    }
    setReferencelines() {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(item => item.value)));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(item => item.value)));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [
            false,
            false,
            false,
            false
        ]);
    }
    getTicks() {
        let ticks;
        const maxTicks = this.getMaxTicks(20);
        const maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    }
    getMaxTicks(tickHeight) {
        return Math.floor(this.height / tickHeight);
    }
    tickTransform(tick) {
        return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
    }
    gridLineTransform() {
        return `translate(5,0)`;
    }
    tickTrim(label) {
        return this.trimTicks ? trimLabel(label, this.maxTickLength) : label;
    }
    getApproximateAxisWidth() {
        const maxChars = Math.max(...this.ticks.map(t => this.tickTrim(this.tickFormat(t)).length));
        const charWidth = 7;
        return maxChars * charWidth;
    }
}
YAxisTicksComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-y-axis-ticks]',
                template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick" [attr.transform]="transform(tick)">
        <title>{{ tickFormat(tick) }}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'"
        >
          {{ tickTrim(tickFormat(tick)) }}
        </svg:text>
      </svg:g>
    </svg:g>

    <svg:path
      *ngIf="referenceLineLength > 1 && refMax && refMin && showRefLines"
      class="reference-area"
      [attr.d]="referenceAreaPath"
      [attr.transform]="gridLineTransform()"
    />
    <svg:g *ngFor="let tick of ticks" [attr.transform]="transform(tick)">
      <svg:g *ngIf="showGridLines" [attr.transform]="gridLineTransform()">
        <svg:line
          *ngIf="orient === Orientation.Left"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
        />
        <svg:line
          *ngIf="orient === Orientation.Right"
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="-gridLineWidth"
        />
      </svg:g>
    </svg:g>

    <svg:g *ngFor="let refLine of referenceLines">
      <svg:g *ngIf="showRefLines" [attr.transform]="transform(refLine.value)">
        <svg:line
          class="refline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth"
          [attr.transform]="gridLineTransform()"
        />
        <svg:g *ngIf="showRefLabels">
          <title>{{ tickTrim(tickFormat(refLine.value)) }}</title>
          <svg:text
            class="refline-label"
            [attr.dy]="dy"
            [attr.y]="-6"
            [attr.x]="gridLineWidth"
            [attr.text-anchor]="textAnchor"
          >
            {{ refLine.name }}
          </svg:text>
        </svg:g>
      </svg:g>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
YAxisTicksComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
YAxisTicksComponent.propDecorators = {
    scale: [{ type: Input }],
    orient: [{ type: Input }],
    tickArguments: [{ type: Input }],
    tickValues: [{ type: Input }],
    tickStroke: [{ type: Input }],
    trimTicks: [{ type: Input }],
    maxTickLength: [{ type: Input }],
    tickFormatting: [{ type: Input }],
    showGridLines: [{ type: Input }],
    gridLineWidth: [{ type: Input }],
    height: [{ type: Input }],
    referenceLines: [{ type: Input }],
    showRefLabels: [{ type: Input }],
    showRefLines: [{ type: Input }],
    dimensionsChanged: [{ type: Output }],
    ticksElement: [{ type: ViewChild, args: ['ticksel',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieS1heGlzLXRpY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vYXhlcy95LWF4aXMtdGlja3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFHTixTQUFTLEVBQ1QsWUFBWSxFQUVaLHVCQUF1QixFQUV2QixXQUFXLEVBQ1gsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFxRXZELE1BQU0sT0FBTyxtQkFBbUI7SUE0QzlCLFlBQXlDLFVBQWU7UUFBZixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBekMvQyxrQkFBYSxHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFOUIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUNwQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSS9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTdCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsa0JBQWEsR0FBVyxDQUFDLENBQUM7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Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThEVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OzRDQTZDYyxNQUFNLFNBQUMsV0FBVzs7O29CQTNDOUIsS0FBSztxQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUVMLE1BQU07MkJBMEJOLFNBQVMsU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkNoYW5nZXMsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaW1MYWJlbCB9IGZyb20gJy4uL3RyaW0tbGFiZWwuaGVscGVyJztcbmltcG9ydCB7IHJlZHVjZVRpY2tzIH0gZnJvbSAnLi90aWNrcy5oZWxwZXInO1xuaW1wb3J0IHsgcm91bmRlZFJlY3QgfSBmcm9tICcuLi8uLi9jb21tb24vc2hhcGUuaGVscGVyJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSAnLi4vdHlwZXMvb3JpZW50YXRpb24uZW51bSc7XG5pbXBvcnQgeyBUZXh0QW5jaG9yIH0gZnJvbSAnLi4vdHlwZXMvdGV4dC1hbmNob3IuZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy15LWF4aXMtdGlja3NdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmcgI3RpY2tzZWw+XG4gICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHRpY2sgb2YgdGlja3NcIiBjbGFzcz1cInRpY2tcIiBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtKHRpY2spXCI+XG4gICAgICAgIDx0aXRsZT57eyB0aWNrRm9ybWF0KHRpY2spIH19PC90aXRsZT5cbiAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMC4wMVwiXG4gICAgICAgICAgW2F0dHIuZHldPVwiZHlcIlxuICAgICAgICAgIFthdHRyLnhdPVwieDFcIlxuICAgICAgICAgIFthdHRyLnldPVwieTFcIlxuICAgICAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgICAgIFtzdHlsZS5mb250LXNpemVdPVwiJzEycHgnXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IHRpY2tUcmltKHRpY2tGb3JtYXQodGljaykpIH19XG4gICAgICAgIDwvc3ZnOnRleHQ+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvc3ZnOmc+XG5cbiAgICA8c3ZnOnBhdGhcbiAgICAgICpuZ0lmPVwicmVmZXJlbmNlTGluZUxlbmd0aCA+IDEgJiYgcmVmTWF4ICYmIHJlZk1pbiAmJiBzaG93UmVmTGluZXNcIlxuICAgICAgY2xhc3M9XCJyZWZlcmVuY2UtYXJlYVwiXG4gICAgICBbYXR0ci5kXT1cInJlZmVyZW5jZUFyZWFQYXRoXCJcbiAgICAgIFthdHRyLnRyYW5zZm9ybV09XCJncmlkTGluZVRyYW5zZm9ybSgpXCJcbiAgICAvPlxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm0odGljaylcIj5cbiAgICAgIDxzdmc6ZyAqbmdJZj1cInNob3dHcmlkTGluZXNcIiBbYXR0ci50cmFuc2Zvcm1dPVwiZ3JpZExpbmVUcmFuc2Zvcm0oKVwiPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICAqbmdJZj1cIm9yaWVudCA9PT0gT3JpZW50YXRpb24uTGVmdFwiXG4gICAgICAgICAgY2xhc3M9XCJncmlkbGluZS1wYXRoIGdyaWRsaW5lLXBhdGgtaG9yaXpvbnRhbFwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICBbYXR0ci54Ml09XCJncmlkTGluZVdpZHRoXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgKm5nSWY9XCJvcmllbnQgPT09IE9yaWVudGF0aW9uLlJpZ2h0XCJcbiAgICAgICAgICBjbGFzcz1cImdyaWRsaW5lLXBhdGggZ3JpZGxpbmUtcGF0aC1ob3Jpem9udGFsXCJcbiAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgIFthdHRyLngyXT1cIi1ncmlkTGluZVdpZHRoXCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgPC9zdmc6Zz5cblxuICAgIDxzdmc6ZyAqbmdGb3I9XCJsZXQgcmVmTGluZSBvZiByZWZlcmVuY2VMaW5lc1wiPlxuICAgICAgPHN2ZzpnICpuZ0lmPVwic2hvd1JlZkxpbmVzXCIgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybShyZWZMaW5lLnZhbHVlKVwiPlxuICAgICAgICA8c3ZnOmxpbmVcbiAgICAgICAgICBjbGFzcz1cInJlZmxpbmUtcGF0aCBncmlkbGluZS1wYXRoLWhvcml6b250YWxcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgW2F0dHIueDJdPVwiZ3JpZExpbmVXaWR0aFwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cImdyaWRMaW5lVHJhbnNmb3JtKClcIlxuICAgICAgICAvPlxuICAgICAgICA8c3ZnOmcgKm5nSWY9XCJzaG93UmVmTGFiZWxzXCI+XG4gICAgICAgICAgPHRpdGxlPnt7IHRpY2tUcmltKHRpY2tGb3JtYXQocmVmTGluZS52YWx1ZSkpIH19PC90aXRsZT5cbiAgICAgICAgICA8c3ZnOnRleHRcbiAgICAgICAgICAgIGNsYXNzPVwicmVmbGluZS1sYWJlbFwiXG4gICAgICAgICAgICBbYXR0ci5keV09XCJkeVwiXG4gICAgICAgICAgICBbYXR0ci55XT1cIi02XCJcbiAgICAgICAgICAgIFthdHRyLnhdPVwiZ3JpZExpbmVXaWR0aFwiXG4gICAgICAgICAgICBbYXR0ci50ZXh0LWFuY2hvcl09XCJ0ZXh0QW5jaG9yXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyByZWZMaW5lLm5hbWUgfX1cbiAgICAgICAgICA8L3N2Zzp0ZXh0PlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L3N2ZzpnPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBZQXhpc1RpY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgc2NhbGU7XG4gIEBJbnB1dCgpIG9yaWVudDogT3JpZW50YXRpb247XG4gIEBJbnB1dCgpIHRpY2tBcmd1bWVudHM6IG51bWJlcltdID0gWzVdO1xuICBASW5wdXQoKSB0aWNrVmFsdWVzOiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBASW5wdXQoKSB0aWNrU3Ryb2tlID0gJyNjY2MnO1xuICBASW5wdXQoKSB0cmltVGlja3M6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBtYXhUaWNrTGVuZ3RoOiBudW1iZXIgPSAxNjtcbiAgQElucHV0KCkgdGlja0Zvcm1hdHRpbmc7XG4gIEBJbnB1dCgpIHNob3dHcmlkTGluZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZ3JpZExpbmVXaWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgcmVmZXJlbmNlTGluZXM7XG4gIEBJbnB1dCgpIHNob3dSZWZMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1JlZkxpbmVzOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGlubmVyVGlja1NpemU6IG51bWJlciA9IDY7XG4gIHRpY2tQYWRkaW5nOiBudW1iZXIgPSAzO1xuICB0aWNrU3BhY2luZzogbnVtYmVyO1xuICB2ZXJ0aWNhbFNwYWNpbmc6IG51bWJlciA9IDIwO1xuICB0ZXh0QW5jaG9yOiBUZXh0QW5jaG9yID0gVGV4dEFuY2hvci5NaWRkbGU7XG4gIGR5OiBzdHJpbmc7XG4gIHgxOiBudW1iZXI7XG4gIHgyOiBudW1iZXI7XG4gIHkxOiBudW1iZXI7XG4gIHkyOiBudW1iZXI7XG4gIGFkanVzdGVkU2NhbGU6IGFueTtcbiAgdHJhbnNmb3JtOiAobzogYW55KSA9PiBzdHJpbmc7XG4gIHRpY2tGb3JtYXQ6IChvOiBhbnkpID0+IHN0cmluZztcbiAgdGlja3M6IGFueVtdO1xuICB3aWR0aDogbnVtYmVyID0gMDtcbiAgb3V0ZXJUaWNrU2l6ZTogbnVtYmVyID0gNjtcbiAgcm90YXRlTGFiZWxzOiBib29sZWFuID0gZmFsc2U7XG4gIHJlZk1heDogbnVtYmVyO1xuICByZWZNaW46IG51bWJlcjtcbiAgcmVmZXJlbmNlTGluZUxlbmd0aDogbnVtYmVyID0gMDtcbiAgcmVmZXJlbmNlQXJlYVBhdGg6IHN0cmluZztcblxuICByZWFkb25seSBPcmllbnRhdGlvbiA9IE9yaWVudGF0aW9uO1xuXG4gIEBWaWV3Q2hpbGQoJ3RpY2tzZWwnKSB0aWNrc0VsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gIH1cblxuICB1cGRhdGVEaW1zKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgLy8gZm9yIFNTUiwgdXNlIGFwcHJveGltYXRlIHZhbHVlIGluc3RlYWQgb2YgbWVhc3VyZWRcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmdldEFwcHJveGltYXRlQXhpc1dpZHRoKCk7XG4gICAgICB0aGlzLmRpbWVuc2lvbnNDaGFuZ2VkLmVtaXQoeyB3aWR0aDogdGhpcy53aWR0aCB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHRoaXMudGlja3NFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgsIDEwKTtcbiAgICBpZiAod2lkdGggIT09IHRoaXMud2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgIHRoaXMuZGltZW5zaW9uc0NoYW5nZWQuZW1pdCh7IHdpZHRoIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIGxldCBzY2FsZTtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnQgPT09IE9yaWVudGF0aW9uLlRvcCB8fCB0aGlzLm9yaWVudCA9PT0gT3JpZW50YXRpb24uUmlnaHQgPyAtMSA6IDE7XG4gICAgdGhpcy50aWNrU3BhY2luZyA9IE1hdGgubWF4KHRoaXMuaW5uZXJUaWNrU2l6ZSwgMCkgKyB0aGlzLnRpY2tQYWRkaW5nO1xuXG4gICAgc2NhbGUgPSB0aGlzLnNjYWxlO1xuICAgIHRoaXMudGlja3MgPSB0aGlzLmdldFRpY2tzKCk7XG5cbiAgICBpZiAodGhpcy50aWNrRm9ybWF0dGluZykge1xuICAgICAgdGhpcy50aWNrRm9ybWF0ID0gdGhpcy50aWNrRm9ybWF0dGluZztcbiAgICB9IGVsc2UgaWYgKHNjYWxlLnRpY2tGb3JtYXQpIHtcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IHNjYWxlLnRpY2tGb3JtYXQuYXBwbHkoc2NhbGUsIHRoaXMudGlja0FyZ3VtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGlja0Zvcm1hdCA9IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmIChkLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdEYXRlJykge1xuICAgICAgICAgIHJldHVybiBkLnRvTG9jYWxlRGF0ZVN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuYWRqdXN0ZWRTY2FsZSA9IHNjYWxlLmJhbmR3aWR0aFxuICAgICAgPyBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgIHJldHVybiBzY2FsZShkKSArIHNjYWxlLmJhbmR3aWR0aCgpICogMC41O1xuICAgICAgICB9XG4gICAgICA6IHNjYWxlO1xuXG4gICAgaWYgKHRoaXMuc2hvd1JlZkxpbmVzICYmIHRoaXMucmVmZXJlbmNlTGluZXMpIHtcbiAgICAgIHRoaXMuc2V0UmVmZXJlbmNlbGluZXMoKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRoaXMub3JpZW50KSB7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLlRvcDpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbiAodGljaykge1xuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnLDApJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gVGV4dEFuY2hvci5NaWRkbGU7XG4gICAgICAgIHRoaXMueTIgPSB0aGlzLmlubmVyVGlja1NpemUgKiBzaWduO1xuICAgICAgICB0aGlzLnkxID0gdGhpcy50aWNrU3BhY2luZyAqIHNpZ247XG4gICAgICAgIHRoaXMuZHkgPSBzaWduIDwgMCA/ICcwZW0nIDogJy43MWVtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLkJvdHRvbTpcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0gPSBmdW5jdGlvbiAodGljaykge1xuICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnLDApJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gVGV4dEFuY2hvci5NaWRkbGU7XG4gICAgICAgIHRoaXMueTIgPSB0aGlzLmlubmVyVGlja1NpemUgKiBzaWduO1xuICAgICAgICB0aGlzLnkxID0gdGhpcy50aWNrU3BhY2luZyAqIHNpZ247XG4gICAgICAgIHRoaXMuZHkgPSBzaWduIDwgMCA/ICcwZW0nIDogJy43MWVtJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE9yaWVudGF0aW9uLkxlZnQ6XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gZnVuY3Rpb24gKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9IFRleHRBbmNob3IuRW5kO1xuICAgICAgICB0aGlzLngyID0gdGhpcy5pbm5lclRpY2tTaXplICogLXNpZ247XG4gICAgICAgIHRoaXMueDEgPSB0aGlzLnRpY2tTcGFjaW5nICogLXNpZ247XG4gICAgICAgIHRoaXMuZHkgPSAnLjMyZW0nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgT3JpZW50YXRpb24uUmlnaHQ6XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gZnVuY3Rpb24gKHRpY2spIHtcbiAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyB0aGlzLmFkanVzdGVkU2NhbGUodGljaykgKyAnKSc7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGV4dEFuY2hvciA9IFRleHRBbmNob3IuU3RhcnQ7XG4gICAgICAgIHRoaXMueDIgPSB0aGlzLmlubmVyVGlja1NpemUgKiAtc2lnbjtcbiAgICAgICAgdGhpcy54MSA9IHRoaXMudGlja1NwYWNpbmcgKiAtc2lnbjtcbiAgICAgICAgdGhpcy5keSA9ICcuMzJlbSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZURpbXMoKSk7XG4gIH1cblxuICBzZXRSZWZlcmVuY2VsaW5lcygpOiB2b2lkIHtcbiAgICB0aGlzLnJlZk1pbiA9IHRoaXMuYWRqdXN0ZWRTY2FsZShcbiAgICAgIE1hdGgubWluLmFwcGx5KFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnJlZmVyZW5jZUxpbmVzLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpXG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnJlZk1heCA9IHRoaXMuYWRqdXN0ZWRTY2FsZShcbiAgICAgIE1hdGgubWF4LmFwcGx5KFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLnJlZmVyZW5jZUxpbmVzLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpXG4gICAgICApXG4gICAgKTtcbiAgICB0aGlzLnJlZmVyZW5jZUxpbmVMZW5ndGggPSB0aGlzLnJlZmVyZW5jZUxpbmVzLmxlbmd0aDtcblxuICAgIHRoaXMucmVmZXJlbmNlQXJlYVBhdGggPSByb3VuZGVkUmVjdCgwLCB0aGlzLnJlZk1heCwgdGhpcy5ncmlkTGluZVdpZHRoLCB0aGlzLnJlZk1pbiAtIHRoaXMucmVmTWF4LCAwLCBbXG4gICAgICBmYWxzZSxcbiAgICAgIGZhbHNlLFxuICAgICAgZmFsc2UsXG4gICAgICBmYWxzZVxuICAgIF0pO1xuICB9XG5cbiAgZ2V0VGlja3MoKTogYW55W10ge1xuICAgIGxldCB0aWNrcztcbiAgICBjb25zdCBtYXhUaWNrcyA9IHRoaXMuZ2V0TWF4VGlja3MoMjApO1xuICAgIGNvbnN0IG1heFNjYWxlVGlja3MgPSB0aGlzLmdldE1heFRpY2tzKDUwKTtcblxuICAgIGlmICh0aGlzLnRpY2tWYWx1ZXMpIHtcbiAgICAgIHRpY2tzID0gdGhpcy50aWNrVmFsdWVzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY2FsZS50aWNrcykge1xuICAgICAgdGlja3MgPSB0aGlzLnNjYWxlLnRpY2tzLmFwcGx5KHRoaXMuc2NhbGUsIFttYXhTY2FsZVRpY2tzXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpY2tzID0gdGhpcy5zY2FsZS5kb21haW4oKTtcbiAgICAgIHRpY2tzID0gcmVkdWNlVGlja3ModGlja3MsIG1heFRpY2tzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGlja3M7XG4gIH1cblxuICBnZXRNYXhUaWNrcyh0aWNrSGVpZ2h0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gdGlja0hlaWdodCk7XG4gIH1cblxuICB0aWNrVHJhbnNmb3JtKHRpY2s6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUoJHt0aGlzLmFkanVzdGVkU2NhbGUodGljayl9LCR7dGhpcy52ZXJ0aWNhbFNwYWNpbmd9KWA7XG4gIH1cblxuICBncmlkTGluZVRyYW5zZm9ybSgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgdHJhbnNsYXRlKDUsMClgO1xuICB9XG5cbiAgdGlja1RyaW0obGFiZWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudHJpbVRpY2tzID8gdHJpbUxhYmVsKGxhYmVsLCB0aGlzLm1heFRpY2tMZW5ndGgpIDogbGFiZWw7XG4gIH1cblxuICBnZXRBcHByb3hpbWF0ZUF4aXNXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IG1heENoYXJzID0gTWF0aC5tYXgoLi4udGhpcy50aWNrcy5tYXAodCA9PiB0aGlzLnRpY2tUcmltKHRoaXMudGlja0Zvcm1hdCh0KSkubGVuZ3RoKSk7XG4gICAgY29uc3QgY2hhcldpZHRoID0gNztcbiAgICByZXR1cm4gbWF4Q2hhcnMgKiBjaGFyV2lkdGg7XG4gIH1cbn1cbiJdfQ==