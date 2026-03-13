/*--------------------------
    Project Name: Prachin
    Version: 1.0
---------------------------*/

$(function () {
  "use strict";

  var $win = $(window);

  /*========== Pre Loading ==========*/
  setTimeout(function () {
    $(".preloader").fadeOut(500, function () {
      $(this).remove();
    });
  });

  /*========== Mobile Menu ==========*/
  $(document).ready(function () {
    var $navbarCollapse = $(".navbar-collapse");
    var $mobileMenu = $(".navbar-nav");
    var $navbarToggler = $(".navbar-toggler");
    var $hasDropdown = $(".has-dropdown");

    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(".navbar").length &&
        $navbarCollapse.hasClass("menu-opened")
      ) {
        $navbarCollapse.removeClass("menu-opened");
        $mobileMenu.removeClass("menu-opened");
        $navbarToggler.removeClass("actived");
      }
    });

    if ($(window).width() >= 1236) {
      $hasDropdown.hover(
        function () {
          $(this).find(".mega-dropdown-menu").addClass("show");
        },
        function () {
          $(this).find(".mega-dropdown-menu").removeClass("show");
        }
      );
    } else {
      $hasDropdown.on("click", function (e) {
        e.preventDefault();
        $(this).find(".mega-dropdown-menu").toggleClass("show");
      });
    }
  });

  /*========== Sticky Navbar ==========*/
  $win.on("scroll", function () {
    var $stickyNavbar = $(".sticky-navbar");

    if ($win.scrollTop() > 150) {
      $stickyNavbar.addClass("is-sticky");
    } else {
      $stickyNavbar.removeClass("is-sticky");
    }
  });

  /*========== Scroll Top Button ==========*/
  var $scrollTopBtn = $("#scrollTopBtn");

  $win.on("scroll", function () {
    if ($(this).scrollTop() > 700) {
      $scrollTopBtn.addClass("actived");
    } else {
      $scrollTopBtn.removeClass("actived");
    }
  });

  $scrollTopBtn.on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
  });

  /*========== Background Image ==========*/
  $(".bg-img").each(function () {
    var imgSrc = $(this).children("img").attr("src");

    $(this)
      .parent()
      .css({
        "background-image": "url(" + imgSrc + ")",
        "background-size": "cover",
        "background-position": "center",
      });

    $(this).parent().addClass("bg-img");

    $(this).remove();
  });

  /*========== Accordion ==========*/
  $(".accordion-header").on("click", function () {
    $(this).parent(".accordion-item").toggleClass("opened");
    $(this).parent(".accordion-item").siblings().removeClass("opened");
  });

  /*========== Slick Carousel ==========*/
  setTimeout(function () {
    $(".slick-carousel").slick({
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="icon-arrow-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="icon-arrow-right"></i></button>',
      dots: false,
    });

    $(".slider-has-navs").slick({
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      arrows: true,
      asNavFor: ".slider-nav-thumbnails",
    });

    $(".slider-nav-thumbnails").slick({
      autoplay: true,
      slidesToShow: 2,
      asNavFor: ".slider-has-navs",
      focusOnSelect: true,
      variableWidth: true,
    });
  }, 500);

  /*========== Popup Video ==========*/
  $(".popup-video").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
  });

  /*========== NiceSelect ==========*/
  $("select").niceSelect();

  /*========== Counter ==========*/
  $(".counter").counterUp({
    delay: 10,
    time: 4000,
  });
});


/* =================================
   FIXED HEADER INITIALIZATION
================================= */

document.addEventListener("DOMContentLoaded", function () {
  initializeMegaMenu();
});


function initializeMegaMenu() {

  const categoryItems = document.querySelectorAll(".category-item");
  const productLists = document.querySelectorAll(".product-list");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  if (productLists.length > 0) {
    productLists[0].classList.add("active");
    if(categoryItems[0]) categoryItems[0].classList.add("active");
  }

  categoryItems.forEach((item) => {

    item.addEventListener("click", function(e){

      e.preventDefault();

      const targetId = this.getAttribute("data-target");

      categoryItems.forEach(i => i.classList.remove("active"));
      this.classList.add("active");

      productLists.forEach(list => {

        if(list.id === targetId + "-products"){
          list.classList.add("active");
        }else{
          list.classList.remove("active");
        }

      });

    });

  });

  dropdownToggles.forEach(toggle => {

    toggle.addEventListener("click", function(e){

      if(window.innerWidth <= 1236){
        e.preventDefault();
        this.nextElementSibling.classList.toggle("show");
      }

    });

  });

}