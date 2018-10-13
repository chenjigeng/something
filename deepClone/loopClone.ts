interface stachEle {
  parent: Object | Array<any>,
  data: Object | Array<any>,
  key: string,
};


function loopClone(obj) {
  let rootObj;
  const root:stachEle = {
    parent: {},
    data: obj,
    key: undefined,
  };
  if (isArray(obj)) {
    rootObj = [];
  } else if (isObject(obj)) {
    rootObj = {};
  } else {
    console.error('传入的并非对象');
    return;
  }
  root.parent = rootObj;

  const stack:Array<stachEle>= [root];

  while (stack.length) {
    const obj = stack.pop();

    const { data, parent, key } = obj;
    
    let res;

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
const obj = {
  a: 123,
  b: {
    a: 123,
    b: [1,2,3, {
      a: 123,
      b: [1,2,3],
      p: {
        name: 'cjg',
      }
    }],
  }
}

console.log(loopClone(obj));