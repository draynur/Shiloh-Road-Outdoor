<?php
/**
 * Helper functions — sro_icon(), sro_badge(), sro_button(), sro_separator(), sro_get_story_image().
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

/**
 * Return an inline SVG icon from assets/icons/.
 *
 * @param string $name  Icon filename without extension (e.g. "arrow-right").
 * @param string $class Additional CSS classes.
 * @return string SVG markup.
 */
function sro_icon( string $name, string $class = '' ): string {
	$path = SRO_THEME_DIR . '/assets/icons/' . $name . '.svg';
	if ( ! file_exists( $path ) ) {
		return '';
	}

	$svg = file_get_contents( $path );

	if ( $class ) {
		$svg = str_replace( '<svg ', '<svg class="' . esc_attr( $class ) . '" ', $svg );
	}

	// Add aria-hidden by default.
	if ( false === strpos( $svg, 'aria-hidden' ) ) {
		$svg = str_replace( '<svg ', '<svg aria-hidden="true" ', $svg );
	}

	return $svg;
}

/**
 * Render a badge element matching shadcn/ui Badge variants.
 *
 * @param string $text    Badge text.
 * @param string $variant "default"|"secondary"|"outline".
 * @param string $extra   Additional classes.
 * @return string HTML.
 */
function sro_badge( string $text, string $variant = 'default', string $extra = '' ): string {
	$base = 'whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors hover-elevate';

	$variants = [
		'default'   => 'border-transparent bg-primary text-primary-foreground shadow-xs',
		'secondary' => 'border-transparent bg-secondary text-secondary-foreground',
		'outline'   => 'text-foreground border [border-color:var(--badge-outline)]',
	];

	$classes = $base . ' ' . ( $variants[ $variant ] ?? $variants['default'] );

	if ( $extra ) {
		$classes .= ' ' . $extra;
	}

	return '<span class="' . esc_attr( $classes ) . '">' . esc_html( $text ) . '</span>';
}

/**
 * Render a button element matching shadcn/ui Button variants.
 *
 * @param string $text Button text (can contain HTML like icons).
 * @param array  $args {
 *     @type string $variant  "default"|"outline"|"secondary"|"ghost"|"link". Default "default".
 *     @type string $size     "default"|"sm"|"lg"|"icon". Default "default".
 *     @type string $class    Additional classes.
 *     @type string $tag      HTML tag ("a" or "button"). Default "button".
 *     @type string $href     URL when tag is "a".
 *     @type array  $attrs    Additional HTML attributes as key => value.
 * }
 * @return string HTML.
 */
function sro_button( string $text, array $args = [] ): string {
	$args = wp_parse_args( $args, [
		'variant' => 'default',
		'size'    => 'default',
		'class'   => '',
		'tag'     => 'button',
		'href'    => '',
		'attrs'   => [],
	] );

	$base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2';

	$variants = [
		'default'     => 'bg-primary text-primary-foreground border border-primary-border',
		'destructive' => 'bg-destructive text-destructive-foreground shadow-sm border-destructive-border',
		'outline'     => 'border [border-color:var(--button-outline)] shadow-xs active:shadow-none',
		'secondary'   => 'border bg-secondary text-secondary-foreground border border-secondary-border',
		'ghost'       => 'border border-transparent',
		'link'        => 'text-primary underline-offset-4 hover:underline',
	];

	$sizes = [
		'default' => 'min-h-9 px-4 py-2',
		'sm'      => 'min-h-8 rounded-md px-3 text-xs',
		'lg'      => 'min-h-10 rounded-md px-8',
		'icon'    => 'h-9 w-9',
	];

	$classes = $base
		. ' ' . ( $variants[ $args['variant'] ] ?? $variants['default'] )
		. ' ' . ( $sizes[ $args['size'] ] ?? $sizes['default'] );

	if ( $args['class'] ) {
		$classes .= ' ' . $args['class'];
	}

	$tag   = 'a' === $args['tag'] ? 'a' : 'button';
	$attrs = 'class="' . esc_attr( $classes ) . '"';

	if ( 'a' === $tag && $args['href'] ) {
		$attrs .= ' href="' . esc_url( $args['href'] ) . '"';
	}

	foreach ( $args['attrs'] as $key => $val ) {
		$attrs .= ' ' . esc_attr( $key ) . '="' . esc_attr( $val ) . '"';
	}

	return '<' . $tag . ' ' . $attrs . '>' . $text . '</' . $tag . '>';
}

/**
 * Render a separator (horizontal rule).
 *
 * @param string $class Additional classes.
 * @return string HTML.
 */
function sro_separator( string $class = '' ): string {
	$classes = 'shrink-0 bg-border h-[1px] w-full';
	if ( $class ) {
		$classes .= ' ' . $class;
	}
	return '<div role="separator" class="' . esc_attr( $classes ) . '"></div>';
}

/**
 * Get story featured image URL with fallback.
 *
 * @param int    $post_id Post ID.
 * @param string $size    Image size.
 * @return string Image URL.
 */
function sro_get_story_image( int $post_id = 0, string $size = 'sro-card-thumb' ): string {
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$url = get_the_post_thumbnail_url( $post_id, $size );

	if ( $url ) {
		return $url;
	}

	// Fallback to theme default image.
	return SRO_THEME_URI . '/assets/images/feature-mossy-trail.png';
}
