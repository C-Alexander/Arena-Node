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
// import pixi, p2 and phaser ce
import "pixi";
import "p2";
import * as Phaser from "phaser-ce";
/**
 * Main entry game class
 * @export
 * @class Game
 * @extends {Phaser.Game}
 */
var Game = (function (_super) {
    __extends(Game, _super);
    /**
     * Creates an instance of Game.
     * @memberof Game
     */
    function Game() {
        // call parent constructor
        return _super.call(this, 800, 600, Phaser.CANVAS, "game", null) || this;
        // add some game states
        // start with boot state
    }
    return Game;
}(Phaser.Game));
export { Game };
//# sourceMappingURL=game.js.map