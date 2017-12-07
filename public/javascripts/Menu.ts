module Arena {

    import Sprite = Phaser.Sprite;

    export class Menu extends Phaser.State {
        game: Phaser.Game;

        preload() {
            this.game.load.image('logo', 'images/fontys.jpg');
        }

        create() {
            const input = document.createElement('input');
            input.type = "text";
            input.className = "inputUsername";
            const container = document.getElementById('game');
            container.appendChild(input);
        }

    }
}