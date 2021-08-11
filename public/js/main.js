;(function () {
	
	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};

	var sliderMain = function() {
		
	  	$('.cx-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('.cx-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('.cx-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var centerBlock = function() {
		$('.cx-section-with-image .cx-box').css('margin-top', -($('.cx-section-with-image .cx-box').outerHeight()/2));
	  	$(window).resize(function(){
	  		$('.cx-section-with-image .cx-box').css('margin-top', -($('.cx-section-with-image .cx-box').outerHeight()/2));
	  	});
	};

	var responseHeight = function() {
		setTimeout(function(){
			$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
		}, 1);
		
		$(window).resize(function(){
			setTimeout(function(){
				$('.js-responsive > .v-align').css('height', $('.js-responsive > img').height());
			}, 1);
		})
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $(".cx-offcanvas, .js-cx-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas-visible') ) {
				$('.cx-offcanvas').css("z-index","");
    			$('body').removeClass('offcanvas-visible');
    			$('.js-cx-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {
		$('body').prepend('<div class="cx-offcanvas" />');
		$('body').prepend('<a href="#" class="js-cx-nav-toggle cx-nav-toggle"><i></i></a>');
		$('.cx-offcanvas').append($('.cx-header nav').clone());
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-cx-nav-toggle', function(event){
			var $this = $(this);
			$('.cx-offcanvas').css("z-index","10");
			if ( $('body').hasClass('offcanvas-visible') ) {
				$('.cx-offcanvas').css("z-index","");
			}
			$('body').toggleClass('cx-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
			   $('.js-cx-nav-toggle').removeClass('active');
			   $('.cx-offcanvas').css("z-index","");
		   }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
			   $('.js-cx-nav-toggle').removeClass('active');
			   $('.cx-offcanvas').css("z-index","");
		   }
		});

	};


	var toggleBtnColor = function() {
		if ( $('.cx-hero').length > 0 ) {	
			$('.cx-hero').waypoint( function( direction ) {
				if( direction === 'down' ) {
					$('.cx-nav-toggle').addClass('dark');
				}
			} , { offset: - $('.cx-hero').height() } );

			$('.cx-hero').waypoint( function( direction ) {
				if( direction === 'up' ) {
					$('.cx-nav-toggle').removeClass('dark');
				}
			} , { 
				offset:  function() { return -$(this.element).height() + 0; }
			} );
		}
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 500,
			autoHeight: true
		});
	};

	
	$(function(){
		fullHeight();
		sliderMain();
		centerBlock();
		responseHeight()
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		toggleBtnColor();
		contentWayPoint();
		testimonialCarousel();
	});


}());