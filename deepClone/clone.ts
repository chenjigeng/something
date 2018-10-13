interface stackEle {
  parent: Object | Array<any>,
  data: Object | Array<any>,
  key: string,
};

interface cacheItem {
  source: Object,
  target: Object,
};


function clone(obj) {
  let rootObj;
  
  const root:stackEle = {
    parent: {},
    data: obj,
    key: undefined,
  };
  
  const cacheArray: Array<cacheItem> = [];
  if (isArray(obj)) {
    rootObj = [];
  } else if (isObject(obj)) {
    rootObj = {};
  } else {
    console.error('传入的并非对象');
    return;
  }
  root.parent = rootObj;

  const stack:Array<stackEle>= [root];

  while (stack.length) {
    const obj = stack.pop();

    const { data, parent, key } = obj;
    
    let res;

    if (find(cacheArray, data)) {
      parent[key] = find(cacheArray, data);
      break;
    }

    if (isArray(data)) {
      if (key) {
        obj.parent[key] = [];
      }
      res = (key ? parent[key] : parent);
      for (let index in data) {
        if (typeof data[index] === 'object') {
          stack.push({
            parent: res,
            key: index,
            data: data[index],
          });
        } else {
          res[index] = data[index];
        }
      }
    } else if (isObject(data)) {
      if (key) {
        parent[key] = {};
      }
      res = (key ? parent[key] : parent);
      for (let key in data) {
        if ((data.hasOwnProperty(key))) {
          if (typeof data[key] === 'object') {
            stack.push({
              parent: res,
              key,
              data: data[key],
            });
          } else {
            res[key] = data[key];
          }
        }
      }
    } else {
      obj.parent[key] = obj.data;
      break;
    }
    cacheArray.push({
      source: data,
      target: res,
    });
  }

  return rootObj;
}

function find(source: Array<cacheItem>, obj: Object):Object {
  for (let i = 0; i < source.length; i++) {
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
const obj1:any = {
  a: 1,
}

obj1.obj1 = obj1;

const p = clone(obj1);
console.log(p);
// 重复引用
const cjg = {
  name: 'cjg',
  age: 22,
};

const repeatRef = {
  a: cjg,
  b: cjg,
};

const result = clone(repeatRef);

console.log(result.a === result.b);