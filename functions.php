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
	wp_deregister_script('wp-embed');
	disable_wp_emojicons();
}

add_action( 'init', 'disable_wp_bullshit' );
