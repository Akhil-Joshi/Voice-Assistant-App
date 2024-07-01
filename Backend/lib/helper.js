
const getBase64 = (file)=>{
    return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
}
export {getBase64}