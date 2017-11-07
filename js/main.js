( function() {
	Turbolinks.start();
	var ready = function()
	{
		console.log( "🦄 TurboLinks Ready -> " + window.location.href + " width: " + $(window).width());

		// MENU MOBILE
		// reset
		$(".hamburger.is-active").removeClass("is-active");
		// ouvrir le menu
		$(".hamburger").on("click", function(e) {
			$("body").toggleClass("openMenu");
			$(this).toggleClass("is-active");
		});
		// fermer le menu
		$(".mobile-fermeture").on("click", function(e) {
			$("body").toggleClass("openMenu");
			$(".hamburger").toggleClass("is-active");
		});
		// ajouter fleche sous-menu
		$(".menu-mobile li.menu-item-has-children").prepend("<a class='sub-menu-btn' href='#'><i class=\"fa fa-chevron-right\"></i></a>");
		$("li.menu-item-has-children .sub-menu-btn").on("click", function(e) {
			$(this).parent().toggleClass("openSubMenu");
		});

		// Track contact form 7
		//@see https://github.com/Bulko/bulkCform7Tracker/blob/master/js/gaTrack.js
		if ( typeof __gaTracker == 'function' )
		{
			__gaTracker( function() {
				window.ga = __gaTracker;
			});
		}
		document.addEventListener( 'wpcf7mailsent', function( event )
		{
			ga('send', 'event', 'contact-form', 'submit');
		}, false );
		// End Track contact form 7
	}
	var cache = function()
	{
		console.log( "🦄 TurboLinks CacheLoad" );
		resetAnimationList();
	}
	// Turbolink tracker
	var change = function()
	{
		console.log( "🦄 TurboLinks Change " );
		var url = window.location.href;
		var data = {
			'event':'pageView',
			'virtualUrl': url
		};
		if(window['referer'] !== undefined)
		{
			data['pageReferrer'] = window['referer'];
		}
		else
		{
			data['pageReferrer'] = document.referrer;
		}
		dataLayer.push(data);
		window['referer'] = window.location.href;
	}
	ready();
	document.addEventListener("turbolinks:before-cache", cache);
	document.addEventListener("turbolinks:load", ready);
	document.addEventListener("page:change", change);

	$(window).on('scroll', function()
	{
		var fromTop = $(window).scrollTop();
		if ( $(window).width() >= 481 )
		{
			animationList();
		}
		$('body').toggleClass("down", (fromTop > 250));
	});
} )( jQuery );
