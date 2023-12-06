import Phaser from "phaser";

// 몹마다 아이템을 먹으면 상승하는 경험치와 아이템의 색상을 다르게 해줄 것인데,
// 이를 맵핑할 객체를 만들어줍니다.
const ITEM_PROPERTY = {
    'mob1': {
        exp: 10,
    },
    'mob2': {
        exp: 15,
    },
    'mob3': {
        exp: 20,
    },
    'mob4': {
        exp: 25,
    },
    'mob5': {
        exp: 30,
    },
    'mob6': {
        exp: 35,
    },
    'mob7': {
        exp: 25,
    },
    'mob8': {
        exp: 35,
    },
    'mob9': {
        exp: 80,
    },
    'mob10': {
        exp: 80,
    },
    'boss1': {
        exp: 500,
    },
    'boss2': {
        exp: 500,
    },
};

export default class ExpUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, mob) {
        const x = mob.x;
        const y = mob.y;

        // 몹을 scene과 물리엔진에 추가해주는 부분입니다.
        super(scene, x, y, "exp-up");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        // 몹 종류에 따라 경험치 상승량, 아이템 이미지를 다르게 설정합니다.
        // mob.texture.key는 해당 몹 이미지를 LoadingScene에서 load했던 key와 동일합니다.
        this.m_exp = ITEM_PROPERTY[mob.texture.key].exp;
        this.play('exp');

        // 크기, depth, 물리 영역을 지정해줍니다.
        this.scale = 0.8;
        this.setDepth(7);
        this.setBodySize(20, 20);
    }
}