<?php
/**
 * Hero section with background image, search, and featured card.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$hero_image_id   = get_field( 'sro_hero_image', 'option' );
$hero_image_url  = $hero_image_id ? wp_get_attachment_image_url( $hero_image_id, 'sro-hero' ) : SRO_THEME_URI . '/assets/images/hero-ridge-road.png';
$kicker          = get_field( 'sro_hero_kicker', 'option' ) ?: 'Recent stories by prominent authors';
$title           = get_field( 'sro_hero_title', 'option' ) ?: 'A field journal for quiet roads and wild mornings.';
$subtitle        = get_field( 'sro_hero_subtitle', 'option' ) ?: 'Shiloh Rd Outdoor highlights the best new writing across hikes, camps, rivers, and small towns — with photos, routes, and notes you can steal for your next weekend.';
$search_placeholder = get_field( 'sro_hero_search_placeholder', 'option' ) ?: 'Search stories, authors, locations…';

$featured = sro_get_featured_stories( 2 );
$tags     = sro_get_story_tags();
?>

<section class="sr-grain relative overflow-hidden rounded-[28px] border bg-card shadow-[var(--shadow-lg)]" id="hero">

	<div class="absolute inset-0">
		<img
			src="<?php echo esc_url( $hero_image_url ); ?>"
			alt="Foggy ridge road at dawn"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-background/95 via-background/55 to-background/5"></div>
	</div>

	<div class="relative grid gap-6 px-6 py-10 md:grid-cols-[1.3fr_.9fr] md:gap-10 md:px-10 md:py-14">

		<!-- Left column: kicker, headline, search, tags -->
		<div class="sro-fade-up">
			<div class="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm shadow-[var(--shadow-xs)]">
				<?php echo sro_icon( 'compass', 'h-4 w-4 text-foreground/80' ); ?>
				<span class="text-foreground/80"><?php echo esc_html( $kicker ); ?></span>
			</div>

			<h1 class="mt-4 font-serif text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
				<?php echo esc_html( $title ); ?>
			</h1>

			<p class="mt-4 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg">
				<?php echo esc_html( $subtitle ); ?>
			</p>

			<!-- Search -->
			<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
				<div class="relative w-full sm:max-w-sm">
					<?php echo sro_icon( 'search', 'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' ); ?>
					<input
						type="search"
						id="sro-search"
						placeholder="<?php echo esc_attr( $search_placeholder ); ?>"
						class="flex h-11 w-full rounded-full border border-input bg-transparent px-3 py-1 pl-10 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
					/>
				</div>
				<?php
				echo sro_button( 'Clear', [
					'variant' => 'secondary',
					'class'   => 'h-11 rounded-full',
					'attrs'   => [ 'id' => 'sro-clear-filters' ],
				] );
				?>
			</div>

			<!-- Tags -->
			<div class="mt-5 flex flex-wrap items-center gap-2" id="sro-tags">
				<span
					class="sro-tag active cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold bg-foreground text-background hover:bg-foreground"
					data-tag=""
				>All</span>
				<?php foreach ( $tags as $tag ) : ?>
					<span
						class="sro-tag cursor-pointer rounded-full border bg-background/70 px-3 py-1 text-xs font-semibold text-foreground/80 hover:bg-background"
						data-tag="<?php echo esc_attr( $tag->slug ); ?>"
					><?php echo esc_html( $tag->name ); ?></span>
				<?php endforeach; ?>
			</div>
		</div>

		<!-- Right column: featured card -->
		<div class="sro-fade-up relative">
			<?php if ( ! empty( $featured ) ) : ?>
				<div class="rounded-[22px] border bg-background/70 p-4 shadow-[var(--shadow-sm)]">

					<?php
					$first = $featured[0];
					$first_author_name = sro_get_story_author_name( $first->ID );
					?>
					<div class="flex items-start justify-between gap-3">
						<div>
							<div class="text-xs uppercase tracking-wide text-muted-foreground">Featured</div>
							<div class="mt-1 font-serif text-xl font-semibold">
								<?php echo esc_html( get_the_title( $first ) ); ?>
							</div>
							<div class="mt-2 text-sm leading-relaxed text-foreground/70">
								<?php echo esc_html( get_the_excerpt( $first ) ); ?>
							</div>
						</div>
						<?php
						echo sro_button(
							sro_icon( 'bookmark', 'h-4 w-4' ),
							[
								'size'    => 'icon',
								'variant' => 'outline',
								'class'   => 'shrink-0 rounded-full',
							]
						);
						?>
					</div>

					<?php if ( isset( $featured[1] ) ) : ?>
						<?php echo sro_separator( 'my-4' ); ?>

						<div class="grid gap-3">
							<?php
							$second       = $featured[1];
							$second_author = sro_get_story_author_name( $second->ID );
							$second_location = get_field( 'sro_story_location', $second->ID );
							?>
							<div class="flex items-center justify-between gap-3 rounded-[16px] border bg-card p-3 hover-elevate">
								<div class="min-w-0">
									<div class="truncate font-medium">
										<?php echo esc_html( get_the_title( $second ) ); ?>
									</div>
									<div class="mt-0.5 text-xs text-muted-foreground">
										<?php
										echo esc_html( $second_author );
										if ( $second_location ) {
											echo ' &middot; ' . esc_html( $second_location );
										}
										?>
									</div>
								</div>
								<?php
								echo sro_button(
									sro_icon( 'arrow-right', 'h-4 w-4' ),
									[
										'size'  => 'icon',
										'class' => 'rounded-full',
										'attrs' => [ 'data-scroll-to' => 'stories' ],
									]
								);
								?>
							</div>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
