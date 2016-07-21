#Algoritmo: TIMER APP

##EVENTO: usuário clica nos inputs e entra dados:
	- CHECK: limitado a 2 characteres
	- CHECK: limitado a [0-9]
	- CHECK: os números default somem para dar lugar aos dados do usuário

##EVENTO: usuário clica em START:
	- lê os dados fornecidos pelo usuário:
		- provavelmente tem que converter para um formato que o programa entenda
		- como ele já limita a entrada de dados antes, só tem que verificar se há alteração
	- bota o timer para correr até o fim do tempo estipulado [setTimeout()]:
		- alerta o usuário quando o timer chegar ao fim
	- habilita o botão de RESET
	- transforma o START em PAUSE

##EVENTO: usuário clica em RESET:
	- timer volta para 0

##EVENTO: usuário clica em PAUSE:
	- botão PAUSE vira START novamente
	- timer pausa a contagem e aguarda novo clique em START