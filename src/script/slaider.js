import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
new Swiper(".image-slider", {
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  slidesPerView: 1,
  spaceBetween: 400,
  slideToClickedSlide: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  loop: true,
  keyboard: {
    enable: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 1,
  },
  autoHeight: true,
  speed: 800,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});
export { Swiper };
