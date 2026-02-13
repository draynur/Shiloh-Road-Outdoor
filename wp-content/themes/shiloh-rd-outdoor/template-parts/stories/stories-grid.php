<?php
/**
 * Stories section wrapper + WP_Query loop.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$stories = sro_get_stories( 10 );
?>

<section class="mt-10" id="stories">
	<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<h2 class="font-serif text-3xl font-semibold tracking-tight">Recent stories</h2>
			<p class="mt-1 text-sm text-muted-foreground">
				Thoughtful writing, practical notes, and photographs worth slowing down for.
			</p>
		</div>
		<div class="text-sm text-muted-foreground" id="sro-stories-count">
			<?php
			$total = $stories->found_posts;
			printf(
				'Showing %d %s',
				$total,
				1 === $total ? 'story' : 'stories'
			);
			?>
		</div>
	</div>

	<div class="mt-5 grid gap-4 md:grid-cols-2" id="sro-stories-grid">
		<?php
		if ( $stories->have_posts() ) :
			while ( $stories->have_posts() ) :
				$stories->the_post();
				get_template_part( 'template-parts/stories/story-card' );
			endwhile;
			wp_reset_postdata();
		endif;
		?>
	</div>
</section>
