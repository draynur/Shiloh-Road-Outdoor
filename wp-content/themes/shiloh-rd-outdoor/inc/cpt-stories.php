<?php
/**
 * Register sro_story custom post type.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_post_type( 'sro_story', [
		'labels' => [
			'name'               => 'Stories',
			'singular_name'      => 'Story',
			'add_new'            => 'Add New Story',
			'add_new_item'       => 'Add New Story',
			'edit_item'          => 'Edit Story',
			'new_item'           => 'New Story',
			'view_item'          => 'View Story',
			'search_items'       => 'Search Stories',
			'not_found'          => 'No stories found',
			'not_found_in_trash' => 'No stories found in Trash',
			'all_items'          => 'All Stories',
			'menu_name'          => 'Stories',
		],
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => [ 'slug' => 'stories' ],
		'menu_icon'    => 'dashicons-book-alt',
		'supports'     => [ 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ],
		'show_in_rest' => true,
	] );
} );
