(function() {
  (function($, window) {
    var init, initHeader, initialised, isTablet;
    initialised = false;
    $(document).on('turbolinks:load', function() {
      init();
      return initialised = true;
    });
    $(function() {
      if (!initialised) {
        return init();
      }
    });
    init = function() {
      return initHeader();
    };
    initHeader = function() {
      $('#menu-toggle').on('click', function(e) {
        $('body').toggleClass('menu-shown');
        return e.preventDefault();
      });
      $('.close-menu-button').on('click', function() {
        $('body').removeClass('menu-shown sub-menu-shown sub-sub-menu-shown');
        return $('.menu-wrapper .active, .dropdown-menu.active, .header__main-nav .active').removeClass('active');
      });
      $('.overlay-menu--mobile .menu-item-has-children > a').on('click', function(e) {
        if ($(this).closest('li').hasClass('active')) {
          $(this).closest('li').removeClass('active').siblings('.active').removeClass('active');
          if ($(this).closest('.sub-menu').length) {
            $('body').removeClass('sub-sub-menu-shown');
          } else {
            $('body').removeClass('sub-menu-shown sub-sub-menu-shown');
          }
        } else {
          $(this).closest('li').addClass('active').siblings('.active').removeClass('active');
          if ($(this).closest('.sub-menu').length) {
            $('body').addClass('sub-sub-menu-shown');
          } else {
            $('body').addClass('sub-menu-shown');
          }
          if (isTablet()) {
            $(document).on('mouseup', function(e) {
              if ($(e.target).closest(eventSelector).length === 0 && !($(e.target).closest('li').hasClass('active'))) {
                $('.close-menu-button').trigger('click');
                return $(document).off('mouseup');
              }
            });
          }
        }
        return e.preventDefault();
      });
      $('.more-menu-button').on('click', function(e) {
        $('body').addClass('more-menu-shown');
        return e.preventDefault();
      });
      $('#menu-back-button').on('click', function(e) {
        $('body').removeClass('more-menu-shown');
        return e.preventDefault();
      });
      return $('.overlay-menu').on('click', function(e) {
        if (e.target === this) {
          return $('.close-menu-button').trigger('click');
        }
      });
    };
    return isTablet = function() {
      return $('.header').css('position') === 'fixed';
    };
  })(jQuery, window);

}).call(this);
