var swiper = new Swiper(".mySwiper1", {
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    
      slidesPerView: 2,
      spaceBetween: 10,
      
      breakpoints: {
        580: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        
      },
    
  });

  var swiper2 = new Swiper(".mySwiper2", {
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 10,
      
      breakpoints: {
        580: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        
      },
    
  });