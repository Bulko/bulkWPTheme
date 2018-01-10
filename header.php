<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */

?>
<!doctype html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&amp;subset=latin-ext" data-turbolinks-eval="false">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" data-turbolinks-eval="false" />
	<link rel="stylesheet" type="text/css" href="<?php echo TPL_DIR ?>/css/main.css" data-turbolinks-eval="false">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.css" data-turbolinks-eval="false">
	<script src="https://use.fontawesome.com/baa4d12d0b.js"></script>
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" data-turbolinks-eval="false" crossorigin="anonymous"></script>
	<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.js' data-turbolinks-eval='false'></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/turbolinks/5.0.3/turbolinks.js" data-turbolinks-eval="false"></script>
	<script defer async src="<?php echo TPL_DIR ?>/jsMin/main.min.js" data-turbolinks-eval="false" data-turbolinks-track="reload"></script>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="page" class="site">
	<header id="masthead" class="site-header">
		<div class="site-branding">
		</div><!-- .site-branding -->
		<nav id="site-navigation" class="main-navigation">
			<?php
				wp_nav_menu( array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				) );
			?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->
	<div id="content" class="site-content">
