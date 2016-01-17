export function buildImageURL(fileName) {
    return `/image/${encodeURIComponent(fileName)}`;
}
