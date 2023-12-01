// 배경화면 관리 스크립트

export default class BackgroundManager {
    constructor(scene) {
        this.scene = scene;
        this.backgrounds = [];
        this.Index = 0;
        this.bgm = [];
        this.selectScene = null;
        this.selectMusic = null;
    }

    removeAll() {
        this.bgm[this.Index].stop();
    }

    add(bgImageKey, bgmKey, scale = 1, x, y) {
        const bg = this.scene.add.image(0, 0, bgImageKey).setScale(scale);
        bg.setOrigin(x, y);
        bg.setVisible(false);
        this.backgrounds.push(bg);

        const music = this.scene.sound.add(bgmKey, { loop: true }); // loop 옵션을 true로 설정하여 무한반복
        music.play();
        music.pause();
        this.bgm.push(music);
    }

    show(index) {
        this.backgrounds[this.Index].setVisible(false);
        this.bgm[this.Index].stop();

        this.Index = index;
        this.backgrounds[this.Index].setVisible(true);
        this.bgm[this.Index].play();
    }

    next() {
        const nextIndex = (this.Index + 1) % this.backgrounds.length;
        this.show(nextIndex);
    }

    prev() {
        const prevIndex = (this.Index - 1 + this.backgrounds.length) % this.backgrounds.length;
        this.show(prevIndex);
    }

    Select() {
        this.selectScene = this.backgrounds[this.Index];
        this.selectMusic = this.bgm[this.Index];
    }

    get_background() {
        return this.selectScene
    }

    get_Music() {
        return this.selectMusic
    }

}