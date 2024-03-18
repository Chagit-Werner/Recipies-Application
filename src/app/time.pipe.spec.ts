import { DurationFormatPipe } from "./time.pipe";

describe('DurationFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationFormatPipe();
    expect(pipe).toBeTruthy();
  });
});