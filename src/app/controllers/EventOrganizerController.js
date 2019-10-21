import EventOrganizerBusiness from '../Business/EventOrganizerBusiness';

class EventOrganizerController
{
  organizer(req, res)
  {
    const result = EventOrganizerBusiness.makeTracks(req.body.data);
    if(result === 0)
    {
      return res.status(400).json({ error: 'You need more lectures to make a track' });
    }

    return res.json({ data: result });
  }
}

export default new EventOrganizerController();
