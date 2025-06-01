// Script do Portal de Serviços Digitais
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar componentes
    inicializarCalendario();
    inicializarTermos();
    inicializarFormulario();
    inicializarNavegacao();
    inicializarModoLanterna();
    inicializarLimpezaDePagina();
    inicializarBotaoNaoClique();
    
    // Configurar efeitos sutis
    aplicarEfeitosSutis();
});

// Função para inicializar o modo lanterna
function inicializarModoLanterna() {
    const botaoModoEscuro = document.getElementById('modo-escuro');
    const lanternaOverlay = document.getElementById('lanterna-overlay');
    let modoEscuroAtivo = false;
    
    // Configurar o botão de modo escuro
    botaoModoEscuro.addEventListener('click', function() {
        modoEscuroAtivo = !modoEscuroAtivo;
        
        if (modoEscuroAtivo) {
            // Ativar modo escuro
            lanternaOverlay.classList.remove('hidden');
            document.body.style.cursor = 'none';
            botaoModoEscuro.textContent = 'Modo Normal';
            document.addEventListener('mousemove', atualizarPosicaoLanterna);
        } else {
            // Desativar modo escuro
            lanternaOverlay.classList.add('hidden');
            document.body.style.cursor = '';
            botaoModoEscuro.textContent = 'Modo Escuro';
            document.removeEventListener('mousemove', atualizarPosicaoLanterna);
            lanternaOverlay.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });
    
    // Função para atualizar a posição da lanterna
    function atualizarPosicaoLanterna(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Criar um gradiente radial que deixa uma área circular iluminada
        const tamanhoLuz = Math.min(window.innerWidth, window.innerHeight) * 0.15; // Tamanho da área iluminada
        lanternaOverlay.style.background = `radial-gradient(circle ${tamanhoLuz}px at ${x}px ${y}px, transparent, rgba(0, 0, 0, 0.95) 70%)`;
    }
}

// Função para inicializar o "calendário por extenso"
function inicializarCalendario() {
    const calendarioToggle = document.getElementById('calendario-toggle');
    const calendario = document.getElementById('calendario');
    const diaSelect = document.getElementById('dia-select');
    const mesSelect = document.getElementById('mes-select');
    const anoSelect = document.getElementById('ano-select');
    const dataFormatada = document.getElementById('data-formatada');
    
    // Arrays para os dias, meses e anos por extenso
    const diasPorExtenso = [
        "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez",
        "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte",
        "vinte e um", "vinte e dois", "vinte e três", "vinte e quatro", "vinte e cinco", "vinte e seis", "vinte e sete", "vinte e oito", "vinte e nove", "trinta", "trinta e um"
    ];
    
    const mesesPorExtenso = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    
    // Função para converter números em extenso (para anos)
    function converterDigitosParaExtenso(numero) {
        const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
        const dezADezenove = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
        const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
        const centenas = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
        
        if (numero === 0) return "zero";
        
        if (numero < 10) return unidades[numero];
        
        if (numero < 20) return dezADezenove[numero - 10];
        
        if (numero < 100) {
            const dezena = Math.floor(numero / 10);
            const unidade = numero % 10;
            return dezenas[dezena] + (unidade > 0 ? " e " + unidades[unidade] : "");
        }
        
        if (numero === 100) return "cem";
        
        if (numero < 1000) {
            const centena = Math.floor(numero / 100);
            const resto = numero % 100;
            
            if (centena === 1) {
                return resto > 0 ? "cento e " + converterDigitosParaExtenso(resto) : "cem";
            }
            
            return centenas[centena] + (resto > 0 ? " e " + converterDigitosParaExtenso(resto) : "");
        }
        
        return ""; // Para simplificar, não vamos tratar números maiores
    }
    
    // Função para converter anos em extenso
    function converterAnoParaExtenso(ano) {
        if (ano >= 1900 && ano < 2000) {
            const resto = ano - 1900;
            if (resto === 0) {
                return "mil e novecentos";
            } else {
                return "mil novecentos e " + converterDigitosParaExtenso(resto);
            }
        } else if (ano >= 2000) {
            const resto = ano - 2000;
            if (resto === 0) {
                return "dois mil";
            } else {
                return "dois mil e " + converterDigitosParaExtenso(resto);
            }
        }
        
        return ""; // Não deve acontecer com nosso intervalo
    }
    
    // Preencher as opções do dia
    for (let i = 0; i < diasPorExtenso.length; i++) {
        const option = document.createElement('option');
        option.value = i + 1;
        option.textContent = diasPorExtenso[i];
        diaSelect.appendChild(option);
    }
    
    // Preencher as opções do mês
    for (let i = 0; i < mesesPorExtenso.length; i++) {
        const option = document.createElement('option');
        option.value = i + 1;
        option.textContent = mesesPorExtenso[i];
        mesSelect.appendChild(option);
    }
    
    // Preencher as opções do ano (de 1900 a 2025)
    for (let i = 1900; i <= 2025; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = converterAnoParaExtenso(i);
        anoSelect.appendChild(option);
    }
    
    // Evento para mostrar/esconder o calendário
    calendarioToggle.addEventListener('click', function() {
        if (calendario.style.display === 'block') {
            calendario.style.display = 'none';
            calendarioToggle.textContent = 'Selecione sua data de nascimento';
        } else {
            calendario.style.display = 'block';
            calendarioToggle.textContent = 'Ocultar seletor de data';
        }
    });
    
    // Atualizar a data selecionada quando houver mudança
    [diaSelect, mesSelect, anoSelect].forEach(select => {
        select.addEventListener('change', atualizarDataSelecionada);
    });
    
    function atualizarDataSelecionada() {
        const dia = diaSelect.value;
        const mes = mesSelect.value;
        const ano = anoSelect.value;
        
        if (dia && mes && ano) {
            const diaTexto = diasPorExtenso[dia - 1];
            const mesTexto = mesesPorExtenso[mes - 1];
            const anoTexto = anoSelect.options[anoSelect.selectedIndex].textContent;
            
            dataFormatada.textContent = `${diaTexto} de ${mesTexto} de ${anoTexto}`;
        } else {
            dataFormatada.textContent = 'Selecione uma data completa';
        }
    }
}

// Função para inicializar os "termos de uso"
function inicializarTermos() {
    const termosTexto = document.getElementById('termos-texto');
    
    // Gerar termos de uso longos e confusos
    let termos = "Termos de Uso do Portal de Serviços Digitais\n\n";
    
    // Adicionar parágrafos confusos e longos
    for (let i = 1; i <= 15; i++) {
        termos += `${i}. ${gerarParagrafoConfuso(i)}\n\n`;
    }
    
    // Atrasar o carregamento dos termos para simular lentidão
    setTimeout(() => {
        termosTexto.innerText = termos;
    }, 2500);
    
    // Fazer com que o checkbox de termos seja difícil de marcar
    const termosCheckbox = document.getElementById('termos');
    termosCheckbox.addEventListener('mouseover', function(e) {
        if (!termosCheckbox.checked) {
            // 70% de chance do checkbox "fugir" do cursor
            if (Math.random() < 0.7) {
                const container = document.querySelector('.termos-checkbox');
                const containerRect = container.getBoundingClientRect();
                
                // Mover o checkbox para uma posição aleatória dentro do container
                const newX = Math.random() * (containerRect.width - 20);
                const newY = Math.random() * (containerRect.height - 20);
                
                termosCheckbox.style.position = 'relative';
                termosCheckbox.style.left = `${newX}px`;
                termosCheckbox.style.top = `${newY}px`;
            }
        }
    });
}

// Gerar parágrafos confusos para os termos
function gerarParagrafoConfuso(index) {
    const paragrafos = [
        "Ao utilizar este serviço, o usuário concorda em fornecer dados precisos, completos e atualizados quando solicitado pelo formulário de registro. O usuário é responsável por manter a confidencialidade de sua conta e senha, bem como por restringir o acesso ao seu computador, e concorda em aceitar responsabilidade por todas as atividades que ocorram sob sua conta ou senha.",
        
        "O Portal reserva-se o direito de recusar o serviço, encerrar contas, remover ou editar conteúdo, ou cancelar pedidos a seu exclusivo critério, sem aviso prévio ou justificativa, principalmente nos casos em que as informações fornecidas sejam imprecisas, incompletas ou violem qualquer parte destes Termos de Serviço.",
        
        "O usuário concorda em não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do Serviço, uso do Serviço, ou acesso ao Serviço ou qualquer contato no site através do qual o serviço é fornecido, sem expressa permissão por escrito da nossa empresa.",
        
        "Ocasionalmente, poderá haver informações em nosso site ou no Serviço que contenha erros tipográficos, inexatidões ou omissões que possam relacionar-se a descrições de produtos, preços, promoções, ofertas, taxas de envio do produto, tempos de trânsito e disponibilidade. Reservamo-nos o direito de corrigir quaisquer erros, inexatidões ou omissões, e de alterar ou atualizar informações ou cancelar pedidos se qualquer informação no Serviço ou em qualquer site relacionado for imprecisa, a qualquer momento e sem aviso prévio.",
        
        "Os preços dos nossos produtos estão sujeitos a alterações sem aviso prévio. Reservamo-nos o direito, a qualquer momento, de modificar ou descontinuar o Serviço (ou qualquer parte ou conteúdo do mesmo) sem aviso prévio em qualquer momento. Não seremos responsáveis perante você ou terceiros por qualquer modificação, suspensão ou descontinuação do Serviço.",
        
        "Além das proibições estabelecidas nos Termos de Serviço, o usuário concorda em não: (a) fazer upload, postar, enviar e-mail ou transmitir qualquer Material que seja ilegal, prejudicial, ameaçador, abusivo, assediador, calunioso, difamatório, vulgar, obsceno, injurioso, invasivo da privacidade de outrem ou reprovável; (b) prejudicar menores de idade de qualquer forma; (c) fazer-se passar por qualquer pessoa ou entidade, incluindo, mas não se limitando a, um funcionário do Portal, ou falsamente declarar ou de outra forma deturpar sua afiliação a uma pessoa ou entidade.",
        
        "O Portal não garante, endossa, ou assume responsabilidade por qualquer produto ou serviço anunciado ou oferecido por terceiros através do Serviço ou qualquer site linkado, ou apresentado em qualquer banner ou outro tipo de publicidade, e não será parte ou de qualquer forma responsável por monitorar qualquer transação entre você e fornecedores terceirizados de produtos ou serviços.",
        
        "Em nenhum caso o Portal, nossos diretores, executivos, funcionários, afiliados, agentes, contratados, estagiários, fornecedores, prestadores de serviços ou licenciadores serão responsáveis por quaisquer danos, perdas, reivindicações, ou danos diretos, indiretos, incidentais, punitivos, especiais, ou consequentes de qualquer tipo, incluindo, sem limitação, lucros cessantes, perda de receita, poupanças perdidas, perda de dados, custos de reposição, ou quaisquer danos semelhantes.",
        
        "Você concorda em indenizar, defender e isentar o Portal e nossos subsidiários, afiliados, parceiros, funcionários, diretores, agentes, contratados, licenciadores, prestadores de serviços, subcontratados, fornecedores, estagiários e funcionários, de qualquer reclamação ou demanda, incluindo honorários de advogados, por quaisquer terceiros devido à violação destes Termos de Serviço ou aos documentos que incorporam por referência, ou à violação de qualquer lei ou os direitos de um terceiro.",
        
        "No caso em que qualquer disposição destes Termos de Serviço seja considerada como ilegal, nula ou ineficaz, tal disposição deve, contudo, ser aplicável até ao limite máximo permitido pela lei aplicável, e a porção inexequível será considerada separada desses Termos de Serviço, tal determinação não afetando a validade e aplicabilidade de quaisquer outras disposições restantes.",
        
        "O Portal considera essencial para sua operação o processamento de dados pessoais do usuário conforme as diretrizes da Lei Geral de Proteção de Dados. Ao utilizar este site, o usuário concorda com a coleta contínua e o processamento automático de todas as informações digitadas, incluindo, mas não se limitando a: padrões de digitação, velocidade de preenchimento de formulários, tempo de permanência em cada página, movimentos de cursor, e outros metadados comportamentais considerados essenciais para análise estatística.",
        
        "A rescisão destes Termos de Serviço não afetará as obrigações das partes incorridas antes da data de rescisão, nem afetará qualquer termo implicitamente destinado a subsistir à rescisão. Após a rescisão ou suspensão dos serviços, o Portal pode automaticamente excluir os dados associados à conta do usuário após um período de 30 dias, sem possibilidade de recuperação posterior.",
        
        "Qualquer tentativa de acessar áreas restritas do Portal, invadir nossos sistemas, modificar código-fonte, ou realizar engenharia reversa de nossos aplicativos resultará em persecução criminal e civil, com aplicação de multa compensatória de R$ 10.000,00 (dez mil reais) por tentativa, além de indenização por danos morais e materiais causados.",
        
        "O Portal se reserva ao direito de utilizar todas as informações fornecidas pelos usuários para melhorar seus produtos e serviços, bem como para compartilhamento com empresas parceiras para fins comerciais, respeitando a legislação vigente. O consentimento para uso dos dados é considerado dado no momento do aceite destes Termos.",
        
        "Ao clicar em 'Li e concordo com os termos' o usuário afirma ter lido integralmente este documento, compreendido todos os seus termos e condições, e concorda irrevogavelmente com todas as cláusulas aqui estabelecidas, independentemente de alterações futuras que possam ocorrer sem aviso prévio."
    ];
    
    // Retornar parágrafo conforme o índice, ou um aleatório se o índice for maior que o array
    return paragrafos[index - 1] || paragrafos[Math.floor(Math.random() * paragrafos.length)];
}

// Função para inicializar comportamentos do formulário
function inicializarFormulario() {
    const btnEnviar = document.getElementById('btn-enviar');
    const btnLimpar = document.getElementById('btn-limpar');
    const form = document.getElementById('cadastro-form');
    
    // Botão de enviar que foge do cursor
    let contador = 0;
    let posicaoOriginal = null;
    
    btnEnviar.addEventListener('mouseover', function(e) {
        if (contador < 3) {
            // Guardar a posição original na primeira vez
            if (posicaoOriginal === null) {
                posicaoOriginal = {
                    position: btnEnviar.style.position,
                    left: btnEnviar.style.left,
                    top: btnEnviar.style.top
                };
            }
            
            // Mover o botão para longe do cursor
            const x = Math.random() * 300 - 150;
            const y = Math.random() * 100 - 50;
            
            btnEnviar.style.position = 'relative';
            btnEnviar.style.left = `${x}px`;
            btnEnviar.style.top = `${y}px`;
            
            contador++;
        } else {
            // Restaurar posição original após 3 tentativas
            btnEnviar.style.position = posicaoOriginal.position;
            btnEnviar.style.left = posicaoOriginal.left;
            btnEnviar.style.top = posicaoOriginal.top;
        }
    });
    
    // Lista de usuários aleatórios para mensagem de erro de senha
    const usuariosAleatorios = [
        { nome: "Maria Silva", email: "mariasilva@email.com", desde: "10/03/2016" },
        { nome: "João Santos", email: "joaosantos@provedor.net", desde: "22/07/2019" },
        { nome: "Ana Oliveira", email: "anaoliveira@mail.org", desde: "05/11/2010" },
        { nome: "Carlos Pereira", email: "carlospereira@servidor.br", desde: "18/02/2021" },
        { nome: "Juliana Costa", email: "julicosta@empresa.com", desde: "30/09/2014" },
        { nome: "Roberto Almeida", email: "robertoalmeida@email.net", desde: "14/05/2018" },
        { nome: "Fernanda Lima", email: "felima@correio.com", desde: "02/12/2022" },
        { nome: "Antônio Souza", email: "antoniosouza@mail.com.br", desde: "25/08/2017" },
        { nome: "Patrícia Mendes", email: "paty_mendes@webmail.net", desde: "13/06/2015" },
        { nome: "Ricardo Santos", email: "ricardosantos@dominio.com", desde: "19/01/2020" }
    ];

    btnEnviar.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const termosAceitos = document.getElementById('termos').checked;
        
        if (nome && email && senha && termosAceitos) {
            // Simular envio com atraso
            btnEnviar.innerHTML = 'Enviando...';
            btnEnviar.disabled = true;
            
            setTimeout(() => {
                // 70% de chance de mostrar erro de senha já cadastrada
                if (Math.random() < 0.7) {
                    // Selecionar um usuário aleatório da lista
                    const usuarioAleatorio = usuariosAleatorios[Math.floor(Math.random() * usuariosAleatorios.length)];
                    
                    alert(`Erro no cadastro: A senha "${senha}" já está sendo utilizada pelo usuário ${usuarioAleatorio.nome} (${usuarioAleatorio.email}) cadastrado desde ${usuarioAleatorio.desde}.\n\nPor motivos de segurança, não é permitido o uso de senhas duplicadas em nosso sistema.`);
                    
                    // Mudar a aparência do campo de senha para indicar o erro
                    const senhaInput = document.getElementById('senha');
                    senhaInput.style.borderColor = 'red';
                    senhaInput.style.backgroundColor = '#ffe6e6';
                } else {
                    // Comportamento estranho: inverte o nome do usuário
                    const nomeInvertido = nome.split('').reverse().join('');
                    
                    alert(`Cadastro realizado com sucesso!\n\nBem-vindo, ${nomeInvertido}!\n\nUm email de confirmação foi enviado para ${email.replace('@', ' (arroba) ')}`);
                    
                    // Comportamento estranho: limpar apenas metade dos campos
                    document.getElementById('nome').value = '';
                    document.getElementById('senha').value = '';
                }
                
                btnEnviar.innerHTML = 'Cadastrar';
                btnEnviar.disabled = false;
                
                // Resetar posição do botão
                contador = 0;
                if (posicaoOriginal) {
                    btnEnviar.style.position = posicaoOriginal.position;
                    btnEnviar.style.left = posicaoOriginal.left;
                    btnEnviar.style.top = posicaoOriginal.top;
                }
            }, 2000);
        } else {
            alert('Por favor, preencha todos os campos e aceite os termos de uso');
        }
    });
    
    // Botão de limpar que não limpa tudo
    btnLimpar.addEventListener('click', function(e) {
        e.preventDefault(); // Prevenir o reset padrão
        
        // Limpar apenas alguns campos aleatoriamente
        const campos = [
            document.getElementById('nome'),
            document.getElementById('email'),
            document.getElementById('senha')
        ];
        
        // Escolher aleatoriamente quais campos limpar
        campos.forEach(campo => {
            if (Math.random() > 0.5) {
                campo.value = '';
            }
        });
        
        alert('Alguns campos foram limpos com sucesso!');
    });
}

