import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
import BackgroundManager from "../ui/BackGroundManager";
import ImageButton from "../ui/Button";
import Player from "../characters/Player";

export default class CharChoiceScene extends Phaser.Scene {
    constructor() {
        super("charChoice");

        this.MaleChar = null;
        this.FemaleChar = null;

        // this.scene = scene; // Scene 객체를 멤버 변수로 저장합니다.

        // this.value_H = this.scene.scene.settings.data.Hidden_value;
    }

    init(data) {
        this.value_HH = data.Hidden_value2;
    }

    create() {
        const choice = this.add.image(0, 0, "choiceScene").setScale(1);
        choice.setOrigin(0.5, 0.5);

        this.MaleChar = this.add
            .sprite(Config.width / 2, Config.height / 2, "player")
            .setScale(2)
            .play("player_idle")
            .setVisible(false);

        this.FemaleChar = this.add
            .sprite(Config.width / 2, Config.height / 2, "Female_player")
            .setScale(2)
            .play("FemalePlayer_idle")
            .setVisible(false);

        // 해당씬 제목 출력
        this.add
            .bitmapText(Config.width / 2, 90, "pixelFont", "CharSelect", 60)
            .setOrigin(0.5);

        // 캐릭터 선택 버튼
        const button1 = new Button(
            Config.width / 2 - 300,
            Config.height / 2,
            "Male",
            this,
            () => {
                this.scene.start("playGame", { value: 1 });
            },
            1
        );

        button1.on('pointerover', () => {
            this.MaleChar.setVisible(true);
            this.MaleChar.play("player_anim");
        })

        button1.on('pointerout', () => {
            this.MaleChar.setVisible(false);
            this.MaleChar.play("player_idle");
        })

        this.Hidden_button = new Button(
            Config.width / 2,
            Config.height / 2,
            "Hidden",
            this,
            () => {
                this.scene.start("playGame", { value: 3 });
            },
            0.65
        );
        
        if (this.value_HH === 1) {
            this.Hidden_button.setVisible(true);
        } 
        else {
            this.Hidden_button.setVisible(false);
        }

        const button2 = new Button(
            Config.width / 2 + 300,
            Config.height / 2,
            "Female",
            this,
            () => {
                this.scene.start("playGame", { value: 2 });
            },
            0.65
        );

        button2.on('pointerover', () => {
            this.FemaleChar.setVisible(true);
            this.FemaleChar.play("FemalePlayer_anim");
        })

        button2.on('pointerout', () => {
            this.FemaleChar.setVisible(false);
            this.FemaleChar.play("FemalePlayer_idle");
        })

        // 개발용 코드
        new Button(
            Config.width / 2 + 590,
            Config.height / 2 + 330,
            "rightArrow",
            this,
            () => {
                this.scene.start("gameOverScene");
            },
            0.5
        )
    }
}