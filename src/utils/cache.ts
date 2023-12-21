
const material = 'material';
const asset = 'asset';

export function getMaterialCacheKey(id?:string) {
    if (id) return material + '-' + id

    return material
}
export function getAssetCacheKey(id?:string) {
    if (id) return asset + '-' + id

    return asset
}