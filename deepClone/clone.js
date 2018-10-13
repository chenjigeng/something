;
;
function clone(obj) {
    var rootObj;
    var root = {
        parent: {},
        data: obj,
        key: undefined
    };
    var cacheArray = [];
    if (isArray(obj)) {
        rootObj = [];
    }
    else if (isObject(obj)) {
        rootObj = {};
    }
    else {
        console.error('传入的并非对象');
        return;
    }
    root.parent = rootObj;
    var stack = [root];
    while (stack.length) {
        var obj_1 = stack.pop();
        var data = obj_1.data, parent_1 = obj_1.parent, key = obj_1.key;
        var res = void 0;
        if (find(cacheArray, data)) {
            parent_1[key] = find(cacheArray, data);
            break;
        }
        if (isArray(data)) {
            if (key) {
                obj_1.parent[key] = [];
            }
            res = (key ? parent_1[key] : parent_1);
            for (var index in data) {
                if (typeof data[index] === 'object') {
                    stack.push({
                        parent: res,
                        key: index,
                        data: data[index]
                    });
                }
                else {
                    res[index] = data[index];
                }
            }
        }
        else if (isObject(data)) {
            if (key) {
                parent_1[key] = {};
            }
            res = (key ? parent_1[key] : parent_1);
            for (var key_1 in data) {
                if ((data.hasOwnProperty(key_1))) {
                    if (typeof data[key_1] === 'object') {
                        stack.push({
                            parent: res,
                            key: key_1,
                            data: data[key_1]
                        });
                    }
                    else {
                        res[key_1] = data[key_1];
                    }
                }
            }
        }
        else {
            obj_1.parent[key] = obj_1.data;
            break;
        }
        cacheArray.push({
            source: data,
            target: res
        });
    }
    return rootObj;
}
function find(source, obj) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].source === obj) {
            return source[i].target;
        }
    }
    return null;
}
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// test
// 循环引用
var obj1 = {
    a: 1
};
obj1.obj1 = obj1;
var p = clone(obj1);
console.log(p);
// 重复引用
var cjg = {
    name: 'cjg',
    age: 22
};
var repeatRef = {
    a: cjg,
    b: cjg
};
var result = clone(repeatRef);
console.log(result.a === result.b);
