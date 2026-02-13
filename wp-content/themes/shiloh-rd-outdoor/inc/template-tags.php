<?php
/**
 * Template tag / query helper functions.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

/**
 * Get featured stories.
 *
 * @param int $count Number of featured stories to return.
 * @return WP_Post[] Array of post objects.
 */
function sro_get_featured_stories( int $count = 2 ): array {
	$query = new WP_Query( [
		'post_type'      => 'sro_story',
		'posts_per_page' => $count,
		'meta_key'       => 'sro_story_featured',
		'meta_value'     => '1',
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	] );

	return $query->posts;
}

/**
 * Get recent stories.
 *
 * @param int $count Number of stories.
 * @return WP_Query
 */
function sro_get_stories( int $count = 10 ): WP_Query {
	return new WP_Query( [
		'post_type'      => 'sro_story',
		'posts_per_page' => $count,
		'orderby'        => 'date',
		'order'          => 'DESC',
	] );
}

/**
 * Get all authors.
 *
 * @param int $count Number of authors.
 * @return WP_Query
 */
function sro_get_authors( int $count = 12 ): WP_Query {
	return new WP_Query( [
		'post_type'      => 'sro_author',
		'posts_per_page' => $count,
		'orderby'        => 'title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	] );
}

/**
 * Get top story tags for display.
 *
 * @param int $count Number of tags.
 * @return WP_Term[] Array of term objects.
 */
function sro_get_story_tags( int $count = 6 ): array {
	$tags_count = get_field( 'sro_hero_tags_count', 'option' );
	if ( $tags_count ) {
		$count = (int) $tags_count;
	}

	$terms = get_terms( [
		'taxonomy'   => 'sro_story_tag',
		'number'     => $count,
		'orderby'    => 'count',
		'order'      => 'DESC',
		'hide_empty' => false,
	] );

	return is_array( $terms ) ? $terms : [];
}

/**
 * Get the linked author name for a story.
 *
 * @param int $story_id Story post ID.
 * @return string Author name or empty string.
 */
function sro_get_story_author_name( int $story_id = 0 ): string {
	if ( ! $story_id ) {
		$story_id = get_the_ID();
	}

	$author_id = get_field( 'sro_story_author', $story_id );
	if ( ! $author_id ) {
		return '';
	}

	return get_the_title( $author_id );
}

/**
 * Format a post date in short style (e.g. "Jan 18, 2026").
 *
 * @param int $post_id Post ID.
 * @return string Formatted date.
 */
function sro_short_date( int $post_id = 0 ): string {
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}
	return get_the_date( 'M j, Y', $post_id );
}

/**
 * Get spotlight stories for the subscribe section.
 *
 * @return WP_Post[] Array of post objects.
 */
function sro_get_spotlight_stories(): array {
	$count = get_field( 'sro_spotlight_count', 'option' ) ?: 3;

	$query = new WP_Query( [
		'post_type'      => 'sro_story',
		'posts_per_page' => (int) $count,
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	] );

	return $query->posts;
}
