###
	    TIMER APP 0.9
	----------------------
	  Fabiane Lima 2016
	Feito em CoffeeScript,
	 com ajuda do Aléssio
###

	
$ ->
	### With a little help of my friends... Resolve a parte do zero ter duas casas antes da vírgula. ###
	padto2 = (number) ->
		str = "#{number}"
		if str.length >= 2
			str
		else "0#{str}"

	### Validação do formulário. ###
	$('.minutes,.seconds').on 'keypress', ({charCode}) -> 48 <= charCode <= 57

	### Se for 0, esvazia o campo; se for !0, seleciona o valor. ###
	$('.minutes,.seconds').focusin -> 
		$(this).select()
		$('.visor').css('background','linear-gradient(to top, #444 0%,#000 100%)')
		return

	### Verifica se não tem nada no formulário. ###
	$('.minutes,.seconds').focusout ->
		$(this).val padto2 $(this).val()
		return
	
	contador = undefined

	### Inicia o contador. ###
	$('.start').on 'click', ->
		m = Number $('.minutes').val()
		s = Number $('.seconds').val()
		minutes = m * 60 * 1000			# Em milisegundos.
		seconds = s * 1000				# Em milisegundos.
		total = minutes + seconds
		max = Math.ceil total / 1000
		j = 0

		if (m + s) > 0
			$('.minutes,.seconds').attr('disabled', true)
			$('.reset').css('pointer-events','auto')
			$('.reset').attr('disabled', false)
			$('.pause').show()
			$('.reset').removeClass('d')
			$('.progress').show()
			$(this).hide()
			
			### Feedback visual para o usuário ENQUANTO a conta acontece. ###
			contador = setInterval ->
				j++
				s--

				if s < 0
					s = 59
					m--
				
				if j >= max then stopinterval()

				$('.minutes').val padto2 m
				$('.seconds').val padto2 s
				return
			, 1000

			### Quando acaba a contagem regressiva, alerta o usuário. ###
			stopinterval = ->
				clearInterval(contador)
				$('.visor').css('background','#fa002f')
				$('.minutes,.seconds').attr('disabled', false)
				$('.start').show()
				$('.pause,.progress').hide()
				return
		return

	### Botão de pause. ###
	$('.pause').on 'click', ->
		$('.minutes,.seconds').attr('disabled', false)
		$('.start').show()
		$('.pause').hide()
		clearInterval(contador)
		return

	### Reseta o valor dos minutos e segundos no formulário. ###
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
		return