interface controllercallbacks {
    onAnyUpButton?: Function;
    onAnalogUpButton?: Function;
    onLeftAxisUp?: Function;
    onRightAxisUp?: Function;

    onAnyDownButton?: Function;
    onAnalogDownButton?: Function;
    onLeftAxisDown?: Function;
    onRightAxisDown?: Function;

    onAnyLeftButton?: Function;
    onAnalogLeftButton?: Function;
    onLeftAxisLeft?: Function;
    onRightAxisLeft?: Function;

    onAnyRightButton?: Function;
    onAnalogRightButton?: Function;
    onLeftAxisRight?: Function;
    onRightAxisRight?: Function;

    onMiscButtonPress?:Function;
}

interface mapping {
    name: string;
    id: string;
    buttonRepresentations: [{ custom: number, normal: number }];
    axeRepresentations: [{ custom: number, normal: number }];
}

class controllermanager {
    game: Phaser.Game;
    parent: any;

    hasPreUpdate: boolean = true;
    hasPostRender: boolean = false;
    hasUpdate: boolean = false;
    hasPostUpdate: boolean = false;
    hasRender: boolean = false;

    visible: boolean = false;
    active: boolean = true;

    controllers: { pad: Gamepad, map: mapping }[] = [];
    mappings: mapping[] = [];

    callbacks: controllercallbacks;
    private keyboard: Phaser.Keyboard;
    private keys: any;
    private arrowKeys: Phaser.CursorKeys;

    constructor(game: Phaser.Game, parent: any) {
        this.game = game;
        this.parent = parent;

        this.keyboard = this.game.input.keyboard;
        this.keyboard.addKeyCapture([Phaser.KeyCode.W, Phaser.KeyCode.UP, Phaser.KeyCode.S, Phaser.KeyCode.DOWN, Phaser.KeyCode.A, Phaser.KeyCode.LEFT, Phaser.KeyCode.D, Phaser.KeyCode.RIGHT]);

        this.keys = this.keyboard.addKeys({
            'up': Phaser.KeyCode.W,
            'down': Phaser.KeyCode.S,
            'left': Phaser.KeyCode.A,
            'right': Phaser.KeyCode.D
        });
        this.arrowKeys = this.keyboard.createCursorKeys();
        this.addDefaultMappings();
        game.controllers = this;
        window.addEventListener("gamepadconnected", this.addGamepad);
        window.addEventListener("gamepaddisconnected", this.removeGamepad);

    }

    getControllers() {
        return navigator.getGamepads();
    }

    getControllerbyId(id) {
        for (let i = 0; i < this.getControllers().length; i++) {
            if (this.getControllers()[i].id == id) {
                return this.getControllers()[i];
            }
        }
    }

    setCallbacks(callbacks: controllercallbacks) {
        this.callbacks = callbacks;
    }

    addCallbacks(callbacks: controllercallbacks) {
        Object.keys(callbacks).forEach(key => {
            this.callbacks[key] = callbacks[key];
        })
    }

    addMapping(mapping: mapping) {
        this.mappings.push(mapping);

        this.controllers.forEach(controller => {
            if (controller.pad.id == mapping.id) {
                controller.map = mapping;
            }
        })
    }

    preUpdate() {
        this.controllers.forEach(controller => {
            for (let i = 0; i < controller.pad.buttons.length; i++) {
                if (controller.pad.buttons[i].pressed) controller.map.buttonRepresentations.forEach(representation => {
                    if (representation.custom == i) {
                        this.pressButton(i);
                    }
                })
            }

            for (let i = 0; i < controller.pad.axes.length; i++) {
                if (controller.pad.axes[i] != 0) {
                    this.moveAxe({number: i, value: i});
                }
            }
        });
        if (this.keys.up.isDown || this.arrowKeys.up.isDown) {
            this.pressButton('up');
        }
        if (this.keys.down.isDown || this.arrowKeys.down.isDown) {
            this.pressButton('down')
        }
        if (this.keys.left.isDown || this.arrowKeys.left.isDown) {
            this.pressButton('left');
        }
        if (this.keys.right.isDown || this.arrowKeys.right.isDown) {
            this.pressButton('right');
        }
    }

    destroy() {
        this.game = null;
        this.parent = null;
    }

    private addGamepad(e) {
        let hasMapped = false;
        this.mappings.forEach(mapping => {
            if (mapping.id == e.gamepad.id) {
                hasMapped = true;
                this.controllers.push({pad: e.gamepad, map: mapping})
            }
        });
        if (!hasMapped) this.controllers.push({pad: e.gamepad, map: this.mappings[0]})
    }

