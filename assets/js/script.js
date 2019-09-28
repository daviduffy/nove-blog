// Off-canvas menu init
// =============================================================================
const oc = {
  toggleClassMenu() {
    oc.menu.classList.add('OffCanvas--anim');
    if (!oc.menu.classList.contains('OffCanvas--vis')) {
      oc.menu.classList.add('OffCanvas--vis');
    } else {
      oc.menu.classList.remove('OffCanvas--vis');
    }
  },
  OnTransitionEnd() {
    oc.menu.classList.remove('OffCanvas--anim');
  },
  menu: document.querySelector('.OffCanvas'),
  bars: document.querySelector('.Header__trg'),
  times: document.querySelector('.OffCanvas__trg'),
  bg: document.querySelector('.OffCanvas__x'),
  links: Array.from(document.querySelectorAll('.Header__nav--offcanvas .a--menu')),
  init: () => {
    oc.menu.addEventListener('transitionend', oc.OnTransitionEnd, false);
    oc.bars.addEventListener('click', oc.toggleClassMenu, false);
    oc.bg.addEventListener('click', oc.toggleClassMenu, false);
    oc.times.addEventListener('click', oc.toggleClassMenu, false);
    oc.links.forEach((link) => {
      link.addEventListener('click', oc.toggleClassMenu, false);
    });
  }
};
oc.init();


// Set CSS Custom Properties
// =============================================================================
const css_prop = {
  obj: {},
  returnTarget: () => document.getElementById('style_target'),
  returnTemplate : string => `html:root{${string}}`,

  // destructure object and provide default values
  addMultiple: (array = []) => {
    array.forEach((item, index) => {
      item.flag = (index === array.length - 1);
      css_prop.add(item);
    });
  },
  add: ({ property = '', value = '', flag = false }) => {
    css_prop.obj[property] = value;
    flag && css_prop.update(css_prop.obj);
  },
  update: (obj = css_prop.obj) => {
    // this could probably be a reduce but I can't figure it out
    var css_custom_props = '';
    for ( var key in obj ) {
      css_custom_props += (key + ': ' + obj[key] + ';');
    }
    css_prop.returnTarget().innerHTML = css_prop.returnTemplate(css_custom_props);
  }
};

