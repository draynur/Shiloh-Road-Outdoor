<?php
/**
 * Programmatic ACF field registration.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

// If Local JSON is active, skip programmatic registration.
if ( is_dir( SRO_THEME_DIR . '/acf-json' ) ) {
	return;
}

add_action( 'acf/include_fields', function () {

	/*
	|--------------------------------------------------------------------------
	| Theme Options — General
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_general',
		'title'    => 'General Settings',
		'fields'   => [
			[
				'key'           => 'field_sro_brand_name',
				'label'         => 'Brand Name',
				'name'          => 'sro_brand_name',
				'type'          => 'text',
				'default_value' => 'Shiloh Rd Outdoor',
			],
			[
				'key'           => 'field_sro_brand_tagline',
				'label'         => 'Brand Tagline',
				'name'          => 'sro_brand_tagline',
				'type'          => 'text',
				'default_value' => 'field journal',
			],
			[
				'key'           => 'field_sro_copyright_text',
				'label'         => 'Copyright Text',
				'name'          => 'sro_copyright_text',
				'type'          => 'text',
				'default_value' => 'Trails, campfires, and field notes.',
			],
			[
				'key'           => 'field_sro_footer_note',
				'label'         => 'Footer Note',
				'name'          => 'sro_footer_note',
				'type'          => 'text',
				'default_value' => 'Built for slow travel.',
			],
		],
		'location' => [
			[
				[
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'sro-theme-general',
				],
			],
		],
	] );

	/*
	|--------------------------------------------------------------------------
	| Theme Options — Hero Section
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_hero',
		'title'    => 'Hero Section',
		'fields'   => [
			[
				'key'           => 'field_sro_hero_image',
				'label'         => 'Hero Background Image',
				'name'          => 'sro_hero_image',
				'type'          => 'image',
				'return_format' => 'id',
			],
			[
				'key'           => 'field_sro_hero_kicker',
				'label'         => 'Kicker Text',
				'name'          => 'sro_hero_kicker',
				'type'          => 'text',
				'default_value' => 'Recent stories by prominent authors',
			],
			[
				'key'           => 'field_sro_hero_title',
				'label'         => 'Hero Title',
				'name'          => 'sro_hero_title',
				'type'          => 'text',
				'default_value' => 'A field journal for quiet roads and wild mornings.',
			],
			[
				'key'           => 'field_sro_hero_subtitle',
				'label'         => 'Hero Subtitle',
				'name'          => 'sro_hero_subtitle',
				'type'          => 'textarea',
				'default_value' => 'Shiloh Rd Outdoor highlights the best new writing across hikes, camps, rivers, and small towns — with photos, routes, and notes you can steal for your next weekend.',
				'rows'          => 3,
			],
			[
				'key'           => 'field_sro_hero_search_placeholder',
				'label'         => 'Search Placeholder',
				'name'          => 'sro_hero_search_placeholder',
				'type'          => 'text',
				'default_value' => 'Search stories, authors, locations…',
			],
			[
				'key'           => 'field_sro_hero_tags_count',
				'label'         => 'Number of Tags to Show',
				'name'          => 'sro_hero_tags_count',
				'type'          => 'number',
				'default_value' => 6,
				'min'           => 1,
				'max'           => 20,
			],
		],
		'location' => [
			[
				[
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'sro-theme-hero',
				],
			],
		],
	] );

	/*
	|--------------------------------------------------------------------------
	| Theme Options — Highlights
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_highlights',
		'title'    => 'Highlights',
		'fields'   => [
			[
				'key'        => 'field_sro_highlights',
				'label'      => 'Highlights',
				'name'       => 'sro_highlights',
				'type'       => 'repeater',
				'max'        => 6,
				'layout'     => 'block',
				'sub_fields' => [
					[
						'key'   => 'field_sro_highlight_title',
						'label' => 'Title',
						'name'  => 'title',
						'type'  => 'text',
					],
					[
						'key'   => 'field_sro_highlight_description',
						'label' => 'Description',
						'name'  => 'description',
						'type'  => 'textarea',
						'rows'  => 2,
					],
					[
						'key'     => 'field_sro_highlight_icon',
						'label'   => 'Icon',
						'name'    => 'icon',
						'type'    => 'select',
						'choices' => [
							'compass'  => 'Compass',
							'leaf'     => 'Leaf',
							'sparkles' => 'Sparkles',
						],
						'default_value' => 'compass',
					],
				],
			],
		],
		'location' => [
			[
				[
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'sro-theme-highlights',
				],
			],
		],
	] );

	/*
	|--------------------------------------------------------------------------
	| Theme Options — Subscribe
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_subscribe',
		'title'    => 'Subscribe Section',
		'fields'   => [
			[
				'key'           => 'field_sro_subscribe_badge_text',
				'label'         => 'Badge Text',
				'name'          => 'sro_subscribe_badge_text',
				'type'          => 'text',
				'default_value' => 'Field dispatch',
			],
			[
				'key'           => 'field_sro_subscribe_title',
				'label'         => 'Title',
				'name'          => 'sro_subscribe_title',
				'type'          => 'text',
				'default_value' => 'Get one great story a week.',
			],
			[
				'key'           => 'field_sro_subscribe_subtitle',
				'label'         => 'Subtitle',
				'name'          => 'sro_subscribe_subtitle',
				'type'          => 'textarea',
				'default_value' => 'New essays, routes, and photo notes — delivered when they\'re worth your time.',
				'rows'          => 2,
			],
			[
				'key'           => 'field_sro_subscribe_button_text',
				'label'         => 'Button Text',
				'name'          => 'sro_subscribe_button_text',
				'type'          => 'text',
				'default_value' => 'Join',
			],
			[
				'key'           => 'field_sro_subscribe_fine_print',
				'label'         => 'Fine Print',
				'name'          => 'sro_subscribe_fine_print',
				'type'          => 'text',
				'default_value' => 'No spam. Just the good stuff.',
			],
			[
				'key'   => 'field_sro_subscribe_form_action',
				'label' => 'Form Action URL',
				'name'  => 'sro_subscribe_form_action',
				'type'  => 'url',
			],
			[
				'key'           => 'field_sro_spotlight_title',
				'label'         => 'Spotlight Title',
				'name'          => 'sro_spotlight_title',
				'type'          => 'text',
				'default_value' => 'Editor\'s picks',
			],
			[
				'key'           => 'field_sro_spotlight_count',
				'label'         => 'Spotlight Count',
				'name'          => 'sro_spotlight_count',
				'type'          => 'number',
				'default_value' => 3,
				'min'           => 1,
				'max'           => 10,
			],
		],
		'location' => [
			[
				[
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'sro-theme-subscribe',
				],
			],
		],
	] );

	/*
	|--------------------------------------------------------------------------
	| Story Fields (on sro_story)
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_story_fields',
		'title'    => 'Story Details',
		'fields'   => [
			[
				'key'           => 'field_sro_story_author',
				'label'         => 'Author',
				'name'          => 'sro_story_author',
				'type'          => 'post_object',
				'post_type'     => [ 'sro_author' ],
				'return_format' => 'id',
			],
			[
				'key'           => 'field_sro_story_read_time',
				'label'         => 'Read Time (minutes)',
				'name'          => 'sro_story_read_time',
				'type'          => 'number',
				'min'           => 1,
			],
			[
				'key'           => 'field_sro_story_location',
				'label'         => 'Location',
				'name'          => 'sro_story_location',
				'type'          => 'text',
				'placeholder'   => 'e.g. Blue Ridge · VA',
			],
			[
				'key'   => 'field_sro_story_featured',
				'label' => 'Featured Story',
				'name'  => 'sro_story_featured',
				'type'  => 'true_false',
				'ui'    => 1,
			],
		],
		'location' => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'sro_story',
				],
			],
		],
		'position' => 'side',
	] );

	/*
	|--------------------------------------------------------------------------
	| Author Fields (on sro_author)
	|--------------------------------------------------------------------------
	*/
	acf_add_local_field_group( [
		'key'      => 'group_sro_author_fields',
		'title'    => 'Author Details',
		'fields'   => [
			[
				'key'         => 'field_sro_author_role',
				'label'       => 'Role',
				'name'        => 'sro_author_role',
				'type'        => 'text',
				'placeholder' => 'e.g. Senior Field Editor',
			],
			[
				'key'         => 'field_sro_author_specialty',
				'label'       => 'Specialty',
				'name'        => 'sro_author_specialty',
				'type'        => 'textarea',
				'rows'        => 2,
				'placeholder' => 'e.g. Backcountry routes & ridge-lines',
			],
			[
				'key'     => 'field_sro_author_icon',
				'label'   => 'Card Icon',
				'name'    => 'sro_author_icon',
				'type'    => 'select',
				'choices' => [
					'compass'  => 'Compass',
					'leaf'     => 'Leaf',
					'sparkles' => 'Sparkles',
				],
				'default_value' => 'leaf',
			],
		],
		'location' => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'sro_author',
				],
			],
		],
	] );
} );
