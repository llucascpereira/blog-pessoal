/* = Carrossel de Portfólio
   ========================================================================== */

const portfolioCarousel = document.querySelector('.portfolio__carousel');
const slidesWrapper = document.querySelector('.portfolio__slides-wrapper');
const slides = document.querySelectorAll('.portfolio__slide');
const prevButton = document.querySelector('.portfolio__slides-prev');
const nextButton = document.querySelector('.portfolio__slides-next');

const itemsPerView = 3; // Quantos itens serão exibidos por vez
let currentIndex = 0; // O índice do primeiro slide visível

// Função para verificar se o carrossel deve estar ativo
function checkCarouselActive() {
    // A condição é que a tela seja MAIOR que 820px.
    // Usamos (min-width: 821px) para ser consistente com a media query de (max-width: 820px)
    return window.matchMedia('(min-width: 821px)').matches;
}

// Verifica se todos os elementos do carrossel existem antes de inicializar
if (portfolioCarousel && slidesWrapper && slides.length > 0 && prevButton && nextButton) {

    // Função para atualizar a posição do carrossel
    function updateCarouselPosition() {
        if (!checkCarouselActive()) {
            // Se o carrossel não deve estar ativo, reseta a posição e desativa botões
            slidesWrapper.style.transform = `translateX(0px)`;
            if (prevButton) prevButton.disabled = true;
            if (nextButton) nextButton.disabled = true;
            return; // Sai da função se o carrossel não estiver ativo
        }

        // Calcula a largura de um slide, incluindo suas margens (dobro da margem lateral)
        // Certifique-se que slides[0] existe antes de tentar acessar offsetWidth
        if (slides.length === 0) {
            // Se não houver slides, desabilita os botões e sai.
            if (prevButton) prevButton.disabled = true;
            if (nextButton) nextButton.disabled = true;
            return;
        }

        const slideStyle = getComputedStyle(slides[0]);
        const slideMarginLeft = parseFloat(slideStyle.marginLeft) || 0;
        const slideMarginRight = parseFloat(slideStyle.marginRight) || 0;
        // Calcula a largura total de um slide: largura real + margem esquerda + margem direita
        const slideTotalWidth = slides[0].offsetWidth + slideMarginLeft + slideMarginRight;

        const offset = -currentIndex * slideTotalWidth;
        slidesWrapper.style.transform = `translateX(${offset}px)`;

        // Desabilita botões se estiver no início/fim
        prevButton.disabled = currentIndex === 0;
        // Ajuste para garantir que o último conjunto de 3 itens seja o limite
        nextButton.disabled = currentIndex >= (slides.length - itemsPerView);
    }

    // Função para avançar para o próximo slide (um por vez)
    function nextSlide() {
        if (!checkCarouselActive()) return; // Não faz nada se o carrossel não estiver ativo
        if (currentIndex < (slides.length - itemsPerView)) {
            currentIndex++;
            updateCarouselPosition();
        }
    }

    // Função para retroceder para o slide anterior (um por vez)
    function prevSlide() {
        if (!checkCarouselActive()) return; // Não faz nada se o carrossel não estiver ativo
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    }

    // Verifica se os elementos do carrossel existem antes de adicionar listeners
    if (portfolioCarousel && slidesWrapper && slides.length > 0 && prevButton && nextButton) {
        // Adiciona event listeners aos botões apenas se o carrossel estiver ativo inicialmente
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Opcional: Auto-play do carrossel
        /*
        let autoPlayInterval;
        function startAutoPlay() {
            if (checkCarouselActive()) { // Inicia auto-play apenas se o carrossel deve estar ativo
                autoPlayInterval = setInterval(nextSlide, 3000);
            }
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        startAutoPlay();
        portfolioCarousel.addEventListener('mouseenter', stopAutoPlay);
        portfolioCarousel.addEventListener('mouseleave', startAutoPlay);
        */

        // Adiciona evento para recalcular a posição em caso de redimensionamento da janela
        // E reativa/desativa a lógica do carrossel
        window.addEventListener('resize', () => {
            // Quando a tela redimensiona, reavalia se o carrossel deve estar ativo
            if (!checkCarouselActive()) {
                // Se for para o modo grid, reseta o currentIndex e o transform
                currentIndex = 0;
                slidesWrapper.style.transform = `translateX(0px)`;
                if (prevButton) prevButton.disabled = true;
                if (nextButton) nextButton.disabled = true;
            } else {
                // Se voltou para o modo carrossel, atualiza a posição e ativa botões
                updateCarouselPosition();
            }
        });

        // Inicializa o carrossel exibindo o primeiro conjunto de slides
        updateCarouselPosition();

    }
    // Adiciona evento para recalcular a posição em caso de redimensionamento da janela
    window.addEventListener('resize', updateCarouselPosition);

}