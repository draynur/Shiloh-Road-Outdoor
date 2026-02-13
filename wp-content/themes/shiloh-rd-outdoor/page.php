<?php
/**
 * Generic page template.
 *
 * @package ShilohRdOutdoor
 */

get_header();
?>

<main class="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<h1 class="font-serif text-3xl font-semibold tracking-tight">
			<?php the_title(); ?>
		</h1>
		<div class="prose mt-6">
			<?php the_content(); ?>
		</div>
	<?php endwhile; ?>
</main>

<?php
get_footer();
