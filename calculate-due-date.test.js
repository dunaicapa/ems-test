const CalculateDueDate = require('./calculate-due-date')
const WORK_HOURS_PER_DAY = 8

test('Invalid starDate param', () => {
  const call = () => {
    CalculateDueDate("asd", 1)
  }
  expect(call).toThrow(TypeError)
})

test('Invalid turnaround param', () => {
  const call = () => {
    CalculateDueDate(new Date('Jul 01 2018 16:39:54 GMT+0200'), "asd")
  }
  expect(call).toThrow(TypeError)
})

test('Invalid start date - holiday', () => {
  const call = () => {
    CalculateDueDate(new Date('Jul 01 2018 16:39:54 GMT+0200'), 1)
  }
  expect(call).toThrow(RangeError)
})

test('Invalid start date - after workhour', () => {
  const call = () => {
    CalculateDueDate(new Date('Jul 01 2018 20:39:54 GMT+0200'), 1)
  }
  expect(call).toThrow(RangeError)
})

test('1hour - start of the day', () => {
  let start = new Date('Jul 02 2018 09:00:00 GMT+0200')
  let due = new Date('Jul 02 2018 10:00:00 GMT+0200')
  expect(+CalculateDueDate(start, 1)).toBe(+due)
})

test('1hour - middle of the day', () => {
  let start = new Date('Jul 02 2018 11:15:36 GMT+0200')
  let due = new Date('Jul 02 2018 12:15:36 GMT+0200')
  expect(+CalculateDueDate(start, 1)).toBe(+due)
})

test('1hour - end of the day', () => {
  let start = new Date('Jul 02 2018 16:00:00 GMT+0200')
  let due = new Date('Jul 02 2018 17:00:00 GMT+0200')
  expect(+CalculateDueDate(start, 1)).toBe(+due)
})

test('1hour - to next day', () => {
  let start = new Date('Jul 02 2018 16:15:36 GMT+0200')
  let due = new Date('Jul 03 2018 09:15:36 GMT+0200')
  expect(+CalculateDueDate(start, 1)).toBe(+due)
})

test('16 hours - from emarsys description', () => {
  let start = new Date('Jul 03 2018 14:12:00 GMT+0200')
  let due = new Date('Jul 05 2018 14:12:00 GMT+0200')
  expect(+CalculateDueDate(start, WORK_HOURS_PER_DAY*2)).toBe(+due)
})

test('4 workdays - thru a weekend', () => {
  let start = new Date('Jul 03 2018 14:12:00 GMT+0200')
  let due = new Date('Jul 09 2018 14:12:00 GMT+0200')
  expect(+CalculateDueDate(start, WORK_HOURS_PER_DAY*4)).toBe(+due)
})

test('10days - thru 2 weekends', () => {
  let start = new Date('Jul 03 2018 14:12:00 GMT+0200')
  let due = new Date('Jul 17 2018 14:12:00 GMT+0200')
  expect(+CalculateDueDate(start, WORK_HOURS_PER_DAY*10)).toBe(+due)
})