// Função para inicializar comportamentos da navegação
function inicializarNavegacao() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 50% de chance de ir para uma página aleatória
            if (Math.random() > 0.5) {
                alert(`A página "${this.textContent}" está temporariamente indisponível.\nTente novamente mais tarde.`);
            } else {
                // Redirecionar para a mesma página com um parâmetro aleatório
                window.location.href = window.location.href.split('?')[0] + 
                    `?page=${this.textContent.toLowerCase()}&session=${Math.floor(Math.random() * 1000000)}`;
            }
        });
    });
}

// Função para aplicar efeitos sutis na página
function aplicarEfeitosSutis() {
    // Adicionar pequenos atrasos nos inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const valor = this.value;
            const self = this;
            
            // 20% de chance de atrasar a digitação
            if (Math.random() < 0.2) {
                e.preventDefault();
                setTimeout(() => {
                    self.value = valor;
                }, 300);
            }
        });
    });
    
    // Trocar letras ocasionalmente no campo de senha
    const senhaInput = document.getElementById('senha');
    if (senhaInput) {
        senhaInput.addEventListener('input', function() {
            // 10% de chance de trocar um caractere
            if (Math.random() < 0.1 && this.value.length > 0) {
                const pos = Math.floor(Math.random() * this.value.length);
                const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                const randomChar = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                
                this.value = this.value.substr(0, pos) + randomChar + this.value.substr(pos + 1);
            }
        });
    }
}

