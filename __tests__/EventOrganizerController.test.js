import EventOrganizerController from '../src/app/controllers/EventOrganizerController'

test('Should return a schedule for a event', () =>{
  const req = {
    body: {
      "data":[
        "Writing Fast Tests Against Enterprise Rails 60min",
        "Overdoing it in Python 45min",
        "Lua for the Masses 30min",
        "Ruby Errors from Mismatched Gem Versions 45min",
        "Common Ruby Errors 45min",
        "Rails for Python Developers lightning",
        "Communicating Over Distance 60min",
        "Accounting-Driven Development 45min",
        "Woah 30min",
        "Sit Down and Write 30min",
        "Pair Programming vs Noise 45min",
        "Rails Magic 60min",
        "Ruby on Rails: Why We Should Move On 60min",
        "Clojure Ate Scala (on my project) 45min",
        "Programming in the Boondocks of Seattle 30min",
        "Ruby vs. Clojure for Back-End Development 30min",
        "Ruby on Rails Legacy App Maintenance 60min",
        "A World Without HackerNews 30min",
        "User Interface CSS in Rails Apps 30min"
        ]
    }
  }
  const res = {}

  expect(EventOrganizerController.organizer(req, res)).toEqual({
    "data": [
        {
            "title": "Track 1",
            "data": [
                "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
                "10:00AM Overdoing it in Python 45min",
                "10:45AM Lua for the Masses 30min",
                "11:15AM Ruby Errors from Mismatched Gem Versions 45min",
                "12:00PM Lunch 60min",
                "01:00PM Common Ruby Errors 45min",
                "01:45PM Rails for Python Developers 5min",
                "01:50PM Communicating Over Distance 60min",
                "02:50PM Accounting-Driven Development 45min",
                "03:35PM Woah 30min",
                "04:05PM Sit Down and Write 30min",
                "04:35PM Networking Event 60min"
            ]
        }
    ]
  });
});
