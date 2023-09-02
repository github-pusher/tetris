const eventName = {};

const down = (obj) => {
  const keys = Object.keys(eventName);
  keys.forEach(i => {
    clearTimeout(eventName[i]);
    eventName[i] = null;
  });
  if (!obj.callback) {
    return;
  }
  const clear = () => {
    clearTimeout(eventName[obj.key]);
  };
  obj.callback(clear);
  if (obj.once === true) {
    return;
  }
  let begin = obj.begin || 100;
  const interval = obj.interval || 50;
  const loop = () => {
    eventName[obj.key] = setTimeout(() => {
      begin = null;
      loop();
      obj.callback(clear);
    }, begin || interval);
  };
  loop();
};

const up = (obj) => {
  clearTimeout(eventName[obj.key]);
  eventName[obj.key] = null;
  if (!obj.callback) {
    return;
  }
  obj.callback();
};

export default {
  down,
  up,
}
