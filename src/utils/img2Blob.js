// Image to BLOB Converter
export default async function img2Blob(photo){
    const res = await fetch(photo.uri);
    const blob = await res.blob();
    const filename = photo.uri.substring(photo.uri.lastIndexOf("/") + 1);
    return [blob, filename];
}