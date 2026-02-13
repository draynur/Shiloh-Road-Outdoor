<?php
/**
 * ACF options page setup.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

add_action( 'acf/init', function () {

	acf_add_options_page( [
		'page_title' => 'Theme Settings',
		'menu_title' => 'Theme Settings',
		'menu_slug'  => 'sro-theme-settings',
		'capability' => 'edit_posts',
		'redirect'   => true,
		'icon_url'   => 'dashicons-palmtree',
		'position'   => 2,
	] );

	acf_add_options_sub_page( [
		'page_title'  => 'General',
		'menu_title'  => 'General',
		'parent_slug' => 'sro-theme-settings',
		'menu_slug'   => 'sro-theme-general',
	] );

	acf_add_options_sub_page( [
		'page_title'  => 'Hero Section',
		'menu_title'  => 'Hero Section',
		'parent_slug' => 'sro-theme-settings',
		'menu_slug'   => 'sro-theme-hero',
	] );

	acf_add_options_sub_page( [
		'page_title'  => 'Highlights',
		'menu_title'  => 'Highlights',
		'parent_slug' => 'sro-theme-settings',
		'menu_slug'   => 'sro-theme-highlights',
	] );

	acf_add_options_sub_page( [
		'page_title'  => 'Subscribe',
		'menu_title'  => 'Subscribe',
		'parent_slug' => 'sro-theme-settings',
		'menu_slug'   => 'sro-theme-subscribe',
	] );
} );
