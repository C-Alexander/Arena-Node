var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Arena;
(function (Arena) {
    var Singleplayer = (function (_super) {
        __extends(Singleplayer, _super);
        function Singleplayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.players = [];
            return _this;
        }
        Singleplayer.prototype.preload = function () {
            console.log('preloadin');
            this.game.load.image('logo', 'images/fontys.jpg');
            this.game.load.image('ship', ' images/i/Ship/Pirate Ace.jpg');
        };
        Singleplayer.prototype.create = function () {
            this.game.world.setBounds(-700, -500, 3000, 2000);
            var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
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
            this.socket = io.connect();
            this.socket.emit('joined', {
                x: this.playerShip.x,
                y: this.playerShip.y,
                rotation: this.playerShip.rotation
            });
            this.socket.on('all_players', this.allShips.bind(this));
            this.socket.on('joining_player', this.addShip.bind(this));
            this.socket.on('newLocation', this.moveShip.bind(this));
            this.game.plugins.add(controllermanager);
        };
        Singleplayer.prototype.addShip = function (e) {
            console.log(e);
            console.log('hiiii');
            var newShip = this.game.add.sprite(e.ship.x, e.ship.y, 'ship');
            newShip.rotation = e.ship.rotation;
            this.players[e.id] = newShip;
        };
        Singleplayer.prototype.moveShip = function (e) {
            console.log(e);
            this.players[e.id].x = e.ship.x;
            this.players[e.id].y = e.ship.y;
            this.players[e.id].rotation = e.ship.rotation;
        };
        Singleplayer.prototype.allShips = function (e) {
            this.players = [];
            console.log('reached');
            console.log(e);
            console.log(e.players);
            for (var key in e.players) {
                this.addShip({ id: key, ship: e.players[key] });
            }
        };
        Singleplayer.prototype.update = function () {
            // let cm = new controllermanager(null, null);
            console.log(this.game.controllers.getControllers());
            console.log(this.game.controllers.getControllerbyId('Wireless Gamepad (Vendor: 057e Product: 2009)'));
            this.playerShip.body.setZeroRotation();
            var stopping = true;
            if (this.keys.up.isDown || this.arrowKeys.up.isDown) {
                console.log('down');
                this.playerShip.body.thrust(300);
                stopping = false;
            }
            if (this.keys.down.isDown || this.arrowKeys.down.isDown) {
                console.log('other down');
                this.playerShip.body.reverse(150);
                stopping = false;
            }
            if (this.keys.left.isDown || this.arrowKeys.left.isDown) {
                console.log('left');
                this.playerShip.body.rotateLeft(50);
            }
            if (this.keys.right.isDown || this.arrowKeys.right.isDown) {
                console.log('other left');
                this.playerShip.body.rotateRight(50);
                (stopping) ? this.playerShip.body.damping = 0.9 : this.playerShip.body.damping = 0.1;
                this.socket.emit('location', {
                    x: this.playerShip.x,
                    y: this.playerShip.y,
                    rotation: this.playerShip.rotation
                });
            }
        };
        return Singleplayer;
    }(Phaser.State));
    Arena.Singleplayer = Singleplayer;
})(Arena || (Arena = {}));
