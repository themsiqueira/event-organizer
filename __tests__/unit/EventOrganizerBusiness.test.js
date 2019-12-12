import EventOrganizerBusiness from '../../src/app/Business/EventOrganizerBusiness';
import {
  data,
  formattedData,
  lecturesEnought,
  shouldBeDone,
  moreTime,
  lecturesToAppointment,
  lecturesAfterAppointment,
  resultPeriod,
  tracksToFormatReturn,
  returnExpected,
  dataToMakeTracks,
  resultForMaKedTracks,
  tracksToverifyTime,
} from '../mock/mocks';

describe('event organizer bussiness', () => {
  it('Should format data', () => {
    const result = EventOrganizerBusiness.formatInformation(data);
    expect(result).toBeDefined();
  });

  it('Should return because dont have lectures enougth', () => {
    const result = EventOrganizerBusiness.getTotalTracksAndDurationTime(
      formattedData
    );

    expect(result).toBeDefined();
    expect(result).toEqual(0);
  });

  it('Should verify If have received lectures to fill a half track, you should fill as much as you can with the full track.', () => {
    const result = EventOrganizerBusiness.getTotalTracksAndDurationTime(
      lecturesEnought
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty('numTracks');
    expect(result).toHaveProperty('minOfEachTrack');
  });

  it('Should verify total tracks should be done and time for track by passed a data', () => {
    const result = EventOrganizerBusiness.getTotalTracksAndDurationTime(
      shouldBeDone
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty('numTracks');
    expect(result).toHaveProperty('minOfEachTrack');
  });

  it('Should check lectures and return schedule for time that was send', () => {
    const time = 180;
    const result = EventOrganizerBusiness.makeTrackPeriod(moreTime, time);

    expect(result).toEqual(resultPeriod);
  });

  it('Should set appointment hour to all lectures, lunch and Networking Event', () => {
    const result = EventOrganizerBusiness.setStartTimeToAllEventsInTrack(
      lecturesToAppointment
    );

    expect(result).toEqual(lecturesAfterAppointment);
  });

  it('Should format return to expected', () => {
    const result = EventOrganizerBusiness.formatReturn(tracksToFormatReturn);

    expect(result).toEqual(returnExpected);
  });

  it('Should make and format tracks from a given data', () => {
    const paramsForTrack = {
      numTracks: 1,
      minOfEachTrack: 360,
    };

    const result = EventOrganizerBusiness.makeTracks(
      dataToMakeTracks,
      paramsForTrack
    );

    expect(result).toEqual(resultForMaKedTracks);
  });

  it('Should return lunch by pass a first period', () => {
    const result = EventOrganizerBusiness.getInterval('first');

    expect(result).toHaveProperty('title');
    expect(result.title).toEqual('Lunch');
  });

  it('Should return Networking Event by pass a second period', () => {
    const result = EventOrganizerBusiness.getInterval('second');

    expect(result).toHaveProperty('title');
    expect(result.title).toEqual('Networking Event');
  });

  it('Should check if tracks has the same duration', () => {
    const result = EventOrganizerBusiness.checkTracks(tracksToverifyTime);

    expect(result).toBeDefined();
    expect(result).toEqual(false);
  });
});
