import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";
import BackgroundManager from "../ui/BackGroundManager";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    create() {
        //게임오버 화면 디버그 테스트용 코드
        // const Gameclear_img = this.add.image(0, 0, "GameSet").setScale(0.3);
        // Gameclear_img.setOrigin(0, 0);
        
        //초기 메인 브금을 로드.
        const mainBGM1 = this.sound.add("MainBGM1");
        mainBGM1.play();
        mainBGM1.on(Phaser.Sound.Events.COMPLETE, () => {
            mainBGM1.play();
        });
        //초기 메인 화면을 로드
        const main_img = this.add.image(0, 0, "mainback").setScale(0.77);
        main_img.setOrigin(0.5, 0.5);

        //코드가 너무 길어지는거 같아서 BackgroundManager클래스를 만들어서 파일을 따로 관리함.
        this.bgManager = new BackgroundManager(this);

        this.bgManager.add("mainback", "MainBGM1", 0.77, 0.5, 0.5);
        this.bgManager.add("mainback2", "MainBGM2", 0.5, 0.09, 0);
        
        // 게임 제목을 상단에 추가합니다.
        this.add
            .bitmapText(Config.width / 2, 150, "pixelFont", "Gohst Survivor", 60)
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
                mainBGM1.stop();
                this.bgManager.removeAll();
                this.scene.start("playGame")
            },
            0.4
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
        .bitmapText(Config.width / 2 + 480, 693, "pixelFont", "change scene", 30)
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