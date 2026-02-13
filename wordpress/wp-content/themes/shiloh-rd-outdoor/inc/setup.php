<?php
/**
 * Theme setup — supports, image sizes, menus.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', function () {

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Featured images.
	add_theme_support( 'post-thumbnails' );

	// HTML5 markup.
	add_theme_support( 'html5', [
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	] );

	// Custom image sizes used in story cards.
	add_image_size( 'sro-card-thumb', 360, 280, true );
	add_image_size( 'sro-hero', 1400, 700, true );
} );
