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

        // // 버튼 생성
        // const button1 = new ImageButton(
        //     Config.width / 2 - 230,
        //     Config.height / 2,
        //     "player",
        //     this,
        //     () => {
        //         this.MalePlayer.play("player_idle");
        //         this.scene.start("playGame");
        //     },
        //     4
        // );

        // button1.on('pointerover', () => {
        //     this.MalePlayer.play("player_anim");
        // });

        // button1.on('pointerout', () => {
        //     this.MalePlayer.play("player_idle");
        // });

        // 캐릭터 선택 버튼(임시 이미지)
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
    }
}