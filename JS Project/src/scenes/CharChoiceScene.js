import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
// import BackgroundManager from "../ui/BackGroundManager";

export default class CharChoiceScene extends Phaser.Scene {
    constructor() {
        super("charChoice");
    }

    create() {

        // 해당씬 제목 출력
        this.add
            .bitmapText(Config.width / 2, 90, "pixelFont", "CharSelect", 60)
            .setOrigin(0.5);

        // 캐릭터 선택 버튼(임시 이미지)
        new Button(
            Config.width / 2 - 300,
            Config.height / 2,
            "Male",
            this,
            () => {
                this.scene.start("playGame")
            },
            1
        );

        new Button(
            Config.width / 2 + 300,
            Config.height / 2,
            "Female",
            this,
            () => {
                this.scene.start("playGame")
            },
            0.65
        );
    }
}