<?php
/**
 * Site footer content.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$brand_name     = get_field( 'sro_brand_name', 'option' ) ?: 'Shiloh Rd Outdoor';
$copyright_text = get_field( 'sro_copyright_text', 'option' ) ?: 'Trails, campfires, and field notes.';
?>

<footer class="mx-auto w-full max-w-6xl px-4">
	<div class="mt-10 border-t pt-8 pb-10">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<div class="font-serif text-lg font-semibold">
					<?php echo esc_html( $brand_name ); ?>
				</div>
				<div class="mt-1 text-sm text-muted-foreground">
					&copy; <?php echo esc_html( date( 'Y' ) ); ?> &mdash; <?php echo esc_html( $copyright_text ); ?>
				</div>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<?php
				echo sro_button( 'About', [
					'variant' => 'outline',
					'class'   => 'rounded-full',
					'attrs'   => [ 'data-scroll-to' => 'authors' ],
				] );
				echo sro_button( 'Contact', [
					'variant' => 'outline',
					'class'   => 'rounded-full',
					'attrs'   => [ 'data-scroll-to' => 'subscribe' ],
				] );
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
	</div>
</footer>
