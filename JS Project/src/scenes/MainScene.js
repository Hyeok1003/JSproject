import Phaser from "phaser";
import Config from "../Config";
import Button from "../ui/Button";

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    create() {
        const mainBGM1 = this.sound.add("MainBGM1");
        mainBGM1.play();
        mainBGM1.on(Phaser.Sound.Events.COMPLETE, () => {
            mainBGM1.play();
        });
        //2번째 메인브금은 처음부터 재생되지 않게 pause를 걸어둠.
        const mainBGM2 = this.sound.add("MainBGM2");
        mainBGM2.play();
        mainBGM2.pause();

        // 배경 이미지 로드
        const main_img = this.add.image(0, 0, "mainback").setScale(0.77);
        main_img.setOrigin(0.5, 0.5);
        // 2번째 메인배경 설정하지 않으면 안 보이도록 설정.
        const mainbg2 = this.add.image(0, 0, "mainback2").setScale(0.5);
        mainbg2.setOrigin(0.09, 0);
        mainbg2.setVisible(false); //배경 처음부터 안 보이도록 설정

        // 배경색을 채워줍니다.
        // this.add.graphics()
        //     .fillStyle(0xbbdefb)
        //     .fillRect(0, 0, Config.width, Config.height)
        //     .setScrollFactor(0);
        //메인 BGM 로드

        //게임오버 화면 디버그 테스트용 코드
        // const Gameclear_img = this.add.image(0, 0, "GameSet").setScale(0.3);
        // Gameclear_img.setOrigin(0, 0);
        
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
            () => this.scene.start("playGame"),
            0.4
        );

        // 임시버튼 생성
        const button = this.add.text(400, 300, 'Change Scene', { fill: '#0f0' });
        button.setInteractive();

        // 버튼을 클릭할 때마다 배경화면과 배경음악을 변경
        button.on('pointerdown', () => {
            if (main_img.visible) {
                main_img.setVisible(false);
                mainbg2.setVisible(true);
                mainBGM1.pause();
                mainBGM2.resume();
                mainBGM2.on(Phaser.Sound.Events.COMPLETE, () => {
                    mainBGM2.play();
                });
            } 
            else {
                main_img.setVisible(true);
                mainbg2.setVisible(false);
                mainBGM1.resume();
                mainBGM2.pause();
                mainBGM1.on(Phaser.Sound.Events.COMPLETE, () => {
                    mainBGM1.play();
                });
            }
        });
    }
}