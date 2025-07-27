/* = Página de Carregamento (Preloader)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Garante que o HTML esteja carregado antes de tentar esconder o preloader
    const preloader = document.getElementById('preloader');

    if (preloader) {
        // Usa o evento 'load' do window para garantir que TODOS os recursos (imagens, CSS, etc.) foram carregados
        window.addEventListener('load', function () {
            // Adiciona a classe 'hidden' para ativar a transição CSS de opacidade
            preloader.classList.add('hidden');

            // Remove o preloader do DOM após a transição terminar para liberar memória
            preloader.addEventListener('transitionend', function () {
                preloader.remove();
            });
        });
    }
});



/* = Navegação Suave (Smooth Scrolling)
   ========================================================================== */

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Otimização: Apenas rola se o link for uma âncora interna
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});



/* = Pop-up de Política de Privacidade (LGPD)
   ========================================================================== */

const openPrivacyPopupButton = document.getElementById('openPrivacyPopup');
const privacyPopupOverlay = document.getElementById('privacyPopup');
const closePopupButtons = document.querySelectorAll('.close-popup-btn'); // Seleciona ambos os botões de fechar

// Função para abrir o pop-up
function openPopup() {
    if (privacyPopupOverlay) {
        privacyPopupOverlay.style.display = 'flex'; // Torna visível e flex
        // Força o reflow para garantir que a transição de opacidade funcione
        privacyPopupOverlay.offsetWidth;
        privacyPopupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita rolagem do corpo da página
    }
}

// Função para fechar o pop-up
function closePopup() {
    if (privacyPopupOverlay) {
        privacyPopupOverlay.classList.remove('active');
        // Espera a transição de opacidade terminar antes de esconder
        privacyPopupOverlay.addEventListener('transitionend', function handler() {
            privacyPopupOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restaura a rolagem do corpo da página
            privacyPopupOverlay.removeEventListener('transitionend', handler); // Remove o listener para evitar múltiplos disparos
        }, { once: true }); // Executa o listener apenas uma vez
    }
}

// Event Listener para abrir o pop-up
if (openPrivacyPopupButton) {
    openPrivacyPopupButton.addEventListener('click', openPopup);
}

// Event Listeners para fechar o pop-up (ambos os botões e clique fora)
if (privacyPopupOverlay) {
    // Para os botões de fechar (X e "Fechar" embaixo)
    closePopupButtons.forEach(button => {
        button.addEventListener('click', closePopup);
    });

    // Para fechar clicando na área escura (overlay)
    privacyPopupOverlay.addEventListener('click', function (event) {
        // Se o clique foi exatamente no overlay e não no conteúdo do popup
        if (event.target === privacyPopupOverlay) {
            closePopup();
        }
    });
}