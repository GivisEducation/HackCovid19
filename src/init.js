const config = {
    title: "Hi humans",
    scale: {
        mode: Phaser.Scale.Fit,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        type: Phaser.AUTO,
        parent: "contenedor",
        width: 800,
        height: 600,
    },

    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug:false
        }
    }

};

var game = new Phaser.Game(config);

function preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('fondo', 'assets/skies/gradient1.png');
    this.load.image('planeta', 'assets/sprites/ufo.png');
    this.load.image('particula', 'assets/particles/yellow.png');
    this.load.image('raqueta', 'assets/raqueta.png');
    this.load.audio('sonido', 'assets/audio.mp3');
};
function create() {
    console.log(this.add.image(400, 300, 'fondo'));
    particulas = this.add.particles('particula');
    var emitter = particulas.createEmitter({
        speed: 50,
        scale: { start: 2, end: 0 },
        blendMode: 'ADD'
    });
    Mundo = this.physics.add.image(600, 550, 'planeta');
    console.log(Mundo);
    Mundo.setAlpha(0.6);
    Mundo.setAngle(45);
    Mundo.setScale(0.7);
    Mundo.setFlipX(true);
    Mundo.setOrigin(0.5, 0.5);
    Mundo.setColliderWorldBounds(true);
    Mundo.setBounce(1);
    setVelocity(300, 400);
    emitter.startFollow(Mundo);
    this.add.text(300, 500, 'Hi humans');

};
function update(time, delta) {
    Mundo.angle += 5;
    if (keyD.isDown) {
        console.log('La tecla W está presionada');
    } else if (keyD.isUp)
        console.log('La tecla W , no está presionada')
};
raqueta = this.add.image(400, 520, 'raqueta').setInteractive();
const eventos = Phaser.Input.Events;
console.log(eventos);
const KeyCodes = Phaser.Input.Keyboard.keycodes;
console.log(KeyCodes);
keyD = this.input.keyboard.addKey(KeyCodes.W);
keyD.on('down', () => {
    console.log('soy la letra W');
});