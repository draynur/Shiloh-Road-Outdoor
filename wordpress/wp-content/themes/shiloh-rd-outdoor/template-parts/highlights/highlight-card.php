<?php
/**
 * Individual highlight card (from ACF repeater sub_field data).
 *
 * Expects $args['title'], $args['description'], $args['icon'] to be passed
 * via get_template_part( '...', null, $args ).
 *
 * @package ShilohRdOutdoor
 */

defined( 'ABSPATH' ) || exit;

$h_title = $args['title'] ?? '';
$h_desc  = $args['description'] ?? '';
$h_icon  = $args['icon'] ?? 'compass';
?>

<div class="sr-grain rounded-[22px] border bg-card p-5 shadow-[var(--shadow-sm)]">
	<div class="flex items-start gap-3">
		<div class="rounded-[14px] border bg-secondary/70 p-3">
			<?php echo sro_icon( $h_icon, 'h-5 w-5 text-foreground/70' ); ?>
		</div>
		<div>
			<div class="font-serif text-xl font-semibold">
				<?php echo esc_html( $h_title ); ?>
			</div>
			<div class="mt-1 text-sm leading-relaxed text-foreground/70">
				<?php echo esc_html( $h_desc ); ?>
			</div>
		</div>
	</div>
</div>
