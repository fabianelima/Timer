
/*
	  TIMER APP 0.9
	-----------------
	Fabiane Lima 2016
 */

(function() {
  $(function() {
    var contador;
    $('.minutes,.seconds').on('click', function(event) {
      return event.charCode >= 48 && event.charCode <= 57;
    });
    $('.minutes,.seconds').focusin(function() {
      if ($(this).val() === '00') {
        $(this).val('');
      } else if ($(this).val() !== '00') {
        $(this).select();
      }
      return $('.visor').css('background', 'linear-gradient(to top, #444 0%,#000 100%)');
    });
    $('.minutes,.seconds').focusout(function() {
      var min, v;
      if ($(this).val() === '') {
        return $(this).val('00');
      } else {
        if ($(this).val().length < 2) {
          v = $(this).val();
          return $(this).val('0' + v);
        } else {
          if ($(this).hasClass('minutes')) {
            if ($(this).val() > 59) {
              return $(this).val('60');
            }
          } else if ($(this).hasClass('seconds')) {
            if ($(this).val() > 59) {
              min = Math.round($(this).val() / 60);
              $(this).val('00');
              return $('.minutes').val('0' + min);
            }
          }
        }
      }
    });
    contador = 0;
    $('.start').on('click', function() {
      var j, m, minutes, s, seconds, t, total;
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
              m = m[-2];
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
          return $('.seconds').val(s);
        }, 1000);
        return stopinterval(function() {
          clearInterval(contador);
          $('.visor').css('background', '#fa002f');
          $('.minutes,.seconds').attr('disabled', false);
          $('.start').show();
          return $('.pause,.progress').hide();
        });
      }
    });
    $('.pause').on('click', function() {
      $('.minutes,.seconds').attr('disabled', false);
      $('.minutes').val(m);
      $('.seconds').val(s);
      $('.start').show();
      return $('.pause').hide();
    });
    return $('.reset').on('click', function() {
      $('.minutes,.seconds').val('00');
      $('.minutes,.seconds').attr('disabled', false);
      $(this).css('pointer-events', 'none');
      $(this).attr('disabled', true);
      $('.visor').css('background', 'linear-gradient(to top, #444 0%,#000 100%)');
      $('.start,.progress').show();
      $('.pause').hide();
      $(this).addClass('d');
      return clearInterval(contador);
    });
  });

}).call(this);
