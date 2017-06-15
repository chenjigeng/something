// setTimeout(function() {
//   console.log('1')
//   Promise
//     .resolve()
//     .then(function() {
//       console.log(8)
//     })
//     .then(function() {
//       console.log(9)
//     })
// }, 0);
// setTimeout(function() {
//   console.log(2)
// }, 0);

// new Promise(function(resolve, reject) {
//   console.log(3)
//   for (var i = 0; i < 100; i++) {
//   }
//   console.log(4)
//   resolve()
// }).then(function() {
//   console.log(5)
// }).then(function() {
//   console.log(6)
// })

// console.log(7)

const tasks = []

// for (var i = 0; i < 5; i++) {
//   tasks.push(new Promise(function(resolve) {
//     setTimeout((function(i) {
//       return function() {
//         console.log(i)
//         resolve()
//       }
//     })(i), 1000*i)
//   }))
// }

// Promise.all(tasks)
//   .then(function() {
//     setTimeout(function() {
//       console.log(5)
//     }, 1000)
//   })

// function sleep(time) {
//   return new Promise((resolve) => {
//     setTimeout(function() {
//       console.log('11')
//       resolve()
//     }, time)
//   })
  
// }

// (async function() {
//   for (let i = 0; i < 5; i++) {
//     await sleep(1000)
//     console.log(i)
//   }
//   await sleep(1000)
//   console.log(5)
// })()

// let start = new Date()
// setTimeout(function() {
//   console.log('timeout')
// }, 1000)
// setInterval(function() {
//   console.log('interval')
// }, 1000)
// setTimeout(function() {
//   console.log('timeout')
// }, 1000)
// for (; +start + 3000 > + (new Date()); ) {

// }
// console.log('hhh')

console.log(1)
setTimeout(function() {
  console.log(2)
}, 0);
const intervalId = setInterval(function() {
  console.log(3)
}, 0)
setTimeout(function() {
  console.log(10)
  new Promise(function(resolve) {
    console.log(11)
    resolve()
  })
  .then(function() {
    console.log(12)
  })
  .then(function() {
    console.log(13)
    clearInterval(intervalId)
  })
}, 0);

Promise.resolve()
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
console.log(9)