document.addEventListener("DOMContentLoaded", () => {
  $('#main_intro').on('ended', function () {
    $(this).hide();
  });

  const key_visual = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      trigger: "#key_visual",
      start: "top top",
      end: "bottom top",
      // markers: true,
    }
  });

  key_visual.to('#key_visual', {
    y: "-100vh",
    duration: 1,
    ease: "power2.out"
  },);

  /* (공통) 좌우스크롤박스 안내이미지 인터렉션 */
  $('.x_scr_box').on('scroll', function () {
    $(this).addClass('off');
  });


  /****************** 핸드폰 돌아가는 인터렉션 시작 ******************/
  /* NEWNAL INTRODUCE */
  const intro_phone = document.getElementById("intro_phone");
  const currentFrame = i => `src/images/intro_device/intro_device${i}.png`;

  /* 이미지 미리 로드 ( i <= 이미지갯수 부분말고 수정 할 일 없어요 ) */
  const preloadImages = () => {
    for (let i = 1; i <= 61; i++) {
      const img = new Image();
      img.src = `src/images/intro_device/intro_device${i}.png`;
    }
  };
  preloadImages();
  /* //이미지 미리 로드 */


  // 애니메이션 대상 객체 (이건 건드릴 일 없어요)
  const obj = { frame: 1 };

  // 타임라인 생성 
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      trigger: ".phone_movement_wrap",
      start: "45% top",
      end: "bottom bottom",
      id: "newnal_introduce_anchor",
      // markers: true,
    }
  });

  /************** 1. 프레임 1 -> 40 진행 **************/
  tl.to('.phone_movement_wrap .intro_tit', { // 1. "Nice run, ~ our era." 텍스트가 확대되며 사라짐
    opacity: 0,
    scale: 1.2,
    duration: 1.5,
    ease: "power2.out"
  }, 0); // "<"는 위와 동시에 실행

  tl.to(obj, { // 2-1. 사라진 후 핸드폰 40까지 쭈루루룩 변경 됨 (핸드폰이 돌아가는 인터렉션) 
    frame: 61,
    duration: 5,
    onUpdate: () => {
      intro_phone.src = currentFrame(Math.round(obj.frame));
    }
  }, 0.3); // 핸드폰이 좀 더 늦게&빨리 나타나야되면 이 수치를 변경해야함  

  tl.to('#interaction_phone', { // 2-1. 동시에 핸드폰이 위로 올라감 
    y: "0%",
    duration: 5,
    ease: "power2.out"
  }, "<"); // "<"는 위와 동시에 실행

  /****************** //핸드폰 돌아가는 인터렉션 시작 끝!// ******************/


  // 스크롤해서 영상이 나타나면 그 때 플레이
  const preloadVideos = () => {
    for (let i = 1; i <= 6; i++) {
      const video = document.createElement('video');
      video.src = `src/images/pd_vid0${i}.mp4`;
      video.preload = 'auto';
      video.load();
    }
  };

  preloadVideos();

  const videos = document.querySelectorAll("video[data-scroll-play]");

  videos.forEach(videoEl => {
    ScrollTrigger.create({
      trigger: videoEl,
      start: "top 80%",
      end: "bottom top",
      // markers: true,
      onEnter: () => {
        videoEl.play().catch(e => console.warn("Play failed:", e));
      },
      onLeaveBack: () => {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    });
  });


  /* CORE TECH */
  let core_tech = gsap.timeline({
    scrollTrigger: {
      trigger: '.core_tech_category',
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    }
  });

  let items = gsap.utils.toArray(".core_tech_category ol > li").slice(1); // 두 번째 li부터
  let titBoxes = items.map(el => el.querySelector(".tit_box")); // 각 li 안의 tit_box

  // li 올라오는 애니메이션
  core_tech.fromTo(items,
    { y: "100%" },
    {
      y: "0%",
      duration: 1,
      ease: "power2.out",
      stagger: {
        each: 1,
        from: "start"
      }
    }
  );

  // .tit_box 색상 전환 (같은 stagger 적용)
  core_tech.to(titBoxes,
    {
      color: "#FF4B1C",
      duration: 1,
      ease: "power2.out",
      stagger: {
        each: 1,
        from: "start"
      }
    },
    0 // 같이 시작
  );

  /* PRODUCT VIDEO */
  let pd_vid_btn = $('#product_video .vid_list ul li button');
  let pd_vid = $('#product_video .pd_vid');
  pd_vid_btn.mouseenter(function () {
    let vid_val = $(this).data('vid');
    $(this).closest('li').addClass('on').siblings().removeClass('on');
    pd_vid.attr("src", vid_val);
  });

  pd_vid_btn.click(function () {
    $('#product_video .vid_pop').addClass('on');
    $('#product_video .vid_box').addClass('off');
    $('#product_video .vid_pop video')[0].play();
  });

  $('#product_video .close_btn').click(function () {
    $('#product_video .vid_pop').removeClass('on');
    $('#product_video .vid_box').removeClass('off');
    $('#product_video .vid_pop video')[0].pause();
  });

  pd_vid_btn.find('span').each(function () {
    let text = $(this).text().trim();

    let wrapped = text.split('').map((char, index) => {
      if (char === ' ') return ' ';
      let duration = (.5 + index * 0.05);
      return `<i style="transition-duration: ${duration}s">${char}</i>`;
    }).join('');

    // 적용
    $(this).html(wrapped);

    let originalSpan = $(this).first();
    let clone = originalSpan.clone();
    $(this).closest('button').append(clone);
  });

  /* MEDIA HIGHLIGHT */
  let swiper4 = new Swiper(".media_cont .swiper", {
    slidesPerView: 1.15,
    // spaceBetween: remToPx(18),
    speed: 1000,
    pagination: {
      el: '.media_cont .pagi',
      type: 'bullets',
    },
  });

  /* TO BE LAUNCHED */
  function remToPx(rem) {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return rem * rootFontSize;
  }

  let swiper = new Swiper(".to_be_launched_cont.m_swiper", {
    slidesPerView: 1.05,
    spaceBetween: remToPx(18),
    speed: 1000,
    navigation: {
      prevEl: ".to_be_launched_cont .sld_nav .prv",
      nextEl: ".to_be_launched_cont .sld_nav .nxt",
    },
  });


  /* CORE VALUE */
  let core_value = gsap.timeline({
    scrollTrigger: {
      trigger: '.core_value_cont',
      start: "top bottom",
      end: "bottom top",
      // markers: true,
      scrub: true,

    },
  });

  core_value
    .to('.core_value_list ul', { y: "-50%", },)

  /* HISTORY */
  const $ul = $('#history .years ul');
  const $lis = $ul.find('li');
  const year_anchor = $lis.height();
  const steps = $lis.length - 1;
  const total_scroll = year_anchor * steps;

  const history = gsap.timeline({
    scrollTrigger: {
      trigger: '#history',
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
      onEnter: () => $('#history').addClass('on'),
      onLeaveBack: () => $('#history').removeClass('on'),
      onUpdate: (self) => {
        const scrollY = self.progress * total_scroll;
        const activeIndex = Math.floor(scrollY / year_anchor);

        $lis.each((i, el) => {
          if (i === activeIndex) {
            $(el).css({ color: "#FF4B1C", fontWeight: 700 });
            $('.history_info .years_num').text($(el).text());
            $('.change_cont').each(function () {
              const $container = $(this);
              const $children = $container.children();

              $children.each(function (index) {
                const $el = $(this);

                if (index === activeIndex) {
                  $el.addClass('on').removeClass('nxt prv');
                } else if (index === activeIndex + 1) {
                  $el.addClass('nxt').removeClass('on prv');
                } else if (index === activeIndex - 1) {
                  $el.addClass('prv').removeClass('on nxt');
                } else {
                  $el.removeClass('on nxt prv');
                }
              });
            });
          } else {
            $(el).css({ color: "#031C61", fontWeight: 700 });
          }
        });
      }
    }
  });
  // 자연스럽게 ul이 올라가도록 y만 애니메이션
  history.to($ul, {
    y: -total_scroll,
    ease: "none"
  }, 0);

  /* CORE THCH WHITE PAPER */
  let swiper2 = new Swiper("#core_tech_white_paper .swiper", {
    slidesPerView: 1.05,
    spaceBetween: remToPx(18),
    speed: 1000,
    navigation: {
      prevEl: "#core_tech_white_paper .sld_nav .prv",
      nextEl: "#core_tech_white_paper .sld_nav .nxt",
    },
    breakpoints: {
      751: {
        slidesPerView: 4,
        spaceBetween: remToPx(20),
      },
    },
  });

  /* BOARD MEMBERS BOARD MEMBERS */
  let swiper3 = new Swiper("#board_members .swiper", {
    slidesPerView: 1.05,
    spaceBetween: remToPx(16),
    speed: 1000,
    navigation: {
      prevEl: "#board_members .sld_nav .prv",
      nextEl: "#board_members .sld_nav .nxt",
    },
    breakpoints: {
      751: {
        slidesPerView: 4,
        spaceBetween: remToPx(20),
      },
    },
  });
});
