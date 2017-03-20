export function isEmpty(obj) {
    // 判断数组或对象是否为空
    if(!obj) {
        return true;
    }

    if(Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
        return true;
    }

    if(Object.prototype.isPrototypeOf(obj)) {
        if(Object.keys(obj).length === 0) {
            return true;
        }else {
            for(let k in obj) {
                return false;
            }
        }
        return true;
    }

    return false;
}