export const createId = ()=>{
    return Number(Date.now().toString().slice(-2,-1) + Math.floor(Math.random() * (99 - 10 + 1)) + 10);
}

// Round to neares .25
export const roundTo_25 = (number:number)=>{
    return Number((Math.round(number * 4) / 4).toFixed(2))
}