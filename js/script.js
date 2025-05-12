// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento del sobre
    const envelope = document.getElementById('envelope');
    let audioPlaying = false;
    let openSound = new Audio('audio.mp3');
    
    // Evento para detectar cuando termina el audio
    openSound.addEventListener('ended', function() {
        audioPlaying = false;
    });
    
    // Añadir evento de clic al sobre
    envelope.addEventListener('click', function() {
        // Alternar la clase 'open' para abrir/cerrar el sobre
        if (!this.classList.contains('open')) {
            this.classList.add('open');
            
            // Reproducir audio solo si no está sonando
            if (!audioPlaying) {
                try {
                    audioPlaying = true;
                    openSound.currentTime = 0; // Reiniciar el audio al principio
                    openSound.play();
                } catch (e) {
                    console.log('No se pudo reproducir el audio');
                    audioPlaying = false;
                }
            }
            
            // Resetear el scroll al abrir
            const cardContent = envelope.querySelector('.card-content');
            setTimeout(() => {
                cardContent.scrollTop = 0;
            }, 100);
        } else {
            // Cerrar la carta si ya está abierta
            this.classList.remove('open');
        }
    });

    // Iniciar el sistema de corazones flotantes
    initFloatingHearts();
});

// Función para crear corazones emoji flotantes
function createHeart() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartEmojis = ['❤️', '💝', '💖', '💗', '💓']; // Variedad de emojis de corazón
    
    const heart = document.createElement('div');
    heart.className = 'emoji-heart';
    
    // Seleccionar un emoji aleatorio
    const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.textContent = randomEmoji;
    
    // Tamaño aleatorio entre 20px y 40px
    const size = Math.random() * 20 + 20;
    heart.style.fontSize = `${size}px`;
    
    // Posición horizontal aleatoria
    heart.style.left = `${Math.random() * 100}%`;
    
    heartsContainer.appendChild(heart);
    
    // Eliminar el corazón después de que termine la animación
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function initFloatingHearts() {
    // Crear corazones iniciales
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(), Math.random() * 3000);
    }
    
    // Crear nuevos corazones periódicamente
    setInterval(() => {
        createHeart();
    }, 1200); // Crear un nuevo corazón cada 400ms
}