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
  ])
})

test('verify total tracks by passed a data', () =>{
  expect(EventOrganizerBusiness.GetTotalTracks([
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
  ])).toBeGreaterThan(0);
})
