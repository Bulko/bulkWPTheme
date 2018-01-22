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
 *@param	String evalType	searched property
 *@return	Bool
 */
$.fn.checkVisible = function( evalType )
{
	evalType = evalType || "visible";

	var vpH = $(window).height(), // Viewport Height
		st = $(window).scrollTop(), // Scroll Top
		y = $(this).offset().top,
		elementHeight = $(this).height();
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


/**
 *plaxEnter
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@param  DOMObj innerElem
 *@return Void
 */
function plaxEnter ( innerElem )
{
	var innerNumber = getPlaxInnerNumber( innerElem );

	switch ( innerNumber ) // Specific innerList
	{
		case 1:
		var innerList = [ 1, 4, 5 ];
		break;
		case 2:
		var innerList = [ 1, 2, 4, 5, 6, 7 ];
		break;
		case 3:
		var innerList = [ 1, 3, 4, 5 ];
		break;
		case 4:
		var innerList = [ 1, 2, 4, 5 ];
		break;
		default:
		var innerList = [ 1, 2, 3, 4, 5, 6, 7 ];
		break;
	}

	for ( var it = 0; it < innerList.length; it++ )
	{
		$('.img-seule-' + innerList[ it ] + ' .inner').addClass( "plax-" + innerNumber );
	}
}

/**
 *plaxLeave
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@param  DOMObj innerElem
 *@return Void
 */
function plaxLeave ( innerElem )
{
	// Retrive elem 2nd class jQuerylike
	var innerNumber = getPlaxInnerNumber( innerElem );
	$( ".plax-" + innerNumber ).removeClass( "plax-" + innerNumber ); // Remove all "inerClass"
}

/**
 *getPlaxInnerNumber
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@param  DOMObj innerElem
 *@return Void
 */
function getPlaxInnerNumber( innerElem )
{
	// Retrive elem 2nd class jQuerylike
	return $(innerElem).attr("class").split(" ")[1].split("step-")[1];
}

/**
 *trackCF7
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@return Void
 */
function trackCF7()
{
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
}

/**
 *trackPChange
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@return Void
 */
function trackPChange()
{
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

/**
 *resize16_9
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@return Int
 */
$.fn.resize16_9 = function()
{
	return $(this).height( $(this).width() * 0.5628205128205128 );
}

/**
 *bkoMenu
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@param  Array param [description]
 *@return Void
 */
$.fn.bkoMenu = function( param )
{
	var defaultParam = {
		'mainSelector': 'body',
		'menuSelector': this,
		'closeSelector': ".mobile-fermeture",
		'btnSelectorSub': ".sub-menu-btn",
		'burgerSelector': '.hamburger',
		'oppenSelector': '.openMenu',
		'oppenSubSelector': '.openSubMenu',
		'oppenBurgerSelector': '.is-active'
	};
	var param = $.extend( defaultParam, param );
	var $burger = $( param.burgerSelector );
	var $burgerAvtive = $( param.burgerSelector + param.oppenBurgerSelector );
	var $close = $( param.closeSelector );
	var $main = $( param.mainSelector );
	var isOppen = param.oppenSelector.substring( 1 );
	var isOppenSub = param.oppenSubSelector.substring( 1 );
	var isActive = param.oppenBurgerSelector.substring( 1 );
	var btnSelectorSub = param.btnSelectorSub.substring( 1 );

	// function
	var toggleBkoMenu = function()
	{
		$main.toggleClass( isOppen );
		$burger.toggleClass( isActive );
	}

	if( $burger.isBound( "bkoMenu" ) == false )
	{
		$burger.on( "click", toggleBkoMenu );
		$close.on( "click", toggleBkoMenu );

		// ajouter fleche sous-menu
		$(".menu-mobile li.menu-item-has-children").prepend("<div class='" + btnSelectorSub + "'><i class=\"fa fa-chevron-right\"></i></div>");
		// le selecteur 'li.menu-item-has-children ' + param.btnSelectorSub
		// ne dois en aucain cas etres stoqué dans une variable (probleme de porté du sélécteur $)
		$( 'li.menu-item-has-children ' + param.btnSelectorSub ).on( "click", function(e) {
			var toggleBtn = $(this).parent();
			if ( toggleBtn.hasClass( isOppenSub ) )
			{
				toggleBtn.removeClass( isOppenSub );
			}
			else
			{
				$(param.btnSelectorSub).removeClass( isOppenSub );
				toggleBtn.addClass( isOppenSub );
			}
		});
	}
	// reset
	$burgerAvtive.removeClass( isActive );
}
