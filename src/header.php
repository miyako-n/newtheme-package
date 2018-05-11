<!doctype html>
<html>
<head>
<meta charset="utf-8">

<title><?php if(get_field('seo_title')): ?><?php the_field('seo_title'); ?><? else: ?><?php get_meta_title(); ?><?php endif; ?></title>
<meta name="description" content="<?php if(get_field('seo_description')): ?><?php the_field('seo_description'); ?><? else: ?><?php bloginfo('description'); ?><?php endif; ?>" />
<meta name="keywords" content="<?php if(get_field('seo_keyword')): ?><?php the_field('seo_keyword'); ?><? else: ?><?php echo get_option( 'keyword_option' ); ?><?php endif; ?>" />

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link href="<?php bloginfo('stylesheet_url'); ?>" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/libs/vue.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/assets/js/script/common.js" charset="utf-8"></script>

<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/template/favicon/favicon.ico" type="image/vnd.microsoft.icon" />
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/img/template/favicon/favicon.ico" type="image/vnd.microsoft.icon" />
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/assets/images/template/favicon/favicon.png" />

</head>

<body>

<header class="globalHeader">
<h1 class="globalHeader__siteTitle"><a href="<?php echo home_url(); ?>"><?php bloginfo('name'); ?></a></h1>
<p class="globalHeader__description"><?php bloginfo('description'); ?></p>
  <nav class="globalNavigation">
    <div class="globalNavigation__wrap">
      <?php wp_nav_menu( array( 'theme_location' => 'Navigation' , 'container' => false ) ); ?>
    </div><!--//.nav__menu__wrap-->
  <div class="globalNavigation__spButton"><a id="js-spMenuToggle" class="globalNavigation__spButton__icon"><span class="globalNavigation__spButton__icon__mark"></span></a></div>
  </nav><!--//#navigation-->
</header><!--//.globalHeader-->
