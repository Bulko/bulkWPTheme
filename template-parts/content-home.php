<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package must
 */
	if ( class_exists( 'Slider' ) )
	{
		$slider = new Slider();
		echo $slider->getSlidesHtml();
	}
	while ( have_posts() ) : the_post();
?>
	<div class="entry-content">
		<?php
			the_content();
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'must' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->
