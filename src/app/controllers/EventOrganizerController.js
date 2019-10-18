import EventOrganizerBusiness from '../Business/EventOrganizerBusiness';

class EventOrganizerController {
  async Organizer(req, res) {
    const result = EventOrganizerBusiness.FormatInformation(req);

    return res.json(result);
  }
}

export default new EventOrganizerController();
