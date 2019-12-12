import Helper from '../../src/app/Classes/Helper';

test('Test Add minutes to a hour', () => {
  expect(Helper.addMinutes('09:00AM', '00min')).toEqual('09:00AM');
});
