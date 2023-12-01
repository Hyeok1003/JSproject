import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
import BackGroundManager from "../ui/BackGroundManager"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    init(data) {
        this.value2 = data.value;
        this.value_H = data.Hidden_value;
    }


    create() {
        // 배경 이미지 로드
        const main_img = this.add.image(0, 0, "mainback").setScale(0.77);
        main_img.setOrigin(0.5, 0.5);

        // 노래 추가
        const mainBGM1 = this.sound.add("MainBGM1");
        mainBGM1.play();
        mainBGM1.on(Phaser.Sound.Events.COMPLETE, () => {
            mainBGM1.play();
        });

        // 배경색을 채워줍니다.
        // this.add.graphics()
        //     .fillStyle(0xbbdefb)
        //     .fillRect(0, 0, Config.width, Config.height)
        //     .setScrollFactor(0);

        this.bgManager = new BackGroundManager(this);

        this.bgManager.add("mainback", "MainBGM1", 0.77, 0.5, 0.5);
        this.bgManager.add("mainback2", "MainBGM2", 0.5, 0.09, 0);

        // 게임 제목을 상단에 추가합니다.
        this.add
            .bitmapText(Config.width / 2, 150, "pixelFont", "Ghost Survivor", 60)
            .setOrigin(0.5);

        // 움직이는 플레이어를 가운데 추가합니다.
        this.add
            .sprite(Config.width / 2, Config.height / 2, "player")
            .setScale(2)
            .play("player_idle");

        // 게임 시작 버튼을 하단에 추가합니다.
        // 버튼을 누르면 PlayingScene으로 이동하도록 callback을 전달해줍니다.
        new Button(
            Config.width / 2,
            Config.height / 2 + 200,
            "start",
            this,
            () => {
<<<<<<< HEAD
                this.scene.start("playGame")
            },0.4
=======
                mainBGM1.stop();
                this.bgManager.removeAll();
                if(this.value_H === 1) {
                    this.scene.start("charChoice", { Hidden_value2 : 1 })
                }
                else {
                this.scene.start("charChoice", { Hidden_value2 : 0 })
                }
            },
            0.4
>>>>>>> sub
        );

        new Button(
            Config.width / 2 + 590,
            Config.height / 2 + 330,
            "rightArrow",
            this,
            () => {
                mainBGM1.stop();
                this.bgManager.next();
            },
            0.5
        )

        this.add
<<<<<<< HEAD
        .bitmapText(Config.width / 2 + 480, 693, "pixelFont", "BGM Change", 30)
=======
        .bitmapText(Config.width / 2 + 480, 693, "pixelFont", "change scene", 30)
>>>>>>> sub
        .setOrigin(0.5);

        new Button(
            Config.width / 2 +370,
            Config.height / 2 + 330,
            "leftArrow",
            this,
            () => {
                mainBGM1.stop();
                this.bgManager.prev();
            },
            0.5
        )
    }
}