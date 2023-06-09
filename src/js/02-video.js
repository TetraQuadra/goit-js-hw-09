import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', event => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
});

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime !== null) {
  player.setCurrentTime(storedTime);
}
