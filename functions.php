<?php
/**
 * functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 */
define("THEME_NAME", "{my-theme-name}" );
define("TPL_DIR", get_template_directory_uri() );

if ( ! function_exists( 'setup_theme_option' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function setup_theme_option() {
		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', THEME_NAME ),
			'menu-footer' => esc_html__( 'menu-footer', THEME_NAME ),
			'menu-mobile' => esc_html__( 'menu-mobile', THEME_NAME )
		) );
	}
endif;
add_action( 'after_setup_theme', 'setup_theme_option' );


function disable_wp_emojicons()
{
	// all actions related to emojis
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	// filter to remove TinyMCE emojis
	add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
function disable_emojicons_tinymce( $plugins ) {
	if ( is_array( $plugins ) )
	{
		return array_diff( $plugins, array( 'wpemoji' ) );
	}
	else
	{
		return array();
	}
}


function disable_wp_bullshit()
{
	wp_deregister_script('masonry');
	wp_deregister_script('jquery-masonry');
	wp_deregister_script('jquery');
	wp_deregister_script('wp-embed');
	disable_wp_emojicons();
}

add_action( 'init', 'disable_wp_bullshit' );

/**
 *get_the_git_tkn
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@return String
 */
function get_the_git_tkn()
{
	$headFetch = ".git/FETCH_HEAD";
	$headOrig = ".git/ORIG_HEAD";
	if ( file_exists($headFetch) && file_exists($headOrig) )
	{
		$fp = fopen( $headFetch, 'r' );
		$fp2 = fopen( $headOrig, 'r' );
		$headFetchData = fread($fp, 4096);
		$headOrigData = fread($fp2, 4096);
		return hash( 'ripemd160', "🦄____{my-theme-name}____🦄" . hash( 'haval160,4', $headFetchData ) . $headOrigData );
	}
	return "0.0.0";
}

/**
 *the_git_tkn
 *@author Golga <r-ro@bulko.net>
 *@since Peperiot 1.0.0
 *@return Void
 */
function the_git_tkn()
{
	echo get_the_git_tkn();
}


if ( !( is_admin() ) )
{
	function defer_parsing ( $url )
	{
		if ( FALSE === strpos( $url, '.js' ) )
		{
			return $url;
		}
		if ( strpos( $url, 'main.min.js' ) )
		{
			return "$url' defer data-turbolinks-eval='false' data-turbolinks-track='reload";
		}
		return "$url' data-turbolinks-eval='false";
	}
	add_filter( 'clean_url', 'defer_parsing', 11, 1 );
	/**
	 * Enqueue scripts and styles.
	 */
	function bulkWP_enque()
	{
		$tkn = get_the_git_tkn();
		wp_enqueue_style( 'googleFont', 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&amp;subset=latin-ext', $tkn );
		wp_enqueue_style( 'googleFontBis', 'https://fonts.googleapis.com/css?family=Muli:300,400,700&amp;subset=latin-ext', $tkn );
		wp_enqueue_style( 'bxSlider', 'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.css', $tkn );
		wp_enqueue_style( 'animateCSS', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css', $tkn );
		wp_enqueue_style( '{my-theme-name}', get_template_directory_uri() . '/css/main.css', $tkn );

		wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.2.1.min.js', array(), $tkn, false );
		wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/baa4d12d0b.js', array(), $tkn, false );
		wp_enqueue_script( 'turbolinks', 'https://cdnjs.cloudflare.com/ajax/libs/turbolinks/5.0.3/turbolinks.js', array('jquery'), $tkn, false );
		wp_enqueue_script( 'bxSlider', 'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.js', array('jquery'), $tkn, false );
		wp_enqueue_script( 'ga', 'https://www.google-analytics.com/analytics.js', array(), $tkn, false );
		wp_enqueue_script( '{my-theme-name}', get_template_directory_uri() . '/jsMin/main.min.js', array('jquery', 'turbolinks'), $tkn, false );
		wp_deregister_script('contact-form-7');
		wp_deregister_script('maintenance-switch-button');
		wp_localize_script( '{my-theme-name}', 'ajax_object',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'{my-theme-name}_root' => site_url(),
				'is_home' => is_front_page()
			)
		);
	}
	add_action( 'wp_enqueue_scripts', 'bulkWP_enque' );
}

function add_favicon()
{
	$baseUrl = get_template_directory_uri();
	?>
	<link rel="apple-touch-icon" sizes="180x180" href="<?=$baseUrl?>/img/favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?=$baseUrl?>/img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?=$baseUrl?>/img/favicon/favicon-16x16.png">
	<link rel="manifest" href="<?=$baseUrl?>/img/favicon/manifest.json">
	<link rel="mask-icon" href="<?=$baseUrl?>/img/favicon/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="theme-color" content="#ffffff">
	<?php
}

add_action('wp_head', 'add_favicon');
add_action('login_head', 'add_favicon');
add_action('admin_head', 'add_favicon');
