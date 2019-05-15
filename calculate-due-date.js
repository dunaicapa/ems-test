const
  [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY] = [1, 2, 3, 4, 5, 6, 0],
  WORKDAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY],
  MS = 1000, MINUTE_MS = MS * 60, HOUR_MS = MINUTE_MS * 60,
  WORKDAY_START_MS = HOUR_MS * 9,
  WORKDAY_END_MS = HOUR_MS * 17

function getDayStart (date) {
  return +(new Date(+date).setHours(0, 0, 0, 0))
}

function getWorkDayStart (date) {
  return getDayStart(date) + WORKDAY_START_MS
}

function getWorkDayEnd (date) {
  return getDayStart(date) + WORKDAY_END_MS
}

function isWorkHour (date) {
  return date >= getWorkDayStart(date) && date <= getWorkDayEnd(date)
}

function isWorkDay (date) {
  return WORKDAYS.indexOf(date.getDay()) !== -1
}

function isWorkTime (date) {
  return isWorkDay(date) && isWorkHour(date)
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function calculateDueDate (submitDate, turnaroundHours) {
  let workedHours = 0
  let iterateDate = new Date(+submitDate)

  while (workedHours < turnaroundHours) {
    iterateDate = new Date(+iterateDate + HOUR_MS)
    if(isWorkTime(iterateDate)) {
      workedHours++
    }
  }

  return iterateDate
}

/**
 * @param submitDate Date - date of ticket submission
 * @param turnaroundHours Integer - work hours
 */
function calculate (submitDate, turnaroundHours) {
  if (!(submitDate instanceof Date)) {
    throw new TypeError(`submitDate param must be type of Date`)
  }
  if (!isNumeric(turnaroundHours) || turnaroundHours < 1) {
    throw new TypeError(`Turnaround hour must be a positive integer`)
  }
  if (!isWorkTime(submitDate)) {
    throw new RangeError(`Can't submit report to this time`)
  }
  return calculateDueDate(submitDate, turnaroundHours)
}

module.exports = calculate
