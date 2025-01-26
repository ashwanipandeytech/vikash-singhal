$(document).ready(function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 2000, // Animation duration
      once: false, // Trigger animation on each scroll
    });

    // jQuery Smooth Scroll (without hash in URL)
    $(".scroll-link").on("click", function (event) {
      console.info("console");

      event.preventDefault();

      var targetSection = $("#" + $(this).data("target"));
      var navHeight = $("nav").outerHeight();

      $("html, body").animate(
        {
          scrollTop: targetSection.offset().top - navHeight,
        },
        500
      );
    });

    $(".brand-carousel").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    $(".testimonial-slider").slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      autoplay: true,
   
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

