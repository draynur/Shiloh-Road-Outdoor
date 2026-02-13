<?php
/**
 * Authors section wrapper + WP_Query loop.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$authors = sro_get_authors();
?>

<section class="mt-12" id="authors">
	<div class="flex items-end justify-between gap-4">
		<div>
			<h2 class="font-serif text-3xl font-semibold tracking-tight">Prominent authors</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Writers and photographers shaping the Shiloh Rd voice.
			</p>
		</div>
	</div>

	<div class="mt-5 grid gap-4 md:grid-cols-3">
		<?php
		if ( $authors->have_posts() ) :
			while ( $authors->have_posts() ) :
				$authors->the_post();
				get_template_part( 'template-parts/authors/author-card' );
			endwhile;
			wp_reset_postdata();
		endif;
		?>
	</div>
</section>
