import { Injectable } from '@angular/core';
import { InjectionService } from './injection.service';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionRegisteryService } from './injection-registery.service';
export class TooltipService extends InjectionRegisteryService {
    constructor(injectionService) {
        super(injectionService);
        this.type = TooltipContentComponent;
    }
}
TooltipService.decorators = [
    { type: Injectable }
];
TooltipService.ctorParameters = () => [
    { type: InjectionService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi90b29sdGlwL3Rvb2x0aXAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTFFLE1BQU0sT0FBTyxjQUFlLFNBQVEseUJBQWtEO0lBR3BGLFlBQVksZ0JBQWtDO1FBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBSDFCLFNBQUksR0FBUSx1QkFBdUIsQ0FBQztJQUlwQyxDQUFDOzs7WUFORixVQUFVOzs7WUFIRixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0aW9uUmVnaXN0ZXJ5U2VydmljZSB9IGZyb20gJy4vaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb29sdGlwU2VydmljZSBleHRlbmRzIEluamVjdGlvblJlZ2lzdGVyeVNlcnZpY2U8VG9vbHRpcENvbnRlbnRDb21wb25lbnQ+IHtcbiAgdHlwZTogYW55ID0gVG9vbHRpcENvbnRlbnRDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0aW9uU2VydmljZTogSW5qZWN0aW9uU2VydmljZSkge1xuICAgIHN1cGVyKGluamVjdGlvblNlcnZpY2UpO1xuICB9XG59XG4iXX0=