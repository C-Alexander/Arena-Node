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
    onRightAxisRight?: Function;
}

interface mapping {
    name: string;
    id: string;
    buttonRepresentations: { custom: number, normal: number };
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

    controllers: { pad: Gamepad, map: mapping }[];
    mappings: mapping[];

    callbacks: controllercallbacks;

    constructor(game: Phaser.Game, parent: any) {
        this.game = game;
        this.parent = parent;

        game.controllers = this;
        window.addEventListener("gamepadconnected", this.addGamepad);
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
        this.controllers.forEach();
    }

    destroy() {
        this.game = null;
        this.parent = null;
    }

    private addGamepad(e) {
        this.mappings.forEach(mapping => {
            if (mapping.id == e.gamepad.id) {
                this.controllers.push({pad: e.gamepad, map: mapping})
            }
        })
    }

}