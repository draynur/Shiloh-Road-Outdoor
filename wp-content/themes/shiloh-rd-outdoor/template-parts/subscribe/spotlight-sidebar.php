<?php
/**
 * Editor's picks sidebar for subscribe section.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$spotlight_title = get_field( 'sro_spotlight_title', 'option' ) ?: 'Editor\'s picks';
$stories         = sro_get_spotlight_stories();
$footer_note     = get_field( 'sro_footer_note', 'option' ) ?: 'Built for slow travel.';
?>

<div class="relative min-h-[220px]">
	<div class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.20)] via-transparent to-[hsl(var(--accent)/0.22)]"></div>

	<div class="absolute inset-0 p-7 md:p-10">

		<div class="rounded-[22px] border bg-background/70 p-5 shadow-[var(--shadow-sm)]">
			<div class="text-xs uppercase tracking-wide text-muted-foreground">Spotlight</div>
			<div class="mt-1 font-serif text-xl font-semibold">
				<?php echo esc_html( $spotlight_title ); ?>
			</div>

			<div class="mt-3 space-y-3">
				<?php foreach ( $stories as $story ) : ?>
					<div class="flex items-center justify-between gap-3 rounded-[16px] border bg-card p-3 hover-elevate">
						<div class="min-w-0">
							<div class="truncate text-sm font-medium">
								<?php echo esc_html( get_the_title( $story ) ); ?>
							</div>
							<div class="mt-0.5 text-xs text-muted-foreground">
								<?php
								echo esc_html( sro_short_date( $story->ID ) );
								$rt = get_field( 'sro_story_read_time', $story->ID );
								if ( $rt ) {
									echo ' &middot; ' . esc_html( $rt ) . ' min';
								}
								?>
							</div>
						</div>
						<?php
						echo sro_button(
							sro_icon( 'arrow-right', 'h-4 w-4' ),
							[
								'size'    => 'icon',
								'variant' => 'outline',
								'class'   => 'rounded-full',
								'attrs'   => [ 'data-scroll-to' => 'stories' ],
							]
						);
						?>
					</div>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="mt-4 flex items-center justify-between rounded-[22px] border bg-background/70 px-4 py-3 text-sm shadow-[var(--shadow-xs)]">
			<div class="inline-flex items-center gap-2 text-foreground/75">
				<?php echo sro_icon( 'compass', 'h-4 w-4' ); ?>
				<?php echo esc_html( $footer_note ); ?>
			</div>
			<?php
			echo sro_button( 'Back to top', [
				'variant' => 'ghost',
				'class'   => 'rounded-full',
				'attrs'   => [ 'data-scroll-top' => '' ],
			] );
			?>
		</div>
	</div>
</div>
