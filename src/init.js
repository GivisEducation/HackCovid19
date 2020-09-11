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
var game = new Phaser.Game(config);


function preload() {
    this.load.setPath('./Assets/');
    this.load.image([
        'Lucky',
        'Water',
        'Fond',
        'Plataforma',
    ]);
    this.load.spritesheet('Kaze', 'Kaze.png', { frameWidth: 32.5, frameHeight: 48 });
   
};
function create() {
    this.add.image(400, 450, 'Fond').setScale(1, 2.5);
    plataforma = this.physics.add.staticGroup();
    plataforma.create(400, 590, 'Plataforma').setScale(2.1, 1).refreshBody();
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

    this.physics.add.collider(Kaze, plataforma);
    plataforma.getChildren()[0].setOffset(0, 10);
    cursors = this.input.keyboard.createCursorKeys();

    plantita = this.physics.add.group({
        key: 'Lucky',
        repeat: 5,
        setXY: { x: 12, y: 50, stepX: 140 }
    });
    plantita.children.iterate(function (child) {
        child.setBounce(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(plataforma, plantita);

    this.physics.add.overlap(Kaze, plantita, esconder, null, this);

    PuntosTexto = this.add.text(300, 560, 'Puntos: 0', { fontSize: '40px', fill: 'red' });
    enemigos = this.physics.add.group();
    this.physics.add.collider(enemigos, plataforma);
    this.physics.add.collider(Kaze, enemigos, choque, null, this);

    function esconder(Kaze, plantita) {

        plantita.disableBody(true, true);

        Puntos += 10;
        PuntosTexto.setText('Puntos:' + Puntos);
        if (plantita.countActive(true) === 0) {

            plantita.children.iterate(function (child) {

                child.enableBody(true, child.x, 50, true, true)

            });

            var x = (Kaze.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            Water = enemigos.create(x, 16, 'Water');
            Water.setBounce(1);
            Water.setCollideWorldBounds(true);
            Water.setVelocity(Phaser.Math.Between(-100, 100), 5);

        }


    }

    function choque(Kaze, Water) {
        this.physics.pause();
        Kaze.anims.play('Quieto');
        gameOver = true;
    }




};
function update() {
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



}