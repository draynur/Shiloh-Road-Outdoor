<?php
/**
 * Front page template — assembles all sections.
 *
 * @package ShilohRdOutdoor
 */

get_header();
?>

<main class="mx-auto w-full max-w-6xl px-4 pb-16 pt-6">

	<?php get_template_part( 'template-parts/hero/hero-section' ); ?>

	<?php get_template_part( 'template-parts/stories/stories-grid' ); ?>

	<?php get_template_part( 'template-parts/authors/authors-grid' ); ?>

	<?php get_template_part( 'template-parts/highlights/highlights-grid' ); ?>

	<?php get_template_part( 'template-parts/subscribe/subscribe-section' ); ?>

</main>

<?php
get_footer();
