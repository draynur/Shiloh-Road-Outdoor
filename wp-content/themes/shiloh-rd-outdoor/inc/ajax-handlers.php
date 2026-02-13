<?php
/**
 * AJAX handlers — search and tag filtering.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

/**
 * Handle story filtering via AJAX.
 *
 * Accepts 'search' and 'tag' POST params, returns rendered story-card HTML.
 */
function sro_filter_stories_handler(): void {
	check_ajax_referer( 'sro_filter_stories', 'nonce' );

	$search = isset( $_POST['search'] ) ? sanitize_text_field( $_POST['search'] ) : '';
	$tag    = isset( $_POST['tag'] ) ? sanitize_text_field( $_POST['tag'] ) : '';

	$args = [
		'post_type'      => 'sro_story',
		'posts_per_page' => 20,
		'orderby'        => 'date',
		'order'          => 'DESC',
	];

	// Search query.
	if ( $search ) {
		$args['s'] = $search;
	}

	// Tag filter.
	if ( $tag ) {
		$args['tax_query'] = [
			[
				'taxonomy' => 'sro_story_tag',
				'field'    => 'slug',
				'terms'    => $tag,
			],
		];
	}

	$query = new WP_Query( $args );
	$html  = '';

	if ( $query->have_posts() ) {
		ob_start();
		while ( $query->have_posts() ) {
			$query->the_post();
			get_template_part( 'template-parts/stories/story-card' );
		}
		$html = ob_get_clean();
		wp_reset_postdata();
	}

	wp_send_json_success( [
		'html'  => $html,
		'count' => $query->found_posts,
	] );
}

add_action( 'wp_ajax_sro_filter_stories', 'sro_filter_stories_handler' );
add_action( 'wp_ajax_nopriv_sro_filter_stories', 'sro_filter_stories_handler' );
