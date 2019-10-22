import Helper from '../Classes/Helper';

class EventOrganizerBusiness {
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
    const sum = this.getTotalMinLectures(newInformation);

    if (sum < 360) {
      return 0;
    }
    let checkTracks = -1;
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
      const min = sum % 420;
      result = sum > 420 ? (sum - min) / 420 : sum;
      totalMinOfTrack = sum > 420 ? 420 : sum;
    }

    return { numTracks: Math.trunc(result), minOfEachTrack: totalMinOfTrack };
  }

  getTotalMinLectures(newInformation) {
    const numbers = newInformation.map(item =>
      parseInt(item.time.replace('min', ''), 10)
    );
    const add = (a, b) => a + b;
    const sum = numbers.reduce(add);

    return sum;
  }

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

      track = this.joinPeriodsToMakeATrack(trackFirstPeriod, trackSecondPeriod);
      tracks.push(track);
    }

    const result = this.verifyAndIfNeedMakeTracksAgain(
      tracks,
      newInformation,
      totalTracks
    );
    return result;
  }

  makeTrackPeriod(lecturesInformation, minutesOfPeriod) {
    let sum = 0;
    let result;
    let count = 0;

    while (sum !== minutesOfPeriod) {
      result = [];
      for (let x = count; x < lecturesInformation.length; x++) {
        const aux =
          parseInt(lecturesInformation[x].time.replace('min', ''), 10) + sum;
        if (aux <= minutesOfPeriod) {
          sum = aux;
          result.push(lecturesInformation[x]);
          if (sum === minutesOfPeriod) {
            break;
          }
        }
      }
      if (sum === minutesOfPeriod) {
        break;
      }
      sum = 0;
      count += 1;
      if (count >= lecturesInformation.length) {
        break;
      }
    }

    return result;
  }

  joinPeriodsToMakeATrack(trackFirstPeriod, trackSecondPeriod) {
    trackFirstPeriod.push(this.getInterval('first'));
    trackSecondPeriod.push(this.getInterval('second'));
    let track = trackFirstPeriod.concat(trackSecondPeriod);
    track = this.setStartTimeToAllEventsInTrack(track);

    return track;
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

  verifyAndIfNeedMakeTracksAgain(tracks, newInformation, totalTracks) {
    let result = tracks;

    if (!this.checkTracks(result)) {
      const newTotalTracks = this.setNewTotalTracks(totalTracks);
      result = this.makeTracks(newInformation, newTotalTracks);
    } else {
      result = this.formatReturn(result);
    }

    return result;
  }

  checkTracks(tracks) {
    const allEqual = arr => arr.every(v => v === arr[0]);
    const arraySum = this.getTotalMinOfAllTracks(tracks);
    let result = true;

    arraySum.forEach(item => {
      if (item < 420) {
        result = false;
      }
    });

    if (result) {
      result = allEqual(arraySum);
    }

    return result;
  }

  getTotalMinOfAllTracks(tracks) {
    const arraySum = [];
    let sum = 0;

    tracks.forEach(track => {
      track.forEach(lectures => {
        sum = parseInt(lectures.time.replace('min', ''), 10) + sum;
      });
      arraySum.push(sum);
      sum = 0;
    });

    return arraySum;
  }

  setNewTotalTracks(totalTracks) {
    const numTracks = totalTracks.numTracks - 1;
    const minOfEachTrack = 420;

    return { numTracks, minOfEachTrack };
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
