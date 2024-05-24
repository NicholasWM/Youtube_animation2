const ANIMATIONS = {
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  NO_NOTIFICATIONS: 'noNotifications',
  ALL_NOTIFICATIONS: 'allNotifications',
  CUSTOM_NOTIFICATIONS: 'customNotifications',
}

function subscribeIfCurrentStateIsUnsubscribed() {
  if (currentStateElement.innerText === ANIMATIONS.UNSUBSCRIBED) {
    subscribe();
  }
}

function animate(initialFrame, lastFrame) {
  const hasSomeMappedAnimation = Object.keys(stopFrameMapper).includes(
    String(lastFrame)
  )

  if(hasSomeMappedAnimation) {
    currentStateElement.innerText = stopFrameMapper[lastFrame]
  } else {
    console.log('OPERATION_NOT_MAPPED', lastFrame)
  }
  
  const isReverse = initialFrame > lastFrame
  if (isReverse) {
    lottiePlayer._lottie.setDirection(-1);
  } else {
    lottiePlayer._lottie.setDirection(1);
  }

  setStopFrame(lastFrame)
  lottiePlayer._lottie.goToAndPlay(initialFrame, true);
}

function setStopFrame(frame) {
  stopValueElement.innerText = frame;
}

function subscribe() {
  if (currentStateElement.innerText === 'subscribe') return;
  console.log('subscribe');
  animate(22, 98);

  subscribeBtn.style.pointerEvents = 'none';

  subscribedBtn = lottiePlayer.shadowRoot.getElementById('boxInscrito');
  subscribedBtn.style.pointerEvents = 'auto';
  // lottiePlayer.setAttribute('data-bs-toggle', 'dropdown');
  addHover('boxInscrito', '#AAAABE', '#D1D1DB');
}

function unsubscribe() {
  if (currentStateElement.innerText === 'unsubscribe') return;

  console.log('unsubscribe');
  animate(1, 21);

  subscribedBtn.style.pointerEvents = 'none';
  subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
  subscribeBtn.style.pointerEvents = 'auto';

  addHover('boxInscrevaSe', '#F2F3F7', '#AAAABE');
  lottiePlayer.setAttribute('data-bs-toggle', '');
  document.querySelector('ul').classList.remove('show');
}

function noNotifications() {
  if (currentStateElement.innerText === ANIMATIONS.NO_NOTIFICATIONS) return;

  console.log(ANIMATIONS.NO_NOTIFICATIONS);
  animate(176, 252);
}

function allNotifications() {
  if (currentStateElement.innerText === ANIMATIONS.ALL_NOTIFICATIONS) return;

  console.log(ANIMATIONS.ALL_NOTIFICATIONS);
  animate(99, 175);
}

function customNotifications() {
  const isAllowedToChangeState = currentStateElement.innerText === ANIMATIONS.CUSTOM_NOTIFICATIONS ||
    currentStateElement.innerText === ANIMATIONS.SUBSCRIBED
  
  if (isAllowedToChangeState) return

  console.log(ANIMATIONS.CUSTOM_NOTIFICATIONS);
  animate(253, 329);
}

function addDropShadow(id) {
  let targetElement = lottiePlayer.shadowRoot.getElementById(id);
  targetElement = lottiePlayer.shadowRoot
    .getElementById(id)
    .querySelector('g')
    .querySelector('path');
    
  targetElement.style.filter = 'drop-shadow(0px 9px 16px #121d2d)';
}

function addClickBackground(id, initialColor, onClickColor) {
  let targetElement = lottiePlayer.shadowRoot.getElementById(id);
  
  console.log('targetElement.onmousedown', )
  console.log('targetElement.onmouseup', )
  targetElement.onmousedown = () => {
    if (dropdown.classList.contains('show')) {
      dropdown.classList.add('hidden')
      dropdown.classList.remove('show')
    } else {
      dropdown.classList.add('show')
      dropdown.classList.remove('hidden')
    }

    targetElement = lottiePlayer.shadowRoot
      .getElementById(id)
      .querySelector('g')
      .querySelector('path');
    
    transitionColors(targetElement, initialColor, onClickColor, 150);
    
  }
  targetElement.onmouseup = () => {
    transitionColors(targetElement, onClickColor, initialColor, 150);
  }
}

