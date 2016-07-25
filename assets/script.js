
/*
	    TIMER APP 0.9
	----------------------
	  Fabiane Lima 2016
	Feito em CoffeeScript,
	 com ajuda do Aléssio
 */

(function() {
  $(function() {

    /* With a little help of my friends... Resolve a parte do zero ter duas casas antes da vírgula. */
    var contador, padto2;
    padto2 = function(number) {
      var str;
      str = "" + number;
      if (str.length >= 2) {
        return str;
      } else {
        return "0" + str;
      }
    };

    /* Validação do formulário. */
    $('.minutes,.seconds').on('keypress', function(_arg) {
      var charCode;
      charCode = _arg.charCode;
      return (48 <= charCode && charCode <= 57);
    });

    /* Se for 0, esvazia o campo; se for !0, seleciona o valor. */
    $('.minutes,.seconds').focusin(function() {
      $(this).select();
      $('.visor').css('background', 'linear-gradient(to top, #444 0%,#000 100%)');
    });

    /* Verifica se não tem nada no formulário. */
    $('.minutes,.seconds').focusout(function() {
      $(this).val(padto2($(this).val()));
    });
    contador = void 0;

    /* Inicia o contador. */
    $('.start').on('click', function() {
      var j, m, max, minutes, s, seconds, stopinterval, total;
      m = Number($('.minutes').val());
      s = Number($('.seconds').val());
      minutes = m * 60 * 1000;
      seconds = s * 1000;
      total = minutes + seconds;
      max = Math.ceil(total / 1000);
      j = 0;
      if ((m + s) > 0) {
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
          if (s < 0) {
            s = 59;
            m--;
          }
          if (j >= max) {
            stopinterval();
          }
          $('.minutes').val(padto2(m));
          $('.seconds').val(padto2(s));
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
