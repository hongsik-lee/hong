document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4
  };

  // IMAGE ANIMATION
  let revealCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;

      if (entry.isIntersecting) {
        console.log(container);
        container.classList.add("animating");
        return;
      }

      // if (entry.boundingClientRect.top > 0) {
      //   container.classList.remove("animating");
      // }
    });
  };

  let revealObserver = new IntersectionObserver(revealCallback, options);

  document.querySelectorAll(".reveal").forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  // TEXT ANIMATION
  let fadeupCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;
      container.classList.add("not-fading-up");

      if (entry.isIntersecting) {
        container.classList.add("fading-up");
        return;
      }

      // if (entry.boundingClientRect.top > 0) {
      //   container.classList.remove("fading-up");
      // }
    });
  };

  let fadeupObserver = new IntersectionObserver(fadeupCallback, options);

  document.querySelectorAll(".fadeup").forEach((fadeup) => {
    fadeupObserver.observe(fadeup);
  });
});
class Particle{
  constructor(id, opt) {
    this.box = document.getElementById(id);
    this.number = opt.number || 100;
    this.colors = this.handleArrayParams(opt.colors) || ['#400606', '#c7b4aa', '#ffffff'];
    this.width = opt.width || 15;
    this.height = opt.height || 7;
    this.duration = opt.duration || 6000;
    this.delay = opt.delay || 6000;
  }
  handleArrayParams(arr) {
    return Array.isArray(arr) && arr.length > 0 && arr.every(el => el[0]==='#') ? arr : false;
  }
  getRandom(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max+1);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getRange(num, range = 0.5){
    const symbol = Math.random() > 0.5 ? +1 : -1;
    return num + this.getRandom(Math.floor(num * range)) * symbol;
  }
  start() {
    for(let i = 0; i < this.number; i++){
      const temp = document.createElement('span');
      temp.style.cssText += `
        position: absolute;
        transform-style: preserve-3d;
        animation-timing-function: cubic-bezier(${this.getRandom(3)*0.1}, 0, 1, 1);
        animation-iteration-count: infinite;
        width: ${this.getRange(this.width, 0.7)}px;
        height: ${this.getRange(this.height, 0.7)}px;
        top: -${this.width * 2}px;
        left: calc(${this.getRandom(100)}% - ${this.width*0.5}px);
        background-color: ${this.colors[this.getRandom(this.colors.length-1)]};
        animation-name: fallen_${this.getRandom(5, 1)};
        animation-duration: ${this.getRange(this.duration)}ms;
        animation-delay: ${this.getRange(this.delay)}ms;
       `;
      this.box.append(temp);
    }
  }
}
const party = new Particle('particle', { number: 200, colors: ['#ffca76', '#ffb9b9', '#fff180'] });
party.start();

function copy(id){
  var r = document.createRange();
  r.selectNode(document.getElementById(id));
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  alert('복사되었습니다.')
}


const mask = document.querySelector('#particle');
const html = document.querySelector('html');

// html.style.overflow = 'hidden'; 
window.addEventListener('load', function () {
 
  setTimeout(function () {
    mask.style.opacity = '0';
    html.style.overflow = 'auto';
    mask.style.display = 'none';
  }, 10000);
})


// const scrollSection = document.querySelector('.horizontal-scroll__section');
// const scrollContent = document.querySelector('.horizontal-scroll__content');

// const scrollHeight = scrollSection.clientHeight;
// const contentWidth = scrollContent.clientWidth;

// document.addEventListener('scroll', e => {
//     const scrolled = window.pageYOffset;
//     const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
//     const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));
   
//        if (scrollSection.offsetTop <= scrolled && notReachedBottom)  {
           
//             gsap.to(scrollContent, {
//                 x: - sectionOffset
//             })
//        }
// });

// Dday Counter
const Dday= document.querySelector(".day");
const Dhour = document.querySelector(".hour");
const Dmin = document.querySelector(".min");
const Dsec = document.querySelector(".sec");

const getDDay = () => {
  const setDate = new Date("2024-09-01T13:00:00+0900");
  const setDateYear = setDate.getFullYear();
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();
  const now = new Date();
  const distance = setDate.getTime() - now.getTime();
  
  const day = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);

  Dday.innerText = `${day}`;
  Dhour.innerText =  `${hours < 10 ? `0${hours}` : hours}`;
  Dmin.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
  Dsec.innerText =  `${seconds < 10 ? `0${seconds}` : seconds}`;
     
  }

const init = () => {
  getDDay();
  setInterval(getDDay, 1000);
}

init();

function collapse(element) {
  var before = document.getElementsByClassName("active")[0] 
  if (before && document.getElementsByClassName("active")[0] != element) { 
      before.nextElementSibling.style.maxHeight = null;   
      before.classList.remove("active");               
  }
  element.classList.toggle("active");         

  var content = element.nextElementSibling;
  if (content.style.maxHeight != 0) {        
      content.style.maxHeight = null;        
  } else {
      content.style.maxHeight = content.scrollHeight + "px";
  }
}

