do ($ = jQuery, window) ->

  if Turbolinks? and Turbolinks.supported
    $(document).on 'turbolinks:load', ->
      init()
  else
    $ ->
      init()

  init = ->
    initHeader()

  initHeader = ->
    $('#menu-toggle').on 'click', (e) ->
      $('body').toggleClass('menu-shown')
      e.preventDefault()

    $('.close-menu-button').on 'click', ->
      $('body').removeClass('menu-shown sub-menu-shown sub-sub-menu-shown')
      $('.menu-wrapper .active, .dropdown-menu.active, .header__main-nav .active').removeClass('active')

    $('.menu-wrapper, .overlay-menu--more .menu-wrapper, .menu-wrapper nav').click (e) ->
      e.stopPropagation()

    $('.overlay-menu--more .menu-wrapper').click (e) ->
      $('body').removeClass('menu-shown')

    $('.overlay-menu--mobile').click (e) ->
      if($(e.target) != $('.back-button') && !$(e.target).closest('.back-button').length)
        e.stopPropagation()
        $('body').removeClass('menu-shown')

    $('.overlay-menu--mobile .menu-item-has-children > a').on 'click', (e) ->
      if $(@).closest('li').hasClass('active')
        $(@).closest('li').removeClass('active')
        .siblings('.active').removeClass('active')
        if $(@).closest('.sub-menu').length
          $('body').removeClass('sub-sub-menu-shown')
        else
          $('body').removeClass('sub-menu-shown sub-sub-menu-shown')
      else
        $(@).closest('li').addClass('active')
        .siblings('.active').removeClass('active')
        if $(@).closest('.sub-menu').length
          $('body').addClass('sub-sub-menu-shown')
        else
          $('body').addClass('sub-menu-shown')
        if isTablet()
          $(document).on 'mouseup', (e) ->
            if $(e.target).closest(eventSelector).length == 0 and not ( $(e.target).closest('li').hasClass('active') )
              $('.close-menu-button').trigger 'click'
              $(document).off 'mouseup'
      e.preventDefault()

    $('#menu-main-menu > .menu-item-has-children > a').on 'click', (e) ->
      e.preventDefault();

    $('.more-menu-button').on 'click', (e) ->
      $('body').addClass('more-menu-shown')
      e.preventDefault()

    $('#menu-back-button').on 'click', (e) ->
      $('body').removeClass('more-menu-shown')
      e.preventDefault()

    $('.overlay-menu').on 'click', (e) ->
      if e.target == @
        $('.close-menu-button').trigger 'click'

  isTablet = ->
    $('.header').css('position') == 'fixed'
