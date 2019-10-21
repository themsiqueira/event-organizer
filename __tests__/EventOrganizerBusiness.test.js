import EventOrganizerBusiness from '../src/app/Business/EventOrganizerBusiness';

test('verify if format data to a correct structure', () => {
  expect(
    EventOrganizerBusiness.formatInformation([
      'Writing Fast Tests Against Enterprise Rails 60min',
      'Overdoing it in Python 45min',
    ])
  ).toEqual([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '',
    },
    {
      time: '45min',
      title: 'Overdoing it in Python',
      schedule: '',
    },
  ]);
});

test('verify if was send lectures suficient to make at least one track', () => {
  expect(
    EventOrganizerBusiness.getTotalTracksAndDurationTime([
      {
        time: '60min',
        title: 'Writing Fast Tests Against Enterprise Rails',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Overdoing it in Python',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Lua for the Masses',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Common Ruby Errors',
        schedule: '',
      },
    ])
  ).toEqual(0);
});

test('If have received lectures to fill a half track, you should fill as much as you can with the full track.', () => {
  expect(
    EventOrganizerBusiness.getTotalTracksAndDurationTime([
      {
        time: '60min',
        title: 'Writing Fast Tests Against Enterprise Rails',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Overdoing it in Python',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Lua for the Masses',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Common Ruby Errors',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Rails for Python Developers',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Rails',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Communicating Over Distance',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Distance',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Communicating Over',
        schedule: '',
      },
    ])
  ).toEqual({
    numTracks: 1,
    minOfEachTrack: 420,
  });
});

test('verify total tracks should be done and time for track by passed a data', () => {
  expect(
    EventOrganizerBusiness.getTotalTracksAndDurationTime([
      {
        time: '60min',
        title: 'Writing Fast Tests Against Enterprise Rails',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Overdoing it in Python',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Lua for the Masses',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Common Ruby Errors',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Rails for Python Developers',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Communicating Over Distance',
        schedule: '',
      },
    ])
  ).toEqual({
    numTracks: 1,
    minOfEachTrack: 360,
  });
});

test('check lectures and return schedule for time that was send', () => {
  expect(
    EventOrganizerBusiness.makeTrackPeriod(
      [
        {
          time: '60min',
          title: 'Writing Fast Tests Against Enterprise Rails',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Overdoing it in Python',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Lua for the Masses',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Common Ruby Errors',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Rails for Python Developers',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Communicating Over Distance',
          schedule: '',
        },
      ],
      180
    )
  ).toEqual([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '',
    },
    {
      time: '60min',
      title: 'Overdoing it in Python',
      schedule: '',
    },
    {
      time: '60min',
      title: 'Lua for the Masses',
      schedule: '',
    },
  ]);
});

test('Set appointment hour to all lectures, lunch and Networking Event', () => {
  expect(
    EventOrganizerBusiness.setStartTimeToAllEventsInTrack([
      {
        time: '60min',
        title: 'Writing Fast Tests Against Enterprise Rails',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Overdoing it in Python',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Lua for the Masses',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Lunch',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Common Ruby Errors',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Rails for Python Developers',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Communicating Over Distance',
        schedule: '',
      },
      {
        time: '60min',
        title: 'Networking Event',
        schedule: '',
      },
    ])
  ).toEqual([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '09:00AM',
    },
    {
      time: '60min',
      title: 'Overdoing it in Python',
      schedule: '10:00AM',
    },
    {
      time: '60min',
      title: 'Lua for the Masses',
      schedule: '11:00AM',
    },
    {
      time: '60min',
      title: 'Lunch',
      schedule: '12:00PM',
    },
    {
      time: '60min',
      title: 'Common Ruby Errors',
      schedule: '01:00PM',
    },
    {
      time: '60min',
      title: 'Rails for Python Developers',
      schedule: '02:00PM',
    },
    {
      time: '60min',
      title: 'Communicating Over Distance',
      schedule: '03:00PM',
    },
    {
      time: '60min',
      title: 'Networking Event',
      schedule: '04:00PM',
    },
  ]);
});

test('Format return to expected', () => {
  expect(
    EventOrganizerBusiness.formatReturn([
      [
        {
          time: '60min',
          title: 'Writing Fast Tests Against Enterprise Rails',
          schedule: '09:00AM',
        },
        {
          time: '60min',
          title: 'Overdoing it in Python',
          schedule: '10:00AM',
        },
        {
          time: '60min',
          title: 'Lua for the Masses',
          schedule: '11:00AM',
        },
        {
          time: '60min',
          title: 'Lunch',
          schedule: '12:00PM',
        },
        {
          time: '60min',
          title: 'Common Ruby Errors',
          schedule: '01:00PM',
        },
        {
          time: '60min',
          title: 'Rails for Python Developers',
          schedule: '02:00PM',
        },
        {
          time: '60min',
          title: 'Communicating Over Distance',
          schedule: '03:00PM',
        },
        {
          time: '60min',
          title: 'Networking Event',
          schedule: '04:00PM',
        },
      ],
    ])
  ).toEqual([
    {
      title: 'Track 1',
      data: [
        '09:00AM Writing Fast Tests Against Enterprise Rails 60min',
        '10:00AM Overdoing it in Python 60min',
        '11:00AM Lua for the Masses 60min',
        '12:00PM Lunch 60min',
        '01:00PM Common Ruby Errors 60min',
        '02:00PM Rails for Python Developers 60min',
        '03:00PM Communicating Over Distance 60min',
        '04:00PM Networking Event 60min',
      ],
    },
  ]);
});

test('Make and format tracks from a given data', () => {
  expect(
    EventOrganizerBusiness.makeTracks(
      [
        {
          time: '60min',
          title: 'Writing Fast Tests Against Enterprise Rails',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Overdoing it in Python',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Lua for the Masses',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Common Ruby Errors',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Rails for Python Developers',
          schedule: '',
        },
        {
          time: '60min',
          title: 'Communicating Over Distance',
          schedule: '',
        },
      ],
      {
        numTracks: 1,
        minOfEachTrack: 360,
      }
    )
  ).toEqual([
    {
      title: 'Track 1',
      data: [
        '09:00AM Writing Fast Tests Against Enterprise Rails 60min',
        '10:00AM Overdoing it in Python 60min',
        '11:00AM Lua for the Masses 60min',
        '12:00PM Lunch 60min',
        '01:00PM Common Ruby Errors 60min',
        '02:00PM Rails for Python Developers 60min',
        '03:00PM Communicating Over Distance 60min',
        '04:00PM Networking Event 60min',
      ],
    },
  ]);
});

test('by pass a first period return Lunch', () => {
  expect(EventOrganizerBusiness.getInterval('first')).toEqual({
    time: '60min',
    title: 'Lunch',
    schedule: '',
  });
});

test('by pass a first period return Networking Event', () => {
  expect(EventOrganizerBusiness.getInterval('second')).toEqual({
    time: '60min',
    title: 'Networking Event',
    schedule: '',
  });
});
