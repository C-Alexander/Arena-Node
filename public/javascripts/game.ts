/// <reference path="phaser/typescript/phaser.d.ts" />

module Arena {
    export class Game extends Phaser.Game {

        constructor() {
            console.log('got here');
            super(800, 600, Phaser.AUTO, 'content');
            this.state.add('Singleplayer', Singleplayer, false);
            this.state.start('Singleplayer');
        }
    }
    window.onload = () => {
        var game = new Arena.Game()
    }
}