import events from 'events';
import eventEmitter from '../../lib/events';

test('#constructor', () => {
  expect(eventEmitter.constructor).toEqual(events.EventEmitter);
});
