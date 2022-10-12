export const decodeString = (str) => {
    return decodeURIComponent(str)
}

export const decodeObject = (obj) => {
  let tempObj = {}
  for (const property in obj) {
    const value = obj[property]

    if (typeof value === 'string')
      tempObj[property] = decodeString(value)
    else if(typeof value === 'object' && !Array.isArray(value))
      tempObj[property] = decodeObject(obj[property])
    else if(typeof value === 'object' && Array.isArray(value))
      tempObj[property] = value.map(str => decodeString(str))
    else
      tempObj[property] = value
  }
  return tempObj
}

export const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}