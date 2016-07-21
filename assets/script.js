/* TIMER APP */

// Tempo com 0 na frente se for um número só
// Resto da divisão
// Checar tipagem dos dados
// Ele arredonda os segundos em vez de contar quanto isso dá em minutos, por enquanto
// Talvez fazer uma função que controle o botão de pause & o fim da contagem ao mesmo tempo

$(function() {

	// Se for 0, esvazia o campo; se for !0, seleciona o valor.
	$('.minutes,.seconds').focusin(function() {
		if ($(this).val() === 00) $(this).val('');
		else if ($(this).val() !== 00) $(this).select();
	});

	// Verifica se não tem nada no formulário.
	$('.minutes,.seconds').focusout(function() {
		if ($(this).val() === '') $(this).val('00');
		else {
			//													<==== Repensar essa parte.
			$('.start').css('pointer-events','auto');
			if ($(this).hasClass('minutes')) {
				if ($(this).val() > 59) $(this).val('60');
			}
			else if ($(this).hasClass('seconds')) {
				if ($(this).val() > 59) {
					var roundind = Math.round($(this).val() / 60);

					$(this).val('00');
					$('.minutes').val(roundind);
				}
			}
		}
	});

	// Inicia o contador.
	$('.start').on('click', function() {
		var m = $('.minutes').val();
		var s = $('.seconds').val();
		var minutes = m * 60 * 1000;
		var seconds = s * 1000;
		var total = minutes + seconds;
		var t = total / 1000;
		var j = 0;

		$('.reset').css('pointer-events','auto');
		$('.minutes,.seconds').attr('disabled',true);
		$(this).html('Pause');
		$(this).addClass('pause');
		$(this).removeClass('start');	
		
		// Feedback visual para o usuário ENQUANTO a conta acontece.
		var contador = setInterval(function() {
			j++;
			s--;

			if (m < 0) m = '00';
			if (s < 0) s = '00';

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
		}

		// Botão de pause.
		$('.pause').on('click', function() {
			$('.minutes,.seconds').attr('disabled',false);
			$(this).html('Start');
			$(this).addClass('start');
			$(this).removeClass('pause');
		});
	});

	// Reseta o valor dos minutos e segundos no formulário.
	$('.reset').on('click', function() {
		$(this).css('pointer-events','none');
		$('.minutes,.seconds').val('00');
		$('.minutes,.seconds').attr('disabled',false);
	});

});