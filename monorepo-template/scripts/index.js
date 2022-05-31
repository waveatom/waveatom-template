
let memo = new WeakMap()
function deepClone(obj) {
  if(obj == null) {
    return obj
  }
  
  if(obj instanceof Date) {
    return new Date(obj)
  }

  if(typeof obj !== 'object') {
    return obj
  } 


  let instance = new obj.constructor()

  if(memo.has(target)) {
    return memo.get(target)
  }

  memo.set(target, instance)

  for(let key in obj) {
    instance[key] = deepClone(obj[key])
  }


  return instance

}