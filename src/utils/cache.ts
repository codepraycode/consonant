
const material = 'material';
const asset = 'asset';
const course = 'course';

export function getMaterialCacheKey(id?:string) {
    if (id) return material + '-' + id

    return material
}
export function getAssetCacheKey(id?:string) {
    if (id) return asset + '-' + id

    return asset
}
export function getCourseCacheKey(id?:string) {
    if (id) return course + '-' + id

    return course
}