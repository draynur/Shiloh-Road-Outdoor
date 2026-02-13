<?php
/**
 * Enqueue styles and scripts.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

/**
 * Preconnect to Google Fonts.
 */
add_filter( 'wp_resource_hints', function ( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = [
			'href'        => 'https://fonts.googleapis.com',
			'crossorigin' => false,
		];
		$urls[] = [
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		];
	}
	return $urls;
}, 10, 2 );

/**
 * Enqueue front-end assets.
 */
add_action( 'wp_enqueue_scripts', function () {

	// Google Fonts — DM Sans + Fraunces.
	wp_enqueue_style(
		'sro-google-fonts',
		'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..900;1,9..40,300..900&family=Fraunces:opsz,wght,SOFT,WONK@9..144,200..900,0..100,0..1&display=swap',
		[],
		null
	);

	// Compiled Tailwind CSS.
	$css_file = SRO_THEME_DIR . '/assets/dist/css/main.css';
	wp_enqueue_style(
		'sro-main',
		SRO_THEME_URI . '/assets/dist/css/main.css',
		[ 'sro-google-fonts' ],
		file_exists( $css_file ) ? filemtime( $css_file ) : SRO_THEME_VERSION
	);

	// Main JS.
	$js_file = SRO_THEME_DIR . '/assets/src/js/main.js';
	wp_enqueue_script(
		'sro-main',
		SRO_THEME_URI . '/assets/src/js/main.js',
		[],
		file_exists( $js_file ) ? filemtime( $js_file ) : SRO_THEME_VERSION,
		[ 'strategy' => 'defer', 'in_footer' => true ]
	);

	// Pass AJAX URL and nonce to JS.
	wp_localize_script( 'sro-main', 'sroAjax', [
		'url'   => admin_url( 'admin-ajax.php' ),
		'nonce' => wp_create_nonce( 'sro_filter_stories' ),
	] );
} );
