###
	  TIMER APP 0.9
	-----------------
	Fabiane Lima 2016
###

$ ->
	# Validação do formulário.
	$('.minutes,.seconds').on 'click', (event) ->					# <==== Não funcionou.
		return event.charCode >= 48 and event.charCode <= 57

	# Se for 0, esvazia o campo; se for !0, seleciona o valor.
	$('.minutes,.seconds').focusin -> 
		if $(this).val() is '00' then $(this).val('')
		else if $(this).val() isnt '00' then $(this).select()
		$('.visor').css('background','linear-gradient(to top, #444 0%,#000 100%)')

	# Verifica se não tem nada no formulário.
	$('.minutes,.seconds').focusout ->
		if $(this).val() is '' then $(this).val('00')
		else
			# Repensar essa parte. Ele arredonda os segundos em vez de contar quanto isso dá em minutos, 
			# por enquanto. Provavelmente resolvível com alguma coisa relacionada a módulo.
			if $(this).val().length < 2
				v = $(this).val()
				$(this).val('0' + v)
			else
				if $(this).hasClass('minutes')
					if $(this).val() > 59 then $(this).val('60')

				else if $(this).hasClass('seconds')
					if $(this).val() > 59
						min = Math.round($(this).val() / 60)
						$(this).val('00')
						$('.minutes').val('0' + min)
	
	contador = 0

	# Inicia o contador.
	$('.start').on 'click', ->
		m = $('.minutes').val()
		s = $('.seconds').val()
		minutes = m * 60 * 1000			# Em milisegundos.
		seconds = s * 1000				# Em milisegundos.
		total = minutes + seconds
		t = total / 1000
		j = 0

		if m != 0 || s != 0
			$('.minutes,.seconds').attr('disabled', true)
			$('.reset').css('pointer-events','auto')
			$('.reset').attr('disabled', false)
			$('.pause').show()
			$('.reset').removeClass('d')
			$('.progress').show()
			$(this).hide()
			
			# Feedback visual para o usuário ENQUANTO a conta acontece.
			contador = setInterval ->
				j++
				s--

				if m <= 0 then m = '00'
				if s <= 0 then s = '00'

				if m < 10 and m != 0
					m = '0' + m

					if m.length > 2 then m = m[-2]				#  <========  slice()

				if s < 10 and s != 0 then s = '0' + s

				if m > 0
					if s == 0
						m--
						s = 59
				
				if j == t then stopinterval()

				$('.minutes').val(m)
				$('.seconds').val(s)
			, 1000

			# Quando acaba a contagem regressiva, alerta o usuário.
			stopinterval ->
				clearInterval(contador)
				$('.visor').css('background','#fa002f')
				$('.minutes,.seconds').attr('disabled', false)
				$('.start').show()
				$('.pause,.progress').hide() 

	# Botão de pause.
	$('.pause').on 'click', ->
		$('.minutes,.seconds').attr('disabled', false)
		$('.minutes').val(m)
		$('.seconds').val(s)
		$('.start').show()
		$('.pause').hide()
		#clearInterval(contador);

	# Reseta o valor dos minutos e segundos no formulário.
	$('.reset').on 'click', ->
		$('.minutes,.seconds').val('00')
		$('.minutes,.seconds').attr('disabled', false)
		$(this).css('pointer-events','none')
		$(this).attr('disabled', true)
		$('.visor').css('background','linear-gradient(to top, #444 0%,#000 100%)')
		$('.start,.progress').show()
		$('.pause').hide()
		$(this).addClass('d')
		clearInterval(contador)