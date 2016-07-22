/* TIMER APP */

$(function() {
	
	// Validação do formulário.
	$('.minutes,.seconds').on('keypress', function() {
		return event.charCode >= 48 && event.charCode <= 57;
	});

	// Se for 0, esvazia o campo; se for !0, seleciona o valor.
	$('.minutes,.seconds').focusin(function() {
		if ($(this).val() === 00) $(this).val('');
		else if ($(this).val() !== 00) $(this).select();
	});

	// Verifica se não tem nada no formulário.
	$('.minutes,.seconds').focusout(function() {
		if ($(this).val() === '') $(this).val('00');
		else {
			// Repensar essa parte. Ele arredonda os segundos em vez de contar quanto isso dá em minutos, 
			// por enquanto. Provavelmente resolvível com alguma coisa relacionada a resto de divisão.
			if ($(this).hasClass('minutes')) {
				if ($(this).val() > 59) $(this).val('60');
			}
			else if ($(this).hasClass('seconds')) {
				if ($(this).val() > 59) {
					var min = Math.round($(this).val() / 60);
					$(this).val('00');
					$('.minutes').val(min);
				}
			}
		}
	});
	
	var contador;

	// Inicia o contador.
	$('.start').on('click', function() {
		m = $('.minutes').val();
		s = $('.seconds').val();
		var minutes = m * 60 * 1000;
		var seconds = s * 1000;
		var total = minutes + seconds;
		var t = total / 1000;
		var j = 0;

		if (m != 0 || s != 0) {
			$('.reset').css('pointer-events','auto');
			$('.minutes,.seconds').attr('disabled', true);
			$('.pause').show();
			$(this).hide();
			
			// Feedback visual para o usuário ENQUANTO a conta acontece.
			contador = setInterval(function() {
				j++;
				s--;

				if (m <= 0) m = '00';
				if (s <= 0) s = '00';

				if (m < 10 && m != 0) {
					m = '0' + m;

					if (m.length > 2) {
						m = m.slice(-2);
					}
				}

				if (s < 10 && s != 0) s = '0' + s;

				if (m > 0) {
					if (s == 0) {
						m--;
						s = 59;
					}
				}
				
				if (j == t) stopinterval();

				$('.minutes').val(m);
				$('.seconds').val(s);

			}, 1000);

			// Quando acaba a contagem regressiva, alerta o usuário.
			function stopinterval() {
				clearInterval(contador);
				$('.visor').css('background','#f00');
				$('.start').show();
				$('.pause').hide();
			}
		}
	});

	// Botão de pause.
	$('.pause').on('click', function teste() {
		$('.minutes,.seconds').attr('disabled', false);
		$('.minutes').val(m);
		$('.seconds').val(s);
		$('.start').show();
		$(this).hide();
		clearInterval(contador);
	});

	// Reseta o valor dos minutos e segundos no formulário.
	$('.reset').on('click', function() {
		$('.minutes,.seconds').val('00');
		$('.minutes,.seconds').attr('disabled', false);
		$('.visor').css('background','#000');
		$('.start').show();
		$('.pause').hide();
		clearInterval(contador);
	});
});