import * as THREE from 'three';

export default class UserInput {
  touchMoveStartX = 0;
  touchMoveStartY = 0;
  touchMoveLastX = 0;
  touchMoveLastY = 0;
  touchMoveDistance = 0;
  bounds: any;
  camera: any;
  letters: any;
  currentLetter: any;

  raycaster = new THREE.Raycaster();

  isMoving = false;

  constructor(props) {
    this.bounds = props.bounds;
    this.camera = props.camera;
    this.letters = props.letters;
    this.currentLetter = null;
    this.setEventListeners();
  }

  setEventListeners = () => {
    //TODO: add dispose later
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = event => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    const dx = x - this.touchMoveLastX;
    const dy = y - this.touchMoveLastY;
    this.touchMoveDistance += Math.sqrt(dx * dx + dy * dy);
    this.touchMoveLastX = x;
    this.touchMoveLastY = y;

    if (this.isMoving) {
      const mouse = new THREE.Vector2(
        ((this.touchMoveLastX - this.bounds.x) / this.bounds.width) * 2 - 1,
        -((this.touchMoveLastY - this.bounds.y) / this.bounds.height) * 2 + 1,
      );

      // console.log(mouse);

      this.currentLetter.performMove(mouse);
    }
  };

  onMouseUp = () => {
    this.isMoving = false;
  };

  startMoveObject = (obj, startPoint) => {
    this.isMoving = true;

    this.currentLetter = obj;
    this.currentLetter.onStartMove(startPoint);
  };

  onMouseDown = event => {
    this.touchMoveStartX = event.clientX;
    this.touchMoveStartY = event.clientY;
    this.touchMoveLastY = this.touchMoveStartY;
    this.touchMoveDistance = 0;

    this.performRaycast(
      this.touchMoveStartX,
      this.touchMoveStartY,
      'onStartMove',
    );
  };

  performRaycast = (x: number, y: number, fnToCallIfHit?: string) => {
    const mouse = new THREE.Vector2(
      ((x - this.bounds.x) / this.bounds.width) * 2 - 1,
      -((y - this.bounds.y) / this.bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(mouse, this.camera);

    let letterContainers = [];
    this.letters.forEach(letter => {
      letterContainers = letterContainers.concat(letter.container);
    });
    const intersects = this.raycaster.intersectObjects(letterContainers, true);

    if (intersects.length !== 0) {
      for (let i = 0; i < this.letters.length; ++i) {
        if (
          this.letters[i].container.children[0].uuid ===
          intersects[0].object.uuid
        ) {
          this.startMoveObject(this.letters[i], intersects[0].point);
        }
      }
    }
  };
}
