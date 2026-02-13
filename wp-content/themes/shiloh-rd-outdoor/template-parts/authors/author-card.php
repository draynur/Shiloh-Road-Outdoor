<?php
/**
 * Individual author card.
 *
 * Expects global $post to be set (inside a WP_Query loop).
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$author_id  = get_the_ID();
$role       = get_field( 'sro_author_role', $author_id );
$specialty  = get_field( 'sro_author_specialty', $author_id );
$icon       = get_field( 'sro_author_icon', $author_id ) ?: 'leaf';
?>

<div class="sr-grain rounded-[22px] border bg-card p-5 shadow-[var(--shadow-sm)]">
	<div class="flex items-start justify-between gap-3">
		<div>
			<div class="font-serif text-xl font-semibold">
				<?php the_title(); ?>
			</div>
			<?php if ( $role ) : ?>
				<div class="mt-1 text-sm text-muted-foreground">
					<?php echo esc_html( $role ); ?>
				</div>
			<?php endif; ?>
		</div>
		<div class="rounded-full border bg-secondary/60 p-2">
			<?php echo sro_icon( $icon, 'h-4 w-4 text-foreground/70' ); ?>
		</div>
	</div>

	<?php echo sro_separator( 'my-4' ); ?>

	<?php if ( $specialty ) : ?>
		<div class="text-sm leading-relaxed text-foreground/75">
			<?php echo esc_html( $specialty ); ?>
		</div>
	<?php endif; ?>

	<div class="mt-4 flex items-center justify-between gap-3">
		<?php echo sro_badge( 'contributor', 'secondary', 'rounded-full bg-secondary/70' ); ?>
		<?php
		echo sro_button(
			'View stories' . sro_icon( 'arrow-right', 'ml-2 h-4 w-4' ),
			[
				'variant' => 'ghost',
				'class'   => 'rounded-full',
				'attrs'   => [
					'data-search-author' => esc_attr( get_the_title() ),
				],
			]
		);
		?>
	</div>
</div>
