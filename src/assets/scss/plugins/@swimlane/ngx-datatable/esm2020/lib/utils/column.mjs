/**
 * Returns the columns by pin.
 */
export function columnsByPin(cols) {
    const ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (const col of cols) {
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
/**
 * Returns the widths of all group sets of a column
 */
export function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: Math.floor(columnTotalWidth(all))
    };
}
/**
 * Calculates the total width of all columns and their groups
 */
export function columnTotalWidth(columns, prop) {
    let totalWidth = 0;
    if (columns) {
        for (const c of columns) {
            const has = prop && c[prop];
            const width = has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns, prop) {
    let totalWidth = 0;
    for (const column of columns) {
        const has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
export function columnsByPinArr(val) {
    const colsByPinArr = [];
    const colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvbGliL3V0aWxzL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsSUFBVztJQUN0QyxNQUFNLEdBQUcsR0FBMkM7UUFDbEQsSUFBSSxFQUFFLEVBQUU7UUFDUixNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQztJQUVGLElBQUksSUFBSSxFQUFFO1FBQ1IsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtpQkFBTSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO1NBQ0Y7S0FDRjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQVcsRUFBRSxHQUFRO0lBQ3JELE9BQU87UUFDTCxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNuQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QyxDQUFDO0FBQ0osQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQWMsRUFBRSxJQUFhO0lBQzVELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUVuQixJQUFJLE9BQU8sRUFBRTtRQUNYLEtBQUssTUFBTSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDdEMsVUFBVSxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7S0FDRjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFZLEVBQUUsSUFBVTtJQUN4RCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFFbkIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvRDtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQVE7SUFDdEMsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsRSxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXR1cm5zIHRoZSBjb2x1bW5zIGJ5IHBpbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbHVtbnNCeVBpbihjb2xzOiBhbnlbXSkge1xuICBjb25zdCByZXQ6IHsgbGVmdDogYW55OyBjZW50ZXI6IGFueTsgcmlnaHQ6IGFueSB9ID0ge1xuICAgIGxlZnQ6IFtdLFxuICAgIGNlbnRlcjogW10sXG4gICAgcmlnaHQ6IFtdXG4gIH07XG5cbiAgaWYgKGNvbHMpIHtcbiAgICBmb3IgKGNvbnN0IGNvbCBvZiBjb2xzKSB7XG4gICAgICBpZiAoY29sLmZyb3plbkxlZnQpIHtcbiAgICAgICAgcmV0LmxlZnQucHVzaChjb2wpO1xuICAgICAgfSBlbHNlIGlmIChjb2wuZnJvemVuUmlnaHQpIHtcbiAgICAgICAgcmV0LnJpZ2h0LnB1c2goY29sKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5jZW50ZXIucHVzaChjb2wpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgd2lkdGhzIG9mIGFsbCBncm91cCBzZXRzIG9mIGEgY29sdW1uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2x1bW5Hcm91cFdpZHRocyhncm91cHM6IGFueSwgYWxsOiBhbnkpIHtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBjb2x1bW5Ub3RhbFdpZHRoKGdyb3Vwcy5sZWZ0KSxcbiAgICBjZW50ZXI6IGNvbHVtblRvdGFsV2lkdGgoZ3JvdXBzLmNlbnRlciksXG4gICAgcmlnaHQ6IGNvbHVtblRvdGFsV2lkdGgoZ3JvdXBzLnJpZ2h0KSxcbiAgICB0b3RhbDogTWF0aC5mbG9vcihjb2x1bW5Ub3RhbFdpZHRoKGFsbCkpXG4gIH07XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGNvbHVtbnMgYW5kIHRoZWlyIGdyb3Vwc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uVG90YWxXaWR0aChjb2x1bW5zOiBhbnlbXSwgcHJvcD86IHN0cmluZykge1xuICBsZXQgdG90YWxXaWR0aCA9IDA7XG5cbiAgaWYgKGNvbHVtbnMpIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1ucykge1xuICAgICAgY29uc3QgaGFzID0gcHJvcCAmJiBjW3Byb3BdO1xuICAgICAgY29uc3Qgd2lkdGggPSBoYXMgPyBjW3Byb3BdIDogYy53aWR0aDtcbiAgICAgIHRvdGFsV2lkdGggPSB0b3RhbFdpZHRoICsgcGFyc2VGbG9hdCh3aWR0aCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsV2lkdGg7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGNvbHVtbnMgYW5kIHRoZWlyIGdyb3Vwc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uc1RvdGFsV2lkdGgoY29sdW1uczogYW55LCBwcm9wPzogYW55KSB7XG4gIGxldCB0b3RhbFdpZHRoID0gMDtcblxuICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zKSB7XG4gICAgY29uc3QgaGFzID0gcHJvcCAmJiBjb2x1bW5bcHJvcF07XG4gICAgdG90YWxXaWR0aCA9IHRvdGFsV2lkdGggKyAoaGFzID8gY29sdW1uW3Byb3BdIDogY29sdW1uLndpZHRoKTtcbiAgfVxuXG4gIHJldHVybiB0b3RhbFdpZHRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uc0J5UGluQXJyKHZhbDogYW55KSB7XG4gIGNvbnN0IGNvbHNCeVBpbkFyciA9IFtdO1xuICBjb25zdCBjb2xzQnlQaW4gPSBjb2x1bW5zQnlQaW4odmFsKTtcblxuICBjb2xzQnlQaW5BcnIucHVzaCh7IHR5cGU6ICdsZWZ0JywgY29sdW1uczogY29sc0J5UGluWydsZWZ0J10gfSk7XG4gIGNvbHNCeVBpbkFyci5wdXNoKHsgdHlwZTogJ2NlbnRlcicsIGNvbHVtbnM6IGNvbHNCeVBpblsnY2VudGVyJ10gfSk7XG4gIGNvbHNCeVBpbkFyci5wdXNoKHsgdHlwZTogJ3JpZ2h0JywgY29sdW1uczogY29sc0J5UGluWydyaWdodCddIH0pO1xuXG4gIHJldHVybiBjb2xzQnlQaW5BcnI7XG59XG4iXX0=