// change color of menu on scroll
// ===========================================================================
const scroll = {
  initialized: false,
  last_known_position: 0,
  a_is_ticking: false,
  // b_is_ticking: false,
  c_is_ticking: false,
  getHeader: () => document.querySelector('.Header'),
  init: (elem, page) => {
    if (scroll.initialized) { return console.log('scroll.init already ran'); };
    scroll.header = scroll.getHeader();
    // scroll.element_height = document.querySelector(elem).clientHeight;
    window.addEventListener('scroll', scroll.handlerA, false);
    if (page === 'home') {
      // window.addEventListener('scroll', scroll.handlerB, false);
      window.addEventListener('scroll', scroll.handlerC, false);
    }
    scroll.initialized = true;
  },
  handlerA: (scrollHeight) => {
    scroll.direction = window.scrollY < scroll.last_known_position ? 'up' : 'down';
    scroll.last_known_position = window.scrollY;

    if (!scroll.a_is_ticking) {
      window.requestAnimationFrame(() => {
        if (scroll.last_known_position > 0) {
          scroll.header.classList.add('Header--inverted');
        } else {
          scroll.header.classList.remove('Header--inverted');
        }
        scroll.a_is_ticking = false;
      });
    }
    scroll.a_is_ticking = true;
  },
  // handlerB: () => {
  //   if (!scroll.b_is_ticking) {
  //     window.requestAnimationFrame(() => {
  //       const scrollposition = window.innerHeight + scroll.last_known_position;
  //       const bodyHeight = document.body.clientHeight;
  //       const percentage = scrollposition / bodyHeight;
  //       const start = 0.76;
  //       const end = 0.93;
  //       if (percentage > start && percentage < end) {
  //         const threadProgress = (((percentage - start) / (end - start)) * 700) + 700;
  //         css_prop.add({ property: '--puzzle-stroke', value: threadProgress, flag: true });
  //       }
  //       if (percentage > 1) {
  //         css_prop.add({ property: '--puzzle-stroke', value: 1400, flag: true });
  //         window.removeEventListener('scroll', scroll.handlerB, false);
  //       }
  //       scroll.b_is_ticking = false;
  //     });
  //   }
  //   scroll.b_is_ticking = true;
  // },

  // add handler that draws with SVG

  handlerC: () => {
    if (!scroll.c_is_ticking) {
      window.requestAnimationFrame(() => {
        const scrollposition = window.innerHeight + scroll.last_known_position;
        // console.log(`\n\nscroll position: ${scrollposition}\n\n`)
        const bodyHeight = document.body.clientHeight;
        const percentage = scrollposition / bodyHeight;
        const start = window.innerWidth > 600 ? 0.35 : 0.30;
        const end = window.innerWidth > 600 ? 0.46 : 0.50;
        const overrideCSS = ({ step = 0, type = 'clear' } = {}) => {
          const steps = type === 'clear' ? [
            // incomplete values
            { property: '--thread-form', value: 0, flag: true },
            { property: '--thread-form-mask', value: 100, flag: true },
            { property: '--thread-ellipse-1', value: 220, flag: true },
            { property: '--thread-node', value: 300, flag: true },
            { property: '--thread-small-line', value: 300, flag: true },
            { property: '--thread-ellipse-2', value: 300, flag: true },
            { property: '--thread-large-line', value: 300, flag: true },
            { property: '--thread-line-endcap', value: 300, flag: true },
            { property: '--thread-ellipse-endcap', value: 300, flag: true }
          ] : [
            // complete values
            { property: '--thread-form', value: 27.5, flag: true },
            { property: '--thread-form-mask', value: '-2px', flag: true },
            { property: '--thread-ellipse-1', value: 150, flag: true },
            { property: '--thread-node', value: 320, flag: true },
            { property: '--thread-small-line', value: 307, flag: true },
            { property: '--thread-ellipse-2', value: 440, flag: true },
            { property: '--thread-large-line', value: 333, flag: true },
            { property: '--thread-line-endcap', value: 312, flag: true },
            { property: '--thread-ellipse-endcap', value: 312, flag: true }
          ];
          const stepsToOverride = type === 'clear' ? steps.slice(step) : steps.slice(0, step);
          css_prop.addMultiple(stepsToOverride);
        };
        if (percentage < start) {
          overrideCSS(); // defaults cause overrideCSS
        } else if (percentage > start && percentage < end) {
          const progress = ((percentage - start) / (end - start));
          const messageStart = 0;
          const messageEnd = 0.18;
          const ellipseOneStart = 0.18;
          const ellipseOneEnd = 0.48;
          const nodeStart = 0.48001;
          const nodeEnd = 0.52;
          const ellipseTwoStart = 0.52001;
          const ellipseTwoEnd = 0.96;
          const smallLineStart = ellipseTwoStart;
          const smallLineEnd = 0.56;
          const largeLineStart = 0.65;
          const largeLineEnd = 0.82;
          const lineEndcapStart = 0.84001;
          const lineEndcapEnd = 0.88;
          const ellipseEndcapStart = 0.96001;
          const ellipseEndcapEnd = 1;

          const handleSetCSS = ({ scrollProgress, start, end, calc, cssVar }) => {
            const duration = end - start;
            const nodeProgress = (scrollProgress - start) / duration;
            const cssValue = calc(nodeProgress);
            css_prop.add({ property: cssVar, value: cssValue, flag: true });
          }
          if (progress > messageStart && progress < messageEnd) {
            const calcTransition = p => `${Math.round(p * 28, 10)}px`;
            const cssVarTransition = '--thread-form';
            handleSetCSS({ start: messageStart, end: messageEnd, scrollProgress: progress, calc: calcTransition, cssVar: cssVarTransition });

            const calcMask = p => `${100 - (p * 100)}%`;
            const cssVarMask = '--thread-form-mask';
            handleSetCSS({ start: messageStart, end: messageEnd, scrollProgress: progress, calc: calcMask, cssVar: cssVarMask });
            if (scroll.direction === 'up') {
              overrideCSS({ step: 2, type: 'clear' });
            }
          }
          if (progress > ellipseOneStart && progress < ellipseOneEnd) {
            // 220 => 150 for stroke 1
            const calc = p => 220 - (p * 70);
            const cssVar = '--thread-ellipse-1';
            handleSetCSS({ start: ellipseOneStart, end: ellipseOneEnd, scrollProgress: progress, calc, cssVar });
            if (scroll.direction === 'up') {
              overrideCSS({ step: 3, type: 'clear' });
            } else {
              overrideCSS({ step: 2, type: 'set' });
            }
          } else if (progress > nodeStart && progress < nodeEnd) {
            // 300 => 320 for node
            const cssVar = '--thread-node';
            const calc = p => (p * 20) + 300;
            handleSetCSS({ start: nodeStart, end: nodeEnd, scrollProgress: progress, calc, cssVar });
            if (scroll.direction === 'up') {
              overrideCSS({ step: 5, type: 'clear' });
            } else {
              overrideCSS({ step: 3, type: 'set' });
            }
          } else if (progress > ellipseTwoStart) {
            if (progress > smallLineStart && progress < smallLineEnd) {
              // 300 => 307 for tiny line
              const cssVar = '--thread-small-line';
              const calc = p => (p * 7) + 300;
              handleSetCSS({ start: smallLineStart, end: smallLineEnd, scrollProgress: progress, calc, cssVar });
              if (scroll.direction === 'up') {
                overrideCSS({ step: 6, type: 'clear' });
              } else {
                overrideCSS({ step: 4, type: 'set' });
              }
            }
            if (progress > ellipseTwoStart && progress < ellipseTwoEnd) {
              // 300 => 440 for stroke 2
              const cssVar = '--thread-ellipse-2';
              const calc = p => (p * 140) + 300;
              handleSetCSS({ start: ellipseTwoStart, end: ellipseTwoEnd, scrollProgress: progress, calc, cssVar });
              if (scroll.direction === 'up') {
                overrideCSS({ step: 8, type: 'clear' });
              }
            }
            if (progress > largeLineStart && progress < largeLineEnd) {
              // 300 => 333 for larger line
              const cssVar = '--thread-large-line';
              const calc = p => (p * 33) + 300;
              handleSetCSS({ start: largeLineStart, end: largeLineEnd, scrollProgress: progress, calc, cssVar });
              if (scroll.direction === 'up') {
                overrideCSS({ step: 7, type: 'clear' });
              } else {
                overrideCSS({ step: 5, type: 'set' });
              }
            }
            if (progress > lineEndcapStart && progress < lineEndcapEnd) {
              // 300 => 312 for arrow caps
              const cssVar = '--thread-line-endcap';
              const calc = p => (p * 12) + 300;
              handleSetCSS({ start: lineEndcapStart, end: lineEndcapEnd, scrollProgress: progress, calc, cssVar });
            }
            if (progress > ellipseEndcapStart && progress < ellipseEndcapEnd) {
              // 300 => 312 for arrow caps
              const cssVar = '--thread-ellipse-endcap';
              const calc = p => (p * 12) + 300;
              handleSetCSS({ start: ellipseEndcapStart, end: ellipseEndcapEnd, scrollProgress: progress, calc, cssVar });
            }
            if (progress > 0.99) {
              overrideCSS({ step: 7, type: 'set' });
              window.removeEventListener('scroll', scroll.handlerC, false);
            }
          }
        } else if (percentage > end) {
          overrideCSS({ step: 9, type: 'set' });
          window.removeEventListener('scroll', scroll.handlerC, false);
        }
        scroll.c_is_ticking = false;
      });
    }
    scroll.c_is_ticking = true;
  }
};

