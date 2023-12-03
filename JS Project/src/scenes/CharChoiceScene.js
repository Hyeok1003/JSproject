import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";

export default class CharChoiceScene extends Phaser.Scene {
    constructor() {
        super("charChoice");

        this.MaleChar = null;
        this.FemaleChar = null;
    }

    init(data) {
        this.value_HH = data.Hidden_value2;
    }

    create() {
        this.randomValue = Math.floor(Math.random() * 11) + 1;
        while (this.randomValue === 3) {
            this.randomValue = Math.floor(Math.random() * 11) + 1;
        }

        this.choice = this.add.image(0, 0, "choiceScene").setScale(1);
        this.choice.setOrigin(0.5, 0.5);

        this.selectBGM = this.sound.add("selectBGM");
        this.selectBGM.play({ loop : true });

        this.MaleChar = this.add
            .sprite(Config.width / 2, Config.height / 2, "player")
            .setScale(2)
            .setVisible(false);

        this.FemaleChar = this.add
            .sprite(Config.width / 2, Config.height / 2, "Female_player")
            .setScale(2)
            .setVisible(false);
        
        this.HiddenChar = this.add
            .sprite(Config.width / 2 - 300, Config.height / 2, "Hidden_player")
            .setScale(2)
            .setVisible(false);

        this.HiddenChar2 = this.add
            .sprite(Config.width / 2 + 300, Config.height / 2, "Hidden_player2")
            .setScale(2)
            .setVisible(false);

        // 해당씬 제목 출력
        this.add
            .bitmapText(Config.width / 2, 90, "pixelFont", "CharSelect", 60)
            .setOrigin(0.5);

        // 캐릭터 선택 버튼
        this.button1 = new Button(
            Config.width / 2 - 300,
            Config.height / 2,
            "Male",
            this,
            () => {
                this.selectBGM.stop()
                this.scene.start("playGame", { value: 1 });
            },
            1
        );

        this.button1.on('pointerover', () => {
            this.MaleChar.setVisible(true);
            this.MaleChar.play("player_anim");
            this.Hidden_button.setVisible(false);
        })

        this.button1.on('pointerout', () => {
            this.MaleChar.setVisible(false);
            this.MaleChar.play("player_idle");
            if(this.value_HH === 1) {
                this.Hidden_button.setVisible(true);
            }
        })

        this.Hidden_button = new Button(
            Config.width / 2,
            Config.height / 2,
            "Hidden",
            this,
            () => {
                this.selectBGM.stop()
                this.scene.start("playGame", { value: 3 });
            },
            0.8
        );
        
        if (this.value_HH === 1) {
            this.Hidden_button.setVisible(true);
        } 
        else {
            this.Hidden_button.setVisible(false);
        }

        this.Hidden_button.on('pointerover', () => {
            this.button1.setVisible(false);
            this.button2.setVisible(false);
            this.HiddenChar.setVisible(true);
            this.HiddenChar2.setVisible(true);
            this.HiddenChar.play("Hidden_player_anim")
            this.HiddenChar2.play("Hidden_player2_anim")
        })

        this.Hidden_button.on('pointerout', () => {
            this.button1.setVisible(true);
            this.button2.setVisible(true);
            this.HiddenChar.setVisible(false);
            this.HiddenChar2.setVisible(false);
        })

        this.button2 = new Button(
            Config.width / 2 + 300,
            Config.height / 2,
            "Female",
            this,
            () => {
                this.selectBGM.stop()
                this.scene.start("playGame", { value: 2 });
            },
            0.65
        );

        this.button2.on('pointerover', () => {
            this.FemaleChar.setVisible(true);
            this.FemaleChar.play("FemalePlayer_anim");
            this.Hidden_button.setVisible(false);
        })

        this.button2.on('pointerout', () => {
            this.FemaleChar.setVisible(false);
            this.FemaleChar.play("FemalePlayer_idle");
            if(this.value_HH === 1) {
                this.Hidden_button.setVisible(true);
            }
        })

        this.random = this.add
            .bitmapText(Config.width / 2, Config.height / 2 + 300, "pixelFont", "Random Select", 60)
            .setOrigin(0.5)
            .setInteractive();
        
        this.random.on('pointerdown', () => {
            this.selectBGM.stop()
            this.scene.start("playGame", { value: this.randomValue });
        })

        // 개발용 코드
        new Button(
            Config.width / 2 - 590,
            Config.height / 2 + 330,
            "leftArrow",
            this,
            () => {
                this.selectBGM.stop()
                this.scene.start("playGame", { value: 10 });
            },
            0.5
        )
        new Button(
            Config.width / 2 + 590,
            Config.height / 2 + 330,
            "rightArrow",
            this,
            () => {
                this.selectBGM.stop()
                this.scene.start("gameClearScene");
            },
            0.5
        )
    }
}