import EventOrganizerBusiness from '../Business/EventOrganizerBusiness';

class EventOrganizerController {
  organizer(req, res) {
    const { data } = req.body;

    const newInformation = EventOrganizerBusiness.formatInformation(data);
    if (newInformation.length <= 0) {
      return res.status(400).json({ error: 'You send wrong data format' });
    }
    const totalTracks = EventOrganizerBusiness.getTotalTracksAndDurationTime(
      newInformation
    );
    if (totalTracks === 0) {
      return res
        .status(400)
        .json({ error: 'You need more lectures to make a track' });
    }

    const result = EventOrganizerBusiness.makeTracks(
      newInformation,
      totalTracks
    );
    return res.json({ data: result });
  }
}

export default new EventOrganizerController();
