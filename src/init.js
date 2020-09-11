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
    this.load.image('particula', 'assets/particles/yellow.png');
};
function create() {
    console.log(this.add.image(400, 300, 'fondo'));
    particulas = this.add.particles('particula');
    var emitter = particulas.createEmitter({
        speed: 50,
        scale: { start: 2, end: 0 },
        blendMode: 'ADD'
    });
   
    this.add.text(300, 500, 'Hi humans');

};
function update(time, delta) {
    //if (keyD.isDown) {
    //    console.log('La tecla W está presionada');
    //} else if (keyD.isUp)
    //    console.log('La tecla W , no está presionada')


    //const eventos = Phaser.Input.Events;
    //console.log(eventos);
    //const KeyCodes = Phaser.Input.Keyboard.keycodes;
    //console.log(KeyCodes);
    //keyD = this.input.keyboard.addKey(KeyCodes.W);
    //keyD.on('down', () => {
    //    console.log('soy la letra W');
    //});
};
