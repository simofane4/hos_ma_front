import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { escapeLabel } from '../common/label.helper';
import { decimalChecker, count } from '../common/count/count.helper';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';
export class CardComponent {
    constructor(element, cd, zone, platformId) {
        this.cd = cd;
        this.zone = zone;
        this.platformId = platformId;
        this.animations = true;
        this.select = new EventEmitter();
        this.value = '';
        this.textFontSize = 12;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 5, 20];
        this.labelFontSize = 15;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.scaleTextSSR();
        }
    }
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            cancelAnimationFrame(this.animationReq);
        }
    }
    update() {
        this.zone.run(() => {
            const hasValue = this.data && typeof this.data.value !== 'undefined';
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const labelFormatting = this.labelFormatting || (card => escapeLabel(trimLabel(card.label, 55)));
            this.transform = `translate(${this.x} , ${this.y})`;
            this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
            this.cardWidth = Math.max(0, this.width);
            this.cardHeight = Math.max(0, this.height);
            this.label = this.label ? this.label : this.data.name;
            const cardData = {
                label: this.label,
                data: this.data,
                value: this.data.value
            };
            this.formattedLabel = labelFormatting(cardData);
            this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;
            const value = hasValue ? valueFormatting(cardData) : '';
            this.value = this.paddedValue(value);
            this.setPadding();
            this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);
            setTimeout(() => {
                if (isPlatformBrowser(this.platformId)) {
                    this.scaleText();
                }
                this.value = value;
                if (hasValue && !this.initialized) {
                    setTimeout(() => this.startCount(), 20);
                }
            }, 8);
        });
    }
    paddedValue(value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    }
    startCount() {
        if (!this.initialized && this.animations) {
            cancelAnimationFrame(this.animationReq);
            const val = this.data.value;
            const decs = decimalChecker(val);
            const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
            const callback = ({ value, finished }) => {
                this.zone.run(() => {
                    value = finished ? val : value;
                    this.value = valueFormatting({ label: this.label, data: this.data, value });
                    if (!finished) {
                        this.value = this.paddedValue(this.value);
                    }
                    this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    }
    scaleText() {
        this.zone.run(() => {
            const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
            if (width === 0 || height === 0) {
                return;
            }
            const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
            const availableWidth = this.cardWidth - 2 * textPadding;
            const availableHeight = this.cardHeight / 3;
            const resizeScale = Math.min(availableWidth / width, availableHeight / height);
            this.textFontSize = Math.floor(this.textFontSize * resizeScale);
            this.labelFontSize = Math.min(this.textFontSize, 15);
            this.setPadding();
            this.cd.markForCheck();
        });
    }
    scaleTextSSR() {
        const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, this.value, 10);
        const height = 18;
        const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
        const availableWidth = this.cardWidth - 2 * textPadding;
        const availableHeight = this.cardHeight / 3;
        const resizeScale = Math.min(availableWidth / width, availableHeight / height);
        this.textFontSize = Math.floor(this.textFontSize * resizeScale);
        this.labelFontSize = Math.min(this.textFontSize, 15);
        this.setPadding();
    }
    setPadding() {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        const padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
    }
    onClick() {
        this.select.emit(this.data);
    }
}
CardComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-card]',
                template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] }
];
CardComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
CardComponent.propDecorators = {
    color: [{ type: Input }],
    bandColor: [{ type: Input }],
    textColor: [{ type: Input }],
    x: [{ type: Input }],
    y: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    label: [{ type: Input }],
    data: [{ type: Input }],
    medianSize: [{ type: Input }],
    valueFormatting: [{ type: Input }],
    labelFormatting: [{ type: Input }],
    animations: [{ type: Input }],
    select: [{ type: Output }],
    textEl: [{ type: ViewChild, args: ['textEl', { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtY2hhcnRzL3NyYy9saWIvbnVtYmVyLWNhcmQvY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixVQUFVLEVBR1YsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsTUFBTSxFQUVOLFdBQVcsRUFDWCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQWlENUUsTUFBTSxPQUFPLGFBQWE7SUFzQ3hCLFlBQ0UsT0FBbUIsRUFDWCxFQUFxQixFQUNyQixJQUFZLEVBQ1MsVUFBZTtRQUZwQyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1MsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQTdCckMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUt0QyxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBTW5CLGlC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Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQ1Q7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztZQWxFQyxVQUFVO1lBS1YsaUJBQWlCO1lBQ2pCLE1BQU07NENBdUdILE1BQU0sU0FBQyxXQUFXOzs7b0JBekNwQixLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztnQkFDTCxLQUFLO2dCQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQUVMLE1BQU07cUJBRU4sU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmltTGFiZWwgfSBmcm9tICcuLi9jb21tb24vdHJpbS1sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgcm91bmRlZFJlY3QgfSBmcm9tICcuLi9jb21tb24vc2hhcGUuaGVscGVyJztcbmltcG9ydCB7IGVzY2FwZUxhYmVsIH0gZnJvbSAnLi4vY29tbW9uL2xhYmVsLmhlbHBlcic7XG5pbXBvcnQgeyBkZWNpbWFsQ2hlY2tlciwgY291bnQgfSBmcm9tICcuLi9jb21tb24vY291bnQvY291bnQuaGVscGVyJztcbmltcG9ydCB7IEdyaWREYXRhIH0gZnJvbSAnLi4vY29tbW9uL2dyaWQtbGF5b3V0LmhlbHBlcic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciwgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBjYWxjdWxhdGVUZXh0V2lkdGggfSBmcm9tICcuLi91dGlscy9jYWxjdWxhdGUtd2lkdGgnO1xuaW1wb3J0IHsgVkVSREFOQV9GT05UX1dJRFRIU18xNl9QWCB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMvZm9udC13aWR0aHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtY2FyZF0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCIgY2xhc3M9XCJjZWxsXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiPlxuICAgICAgPHN2ZzpyZWN0IGNsYXNzPVwiY2FyZFwiIFtzdHlsZS5maWxsXT1cImNvbG9yXCIgW2F0dHIud2lkdGhdPVwiY2FyZFdpZHRoXCIgW2F0dHIuaGVpZ2h0XT1cImNhcmRIZWlnaHRcIiByeD1cIjNcIiByeT1cIjNcIiAvPlxuICAgICAgPHN2ZzpwYXRoXG4gICAgICAgICpuZ0lmPVwiYmFuZENvbG9yICYmIGJhbmRDb2xvciAhPT0gY29sb3JcIlxuICAgICAgICBjbGFzcz1cImNhcmQtYmFuZFwiXG4gICAgICAgIFthdHRyLmZpbGxdPVwiYmFuZENvbG9yXCJcbiAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUJhbmRcIlxuICAgICAgICBzdHJva2U9XCJub25lXCJcbiAgICAgICAgW2F0dHIuZF09XCJiYW5kUGF0aFwiXG4gICAgICAvPlxuICAgICAgPHRpdGxlPnt7IGxhYmVsIH19PC90aXRsZT5cbiAgICAgIDxzdmc6Zm9yZWlnbk9iamVjdFxuICAgICAgICBjbGFzcz1cInRyaW1tZWQtbGFiZWxcIlxuICAgICAgICB4PVwiNVwiXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxuICAgICAgICBbYXR0ci55XT1cImNhcmRIZWlnaHQgLSB0ZXh0UGFkZGluZ1syXVwiXG4gICAgICAgIFthdHRyLndpZHRoXT1cInRleHRXaWR0aFwiXG4gICAgICAgIFthdHRyLmhlaWdodF09XCJsYWJlbEZvbnRTaXplICsgdGV4dFBhZGRpbmdbMl1cIlxuICAgICAgICBhbGlnbm1lbnQtYmFzZWxpbmU9XCJoYW5naW5nXCJcbiAgICAgID5cbiAgICAgICAgPHhodG1sOnBcbiAgICAgICAgICBbc3R5bGUuY29sb3JdPVwidGV4dENvbG9yXCJcbiAgICAgICAgICBbc3R5bGUuZm9udFNpemUucHhdPVwibGFiZWxGb250U2l6ZVwiXG4gICAgICAgICAgW3N0eWxlLmxpbmVIZWlnaHQucHhdPVwibGFiZWxGb250U2l6ZVwiXG4gICAgICAgICAgW2lubmVySFRNTF09XCJmb3JtYXR0ZWRMYWJlbFwiXG4gICAgICAgID5cbiAgICAgICAgPC94aHRtbDpwPlxuICAgICAgPC9zdmc6Zm9yZWlnbk9iamVjdD5cbiAgICAgIDxzdmc6dGV4dFxuICAgICAgICAjdGV4dEVsXG4gICAgICAgIGNsYXNzPVwidmFsdWUtdGV4dFwiXG4gICAgICAgIFthdHRyLnhdPVwidGV4dFBhZGRpbmdbM11cIlxuICAgICAgICBbYXR0ci55XT1cInRleHRQYWRkaW5nWzBdXCJcbiAgICAgICAgW3N0eWxlLmZpbGxdPVwidGV4dENvbG9yXCJcbiAgICAgICAgdGV4dC1hbmNob3I9XCJzdGFydFwiXG4gICAgICAgIGFsaWdubWVudC1iYXNlbGluZT1cImhhbmdpbmdcIlxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB0XT1cInRleHRGb250U2l6ZVwiXG4gICAgICA+XG4gICAgICAgIHt7IHZhbHVlIH19XG4gICAgICA8L3N2Zzp0ZXh0PlxuICAgIDwvc3ZnOmc+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJhbmRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0ZXh0Q29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgeDogbnVtYmVyO1xuICBASW5wdXQoKSB5OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBkYXRhOiBHcmlkRGF0YTtcbiAgQElucHV0KCkgbWVkaWFuU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcbiAgQElucHV0KCkgbGFiZWxGb3JtYXR0aW5nOiBhbnk7XG4gIEBJbnB1dCgpIGFuaW1hdGlvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgndGV4dEVsJywgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRFbDogRWxlbWVudFJlZjtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuICB0cmFuc2Zvcm06IHN0cmluZztcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgY2FyZFdpZHRoOiBudW1iZXI7XG4gIGNhcmRIZWlnaHQ6IG51bWJlcjtcbiAgdGV4dFdpZHRoOiBudW1iZXI7XG4gIHRleHRGb250U2l6ZTogbnVtYmVyID0gMTI7XG4gIHRleHRUcmFuc2Zvcm06IHN0cmluZyA9ICcnO1xuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBhbmltYXRpb25SZXE6IG51bWJlcjtcblxuICBiYW5kSGVpZ2h0OiBudW1iZXIgPSAxMDtcbiAgdHJhbnNmb3JtQmFuZDogc3RyaW5nO1xuICB0ZXh0UGFkZGluZzogbnVtYmVyW10gPSBbMTAsIDIwLCA1LCAyMF07XG4gIGxhYmVsRm9udFNpemU6IG51bWJlciA9IDE1O1xuXG4gIGJhbmRQYXRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueVxuICApIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuc2NhbGVUZXh0U1NSKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICBjb25zdCBoYXNWYWx1ZSA9IHRoaXMuZGF0YSAmJiB0eXBlb2YgdGhpcy5kYXRhLnZhbHVlICE9PSAndW5kZWZpbmVkJztcbiAgICAgIGNvbnN0IHZhbHVlRm9ybWF0dGluZyA9IHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8IChjYXJkID0+IGNhcmQudmFsdWUudG9Mb2NhbGVTdHJpbmcoKSk7XG4gICAgICBjb25zdCBsYWJlbEZvcm1hdHRpbmcgPSB0aGlzLmxhYmVsRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBlc2NhcGVMYWJlbCh0cmltTGFiZWwoY2FyZC5sYWJlbCwgNTUpKSk7XG5cbiAgICAgIHRoaXMudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke3RoaXMueH0gLCAke3RoaXMueX0pYDtcblxuICAgICAgdGhpcy50ZXh0V2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKSAtIHRoaXMudGV4dFBhZGRpbmdbMV0gLSB0aGlzLnRleHRQYWRkaW5nWzNdO1xuICAgICAgdGhpcy5jYXJkV2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLndpZHRoKTtcbiAgICAgIHRoaXMuY2FyZEhlaWdodCA9IE1hdGgubWF4KDAsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWwgPyB0aGlzLmxhYmVsIDogKHRoaXMuZGF0YS5uYW1lIGFzIGFueSk7XG5cbiAgICAgIGNvbnN0IGNhcmREYXRhID0ge1xuICAgICAgICBsYWJlbDogdGhpcy5sYWJlbCxcbiAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxuICAgICAgICB2YWx1ZTogdGhpcy5kYXRhLnZhbHVlXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmZvcm1hdHRlZExhYmVsID0gbGFiZWxGb3JtYXR0aW5nKGNhcmREYXRhKTtcbiAgICAgIHRoaXMudHJhbnNmb3JtQmFuZCA9IGB0cmFuc2xhdGUoMCAsICR7dGhpcy5jYXJkSGVpZ2h0IC0gdGhpcy5iYW5kSGVpZ2h0fSlgO1xuXG4gICAgICBjb25zdCB2YWx1ZSA9IGhhc1ZhbHVlID8gdmFsdWVGb3JtYXR0aW5nKGNhcmREYXRhKSA6ICcnO1xuXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5wYWRkZWRWYWx1ZSh2YWx1ZSk7XG4gICAgICB0aGlzLnNldFBhZGRpbmcoKTtcblxuICAgICAgdGhpcy5iYW5kUGF0aCA9IHJvdW5kZWRSZWN0KDAsIDAsIHRoaXMuY2FyZFdpZHRoLCB0aGlzLmJhbmRIZWlnaHQsIDMsIFtmYWxzZSwgZmFsc2UsIHRydWUsIHRydWVdKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgdGhpcy5zY2FsZVRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGlmIChoYXNWYWx1ZSAmJiAhdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zdGFydENvdW50KCksIDIwKTtcbiAgICAgICAgfVxuICAgICAgfSwgOCk7XG4gICAgfSk7XG4gIH1cblxuICBwYWRkZWRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5tZWRpYW5TaXplICYmIHRoaXMubWVkaWFuU2l6ZSA+IHZhbHVlLmxlbmd0aCkge1xuICAgICAgdmFsdWUgKz0gJ1xcdTIwMDcnLnJlcGVhdCh0aGlzLm1lZGlhblNpemUgLSB2YWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGFydENvdW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uUmVxKTtcblxuICAgICAgY29uc3QgdmFsID0gdGhpcy5kYXRhLnZhbHVlO1xuICAgICAgY29uc3QgZGVjcyA9IGRlY2ltYWxDaGVja2VyKHZhbCk7XG4gICAgICBjb25zdCB2YWx1ZUZvcm1hdHRpbmcgPSB0aGlzLnZhbHVlRm9ybWF0dGluZyB8fCAoY2FyZCA9PiBjYXJkLnZhbHVlLnRvTG9jYWxlU3RyaW5nKCkpO1xuXG4gICAgICBjb25zdCBjYWxsYmFjayA9ICh7IHZhbHVlLCBmaW5pc2hlZCB9KSA9PiB7XG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gZmluaXNoZWQgPyB2YWwgOiB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWVGb3JtYXR0aW5nKHsgbGFiZWw6IHRoaXMubGFiZWwsIGRhdGE6IHRoaXMuZGF0YSwgdmFsdWUgfSk7XG4gICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFkZGVkVmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5hbmltYXRpb25SZXEgPSBjb3VudCgwLCB2YWwsIGRlY3MsIDEsIGNhbGxiYWNrKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHNjYWxlVGV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy50ZXh0RWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0ZXh0UGFkZGluZyA9ICh0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gOCk7XG4gICAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuY2FyZFdpZHRoIC0gMiAqIHRleHRQYWRkaW5nO1xuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gdGhpcy5jYXJkSGVpZ2h0IC8gMztcblxuICAgICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xuICAgICAgdGhpcy5sYWJlbEZvbnRTaXplID0gTWF0aC5taW4odGhpcy50ZXh0Rm9udFNpemUsIDE1KTtcblxuICAgICAgdGhpcy5zZXRQYWRkaW5nKCk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgc2NhbGVUZXh0U1NSKCkge1xuICAgIGNvbnN0IHdpZHRoID0gY2FsY3VsYXRlVGV4dFdpZHRoKFZFUkRBTkFfRk9OVF9XSURUSFNfMTZfUFgsIHRoaXMudmFsdWUsIDEwKTtcbiAgICBjb25zdCBoZWlnaHQgPSAxODtcbiAgICBjb25zdCB0ZXh0UGFkZGluZyA9ICh0aGlzLnRleHRQYWRkaW5nWzFdID0gdGhpcy50ZXh0UGFkZGluZ1szXSA9IHRoaXMuY2FyZFdpZHRoIC8gOCk7XG4gICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSB0aGlzLmNhcmRXaWR0aCAtIDIgKiB0ZXh0UGFkZGluZztcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSB0aGlzLmNhcmRIZWlnaHQgLyAzO1xuXG4gICAgY29uc3QgcmVzaXplU2NhbGUgPSBNYXRoLm1pbihhdmFpbGFibGVXaWR0aCAvIHdpZHRoLCBhdmFpbGFibGVIZWlnaHQgLyBoZWlnaHQpO1xuXG4gICAgdGhpcy50ZXh0Rm9udFNpemUgPSBNYXRoLmZsb29yKHRoaXMudGV4dEZvbnRTaXplICogcmVzaXplU2NhbGUpO1xuICAgIHRoaXMubGFiZWxGb250U2l6ZSA9IE1hdGgubWluKHRoaXMudGV4dEZvbnRTaXplLCAxNSk7XG5cbiAgICB0aGlzLnNldFBhZGRpbmcoKTtcbiAgfVxuXG4gIHNldFBhZGRpbmcoKSB7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1sxXSA9IHRoaXMudGV4dFBhZGRpbmdbM10gPSB0aGlzLmNhcmRXaWR0aCAvIDg7XG4gICAgY29uc3QgcGFkZGluZyA9IHRoaXMuY2FyZEhlaWdodCAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1swXSA9IHBhZGRpbmcgLSB0aGlzLnRleHRGb250U2l6ZSAtIHRoaXMubGFiZWxGb250U2l6ZSAvIDI7XG4gICAgdGhpcy50ZXh0UGFkZGluZ1syXSA9IHBhZGRpbmcgLSB0aGlzLmxhYmVsRm9udFNpemU7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRhKTtcbiAgfVxufVxuIl19