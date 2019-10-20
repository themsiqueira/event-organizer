import Helper from '../src/app/Classes/Helper';

test('Test Add minutes to a hour', () => {

  expect(Helper.AddMinutes('9:00AM', '00min')).toEqual('9:00AM');
});
