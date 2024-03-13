document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', function(){
        // Verifica as opções selecionadas 
        const chMinusculo = document.getElementById('lowercase').checked;
        const chMaiusculo = document.getElementById('uppercase').checked;
        const chNumeros = document.getElementById('numbers').checked;
        const chSimbolos = document.getElementById('symbols').checked;
        const chTamanho = parseInt(document.getElementById('length').value);
        
        // Verifica se o tamanho da senha está de acordo com o pedido
        if (chTamanho < 4 || chTamanho > 30) {
            alert('Selecione um número entre 4 e 30!');
            return;
        }
        
        // Verifica se foi selecionado pelo menos um
        if (!chMinusculo && !chMaiusculo && !chNumeros && !chSimbolos) {
            alert('Selecione pelo menos um tipo.');
            return;
        }
        
        // Gera a senha com base nas opções selecionadas
        let geradorSenha = gerarSenha(chMinusculo, chMaiusculo, chNumeros, chSimbolos, chTamanho);
        
        // Exibe a senha gerada
        document.getElementById('output').innerText = geradorSenha;
        
        document.getElementById('copy').addEventListener('click', function(){
            const senhaCopiar = document.getElementById('output').innerText;
            
            // Verifica se a senha a ser copiada está presente
            if (senhaCopiar) {
                // Copia a senha para a área de transferência do sistema
                navigator.clipboard.writeText(senhaCopiar)
                    .then(() => window.alert('Senha copiada!'))
                    .catch(err => console.error('Não é possível copiar!', err));
            } else {
                window.alert('Erro ao copiar');
            }
        
    });
    

        
        // Calcula a força da senha e exibe o resultado
        const forca = calcularForcaSenha(geradorSenha);
        mostrarForca(forca);
    });

    // Calcula a força da senha 
    function calcularForcaSenha(senha) {
        let forca = 0;
        
        // Verifica o tamanho da senha e atribui uma pontuação com base nisso
        if (senha.length >= 4 && senha.length <= 7) {
            forca += 10;
        } else if (senha.length > 7 && senha.length <= 10) {
            forca += 25;
        } else if (senha.length > 10) {
            forca += 40;
        }

        // Verifica se a senha contém letras minúsculas
        if (senha.match(/[a-z]+/)) {
            forca += 10;
        }

        // Verifica se a senha contém letras maiúsculas
        if (senha.match(/[A-Z]+/)) {
            forca += 20;
        }

        // Verifica se a senha contém caracteres especiais
        if (senha.match(/[@#$%&;*]+/)) {
            forca += 25;
        }

        // Verifica se a senha contém repetições de números
        if (senha.match(/([0-9])\1{1,}/)) {
            forca -= 25;
        }

        return forca;
    }

    // Exibi a força da senha e sua classificação
    function mostrarForca(forca) {
        const impForcaSenha = document.getElementById("impForcaSenha");
        impForcaSenha.innerHTML = "Força: " + forca;

        const erroSenhaForca = document.getElementById("erroSenhaForca");
        if (forca < 30) {
            erroSenhaForca.innerHTML = "<span style='color: #ff0000'>Fraca</span>";
        } else if (forca < 50) {
            erroSenhaForca.innerHTML = "<span style='color: #FFD700'>Média</span>";
        } else if (forca < 70) {
            erroSenhaForca.innerHTML = "<span style='color: #7FFF00'>Forte</span>";
        } else if (forca < 100) {
            erroSenhaForca.innerHTML = "<span style='color: #008000'>Excelente</span>";
        }
    }
    
    // Gera a senha com base nas opções selecionadas
    function gerarSenha(chMinusculo, chMaiusculo, chNumeros, chSimbolos, chTamanho){
        let senha = '';
        let caracteresPermitidos = '';
        
        if (chMinusculo) caracteresPermitidos += 'abcdefghijklmnopqrstuvwxyz';
        if (chMaiusculo) caracteresPermitidos += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chNumeros) caracteresPermitidos += '0123456789';
        if (chSimbolos) caracteresPermitidos += '!@#$%¨&*_-.:;';
        
        for (let i = 0; i < chTamanho; i++) {
            senha += caracteresPermitidos.charAt(Math.floor(Math.random() * caracteresPermitidos.length));
        }
        
        return senha;
    }
});

