const config = {
    title: "HackCovid19",
    scale: {
        mode: Phaser.Scale.FIT,
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
            debug: false
        }
    },

}

var gameOver = false;
var Puntos = 0;
var PuntosTexto;



var game = new Phaser.Game(config);

function preload() {
    this.load.image('particulas', 'http://labs.phaser.io/assets/particles/green-orb.png');
    //this.load.audio('sonido', './Assets/audio.mp3');
    this.load.setPath('./Assets/');
    this.load.image([
        'Alcohol',
        'Esfera',
        //'Fondo',
        'Plataforma',
    ]);
    this.load.spritesheet('Kaze', 'kaze.png', { frameWidth: 32.5, frameHeight: 48 });
    Plataforma = this.physics.add.staticGroup();

};
function create() {
    //this.add.image(400, 300, 'Fondo').setScale(1, 1.15);
    Plataforma.create(400, 590, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(400, 0, 'Plataforma').setScale(2.1, 1).refreshBody();
    Plataforma.create(700, 410, 'Plataforma').setScale(0.3, 1).refreshBody();
    Plataforma.create(400, 300, 'Plataforma').setScale(0.2, 1).refreshBody();
    Plataforma.create(800, 150, 'Plataforma');
    Plataforma.create(-50, 300, 'Plataforma');
    Plataforma.create(0, 450, 'Plataforma');
    Kaze = this.physics.add.sprite(230, 100, 'Kaze');
    Kaze.setCollideWorldBounds(true);
    Kaze.setBounce(0.2);

    this.anims.create({
        key: 'Izquierda',
        frames: this.anims.generateFrameNumbers('Kaze', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Derecha',
        frames: this.anims.generateFrameNumbers('Kaze', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Quieto',
        frames: [{ key: 'Kaze', frame: 4 }],
        frameRate: 20
    });

    this.physics.add.collider(Kaze, Plataforma);
    Plataforma.getChildren()[0].setOffset(0, 10);
    cursors = this.input.keyboard.createCursorKeys();

    coins = this.physics.add.group({
        key: 'Alcohol',
        repeat: 5,
        setXY: { x: 12, y: 50, stepX: 140 }
    });
    coins.children.iterate(function (child) {
        child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(Plataforma, coins);

    this.physics.add.overlap(Kaze, coins, esconder, null, this);

    PuntosTexto = this.add.text(300, 560, 'Puntos: 0', { fontSize: '40px', fill: 'purple' });
    enemigos = this.physics.add.group();
    this.physics.add.collider(enemigos, Plataforma);
    this.physics.add.collider(Kaze, enemigos, choque, null, this);



};

function choque(Kaze, Esferas) {
    this.physics.pause();
    Kaze.anims.play('Quieto');
    gameOver = true;
}

function update(time, delta) {
    if (gameOver) {
        return;
    }


    if (cursors.left.isDown) {
        Kaze.setVelocityX(-200);
        Kaze.anims.play('Izquierda', true);
    }
    else if (cursors.right.isDown) {
        Kaze.setVelocityX(200);
        Kaze.anims.play('Derecha', true);
    }
    else {
        Kaze.setVelocityX(0);
        Kaze.anims.play('Quieto');
    }

    if (cursors.up.isDown && Kaze.body.touching.down) {
        Kaze.setVelocityY(-310);
    }



};

function esconder(Kaze, Coin) {

    Coin.disableBody(true, true);

    Puntos += 10;
    PuntosTexto.setText('Puntos:' + Puntos);
    if (coins.countActive(true) === 0) {

        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 50, true, true)

        });

        var x = (Kaze.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        Esferas = enemigos.create(x, 16, 'Esfera');
        Esferas.setBounce(1);
        Esferas.setCollideWorldBounds(true);
        Esferas.setVelocity(Phaser.Math.Between(-100, 100), 5);


    }


}

