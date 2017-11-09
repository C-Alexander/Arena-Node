module Arena {

    import Sprite = Phaser.Sprite;
    export class Singleplayer extends Phaser.State {
        playerShip;
        game: Phaser.Game;
        keyboard: Phaser.Keyboard;
        keys;
        arrowKeys;

        preload() {
            console.log('preloadin');
            this.game.load.image('logo', 'images/fontys.jpg');
            this.game.load.image('ship', ' images/i/Ship/Pirate Ace.jpg')
        }

        create() {

            this.game.world.setBounds(-700, -500, 3000, 2000);
            let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
            this.playerShip = this.game.add.sprite(logo.x, logo.y, 'ship');

            this.keyboard = this.game.input.keyboard;
            this.keyboard.addKeyCapture([Phaser.KeyCode.W, Phaser.KeyCode.UP, Phaser.KeyCode.S, Phaser.KeyCode.DOWN, Phaser.KeyCode.A, Phaser.KeyCode.LEFT, Phaser.KeyCode.D, Phaser.KeyCode.RIGHT]);

            this.keys = this.keyboard.addKeys({
                'up': Phaser.KeyCode.W,
                'down': Phaser.KeyCode.S,
                'left': Phaser.KeyCode.A,
                'right': Phaser.KeyCode.D
            });
            this.arrowKeys = this.keyboard.createCursorKeys();

            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.restitution = 1.2;
            this.game.physics.p2.enable(this.playerShip);
            this.playerShip.body.damping = 0.1;

            this.game.camera.follow(this.playerShip);
        }

        update() {
            this.playerShip.body.setZeroRotation();
            let stopping = true;

            if (this.keys.up.isDown || this.arrowKeys.up.isDown) {
                console.log('down');
                this.playerShip.body.thrust(300);
                stopping = false;

            }
            if (this.keys.down.isDown || this.arrowKeys.down.isDown) {
                console.log('other down');
                this.playerShip.body.reverse(150);
                stopping = false
            }
            if (this.keys.left.isDown || this.arrowKeys.left.isDown) {
                console.log('left');
                this.playerShip.body.rotateLeft(50);
            }
            if (this.keys.right.isDown || this.arrowKeys.right.isDown) {
                console.log('other left');
                this.playerShip.body.rotateRight(50);
            }
            (stopping) ? this.playerShip.body.damping = 0.9 : this.playerShip.body.damping = 0.1;
        }
    }
}