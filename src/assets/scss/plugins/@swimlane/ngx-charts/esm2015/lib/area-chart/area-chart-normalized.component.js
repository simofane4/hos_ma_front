import { Component, Input, Output, EventEmitter, HostListener, ViewEncapsulation, ChangeDetectionStrategy, ContentChild } from '@angular/core';
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { curveLinear } from 'd3-shape';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { id } from '../utils/id';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';
import { SeriesType } from '../common/circle-series.component';
import { LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
export class AreaChartNormalizedComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.legend = false;
        this.legendTitle = 'Legend';
        this.legendPosition = LegendPosition.Right;
        this.showXAxisLabel = false;
        this.showYAxisLabel = false;
        this.showGridLines = true;
        this.curve = curveLinear;
        this.activeEntries = [];
        this.trimXAxisTicks = true;
        this.trimYAxisTicks = true;
        this.rotateXAxisTicks = true;
        this.maxXAxisTickLength = 16;
        this.maxYAxisTickLength = 16;
        this.roundDomains = false;
        this.tooltipDisabled = false;
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.yDomain = [0, 100];
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.seriesType = SeriesType;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
        this.trackBy = (index, item) => {
            return item.name;
        };
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendType: this.schemeType,
            legendPosition: this.legendPosition
        });
        if (this.timeline) {
            this.dims.height -= this.timelineHeight + this.margin[2] + this.timelinePadding;
        }
        this.xDomain = this.getXDomain();
        if (this.filteredDomain) {
            this.xDomain = this.filteredDomain;
        }
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
        for (let i = 0; i < this.xSet.length; i++) {
            const val = this.xSet[i];
            let d0 = 0;
            let total = 0;
            for (const group of this.results) {
                const d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === ScaleType.Time) {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    total += d.value;
                }
            }
            for (const group of this.results) {
                let d = group.series.find(item => {
                    let a = item.name;
                    let b = val;
                    if (this.scaleType === ScaleType.Time) {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    d.d0 = d0;
                    d.d1 = d0 + d.value;
                    d0 += d.value;
                }
                else {
                    d = {
                        name: val,
                        value: 0,
                        d0,
                        d1: d0
                    };
                    group.series.push(d);
                }
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        }
        this.updateTimeline();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
        this.clipPathId = 'clip' + id().toString();
        this.clipPath = `url(#${this.clipPathId})`;
    }
    updateTimeline() {
        if (this.timeline) {
            this.timelineWidth = this.dims.width;
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = `translate(${this.dims.xOffset}, ${-this.margin[2]})`;
        }
    }
    getXDomain() {
        let values = getUniqueXDomainValues(this.results);
        this.scaleType = getScaleType(values);
        let domain = [];
        if (this.scaleType === ScaleType.Time) {
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [new Date(min), new Date(max)];
            this.xSet = [...values].sort((a, b) => {
                const aDate = a.getTime();
                const bDate = b.getTime();
                if (aDate > bDate)
                    return 1;
                if (bDate > aDate)
                    return -1;
                return 0;
            });
        }
        else if (this.scaleType === ScaleType.Linear) {
            values = values.map(v => Number(v));
            const min = Math.min(...values);
            const max = Math.max(...values);
            domain = [min, max];
            // Use compare function to sort numbers numerically
            this.xSet = [...values].sort((a, b) => a - b);
        }
        else {
            domain = values;
            this.xSet = values;
        }
        return domain;
    }
    getSeriesDomain() {
        return this.results.map(d => d.name);
    }
    getXScale(domain, width) {
        let scale;
        if (this.scaleType === ScaleType.Time) {
            scale = scaleTime();
        }
        else if (this.scaleType === ScaleType.Linear) {
            scale = scaleLinear();
        }
        else if (this.scaleType === ScaleType.Ordinal) {
            scale = scalePoint().padding(0.1);
        }
        scale.range([0, width]).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear().range([height, 0]).domain(domain);
        return this.roundDomains ? scale.nice() : scale;
    }
    updateDomain(domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    }
    updateHoveredVertical(item) {
        this.hoveredVertical = item.value;
        this.deactivateAll();
    }
    hideCircles() {
        this.hoveredVertical = null;
        this.deactivateAll();
    }
    onClick(data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    }
    setColors() {
        let domain;
        if (this.schemeType === ScaleType.Ordinal) {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    getLegendOptions() {
        const opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: [],
            title: undefined,
            position: this.legendPosition
        };
        if (opts.scaleType === ScaleType.Ordinal) {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
            opts.title = this.legendTitle;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onActivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item, ...this.activeEntries];
        this.activate.emit({ value: item, entries: this.activeEntries });
    }
    onDeactivate(item) {
        const idx = this.activeEntries.findIndex(d => {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = [...this.activeEntries];
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
    deactivateAll() {
        this.activeEntries = [...this.activeEntries];
        for (const entry of this.activeEntries) {
            this.deactivate.emit({ value: entry, entries: [] });
        }
        this.activeEntries = [];
    }
}
AreaChartNormalizedComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-area-chart-normalized',
                template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"
          />
        </svg:clipPath>
      </svg:defs>
      <svg:g [attr.transform]="transform" class="area-chart chart">
        <svg:g
          ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [trimTicks]="trimXAxisTicks"
          [rotateTicks]="rotateXAxisTicks"
          [maxTickLength]="maxXAxisTickLength"
          [tickFormatting]="xAxisTickFormatting"
          [ticks]="xAxisTicks"
          (dimensionsChanged)="updateXAxisHeight($event)"
        ></svg:g>
        <svg:g
          ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [trimTicks]="trimYAxisTicks"
          [maxTickLength]="maxYAxisTickLength"
          [tickFormatting]="yAxisTickFormatting"
          [ticks]="yAxisTicks"
          (dimensionsChanged)="updateYAxisWidth($event)"
        ></svg:g>
        <svg:g [attr.clip-path]="clipPath">
          <svg:g *ngFor="let series of results; trackBy: trackBy">
            <svg:g
              ngx-charts-area-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [scaleType]="scaleType"
              [activeEntries]="activeEntries"
              [gradient]="gradient"
              [normalized]="true"
              [curve]="curve"
              [animations]="animations"
            />
          </svg:g>

          <svg:g *ngIf="!tooltipDisabled" (mouseleave)="hideCircles()">
            <svg:g
              ngx-charts-tooltip-area
              [dims]="dims"
              [xSet]="xSet"
              [xScale]="xScale"
              [yScale]="yScale"
              [results]="results"
              [colors]="colors"
              [showPercentage]="true"
              [tooltipDisabled]="tooltipDisabled"
              [tooltipTemplate]="seriesTooltipTemplate"
              (hover)="updateHoveredVertical($event)"
            />

            <svg:g *ngFor="let series of results">
              <svg:g
                ngx-charts-circle-series
                [type]="seriesType.Stacked"
                [xScale]="xScale"
                [yScale]="yScale"
                [colors]="colors"
                [activeEntries]="activeEntries"
                [data]="series"
                [scaleType]="scaleType"
                [visibleValue]="hoveredVertical"
                [tooltipDisabled]="tooltipDisabled"
                [tooltipTemplate]="tooltipTemplate"
                (select)="onClick($event, series)"
                (activate)="onActivate($event)"
                (deactivate)="onDeactivate($event)"
              />
            </svg:g>
          </svg:g>
        </svg:g>
      </svg:g>
      <svg:g
        ngx-charts-timeline
        *ngIf="timeline && scaleType != 'ordinal'"
        [attr.transform]="timelineTransform"
        [results]="results"
        [view]="[timelineWidth, height]"
        [height]="timelineHeight"
        [scheme]="scheme"
        [customColors]="customColors"
        [legend]="legend"
        [scaleType]="scaleType"
        (onDomainChange)="updateDomain($event)"
      >
        <svg:g *ngFor="let series of results; trackBy: trackBy">
          <svg:g
            ngx-charts-area-series
            [xScale]="timelineXScale"
            [yScale]="timelineYScale"
            [colors]="colors"
            [data]="series"
            [scaleType]="scaleType"
            [gradient]="gradient"
            [normalized]="true"
            [curve]="curve"
            [animations]="animations"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:normal}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"]
            },] }
];
AreaChartNormalizedComponent.propDecorators = {
    legend: [{ type: Input }],
    legendTitle: [{ type: Input }],
    legendPosition: [{ type: Input }],
    xAxis: [{ type: Input }],
    yAxis: [{ type: Input }],
    showXAxisLabel: [{ type: Input }],
    showYAxisLabel: [{ type: Input }],
    xAxisLabel: [{ type: Input }],
    yAxisLabel: [{ type: Input }],
    timeline: [{ type: Input }],
    gradient: [{ type: Input }],
    showGridLines: [{ type: Input }],
    curve: [{ type: Input }],
    activeEntries: [{ type: Input }],
    schemeType: [{ type: Input }],
    trimXAxisTicks: [{ type: Input }],
    trimYAxisTicks: [{ type: Input }],
    rotateXAxisTicks: [{ type: Input }],
    maxXAxisTickLength: [{ type: Input }],
    maxYAxisTickLength: [{ type: Input }],
    xAxisTickFormatting: [{ type: Input }],
    yAxisTickFormatting: [{ type: Input }],
    xAxisTicks: [{ type: Input }],
    yAxisTicks: [{ type: Input }],
    roundDomains: [{ type: Input }],
    tooltipDisabled: [{ type: Input }],
    activate: [{ type: Output }],
    deactivate: [{ type: Output }],
    tooltipTemplate: [{ type: ContentChild, args: ['tooltipTemplate',] }],
    seriesTooltipTemplate: [{ type: ContentChild, args: ['seriesTooltipTemplate',] }],
    hideCircles: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1jaGFydC1ub3JtYWxpemVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9hcmVhLWNoYXJ0L2FyZWEtY2hhcnQtbm9ybWFsaXplZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixZQUFZLEVBR2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRS9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRCxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQThJNUQsTUFBTSxPQUFPLDRCQUE2QixTQUFRLGtCQUFrQjtJQTNJcEU7O1FBNElXLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixtQkFBYyxHQUFt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RUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBbGRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9JVDtnQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFFL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7cUJBRUUsS0FBSzswQkFDTCxLQUFLOzZCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7b0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLO2tDQUNMLEtBQUs7a0NBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFDTCxLQUFLO3VCQUVMLE1BQU07eUJBQ04sTUFBTTs4QkFFTixZQUFZLFNBQUMsaUJBQWlCO29DQUM5QixZQUFZLFNBQUMsdUJBQXVCOzBCQWdOcEMsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWYsXG4gIFRyYWNrQnlGdW5jdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNjYWxlTGluZWFyLCBzY2FsZVBvaW50LCBzY2FsZVRpbWUgfSBmcm9tICdkMy1zY2FsZSc7XG5pbXBvcnQgeyBjdXJ2ZUxpbmVhciB9IGZyb20gJ2QzLXNoYXBlJztcblxuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQmFzZUNoYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgZ2V0VW5pcXVlWERvbWFpblZhbHVlcywgZ2V0U2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL2RvbWFpbi5oZWxwZXInO1xuaW1wb3J0IHsgU2VyaWVzIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgU2VyaWVzVHlwZSB9IGZyb20gJy4uL2NvbW1vbi9jaXJjbGUtc2VyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMZWdlbmRPcHRpb25zLCBMZWdlbmRQb3NpdGlvbiB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9sZWdlbmQubW9kZWwnO1xuaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL3NjYWxlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92aWV3LWRpbWVuc2lvbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWFyZWEtY2hhcnQtbm9ybWFsaXplZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5neC1jaGFydHMtY2hhcnRcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxuICAgICAgW2xlZ2VuZE9wdGlvbnNdPVwibGVnZW5kT3B0aW9uc1wiXG4gICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgKGxlZ2VuZExhYmVsQ2xpY2spPVwib25DbGljaygkZXZlbnQpXCJcbiAgICAgIChsZWdlbmRMYWJlbEFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAobGVnZW5kTGFiZWxEZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8c3ZnOmRlZnM+XG4gICAgICAgIDxzdmc6Y2xpcFBhdGggW2F0dHIuaWRdPVwiY2xpcFBhdGhJZFwiPlxuICAgICAgICAgIDxzdmc6cmVjdFxuICAgICAgICAgICAgW2F0dHIud2lkdGhdPVwiZGltcy53aWR0aCArIDEwXCJcbiAgICAgICAgICAgIFthdHRyLmhlaWdodF09XCJkaW1zLmhlaWdodCArIDEwXCJcbiAgICAgICAgICAgIFthdHRyLnRyYW5zZm9ybV09XCIndHJhbnNsYXRlKC01LCAtNSknXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2ZzpjbGlwUGF0aD5cbiAgICAgIDwvc3ZnOmRlZnM+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiIGNsYXNzPVwiYXJlYS1jaGFydCBjaGFydFwiPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpc1xuICAgICAgICAgICpuZ0lmPVwieEF4aXNcIlxuICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcbiAgICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dYQXhpc0xhYmVsXCJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInhBeGlzTGFiZWxcIlxuICAgICAgICAgIFt0cmltVGlja3NdPVwidHJpbVhBeGlzVGlja3NcIlxuICAgICAgICAgIFtyb3RhdGVUaWNrc109XCJyb3RhdGVYQXhpc1RpY2tzXCJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhYQXhpc1RpY2tMZW5ndGhcIlxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ4QXhpc1RpY2tGb3JtYXR0aW5nXCJcbiAgICAgICAgICBbdGlja3NdPVwieEF4aXNUaWNrc1wiXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVhBeGlzSGVpZ2h0KCRldmVudClcIlxuICAgICAgICA+PC9zdmc6Zz5cbiAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcbiAgICAgICAgICAqbmdJZj1cInlBeGlzXCJcbiAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXG4gICAgICAgICAgW2RpbXNdPVwiZGltc1wiXG4gICAgICAgICAgW3Nob3dHcmlkTGluZXNdPVwic2hvd0dyaWRMaW5lc1wiXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WUF4aXNMYWJlbFwiXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ5QXhpc0xhYmVsXCJcbiAgICAgICAgICBbdHJpbVRpY2tzXT1cInRyaW1ZQXhpc1RpY2tzXCJcbiAgICAgICAgICBbbWF4VGlja0xlbmd0aF09XCJtYXhZQXhpc1RpY2tMZW5ndGhcIlxuICAgICAgICAgIFt0aWNrRm9ybWF0dGluZ109XCJ5QXhpc1RpY2tGb3JtYXR0aW5nXCJcbiAgICAgICAgICBbdGlja3NdPVwieUF4aXNUaWNrc1wiXG4gICAgICAgICAgKGRpbWVuc2lvbnNDaGFuZ2VkKT1cInVwZGF0ZVlBeGlzV2lkdGgoJGV2ZW50KVwiXG4gICAgICAgID48L3N2ZzpnPlxuICAgICAgICA8c3ZnOmcgW2F0dHIuY2xpcC1wYXRoXT1cImNsaXBQYXRoXCI+XG4gICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0czsgdHJhY2tCeTogdHJhY2tCeVwiPlxuICAgICAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgICAgIG5neC1jaGFydHMtYXJlYS1zZXJpZXNcbiAgICAgICAgICAgICAgW3hTY2FsZV09XCJ4U2NhbGVcIlxuICAgICAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXG4gICAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcbiAgICAgICAgICAgICAgW2RhdGFdPVwic2VyaWVzXCJcbiAgICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICAgICAgICBbYWN0aXZlRW50cmllc109XCJhY3RpdmVFbnRyaWVzXCJcbiAgICAgICAgICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgICAgICAgICAgW25vcm1hbGl6ZWRdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFtjdXJ2ZV09XCJjdXJ2ZVwiXG4gICAgICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3N2ZzpnPlxuXG4gICAgICAgICAgPHN2ZzpnICpuZ0lmPVwiIXRvb2x0aXBEaXNhYmxlZFwiIChtb3VzZWxlYXZlKT1cImhpZGVDaXJjbGVzKClcIj5cbiAgICAgICAgICAgIDxzdmc6Z1xuICAgICAgICAgICAgICBuZ3gtY2hhcnRzLXRvb2x0aXAtYXJlYVxuICAgICAgICAgICAgICBbZGltc109XCJkaW1zXCJcbiAgICAgICAgICAgICAgW3hTZXRdPVwieFNldFwiXG4gICAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcbiAgICAgICAgICAgICAgW3lTY2FsZV09XCJ5U2NhbGVcIlxuICAgICAgICAgICAgICBbcmVzdWx0c109XCJyZXN1bHRzXCJcbiAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxuICAgICAgICAgICAgICBbc2hvd1BlcmNlbnRhZ2VdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwRGlzYWJsZWRdPVwidG9vbHRpcERpc2FibGVkXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJzZXJpZXNUb29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAoaG92ZXIpPVwidXBkYXRlSG92ZXJlZFZlcnRpY2FsKCRldmVudClcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPHN2ZzpnICpuZ0Zvcj1cImxldCBzZXJpZXMgb2YgcmVzdWx0c1wiPlxuICAgICAgICAgICAgICA8c3ZnOmdcbiAgICAgICAgICAgICAgICBuZ3gtY2hhcnRzLWNpcmNsZS1zZXJpZXNcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJzZXJpZXNUeXBlLlN0YWNrZWRcIlxuICAgICAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcbiAgICAgICAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXG4gICAgICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxuICAgICAgICAgICAgICAgIFthY3RpdmVFbnRyaWVzXT1cImFjdGl2ZUVudHJpZXNcIlxuICAgICAgICAgICAgICAgIFtkYXRhXT1cInNlcmllc1wiXG4gICAgICAgICAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICAgICAgICAgIFt2aXNpYmxlVmFsdWVdPVwiaG92ZXJlZFZlcnRpY2FsXCJcbiAgICAgICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgW3Rvb2x0aXBUZW1wbGF0ZV09XCJ0b29sdGlwVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIChzZWxlY3QpPVwib25DbGljaygkZXZlbnQsIHNlcmllcylcIlxuICAgICAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cIm9uRGVhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvc3ZnOmc+XG4gICAgICAgICAgPC9zdmc6Zz5cbiAgICAgICAgPC9zdmc6Zz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy10aW1lbGluZVxuICAgICAgICAqbmdJZj1cInRpbWVsaW5lICYmIHNjYWxlVHlwZSAhPSAnb3JkaW5hbCdcIlxuICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidGltZWxpbmVUcmFuc2Zvcm1cIlxuICAgICAgICBbcmVzdWx0c109XCJyZXN1bHRzXCJcbiAgICAgICAgW3ZpZXddPVwiW3RpbWVsaW5lV2lkdGgsIGhlaWdodF1cIlxuICAgICAgICBbaGVpZ2h0XT1cInRpbWVsaW5lSGVpZ2h0XCJcbiAgICAgICAgW3NjaGVtZV09XCJzY2hlbWVcIlxuICAgICAgICBbY3VzdG9tQ29sb3JzXT1cImN1c3RvbUNvbG9yc1wiXG4gICAgICAgIFtsZWdlbmRdPVwibGVnZW5kXCJcbiAgICAgICAgW3NjYWxlVHlwZV09XCJzY2FsZVR5cGVcIlxuICAgICAgICAob25Eb21haW5DaGFuZ2UpPVwidXBkYXRlRG9tYWluKCRldmVudClcIlxuICAgICAgPlxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHNlcmllcyBvZiByZXN1bHRzOyB0cmFja0J5OiB0cmFja0J5XCI+XG4gICAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLWFyZWEtc2VyaWVzXG4gICAgICAgICAgICBbeFNjYWxlXT1cInRpbWVsaW5lWFNjYWxlXCJcbiAgICAgICAgICAgIFt5U2NhbGVdPVwidGltZWxpbmVZU2NhbGVcIlxuICAgICAgICAgICAgW2NvbG9yc109XCJjb2xvcnNcIlxuICAgICAgICAgICAgW2RhdGFdPVwic2VyaWVzXCJcbiAgICAgICAgICAgIFtzY2FsZVR5cGVdPVwic2NhbGVUeXBlXCJcbiAgICAgICAgICAgIFtncmFkaWVudF09XCJncmFkaWVudFwiXG4gICAgICAgICAgICBbbm9ybWFsaXplZF09XCJ0cnVlXCJcbiAgICAgICAgICAgIFtjdXJ2ZV09XCJjdXJ2ZVwiXG4gICAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnLi4vY29tbW9uL2Jhc2UtY2hhcnQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBBcmVhQ2hhcnROb3JtYWxpemVkQ29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbGVnZW5kID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IExlZ2VuZFBvc2l0aW9uID0gTGVnZW5kUG9zaXRpb24uUmlnaHQ7XG4gIEBJbnB1dCgpIHhBeGlzOiBib29sZWFuO1xuICBASW5wdXQoKSB5QXhpczogYm9vbGVhbjtcbiAgQElucHV0KCkgc2hvd1hBeGlzTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1lBeGlzTGFiZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgeEF4aXNMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSB5QXhpc0xhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpbWVsaW5lO1xuICBASW5wdXQoKSBncmFkaWVudDtcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1cnZlOiBhbnkgPSBjdXJ2ZUxpbmVhcjtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllczogYW55W10gPSBbXTtcbiAgQElucHV0KCkgc2NoZW1lVHlwZTogU2NhbGVUeXBlO1xuICBASW5wdXQoKSB0cmltWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHRyaW1ZQXhpc1RpY2tzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcm90YXRlWEF4aXNUaWNrczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIG1heFhBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XG4gIEBJbnB1dCgpIG1heFlBeGlzVGlja0xlbmd0aDogbnVtYmVyID0gMTY7XG4gIEBJbnB1dCgpIHhBeGlzVGlja0Zvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgeUF4aXNUaWNrRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSB4QXhpc1RpY2tzOiBhbnlbXTtcbiAgQElucHV0KCkgeUF4aXNUaWNrczogYW55W107XG4gIEBJbnB1dCgpIHJvdW5kRG9tYWluczogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQENvbnRlbnRDaGlsZCgndG9vbHRpcFRlbXBsYXRlJykgdG9vbHRpcFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCdzZXJpZXNUb29sdGlwVGVtcGxhdGUnKSBzZXJpZXNUb29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgZGltczogVmlld0RpbWVuc2lvbnM7XG4gIHNjYWxlVHlwZTogU2NhbGVUeXBlO1xuICB4RG9tYWluOiBhbnlbXTtcbiAgeFNldDogYW55W107IC8vIHRoZSBzZXQgb2YgYWxsIHZhbHVlcyBvbiB0aGUgWCBBeGlzXG4gIHlEb21haW46IFtudW1iZXIsIG51bWJlcl0gPSBbMCwgMTAwXTtcbiAgc2VyaWVzRG9tYWluOiBhbnk7XG4gIHhTY2FsZTogYW55O1xuICB5U2NhbGU6IGFueTtcbiAgdHJhbnNmb3JtOiBzdHJpbmc7XG4gIGNsaXBQYXRoSWQ6IHN0cmluZztcbiAgY2xpcFBhdGg6IHN0cmluZztcbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgbWFyZ2luOiBudW1iZXJbXSA9IFsxMCwgMjAsIDEwLCAyMF07XG4gIHRvb2x0aXBBcmVhczogYW55W107XG4gIGhvdmVyZWRWZXJ0aWNhbDogYW55OyAvLyB0aGUgdmFsdWUgb2YgdGhlIHggYXhpcyB0aGF0IGlzIGhvdmVyZWQgb3ZlclxuICB4QXhpc0hlaWdodDogbnVtYmVyID0gMDtcbiAgeUF4aXNXaWR0aDogbnVtYmVyID0gMDtcbiAgZmlsdGVyZWREb21haW46IGFueTtcbiAgbGVnZW5kT3B0aW9uczogTGVnZW5kT3B0aW9ucztcblxuICBzZXJpZXNUeXBlID0gU2VyaWVzVHlwZTtcblxuICB0aW1lbGluZVdpZHRoOiBhbnk7XG4gIHRpbWVsaW5lSGVpZ2h0OiBudW1iZXIgPSA1MDtcbiAgdGltZWxpbmVYU2NhbGU6IGFueTtcbiAgdGltZWxpbmVZU2NhbGU6IGFueTtcbiAgdGltZWxpbmVYRG9tYWluOiBhbnk7XG4gIHRpbWVsaW5lVHJhbnNmb3JtOiBhbnk7XG4gIHRpbWVsaW5lUGFkZGluZzogbnVtYmVyID0gMTA7XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy5kaW1zID0gY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMoe1xuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgbWFyZ2luczogdGhpcy5tYXJnaW4sXG4gICAgICBzaG93WEF4aXM6IHRoaXMueEF4aXMsXG4gICAgICBzaG93WUF4aXM6IHRoaXMueUF4aXMsXG4gICAgICB4QXhpc0hlaWdodDogdGhpcy54QXhpc0hlaWdodCxcbiAgICAgIHlBeGlzV2lkdGg6IHRoaXMueUF4aXNXaWR0aCxcbiAgICAgIHNob3dYTGFiZWw6IHRoaXMuc2hvd1hBeGlzTGFiZWwsXG4gICAgICBzaG93WUxhYmVsOiB0aGlzLnNob3dZQXhpc0xhYmVsLFxuICAgICAgc2hvd0xlZ2VuZDogdGhpcy5sZWdlbmQsXG4gICAgICBsZWdlbmRUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXG4gICAgICBsZWdlbmRQb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMudGltZWxpbmUpIHtcbiAgICAgIHRoaXMuZGltcy5oZWlnaHQgLT0gdGhpcy50aW1lbGluZUhlaWdodCArIHRoaXMubWFyZ2luWzJdICsgdGhpcy50aW1lbGluZVBhZGRpbmc7XG4gICAgfVxuXG4gICAgdGhpcy54RG9tYWluID0gdGhpcy5nZXRYRG9tYWluKCk7XG4gICAgaWYgKHRoaXMuZmlsdGVyZWREb21haW4pIHtcbiAgICAgIHRoaXMueERvbWFpbiA9IHRoaXMuZmlsdGVyZWREb21haW47XG4gICAgfVxuXG4gICAgdGhpcy5zZXJpZXNEb21haW4gPSB0aGlzLmdldFNlcmllc0RvbWFpbigpO1xuXG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnhEb21haW4sIHRoaXMuZGltcy53aWR0aCk7XG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSh0aGlzLnlEb21haW4sIHRoaXMuZGltcy5oZWlnaHQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnhTZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMueFNldFtpXTtcbiAgICAgIGxldCBkMCA9IDA7XG5cbiAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgICBjb25zdCBkID0gZ3JvdXAuc2VyaWVzLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgbGV0IGEgPSBpdGVtLm5hbWU7XG4gICAgICAgICAgbGV0IGIgPSB2YWw7XG4gICAgICAgICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSkge1xuICAgICAgICAgICAgYSA9IGEudmFsdWVPZigpO1xuICAgICAgICAgICAgYiA9IGIudmFsdWVPZigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgdG90YWwgKz0gZC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgICBsZXQgZCA9IGdyb3VwLnNlcmllcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgIGxldCBhID0gaXRlbS5uYW1lO1xuICAgICAgICAgIGxldCBiID0gdmFsO1xuICAgICAgICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLlRpbWUpIHtcbiAgICAgICAgICAgIGEgPSBhLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIGIgPSBiLnZhbHVlT2YoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgZC5kMCA9IGQwO1xuICAgICAgICAgIGQuZDEgPSBkMCArIGQudmFsdWU7XG4gICAgICAgICAgZDAgKz0gZC52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkID0ge1xuICAgICAgICAgICAgbmFtZTogdmFsLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgICBkMCxcbiAgICAgICAgICAgIGQxOiBkMFxuICAgICAgICAgIH07XG4gICAgICAgICAgZ3JvdXAuc2VyaWVzLnB1c2goZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG90YWwgPiAwKSB7XG4gICAgICAgICAgZC5kMCA9IChkLmQwICogMTAwKSAvIHRvdGFsO1xuICAgICAgICAgIGQuZDEgPSAoZC5kMSAqIDEwMCkgLyB0b3RhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkLmQwID0gMDtcbiAgICAgICAgICBkLmQxID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlVGltZWxpbmUoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XG5cbiAgICB0aGlzLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHt0aGlzLmRpbXMueE9mZnNldH0gLCAke3RoaXMubWFyZ2luWzBdfSlgO1xuXG4gICAgdGhpcy5jbGlwUGF0aElkID0gJ2NsaXAnICsgaWQoKS50b1N0cmluZygpO1xuICAgIHRoaXMuY2xpcFBhdGggPSBgdXJsKCMke3RoaXMuY2xpcFBhdGhJZH0pYDtcbiAgfVxuXG4gIHVwZGF0ZVRpbWVsaW5lKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVsaW5lKSB7XG4gICAgICB0aGlzLnRpbWVsaW5lV2lkdGggPSB0aGlzLmRpbXMud2lkdGg7XG4gICAgICB0aGlzLnRpbWVsaW5lWERvbWFpbiA9IHRoaXMuZ2V0WERvbWFpbigpO1xuICAgICAgdGhpcy50aW1lbGluZVhTY2FsZSA9IHRoaXMuZ2V0WFNjYWxlKHRoaXMudGltZWxpbmVYRG9tYWluLCB0aGlzLnRpbWVsaW5lV2lkdGgpO1xuICAgICAgdGhpcy50aW1lbGluZVlTY2FsZSA9IHRoaXMuZ2V0WVNjYWxlKHRoaXMueURvbWFpbiwgdGhpcy50aW1lbGluZUhlaWdodCk7XG4gICAgICB0aGlzLnRpbWVsaW5lVHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMuZGltcy54T2Zmc2V0fSwgJHstdGhpcy5tYXJnaW5bMl19KWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0WERvbWFpbigpOiBhbnlbXSB7XG4gICAgbGV0IHZhbHVlcyA9IGdldFVuaXF1ZVhEb21haW5WYWx1ZXModGhpcy5yZXN1bHRzKTtcblxuICAgIHRoaXMuc2NhbGVUeXBlID0gZ2V0U2NhbGVUeXBlKHZhbHVlcyk7XG4gICAgbGV0IGRvbWFpbiA9IFtdO1xuXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSkge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4udmFsdWVzKTtcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XG4gICAgICBkb21haW4gPSBbbmV3IERhdGUobWluKSwgbmV3IERhdGUobWF4KV07XG4gICAgICB0aGlzLnhTZXQgPSBbLi4udmFsdWVzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IGFEYXRlID0gYS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IGJEYXRlID0gYi5nZXRUaW1lKCk7XG4gICAgICAgIGlmIChhRGF0ZSA+IGJEYXRlKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGJEYXRlID4gYURhdGUpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLnZhbHVlcyk7XG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgICAgIC8vIFVzZSBjb21wYXJlIGZ1bmN0aW9uIHRvIHNvcnQgbnVtYmVycyBudW1lcmljYWxseVxuICAgICAgdGhpcy54U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21haW4gPSB2YWx1ZXM7XG4gICAgICB0aGlzLnhTZXQgPSB2YWx1ZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvbWFpbjtcbiAgfVxuXG4gIGdldFNlcmllc0RvbWFpbigpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0cy5tYXAoZCA9PiBkLm5hbWUpO1xuICB9XG5cbiAgZ2V0WFNjYWxlKGRvbWFpbiwgd2lkdGg6IG51bWJlcik6IGFueSB7XG4gICAgbGV0IHNjYWxlO1xuXG4gICAgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSkge1xuICAgICAgc2NhbGUgPSBzY2FsZVRpbWUoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICBzY2FsZSA9IHNjYWxlTGluZWFyKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLk9yZGluYWwpIHtcbiAgICAgIHNjYWxlID0gc2NhbGVQb2ludCgpLnBhZGRpbmcoMC4xKTtcbiAgICB9XG5cbiAgICBzY2FsZS5yYW5nZShbMCwgd2lkdGhdKS5kb21haW4oZG9tYWluKTtcblxuICAgIHJldHVybiB0aGlzLnJvdW5kRG9tYWlucyA/IHNjYWxlLm5pY2UoKSA6IHNjYWxlO1xuICB9XG5cbiAgZ2V0WVNjYWxlKGRvbWFpbiwgaGVpZ2h0OiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IHNjYWxlID0gc2NhbGVMaW5lYXIoKS5yYW5nZShbaGVpZ2h0LCAwXSkuZG9tYWluKGRvbWFpbik7XG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XG4gIH1cblxuICB1cGRhdGVEb21haW4oZG9tYWluKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXJlZERvbWFpbiA9IGRvbWFpbjtcbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmZpbHRlcmVkRG9tYWluO1xuICAgIHRoaXMueFNjYWxlID0gdGhpcy5nZXRYU2NhbGUodGhpcy54RG9tYWluLCB0aGlzLmRpbXMud2lkdGgpO1xuICB9XG5cbiAgdXBkYXRlSG92ZXJlZFZlcnRpY2FsKGl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmhvdmVyZWRWZXJ0aWNhbCA9IGl0ZW0udmFsdWU7XG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgaGlkZUNpcmNsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5ob3ZlcmVkVmVydGljYWwgPSBudWxsO1xuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbCgpO1xuICB9XG5cbiAgb25DbGljayhkYXRhLCBzZXJpZXM/KTogdm9pZCB7XG4gICAgaWYgKHNlcmllcykge1xuICAgICAgZGF0YS5zZXJpZXMgPSBzZXJpZXMubmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KGRhdGEpO1xuICB9XG5cbiAgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFNlcmllcz4gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogU2VyaWVzKSA9PiB7XG4gICAgcmV0dXJuIGl0ZW0ubmFtZTtcbiAgfTtcblxuICBzZXRDb2xvcnMoKTogdm9pZCB7XG4gICAgbGV0IGRvbWFpbjtcbiAgICBpZiAodGhpcy5zY2hlbWVUeXBlID09PSBTY2FsZVR5cGUuT3JkaW5hbCkge1xuICAgICAgZG9tYWluID0gdGhpcy5zZXJpZXNEb21haW47XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbWFpbiA9IHRoaXMueURvbWFpbjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9ycyA9IG5ldyBDb2xvckhlbHBlcih0aGlzLnNjaGVtZSwgdGhpcy5zY2hlbWVUeXBlLCBkb21haW4sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxuXG4gIGdldExlZ2VuZE9wdGlvbnMoKTogTGVnZW5kT3B0aW9ucyB7XG4gICAgY29uc3Qgb3B0czogTGVnZW5kT3B0aW9ucyA9IHtcbiAgICAgIHNjYWxlVHlwZTogdGhpcy5zY2hlbWVUeXBlIGFzIGFueSxcbiAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxuICAgICAgZG9tYWluOiBbXSxcbiAgICAgIHRpdGxlOiB1bmRlZmluZWQsXG4gICAgICBwb3NpdGlvbjogdGhpcy5sZWdlbmRQb3NpdGlvblxuICAgIH07XG4gICAgaWYgKG9wdHMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuT3JkaW5hbCkge1xuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnNlcmllc0RvbWFpbjtcbiAgICAgIG9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICBvcHRzLnRpdGxlID0gdGhpcy5sZWdlbmRUaXRsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5kb21haW4gPSB0aGlzLnlEb21haW47XG4gICAgICBvcHRzLmNvbG9ycyA9IHRoaXMuY29sb3JzLnNjYWxlO1xuICAgIH1cbiAgICByZXR1cm4gb3B0cztcbiAgfVxuXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9OiB7IHdpZHRoOiBudW1iZXIgfSk6IHZvaWQge1xuICAgIHRoaXMueUF4aXNXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGVYQXhpc0hlaWdodCh7IGhlaWdodCB9OiB7IGhlaWdodDogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBvbkFjdGl2YXRlKGl0ZW0pOiB2b2lkIHtcbiAgICBjb25zdCBpZHggPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZEluZGV4KGQgPT4ge1xuICAgICAgcmV0dXJuIGQubmFtZSA9PT0gaXRlbS5uYW1lICYmIGQudmFsdWUgPT09IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzID0gW2l0ZW0sIC4uLnRoaXMuYWN0aXZlRW50cmllc107XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHsgdmFsdWU6IGl0ZW0sIGVudHJpZXM6IHRoaXMuYWN0aXZlRW50cmllcyB9KTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShpdGVtKTogdm9pZCB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmRJbmRleChkID0+IHtcbiAgICAgIHJldHVybiBkLm5hbWUgPT09IGl0ZW0ubmFtZSAmJiBkLnZhbHVlID09PSBpdGVtLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVFbnRyaWVzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMuYWN0aXZlRW50cmllcyA9IFsuLi50aGlzLmFjdGl2ZUVudHJpZXNdO1xuXG4gICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogaXRlbSwgZW50cmllczogdGhpcy5hY3RpdmVFbnRyaWVzIH0pO1xuICB9XG5cbiAgZGVhY3RpdmF0ZUFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbLi4udGhpcy5hY3RpdmVFbnRyaWVzXTtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIHRoaXMuYWN0aXZlRW50cmllcykge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlLmVtaXQoeyB2YWx1ZTogZW50cnksIGVudHJpZXM6IFtdIH0pO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZUVudHJpZXMgPSBbXTtcbiAgfVxufVxuIl19