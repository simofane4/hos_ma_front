import { __decorate } from "tslib";
import { Input, Component, ElementRef, ViewEncapsulation, HostListener, ViewChild, HostBinding, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { throttleable } from '../../utils/throttle';
import { PositionHelper } from './position';
import { isPlatformBrowser } from '@angular/common';
export class TooltipContentComponent {
    constructor(element, renderer, platformId) {
        this.element = element;
        this.renderer = renderer;
        this.platformId = platformId;
    }
    get cssClasses() {
        let clz = 'ngx-charts-tooltip-content';
        clz += ` position-${this.placement}`;
        clz += ` type-${this.type}`;
        clz += ` ${this.cssClass}`;
        return clz;
    }
    ngAfterViewInit() {
        setTimeout(this.position.bind(this));
    }
    position() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const nativeElm = this.element.nativeElement;
        const hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        const elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
    }
    positionContent(nativeElm, hostDim, elmDim) {
        const { top, left } = PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment);
        this.renderer.setStyle(nativeElm, 'top', `${top}px`);
        this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
    positionCaret(hostDim, elmDim) {
        const caretElm = this.caretElm.nativeElement;
        const caretDimensions = caretElm.getBoundingClientRect();
        const { top, left } = PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment);
        this.renderer.setStyle(caretElm, 'top', `${top}px`);
        this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
    checkFlip(hostDim, elmDim) {
        this.placement = PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing);
    }
    onWindowResize() {
        this.position();
    }
}
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-tooltip-content',
                template: `
    <div>
      <span #caretElm [hidden]="!showCaret" class="tooltip-caret position-{{ this.placement }}"> </span>
      <div class="tooltip-content">
        <span *ngIf="!title">
          <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ model: context }"> </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `,
                encapsulation: ViewEncapsulation.None,
                styles: [".ngx-charts-tooltip-content{position:fixed;border-radius:3px;z-index:5000;display:block;font-weight:normal;opacity:0;pointer-events:none!important}.ngx-charts-tooltip-content.type-popover{background:#fff;color:#060709;border:1px solid #72809b;box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;font-size:13px;padding:4px}.ngx-charts-tooltip-content.type-popover .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid #fff}.ngx-charts-tooltip-content.type-popover .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid #fff}.ngx-charts-tooltip-content.type-tooltip{color:#fff;background:rgba(0,0,0,.75);font-size:12px;padding:0 10px;text-align:center;pointer-events:auto}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-left{border-top:7px solid transparent;border-bottom:7px solid transparent;border-left:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-top{border-left:7px solid transparent;border-right:7px solid transparent;border-top:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-right{border-top:7px solid transparent;border-bottom:7px solid transparent;border-right:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content.type-tooltip .tooltip-caret.position-bottom{border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid rgba(0,0,0,.75)}.ngx-charts-tooltip-content .tooltip-label{display:block;line-height:1em;padding:8px 5px 5px;font-size:1em}.ngx-charts-tooltip-content .tooltip-val{display:block;font-size:1.3em;line-height:1em;padding:0 5px 8px}.ngx-charts-tooltip-content .tooltip-caret{position:absolute;z-index:5001;width:0;height:0}.ngx-charts-tooltip-content.position-right{transform:translate(10px)}.ngx-charts-tooltip-content.position-left{transform:translate(-10px)}.ngx-charts-tooltip-content.position-top{transform:translateY(-10px)}.ngx-charts-tooltip-content.position-bottom{transform:translateY(10px)}.ngx-charts-tooltip-content.animate{opacity:1;transition:opacity .3s,transform .3s;transform:translate(0);pointer-events:auto}.area-tooltip-container{padding:5px 0;pointer-events:none}.tooltip-item{text-align:left;line-height:1.2em;padding:5px 0}.tooltip-item .tooltip-item-color{display:inline-block;height:12px;width:12px;margin-right:5px;color:#5b646b;border-radius:3px}\n"]
            },] }
];
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
TooltipContentComponent.propDecorators = {
    host: [{ type: Input }],
    showCaret: [{ type: Input }],
    type: [{ type: Input }],
    placement: [{ type: Input }],
    alignment: [{ type: Input }],
    spacing: [{ type: Input }],
    cssClass: [{ type: Input }],
    title: [{ type: Input }],
    template: [{ type: Input }],
    context: [{ type: Input }],
    caretElm: [{ type: ViewChild, args: ['caretElm',] }],
    cssClasses: [{ type: HostBinding, args: ['class',] }],
    onWindowResize: [{ type: HostListener, args: ['window:resize',] }]
};
__decorate([
    throttleable(100)
], TooltipContentComponent.prototype, "onWindowResize", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFFVixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxNQUFNLEVBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBRzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBa0JwRCxNQUFNLE9BQU8sdUJBQXVCO0lBdUJsQyxZQUFtQixPQUFtQixFQUFVLFFBQW1CLEVBQStCLFVBQWU7UUFBOUYsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBK0IsZUFBVSxHQUFWLFVBQVUsQ0FBSztJQUFHLENBQUM7SUFUckgsSUFDSSxVQUFVO1FBQ1osSUFBSSxHQUFHLEdBQUcsNEJBQTRCLENBQUM7UUFDdkMsR0FBRyxJQUFJLGFBQWEsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBSUQsZUFBZTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lB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bUQ2RCxNQUFNLFNBQUMsV0FBVzs7O21CQXRCdkYsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFFTCxTQUFTLFNBQUMsVUFBVTt5QkFFcEIsV0FBVyxTQUFDLE9BQU87NkJBZ0VuQixZQUFZLFNBQUMsZUFBZTs7QUFFN0I7SUFEQyxZQUFZLENBQUMsR0FBRyxDQUFDOzZEQUdqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIElucHV0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEFmdGVyVmlld0luaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgSG9zdEJpbmRpbmcsXG4gIFJlbmRlcmVyMixcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHRocm90dGxlYWJsZSB9IGZyb20gJy4uLy4uL3V0aWxzL3Rocm90dGxlJztcbmltcG9ydCB7IFBvc2l0aW9uSGVscGVyLCBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xuXG5pbXBvcnQgeyBTdHlsZVR5cGVzIH0gZnJvbSAnLi9zdHlsZS50eXBlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXRvb2x0aXAtY29udGVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxzcGFuICNjYXJldEVsbSBbaGlkZGVuXT1cIiFzaG93Q2FyZXRcIiBjbGFzcz1cInRvb2x0aXAtY2FyZXQgcG9zaXRpb24te3sgdGhpcy5wbGFjZW1lbnQgfX1cIj4gPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtY29udGVudFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiF0aXRsZVwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IG1vZGVsOiBjb250ZXh0IH1cIj4gPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInRpdGxlXCIgW2lubmVySFRNTF09XCJ0aXRsZVwiPiA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGhvc3Q6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIHNob3dDYXJldDogYm9vbGVhbjtcbiAgQElucHV0KCkgdHlwZTogU3R5bGVUeXBlcztcbiAgQElucHV0KCkgcGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcztcbiAgQElucHV0KCkgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlcztcbiAgQElucHV0KCkgc3BhY2luZzogbnVtYmVyO1xuICBASW5wdXQoKSBjc3NDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xuXG4gIEBWaWV3Q2hpbGQoJ2NhcmV0RWxtJykgY2FyZXRFbG06IEVsZW1lbnRSZWY7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIGdldCBjc3NDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgbGV0IGNseiA9ICduZ3gtY2hhcnRzLXRvb2x0aXAtY29udGVudCc7XG4gICAgY2x6ICs9IGAgcG9zaXRpb24tJHt0aGlzLnBsYWNlbWVudH1gO1xuICAgIGNseiArPSBgIHR5cGUtJHt0aGlzLnR5cGV9YDtcbiAgICBjbHogKz0gYCAke3RoaXMuY3NzQ2xhc3N9YDtcbiAgICByZXR1cm4gY2x6O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnkpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQodGhpcy5wb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5hdGl2ZUVsbSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGhvc3REaW0gPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIGlmIG5vIGRpbXMgd2VyZSBmb3VuZCwgbmV2ZXIgc2hvd1xuICAgIGlmICghaG9zdERpbS5oZWlnaHQgJiYgIWhvc3REaW0ud2lkdGgpIHJldHVybjtcblxuICAgIGNvbnN0IGVsbURpbSA9IG5hdGl2ZUVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLmNoZWNrRmxpcChob3N0RGltLCBlbG1EaW0pO1xuICAgIHRoaXMucG9zaXRpb25Db250ZW50KG5hdGl2ZUVsbSwgaG9zdERpbSwgZWxtRGltKTtcblxuICAgIGlmICh0aGlzLnNob3dDYXJldCkge1xuICAgICAgdGhpcy5wb3NpdGlvbkNhcmV0KGhvc3REaW0sIGVsbURpbSk7XG4gICAgfVxuXG4gICAgLy8gYW5pbWF0ZSBpdHMgZW50cnlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobmF0aXZlRWxtLCAnYW5pbWF0ZScpLCAxKTtcbiAgfVxuXG4gIHBvc2l0aW9uQ29udGVudChuYXRpdmVFbG06IEhUTUxFbGVtZW50LCBob3N0RGltOiBET01SZWN0LCBlbG1EaW06IERPTVJlY3QpOiB2b2lkIHtcbiAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gUG9zaXRpb25IZWxwZXIucG9zaXRpb25Db250ZW50KHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHRoaXMuc3BhY2luZywgdGhpcy5hbGlnbm1lbnQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShuYXRpdmVFbG0sICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKG5hdGl2ZUVsbSwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBwb3NpdGlvbkNhcmV0KGhvc3REaW06IERPTVJlY3QsIGVsbURpbTogRE9NUmVjdCk6IHZvaWQge1xuICAgIGNvbnN0IGNhcmV0RWxtID0gdGhpcy5jYXJldEVsbS5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNhcmV0RGltZW5zaW9ucyA9IGNhcmV0RWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBQb3NpdGlvbkhlbHBlci5wb3NpdGlvbkNhcmV0KFxuICAgICAgdGhpcy5wbGFjZW1lbnQsXG4gICAgICBlbG1EaW0sXG4gICAgICBob3N0RGltLFxuICAgICAgY2FyZXREaW1lbnNpb25zLFxuICAgICAgdGhpcy5hbGlnbm1lbnRcbiAgICApO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjYXJldEVsbSwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2FyZXRFbG0sICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICB9XG5cbiAgY2hlY2tGbGlwKGhvc3REaW06IERPTVJlY3QsIGVsbURpbTogRE9NUmVjdCk6IHZvaWQge1xuICAgIHRoaXMucGxhY2VtZW50ID0gUG9zaXRpb25IZWxwZXIuZGV0ZXJtaW5lUGxhY2VtZW50KHRoaXMucGxhY2VtZW50LCBlbG1EaW0sIGhvc3REaW0sIHRoaXMuc3BhY2luZyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgQHRocm90dGxlYWJsZSgxMDApXG4gIG9uV2luZG93UmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMucG9zaXRpb24oKTtcbiAgfVxufVxuIl19