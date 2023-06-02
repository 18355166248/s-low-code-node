function getYear(d: Date): string {
  const _d = d || new Date();
  return _d.getFullYear() + '';
}
function getMonth(d: Date) {
  const _d = d || new Date();
  return _d.getMonth() + '';
}

export function getYearAndMonth(connect = '-') {
  const d = new Date();

  return getYear(d) + connect + getMonth(d);
}
