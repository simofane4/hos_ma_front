import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { area } from 'd3-shape';
import { ScaleType } from '../common/types/scale-type.enum';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
export class AreaSeriesComponent {
    constructor() {
        this.baseValue = 'auto';
        this.stacked = false;
        this.normalized = false;
        this.animations = true;
        this.select = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.updateGradient();
        let currentArea;
        let startingArea;
        const xProperty = d => {
            const label = d.name;
            return this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            currentArea = area()
                .x(xProperty)
                .y0((d, i) => this.yScale(d.d0))
                .y1((d, i) => this.yScale(d.d1));
            startingArea = area()
                .x(xProperty)
                .y0(d => this.yScale.range()[0])
                .y1(d => this.yScale.range()[0]);
        }
        else {
            currentArea = area()
                .x(xProperty)
                .y0(() => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => this.yScale(d.value));
            startingArea = area()
                .x(xProperty)
                .y0(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)))
                .y1(d => (this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue)));
        }
        currentArea.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = 0.8;
        let data = this.data.series;
        if (this.scaleType === ScaleType.Linear) {
            data = sortLinear(data, 'name');
        }
        else if (this.scaleType === ScaleType.Time) {
            data = sortByTime(data, 'name');
        }
        else {
            data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = currentArea(data);
        this.startingPath = startingArea(data);
    }
    updateGradient() {
        if (this.colors.scaleType === ScaleType.Linear) {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                const d0values = this.data.series.map(d => d.d0);
                const d1values = this.data.series.map(d => d.d1);
                const max = Math.max(...d1values);
                const min = Math.min(...d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                const values = this.data.series.map(d => d.value);
                const max = Math.max(...values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item !== undefined;
    }
    isInactive(entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.name === d.name;
        });
        return item === undefined;
    }
}
AreaSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-area-series]',
                template: `
    <svg:g
      ngx-charts-area
      class="area-series"
      [data]="data"
      [path]="path"
      [fill]="colors.getColor(data.name)"
      [stops]="gradientStops"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient || hasGradient"
      [animations]="animations"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
AreaSeriesComponent.propDecorators = {
    data: [{ type: Input }],
    xScale: [{ type: Input }],
    yScale: [{ type: Input }],
    baseValue: [{ type: Input }],
    colors: [{ type: Input }],
    scaleType: [{ type: Input }],
    stacked: [{ type: Input }],
    normalized: [{ type: Input }],
    gradient: [{ type: Input }],
    curve: [{ type: Input }],
    activeEntries: [{ type: Input }],
    animations: [{ type: Input }],
    select: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS1zZXJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2FyZWEtY2hhcnQvYXJlYS1zZXJpZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBR1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHaEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTVELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCckUsTUFBTSxPQUFPLG1CQUFtQjtJQXBCaEM7UUF3QlcsY0FBUyxHQUFRLE1BQU0sQ0FBQztRQUd4QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFJNUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQW1HeEMsQ0FBQztJQTFGQyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksWUFBWSxDQUFDO1FBRWpCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQztRQUVGLElBQUksSUFB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QUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSztxQkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhcmVhIH0gZnJvbSAnZDMtc2hhcGUnO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY29sb3IuaGVscGVyJztcbmltcG9ydCB7IEdyYWRpZW50IH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2dyYWRpZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBTY2FsZVR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvc2NhbGUtdHlwZS5lbnVtJztcbmltcG9ydCB7IEFyZWFDaGFydFNlcmllcyB9IGZyb20gJy4uL21vZGVscy9jaGFydC1kYXRhLm1vZGVsJztcbmltcG9ydCB7IHNvcnRMaW5lYXIsIHNvcnRCeVRpbWUsIHNvcnRCeURvbWFpbiB9IGZyb20gJy4uL3V0aWxzL3NvcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYXJlYS1zZXJpZXNdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3ZnOmdcbiAgICAgIG5neC1jaGFydHMtYXJlYVxuICAgICAgY2xhc3M9XCJhcmVhLXNlcmllc1wiXG4gICAgICBbZGF0YV09XCJkYXRhXCJcbiAgICAgIFtwYXRoXT1cInBhdGhcIlxuICAgICAgW2ZpbGxdPVwiY29sb3JzLmdldENvbG9yKGRhdGEubmFtZSlcIlxuICAgICAgW3N0b3BzXT1cImdyYWRpZW50U3RvcHNcIlxuICAgICAgW3N0YXJ0aW5nUGF0aF09XCJzdGFydGluZ1BhdGhcIlxuICAgICAgW29wYWNpdHldPVwib3BhY2l0eVwiXG4gICAgICBbZ3JhZGllbnRdPVwiZ3JhZGllbnQgfHwgaGFzR3JhZGllbnRcIlxuICAgICAgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiXG4gICAgICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlKGRhdGEpXCJcbiAgICAgIFtjbGFzcy5pbmFjdGl2ZV09XCJpc0luYWN0aXZlKGRhdGEpXCJcbiAgICAvPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBcmVhU2VyaWVzQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQXJlYUNoYXJ0U2VyaWVzO1xuICBASW5wdXQoKSB4U2NhbGU6IGFueTtcbiAgQElucHV0KCkgeVNjYWxlOiBhbnk7XG4gIEBJbnB1dCgpIGJhc2VWYWx1ZTogYW55ID0gJ2F1dG8nO1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBzY2FsZVR5cGU6IFNjYWxlVHlwZTtcbiAgQElucHV0KCkgc3RhY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBub3JtYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyYWRpZW50OiBib29sZWFuO1xuICBASW5wdXQoKSBjdXJ2ZTogYW55O1xuICBASW5wdXQoKSBhY3RpdmVFbnRyaWVzOiBhbnlbXTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBvcGFjaXR5OiBudW1iZXI7XG4gIHBhdGg6IHN0cmluZztcbiAgc3RhcnRpbmdQYXRoOiBzdHJpbmc7XG5cbiAgaGFzR3JhZGllbnQ6IGJvb2xlYW47XG4gIGdyYWRpZW50U3RvcHM6IEdyYWRpZW50W107XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVHcmFkaWVudCgpO1xuXG4gICAgbGV0IGN1cnJlbnRBcmVhO1xuICAgIGxldCBzdGFydGluZ0FyZWE7XG5cbiAgICBjb25zdCB4UHJvcGVydHkgPSBkID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gZC5uYW1lO1xuICAgICAgcmV0dXJuIHRoaXMueFNjYWxlKGxhYmVsKTtcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuc3RhY2tlZCB8fCB0aGlzLm5vcm1hbGl6ZWQpIHtcbiAgICAgIGN1cnJlbnRBcmVhID0gYXJlYTxhbnk+KClcbiAgICAgICAgLngoeFByb3BlcnR5KVxuICAgICAgICAueTAoKGQsIGkpID0+IHRoaXMueVNjYWxlKGQuZDApKVxuICAgICAgICAueTEoKGQsIGkpID0+IHRoaXMueVNjYWxlKGQuZDEpKTtcblxuICAgICAgc3RhcnRpbmdBcmVhID0gYXJlYTxhbnk+KClcbiAgICAgICAgLngoeFByb3BlcnR5KVxuICAgICAgICAueTAoZCA9PiB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdKVxuICAgICAgICAueTEoZCA9PiB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudEFyZWEgPSBhcmVhPGFueT4oKVxuICAgICAgICAueCh4UHJvcGVydHkpXG4gICAgICAgIC55MCgoKSA9PiAodGhpcy5iYXNlVmFsdWUgPT09ICdhdXRvJyA/IHRoaXMueVNjYWxlLnJhbmdlKClbMF0gOiB0aGlzLnlTY2FsZSh0aGlzLmJhc2VWYWx1ZSkpKVxuICAgICAgICAueTEoZCA9PiB0aGlzLnlTY2FsZShkLnZhbHVlKSk7XG5cbiAgICAgIHN0YXJ0aW5nQXJlYSA9IGFyZWE8YW55PigpXG4gICAgICAgIC54KHhQcm9wZXJ0eSlcbiAgICAgICAgLnkwKGQgPT4gKHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKSlcbiAgICAgICAgLnkxKGQgPT4gKHRoaXMuYmFzZVZhbHVlID09PSAnYXV0bycgPyB0aGlzLnlTY2FsZS5yYW5nZSgpWzBdIDogdGhpcy55U2NhbGUodGhpcy5iYXNlVmFsdWUpKSk7XG4gICAgfVxuXG4gICAgY3VycmVudEFyZWEuY3VydmUodGhpcy5jdXJ2ZSk7XG4gICAgc3RhcnRpbmdBcmVhLmN1cnZlKHRoaXMuY3VydmUpO1xuXG4gICAgdGhpcy5vcGFjaXR5ID0gMC44O1xuXG4gICAgbGV0IGRhdGEgPSB0aGlzLmRhdGEuc2VyaWVzO1xuICAgIGlmICh0aGlzLnNjYWxlVHlwZSA9PT0gU2NhbGVUeXBlLkxpbmVhcikge1xuICAgICAgZGF0YSA9IHNvcnRMaW5lYXIoZGF0YSwgJ25hbWUnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSkge1xuICAgICAgZGF0YSA9IHNvcnRCeVRpbWUoZGF0YSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHNvcnRCeURvbWFpbihkYXRhLCAnbmFtZScsICdhc2MnLCB0aGlzLnhTY2FsZS5kb21haW4oKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYXRoID0gY3VycmVudEFyZWEoZGF0YSk7XG4gICAgdGhpcy5zdGFydGluZ1BhdGggPSBzdGFydGluZ0FyZWEoZGF0YSk7XG4gIH1cblxuICB1cGRhdGVHcmFkaWVudCgpIHtcbiAgICBpZiAodGhpcy5jb2xvcnMuc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnN0YWNrZWQgfHwgdGhpcy5ub3JtYWxpemVkKSB7XG4gICAgICAgIGNvbnN0IGQwdmFsdWVzID0gdGhpcy5kYXRhLnNlcmllcy5tYXAoZCA9PiBkLmQwKTtcbiAgICAgICAgY29uc3QgZDF2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQuZDEpO1xuICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kMXZhbHVlcyk7XG4gICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmQwdmFsdWVzKTtcbiAgICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5jb2xvcnMuZ2V0TGluZWFyR3JhZGllbnRTdG9wcyhtYXgsIG1pbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmRhdGEuc2VyaWVzLm1hcChkID0+IGQudmFsdWUpO1xuICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi52YWx1ZXMpO1xuICAgICAgICB0aGlzLmdyYWRpZW50U3RvcHMgPSB0aGlzLmNvbG9ycy5nZXRMaW5lYXJHcmFkaWVudFN0b3BzKG1heCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzKSByZXR1cm4gZmFsc2U7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuYWN0aXZlRW50cmllcy5maW5kKGQgPT4ge1xuICAgICAgcmV0dXJuIGVudHJ5Lm5hbWUgPT09IGQubmFtZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlbSAhPT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaXNJbmFjdGl2ZShlbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5hY3RpdmVFbnRyaWVzIHx8IHRoaXMuYWN0aXZlRW50cmllcy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBpdGVtID0gdGhpcy5hY3RpdmVFbnRyaWVzLmZpbmQoZCA9PiB7XG4gICAgICByZXR1cm4gZW50cnkubmFtZSA9PT0gZC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==