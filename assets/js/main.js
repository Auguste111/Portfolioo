(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {
				parallax: true,
				parallaxFactor: 20

		};
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		if (browser.mobile) {
				$body.addClass('is-touch');
				// Prevent scroll jump on mobile
				settings.parallax = false;
		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.
			if (browser.name == 'ie'
			||	browser.mobile)
				settings.parallax = false;

			if (settings.parallax) {

				var lastScroll = 0;
				var rafId = null;

				var updateParallax = function() {
					var scrollTop = parseInt($window.scrollTop());
					if (scrollTop !== lastScroll) {
						$header.css('background-position', 'left ' + (-1 * (scrollTop / settings.parallaxFactor)) + 'px');
						lastScroll = scrollTop;
					}
					rafId = null;
				};

				breakpoints.on('<=medium', function() {
					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');
					if (rafId) {
						cancelAnimationFrame(rafId);
						rafId = null;
					}
				});

				breakpoints.on('>medium', function() {
					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						if (!rafId) {
							rafId = requestAnimationFrame(updateParallax);
						}
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);