function getYear(d: Date): string {
  const _d = d || new Date();
  return _d.getFullYear() + '';
}
function getMonth(d: Date) {
  const _d = d || new Date();
  return _d.getMonth() + 1 + '';
}

function getDay(d: Date) {
  const _d = d || new Date();
  return _d.getDay() + '';
}

export function getYearAndMonthAndDay(connect = '-') {
  const d = new Date();

  return getYear(d) + connect + getMonth(d) + connect + getDay(d);
}

//获取当前日期函数
export function getNowFormatDate() {
  const date = new Date();
  const year = date.getFullYear(); //获取完整的年份(4位)
  let month: number | string = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  let strDate: number | string = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`;
}