    vibrate(miliseconds: number) {
        if ("vibrate" in navigator) {
            window.navigator.vibrate(miliseconds);
        }
    }

    private removeGamepad(e) {
        let valueToDelete;
        for (let i = 0; i < this.controllers.length; i++) {
            if (e.gamepad.id == this.controllers[e].pad.id) valueToDelete = -1;
        }
        if (valueToDelete > -1) this.controllers.splice(valueToDelete, 1)
    }

    private addDefaultMappings() {
        this.mappings.push({name: 'Default', id: 'Default', buttonRepresentations: [
            {custom: 0, normal: 0},
            {custom: 1, normal: 1},
            {custom: 2, normal: 2},
            {custom: 3, normal: 3},
            {custom: 4, normal: 4},
            {custom: 5, normal: 5},
            {custom: 6, normal: 6},
            {custom: 7, normal: 7},
            {custom: 8, normal: 8},
            {custom: 9, normal: 9},
            {custom: 10, normal: 10},
            {custom: 11, normal: 11},
            {custom: 12, normal: 12},
            {custom: 13, normal: 13},
            {custom: 14, normal: 14},
            {custom: 15, normal: 15},
            {custom: 16, normal: 16}
        ], axeRepresentations: [
            {custom: 0, normal: 0},
            {custom: 1, normal: 1},
            {custom: 2, normal: 2},
            {custom: 3, normal: 3}
        ]});
    }

    private pressButton(button: any) {
        if (!this.callbacks) return;
        if (button == 14 || button == 'left') {
            if (this.callbacks.onAnalogLeftButton) this.callbacks.onAnalogLeftButton();
            if (this.callbacks.onAnyLeftButton) this.callbacks.onAnyLeftButton();
            return;
        }
        if (button == 15 || button == 'right') {
            if (this.callbacks.onAnalogRightButton) this.callbacks.onAnalogRightButton();
            if (this.callbacks.onAnyRightButton) this.callbacks.onAnyRightButton();
            return;
        }
        if (button == 12 || button == 'up') {
            if (this.callbacks.onAnalogUpButton) this.callbacks.onAnalogUpButton();
            if (this.callbacks.onAnyUpButton) this.callbacks.onAnyUpButton();
            return;
        }
        if (button == 13 || button == 'down') {
            if (this.callbacks.onAnalogDownButton) this.callbacks.onAnalogDownButton();
            if (this.callbacks.onAnyDownButton) this.callbacks.onAnyDownButton();
            return;
        }

        if (this.callbacks.onMiscButtonPress) this.callbacks.onMiscButtonPress(button);
    }

    private moveAxe(axe: {number: number; value: number}) {
        if ((axe.number == 0 || axe.number == 2)  && axe.value < 0) {
            if (this.callbacks.onAnyLeftButton) this.callbacks.onAnyLeftButton();
            if (axe.number == 0 && this.callbacks.onLeftAxisLeft) this.callbacks.onLeftAxisLeft(axe);
            if (axe.number == 2 && this.callbacks.onRightAxisLeft) this.callbacks.onRightAxisLeft(axe);
            return;
        }
        if ((axe.number == 0 || axe.number == 2) && axe.value > 0) {
            if (this.callbacks.onAnyRightButton) this.callbacks.onAnyRightButton();
            if (axe.number == 0 && this.callbacks.onLeftAxisRight) this.callbacks.onLeftAxisRight(axe);
            if (axe.number == 2 && this.callbacks.onRightAxisRight) this.callbacks.onRightAxisRight(axe);
            return;
        }
        if ((axe.number == 1 || axe.number == 3)  && axe.value < 0) {
            if (this.callbacks.onAnyUpButton) this.callbacks.onAnyUpButton();
            if (axe.number == 1 && this.callbacks.onLeftAxisUp) this.callbacks.onLeftAxisUp(axe);
            if (axe.number == 3 && this.callbacks.onRightAxisUp) this.callbacks.onRightAxisUp(axe);
            return;
        }
        if ((axe.number == 1 || axe.number == 3)  && axe.value > 0) {
            if (this.callbacks.onAnyDownButton) this.callbacks.onAnyDownButton();
            if (axe.number == 1 && this.callbacks.onLeftAxisDown) this.callbacks.onLeftAxisDown(axe);
            if (axe.number == 3 && this.callbacks.onRightAxisDown) this.callbacks.onRightAxisDown(axe);
            return;
        }

        if (this.callbacks.onMiscButtonPress) this.callbacks.onMiscButtonPress(axe);
    }
}