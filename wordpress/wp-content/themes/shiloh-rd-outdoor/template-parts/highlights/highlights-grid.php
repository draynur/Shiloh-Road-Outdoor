<?php
/**
 * Highlights section — loops over ACF repeater.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$highlights = get_field( 'sro_highlights', 'option' );

// Fallback defaults when ACF data is empty.
if ( empty( $highlights ) ) {
	$highlights = [
		[
			'title'       => 'Weekend Loop',
			'description' => 'A simple two-day route with one big view and an easy camp.',
			'icon'        => 'compass',
		],
		[
			'title'       => 'Gear Notes',
			'description' => 'What we\'re actually carrying right now — updated monthly.',
			'icon'        => 'leaf',
		],
		[
			'title'       => 'Photo Studies',
			'description' => 'Light, weather, and composition — field lessons from the road.',
			'icon'        => 'sparkles',
		],
	];
}
?>

<section class="mt-12" id="highlights">
	<div>
		<h2 class="font-serif text-3xl font-semibold tracking-tight">Highlights</h2>
		<p class="mt-1 text-sm text-muted-foreground">
			A few quick picks to plan your next loop.
		</p>
	</div>

	<div class="mt-5 grid gap-4 md:grid-cols-3">
		<?php foreach ( $highlights as $highlight ) :
			get_template_part( 'template-parts/highlights/highlight-card', null, $highlight );
		endforeach; ?>
	</div>
</section>
