<?php
/**
 * Shiloh Rd Outdoor — Theme functions and definitions.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

define( 'SRO_THEME_DIR', get_template_directory() );
define( 'SRO_THEME_URI', get_template_directory_uri() );
define( 'SRO_THEME_VERSION', wp_get_theme()->get( 'Version' ) );

// Core setup.
require_once SRO_THEME_DIR . '/inc/setup.php';
require_once SRO_THEME_DIR . '/inc/enqueue.php';

// Custom post types & taxonomy.
require_once SRO_THEME_DIR . '/inc/cpt-stories.php';
require_once SRO_THEME_DIR . '/inc/cpt-authors.php';
require_once SRO_THEME_DIR . '/inc/taxonomies.php';

// ACF configuration.
require_once SRO_THEME_DIR . '/inc/acf-options-page.php';
require_once SRO_THEME_DIR . '/inc/acf-field-groups.php';

// Helpers & template tags.
require_once SRO_THEME_DIR . '/inc/helpers.php';
require_once SRO_THEME_DIR . '/inc/template-tags.php';

// AJAX handlers.
require_once SRO_THEME_DIR . '/inc/ajax-handlers.php';
