/// <reference path="phaser/typescript/phaser.d.ts" />
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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'game') || this;
            _this.state.add('Singleplayer', Arena.Singleplayer, false);
            _this.state.add('Menu', Menu, false);
            _this.state.start('Menu');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Arena.Game = Game;
    window.onload = function () {
        var game = new Arena.Game();
    };
})(Arena || (Arena = {}));
