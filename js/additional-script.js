// Funções adicionais bizarras para o site

document.addEventListener("DOMContentLoaded", function() {
    // Inicializar novos recursos
    setTimeout(() => {
        inicializarCaptchaImpossivel();
    }, 500); // Adicionamos um delay para garantir que todos os elementos foram carregados
    inicializarCookiesBizarros();
    inicializarInversaoCoresAleatorias();
    inicializarTextoDesaparecente();
    inicializarBotoesFalsos();
    inicializarDigitacaoErrada();
    inicializarFormularioReverso();
    
    // Se o URL tem o parâmetro de sessão expirada, mostrar mensagem frustrante
    if (window.location.href.includes('sessao-expirada=true')) {
        setTimeout(() => {
            alert("Sua sessão expirou após 5 minutos de inatividade.\nTodos os dados foram perdidos.\nVocê será redirecionado para a página inicial.");
            document.body.style.opacity = '0.1';
            setTimeout(() => {
                window.location.href = window.location.href.split('?')[0];
            }, 2000);
        }, 1000);
    }
    
    // Girar o site ocasionalmente
    setInterval(() => {
        const angulo = (Math.random() - 0.5) * 10;
        document.body.style.transform = `rotate(${angulo}deg)`;
        setTimeout(() => {
            document.body.style.transform = 'rotate(0deg)';
        }, 3000);
    }, 45000);
});

