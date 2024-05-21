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
  animate(22, 106);

  subscribeBtn.style.pointerEvents = 'none';

  subscribedBtn = lottiePlayer.shadowRoot.getElementById('boxInscrito');
  subscribedBtn.style.pointerEvents = 'auto';
  subscribedBtn.addEventListener('keydown', () => console.log('press'))
  subscribedBtn.addEventListener('keyup', () => console.log('unpress'))
  lottiePlayer.setAttribute('data-bs-toggle', 'dropdown');
  addHover('boxInscrito', '#AAAABE', '#D9D9E1');
}

function unsubscribe() {
  if (currentStateElement.innerText === 'unsubscribe') return;

  console.log('unsubscribe');
  animate(1, 21);

  subscribedBtn.style.pointerEvents = 'none';
  subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrever');
  subscribeBtn.style.pointerEvents = 'auto';

  addHover('boxInscrever', '#F2F3F7', '#AAAABE');
  lottiePlayer.setAttribute('data-bs-toggle', '');
  document.querySelector('ul').classList.remove('show');
}

function noNotifications() {
  if (currentStateElement.innerText === ANIMATIONS.NO_NOTIFICATIONS) return;

  console.log(ANIMATIONS.NO_NOTIFICATIONS);
  animate(107, 191);
}

function allNotifications() {
  if (currentStateElement.innerText === ANIMATIONS.ALL_NOTIFICATIONS) return;

  console.log(ANIMATIONS.ALL_NOTIFICATIONS);
  animate(192, 276);
}

function customNotifications() {
  const isAllowedToChangeState = currentStateElement.innerText === ANIMATIONS.CUSTOM_NOTIFICATIONS ||
    currentStateElement.innerText === ANIMATIONS.SUBSCRIBED
  
  if (isAllowedToChangeState) return

  console.log(ANIMATIONS.CUSTOM_NOTIFICATIONS);
  animate(277, 361);
}

function addDropShadow() {
  let targetElement = lottiePlayer.shadowRoot.getElementById(id);
  targetElement = lottiePlayer.shadowRoot
    .getElementById(id)
    .querySelector('g')
    .querySelector('path');
    
  targetElement.style.filter = 'drop-shadow(0px 9px 16px #00000040)';
}

function addHover(id, initialColor, onHoverColor) {
  let targetElement = lottiePlayer.shadowRoot.getElementById(id);

  targetElement.addEventListener('mouseover', () => {
    targetElement = lottiePlayer.shadowRoot
      .getElementById(id)
      .querySelector('g')
      .querySelector('path');
    
    transitionColors(targetElement, initialColor, onHoverColor, 200);
    
    // targetElement.style.fill = onHoverColor;
  });
  targetElement.addEventListener('mouseout', () => {
    console.log('mouseout');
    transitionColors(targetElement, onHoverColor, initialColor, 200);

    // targetElement.style.fill = initialColor;
  });
}
const lottiePlayer = document.getElementById('blueprint-lottie-5');
const frameElement = document.getElementById('frame');
const stopValueElement = document.getElementById('stopValue');
const currentStateElement = document.getElementById('currentState');

let subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrever');
let subscribedBtn = lottiePlayer.shadowRoot.getElementById('boxInscrito');

currentStateElement.innerText = ANIMATIONS.UNSUBSCRIBED;

const stopFrameMapper = {
  106: ANIMATIONS.SUBSCRIBED,
  21: ANIMATIONS.UNSUBSCRIBED,
  191: ANIMATIONS.NO_NOTIFICATIONS,
  276: ANIMATIONS.ALL_NOTIFICATIONS,
  361: ANIMATIONS.CUSTOM_NOTIFICATIONS,
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

  subscribeBtn = lottiePlayer.shadowRoot.getElementById('boxInscrever');
  addHover('boxInscrever', '#F2F3F7', '#AAAABE');
  
  subscribeBtn.style.pointerEvents = 'auto';
  addDropShadow()
}, 400);




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

// transitionColors(colorBox, startColor, endColor, duration);