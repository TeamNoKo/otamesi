const LogoVideo = document.getElementById("teamLogoVideo");
const pseudoLogo = document.getElementById("pseudo-logo");

if (LogoVideo && pseudoLogo) {
  pseudoLogo.addEventListener("mouseover", () => {
      LogoVideo.play();
  });
}

// 横尾　下から出てくるボタン
jQuery(function() {
  var appear = false;
  var pagetop = $('#scrollToTopBtn');
  if (pagetop.length) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {  // 300pxスクロールしたら
        if (!appear) {
          appear = true;
          pagetop.stop().animate({ 'bottom': '0px' }, 300); // 下から0pxの位置に
        }
      } else {
        if (appear) {
          appear = false;
          pagetop.stop().animate({ 'bottom': '-100px' }, 300); // 下から-100pxの位置に
        }
      }
    });
    pagetop.click(function () {
      $('body, html').animate({ scrollTop: 0 }, 300); // 0.3秒かけてトップへ戻る
      return false;
    });
  }
});

// IntersectionObserverの設定
jQuery(function() {
  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        
        if ($(entry.target).is(':nth-child(1)')) {
          setTimeout(() => $('div.section-panel:nth-child(2)').addClass('visible'), 150);
          setTimeout(() => $('div.section-panel:nth-child(3)').addClass('visible'), 300);
        } else if ($(entry.target).is(':nth-child(4)')) {
          setTimeout(() => $('div.section-panel:nth-child(5)').addClass('visible'), 150);
          setTimeout(() => $('div.section-panel:nth-child(6)').addClass('visible'), 300);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.9 });
  
  $('.observed-panel').each(function() {
    observer.observe(this);
  });
});

const GoalHacker = document.getElementById("Goals-hacker");

if (GoalHacker) {
  jQuery(function() {
    var observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            GoalHacker.play();
            observer.unobserve(entry.target);
          }, 500);
        }
      });
    }, { threshold: 0.9 });
    
    observer.observe(GoalHacker);
  });
}

// ナビゲーションパネルの制御
$(function() {
  $(".menu li").hover(
    function() {
      $(this).children(".menuSub").addClass("open");
    },
    function() {
      $(this).children(".menuSub").removeClass("open");
    }
  );
});

// video止めたり流したりする
const video = document.getElementById("background");
const videoToggle = document.getElementById("video_play_pause");

if (video && videoToggle) {
  videoToggle.addEventListener("change", function() {
    if (video.paused) {
      video.play();  // ビデオが停止中の場合、再生する
    } else {
      video.pause(); // ビデオが再生中の場合、停止する
    }
  });
}

// Teamの画像スライダー
$(document).on('ready', function() {
  $(".slider").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
  });
});

// Projectのページ内タブ
$(".tab_label").on("click", function() {
  var $th = $(this).index();
  $(".tab_label").removeClass("active");
  $(".tab_panel").removeClass("active");
  $(this).addClass("active");
  $(".tab_panel").eq($th).addClass("active");
});

// Intersection Observerの設定 for checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"] + label');
if (checkboxes.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('pseudo-checkbox')) {
        setTimeout(() => entry.target.classList.add('in-view'), 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  checkboxes.forEach(checkbox => observer.observe(checkbox));
}

// onLoad関数
function onLoad() {
  const wrapper = document.querySelector('article');
  const contents = document.querySelectorAll('section');
  const toc = document.querySelectorAll('.toc');
  
  if (wrapper && contents.length > 0 && toc.length > 0) {
    const contentsPosition = [];
    contents.forEach((content, i) => {
      const startPosition = content.getBoundingClientRect().top - wrapper.getBoundingClientRect().top + wrapper.scrollTop;
      const endPosition = contents.item(i + 1)
        ? contents.item(i + 1).getBoundingClientRect().top - wrapper.getBoundingClientRect().top + wrapper.scrollTop
        : wrapper.scrollHeight;
      contentsPosition.push({ startPosition, endPosition });
    });

    const calcCurrentPosition = () => {
      toc.forEach((item, i) => {
        const { startPosition, endPosition } = contentsPosition[i];
        item.classList.remove('active');
        if (wrapper.scrollTop + wrapper.getBoundingClientRect().height === wrapper.scrollHeight) {
          toc.item(toc.length - 1).classList.add('active');
        } else if (wrapper.scrollTop >= startPosition && wrapper.scrollTop < endPosition) {
          item.classList.add('active');
        }
      });
    };
    
    wrapper.addEventListener('scroll', calcCurrentPosition);
    toc.forEach(item => item.addEventListener('click', event => {
      const destination = event.target.getAttribute('scrollTo');
      if (destination) {
        wrapper.scrollTop = document.querySelector(`.${destination}`).getBoundingClientRect().top - wrapper.getBoundingClientRect().top + wrapper.scrollTop;
      }
    }));
    calcCurrentPosition();
  }
}

// <a>タグの内容をtitle属性に設定
document.querySelectorAll("a.refLink").forEach(link => {
  const refId = link.getAttribute("href").substring(1);
  const refContent = document.getElementById(refId)?.textContent;
  if (refContent) {
    link.title = refContent;
  }
});
