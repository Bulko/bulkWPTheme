function animationList()
{
	// animatedLoading( ".selector", "animaton", timer );
	return true;
}

function resetAnimationList()
{
	// resetAnimation( ".selector", "animaton", timer );
	return true;
}

function resetAnimation( elem, animation )
{
	$(elem).css('visibility', 'hidden');
	$(elem).removeClass('animated');
	$(elem).removeClass(animation);
}

function animatedLoading( elem, animation, tempo )
{
	tempo = tempo || 500;
	if ( $(elem).css('visibility') == 'hidden' && checkVisible( elem ) && !$(elem).hasClass( 'animated' ) )
	{
		var it = 0;
		$(elem).each(function()
		{
			var $elemToLoad = $(this);
			setTimeout(function()
			{
				$elemToLoad.css({ "visibility" : "visible" });
				$elemToLoad.addClass( 'animated ' + animation );
			}, tempo * it );
			it ++;
		});
	}
}
