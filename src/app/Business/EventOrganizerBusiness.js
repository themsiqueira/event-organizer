import Helper from '../Classes/Helper';

class EventOrganizerBusiness {
  makeTracks(newInformation, totalTracks) {
    const tracks = [];
    let lectures = newInformation;

    for (let i = 1; i <= totalTracks.numTracks; i++) {
      let track = [];
      const trackFirstPeriod = this.makeTrackPeriod(lectures, 180);
      lectures = lectures.filter(item => trackFirstPeriod.indexOf(item) === -1);
      const trackSecondPeriod = this.makeTrackPeriod(
        lectures,
        totalTracks.minOfEachTrack - 180
      );
      lectures = lectures.filter(
        item => trackSecondPeriod.indexOf(item) === -1
      );

      trackFirstPeriod.push(this.getInterval('first'));
      trackSecondPeriod.push(this.getInterval('second'));
      track = trackFirstPeriod.concat(trackSecondPeriod);
      track = this.setStartTimeToAllEventsInTrack(track);
      tracks.push(track);
    }

    const result = this.verifyAndIfNeedMakeTracksAgain(tracks, newInformation);
    return result;
  }

  formatInformation(information) {
    const newInformation = [];
    information.forEach(item => {
      const data = item.split(' ');
      if (data[data.length - 1] === 'lightning') {
        const time = '5min';
        const title = item.replace(' lightning', '');
        const schedule = '';
        newInformation.push({
          time,
          title,
          schedule,
        });
      } else {
        const time = data[data.length - 1];
        const title = item.replace(` ${time}`, '');
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

  getTotalTracksAndDurationTime(newInformation) {
    const numbers = newInformation.map(item =>
      parseInt(item.time.replace('min', ''), 10)
    );
    const add = (a, b) => a + b;
    const sum = numbers.reduce(add);
    if (sum < 360) {
      return 0;
    }
    let checkTracks;
    let totalMinOfTrack = 360;
    let result = 0;
    while (checkTracks !== 0 && totalMinOfTrack <= 420) {
      checkTracks = sum % totalMinOfTrack;
      if (checkTracks === 0) {
        result = sum / totalMinOfTrack;
        break;
      }
      totalMinOfTrack += 5;
    }

    if (result === 0) {
      result = 1;
      totalMinOfTrack = sum > 420 ? 420 : sum;
    }

    return { numTracks: Math.trunc(result), minOfEachTrack: totalMinOfTrack };
  }

  makeTrackPeriod(lecturesInformation, maxMinOfPeriod) {
    let sum = 0;
    const result = [];

    for (let x = 0; x < lecturesInformation.length; x++) {
      const aux =
        parseInt(lecturesInformation[x].time.replace('min', ''), 10) + sum;
      if (aux <= maxMinOfPeriod) {
        sum = aux;
        result.push(lecturesInformation[x]);
      }
    }
    return result;
  }

  getInterval(period) {
    let result;
    if (period === 'first') {
      result = {
        time: '60min',
        title: 'Lunch',
        schedule: '',
      };
    } else if (period === 'second') {
      result = {
        time: '60min',
        title: 'Networking Event',
        schedule: '',
      };
    }
    return result;
  }

  setStartTimeToAllEventsInTrack(track) {
    let schedule = '09:00AM';
    const result = track.map(item => {
      schedule = item.title !== 'Lunch' ? schedule : '12:00PM';
      item.schedule = schedule;
      schedule = Helper.addMinutes(schedule, item.time);
      return item;
    });

    return result;
  }

  verifyAndIfNeedMakeTracksAgain(tracks, newInformation) {
    let result;
    if (tracks.length < 1) {
      if (!this.checkTracks(tracks)) {
        const newTotalTracks = { numTracks: 1, minOfEachTrack: 420 };
        result = this.makeTracks(newInformation, newTotalTracks);
      }
    } else {
      result = this.formatReturn(tracks);
    }
    return result;
  }

  checkTracks(tracks) {
    const arraySum = [];
    let sum = 0;
    tracks.forEach(track => {
      track.forEach(lectures => {
        sum = parseInt(lectures.time.replace('min', ''), 10) + sum;
      });
      arraySum.push(sum);
      sum = 0;
    });

    const allEqual = arr => arr.every(v => v === arr[0]);
    allEqual(arraySum);

    return allEqual;
  }

  formatReturn(tracks) {
    const result = [];
    for (let x = 0; x < tracks.length; x++) {
      const data = tracks[x].map(item => {
        return `${item.schedule} ${item.title} ${
          item.time === '5min' ? 'ligthning' : item.time
        }`;
      });
      result.push({
        title: `Track ${(x + 1).toString()}`,
        data,
      });
    }
    return result;
  }
}

export default new EventOrganizerBusiness();
