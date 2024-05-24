class LottieAnimation {
  constructor() {
    this.ANIMATIONS = {
      SUBSCRIBED: 'subscribed',
      UNSUBSCRIBED: 'unsubscribed',
      NO_NOTIFICATIONS: 'noNotifications',
      ALL_NOTIFICATIONS: 'allNotifications',
      CUSTOM_NOTIFICATIONS: 'customNotifications',
    }

    this.lottiePlayer = document.getElementById('blueprint-lottie-5');
    this.frameElement = document.getElementById('frame');
    this.stopValueElement = document.getElementById('stopValue');
    this.currentStateElement = document.getElementById('currentState');
    this.currentStateElement.innerText = this.ANIMATIONS.UNSUBSCRIBED;

    this.subscribeBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
    this.subscribedBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrito');
        
    this.colorBox = document.getElementById('colorBox');
    this.duration = 83; // Duration in milliseconds
    this.startColor = '#F2F3F7';
    this.endColor = '#AAAABE';

    this.stopFrameMapper = {
      98: this.ANIMATIONS.SUBSCRIBED,
      21: this.ANIMATIONS.UNSUBSCRIBED,
      252: this.ANIMATIONS.NO_NOTIFICATIONS,
      175: this.ANIMATIONS.ALL_NOTIFICATIONS,
      329: this.ANIMATIONS.CUSTOM_NOTIFICATIONS,
    };

    this.dropdownElement = document.querySelector('.dropdown-menu')
  }

  
  subscribeIfCurrentStateIsUnsubscribed() {
    if (this.currentStateElement.innerText === this.ANIMATIONS.UNSUBSCRIBED) {
      this.subscribe();
    }
  }
  
  animate(initialFrame, lastFrame) {
    const hasSomeMappedAnimation = Object.keys(this.stopFrameMapper).includes(
      String(lastFrame)
    )
  
    if(hasSomeMappedAnimation) {
      this.currentStateElement.innerText = this.stopFrameMapper[lastFrame]
    } else {
      console.log('OPERATION_NOT_MAPPED', lastFrame)
    }
    
    const isReverse = initialFrame > lastFrame
    if (isReverse) {
      this.lottiePlayer._lottie.setDirection(-1);
    } else {
      this.lottiePlayer._lottie.setDirection(1);
    }
  
    this.setStopFrame(lastFrame)
    this.lottiePlayer._lottie.goToAndPlay(initialFrame, true);
  }
  
  setStopFrame(frame) {
    this.stopValueElement.innerText = frame;
  }
  
  subscribe() {
    if (this.currentStateElement.innerText === 'subscribe') return;
    this.animate(22, 98);
  
    this.subscribeBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
    this.subscribedBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrito');
    this.subscribeBtn.style.pointerEvents = 'none';
  
    this.subscribedBtn.style.pointerEvents = 'auto';
    // this.lottiePlayer.setAttribute('data-bs-toggle', 'dropdown');
    this.addHover('boxInscrito', '#AAAABE', '#D1D1DB');
  }
  
  unsubscribe() {
    if (this.currentStateElement.innerText === 'unsubscribe') return;
  
    this.subscribeBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
    this.subscribedBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrito');

    this.animate(1, 21);
  
    this.subscribedBtn.style.pointerEvents = 'none';
    this.subscribeBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
    this.subscribeBtn.style.pointerEvents = 'auto';
  
    this.addHover('boxInscrevaSe', '#F2F3F7', '#AAAABE');
    this.lottiePlayer.setAttribute('data-bs-toggle', '');
    document.querySelector('ul').classList.remove('show');
  }
  
  noNotifications() {
    if (this.currentStateElement.innerText === this.ANIMATIONS.NO_NOTIFICATIONS) return;
  
    this.animate(176, 252);
  }
  
  allNotifications() {
    if (this.currentStateElement.innerText === this.ANIMATIONS.ALL_NOTIFICATIONS) return;
  
    this.animate(99, 175);
  }
  
  customNotifications() {
    const isAllowedToChangeState = this.currentStateElement.innerText === this.ANIMATIONS.CUSTOM_NOTIFICATIONS ||
      this.currentStateElement.innerText === this.ANIMATIONS.SUBSCRIBED
    
    if (isAllowedToChangeState) return
  
    this.animate(253, 329);
  }
  
  addDropShadow(id) {
    let targetElement = this.lottiePlayer.shadowRoot.getElementById(id);
    targetElement = this.lottiePlayer.shadowRoot
      .getElementById(id)
      .querySelector('g')
      .querySelector('path');
      
    targetElement.style.filter = 'drop-shadow(0px 9px 16px #121d2d)';
  }
  
  addClickBackground(id, initialColor, onClickColor) {
    let targetElement = this.lottiePlayer.shadowRoot.getElementById(id);
    
    targetElement.onmousedown = () => {
      if (this.dropdownElement.classList.contains('show')) {
        this.dropdownElement.classList.add('hidden')
        this.dropdownElement.classList.remove('show')
      } else {
        this.dropdownElement.classList.add('show')
        this.dropdownElement.classList.remove('hidden')
      }
  
      targetElement = this.lottiePlayer.shadowRoot
        .getElementById(id)
        .querySelector('g')
        .querySelector('path');
      
      this.transitionColors(targetElement, initialColor, onClickColor, 150);
      
    }
    targetElement.onmouseup = () => {
      this.transitionColors(targetElement, onClickColor, initialColor, 150);
    }
  }
  
  addHover(id, initialColor, onHoverColor) {
    this.addDropShadow(id)
  
    if(id === 'boxInscrito') {
      this.addClickBackground(id, initialColor, '#FFFFFF')
    }
  
    let targetElement = this.lottiePlayer.shadowRoot.getElementById(id);
  
    targetElement.addEventListener('mouseover', () => {
      targetElement = this.lottiePlayer.shadowRoot
        .getElementById(id)
        .querySelector('g')
        .querySelector('path');
      
      this.transitionColors(targetElement, initialColor, onHoverColor, 150);
    });
    targetElement.addEventListener('mouseout', () => {
      this.transitionColors(targetElement, onHoverColor, initialColor, 150);
    });
  }
  
  
  init() {
    this.lottiePlayer.shadowRoot.getElementById('animation-container').style.width =
      '100%';
    
    this.lottiePlayer.addEventListener('frame', (e) => {
      const frame = Number(e.target._lottie.currentFrame.toFixed(0));
      this.frameElement.innerText = frame;

      const lastFrame = Number(this.stopValueElement.innerText);
      if (frame === lastFrame) {
        this.lottiePlayer._lottie.goToAndStop(lastFrame, true);
      }
    });

    setTimeout(() => {
      this.lottiePlayer._lottie.goToAndStop(0);
    
      this.lottiePlayer.style.pointerEvents = 'none';
    
      this.subscribeBtn = this.lottiePlayer.shadowRoot.getElementById('boxInscrevaSe');
      this.addHover('boxInscrevaSe', '#F2F3F7', '#AAAABE');
      
      this.subscribeBtn.style.pointerEvents = 'auto';
    }, 300);

 
    window.onclick = function(e){
      this.dropdownElement = document.querySelector('.dropdown-menu')
      if (!e.target.id?.length && this.dropdownElement.classList.contains('show')){
        this.dropdownElement.classList.remove('show')
        this.dropdownElement.classList.add('hidden')
     }
    }
  }
  
  
  hexToRGB (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  };

  
  transitionColors(element, start, end, duration) {
    const interval = 10; // Interval for color change
    const steps = Math.ceil(duration / interval);
    const startRGB = this.hexToRGB(start);
    const endRGB = this.hexToRGB(end);
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
}

const lottieAnimationInstance = new LottieAnimation()
lottieAnimationInstance.init()