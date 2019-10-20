import Helper from '../Classes/Helper';

class EventOrganizerBusiness {
  FormatInformation(information) {
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

  GetTotalTracks(newInformation) {
    const numbers = newInformation.map(item =>
      parseInt(item.time.replace('min', ''), 10)
    );

    const add = (a, b) => a + b;

    const sum = numbers.reduce(add);

    if(sum < 360) return 0;

    const result = sum / 360;

    return Math.trunc(result);
  }

  MakeTrackPeriod(lecturesInformation, maxMinOfPeriod) {
    let sum = 0;
    const result = [];

    for(let x = 0; x < lecturesInformation.length; x++){
      let aux = parseInt(lecturesInformation[x].time.replace('min', ''), 10) + sum;
      if(aux <= maxMinOfPeriod){
        sum = aux;
        result.push(lecturesInformation[x]);
      }
    }

    return result;
  }

  MakeTracks(information) {
    let result = [];
    const newInformation = this.FormatInformation(information);
    let tracks = [];
    const totalTracks = this.GetTotalTracks(newInformation);
    if(totalTracks === 0) return 0;
    let lectures = newInformation;

    let i = 1;
    while (i <= totalTracks) {
      let track = [];
      let trackFirstPeriod = this.MakeTrackPeriod(lectures, 180);
      lectures = lectures.filter(item => trackFirstPeriod.indexOf(item) === -1);
      let trackSecondPeriod = this.MakeTrackPeriod(lectures, 229);
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

      track = this.SetLecturesHour(track);

      tracks.push(track);

      i += 1;
    }

    tracks = this.CheckAndAjustHappyHour(tracks);

    for(let x = 0; x < tracks.length; x++){
      let data = this.FormatReturn(tracks[x]);
      result.push({
        title: `Track ${(x + 1).toString()}`,
        data,
      });
    }

    return result;
  }

  SetLecturesHour(track) {
    let schedule = '09:00AM';
    const result = track.map(item => {
      schedule = item.title !== 'Lunch' ? schedule : '12:00PM';
      item.schedule = schedule;
      schedule = Helper.AddMinutes(schedule, item.time);
      return item;
    });

    return result;
  }

  CheckAndAjustHappyHour(tracks){
    let lunchTime = [];
    tracks.forEach(track =>{
      track.forEach(lecture =>{
        let min = lecture.title === 'Networking Event' ? parseInt(lecture.schedule.split(':')[1].replace('PM', ''),10) : 0;
        if(min > 0) lunchTime.push(min);
      })
    })

    let min = Math.max(...lunchTime).toString();
    lunchTime = `16:${min}PM`;

    const result = tracks.map(track =>{
      return track.map(lecture =>{
        if(lecture.title === 'Networking Event')
          lecture.schedule = lunchTime
        return lecture;
      })
    })

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
