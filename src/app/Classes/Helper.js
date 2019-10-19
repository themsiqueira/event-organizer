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

    period = this.SetPeriod(time, hour);

    result = `${hour.toString()}:${
      newMin === 0 ? (newMin = '00') : newMin.toString()
    }${period}`;

    return result;
  }

  SetPeriod(time, newTime) {
    let period = '';

    if (newTime === 12) {
      period = time.indexOf('PM') === -1 ? 'PM' : 'AM';
    } else {
      period = time.indexOf('PM') !== -1 ? 'PM' : 'AM';
    }
    return period;
  }
}

export default new Helper();
