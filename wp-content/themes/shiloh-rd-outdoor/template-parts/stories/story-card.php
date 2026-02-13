<?php
/**
 * Individual story card.
 *
 * Expects global $post to be set (inside a WP_Query loop).
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$story_id     = get_the_ID();
$author_name  = sro_get_story_author_name( $story_id );
$read_time    = get_field( 'sro_story_read_time', $story_id );
$location     = get_field( 'sro_story_location', $story_id );
$is_featured  = get_field( 'sro_story_featured', $story_id );
$image_url    = sro_get_story_image( $story_id );
$tags         = get_the_terms( $story_id, 'sro_story_tag' );
?>

<div class="sr-grain group overflow-hidden rounded-[22px] border bg-card shadow-[var(--shadow-sm)] transition-transform duration-300 hover:-translate-y-0.5">
	<div class="grid md:grid-cols-[180px_1fr]">

		<!-- Image -->
		<div class="relative h-44 w-full md:h-full">
			<img
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( get_the_title() ); ?>"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
			<?php if ( $is_featured ) : ?>
				<div class="absolute left-3 top-3">
					<?php echo sro_badge( 'Featured', 'default', 'rounded-full' ); ?>
				</div>
			<?php endif; ?>
		</div>

		<!-- Content -->
		<div class="p-5">
			<div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
				<span><?php echo esc_html( sro_short_date( $story_id ) ); ?></span>
				<span aria-hidden="true">&middot;</span>
				<span><?php echo esc_html( $read_time ); ?> min</span>
				<?php if ( $location ) : ?>
					<span aria-hidden="true">&middot;</span>
					<span class="inline-flex items-center gap-1">
						<?php echo sro_icon( 'map-pinned', 'h-3.5 w-3.5' ); ?>
						<span><?php echo esc_html( $location ); ?></span>
					</span>
				<?php endif; ?>
			</div>

			<div class="mt-2 font-serif text-xl font-semibold leading-snug">
				<?php the_title(); ?>
			</div>

			<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">
				<?php echo esc_html( get_the_excerpt() ); ?>
			</p>

			<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
				<div class="flex flex-wrap gap-2">
					<?php
					if ( $tags && ! is_wp_error( $tags ) ) :
						foreach ( array_slice( $tags, 0, 3 ) as $tag ) :
							echo sro_badge( $tag->name, 'secondary', 'rounded-full bg-secondary/70' );
						endforeach;
					endif;
					?>
				</div>
				<?php if ( $author_name ) : ?>
					<div class="text-sm text-muted-foreground">
						<?php echo esc_html( $author_name ); ?>
					</div>
				<?php endif; ?>
			</div>

			<div class="mt-4 flex items-center gap-2">
				<?php
				echo sro_button(
					'Read story' . sro_icon( 'arrow-right', 'ml-2 h-4 w-4' ),
					[
						'class' => 'rounded-full',
					]
				);
				echo sro_button(
					sro_icon( 'bookmark', 'h-4 w-4' ),
					[
						'size'    => 'icon',
						'variant' => 'outline',
						'class'   => 'rounded-full',
					]
				);
				?>
			</div>
		</div>
	</div>
</div>
