<?php
/**
 * Fallback template.
 *
 * @package ShilohRdOutdoor
 */

get_header();
?>

<main class="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
	<h1 class="font-serif text-3xl font-semibold tracking-tight">
		<?php the_title(); ?>
	</h1>
	<?php
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	endif;
	?>
</main>

<?php
get_footer();
