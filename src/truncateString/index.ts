// TruncateString
export function truncateString(str: string, length: number, ellipsis: string = '...'): string {
    if (str.length <= length) {
        return str;
    }
    return str.slice(0, length) + ellipsis;
}