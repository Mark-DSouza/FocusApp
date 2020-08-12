const app = () => {
    // Selectors
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    const sounds = document.querySelectorAll('.sound-picker button');
    const video = document.querySelector('.vid-container video');

    // Length of the svg circle
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    // Duration that the song will last for (By Default)
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    
    play.addEventListener('click', () => {
        checkPlaying(song)
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', () => {
            fakeDuration = option.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    sounds.forEach(sound => {
        sound.addEventListener('click', () => {
            song.src = sound.getAttribute('data-sound');
            video.src = sound.getAttribute('data-video');
            checkPlaying(song);
        })
    })

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.play();
            play.src = './svg/play.svg';
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate Circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate Text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    };
};

app();