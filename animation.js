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


function addHover(id, initialColor, onHoverColor) {
  let targetElement = lottiePlayer.shadowRoot.getElementById(id);

  targetElement.addEventListener('mouseover', () => {
    targetElement = lottiePlayer.shadowRoot
      .getElementById(id)
      .querySelector('g')
      .querySelector('path');
    targetElement.style.fill = onHoverColor;
  });
  targetElement.addEventListener('mouseout', () => {
    console.log('mouseout');
    targetElement.style.fill = initialColor;
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
}, 400);
