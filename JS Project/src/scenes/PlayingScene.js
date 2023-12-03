import Phaser from "phaser";
import Config from "../Config"
import Player from "../characters/Player";
import Mob from "../characters/Mob"
import TopBar from "../ui/TopBar";
import ExpBar from "../ui/ExpBar";
import { setBackground } from "../utils/backgroundManager";
import { addMob, addMobEvent, removeOldestMobEvent } from "../utils/mobManager"
import { setAttackScale, setAttackDamage, addAttackEvent, removeAttack, setAttackRepeatGap} from "../utils/attackManager"
import { pause } from "../utils/pauseManager";
import { createTime } from "../utils/time";

export default class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    init(data) {
        this.value1 = data.value; // value1을 해당 클래스의 멤버 변수로 설정합니다.
    }

    create() {
        // 사용할 sound들을 추가해놓는 부분입니다.
        // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
        // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.
        this.sound.pauseOnBlur = false;
        this.m_beamSound = this.sound.add("audio_beam");
        this.m_scratchSound = this.sound.add("audio_scratch");
        this.m_hitMobSound = this.sound.add("audio_hitMob");
        this.m_growlSound = this.sound.add("audio_growl");
        this.m_explosionSound = this.sound.add("audio_explosion");
        this.m_expUpSound = this.sound.add("audio_expUp");
        this.m_expeatSound = this.sound.add("audio_expeat");
        this.m_hurtSound = this.sound.add("audio_hurt");
        this.m_nextLevelSound = this.sound.add("audio_nextLevel");
        this.m_gameOverSound = this.sound.add("audio_gameOver");
        this.m_gameClearSound = this.sound.add("audio_gameClear");
        this.m_pauseInSound = this.sound.add("audio_pauseIn");
        this.m_pauseOutSound = this.sound.add("audio_pauseOut");
        this.GameOverBGM = this.sound.add("GameOverBGM");

        this.m_stage1 = this.sound.add("BGM_S1");
        this.m_stage1_2 = this.sound.add("BGM_S1_2");
        this.m_stage2_1 = this.sound.add("BGM_S2");
        this.m_stage2_2 = this.sound.add("BGM_S2_2");
        this.m_LastStage = this.sound.add("BGM_LS");


        // player를 m_player라는 멤버 변수로 추가합니다.
        this.m_player = new Player(this);

        this.cameras.main.startFollow(this.m_player);

        // PlayingScene의 background를 설정합니다.
        setBackground(this, "background1");

        // BGM 설정
        this.m_stage1.play({loop:true});

        this.m_cursorKeys = this.input.keyboard.createCursorKeys();

        // Mob
        this.m_mobs = this.physics.add.group();
        this.m_mobs.add(new Mob(this, 0, 0, "mob1", "mob1_anim", 10));
        this.m_mobEvents = [];

        //scene, repeatGap, mobTexture, mobAnim, mobHp, mobDropRate
        addMobEvent(this, 1000, "mob1", "mob1_anim", 10, 0.9);

        // Attack
        this.m_weaponDynamic = this.add.group();
        this.m_weaponStatic = this.add.group();
        this.m_attackEvents = {};
        // scene, attackType, attackDamage, attackScale, repeatGap
        if (this.value1 === 3) addAttackEvent(this, "beam", 20, 2, 600);
        else addAttackEvent(this, "beam", 10, 1, 1000);

        // 보스몹이 잘 추가되는지 확인하기 위해 create 메서드 내에서 addMob을 실행시켜봅니다.
        // addMob(this, "lion", "lion_anim", 100, 0);

        // collisions
        // Player와 mob이 부딪혔을 경우 player에 데미지 10을 줍니다.
        // (Player.js에서 hitByMob 함수 확인)
        this.physics.add.overlap(
            this.m_player,
            this.m_mobs,
            () => this.m_player.hitByMob(10),
            null,
            this
        );

        // mob이 dynamic 공격에 부딪혓을 경우 mob에 해당 공격의 데미지만큼 데미지를 줍니다.
        // (Mob.js에서 hitByDynamic 함수 확인)
        this.physics.add.overlap(
            this.m_weaponDynamic,
            this.m_mobs,
            (weapon, mob) => {
                mob.hitByDynamic(weapon, weapon.m_damage);
            },
            null,
            this
        );

        // mob이 static 공격에 부딪혓을 경우 mob에 해당 공격의 데미지만큼 데미지를 줍니다.
        // (Mob.js에서 hitByStatic 함수 확인)
        this.physics.add.overlap(
            this.m_weaponStatic,
            this.m_mobs,
            (weapon, mob) => {
                mob.hitByStatic(weapon.m_damage);
            },
            null,
            this
        );

        // item
        this.m_expUps = this.physics.add.group();
        this.physics.add.overlap(
            this.m_player,
            this.m_expUps,
            this.pickExpUp,
            null,
            this
        );

        // topbar, expbar
        this.m_topBar = new TopBar(this);
        this.m_expBar = new ExpBar(this, 50);

        // event handler
        // ESC 키를 누르면 "pause" 유형으로 일시정지 시킵니다.
        this.input.keyboard.on(
            "keydown-ESC",
            () => { pause(this, "pause"); 
            },
            this
        );

        // time
        createTime(this);
    }

    update() {
        this.movePlayerManager();

        this.m_background.setX(this.m_player.x - Config.width / 2);
        this.m_background.setY(this.m_player.y - Config.height / 2);

        this.m_background.tilePositionX = this.m_player.x - Config.width / 2;
        this.m_background.tilePositionY = this.m_player.y - Config.width / 2;

        const closest = this.physics.closest(
            this.m_player,
            this.m_mobs.getChildren()
        );
        this.m_closest = closest;
    }

    pickExpUp(player, expUp) {
        expUp.disableBody(true, true);
        expUp.destroy();
        this.m_expeatSound.play();
        // console.log(`경험치 ${expUp.m_exp} 상승!`);
        this.m_expBar.increase(expUp.m_exp);
        if (this.m_expBar.m_currentExp >= this.m_expBar.m_maxExp) {
            this.m_expUpSound.play();
            // maxExp를 초과하면 레벨업을 해주던 기존의 코드를 지우고
            // afterLevelUp 메소드를 만들어 거기에 옮겨줍니다.
            // 추후 레벨에 따른 몹, 무기 추가를 afterLevelUp에서 실행해 줄 것입니다.
            pause(this, "levelup");
        }
    }

    afterLevelUp() {
        this.m_topBar.gainLevel();

        switch (this.m_topBar.m_level) {
            case 2:
                addMobEvent(this, 1000, "mob2", "mob2_anim", 20, 0.6);
                break;
                
            case 4:
                // catnip 공격 추가
                if (this.value1 === 3) addAttackEvent(this, "fire_floor", 10, 4);
                else addAttackEvent(this, "catnip", 3, 2);
                removeOldestMobEvent(this);         // 깨부리 삭제
                addMobEvent(this, 600, "mob1", "mob1_anim", 10, 0.8);
                break;


            case 5:
                if (this.value1 === 3) setAttackDamage(this, "fire_floor", 15);
                else setAttackDamage(this, "catnip", 5);
                removeOldestMobEvent(this);         // 네코 삭제
                addMobEvent(this, 1000, "mob3", "mob3_anim", 30, 0.4);
                break;


            case 6:
                
                removeOldestMobEvent(this);         // 더 많은 깨부리 삭제
                if (this.value1 === 3) setAttackRepeatGap(this, "beam", 100);
                else setAttackRepeatGap(this, "beam", 800);
                addMobEvent(this, 1000, "mob4", "mob4_anim", 40, 0.3);
                setBackground(this, "background2");
                this.m_stage1.stop();
                this.m_stage1_2.play({loop:true});
                break;


            case 7:
                // catnip 크기 확대
                if (this.value1 === 3) setAttackDamage(this, "fire_floor", 100);
                else setAttackDamage(this, "catnip", 5);
                if (this.value1 === 3) setAttackScale(this, "fire_floor", 10);
                else setAttackScale(this, "catnip", 3);
                break;


            case 8:
                // beam 공격 크기 및 데미지 확대
                if (this.value1 != 3){
                    setAttackScale(this, "beam", 2);
                    setAttackDamage(this, "beam", 15);
                }
                else setAttackDamage(this, "beam", 150);
                break;


            case 10:
                removeOldestMobEvent(this);         // 강시 삭제
                addMob(this, "boss1", "boss1_anim", 1500, 0);
                if (this.value1 != 3){
                    setAttackDamage(this, "catnip", 8);
                    setAttackRepeatGap(this, "beam", 600);
                }
                else addMobEvent(this, 600, "boss1", "boss1_anim", 4000, 0.8);
                break;

            case 12:
                if (this.value1 != 3){
                    setAttackDamage(this, "catnip", 10);
                    setAttackDamage(this, "beam", 20);
                }
                
                break;

            case 13:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 12);
                break;

            case 14:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 14);
                break;

            case 15:
                removeOldestMobEvent(this);         // 처녀귀신 삭제
                
                addMobEvent(this, 700, "mob7", "mob7_anim", 60, 0.6);
                
                setBackground(this, "background4");
                this.m_stage1_2.stop();
                this.m_stage2_1.play({loop:true});

                if (this.value1 != 3) {
                    addAttackEvent(this, "claw", 10, 2.8, 1500);
                    setAttackScale(this, "catnip", 4);
                }
                else removeOldestMobEvent(this);
                break;

            case 16:
                addMobEvent(this, 1500, "mob5", "mob5_anim", 300, 0.4)
                if (this.value1 != 3) {
                    setAttackDamage(this, "catnip", 16);
                    setAttackDamage(this, "beam", 30);
                    setAttackRepeatGap(this, "beam", 400);
                }
                break;

            case 17:
                removeOldestMobEvent(this);
                break;

            case 18:
                removeOldestMobEvent(this);         // 견마귀 삭제
                setBackground(this, "background3");
                this.m_stage2_1.stop();
                this.m_stage2_2.play({loop:true});
                addMobEvent(this, 1000, "mob8", "mob8_anim", 350, 0.3);
                if (this.value1 != 3) setAttackDamage(this, "catnip", 18);
                break;

            case 19:
                if (this.value1 != 3) setAttackDamage(this, "beam", 40);
                break;

            case 20:
                removeOldestMobEvent(this);
                // claw 공격 크기 확대
                if (this.value1 != 3) {
                    setAttackScale(this, "claw", 4);
                    setAttackDamage(this, "claw", 80);
                    setAttackRepeatGap(this, "claw", 1000);
                    setAttackScale(this, "catnip", 6.5);
                    setAttackDamage(this, "catnip", 20);
                    setAttackRepeatGap(this, "beam", 200);
                    setAttackDamage(this, "beam", 50)
                }
                addMobEvent(this, 800, "mob6", "mob6_anim", 350, 0.3);               
                break;
            
            case 21:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 25);
                break;

            case 22:
                setBackground(this, "background5");
                this.m_stage2_2.stop();
                this.m_LastStage.play({loop:true});
                addMobEvent(this, 100, "mob1", "mob1_anim", 400, 0.6);
                if (this.value1 != 3) setAttackDamage(this, "catnip", 30);
                break;

            case 23:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 40);
                break;

            case 24:
                addMobEvent(this, 100, "mob2", "mob2_anim", 400, 0.6);
                if (this.value1 != 3) {
                    setAttackDamage(this, "catnip", 50);
                    setAttackDamage(this, "claw", 120);
                    setAttackDamage(this, "beam", 80)
                }
                break;

            case 25:
                removeOldestMobEvent(this);
                removeOldestMobEvent(this);
                break;

            case 26:
                removeOldestMobEvent(this);
                addMobEvent(this, 200, "mob9", "mob9_anim", 500, 0.6);
                addMobEvent(this, 200, "mob10", "mob10_anim", 500, 0.6);
                if (this.value1 != 3) setAttackDamage(this, "catnip", 60);
                break;

            case 27:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 65);
                break;

            case 28:
                if (this.value1 != 3){
                    setAttackDamage(this, "claw", 140);
                    setAttackScale(this, "claw", 8);
                }
                break;

            case 29:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 70);
                break;

            case 30:
                removeOldestMobEvent(this);
                removeOldestMobEvent(this);
                addMobEvent(this, 200, "mob9", "mob9_anim", 800, 0.6);
                addMobEvent(this, 200, "mob10", "mob10_anim", 800, 0.6);
                if (this.value1 != 3) setAttackDamage(this, "beam", 100);
                else setAttackDamage(this, "beam", 200);
                break;

            case 31:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 80);
                else setAttackDamage(this, "catnip", 200);
                if (this.value1 != 3) setAttackDamage(this, "claw", 200);
                break;

            case 32:
                removeOldestMobEvent(this);
                removeOldestMobEvent(this);
                addMobEvent(this, 200, "mob9", "mob9_anim", 1400, 0.6);
                addMobEvent(this, 200, "mob10", "mob10_anim", 1400, 0.6);
                if (this.value1 != 3) setAttackDamage(this, "beam", 150);
                break;
            
            case 33:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 90);
                if (this.value1 != 3) setAttackDamage(this, "beam", 120);
            
            case 34:
                addMob(this, "boss2", "boss2_anim", 20000, 0);
                break;
            case 35:
                if (this.value1 != 3) setAttackDamage(this, "catnip", 100);
                break;
        }
    }


    movePlayerManager() {
        this.charKey_anim = ["player_anim", "FemalePlayer_anim", "Female_H1_anim", "Hidden_player2_anim"];
        this.charKey_idle = ["player_idle", "FemalePlayer_idle", "Female_H_anim", "Hidden_player_anim"];
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if(this.value1 === 1) this.index = 0
        if(this.value1 === 2) this.index = 1
        if(this.value1 === 4) this.index = 2
        if(this.value1 === 3) this.index = 3

        if (this.keyW.isDown || this.keyA.isDown || this.keyS.isDown || this.keyD.isDown 
            || this.m_cursorKeys.left.isDown || this.m_cursorKeys.right.isDown || this.m_cursorKeys.up.isDown || this.m_cursorKeys.down.isDown) {
            if (!this.m_player.m_moving) {
                this.m_player.play(this.charKey_anim[this.index]);
            }
            this.m_player.m_moving = true;
        } 
        else {
            if (this.m_player.m_moving) {
                this.m_player.play(this.charKey_idle[this.index]);
            }
            this.m_player.m_moving = false;
        }

        // vector를 사용해 움직임을 관리할 것입니다.
        // vector = [x좌표 방향, y좌표 방향]입니다.
        // 왼쪽 키가 눌려있을 때는 vector[0] += -1, 오른쪽 키가 눌려있을 때는 vector[0] += 1을 해줍니다.
        // 위/아래 또한 같은 방법으로 벡터를 수정해줍니다.
        let vector = [0, 0];

        // 방향키로 움직이는 것
        // if (this.m_cursorKeys.left.isDown) {
        //     // player.x -= PLAYER_SPEED // 공개영상에서 진행했던 것
        //     vector[0] += -1;
        // } else if (this.m_cursorKeys.right.isDown) {
        //     vector[0] += 1;
        // }

        // if (this.m_cursorKeys.up.isDown) {
        //     vector[1] += -1;
        // } else if (this.m_cursorKeys.down.isDown) {
        //     vector[1] += 1;
        // }

        if (this.m_cursorKeys.left.isDown || this.keyA.isDown) {
            // player.x -= PLAYER_SPEED // 공개영상에서 진행했던 것
            vector[0] += -1;
        } else if (this.m_cursorKeys.right.isDown || this.keyD.isDown) {
            vector[0] += 1;
        }

        if (this.m_cursorKeys.up.isDown || this.keyW.isDown) {
            vector[1] += -1;
        } else if (this.m_cursorKeys.down.isDown || this.keyS.isDown) {
            vector[1] += 1;
        }
        if (this.value1 === 3) this.m_player.move(vector, 6);
        else if (this.value1 === 4) this.m_player.move(vector, 4.5);
        else this.m_player.move(vector);

        // static 공격들은 player가 이동하면 그대로 따라오도록 해줍니다.
        this.m_weaponStatic.children.each(weapon => {
            weapon.move(vector);
        }, this);
    }
}
