module Arena {

    import Sprite = Phaser.Sprite;

    export class Menu extends Phaser.State {
        game: Phaser.Game;

        preload() {
            this.game.load.image('logo', 'images/fontys.jpg');
        }

        create() {
            const container = document.getElementById('game');
            const input = document.createElement('form');
            input.className = "form-inline inputUsername";
            const name = document.createElement('input');
            name.type = "text";
            name.className = "form-control";
            input.appendChild(name);
            const submit = document.createElement('button');
            submit.type = "submit";
            submit.className = "btn btn-success";
            submit.innerHTML = "Play";
            input.appendChild(submit);
            container.appendChild(input);
            input.onsubmit = function(event) {
                event.preventDefault();
                input.hidden = true;
                this.state.start('Singleplayer');
            }.bind(this);
        }

    }
}