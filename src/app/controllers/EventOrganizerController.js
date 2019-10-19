import EventOrganizerBusiness from '../Business/EventOrganizerBusiness';

class EventOrganizerController {
  Organizer(req, res) {
    const result = EventOrganizerBusiness.MakeTracks(req.body.data);
    return res.json({ data: result });
  }
}

export default new EventOrganizerController();