// Função para inicializar o botão "NÃO CLIQUE!"
function inicializarBotaoNaoClique() {
    const btnNaoClique = document.getElementById('btn-nao-clique');
    const formCadastro = document.getElementById('cadastro-form');
    const todosElementosInterativos = document.querySelectorAll('button, input, select, a, textarea');

    if (btnNaoClique) {
        btnNaoClique.addEventListener('click', function() {
            // 1. Tocar som de explosão
            try {
                const audio = new Audio('assets/som de explosão (para videos).mp3'); 
                audio.play().catch(error => {
                    console.error("Erro ao tentar tocar o áudio:", error);
                    // Fallback para o alert se o áudio falhar por algum motivo (ex: política de autoplay)
                    alert("BOOOOM! (Áudio não pôde ser reproduzido)");
                });
            } catch (error) {
                console.error("Erro ao criar o objeto de áudio:", error);
                alert("BOOOOM! (Erro ao carregar áudio)");
            }

            // Desabilitar todos os botões e inputs para evitar cliques múltiplos ou interferências
            todosElementosInterativos.forEach(el => el.disabled = true);
            btnNaoClique.style.animation = 'none'; // Para a animação de pulsar
            btnNaoClique.style.opacity = '0.5';

            // 2. Aplicar animação de explosão
            // Para o formulário e seus elementos internos:
            if (formCadastro) {
                formCadastro.classList.add('explodindo');
                // Definir variáveis CSS para posições aleatórias de explosão para cada elemento do formulário
                const formElements = formCadastro.querySelectorAll('.form-group > *');
                formElements.forEach(el => {
                    el.style.setProperty('--random-x', (Math.random() - 0.5) * 1000); // Entre -500px e 500px
                    el.style.setProperty('--random-y', (Math.random() - 0.5) * 1000); // Entre -500px e 500px
                    el.classList.add('explodindo'); // Adiciona a classe para os filhos também, se não coberto pelo CSS
                });
                 // Para o próprio formulário também ter sua trajetória aleatória
                formCadastro.style.setProperty('--random-x', (Math.random() - 0.5) * 800);
                formCadastro.style.setProperty('--random-y', (Math.random() - 0.5) * 800);
            }

            // Opcional: fazer outros elementos da página explodirem também
            // const outrosElementos = document.querySelectorAll('header, .beneficios, footer');
            // outrosElementos.forEach(el => {
            //     el.style.setProperty('--random-x', (Math.random() - 0.5) * 1000);
            //     el.style.setProperty('--random-y', (Math.random() - 0.5) * 1000);
            //     el.classList.add('explodindo');
            // });

            // 3. Após a animação, limpar a página ou mostrar mensagem
            setTimeout(() => {
                document.body.innerHTML = '<h1 style="color: red; text-align: center; margin-top: 40vh; font-size: 3em;">SITE DESTRUÍDO!</h1>';
                document.body.style.backgroundColor = 'black';
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }, 1500); // Duração da animação de explosão CSS (1.5s)
        });
    }
}

// Função para inicializar a limpeza de página
function inicializarLimpezaDePagina() {
    const btnLimpar = document.getElementById('btn-limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            // Adiciona uma classe para iniciar a animação de quebra
            document.body.classList.add('pagina-quebrando');

            // Define um tempo para a animação ocorrer antes de limpar o conteúdo
            // Este tempo deve ser igual à duração da animação CSS
            setTimeout(() => {
                // Remove todo o conteúdo do body
                document.body.innerHTML = '';
                // Define o fundo como branco e remove a classe da animação
                document.body.style.backgroundColor = 'white';
                document.body.classList.remove('pagina-quebrando');
                // Opcional: remover quaisquer outros estilos globais que possam interferir
                document.body.style.cursor = 'default'; 
                
                // Remove o overlay da lanterna se estiver ativo
                const lanternaOverlay = document.getElementById('lanterna-overlay');
                if (lanternaOverlay) {
                    lanternaOverlay.classList.add('hidden');
                }
                // Garante que o scroll não afete a página em branco
                 document.documentElement.style.overflow = 'hidden'; 
                 document.body.style.overflow = 'hidden';


            }, 2000); // Exemplo: 2 segundos de animação
        });
    }
}