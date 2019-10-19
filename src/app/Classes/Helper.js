class Helper {
  AddMinutes(time, minutesToAdd) {
    let result = '';
    let period = '';
    let hour = 0;
    let newMin = 0;

    const min = parseInt(
      time
        .split(':')[1]
        .replace('AM', '')
        .replace('PM', ''),
      10
    );

    const toAdd = parseInt(minutesToAdd.replace('min', ''), 10);

    if (min + toAdd >= 60) {
      hour = parseInt(time.split(':')[0], 10);
      if (hour === 12) hour = 1;
      else hour += 1;
      newMin = min + toAdd - 60;
    } else {
      hour = parseInt(time.split(':')[0], 10);
      newMin = min + toAdd;
    }

    if (time.indexOf('AM') === -1 && hour < 12) period = 'PM';
    else period = 'AM';

    result = `${hour.toString()}:${newMin.toString()}${period}`;

    return result;
  }
}

export default new Helper();
