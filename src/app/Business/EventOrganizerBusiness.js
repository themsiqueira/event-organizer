import Helper from '../Classes/Helper';

class EventOrganizerBusiness
{
  makeTracks(information)
  {
    let result = [];
    const newInformation = this.formatInformation(information);
    let tracks = [];
    const totalTracks = this.getTotalTracksAndDurationTime(newInformation);
    if(totalTracks === 0) return 0;
    let lectures = newInformation;

    let i = 1;
    while (i <= totalTracks.numTracks)
    {
      let track = [];
      let trackFirstPeriod = this.makeTrackPeriod(lectures, 180);
      lectures = lectures.filter(item => trackFirstPeriod.indexOf(item) === -1);
      let trackSecondPeriod = this.makeTrackPeriod(lectures, (totalTracks.minOfEachTrack - 180));
      lectures = lectures.filter(item => trackSecondPeriod.indexOf(item) === -1);
      trackFirstPeriod.push({
        time: '60min',
        title: 'Lunch',
        schedule: '',
      });
      trackSecondPeriod.push({
        time: '60min',
        title: 'Networking Event',
        schedule: '',
      });
      track = trackFirstPeriod.concat(trackSecondPeriod);
      track = this.setStartTimeToAllEventsInTrack(track);
      tracks.push(track);
      i += 1;
    }

    for(let x = 0; x < tracks.length; x++)
    {
      let data = this.formatReturn(tracks[x]);
      result.push({
        title: `Track ${(x + 1).toString()}`,
        data,
      });
    }

    return result;
  }

  formatInformation(information)
  {
    const newInformation = [];
    information.forEach(item => {
      const data = item.split(' ');
      if (data[data.length - 1] === 'lightning')
      {
        const time = '5min';
        const title = item.replace(' lightning', '');
        const schedule = '';
        newInformation.push({
          time,
          title,
          schedule,
        });
      }
      else
      {
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

  getTotalTracksAndDurationTime(newInformation)
  {
    const numbers = newInformation.map(item =>
      parseInt(item.time.replace('min', ''), 10)
    );
    const add = (a, b) => a + b;
    const sum = numbers.reduce(add);
    if(sum < 360)
    {
      return 0;
    }
    let checkTracks;
    let totalMinOfTrack = 360;
    let result = 0;
    while(checkTracks !== 0 && totalMinOfTrack <= 420)
    {
      checkTracks = sum % totalMinOfTrack;
      if(checkTracks === 0)
      {
        result = sum / totalMinOfTrack;
        break;
      }
      totalMinOfTrack += 5;
    }

    if(result === 0)
    {
      result = 1;
      totalMinOfTrack = sum > 420 ? 420 : sum;
    }

    return { numTracks: Math.trunc(result), minOfEachTrack: totalMinOfTrack};
  }

  makeTrackPeriod(lecturesInformation, maxMinOfPeriod) {
    let sum = 0;
    const result = [];

    for(let x = 0; x < lecturesInformation.length; x++)
    {
      let aux = parseInt(lecturesInformation[x].time.replace('min', ''), 10) + sum;
      if(aux <= maxMinOfPeriod)
      {
        sum = aux;
        result.push(lecturesInformation[x]);
      }
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

  formatReturn(track) {
    const result = track.map(item => {
      return `${item.schedule} ${item.title} ${item.time}`;
    });

    return result;
  }
}

export default new EventOrganizerBusiness();
