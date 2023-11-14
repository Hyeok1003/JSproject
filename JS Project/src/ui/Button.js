// 텍스트 기반 버튼
import Phaser from "phaser";

// export default class Button extends Phaser.GameObjects.Text {
//     constructor(x, y, label, scene, callback) {
//         super(scene, x, y, label);

//         // setOrigin(0.5) -> 추가하는 위치(x, y)의 가운데에 버튼이 위치하도록 합니다.
//         this.setOrigin(0.5)
//             // 글자와 테두리 사이의 여백을 설정합니다.
//             .setPadding(10)
//             // 버튼의 색과 글씨 크기를 설정합니다.
//             .setStyle({ backgroundColor: "#8aacc8", fontSize: 20 })
//             // 버튼이 커서와 상호작용하도록 만들어줍니다.
//             .setInteractive({ useHandCursor: true })
//             // 누르면 callback으로 전달받은 함수를 실행합니다.
//             .on("pointerdown", () => callback())
//             // 커서가 올라가있을 때 글씨를 검은색으로 설정합니다.
//             .on("pointerover", () => this.setStyle({ fill: "#000" }))
//             // 커서가 올라가있지 않을 때 글씨를 흰색으로 설정합니다.
//             .on("pointerout", () => this.setStyle({ fill: "#fff" }));

//         // 화면에 버튼을 추가합니다.
//         scene.add.existing(this);
//     }
// }

//이미지 기반 버튼

export default class ImageButton extends Phaser.GameObjects.Image {
    constructor(x, y, key, scene, callback, scale = 1) {
        super(scene, x, y, key);

        // 이미지의 중심을 기준으로 설정
        this.setOrigin(0.5)
            // 이미지를 클릭 가능하게 설정
            .setInteractive({ useHandCursor: true })
            // 클릭 이벤트 핸들러
            .on("pointerdown", () => callback())
            // 호버 이벤트 핸들러
            .on("pointerover", () => this.setTint(0x8aacc8))
            // 호버가 끝날 때 이벤트 핸들러
            .on("pointerout", () => this.clearTint())
            // 이미지의 크기 조절
            .setScale(scale);

        // 화면에 이미지를 추가
        scene.add.existing(this);
    }
}