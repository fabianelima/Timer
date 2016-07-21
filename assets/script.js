/* TIMER APP */

$(function() {

	// Se for 0, esvazia o campo; se for !0, seleciona o valor.
	$('.minutes,.seconds').focusin(function() {
		if ($(this).val() === '00') $(this).val('');
		else if ($(this).val() !== '00') $(this).select();
	});

	// Verifica se não tem nada no form.
	$('.minutes,.seconds').focusout(function() {
		if ($(this).val() === '') $(this).val('00');
	});

	// Inicia o contador.
	$('.start').on('click', function() {
		var minutes = $('.minutes').val();
		var seconds = $('.seconds').val();

		console.log(minutes + ':' + seconds)
	});

});