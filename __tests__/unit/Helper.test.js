import Helper from '../../src/app/Classes/Helper';

describe('Helper', () => {
  it('Should Add minutes to a hour', () => {
    const result = Helper.addMinutes('09:00AM', '00min');
    expect(result).toBeDefined();
    expect(result).toEqual('09:00AM');
  });
});
