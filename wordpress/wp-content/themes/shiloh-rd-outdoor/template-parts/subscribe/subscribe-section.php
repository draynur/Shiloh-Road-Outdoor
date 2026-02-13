<?php
/**
 * Subscribe section — form + spotlight sidebar.
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$badge_text  = get_field( 'sro_subscribe_badge_text', 'option' ) ?: 'Field dispatch';
$title       = get_field( 'sro_subscribe_title', 'option' ) ?: 'Get one great story a week.';
$subtitle    = get_field( 'sro_subscribe_subtitle', 'option' ) ?: 'New essays, routes, and photo notes — delivered when they\'re worth your time.';
$button_text = get_field( 'sro_subscribe_button_text', 'option' ) ?: 'Join';
$fine_print  = get_field( 'sro_subscribe_fine_print', 'option' ) ?: 'No spam. Just the good stuff.';
$form_action = get_field( 'sro_subscribe_form_action', 'option' ) ?: '#';
?>

<section class="mt-12" id="subscribe">
	<div class="sr-grain overflow-hidden rounded-[26px] border bg-card shadow-[var(--shadow-md)]">
		<div class="grid gap-0 md:grid-cols-[1.2fr_.8fr]">

			<!-- Left: subscribe form -->
			<div class="p-7 md:p-10">
				<div class="inline-flex items-center gap-2 rounded-full border bg-secondary/60 px-3 py-1 text-xs uppercase tracking-wide text-foreground/70">
					<?php echo sro_icon( 'sparkles', 'h-4 w-4' ); ?>
					<?php echo esc_html( $badge_text ); ?>
				</div>

				<h3 class="mt-4 font-serif text-3xl font-semibold leading-tight">
					<?php echo esc_html( $title ); ?>
				</h3>

				<p class="mt-2 text-sm leading-relaxed text-foreground/70">
					<?php echo esc_html( $subtitle ); ?>
				</p>

				<form action="<?php echo esc_url( $form_action ); ?>" method="post" class="mt-5 flex flex-col gap-3 sm:flex-row">
					<input
						type="email"
						name="email"
						placeholder="Email address"
						required
						class="flex h-11 w-full rounded-full border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
					/>
					<?php
					echo sro_button(
						esc_html( $button_text ) . sro_icon( 'arrow-right', 'ml-2 h-4 w-4' ),
						[
							'class' => 'h-11 rounded-full',
							'attrs' => [ 'type' => 'submit' ],
						]
					);
					?>
				</form>

				<p class="mt-3 text-xs text-muted-foreground">
					<?php echo esc_html( $fine_print ); ?>
				</p>
			</div>

			<!-- Right: spotlight sidebar -->
			<?php get_template_part( 'template-parts/subscribe/spotlight-sidebar' ); ?>

		</div>
	</div>
</section>
