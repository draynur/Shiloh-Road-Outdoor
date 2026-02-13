<?php
/**
 * Theme header — <head>, body open, sticky header bar.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'min-h-screen sr-textured' ); ?>>
<?php wp_body_open(); ?>

<?php get_template_part( 'template-parts/header/site-header' ); ?>
