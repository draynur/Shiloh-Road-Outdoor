<?php
/**
 * Register sro_author custom post type.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_post_type( 'sro_author', [
		'labels' => [
			'name'               => 'Authors',
			'singular_name'      => 'Author',
			'add_new'            => 'Add New Author',
			'add_new_item'       => 'Add New Author',
			'edit_item'          => 'Edit Author',
			'new_item'           => 'New Author',
			'view_item'          => 'View Author',
			'search_items'       => 'Search Authors',
			'not_found'          => 'No authors found',
			'not_found_in_trash' => 'No authors found in Trash',
			'all_items'          => 'All Authors',
			'menu_name'          => 'Authors',
		],
		'public'       => true,
		'has_archive'  => true,
		'rewrite'      => [ 'slug' => 'authors' ],
		'menu_icon'    => 'dashicons-admin-users',
		'supports'     => [ 'title', 'thumbnail', 'revisions' ],
		'show_in_rest' => true,
	] );
} );
