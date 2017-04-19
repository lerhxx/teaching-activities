/*
 * @method isEmpty: 判断对象是否为空
 * @param {Object || Array} obj: 需判断是否为空的对象
 * @return {Boolean}
 */
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
/*
 * @method deepCopy: 深复制对象
 * @param {Object || Array} obj: 需判断是否为空的对象
 * @return {Boolean}
 */
export function deepCopy(obj) {
    if(Object.prototype.isPrototypeOf(obj)) {
        let newObj = {};
        for(let k in obj) {
            newObj[k] = deepCopy(obj[k]);
        }
        return newObj;
    }else if (Array.prototype.isPrototypeOf(obj)) {
        let newArray = [];
        for(let v of obj) {
            newArray.push(deepCopy(v));
        }
        return newArray;
    }else {
        return obj;
    }
}