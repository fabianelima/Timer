###
      TIMER APP 0.9
  ---------------------
    Fabiane Lima 2016
  Feito em CoffeeScript
###

padto2 = (number) ->
  str = "#{number}"
  if str.length >= 2
    str
  else "0#{str}"

$ ->
  $ms = $ '.minutes, .seconds'

  ### Validação do formulário. ###
  $ms.on 'keypress', ({charCode}) -> 48 <= charCode <= 57

  ### Se for 0, esvazia o campo; se for !0, seleciona o valor. ###
  $ms.focusin ->
    ($ this).select()
    # if $el.val() is '00' then $el.val ''
    ($ '.visor').css 'background','linear-gradient(to top, #444 0%,#000 100%)'

  ### Formata campos do formulário ###
  $ms.focusout ->
    $el = $ this
    $el.val padto2 $el.val()

  clock = undefined

  ### Inicia o contador. ###
  ($ '.start').on 'click', ->
    $el = $ this
    m = Number ($ '.minutes').val()
    s = Number ($ '.seconds').val()
    minutes = m * 60 * 1000      # Em milisegundos.
    seconds = s * 1000        # Em milisegundos.
    total = minutes + seconds
    max = Math.ceil total / 1000
    count = 0

    if (m + s) > 0
      $ms.attr 'disabled', true
      ($ '.reset').css 'pointer-events','auto'
      ($ '.reset').attr 'disabled', false
      ($ '.pause').show()
      ($ '.reset').removeClass 'd'
      ($ '.progress').show()
      $el.hide()

      ### Feedback visual para o usuário ENQUANTO a conta acontece. ###
      clock = setInterval ->
        # console.log {m, s, count, max}
        count++
        s--

        if s < 0
          s = 59
          m--

        if count >= max then stop()

        ($ '.minutes').val padto2 m
        ($ '.seconds').val padto2 s
      , 1000

      ### Quando acaba a contagem regressiva, alerta o usuário. ###
      stop = -> #hammertime
        clearInterval clock
        ($ '.visor').css 'background','#fa002f'
        ($ '.minutes,.seconds').attr 'disabled', false
        ($ '.start').show()
        ($ '.pause, .progress').hide()

  ### Botão de pause. ###
  ($ '.pause').on 'click', ->
    clearInterval clock
    ($ '.minutes,.seconds').attr 'disabled', false
    ($ '.start').show()
    ($ '.pause').hide()


  ### Reseta o valor dos minutos e segundos no formulário. ###
  ($ '.reset').on 'click', ->
    clearInterval clock
    $el = $ this
    ($ '.minutes,.seconds').val '00'
    ($ '.minutes,.seconds').attr 'disabled', false
    $el.css 'pointer-events', 'none'
    $el.attr 'disabled', true
    ($ '.visor').css 'background','linear-gradient(to top, #444 0%,#000 100%)'
    ($ '.start, .progress').show()
    ($ '.pause').hide()
    $el.addClass('d')
