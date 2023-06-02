function getYear(d: Date): string {
  const _d = d || new Date();
  return _d.getFullYear() + '';
}
function getMonth(d: Date) {
  const _d = d || new Date();
  return _d.getMonth() + '';
}

function getDay(d: Date) {
  const _d = d || new Date();
  return _d.getDay() + '';
}

export function getYearAndMonthAndDay(connect = '-') {
  const d = new Date();

  return getYear(d) + connect + getMonth(d) + connect + getDay(d);
}
