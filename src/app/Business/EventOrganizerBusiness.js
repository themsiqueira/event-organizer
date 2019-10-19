import Helper from '../Classes/Helper';

class EventOrganizerBusiness {
  FormatInformation(information) {
    const newInformation = [];
    information.forEach(item => {
      const data = item.split(' ');

      if (data[data.length - 1] === 'lightning') {
        const time = '5min';

        const title = item.replace('lightning', '');

        const schedule = '';

        newInformation.push({
          time,
          title,
          schedule,
        });
      } else {
        const time = data[data.length - 1];

        const title = item.replace(time, '');

        const schedule = '';

        newInformation.push({
          time,
          title,
          schedule,
        });
      }
    });

    return newInformation;
  }

  GetTotalTracks(newInformation) {
    const numbers = newInformation.map(item =>
      parseInt(item.time.replace('min', ''), 10)
    );

    const add = (a, b) => a + b;

    const sum = numbers.reduce(add);

    const result = sum / 360;

    return result;
  }

  MakeTrackPeriod(lecturesInformation) {
    let sum = 0;
    const result = lecturesInformation.filter(item => {
      sum = parseInt(item.time.replace('min', ''), 10) + sum;
      return sum <= 180 ? item : null;
    });

    return result;
  }

  async MakeTracks(information) {
    const result = [];
    const newInformation = this.FormatInformation(information);

    const totalTracks = this.GetTotalTracks(newInformation);

    let lectures = newInformation;

    let i = 1;
    while (i <= totalTracks) {
      let track = [];
      const trackFirstPeriod = this.MakeTrackPeriod(lectures);
      trackFirstPeriod.push({
        time: '60min',
        title: 'Lunch',
        schedule: '',
      });
      lectures = lectures.filter(item => trackFirstPeriod.indexOf(item) === -1);
      const trackSecondPeriod = this.MakeTrackPeriod(lectures);
      trackSecondPeriod.push({
        time: '60min',
        title: 'Networking Event',
        schedule: '',
      });

      track = trackFirstPeriod.concat(trackSecondPeriod);

      track = this.SetLecturesHour(track);

      track = this.FormatReturn(track);

      result.push({
        title: `Track ${i.toString()}`,
        data: track,
      });

      i += 1;
    }

    return result;
  }

  SetLecturesHour(track) {
    let schedule = '09:00AM';
    const result = track.map(item => {
      item.schedule = schedule;
      schedule = Helper.AddMinutes(schedule, item.time);
      return item;
    });

    return result;
  }

  FormatReturn(track) {
    const result = track.map(item => {
      return `${item.schedule} ${item.title} ${item.time}`;
    });

    return result;
  }
}

export default new EventOrganizerBusiness();
