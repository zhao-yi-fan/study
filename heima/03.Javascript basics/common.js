/**
 * 获取指定格式的日期
 * @param dt 日期的对象
 * @returns {string}
 */
function getDate(dt){
    var year = dt.getFullYear();
    var month = dt.getMonth();
    var day = dt.getDate();
    var hours = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    month = year<10?"0"+month:month;
    day = day<10?"0"+day:day;
    hours = hours<10?"0"+hours:hours;
    minute = minute<10?"0"+minute:minute;
    second = second<10? "0"+second: second;
    return year+"年"+month+"月"+day+"日"+hours+":"+minute+":"+second;
}