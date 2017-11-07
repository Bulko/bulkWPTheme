/**
 *isBound
 *@author Golga <r-ro@bulko.net>
 *@since 2.2.0 Koregraf
 *@see https://github.com/Bulko/koregraf/blob/koregraf/master/themes/bko-2017/js/tunnel.js
 *@param  String   type
 *@param  Function fn
 *@return Boolean
 */
$.fn.isBound = function(type, fn)
{
	if (
		(
			this.data('eventsisBound') === undefined
			|| this.data('eventsisBound')[type] === undefined
			|| this.data('eventsisBound')[type].length === 0
		)
		&& this.data('eventsisBound') !== type
	)
	{
		this.data("eventsisBound", type);
		return false;
	}
	return true;
};

/**
 *checkVisible
 *@author Golga <r-ro@bulko.net>
 *@since 	https://github.com/Bulko/qant_io_templates
 *@param	String elem		target element selector
 *@param	String evalType	searched property
 *@return	Bool
 */
function checkVisible( elem, evalType )
{
	evalType = evalType || "visible";

	var vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(elem).offset().top,
		elementHeight = $(elem).height();
	if ( evalType === "visible" )
	{
		return ((y < (vpH + st)) && (y > (st - elementHeight)));
	}
	else if ( evalType === "above" )
	{
		return ((y < (vpH + st)));
	}
	return false;
}

/**
 *getYTId
 *@author Golga <r-ro@bulko.net>
 *@since AGG 0.0.1
 *@param  String urlYT
 *@return String
 */
function getYTId( urlYT )
{
	var ytID = urlYT.match( /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/ );
	if ( ytID && ytID[2].length === 11 )
	{
		return ytID[2];
	}
	else
	{
		return 'error';
	}
}
