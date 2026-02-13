<?php
/**
 * Sticky header bar.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$brand_name    = get_field( 'sro_brand_name', 'option' ) ?: 'Shiloh Rd Outdoor';
$brand_tagline = get_field( 'sro_brand_tagline', 'option' ) ?: 'field journal';
?>

<header class="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">

		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="group inline-flex items-baseline gap-2">
			<span class="font-serif text-lg font-semibold tracking-tight text-foreground">
				<?php echo esc_html( $brand_name ); ?>
			</span>
			<?php echo sro_badge( $brand_tagline, 'secondary', 'rounded-full bg-secondary/70 text-foreground/80' ); ?>
		</a>

		<nav class="hidden items-center gap-1 md:flex">
			<?php
			echo sro_button( 'Stories', [
				'variant' => 'ghost',
				'class'   => 'rounded-full',
				'attrs'   => [ 'data-scroll-to' => 'stories' ],
			] );
			echo sro_button( 'Authors', [
				'variant' => 'ghost',
				'class'   => 'rounded-full',
				'attrs'   => [ 'data-scroll-to' => 'authors' ],
			] );
			echo sro_button( 'Highlights', [
				'variant' => 'ghost',
				'class'   => 'rounded-full',
				'attrs'   => [ 'data-scroll-to' => 'highlights' ],
			] );
			?>
		</nav>

		<div class="flex items-center gap-2">
			<?php
			echo sro_button(
				sro_icon( 'sparkles', 'mr-2 h-4 w-4' ) . 'Subscribe',
				[
					'variant' => 'outline',
					'class'   => 'hidden rounded-full md:inline-flex',
					'attrs'   => [ 'data-scroll-to' => 'subscribe' ],
				]
			);
			echo sro_button(
				'Explore' . sro_icon( 'arrow-right', 'ml-2 h-4 w-4' ),
				[
					'class' => 'rounded-full',
					'attrs' => [ 'data-scroll-to' => 'stories' ],
				]
			);
			?>
		</div>
	</div>
</header>
