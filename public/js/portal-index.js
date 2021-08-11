$(document).ready(function(){
    
    $('.slickado').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay:true,
        autoplaySpeed: 4000,
        centerMode: false,
        arrows: true,
        pauseOnFocus: true,
        slidesToShow: 3,
        mobileFirst: true,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 280,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    });
});