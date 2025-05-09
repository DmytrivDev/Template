let activeVideo = null;

const playVideo = async (videoElement, playBtn) => {
  // Ставимо на паузу попереднє відео, якщо воно є
  if (activeVideo && activeVideo !== videoElement) {
    activeVideo.pause();
    activeVideo.controls = false;

    const prevPlayBtn = activeVideo
      .closest('.media-box')
      ?.querySelector('.video-play');
    if (prevPlayBtn) prevPlayBtn.style.display = '';
  }

  try {
    await videoElement.play();
    videoElement.controls = true;
    playBtn.style.display = 'none';
    activeVideo = videoElement;
  } catch (err) {
    console.log('Playback error:', err);
  }
};

document.querySelectorAll('.media-box').forEach(elem => {
  const video = elem.querySelector('video');
  const videoPlay = elem.querySelector('.video-play');
  const videoBox = elem.querySelector('.video-box');

  const onPlayClick = () => {
    if (!video || !videoPlay) return;
    playVideo(video, videoPlay);
  };

  videoBox.addEventListener('click', onPlayClick);
  videoPlay.addEventListener('click', onPlayClick);

  video.addEventListener('ended', () => {
    video.controls = false;
    videoPlay.style.display = '';
    if (activeVideo === video) activeVideo = null;
  });
});

// Функція ручної зупинки всіх відео
export function pauseVideo() {
  const videos = document.querySelectorAll('.video-box video');
  videos.forEach(video => {
    video.pause();
    video.controls = false;
    const playBtn = video.closest('.media-box')?.querySelector('.video-play');
    if (playBtn) playBtn.style.display = '';
  });
  activeVideo = null;
}

// <div class="media-box">
//   <div class="video-box">
//     <video poster="./img/content/review_1.jpg" preload="metadata">
//       <source src="./img/media/mov-mp4.mp4" type="video/mp4" />
//       <source src="./img/media/mov-webm.webm" type="video/webm" />
//     </video>
//   </div>

//   <button type="button" class="video-play" aria-label="Video play">
//     <span>
//       <img src="./img/icons/play.svg" alt="" />
//     </span>
//   </button>
// </div>
