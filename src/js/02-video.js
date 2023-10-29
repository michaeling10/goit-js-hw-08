'use strict';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

///

function saveCurrentTime(playBackTime) {
  localStorage.setItem('videoplayer-current-time', playBackTime);
}

function getCurrentTime() {
  const currentVideoTime = parseFloat(
    localStorage.getItem('videoplayer-current-time')
  );
  return currentVideoTime;
}

player.ready().then(function () {
  let currentVideoTime = getCurrentTime();

  if (currentVideoTime > 0) {
    player.setCurrentTime(currentVideoTime);
  } else {
    console.log('The start time is 0.0 sec');
  }

  const throttledUpdate = throttle(time => {
    saveCurrentTime(time);
  }, 1000);

  player.on('timeupdate', function (e) {
    const currentTime = e.seconds;
    throttledUpdate(currentTime);
  });
});
