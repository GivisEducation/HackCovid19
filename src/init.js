
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
            gravity: { y: 300 },
            debug:false
        }
    }

};

var game = new Phaser.Game(config);

function preload() {
    //this.load.setBaseURL('http://labs.phaser.io');

    //this.load.image('fondo', 'assets/skies/gradient1.png');
    //this.load.image('particula', 'assets/particles/yellow.png');

    this.load.spritesheet('Humano', 'Humano.png', { frameWidth: 32.5, frameHeight: 48 });

};
function create() {
    this.load.setPath('./Assets/');
    this.load.image([
        'water',
        'lucky',
        'Plataforma',
        'fondo2',
    ]);
    this.add.image(400, 300, 'fondo2').setScale(1, 1.15);


    console.log(this.add.image(400, 300, 'fondo'));
    Plataforma = this.physics.add.staticGroup();
    Plataforma.create(400, 590, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(400, 0, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(700, 410, 'Plataforma').setScale(0.3, 1).refreshBody();
    Plataforma.create(400, 300, 'Plataforma').setScale(0.2, 1).refreshBody();
    Plataforma.create(800, 150, 'Plataforma');
    Plataforma.create(-50, 300, 'Plataforma');
    Plataforma.create(0, 450, 'Plataforma');
    Plataforma.getChildren()[0].setOffset(0, 10);
    Humano = this.physics.add.sprite(230, 100, 'Humano');
    Humano.setCollideWorldBounds(true);
    Humano.setBounce(0.2);
    this.physics.add.collider(Humano, Plataforma);

    //particulas = this.add.particles('particula');
    //var emitter = particulas.createEmitter({
    //    speed: 50,
    //    scale: { start: 2, end: 0 },
    //    blendMode: 'ADD'
    //});
   
    this.add.text(300, 500, 'Please');
    this.anims.create({
        key: 'Izquierda',
        frames: this.anims.generateFrameNumbers('Humano', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Derecha',
        frames: this.anims.generateFrameNumbers('Humano', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Quieto',
        frames: [{ key: 'Humano', frame: 4 }],
        frameRate: 20
    });

};
function update(time, delta) {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        Humano.setVelocityX(-200);
        Humano.anims.play('Izquierda', true);
    }
    else if (cursors.right.isDown) {
        Humano.setVelocityX(200);
        Humano.anims.play('Derecha', true);
    }
    else {
        Humano.setVelocityX(0);
        Humano.anims.play('Quieto');
    }

    if (cursors.up.isDown && Humano.body.touching.down) {
        Humano.setVelocityY(-310);
    }
};
