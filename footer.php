<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */

?>
	</div><!-- #content -->
	<footer id="colophon" class="site-footer"  data-turbolinks-permanent>
	</footer><!-- #colophon -->
</div><!-- #page -->
<div class="menu-mobile" data-turbolinks-permanent>
	<nav>
		<?php
			wp_nav_menu( array(
				'theme_location' => 'menu-mobile',
				'menu_id' => 'menu-mobile'
			) );
		?>
	</nav>
</div>
<?php wp_footer(); ?>
</body>
</html>
