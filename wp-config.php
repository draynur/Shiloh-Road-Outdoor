<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'wordpress' );

/** Database hostname */
define( 'DB_HOST', 'database' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'ZjMnV?b-/ZbY1h7=:!9T=@Tz$[M~fgN[/^<Degd}b5aU_c#QW)xP/Sk{-fffIWGP' );
define( 'SECURE_AUTH_KEY',   'C&i;t;}WulI^Kw:=?[??^SNMA2{[p=`H0MP!0g[$(0,)m]l!XeqM86]eKX}7oq9R' );
define( 'LOGGED_IN_KEY',     'mUeNJ!&ZqK{.-^R&h}]gxq,Q2zRd?]*2,WckL(H~ap.T9Y4Sr6D9N&$3B20W{zJH' );
define( 'NONCE_KEY',         'B32MIw2!-L%Tg6%+=zN_pAHPsE)Y(M-qIJIg[SMi>ktO1d_K5v2]VRn}sFEV[>Q6' );
define( 'AUTH_SALT',         'f!bI-tkfea,i[hA(/6#3ZL95$us@[iGJY^<qNT=I:[|)&4@{).E6>;u$B:+(=xGz' );
define( 'SECURE_AUTH_SALT',  ')x[`X*_*%RAK/t{N[qp$^M}uDDel~;W7-E)7G`zLF)==+xD2u0zy2H Vx7}4h. =' );
define( 'LOGGED_IN_SALT',    'sCy>Je0X~4#yW{[{rH^TFUN;T@j7MW _48sI#(nD$TvtjzHI 2.ra&y)CC^2?Mu=' );
define( 'NONCE_SALT',        '<{4.bcXkjx;qrKyHO~CK:<Z}*Bj.$<z>[3z,p8n^--;t4omlz/K,zXg;ToRwV<:;' );
define( 'WP_CACHE_KEY_SALT', ')~KhNicTY2[T9Y,h$b*X8F(bW7EV2ah!v2&S_%zSq@mh:^UBsD.3-2$M`=gN9?l`' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