// Enable Accordion
// =============================================================================
const Acrd = {
  toggle: (elem) => {
    const parent = elem.parentNode;
    parent.classList.toggle('Acrd--o');
  }
};

// Event handler for ensuring UItip doesn't appear offscreen
// =============================================================================
const UItip = {
  handler: (elem) => {
    if (!elem.classList.contains('onscreen')) {
      // forceContentOnscreen(elem.querySelector('.UItip__text'));
      elem.classList.add('onscreen');
    }
  },
  init: (parent = document) => {
    const elements = Array
      .from(parent.querySelectorAll('.UItip'))
      .filter(el => !el.classList.contains('onscreen'));
    elements.forEach((elem) => {
      // forceContentOnscreen(elem.querySelector('.UItip__text'));

      elem.removeEventListener('touchstart', () => UItip.handler(this), false);
      elem.addEventListener('touchstart', () => UItip.handler(this), false);

      elem.removeEventListener('mouseover', () => UItip.handler(this), false);
      elem.addEventListener('mouseover', () => UItip.handler(this), false);

      elem.removeEventListener('click', () => UItip.handler(this), false);
      elem.addEventListener('click', () => UItip.handler(this), false);
    });
  }
};

const Feature = {
  expand: (elem) => {
    console.log(elem);
    const parent = elem.parentNode;
    console.log(parent);
    Array.from(parent.querySelectorAll('.RM')).forEach(it => it.parentNode.removeChild(it));
    parent.querySelector('.Feature__text--more').style.display = 'inline';
  }
};
