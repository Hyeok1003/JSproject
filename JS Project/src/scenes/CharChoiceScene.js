import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
import BackgroundManager from "../ui/BackGroundManager";
import ImageButton from "../ui/Button";
import Player from "../characters/Player";

export default class CharChoiceScene extends Phaser.Scene {
    constructor() {
        super("charChoice");
    }

    create() {
        const choice = this.add.image(0, 0, "choiceScene").setScale(1);
        choice.setOrigin(0.5, 0.5);

        const MaleChar = this.add
            .sprite(Config.width / 2, Config.height / 2, "player")
            .setScale(2)
            .play("player_idle")
            .setVisible(false);

        const Female_Char = this.add
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
                this.scene.start("playGame")
            },
            1
        );

        button1.on('pointerover', () => {
            MaleChar.setVisible(true);
            MaleChar.play("player_anim");
        })

        button1.on('pointerout', () => {
            MaleChar.setVisible(false);
            MaleChar.play("player_idle");
        })

        const button2 = new Button(
            Config.width / 2 + 300,
            Config.height / 2,
            "Female",
            this,
            () => {
                this.scene.start("playGame")
            },
            0.65
        );

        button2.on('pointerover', () => {
            Female_Char.setVisible(true);
            Female_Char.play("FemalePlayer_anim");
        })

        button2.on('pointerout', () => {
            Female_Char.setVisible(false);
            Female_Char.play("FemalePlayer_anim");
        })
    }
}