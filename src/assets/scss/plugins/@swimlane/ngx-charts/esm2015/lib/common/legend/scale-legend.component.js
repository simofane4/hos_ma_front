import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
export class ScaleLegendComponent {
    constructor() {
        this.horizontal = false;
    }
    ngOnChanges(changes) {
        const gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        const direction = this.horizontal ? 'right' : 'bottom';
        this.gradient = `linear-gradient(to ${direction}, ${gradientValues})`;
    }
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param colors array of colors
     * @param splits array of splits on a scale of (0, 1)
     */
    gradientString(colors, splits) {
        // add the 100%
        splits.push(1);
        const pairs = [];
        colors.reverse().forEach((c, i) => {
            pairs.push(`${c} ${Math.round(splits[i] * 100)}%`);
        });
        return pairs.join(', ');
    }
}
ScaleLegendComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-scale-legend',
                template: `
    <div
      class="scale-legend"
      [class.horizontal-legend]="horizontal"
      [style.height.px]="horizontal ? undefined : height"
      [style.width.px]="width"
    >
      <div class="scale-legend-label">
        <span>{{ valueRange[1].toLocaleString() }}</span>
      </div>
      <div class="scale-legend-wrap" [style.background]="gradient"></div>
      <div class="scale-legend-label">
        <span>{{ valueRange[0].toLocaleString() }}</span>
      </div>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .scale-legend{text-align:center;display:flex;flex-direction:column}.chart-legend .scale-legend-wrap{display:inline-block;flex:1;width:30px;border-radius:5px;margin:0 auto}.chart-legend .scale-legend-label{font-size:12px}.chart-legend .horizontal-legend.scale-legend{flex-direction:row}.chart-legend .horizontal-legend .scale-legend-wrap{width:auto;height:30px;margin:0 16px}\n"]
            },] }
];
ScaleLegendComponent.propDecorators = {
    valueRange: [{ type: Input }],
    colors: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    horizontal: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbGUtbGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vbGVnZW5kL3NjYWxlLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsdUJBQXVCLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0J2SCxNQUFNLE9BQU8sb0JBQW9CO0lBdEJqQztRQTJCVyxlQUFVLEdBQVksS0FBSyxDQUFDO0lBeUJ2QyxDQUFDO0lBckJDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsc0JBQXNCLFNBQVMsS0FBSyxjQUFjLEdBQUcsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxNQUFnQixFQUFFLE1BQWdCO1FBQy9DLGVBQWU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7O1lBbkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2dCQUVELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozt5QkFFRSxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLXNjYWxlLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJzY2FsZS1sZWdlbmRcIlxuICAgICAgW2NsYXNzLmhvcml6b250YWwtbGVnZW5kXT1cImhvcml6b250YWxcIlxuICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJob3Jpem9udGFsID8gdW5kZWZpbmVkIDogaGVpZ2h0XCJcbiAgICAgIFtzdHlsZS53aWR0aC5weF09XCJ3aWR0aFwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cInNjYWxlLWxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICA8c3Bhbj57eyB2YWx1ZVJhbmdlWzFdLnRvTG9jYWxlU3RyaW5nKCkgfX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzY2FsZS1sZWdlbmQtd3JhcFwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImdyYWRpZW50XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2NhbGUtbGVnZW5kLWxhYmVsXCI+XG4gICAgICAgIDxzcGFuPnt7IHZhbHVlUmFuZ2VbMF0udG9Mb2NhbGVTdHJpbmcoKSB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9zY2FsZS1sZWdlbmQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2NhbGVMZWdlbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB2YWx1ZVJhbmdlOiBudW1iZXJbXTtcbiAgQElucHV0KCkgY29sb3JzOiBhbnk7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWR0aDogbnVtYmVyO1xuICBASW5wdXQoKSBob3Jpem9udGFsOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ3JhZGllbnQ6IHN0cmluZztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgZ3JhZGllbnRWYWx1ZXMgPSB0aGlzLmdyYWRpZW50U3RyaW5nKHRoaXMuY29sb3JzLnJhbmdlKCksIHRoaXMuY29sb3JzLmRvbWFpbigpKTtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmhvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gICAgdGhpcy5ncmFkaWVudCA9IGBsaW5lYXItZ3JhZGllbnQodG8gJHtkaXJlY3Rpb259LCAke2dyYWRpZW50VmFsdWVzfSlgO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgc3RyaW5nIHVzZWQgaW4gdGhlIGdyYWRpZW50IHN0eWxlc2hlZXQgcHJvcGVydGllc1xuICAgKiBAcGFyYW0gY29sb3JzIGFycmF5IG9mIGNvbG9yc1xuICAgKiBAcGFyYW0gc3BsaXRzIGFycmF5IG9mIHNwbGl0cyBvbiBhIHNjYWxlIG9mICgwLCAxKVxuICAgKi9cbiAgZ3JhZGllbnRTdHJpbmcoY29sb3JzOiBzdHJpbmdbXSwgc3BsaXRzOiBudW1iZXJbXSk6IHN0cmluZyB7XG4gICAgLy8gYWRkIHRoZSAxMDAlXG4gICAgc3BsaXRzLnB1c2goMSk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcbiAgICBjb2xvcnMucmV2ZXJzZSgpLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAgIHBhaXJzLnB1c2goYCR7Y30gJHtNYXRoLnJvdW5kKHNwbGl0c1tpXSAqIDEwMCl9JWApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJywgJyk7XG4gIH1cbn1cbiJdfQ==