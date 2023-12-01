import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
import { getTimeString } from "../utils/time";

export default class GameClearScene extends Phaser.Scene {
    constructor() {
        // scene의 identifier를 설정하는 부분입니다.
        super("gameClearScene");
    }

    init(data) {
        this.m_mobsKilled = data.mobsKilled;
        this.m_level = data.level;
        this.m_secondElapsed = data.secondElapsed;
    }

    create() {
        // 배경이미지 추가하는 코드.
        const Gameclear_img = this.add.image(0, 0, "GameClaerBack").setScale(1.8);
        Gameclear_img.setOrigin(0, 0);

        // 상단 문구를 추가하는 부분입니다.
        this.add
            .bitmapText(
                Config.width / 2,
                Config.height / 2 - 180,
                "pixelFont",
                "You Win !!",
                80
            )
            .setOrigin(0.5);

        this.add
            .bitmapText(
                Config.width / 2,
                Config.height / 2 - 30,
                "pixelFont",
                `You survived for ${getTimeString(this.m_secondElapsed)} !`,
                40
            )
            .setOrigin(0.5);

        this.add
            .bitmapText(
                Config.width / 2,
                Config.height / 2 + 30,
                "pixelFont",
                `Mobs Killed : ${this.m_mobsKilled}, Level : ${this.m_level}`,
                40
            )
            .setOrigin(0.5);

        new Button(
            Config.width / 2,
            Config.height / 2 + 180,
            "gameover",
            this,
            () => this.scene.start("mainScene")
        );
    }
}