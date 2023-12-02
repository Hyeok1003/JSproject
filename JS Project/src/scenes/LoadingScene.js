import Phaser from "phaser";
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";

import bgImg1 from "../assets/images/background.png";
import bgImg2 from "../assets/images/background-2.png";
import bgImg3 from "../assets/images/background-3.png";
import bgImg4 from "../assets/images/background-4.png";
import bgImg5 from "../assets/images/background-5.png";
import beamImg from "../assets/images/throwing_stars.png";
import whanma_fireImg from "../assets/images/whanma_attack.png";

//메인화면 이미지 로드
import mainbg from "../assets/images/mainbg2-1.png";
import mainbg2 from "../assets/images/mainbg2-2.png";

//게임클리어 및 종료 배경 로드
import ClearBg from "../assets/images/ClaerBg.png";
import GameOverBg from "../assets/images/GameOverBg.png";

//사운드 파일 로드
import MainBGM1 from "../assets/sounds/GhostOldBGM.mp3";
import MainBGM2 from "../assets/sounds/BGM_chungumgwan.mp3";
import StageBGM1_1 from "../assets/sounds/BGM/BGM_light.mp3";
import StageBGM1_2 from "../assets/sounds/BGM/BGM_cold.mp3";
import GameOverBGM from "../assets/sounds/BGM/BGM_dark.mp3";
import selectBGM from "../assets/sounds/BGM/bgm_chunggang.mp3"

//버튼 이미지 로드
import startImg from "../assets/images/gamestart.png";
import gameoverImg from "../assets/images/gameover.png";
import rightArrow from "../assets/images/BgOptionR.png"
import leftArrow from "../assets/images/BgOptionL.png"

//캐릭터 선택창 ui관련 이미지
import choiceScene from "../assets/images/choiceScene.png"
import Male from "../assets/images/Male.png";
import Female from "../assets/images/Female.png"
import Hidden from "../assets/images/Hidden_player.png"

import explosionImg from "../assets/spritesheets/explosion.png";
import playerImg from "../assets/spritesheets/player.png";
import FemaleChar from "../assets/spritesheets/Female_player.png";
import HiddenChar from "../assets/spritesheets/Hidden.png";
import HiddenChar2 from "../assets/spritesheets/Hidden2.png";
import expUpImg from "../assets/spritesheets/expUp.png";
import mobImg1 from "../assets/spritesheets/mob1.png";
import mobImg2 from "../assets/spritesheets/mob2.png";
import mobImg3 from "../assets/spritesheets/mob3.png";
import mobImg4 from "../assets/spritesheets/mob4.png";
import mobImg5 from "../assets/spritesheets/mob5.png";
import mobImg6 from "../assets/spritesheets/mob6.png";
import mobImg7 from "../assets/spritesheets/mob7.png";
import mobImg8 from "../assets/spritesheets/mob8.png";
import mobImg9 from "../assets/spritesheets/mob9.png";
import mobImg10 from "../assets/spritesheets/mob10.png";
import bossImg1 from "../assets/spritesheets/boss1.png";
import bossImg2 from "../assets/spritesheets/boss2.png";
import catnipImg from "../assets/spritesheets/catnip.png";
import clawWhiteImg from "../assets/spritesheets/claw-white.png";
import clawYellowImg from "../assets/spritesheets/claw-yellow.png";

import beamOgg from "../assets/sounds/beam.ogg";
import scratchOgg from "../assets/sounds/scratch.ogg";
import hitMobOgg from "../assets/sounds/hitMob.ogg";
import growlOgg from "../assets/sounds/growl.ogg";
import explosionOgg from "../assets/sounds/explosion.ogg";
import hurtOgg from "../assets/sounds/Cha_guard.ogg";
import expUpOgg from "../assets/sounds/Cha_lvup.ogg";
import nextLevelOgg from "../assets/sounds/nextLevel.ogg"
import gameOverOgg from "../assets/sounds/Cha_death_1.ogg";
import gameClearOgg from "../assets/sounds/gameClear.ogg";
import pauseInOgg from "../assets/sounds/pauseIn.ogg";
import pauseOutOgg from "../assets/sounds/pauseOut.ogg";

