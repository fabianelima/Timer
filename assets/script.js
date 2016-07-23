
/*
	    TIMER APP 0.9
	---------------------
	  Fabiane Lima 2016
	Feito em CoffeeScript
 */

(function() {
  $(function() {

    /* Validação do formulário. */
    var contador;
    $('.minutes,.seconds').on('keypress', function(event) {
      return event.charCode >= 48 && event.charCode <= 57;
    });

    /* Se for 0, esvazia o campo; se for !0, seleciona o valor. */
    $('.minutes,.seconds').focusin(function() {
      if ($(this).val() === '00') {
        $(this).val('');
      } else if ($(this).val() !== '00') {
        $(this).select();
      }
      $('.visor').css('background', 'linear-gradient(to top, #444 0%,#000 100%)');
    });

    /* Verifica se não tem nada no formulário. */
    $('.minutes,.seconds').focusout(function() {
      var min, v;
      if ($(this).val() === '') {
        $(this).val('00');
      } else {

        /* Repensar essa parte. Ele arredonda os segundos em vez de contar quanto isso dá em minutos, por enquanto. Provavelmente resolvível com alguma coisa relacionada a módulo. */
        if ($(this).val().length < 2) {
          v = $(this).val();
          $(this).val('0' + v);
        } else {
          if ($(this).hasClass('minutes')) {
            if ($(this).val() > 59) {
              $(this).val('60');
            }
          } else if ($(this).hasClass('seconds')) {
            if ($(this).val() > 59) {
              min = Math.round($(this).val() / 60);
              $(this).val('00');
              $('.minutes').val('0' + min);
            }
          }
        }
      }
    });
    contador = null;

    /* Inicia o contador. */
    $('.start').on('click', function() {
      var j, m, minutes, s, seconds, stopinterval, t, total;
      m = $('.minutes').val();
      s = $('.seconds').val();
      minutes = m * 60 * 1000;
      seconds = s * 1000;
      total = minutes + seconds;
      t = total / 1000;
      j = 0;
      if (m !== 0 || s !== 0) {
        $('.minutes,.seconds').attr('disabled', true);
        $('.reset').css('pointer-events', 'auto');
        $('.reset').attr('disabled', false);
        $('.pause').show();
        $('.reset').removeClass('d');
        $('.progress').show();
        $(this).hide();

        /* Feedback visual para o usuário ENQUANTO a conta acontece. */
        contador = setInterval(function() {
          j++;
          s--;
          if (m <= 0) {
            m = '00';
          }
          if (s <= 0) {
            s = '00';
          }
          if (m < 10 && m !== 0) {
            m = '0' + m;
            if (m.length > 2) {
              m = m.slice(-2);
            }
          }
          if (s < 10 && s !== 0) {
            s = '0' + s;
          }
          if (m > 0) {
            if (s === 0) {
              m--;
              s = 59;
            }
          }
          if (j === t) {
            stopinterval();
          }
          $('.minutes').val(m);
          $('.seconds').val(s);
        }, 1000);

        /* Quando acaba a contagem regressiva, alerta o usuário. */
        stopinterval = function() {
          clearInterval(contador);
          $('.visor').css('background', '#fa002f');
          $('.minutes,.seconds').attr('disabled', false);
          $('.start').show();
          $('.pause,.progress').hide();
        };
      }
    });

    /* Botão de pause. */
    $('.pause').on('click', function() {
      $('.minutes,.seconds').attr('disabled', false);
      $('.start').show();
      $('.pause').hide();
      clearInterval(contador);
    });

    /* Reseta o valor dos minutos e segundos no formulário. */
    return $('.reset').on('click', function() {
      $('.minutes,.seconds').val('00');
      $('.minutes,.seconds').attr('disabled', false);
      $(this).css('pointer-events', 'none');
      $(this).attr('disabled', true);
      $('.visor').css('background', 'linear-gradient(to top, #444 0%,#000 100%)');
      $('.start,.progress').show();
      $('.pause').hide();
      $(this).addClass('d');
      clearInterval(contador);
    });
  });

}).call(this);
