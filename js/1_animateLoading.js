function getAnilationList()
{
	return [
		[".selectorCSS", "classCSS"],
		["#selectorCSS", "animateCSS", delayInMS]
	];
}

function setAnimationList()
{
	var animation = getAnilationList();
	for ( var i = 0; i < animation.length; i++ )
	{
		animatedLoading( animation[i][0], animation[i][1], animation[i][2] );
	}
	return true;
}

function resetAnimationList()
{
	var animation = getAnilationList();
	for ( var i = 0; i < animation.length; i++ )
	{
		resetAnimation( animation[i][0], animation[i][1] );
	}
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
