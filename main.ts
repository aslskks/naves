let nave = game.createSprite(2, 4);
let disparo: game.LedSprite = null;  // Declarar disparo como null para iniciar
let enemigo: game.LedSprite = game.createSprite(randint(0, 4), 0);
let sounds_over = 0;
// Reanudar el juego cuando se toca el logo


// Mover la nave a la izquierda con el botón A
input.onButtonPressed(Button.A, function () {
    nave.move(-1);
});

// Disparar con el botón A+B
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.InBackground);
    if (disparo) {
        disparo.delete();  // Eliminar el disparo anterior si existe
    }
    disparo = game.createSprite(nave.get(LedSpriteProperty.X), nave.get(LedSpriteProperty.Y));
    for (let i = 0; i < 5; i++) {
        disparo.change(LedSpriteProperty.Y, -1);
        basic.pause(100);
    }
});

// Mover la nave a la derecha con el botón B
input.onButtonPressed(Button.B, function () {
    nave.move(1);
});

// Pausar el juego al agitar el micro:bit
input.onShake(function () {
    game.pause();
});

input.onShake( function() {
    if (game.isGameOver) {
            control.reset()
    }

})
input.onButtonPressed(Button.AB,function() {
    game.resume()
})

// Eliminar el disparo cuando llegue al borde superior
basic.forever(function () {
    if (disparo && disparo.get(LedSpriteProperty.Y) == 0) {
        disparo.delete();
    }
    if (sounds_over == 0 && game.isGameOver()) {
        music.stopAllSounds()
        sounds_over = 1
    }
});

// Crear un nuevo enemigo si el anterior ha sido eliminado
basic.forever(function () {
    basic.pause(randint(1000, 3000));
    if (!enemigo || enemigo.isDeleted()) {
        enemigo = game.createSprite(randint(0, 4), 0);
    }
});

// Mover al enemigo hacia abajo cada segundo
basic.forever(function () {
    basic.pause(1000);
    if (enemigo && !enemigo.isDeleted()) {
        enemigo.change(LedSpriteProperty.Y, 1);

    }
});

// Comprobaciones de colisiones y condiciones de game over
basic.forever(function () {
    if (disparo && enemigo && disparo.isTouching(enemigo)) {
        enemigo.delete();
        disparo.delete();
        game.addScore(1);
    } else if (enemigo && nave && enemigo.isTouching(nave)) {
        game.gameOver();
    } else if (enemigo && enemigo.get(LedSpriteProperty.Y) == 4) {
        game.gameOver();
    }
});

