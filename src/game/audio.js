import { store } from '../app/store';

const AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext
);

const hasWebAudioAPI = {
  data: !!AudioContext && window.location.protocol.indexOf('http') !== -1,
};

const audio = {};

(() => {
  if (!hasWebAudioAPI.data) {
    return;
  }
  
  const url = './sound.wav';
  const context = new AudioContext();
  const req = new XMLHttpRequest();
  
  req.open('GET', url, true);
  req.responseType = 'arraybuffer';
  req.onload = () => {
    context.decodeAudioData(req.response, (buf) => {
      const getSource = () => {
        const source = context.createBufferSource();
        source.buffer = buf;
        source.connect(context.destination);
        return source;
      };

      audio.killStart = () => {
        audio.start = () => {};
      };

      audio.start = () => {
        audio.killStart();
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 2.7310, 9.3410);
      };

      audio.clear = () => {
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 1.0290, 0.1890);
      };

      audio.fall = () => {
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 13.5960, 0.1690);
      };
      
      audio.move = () => {
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 14.4930, 0.1250);
      };

      audio.rotate = () => {
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 15.6270, 0.0520);
      };
      
      audio.gameover = () => {
        if (!store.getState().matrix.sound) {
          return;
        }
        
        getSource().start(0, 19.1770, 4.6890);
      };
    },
    (error) => {
      if (window.console) {
        window.console.error(`Audiofile: ${url} read error`, error);
        hasWebAudioAPI.data = false;
      }
    });
  };

  req.send();
})();

export { audio, hasWebAudioAPI };