export default class LoadingScene extends Phaser.Scene {
    constructor() {
        // super에 파라미터로 넘겨주는 string이 해당 scene의 identifier가 됩니다.
        super("bootGame");
    }

    preload() {
        //main background image
        this.load.image("mainback", mainbg);
        this.load.image("mainback2", mainbg2)

        //button
        this.load.image("start", startImg);
        this.load.image("gameover", gameoverImg);
        this.load.image("rightArrow", rightArrow);
        this.load.image("leftArrow", leftArrow);

        //BackGround Images
        this.load.image("GameClaerBack", ClearBg);
        this.load.image("GameSet", GameOverBg);

        //IMAGES
        this.load.image("background1", bgImg1);
        this.load.image("background2", bgImg2);
        this.load.image("background3", bgImg3);
        this.load.image("background4", bgImg4);
        this.load.image("background5", bgImg5);
        this.load.image("beam", beamImg);
        this.load.image("whanma_fire", whanma_fireImg)
        this.load.image("choiceScene", choiceScene);

        //CharImages
        this.load.image("Male", Male);
        this.load.image("Female", Female);
        this.load.image("Hidden", Hidden);

        // SPRITESHEETS
        this.load.spritesheet("player", playerImg, {
            frameWidth: 532/7,
            frameHeight: 86,
        });
        this.load.spritesheet("Female_player", FemaleChar, {
            frameWidth: 492/7,
            frameHeight: 87,
        });
        this.load.spritesheet("Hidden_player", HiddenChar, {
            frameWidth: 592/6,
            frameHeight: 132,
        })
        this.load.spritesheet("Hidden_player2", HiddenChar2, {
            frameWidth: 595/4,
            frameHeight: 129,
        })
        this.load.spritesheet("mob1", mobImg1, {
            frameWidth: 177 / 4,
            frameHeight: 46,
        });
        this.load.spritesheet("mob2", mobImg2, {
            frameWidth: 402/8,
            frameHeight: 72,
        });
        this.load.spritesheet("mob3", mobImg3, {
            frameWidth: 515/7,
            frameHeight: 88,
        });
        this.load.spritesheet("mob4", mobImg4, {
            frameWidth: 237/4,
            frameHeight: 68,
        });
        this.load.spritesheet("mob5", mobImg5, {
            frameWidth: 897/6,
            frameHeight: 108,
        });
        this.load.spritesheet("mob6", mobImg6, {
            frameWidth: 743/9,
            frameHeight: 91,
        });
        this.load.spritesheet("mob7", mobImg7, {
            frameWidth: 608/6,
            frameHeight: 67,
        });
        this.load.spritesheet("mob8", mobImg8, {
            frameWidth: 428/8,
            frameHeight: 75,
        });
        this.load.spritesheet("mob9", mobImg9, {
            frameWidth: 722/8,
            frameHeight: 136,
        });
        this.load.spritesheet("mob10", mobImg10, {
            frameWidth: 332/3,
            frameHeight: 72,
        });
        this.load.spritesheet("boss1", bossImg1, {
            frameWidth: 255,
            frameHeight: 174,
        });
        this.load.spritesheet("boss2", bossImg2, {
            frameWidth: 915/4,
            frameHeight: 180,
        });
        this.load.spritesheet("explosion", explosionImg, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("claw_white", clawWhiteImg, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("claw_yellow", clawYellowImg, {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.spritesheet("catnip", catnipImg, {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("exp-up", expUpImg, {
            frameWidth: 16,
            frameHeight: 16,
        });

        // AUDIOS
        this.load.audio("audio_beam", beamOgg);
        this.load.audio("audio_scratch", scratchOgg);
        this.load.audio("audio_hitMob", hitMobOgg);
        this.load.audio("audio_growl", growlOgg);
        this.load.audio("audio_explosion", explosionOgg);
        this.load.audio("audio_expUp", expUpOgg);
        this.load.audio("audio_hurt", hurtOgg);
        this.load.audio("audio_nextLevel", nextLevelOgg);
        this.load.audio("audio_gameOver", gameOverOgg);
        this.load.audio("audio_gameClear", gameClearOgg);
        this.load.audio("audio_pauseIn", pauseInOgg);
        this.load.audio("audio_pauseOut", pauseOutOgg);

        //귀혼 메인BGM로드
        this.load.audio("MainBGM1", MainBGM1);
        this.load.audio("MainBGM2", MainBGM2);
        this.load.audio("GameOverBGM", GameOverBGM);
        this.load.audio("selectBGM", selectBGM);

        // 스테이지 브금
        this.load.audio("BGM_S1", StageBGM1_1);
        this.load.audio("BGM_S1_2", StageBGM1_2);

        // FONT
        this.load.bitmapFont("pixelFont", fontPng, fontXml);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("mainScene");

        // MOBS
        this.anims.create({
            key: "mob1_anim",
            frames: this.anims.generateFrameNumbers("mob1"),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "mob2_anim",
            frames: this.anims.generateFrameNumbers("mob2"),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "mob3_anim",
            frames: this.anims.generateFrameNumbers("mob3"),
            frameRate: 7,
            repeat: -1,
        });
        this.anims.create({
            key: "mob4_anim",
            frames: this.anims.generateFrameNumbers("mob4"),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "mob5_anim",
            frames: this.anims.generateFrameNumbers("mob5"),
            frameRate: 6,
            repeat: -1,
        });
        this.anims.create({
            key: "mob6_anim",
            frames: this.anims.generateFrameNumbers("mob6"),
            frameRate: 9,
            repeat: -1,
        });
        this.anims.create({
            key: "mob7_anim",
            frames: this.anims.generateFrameNumbers("mob7"),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: "mob8_anim",
            frames: this.anims.generateFrameNumbers("mob8"),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "mob9_anim",
            frames: this.anims.generateFrameNumbers("mob9"),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: "mob10_anim",
            frames: this.anims.generateFrameNumbers("mob10"),
            frameRate: 3,
            repeat: -1,
        });
        this.anims.create({
            key: "boss1_anim",
            frames: this.anims.generateFrameNumbers("boss1"),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "boss1_idle",
            frames: this.anims.generateFrameNumbers("boss1", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        });
        this.anims.create({
            key: "boss2_anim",
            frames: this.anims.generateFrameNumbers("boss2"),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.create({
            key: "boss2_idle",
            frames: this.anims.generateFrameNumbers("boss2", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        });

        // PLAYERS
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 7,
            repeat: -1,
        });
        this.anims.create({
            key: "player_idle",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        });
        this.anims.create({
            key: "FemalePlayer_anim",
            frames: this.anims.generateFrameNumbers("Female_player"),
            frameRate: 7,
            repeat: -1,
        })
        this.anims.create({
            key: "FemalePlayer_idle",
            frames: this.anims.generateFrameNumbers("Female_player", {
                start: 0,
                end: 0,
            }),
            frameRate: 1,
            repeat: 0,
        })
        this.anims.create({
            key: "Hidden_player_anim",
            frames: this.anims.generateFrameNumbers("Hidden_player"),
            frameRate: 9,
            repeat : -1
        })
        this.anims.create({
            key: "Hidden_player2_anim",
            frames: this.anims.generateFrameNumbers("Hidden_player2"),
            frameRate: 8,
            repeat : -1
        })
        
        // EFFECT
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });

        // ATTACKS
        this.anims.create({
            key: "scratch_white",
            frames: this.anims.generateFrameNumbers("claw_white"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: "scratch_yellow",
            frames: this.anims.generateFrameNumbers("claw_yellow"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true,
        });
        this.anims.create({
            key: "catnip_anim",
            frames: this.anims.generateFrameNumbers("catnip"),
            frameRate: 20,
            repeat: -1,
        });

        // EXP UP ITEMS
        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "blue",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 1,
                end: 1,
            }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "yellow",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 2,
                end: 2,
            }),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: "green",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 3,
                end: 3,
            }),
            frameRate: 20,
            repeat: 0,
        });
    }
}