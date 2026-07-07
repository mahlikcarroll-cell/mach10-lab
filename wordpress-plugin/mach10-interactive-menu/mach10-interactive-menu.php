<?php
/**
 * Plugin Name: Mach10 Interactive Menu
 * Description: Adds the Mach10 interactive quadrant menu with the [mach10_menu] shortcode.
 * Version: 1.0.0
 * Author: Mach10
 * License: GPL-2.0-or-later
 * Text Domain: mach10-interactive-menu
 */

if (!defined('ABSPATH')) {
    exit;
}

define('MACH10_INTERACTIVE_MENU_VERSION', '1.0.0');
define('MACH10_INTERACTIVE_MENU_URL', plugin_dir_url(__FILE__));
define('MACH10_INTERACTIVE_MENU_PATH', plugin_dir_path(__FILE__));

function mach10_interactive_menu_assets_ready() {
    return file_exists(MACH10_INTERACTIVE_MENU_PATH . 'assets/mach10-menu.css')
        && file_exists(MACH10_INTERACTIVE_MENU_PATH . 'assets/mach10-menu.js');
}

function mach10_interactive_menu_enqueue_assets() {
    if (!mach10_interactive_menu_assets_ready()) {
        return;
    }

    if (wp_style_is('mach10-interactive-menu', 'enqueued')) {
        return;
    }

    wp_enqueue_style(
        'mach10-interactive-menu',
        MACH10_INTERACTIVE_MENU_URL . 'assets/mach10-menu.css',
        array(),
        MACH10_INTERACTIVE_MENU_VERSION
    );

    wp_register_script(
        'mach10-interactive-menu',
        MACH10_INTERACTIVE_MENU_URL . 'assets/mach10-menu.js',
        array(),
        MACH10_INTERACTIVE_MENU_VERSION,
        true
    );

    wp_add_inline_script(
        'mach10-interactive-menu',
        'window.Mach10MenuConfig = Object.assign({}, window.Mach10MenuConfig, { assetBase: ' . wp_json_encode(esc_url_raw(MACH10_INTERACTIVE_MENU_URL . 'assets')) . ' });',
        'before'
    );

    wp_enqueue_script('mach10-interactive-menu');
}

function mach10_interactive_menu_maybe_enqueue_assets() {
    if (!is_singular()) {
        return;
    }

    $post = get_post();

    if (!$post || !has_shortcode($post->post_content, 'mach10_menu')) {
        return;
    }

    mach10_interactive_menu_enqueue_assets();
}
add_action('wp_enqueue_scripts', 'mach10_interactive_menu_maybe_enqueue_assets');

function mach10_interactive_menu_script_module($tag, $handle, $src) {
    if ('mach10-interactive-menu' !== $handle) {
        return $tag;
    }

    return '<script type="module" src="' . esc_url($src) . '" id="mach10-interactive-menu-js"></script>' . "\n";
}
add_filter('script_loader_tag', 'mach10_interactive_menu_script_module', 10, 3);

function mach10_interactive_menu_shortcode() {
    mach10_interactive_menu_enqueue_assets();

    if (!mach10_interactive_menu_assets_ready()) {
        return '<!-- Mach10 Interactive Menu assets are missing. Rebuild the plugin package. -->';
    }

    return '<div id="mach10-menu-root" data-mach10-asset-base="' . esc_url(MACH10_INTERACTIVE_MENU_URL . 'assets') . '"></div>';
}
add_shortcode('mach10_menu', 'mach10_interactive_menu_shortcode');
