import { parseISO, addMinutes, format } from 'date-fns';

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
    while (i !== totalTracks) {
      let track = [];
      const trackFirstPeriod = this.MakeTrackPeriod(lectures);
      trackFirstPeriod.push({
        time: '60min',
        title: 'Lunch',
        schedule: '',
      });
      track.push(trackFirstPeriod);
      lectures = lectures.filter(item => trackFirstPeriod.indexOf(item) === -1);
      const trackSecondPeriod = this.MakeTrackPeriod(lectures);
      trackSecondPeriod.push({
        time: '60min',
        title: 'Networking Event',
        schedule: '',
      });
      track.push(trackSecondPeriod);

      track = this.SetLecturesHour(track);

      result.push({
        title: `Track ${i.toString()}`,
        data: track,
      });

      i += 1;
    }
  }

  SetLecturesHour(track) {
    let date = format(parseISO('2019-10-18T9:00AM'), [
      (format = 'YYYY-MM-DDTHH:mm.A'),
    ]);

    const result = track.map(item => {
      item.schedule = date;
      date = addMinutes(date, parseInt(item.time.replace('min', ''), 10));
      return item;
    });

    return result;
  }
}

export default new EventOrganizerBusiness();
