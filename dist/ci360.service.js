'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ci = require('./ci360.utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CI360Viewer = function () {
  function CI360Viewer(container, fullScreen, ratio) {
    _classCallCheck(this, CI360Viewer);

    this.container = container;
    this.activeImage = 1;
    this.movementStart = 0;
    this.isClicked = false;
    this.loadedImages = 0;
    this.imagesLoaded = false;
    this.reversed = false;
    this.fullScreenView = !!fullScreen;
    this.ratio = ratio;
    this.images = [];
    this.devicePixelRatio = Math.round(window.devicePixelRatio || 1);
    this.isMobile = !!('ontouchstart' in window || navigator.msMaxTouchPoints);
    this.id = container.id;
    this.init(container);
  }

  _createClass(CI360Viewer, [{
    key: 'mousedown',
    value: function mousedown(event) {
      event.preventDefault();

      if (!this.imagesLoaded) return;

      if (this.glass) {
        this.closeMagnifier();
      }

      if (this.view360Icon) {
        this.remove360ViewIcon();
      }

      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }

      this.movementStart = event.pageX;
      this.isClicked = true;
      this.container.style.cursor = 'grabbing';
    }
  }, {
    key: 'mouseup',
    value: function mouseup() {
      if (!this.imagesLoaded) return;

      this.movementStart = 0;
      this.isClicked = false;
      this.container.style.cursor = 'grab';

      if (this.bottomCircle) {
        this.show360ViewCircleIcon();
      }
    }
  }, {
    key: 'mousemove',
    value: function mousemove(event) {
      if (!this.isClicked || !this.imagesLoaded) return;

      this.onMove(event.pageX);
    }
  }, {
    key: 'touchstart',
    value: function touchstart(event) {
      if (!this.imagesLoaded) return;

      if (this.glass) {
        this.closeMagnifier();
      }

      if (this.view360Icon) {
        this.remove360ViewIcon();
      }

      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }

      this.movementStart = event.touches[0].clientX;
      this.isClicked = true;
    }
  }, {
    key: 'touchend',
    value: function touchend() {
      if (!this.imagesLoaded) return;

      this.movementStart = 0;
      this.isClicked = false;

      if (this.bottomCircle) this.show360ViewCircleIcon();
    }
  }, {
    key: 'touchmove',
    value: function touchmove(event) {
      if (!this.isClicked || !this.imagesLoaded) return;

      this.onMove(event.touches[0].clientX);
    }
  }, {
    key: 'keydownGeneral',
    value: function keydownGeneral() {
      if (!this.imagesLoaded) return;

      if (this.glass) {
        this.closeMagnifier();
      }
    }
  }, {
    key: 'keydown',
    value: function keydown(event) {
      if (!this.imagesLoaded) return;

      if (this.glass) {
        this.closeMagnifier();
      }

      if ([37, 39].indexOf(event.keyCode) !== -1) {
        if (37 === event.keyCode) {
          if (this.reversed) this.prev();else this.next();
        } else if (39 === event.keyCode) {
          if (this.reversed) this.next();else this.prev();
        }

        this.onSpin();
      }
    }
  }, {
    key: 'onSpin',
    value: function onSpin() {
      if (this.bottomCircle) {
        this.hide360ViewCircleIcon();
      }

      if (this.view360Icon) {
        this.remove360ViewIcon();
      }

      if (this.autoplay || this.loopTimeoutId) {
        this.stop();
        this.autoplay = false;
      }
    }
  }, {
    key: 'keyup',
    value: function keyup(event) {
      if (!this.imagesLoaded) return;

      if ([37, 39].indexOf(event.keyCode) !== -1) {
        this.onFinishSpin();
      }
    }
  }, {
    key: 'onFinishSpin',
    value: function onFinishSpin() {
      if (this.bottomCircle) this.show360ViewCircleIcon();
    }
  }, {
    key: 'onMove',
    value: function onMove(pageX) {
      if (pageX - this.movementStart >= this.speedFactor) {
        var itemsSkippedRight = Math.floor((pageX - this.movementStart) / this.speedFactor) || 1;

        this.movementStart = pageX;

        if (this.spinReverse) {
          this.moveActiveIndexDown(itemsSkippedRight);
        } else {
          this.moveActiveIndexUp(itemsSkippedRight);
        }

        if (this.bottomCircle) this.hide360ViewCircleIcon();
        this.update();
      } else if (this.movementStart - pageX >= this.speedFactor) {
        var itemsSkippedLeft = Math.floor((this.movementStart - pageX) / this.speedFactor) || 1;

        this.movementStart = pageX;

        if (this.spinReverse) {
          this.moveActiveIndexUp(itemsSkippedLeft);
        } else {
          this.moveActiveIndexDown(itemsSkippedLeft);
        }

        if (this.bottomCircle) this.hide360ViewCircleIcon();
        this.update();
      }
    }
  }, {
    key: 'moveActiveIndexUp',
    value: function moveActiveIndexUp(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

      if (this.stopAtEdges) {
        if (this.activeImage + itemsSkipped >= this.amount) {
          this.activeImage = this.amount;

          if (isReverse ? this.prevElem : this.nextElem) {
            (0, _ci.addClass)(isReverse ? this.prevElem : this.nextElem, 'not-active');
          }
        } else {
          this.activeImage += itemsSkipped;

          if (this.nextElem) {
            (0, _ci.removeClass)(this.nextElem, 'not-active');
          }

          if (this.prevElem) {
            (0, _ci.removeClass)(this.prevElem, 'not-active');
          }
        }
      } else {
        this.activeImage = (this.activeImage + itemsSkipped) % this.amount || this.amount;
      }
    }
  }, {
    key: 'moveActiveIndexDown',
    value: function moveActiveIndexDown(itemsSkipped) {
      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;

      if (this.stopAtEdges) {
        if (this.activeImage - itemsSkipped <= 1) {
          this.activeImage = 1;

          if (isReverse ? this.nextElem : this.prevElem) {
            (0, _ci.addClass)(isReverse ? this.nextElem : this.prevElem, 'not-active');
          }
        } else {
          this.activeImage -= itemsSkipped;

          if (this.prevElem) {
            (0, _ci.removeClass)(this.prevElem, 'not-active');
          }
          if (this.nextElem) {
            (0, _ci.removeClass)(this.nextElem, 'not-active');
          }
        }
      } else {
        if (this.activeImage - itemsSkipped < 1) {
          this.activeImage = this.amount + (this.activeImage - itemsSkipped);
        } else {
          this.activeImage -= itemsSkipped;
        }
      }
    }
  }, {
    key: 'loop',
    value: function loop(reversed) {
      reversed ? this.prev() : this.next();
    }
  }, {
    key: 'next',
    value: function next() {
      this.moveActiveIndexUp(1);
      this.update();
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.moveActiveIndexDown(1);
      this.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var image = this.images[this.activeImage - 1];
      var ctx = this.canvas.getContext('2d');

      ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

      if (this.fullScreenView) {
        this.canvas.width = window.innerWidth * this.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.height = window.innerHeight * this.devicePixelRatio;
        this.canvas.style.height = window.innerHeight + 'px';

        var _contain = (0, _ci.contain)(this.canvas.width, this.canvas.height, image.width, image.height),
            offsetX = _contain.offsetX,
            offsetY = _contain.offsetY,
            width = _contain.width,
            height = _contain.height;

        ctx.drawImage(image, offsetX, offsetY, width, height);
      } else {
        this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
        this.canvas.style.width = this.container.offsetWidth * 0.5 + 'px';
        this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / image.width * image.height * 0.5;
        this.canvas.style.height = this.container.offsetWidth / image.width * image.height * 0.5 + 'px';

        ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }, {
    key: 'updatePercentageInLoader',
    value: function updatePercentageInLoader(percentage) {
      if (this.loader) {
        this.loader.style.width = percentage + '%';
      }

      if (this.view360Icon) {
        this.view360Icon.innerText = percentage + '%';
      }
    }
  }, {
    key: 'onAllImagesLoaded',
    value: function onAllImagesLoaded() {
      this.imagesLoaded = true;
      this.container.style.cursor = 'grab';
      this.removeLoader();

      if (!this.fullScreenView) {
        this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * this.container.offsetWidth / 1500) || 1;
      } else {
        var containerRatio = this.container.offsetHeight / this.container.offsetWidth;
        var imageOffsetWidth = this.container.offsetWidth;

        if (this.ratio > containerRatio) {
          imageOffsetWidth = this.container.offsetHeight / this.ratio;
        }

        this.speedFactor = Math.floor(this.dragSpeed / 150 * 36 / this.amount * 25 * imageOffsetWidth / 1500) || 1;
      }

      if (this.autoplay) {
        this.play();
      }

      if (this.view360Icon) {
        this.view360Icon.innerText = '';
        (0, _ci.setView360Icon)(this.view360Icon);
      }

      this.initControls();
    }
  }, {
    key: 'onFirstImageLoaded',
    value: function onFirstImageLoaded(event) {
      var _this = this;

      if (!this.hide360Logo) {
        this.add360ViewIcon();
      }

      if (this.fullScreenView) {
        this.canvas.width = window.innerWidth * this.devicePixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.height = window.innerHeight * this.devicePixelRatio;
        this.canvas.style.height = window.innerHeight + 'px';

        var ctx = this.canvas.getContext('2d');

        var _contain2 = (0, _ci.contain)(this.canvas.width, this.canvas.height, event.target.width, event.target.height),
            offsetX = _contain2.offsetX,
            offsetY = _contain2.offsetY,
            width = _contain2.width,
            height = _contain2.height;

        ctx.drawImage(event.target, offsetX, offsetY, width, height);
      } else {
        this.canvas.width = this.container.offsetWidth * this.devicePixelRatio;
        this.canvas.style.width = this.container.offsetWidth + 'px';
        this.canvas.height = this.container.offsetWidth * this.devicePixelRatio / event.target.width * event.target.height;
        this.canvas.style.height = this.container.offsetWidth / event.target.width * event.target.height + 'px';

        var _ctx = this.canvas.getContext('2d');

        _ctx.drawImage(event.target, 0, 0, this.canvas.width, this.canvas.height);
      }

      if (this.lazyload && !this.fullScreenView) {
        this.images.forEach(function (image, index) {
          if (index === 0) {
            _this.innerBox.removeChild(_this.lazyloadInitImage);
            return;
          }

          var dataSrc = image.getAttribute('data-src');

          if (dataSrc) {
            image.src = image.getAttribute('data-src');
          }
        });
      }

      if (this.ratio) {
        this.container.style.minHeight = 'auto';
      }

      if (this.magnifier && !this.fullScreenView) {
        this.addMagnifier();
      }

      if (this.boxShadow && !this.fullScreenView) {
        this.addBoxShadow();
      }

      if (this.bottomCircle && !this.fullScreenView) {
        this.add360ViewCircleIcon();
      }

      if (this.fullScreen && !this.fullScreenView) {
        this.addFullScreenIcon();
      } else if (this.fullScreenView) {
        this.addCloseFullScreenView();
      }
    }
  }, {
    key: 'onImageLoad',
    value: function onImageLoad(index, event) {
      var percentage = Math.round(this.loadedImages / this.amount * 100);

      this.loadedImages += 1;
      this.updatePercentageInLoader(percentage);

      if (this.loadedImages === this.amount) {
        this.onAllImagesLoaded(event);
      } else if (index === 0) {
        this.onFirstImageLoaded(event);
      }
    }
  }, {
    key: 'addCloseFullScreenView',
    value: function addCloseFullScreenView() {
      var closeFullScreenIcon = document.createElement('div');

      (0, _ci.setCloseFullScreenViewStyles)(closeFullScreenIcon);

      closeFullScreenIcon.onclick = this.closeFullScreenModal.bind(this);

      this.innerBox.appendChild(closeFullScreenIcon);
    }
  }, {
    key: 'add360ViewIcon',
    value: function add360ViewIcon() {
      var view360Icon = document.createElement('div');

      (0, _ci.set360ViewIconStyles)(view360Icon);

      view360Icon.innerText = '0%';

      this.view360Icon = view360Icon;
      this.innerBox.appendChild(view360Icon);
    }
  }, {
    key: 'addFullScreenIcon',
    value: function addFullScreenIcon() {
      var fullScreenIcon = document.createElement('div');

      (0, _ci.setFullScreenIconStyles)(fullScreenIcon);

      fullScreenIcon.onclick = this.openFullScreenModal.bind(this);

      this.innerBox.appendChild(fullScreenIcon);
    }
  }, {
    key: 'addMagnifier',
    value: function addMagnifier() {
      var magnifyIcon = document.createElement('div');

      (0, _ci.setMagnifyIconStyles)(magnifyIcon, this.fullScreen);

      magnifyIcon.onclick = this.magnify.bind(this);

      this.innerBox.appendChild(magnifyIcon);
    }
  }, {
    key: 'getOriginalSrc',
    value: function getOriginalSrc() {
      var currentImage = this.images[this.activeImage - 1];
      var lastIndex = currentImage.src.lastIndexOf('//');

      return lastIndex > 10 ? currentImage.src.slice(lastIndex) : currentImage.src;
    }
  }, {
    key: 'magnify',
    value: function magnify() {
      var _this2 = this;

      var image = new Image();
      var src = this.getOriginalSrc();

      image.src = src;
      image.onload = function () {
        if (_this2.glass) {
          _this2.glass.style.cursor = 'none';
        }
      };

      this.glass = document.createElement('div');
      this.container.style.overflow = 'hidden';
      (0, _ci.magnify)(this.container, src, this.glass, this.magnifier || 3);
    }
  }, {
    key: 'closeMagnifier',
    value: function closeMagnifier() {
      if (!this.glass) return;

      this.container.style.overflow = 'visible';
      this.container.removeChild(this.glass);
      this.glass = null;
    }
  }, {
    key: 'openFullScreenModal',
    value: function openFullScreenModal() {
      var fullScreenModal = document.createElement('div');

      (0, _ci.setFullScreenModalStyles)(fullScreenModal);

      var fullScreenContainer = this.container.cloneNode();
      var image = this.images[0];
      var ratio = image.height / image.width;

      fullScreenContainer.style.height = '100%';
      fullScreenContainer.style.maxHeight = '100%';

      fullScreenModal.appendChild(fullScreenContainer);

      window.document.body.appendChild(fullScreenModal);

      new CI360Viewer(fullScreenContainer, true, ratio);
    }
  }, {
    key: 'closeFullScreenModal',
    value: function closeFullScreenModal() {
      document.body.removeChild(this.container.parentNode);
    }
  }, {
    key: 'add360ViewCircleIcon',
    value: function add360ViewCircleIcon() {
      var view360CircleIcon = new Image();

      (0, _ci.set360ViewCircleIconStyles)(view360CircleIcon, this.bottomCircleOffset);

      this.view360CircleIcon = view360CircleIcon;
      this.innerBox.appendChild(view360CircleIcon);
    }
  }, {
    key: 'hide360ViewCircleIcon',
    value: function hide360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;

      this.view360CircleIcon.style.opacity = '0';
    }
  }, {
    key: 'show360ViewCircleIcon',
    value: function show360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;

      this.view360CircleIcon.style.opacity = '1';
    }
  }, {
    key: 'remove360ViewCircleIcon',
    value: function remove360ViewCircleIcon() {
      if (!this.view360CircleIcon) return;

      this.innerBox.removeChild(this.view360CircleIcon);
      this.view360CircleIcon = null;
    }
  }, {
    key: 'addLoader',
    value: function addLoader() {
      var loader = document.createElement('div');

      (0, _ci.setLoaderStyles)(loader);

      this.loader = loader;
      this.innerBox.appendChild(loader);
    }
  }, {
    key: 'addBoxShadow',
    value: function addBoxShadow() {
      var boxShadow = document.createElement('div');

      (0, _ci.setBoxShadowStyles)(boxShadow, this.boxShadow);

      this.innerBox.appendChild(boxShadow);
    }
  }, {
    key: 'removeLoader',
    value: function removeLoader() {
      if (!this.loader) return;

      this.innerBox.removeChild(this.loader);
      this.loader = null;
    }
  }, {
    key: 'remove360ViewIcon',
    value: function remove360ViewIcon() {
      if (!this.view360Icon) return;

      this.innerBox.removeChild(this.view360Icon);
      this.view360Icon = null;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      if (this.bottomCircle) this.hide360ViewCircleIcon();
      this.remove360ViewIcon();

      this.loopTimeoutId = window.setInterval(function () {
        _this3.loop(_this3.reversed);
      }, this.autoplaySpeed);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.bottomCircle) this.show360ViewCircleIcon();
      window.clearTimeout(this.loopTimeoutId);
    }
  }, {
    key: 'getSrc',
    value: function getSrc(responsive, container, folder, filename, _ref) {
      var ciSize = _ref.ciSize,
          ciToken = _ref.ciToken,
          ciOperation = _ref.ciOperation,
          ciFilters = _ref.ciFilters;

      var src = '' + folder + filename;

      if (responsive) {
        var imageOffsetWidth = container.offsetWidth;

        if (this.fullScreenView) {
          var containerRatio = container.offsetHeight / container.offsetWidth;

          if (this.ratio > containerRatio) {
            imageOffsetWidth = container.offsetHeight / this.ratio;
          }
        }

        var ciSizeNext = (0, _ci.getSizeAccordingToPixelRatio)(ciSize || (0, _ci.getResponsiveWidthOfContainer)(imageOffsetWidth));

        src = 'https://' + ciToken + '.cloudimg.io/' + ciOperation + '/' + ciSizeNext + '/' + ciFilters + '/' + src;
      }

      return src;
    }
  }, {
    key: 'preloadImages',
    value: function preloadImages(amount, src, lazyload, lazySelector, container, responsive, ciParams) {
      var _this4 = this;

      if (this.imageList) {
        try {
          var images = JSON.parse(this.imageList);

          this.amount = images.length;
          images.forEach(function (src, index) {
            var folder = /(http(s?)):\/\//gi.test(src) ? '' : _this4.folder;
            var resultSrc = _this4.getSrc(responsive, container, folder, src, ciParams);

            _this4.addImage(resultSrc, lazyload, lazySelector, index);
          });
        } catch (error) {
          console.error('Wrong format in image-list attribute: ' + error.message);
        }
      } else {
        ;[].concat(_toConsumableArray(new Array(amount))).map(function (_item, index) {
          var nextZeroFilledIndex = (0, _ci.pad)(index + 1, _this4.indexZeroBase);
          var resultSrc = src.replace('{index}', nextZeroFilledIndex);
          _this4.addImage(resultSrc, lazyload, lazySelector, index);
        });
      }
    }
  }, {
    key: 'addImage',
    value: function addImage(resultSrc, lazyload, lazySelector, index) {
      var image = new Image();

      if (lazyload && !this.fullScreenView) {
        image.setAttribute('data-src', resultSrc);
        image.className = image.className.length ? image.className + (' ' + lazySelector) : lazySelector;

        if (index === 0) {
          this.lazyloadInitImage = image;
          image.style.position = 'absolute';
          image.style.top = '0';
          image.style.left = '0';
          this.innerBox.appendChild(image);
        }
      } else {
        image.src = resultSrc;
      }

      image.onload = this.onImageLoad.bind(this, index);
      image.onerror = this.onImageLoad.bind(this, index);
      this.images.push(image);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      stop();

      var oldElement = this.container;
      var newElement = oldElement.cloneNode(true);
      var innerBox = newElement.querySelector('.cloudimage-inner-box');

      newElement.className = newElement.className.replace(' initialized', '');
      newElement.style.position = 'relative';
      newElement.style.width = '100%';
      newElement.style.cursor = 'default';
      newElement.setAttribute('draggable', 'false');
      newElement.style.minHeight = 'auto';
      newElement.removeChild(innerBox);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }, {
    key: 'initControls',
    value: function initControls() {
      var _this5 = this;

      var isReverse = this.controlReverse ? !this.spinReverse : this.spinReverse;
      var prev = this.container.querySelector('.cloudimage-360-prev');
      var next = this.container.querySelector('.cloudimage-360-next');

      if (!prev && !next) return;

      var onLeftStart = function onLeftStart(event) {
        event.stopPropagation();
        _this5.onSpin();
        _this5.prev();
        _this5.loopTimeoutId = window.setInterval(_this5.prev.bind(_this5), _this5.autoplaySpeed);
      };
      var onRightStart = function onRightStart(event) {
        event.stopPropagation();
        _this5.onSpin();
        _this5.next();
        _this5.loopTimeoutId = window.setInterval(_this5.next.bind(_this5), _this5.autoplaySpeed);
      };
      var onLeftEnd = function onLeftEnd() {
        _this5.onFinishSpin();
        window.clearTimeout(_this5.loopTimeoutId);
      };
      var onRightEnd = function onRightEnd() {
        _this5.onFinishSpin();
        window.clearTimeout(_this5.loopTimeoutId);
      };

      if (prev) {
        prev.style.display = 'block';
        prev.addEventListener('mousedown', isReverse ? onRightStart : onLeftStart);
        prev.addEventListener('touchstart', isReverse ? onRightStart : onLeftStart);
        prev.addEventListener('mouseup', isReverse ? onRightEnd : onLeftEnd);
        prev.addEventListener('touchend', isReverse ? onRightEnd : onLeftEnd);

        this.prevElem = prev;
      }

      if (next) {
        next.style.display = 'block';
        next.addEventListener('mousedown', isReverse ? onLeftStart : onRightStart);
        next.addEventListener('touchstart', isReverse ? onLeftStart : onRightStart);
        next.addEventListener('mouseup', isReverse ? onLeftEnd : onRightEnd);
        next.addEventListener('touchend', isReverse ? onLeftEnd : onRightEnd);

        this.nextElem = next;
      }

      if (isReverse ? next : prev) {
        if (this.stopAtEdges) {
          (0, _ci.addClass)(isReverse ? next : prev, 'not-active');
        }
      }
    }
  }, {
    key: 'addInnerBox',
    value: function addInnerBox() {
      this.innerBox = document.createElement('div');
      this.innerBox.className = 'cloudimage-inner-box';
      this.container.appendChild(this.innerBox);
    }
  }, {
    key: 'addCanvas',
    value: function addCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.style.width = '100%';
      this.canvas.style.fontSize = '0';

      if (this.ratio) {
        this.container.style.minHeight = this.container.offsetWidth * this.ratio + 'px';
        this.canvas.height = parseInt(this.container.style.minHeight);
      }

      this.innerBox.appendChild(this.canvas);
    }
  }, {
    key: 'attachEvents',
    value: function attachEvents(draggable, swipeable, keys) {
      if (draggable) {
        this.container.addEventListener('mousedown', this.mousedown.bind(this));
        this.container.addEventListener('mouseup', this.mouseup.bind(this));
        this.container.addEventListener('mousemove', this.mousemove.bind(this));
      }

      if (swipeable) {
        this.container.addEventListener('touchstart', this.touchstart.bind(this), { passive: true });
        this.container.addEventListener('touchend', this.touchend.bind(this), {
          passive: true
        });
        this.container.addEventListener('touchmove', this.touchmove.bind(this));
      }

      if (keys) {
        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
      } else {
        document.addEventListener('keydown', this.keydownGeneral.bind(this));
      }
    }
  }, {
    key: 'applyStylesToContainer',
    value: function applyStylesToContainer() {
      this.container.style.position = 'relative';
      this.container.style.width = '100%';
      this.container.style.cursor = 'wait';
      this.container.setAttribute('draggable', 'false');
      this.container.className = this.container.className + ' initialized';
    }
  }, {
    key: 'init',
    value: function init(container) {
      var _get360ViewProps = (0, _ci.get360ViewProps)(container),
          folder = _get360ViewProps.folder,
          filename = _get360ViewProps.filename,
          imageList = _get360ViewProps.imageList,
          indexZeroBase = _get360ViewProps.indexZeroBase,
          amount = _get360ViewProps.amount,
          _get360ViewProps$drag = _get360ViewProps.draggable,
          draggable = _get360ViewProps$drag === undefined ? true : _get360ViewProps$drag,
          _get360ViewProps$swip = _get360ViewProps.swipeable,
          swipeable = _get360ViewProps$swip === undefined ? true : _get360ViewProps$swip,
          keys = _get360ViewProps.keys,
          bottomCircle = _get360ViewProps.bottomCircle,
          bottomCircleOffset = _get360ViewProps.bottomCircleOffset,
          boxShadow = _get360ViewProps.boxShadow,
          autoplay = _get360ViewProps.autoplay,
          speed = _get360ViewProps.speed,
          autoplayReverse = _get360ViewProps.autoplayReverse,
          fullScreen = _get360ViewProps.fullScreen,
          magnifier = _get360ViewProps.magnifier,
          ratio = _get360ViewProps.ratio,
          responsive = _get360ViewProps.responsive,
          ciToken = _get360ViewProps.ciToken,
          ciSize = _get360ViewProps.ciSize,
          ciOperation = _get360ViewProps.ciOperation,
          ciFilters = _get360ViewProps.ciFilters,
          lazyload = _get360ViewProps.lazyload,
          lazySelector = _get360ViewProps.lazySelector,
          spinReverse = _get360ViewProps.spinReverse,
          dragSpeed = _get360ViewProps.dragSpeed,
          stopAtEdges = _get360ViewProps.stopAtEdges,
          controlReverse = _get360ViewProps.controlReverse,
          hide360Logo = _get360ViewProps.hide360Logo;

      var ciParams = { ciSize: ciSize, ciToken: ciToken, ciOperation: ciOperation, ciFilters: ciFilters };

      this.addInnerBox();
      this.addLoader();

      this.folder = folder;
      this.filename = filename;
      this.imageList = imageList;
      this.indexZeroBase = indexZeroBase;
      this.amount = amount;
      this.bottomCircle = bottomCircle;
      this.bottomCircleOffset = bottomCircleOffset;
      this.boxShadow = boxShadow;
      this.autoplay = autoplay && !this.isMobile;
      this.speed = speed;
      this.reversed = autoplayReverse;
      this.fullScreen = fullScreen;
      this.magnifier = !this.isMobile && magnifier ? magnifier : false;
      this.lazyload = lazyload;
      this.ratio = ratio;
      this.spinReverse = spinReverse;
      this.controlReverse = controlReverse;
      this.dragSpeed = dragSpeed;
      this.autoplaySpeed = this.speed * 36 / this.amount;
      this.stopAtEdges = stopAtEdges;
      this.hide360Logo = hide360Logo;

      this.applyStylesToContainer();

      this.addCanvas();

      var src = this.getSrc(responsive, container, folder, filename, ciParams);

      this.preloadImages(amount, src, lazyload, lazySelector, container, responsive, ciParams);

      this.attachEvents(draggable, swipeable, keys);
    }
  }]);

  return CI360Viewer;
}();

exports.default = CI360Viewer;