// CAPTCHA impossível de resolver
function inicializarCaptchaImpossivel() {
    const captchaOverlay = document.getElementById('captcha-overlay');
    const captchaArea = document.getElementById('captcha-area');
    const captchaReset = document.getElementById('captcha-reset');
    const captchaTimer = document.getElementById('captcha-timer');
    const captchaClose = document.getElementById('captcha-close');
    
    // Variável para controlar se o captcha já foi mostrado
    let captchaJaExibido = false;
    
    // Forçar exibição do CAPTCHA imediatamente quando solicitado
    if (!captchaJaExibido) {
        mostrarCaptcha();
        captchaJaExibido = true;
    }
    
    // Adicionar botão para mostrar captcha manualmente, para testes
    const botaoForcaCaptcha = document.createElement('button');
    botaoForcaCaptcha.innerText = 'Verificar Identidade';
    botaoForcaCaptcha.style.position = 'fixed';
    botaoForcaCaptcha.style.bottom = '10px';
    botaoForcaCaptcha.style.right = '10px';
    botaoForcaCaptcha.style.zIndex = '999';
    botaoForcaCaptcha.style.padding = '8px 12px';
    botaoForcaCaptcha.style.backgroundColor = '#d43f3f';
    botaoForcaCaptcha.style.color = 'white';
    botaoForcaCaptcha.style.border = 'none';
    botaoForcaCaptcha.style.borderRadius = '4px';
    botaoForcaCaptcha.addEventListener('click', () => {
        captchaJaExibido = false; // Resetar o flag para permitir mostrar novamente
        mostrarCaptcha();
    });
    document.body.appendChild(botaoForcaCaptcha);
    
    // Botão de fechar captcha
    if (captchaClose) {
        captchaClose.addEventListener('click', () => {
            // Apenas 20% de chance de realmente fechar
            if (Math.random() < 0.2) {
                fecharCaptcha();
            } else {
                // Caso contrário, mostrar mensagem e fazer o botão se mover
                captchaClose.style.position = 'relative';
                captchaClose.style.left = `${(Math.random() - 0.5) * 20}px`;
                captchaClose.style.top = `${(Math.random() - 0.5) * 20}px`;
                alert('Erro: Não foi possível verificar sua identidade. Por favor, complete o CAPTCHA.');
            }
        });
    }

    // Também mostrar o captcha quando o usuário clicar em certos elementos
    document.querySelectorAll('button:not(#captcha-close):not(#captcha-reset), input, a').forEach(el => {
        el.addEventListener('click', (e) => {
            if (!captchaJaExibido && Math.random() < 0.15) {
                e.preventDefault();
                mostrarCaptcha();
                captchaJaExibido = true;
            }
        });
    });
    
    function mostrarCaptcha() {
        // Garantir que o overlay está disponível no DOM
        if (captchaOverlay && captchaArea && captchaReset && captchaTimer) {
            captchaOverlay.classList.remove('hidden');
            gerarDesafioCaptcha();
            iniciarTempoLimite();
            
            // Fechamento automático após 10 segundos
            setTimeout(() => {
                fecharCaptcha();
                console.log("CAPTCHA fechado automaticamente após 10 segundos");
            }, 10000);
            
            // Adicionar contador regressivo para o fechamento automático
            const contadorDiv = document.createElement('div');
            contadorDiv.style.marginTop = '10px';
            contadorDiv.style.fontSize = '12px';
            contadorDiv.style.color = '#666';
            contadorDiv.textContent = 'Fechamento automático em 10s';
            document.querySelector('.captcha-container').appendChild(contadorDiv);
            
            // Atualizar o contador a cada segundo
            let tempoParaFechar = 10;
            const intervalContador = setInterval(() => {
                tempoParaFechar--;
                if (tempoParaFechar <= 0) {
                    clearInterval(intervalContador);
                } else {
                    contadorDiv.textContent = `Fechamento automático em ${tempoParaFechar}s`;
                }
            }, 1000);
            
            // Adicionar botão para fechar captcha após um tempo
            setTimeout(() => {
                const botaoFechar = document.createElement('button');
                botaoFechar.innerText = 'Pular Verificação (não recomendado)';
                botaoFechar.style.marginTop = '10px';
                botaoFechar.style.padding = '5px';
                botaoFechar.style.backgroundColor = '#aaa';
                botaoFechar.style.border = '1px solid #999';
                botaoFechar.style.borderRadius = '4px';
                botaoFechar.style.cursor = 'pointer';
                botaoFechar.style.fontSize = '12px';
                
                // Fazer o botão se mover ao passar o mouse
                botaoFechar.addEventListener('mouseover', (e) => {
                    if (Math.random() < 0.7) {
                        botaoFechar.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 30}px)`;
                    }
                });
                
                botaoFechar.addEventListener('mouseout', () => {
                    botaoFechar.style.transform = 'translate(0, 0)';
                });
                
                // Ao clicar fecha o captcha
                botaoFechar.addEventListener('click', () => {
                    fecharCaptcha();
                    clearInterval(intervalContador); // Limpar o intervalo do contador
                    alert('Verificação pulada. Sua experiência no site pode ser limitada.');
                });
                
                // Adicionar ao container
                document.querySelector('.captcha-container').appendChild(botaoFechar);
            }, 5000); // Mostra depois de 5 segundos
            
            console.log("CAPTCHA exibido"); // Debug
        } else {
            console.error("Elementos do CAPTCHA não encontrados:", {
                captchaOverlay: captchaOverlay,
                captchaArea: captchaArea,
                captchaReset: captchaReset,
                captchaTimer: captchaTimer
            });
            // Tentar recuperar elementos novamente
            setTimeout(() => {
                const captchaOverlay = document.getElementById('captcha-overlay');
                const captchaArea = document.getElementById('captcha-area');
                const captchaReset = document.getElementById('captcha-reset');
                const captchaTimer = document.getElementById('captcha-timer');
                
                if (captchaOverlay) {
                    captchaOverlay.classList.remove('hidden');
                    if (captchaArea) gerarDesafioCaptcha();
                    if (captchaTimer) iniciarTempoLimite();
                }
            }, 1000);
        }
    }
    
    function gerarDesafioCaptcha() {
        // Limpar área do captcha
        captchaArea.innerHTML = '';
        
        // Gerar formas para arrastar
        const formas = ['circle', 'square', 'triangle'];
        const cores = ['red', 'blue', 'green', 'purple', 'orange'];
        
        // Adicionar formas arrastáveis
        for (let i = 0; i < 3; i++) {
            const forma = document.createElement('div');
            forma.className = 'captcha-forma';
            forma.style.width = '50px';
            forma.style.height = '50px';
            forma.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            forma.style.position = 'absolute';
            forma.style.left = `${Math.random() * 150 + 50}px`;
            forma.style.top = `${Math.random() * 150 + 50}px`;
            forma.style.cursor = 'move';
            forma.style.zIndex = '2';
            
            if (formas[i] === 'circle') {
                forma.style.borderRadius = '50%';
            } else if (formas[i] === 'triangle') {
                forma.style.width = '0';
                forma.style.height = '0';
                forma.style.backgroundColor = 'transparent';
                forma.style.borderLeft = '25px solid transparent';
                forma.style.borderRight = '25px solid transparent';
                forma.style.borderBottom = `50px solid ${cores[Math.floor(Math.random() * cores.length)]}`;
            }
            
            forma.setAttribute('draggable', 'true');
            captchaArea.appendChild(forma);
            
            // Adicionar sombra para a forma (alvo)
            const sombra = document.createElement('div');
            sombra.className = 'captcha-sombra';
            sombra.style.width = '50px';
            sombra.style.height = '50px';
            sombra.style.backgroundColor = 'rgba(0,0,0,0.2)';
            sombra.style.position = 'absolute';
            
            // Posicionar sombra LONGE da forma original para dificultar
            sombra.style.left = `${Math.random() * 150 + 200}px`;
            sombra.style.top = `${Math.random() * 150 + 10}px`;
            sombra.style.zIndex = '1';
            
            if (formas[i] === 'circle') {
                sombra.style.borderRadius = '50%';
            } else if (formas[i] === 'triangle') {
                sombra.style.width = '0';
                sombra.style.height = '0';
                sombra.style.backgroundColor = 'transparent';
                sombra.style.borderLeft = '25px solid transparent';
                sombra.style.borderRight = '25px solid transparent';
                sombra.style.borderBottom = '50px solid rgba(0,0,0,0.2)';
            }
            
            captchaArea.appendChild(sombra);
            
            // Fazer a sombra se mover constantemente
            setInterval(() => {
                if (!captchaOverlay.classList.contains('hidden')) {
                    sombra.style.left = `${Math.random() * 400}px`;
                    sombra.style.top = `${Math.random() * 200}px`;
                }
            }, 2000);
            
            // Adicionar eventos de arrastar
            forma.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', 'dragging');
                forma.style.opacity = '0.5';
            });
            
            forma.addEventListener('dragend', () => {
                forma.style.opacity = '1';
            });
        }
        
        // Eventos de soltar para a área toda
        captchaArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        captchaArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const x = e.clientX - captchaArea.getBoundingClientRect().left;
            const y = e.clientY - captchaArea.getBoundingClientRect().top;
            
            const elementoArrastado = document.querySelector('.captcha-forma[style*="opacity: 0.5"]');
            if (elementoArrastado) {
                elementoArrastado.style.left = `${x - 25}px`;
                elementoArrastado.style.top = `${y - 25}px`;
                
                // Adiciona mensagem frustante de erro
                const mensagensErro = [
                    "Forma não reconhecida. Tente novamente.",
                    "Movimento inválido. Tente com mais precisão.",
                    "Padrão não compatível. Reposicione as formas.",
                    "Verificação falhou. Tente arrastar mais devagar.",
                    "Erro de autenticação. Ajuste a posição."
                ];
                
                captchaArea.innerHTML += `<p style="color:orange;font-size:12px;margin-top:5px;">${mensagensErro[Math.floor(Math.random() * mensagensErro.length)]}</p>`;
                
                // Verificar se foi colocado na sombra correta
                // Na verdade NUNCA vai verificar corretamente - sempre falha
                setTimeout(() => {
                    captchaReset.click();
                }, 1000);
            }
        });
    }
    
    function iniciarTempoLimite() {
        let tempoRestante = 30;
        captchaTimer.textContent = tempoRestante;
        
        const intervalo = setInterval(() => {
            tempoRestante--;
            captchaTimer.textContent = tempoRestante;
            
            // O tempo aleatoriamente acelera
            if (Math.random() < 0.1) {
                tempoRestante -= 2;
            }
            
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                falharCaptcha();
            }
        }, 1000);
        
        // Resetar o captcha ao clicar no botão
        captchaReset.addEventListener('click', () => {
            clearInterval(intervalo);
            gerarDesafioCaptcha();
            iniciarTempoLimite();
        });
    }
    
    function falharCaptcha() {
        // Sempre falha, nunca pode ser concluído
        captchaTimer.textContent = '0';
        captchaArea.innerHTML = '<p style="color:red;font-weight:bold;margin-top:50px;">Verificação falhou! Tempo esgotado.</p>';
        captchaArea.innerHTML += '<p style="color:orange;font-size:14px;margin-top:5px;">Nossa IA detectou comportamento suspeito.</p>';
        captchaArea.innerHTML += '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDUiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmVkIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMzAgMzAgNzAgNzAiIHN0cm9rZT0icmVkIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNNzAgMzAgMzAgNzAiIHN0cm9rZT0icmVkIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=" style="width:50px;height:50px;margin-top:10px;">';
        
        // Adicionar botão para fechar depois da falha
        setTimeout(() => {
            const botaoFechar = document.createElement('button');
            botaoFechar.innerText = 'Tentar Outra Forma de Verificação';
            botaoFechar.style.marginTop = '10px';
            botaoFechar.style.padding = '8px';
            botaoFechar.style.backgroundColor = '#7a7a7a';
            botaoFechar.style.color = 'white';
            botaoFechar.style.border = 'none';
            botaoFechar.style.borderRadius = '4px';
            botaoFechar.style.cursor = 'pointer';
            
            botaoFechar.addEventListener('click', () => {
                fecharCaptcha();
            });
            
            captchaArea.appendChild(botaoFechar);
            
        }, 1500);
        
        // Adicionar um atraso maior para aumentar a frustração
        setTimeout(() => {
            gerarDesafioCaptcha();
            iniciarTempoLimite();
        }, 5000); // Aumentando o atraso para dar tempo de clicar no botão
    }
    
    // Nova função para fechar o captcha
    function fecharCaptcha() {
        captchaOverlay.classList.add('hidden');
        
        // Mostrar mensagem de insegurança
        const mensagensInseguranca = [
            "Atenção: Sua sessão não está segura. Alguns recursos podem não funcionar corretamente.",
            "Aviso: Verificação incompleta. Sua navegação será monitorada por motivos de segurança.",
            "Alerta: Não foi possível verificar sua identidade. Há limitações na sua experiência.",
            "Aviso: Sistema de segurança contornado. Dados coletados para análise."
        ];
        
        // Pequeno aviso visual na tela
        const avisoDiv = document.createElement('div');
        avisoDiv.style.position = 'fixed';
        avisoDiv.style.bottom = '50px';
        avisoDiv.style.left = '50%';
        avisoDiv.style.transform = 'translateX(-50%)';
        avisoDiv.style.backgroundColor = 'rgba(255, 200, 0, 0.9)';
        avisoDiv.style.color = 'black';
        avisoDiv.style.padding = '10px 20px';
        avisoDiv.style.borderRadius = '5px';
        avisoDiv.style.zIndex = '999';
        avisoDiv.style.fontWeight = 'bold';
        avisoDiv.textContent = "⚠️ Verificação de segurança incompleta";
        document.body.appendChild(avisoDiv);
        
        setTimeout(() => {
            document.body.removeChild(avisoDiv);
            
            // Mostrar alerta após um atraso
            if (Math.random() < 0.4) {
                const mensagem = mensagensInseguranca[Math.floor(Math.random() * mensagensInseguranca.length)];
                alert(mensagem);
            }
        }, 3000);
    }
}

// Banner de cookies com botões invertidos
function inicializarCookiesBizarros() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');
    
    if (!cookieBanner) return;
    
    // Os botões têm nomes inversos ao comportamento
    acceptButton.addEventListener('click', () => {
        // Este é o botão "Rejeitar" mas aceita cookies
        cookieBanner.innerHTML = '<p>Você ACEITOU os cookies! Obrigado por concordar com o rastreamento.</p>';
        cookieBanner.style.backgroundColor = 'green';
        
        setTimeout(() => {
            cookieBanner.style.bottom = '-100px';
        }, 2000);
    });
    
    declineButton.addEventListener('click', () => {
        // Este é o botão "Aceitar" mas rejeita cookies
        cookieBanner.innerHTML = '<p>Você REJEITOU os cookies! Infelizmente você não poderá usar o site adequadamente.</p>';
        cookieBanner.style.backgroundColor = 'red';
        
        // Adicionar inúmeros pop-ups
        setTimeout(() => {
            const numPopups = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < numPopups; i++) {
                setTimeout(() => {
                    alert(`Funcionalidade limitada (${i+1}/${numPopups}): Você rejeitou os cookies necessários para o funcionamento do site.`);
                }, i * 1000);
            }
        }, 1000);
        
        // Adicionar "glitches" no site
        setTimeout(() => {
            document.querySelectorAll('input').forEach(input => {
                input.disabled = true;
                input.placeholder = "Desabilitado - cookies rejeitados";
            });
            
            cookieBanner.style.bottom = '-100px';
        }, (3 + 2) * 1000);
    });
    
    // Fazer o banner ficar "grudado" no cursor
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.05) {
            cookieBanner.style.bottom = `${window.innerHeight - e.clientY}px`;
            cookieBanner.style.opacity = '0.7';
            
            setTimeout(() => {
                cookieBanner.style.bottom = '0';
                cookieBanner.style.opacity = '1';
            }, 500);
        }
    });
}

// Inverter cores aleatoriamente
function inicializarInversaoCoresAleatorias() {
    setInterval(() => {
        if (Math.random() < 0.1) {
            document.body.style.filter = 'invert(100%)';
            
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 500);
        }
    }, 30000);
}

// Fazer texto desaparecer quando o usuário tenta lê-lo
function inicializarTextoDesaparecente() {
    const paragrafos = document.querySelectorAll('p:not(.subtitulo)');
    
    paragrafos.forEach(p => {
        p.addEventListener('mouseover', () => {
            // O texto desaparece ao passar o mouse
            if (Math.random() < 0.3) {
                const textoOriginal = p.textContent;
                p.textContent = textoOriginal.replace(/[a-zA-Z]/g, '░');
                
                setTimeout(() => {
                    p.textContent = textoOriginal;
                }, 2000);
            }
        });
    });
}

// Adicionar botões falsos que não fazem nada
function inicializarBotoesFalsos() {
    // Adicionar botões aleatórios na interface
    const main = document.querySelector('main');
    
    if (main) {
        const posicoesBotoes = [
            { top: '10%', left: '10%' },
            { top: '50%', left: '5%' },
            { top: '80%', left: '15%' },
            { top: '20%', left: '90%' },
            { top: '60%', left: '85%' }
        ];
        
        // Textos bizarros para os botões
        const textosBotoes = [
            'Clique Aqui!',
            'Ajuda',
            'Mais Opções',
            'Salvar',
            'Menu',
            'Ver Detalhes',
            'Ativar',
            'Configurar'
        ];
        
        // Adicionar 3 botões aleatórios
        for (let i = 0; i < 3; i++) {
            const botaoFalso = document.createElement('button');
            botaoFalso.textContent = textosBotoes[Math.floor(Math.random() * textosBotoes.length)];
            botaoFalso.style.position = 'fixed';
            botaoFalso.style.zIndex = '100';
            botaoFalso.style.top = posicoesBotoes[i].top;
            botaoFalso.style.left = posicoesBotoes[i].left;
            botaoFalso.style.padding = '8px 15px';
            botaoFalso.style.backgroundColor = '#0056b3';
            botaoFalso.style.color = 'white';
            botaoFalso.style.border = 'none';
            botaoFalso.style.borderRadius = '4px';
            botaoFalso.style.cursor = 'pointer';
            
            botaoFalso.addEventListener('click', () => {
                alert('Este botão não faz nada. Tente outros botões.');
                
                // Mover o botão para outra posição após clicado
                botaoFalso.style.top = `${Math.random() * 80 + 10}%`;
                botaoFalso.style.left = `${Math.random() * 80 + 10}%`;
            });
            
            document.body.appendChild(botaoFalso);
        }
    }
}

// Digitar texto errado nos inputs
function inicializarDigitacaoErrada() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const valor = e.target.value;
            
            // 20% de chance de errar a digitação
            if (valor.length > 0 && Math.random() < 0.2) {
                // Inserir um caractere aleatório
                const posicao = Math.floor(Math.random() * valor.length);
                const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                const charAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                
                const novoValor = valor.substring(0, posicao) + charAleatorio + valor.substring(posicao);
                
                // Atraso para que pareça natural
                setTimeout(() => {
                    e.target.value = novoValor;
                }, 100);
            }
        });
    });
}

// Inverter a ordem dos campos do formulário aleatoriamente
function inicializarFormularioReverso() {
    const form = document.getElementById('cadastro-form');
    
    if (form) {
        // 20% de chance de inverter o formulário ao carregá-lo
        if (Math.random() < 0.2) {
            const grupos = Array.from(form.querySelectorAll('.form-group'));
            form.innerHTML = '';
            
            // Inverter a ordem dos grupos
            grupos.reverse().forEach(grupo => {
                form.appendChild(grupo);
            });
        }
    }
}
