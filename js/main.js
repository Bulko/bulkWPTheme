( function() {
	Turbolinks.start();
	var ready = function()
	{
		console.log( "🦄 TurboLinks Ready -> " + window.location.href + " width: " + $(window).width());

		// We reset the scroll to 0 at every page load
		$('html, body').scrollTop(0);

		if ( $(window).width() >= 481 )
		{
			setAnimationList();
		}
		// VIDEO 16_9
		$("iframe").resize16_9();
		$(".sub-vid").resize16_9();
		$(".16-9").resize16_9();
		// VIDEO 16_9 END
		$(".menu-mobile").bkoMenu();
		trackCF7();
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
		trackPChange();
	}
	// ready();
	document.addEventListener("turbolinks:before-cache", cache);
	document.addEventListener("turbolinks:load", ready);
	document.addEventListener("page:change", change);

	$(window).on('scroll', function()
	{
		var fromTop = $(window).scrollTop();
		if ( $(window).width() >= 481 )
		{
			setAnimationList();
		}
		$('body').toggleClass("down", (fromTop > 150));
	});
} )( jQuery );
