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
  // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();

  // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
  const now = new Date();

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다. 
  const distance = setDate.getTime() - now.getTime();
  
  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다. 
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
  const day = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);

  // D-Day 날짜를 가져오고,
  // 삼항 연산자를 사용해서 값이 10보다 작을 경우에 대해 조건부 렌더링을 해준다.
  Dday.innerText = `${day}`;
  Dhour.innerText =  `${hours < 10 ? `0${hours}` : hours}`;
  Dmin.innerText = `${minutes < 10 ? `0${minutes}` : minutes}`;
  Dsec.innerText =  `${seconds < 10 ? `0${seconds}` : seconds}`;
     
  }

const init = () => {
  // init 함수 생성해서 getDDay함수 호출하고,
  getDDay();
  // setInterval 메서드에서 getDDay함수를 1초(1000밀리초)마다 호출한다.
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