function addHover(id, initialColor, onHoverColor) {
  addDropShadow(id)

  if(id === 'boxInscrito') {
    addClickBackground(id, initialColor, '#FFFFFF')
  }

  let targetElement = lottiePlayer.shadowRoot.getElementById(id);

  targetElement.addEventListener('mouseover', () => {
    targetElement = lottiePlayer.shadowRoot
      .getElementById(id)
      .querySelector('g')
      .querySelector('path');
    
    transitionColors(targetElement, initialColor, onHoverColor, 150);
  });
  targetElement.addEventListener('mouseout', () => {
    transitionColors(targetElement, onHoverColor, initialColor, 150);
  });
}
const lottiePlayer = document.getElementById('blueprint-lottie-5');
const frameElement = document.getElementById('frame');
const stopValueElement = document.getElementById('stopValue');
const currentStateElement = document.getElementById('currentState');

let subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
let subscribedBtn = lottiePlayer.shadowRoot.getElementById('boxInscrito');

currentStateElement.innerText = ANIMATIONS.UNSUBSCRIBED;

const stopFrameMapper = {
  98: ANIMATIONS.SUBSCRIBED,
  21: ANIMATIONS.UNSUBSCRIBED,
  252: ANIMATIONS.NO_NOTIFICATIONS,
  175: ANIMATIONS.ALL_NOTIFICATIONS,
  329: ANIMATIONS.CUSTOM_NOTIFICATIONS,
};


lottiePlayer.shadowRoot.getElementById('animation-container').style.width =
  '100%';

lottiePlayer.addEventListener('frame', (e) => {
  const frame = Number(e.target._lottie.currentFrame.toFixed(0));

  frameElement.innerText = frame;
  const lastFrame = Number(stopValueElement.innerText);
  if (frame === lastFrame) {
    lottiePlayer._lottie.goToAndStop(lastFrame, true);
  }
});

setTimeout(() => {
  lottiePlayer._lottie.goToAndStop(0);

  lottiePlayer.style.pointerEvents = 'none';

  subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
  addHover('boxInscrevaSe', '#F2F3F7', '#AAAABE');
  
  subscribeBtn.style.pointerEvents = 'auto';
}, 600);

// Function to convert hex color to RGB object
const hexToRGB = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

const colorBox = document.getElementById('colorBox');
const duration = 83; // Duration in milliseconds
const startColor = '#F2F3F7';
const endColor = '#AAAABE';

// Function to transition colors
const transitionColors = (element, start, end, duration) => {
  const interval = 10; // Interval for color change
  const steps = Math.ceil(duration / interval);
  const startRGB = hexToRGB(start);
  const endRGB = hexToRGB(end);
  const deltaRGB = {
      r: (endRGB.r - startRGB.r) / steps,
      g: (endRGB.g - startRGB.g) / steps,
      b: (endRGB.b - startRGB.b) / steps
  };

  let stepCount = 0;

  const transitionInterval = setInterval(() => {
      const newColor = {
          r: Math.round(startRGB.r + deltaRGB.r * stepCount),
          g: Math.round(startRGB.g + deltaRGB.g * stepCount),
          b: Math.round(startRGB.b + deltaRGB.b * stepCount)
      };

      const color = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
      element.style.fill = color;

      stepCount++;
      if (stepCount >= steps) {
          clearInterval(transitionInterval);
      }
  }, interval);
}
const dropdown = document.querySelector('.dropdown-menu')

const dropDownWindow = document.body
window.onclick = function(e){
  console.log('click', e.target.id?.length, dropdown.classList.contains('show'))
  if (!e.target.id?.length && dropdown.classList.contains('show')){
    dropdown.classList.remove('show')
    dropdown.classList.add('hidden')
 }
}