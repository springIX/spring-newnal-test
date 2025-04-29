$(function () {
  const win = $(window);
  let win_w = win.width();
  const mo_break_point = 750;

  /* LENIS */
  window.lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
    window.lenis.raf(time); // ✅ 전역으로 접근
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  let lastScrollTop = 0;
  let header = $('#header');
  var headerHeight = header.outerHeight();
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();

    /* 스크롤 내리면 헤더 BG 입히기 */
    if (scrollTop > 200) {
      header.addClass('bg');
    } else {
      header.removeClass('bg');
    }

    /* 헤더 프로그레스 바 */
    let docHeight = $(document).height();
    let winHeight = $(window).height();
    let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    $("#progress_bar i").css("width", scrollPercent + "%");
  });

  // // GNB 버튼 클릭시 GSAP를 이용해 이동
  const menuItems = document.querySelectorAll(".gnb li");
  const sections = ["#newnal_introduce_anchor", "#pre_order", "#core_value", "#footer"];

  // 1. ScrollTrigger로 섹션별로 gnb on 처리
  sections.forEach((id, index) => {
    gsap.to(menuItems[index], {
      scrollTrigger: {
        trigger: id,
        start: "top 5%",
        end: "bottom center",
        toggleClass: { targets: menuItems[index], className: "on" },
        // markers: true,
      }
    });
  });

  // 2. 클릭 시 on 클래스 부여 (스크롤 도중 다른 메뉴 눌렀을 때 대비)
  menuItems.forEach((item, index) => {
    item.querySelector("a").addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("on"));
      item.classList.add("on");
    });
  });


  // 모바일 헤더 햄버거버튼
  if (win_w <= mo_break_point) {
    $('#header .gnb_btn').click(function () {
      $('#header').toggleClass('on');
    });
    $('#header .gnb a').click(function () {
      $('#header').removeClass('on');
    });
  }

  // 모바일에서만 SWIPER
  if ($('.m_swiper').length) {
    if ($(window).width() <= mo_break_point) {
      $('.m_swiper').addClass('swiper');
      $('.m_swiper > ul').addClass('swiper-wrapper');
      $('.m_swiper > ul > li').addClass('swiper-slide');
    }
  }

  /* AOS */
  AOS.init({ duration: 1000, offset: 100, easing: 'cubic-bezier(0.25, 1, 0.5, 1);' });
  let lastExecution = 0;
  const throttleTime = 1000; // 1000ms = 1초

  $(window).scroll(function () {
    const now = Date.now();
    if (now - lastExecution >= throttleTime) {
      AOS.init({ duration: 1000, offset: 100, easing: 'cubic-bezier(0.25, 1, 0.5, 1);' });
      console.log('AOS refreshed');
      lastExecution = now;
    }
  });

  /* PC <-> 모바일 전환 시 리로드 */
  // let currentMode = window.innerWidth > mo_break_point ? "pc" : "mo";
  // window.addEventListener("resize", () => {
  //   const newMode = window.innerWidth > mo_break_point ? "pc" : "mo";

  //   if (newMode !== currentMode) {
  //     currentMode = newMode;
  //     location.reload(); // ✅ 새로고침 딱 한 번만
  //   }
  // });
});
