
const CalculateDueDate = require('./calculate-due-date')

let submitDate = new Date('Jul 04 2018 17:00:00 GMT+0200')
let turnaroundTime = 9
let calculated = CalculateDueDate(submitDate, turnaroundTime)
// should be Thu Jul 05 2018 10:00:01 GMT+0200 (Central Europe Daylight Time)

console.clear()
console.log(calculated.toString())
