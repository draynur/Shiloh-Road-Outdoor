<?php
/**
 * Register sro_story_tag taxonomy.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', function () {
	register_taxonomy( 'sro_story_tag', 'sro_story', [
		'labels' => [
			'name'          => 'Story Tags',
			'singular_name' => 'Story Tag',
			'search_items'  => 'Search Tags',
			'all_items'     => 'All Tags',
			'edit_item'     => 'Edit Tag',
			'update_item'   => 'Update Tag',
			'add_new_item'  => 'Add New Tag',
			'new_item_name' => 'New Tag Name',
			'menu_name'     => 'Tags',
		],
		'public'       => true,
		'hierarchical' => false,
		'rewrite'      => [ 'slug' => 'story-tag' ],
		'show_in_rest' => true,
	] );
} );
