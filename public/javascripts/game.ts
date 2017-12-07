/// <reference path="phaser/typescript/phaser.d.ts" />

module Arena {
    export class Game extends Phaser.Game {

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
            this.state.add('Singleplayer', Singleplayer, false);
            this.state.add('Menu', Menu, false);
            this.state.start('Menu');
        }
    }
    window.onload = () => {
        var game = new Arena.Game()
    }
}