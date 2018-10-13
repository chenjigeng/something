;
function loopClone(obj) {
    var rootObj;
    var root = {
        parent: {},
        data: obj,
        key: undefined
    };
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
    }
    return rootObj;
}
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
// test
var obj = {
    a: 123,
    b: {
        a: 123,
        b: [1, 2, 3, {
                a: 123,
                b: [1, 2, 3],
                p: {
                    name: 'cjg'
                }
            }]
    }
};
console.log(loopClone(obj));
