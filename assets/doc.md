#Algoritmo: TIMER APP

##EVENTO: usuário clica nos inputs e entra dados:
	- CHECK: limitado a 2 characteres
	- CHECK: limitado a [0-9]
	- CHECK: limitado a < 59
		- CHECK: se o usuário tentar entrar 60 nos segundos, +1 em minutos
	- CHECK: os números default somem para dar lugar aos dados do usuário

##EVENTO: usuário clica em START:
	- CHECK: lê os dados fornecidos pelo usuário:
		- CHECK: provavelmente tem que converter para um formato que o programa entenda
		- CHECK: como ele já limita a entrada de dados antes, só tem que verificar se há alteração
	- CHECK: bota o timer para correr até o fim do tempo estipulado [setTimeout()]:
		- CHECK: alerta o usuário quando o timer chegar ao fim
	- CHECK: habilita o botão de RESET
	- transforma o START em PAUSE

##EVENTO: usuário clica em RESET:
	- CHECK: timer volta para 0
	- CHECK: RESET é desabilitado

##EVENTO: usuário clica em PAUSE:
	- CHECK: botão PAUSE vira START novamente
	- timer pausa a contagem e aguarda novo clique em START