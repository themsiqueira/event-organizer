import EventOrganizerBusiness from '../src/app/Business/EventOrganizerBusiness';

test('verify if format data to a correct structure', () =>{
  expect(EventOrganizerBusiness.FormatInformation([
  "Writing Fast Tests Against Enterprise Rails 60min",
  "Overdoing it in Python 45min"])).toEqual([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '',
    },
    {
      time: '45min',
      title: 'Overdoing it in Python',
      schedule: '',
    }
  ]);
});

test('verify total tracks by passed a data', () =>{
  expect(EventOrganizerBusiness.GetTotalTracksAndDurationTime([
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
  ])).toEqual({
    numTracks: 1,
    minOfEachTrack: 360,
  });
});

test('check lectures and return schedule for time that was send', () =>{
  expect(EventOrganizerBusiness.MakeTrackPeriod(
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
    ], 180
    )).toEqual([
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

test('Set appointment hour to all lectures, lunch and Networking Event', () =>{
  expect(EventOrganizerBusiness.SetStartTimeToAllEventsInTrack(
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
      }
    ]
  )).toEqual([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '9:00AM',
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
      schedule: '1:00PM',
    },
    {
      time: '60min',
      title: 'Rails for Python Developers',
      schedule: '2:00PM',
    },
    {
      time: '60min',
      title: 'Communicating Over Distance',
      schedule: '3:00PM',
    },
    {
      time: '60min',
      title: 'Networking Event',
      schedule: '4:00PM',
    }
  ]);
});

test('Format return to expected', () =>{
  expect(EventOrganizerBusiness.FormatReturn([
    {
      time: '60min',
      title: 'Writing Fast Tests Against Enterprise Rails',
      schedule: '9:00AM',
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
      schedule: '1:00PM',
    },
    {
      time: '60min',
      title: 'Rails for Python Developers',
      schedule: '2:00PM',
    },
    {
      time: '60min',
      title: 'Communicating Over Distance',
      schedule: '3:00PM',
    },
    {
      time: '60min',
      title: 'Networking Event',
      schedule: '4:00PM',
    }
  ])).toEqual([
    "9:00AM Writing Fast Tests Against Enterprise Rails 60min",
    "10:00AM Overdoing it in Python 60min",
    "11:00AM Lua for the Masses 60min",
    "12:00PM Lunch 60min",
    "1:00PM Common Ruby Errors 60min",
    "2:00PM Rails for Python Developers 60min",
    "3:00PM Communicating Over Distance 60min",
    "4:00PM Networking Event 60min"
  ]);
});

test('Make and format tracks from a given data', () => {
  expect(EventOrganizerBusiness.MakeTracks([
    'Writing Fast Tests Against Enterprise Rails 60min',
    'Overdoing it in Python 60min',
    'Lua for the Masses 60min',
    'Common Ruby Errors 60min',
    'Rails for Python Developers 60min',
    'Communicating Over Distance 60min',
  ])).toEqual([
    {
      "title": "Track 1",
      "data": [
        "9:00AM Writing Fast Tests Against Enterprise Rails 60min",
        "10:00AM Overdoing it in Python 60min",
        "11:00AM Lua for the Masses 60min",
        "12:00PM Lunch 60min",
        "1:00PM Common Ruby Errors 60min",
        "2:00PM Rails for Python Developers 60min",
        "3:00PM Communicating Over Distance 60min",
        "4:00PM Networking Event 60min"
      ]
    }
  ]);
});
