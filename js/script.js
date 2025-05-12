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
    
    // Verificar cuántos corazones hay actualmente
    const currentHearts = document.querySelectorAll('.emoji-heart').length;
    if (currentHearts >= 12) return; // Limitar el número máximo de corazones
    
    const heart = document.createElement('div');
    heart.className = 'emoji-heart';
    
    // Seleccionar un emoji aleatorio
    const randomEmoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.textContent = randomEmoji;
    
    // Tamaño más variable (entre 15px y 35px)
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = `${size}px`;
    
    // Posición horizontal aleatoria con margen
    heart.style.left = `${Math.random() * 80 + 10}%`; // 10% - 90% del ancho
    
    // Ajustar la duración de la animación aleatoriamente
    heart.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4-7 segundos
    
    heartsContainer.appendChild(heart);
    
    // Eliminar el corazón después de que termine la animación
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

function initFloatingHearts() {
    // Crear corazones iniciales de manera más espaciada
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createHeart(), Math.random() * 8000);
    }
    
    // Crear nuevos corazones con intervalos aleatorios
    let nextHeartTime = 3000;
    
    function scheduleNextHeart() {
        setTimeout(() => {
            createHeart();
            // Calcular próximo intervalo aleatorio entre 2 y 5 segundos
            nextHeartTime = Math.random() * 3000 + 2000;
            scheduleNextHeart();
        }, nextHeartTime);
    }
    
    scheduleNextHeart();
}