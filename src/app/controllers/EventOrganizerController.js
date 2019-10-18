import EventOrganizerBusiness from '../Business/EventOrganizerBusiness';

class EventOrganizerController {
  async Organizer(req, res) {
    const result = await EventOrganizerBusiness.MakeTracks(req.body.data);
    return res.json(result);
  }
}

export default new EventOrganizerController();
