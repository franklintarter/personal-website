/* eslint-disable class-methods-use-this */
import TWEEN from "@tweenjs/tween.js";
import * as THREE from "three";
import { colors } from "./constants";

export default class AnimationRun {
  constructor(threeRoot, opts) {
    this.threeRoot = threeRoot;
    this.opts = opts;
    this.cancellationToken = { cancelled: false };
  }

  createAnimation(stepSubscriber) {
    const ds = this.createDataSet(this.opts);
    const { meshes, steps } = this.runAlgorithm(ds);
    const cameraPosition = this.calculateCameraPosition(this.opts);
    const runAnimation = this.reduceAnimationPromises(steps, stepSubscriber);
    this.threeRoot.setCameraPosition(cameraPosition);
    this.threeRoot.setMesh(meshes);
    return runAnimation;
  }

  setSpeed(speed) {
    let val; // = 310 - speed * (21 + speed) + 10
    switch (speed) {
      case 10:
        val = 15;
        break;
      case 9:
        val = 30;
        break;
      case 8:
        val = 40;
        break;
      case 7:
        val = 50;
        break;
      case 6:
        val = 60;
        break;
      case 5:
        val = 70;
        break;
      case 4:
        val = 80;
        break;
      case 3:
        val = 90;
        break;
      case 2:
        val = 120;
        break;
      case 1:
        val = 150;
        break;
      default:
        val = 300;
    }
    console.log(val);
    this.SPEED = val;
  }

  runAlgorithm(dataSet) {
    throw new Error("Not Implemented.");
  }

  createDataSet(opts) {
    throw new Error("Not Implemented.");
  }

  reduceSteps() {
    throw new Error("Not Implemented.");
  }

  calculateCameraPosition = opts => {
    throw new Error("Not Implemented.");
  };

  dispose() {
    this.cancellationToken.cancelled = true;
  }

  doOrCancel = async step => {
    if (this.cancellationToken.cancelled) {
      return;
    }
    await step();
  };

  SPEED = 20;

  DEFAULT_Z = 0;

  CUBE_WIDTH = 20;

  CUBE_HEIGHT = 20;

  CUBE_SPACING = 20;

  CUBE_DEPTH = 20;

  CONTAINER_WIDTH = 140;

  LETTER_HEIGHT = 60;

  LETTER_Y_SPACING = 10;

  ROW_SPACING_Y = this.LETTER_HEIGHT + this.LETTER_Y_SPACING;

  ROW_SPACING_X = 160;

  reduceAnimationPromises = (steps, stepSubscriber) => () => {
    steps.reduce(async (previousPromise, step) => {
      await previousPromise;
      stepSubscriber(step.name);
      return this.doOrCancel(() => this.reduceSteps(step));
    }, Promise.resolve());
  };

  animateVector3 = (vectorToAnimate, target, options = {}) => {
    return new Promise(resolve => {
      const to = target || THREE.Vector3();
      const easing = options.easing || TWEEN.Easing.Sinusoidal.InOut;
      const duration = options.duration || this.SPEED;
      const tweenVector3 = new TWEEN.Tween(vectorToAnimate)
        .to({ x: to.x, y: to.y, z: to.z }, duration)
        .easing(easing)
        .onUpdate(d => {
          if (options.update) {
            options.update(d);
          }
        })
        .onComplete(() => {
          if (options.callback) options.callback();
          resolve();
        });
      tweenVector3.start();
    });
  };

  stepWait = (amount = 1) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.SPEED * amount);
    });
  };

  createRect = (value, index) => {
    const geometry = new THREE.BoxBufferGeometry(
      this.CUBE_WIDTH,
      value * this.CUBE_HEIGHT,
      this.CUBE_DEPTH
    );
    const material = new THREE.MeshLambertMaterial({ color: colors.orange });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      index * (this.CUBE_WIDTH + this.CUBE_SPACING),
      0,
      this.DEFAULT_Z
    );
    return cube;
  };

  stepWait = (amount = 1) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, this.SPEED * amount);
    });
  };

  bounceBoth = async (a, b) => {
    const initialA = a.clone();
    const initialB = b.clone();
    await Promise.all([
      this.animateVector3(a, a.clone().setY(a.y + 20)),
      this.animateVector3(b, b.clone().setY(b.y + 20))
    ]);
    await this.stepWait();
    await this.stepWait();
    await Promise.all([
      this.animateVector3(a, initialA),
      this.animateVector3(b, initialB)
    ]);
  };

  staggerDepth = async (a, b) => {
    await Promise.all([
      this.animateVector3(a, a.clone().setZ(1)),
      this.animateVector3(b, b.clone().setZ(-1))
    ]);
  };

  flattenDepth = async (a, b) => {
    await Promise.all([
      this.animateVector3(a, a.clone().setZ(0)),
      this.animateVector3(b, b.clone().setZ(0))
    ]);
  };

  sorted = async ({ meshes }) => {
    await this.stepWait();
    meshes.forEach(m => {
      m.material.color.setHex(colors.green);
    });
  };

  swap = async ({ a, b }) => {
    await this.bounceBoth(a.mesh.position, b.mesh.position);
    await this.staggerDepth(a.mesh.position, b.mesh.position);
    await this.swapXPositions(a.mesh.position, b.mesh.position);
    await this.flattenDepth(a.mesh.position, b.mesh.position);
    await this.stepWait();
  };

  noSwap = async ({ a, b }) => {
    await this.stepWait();
    await this.stepWait();
    await this.bounceBoth(a.mesh.position, b.mesh.position);
    await this.stepWait();
    await this.stepWait();
    await this.stepWait();
  };

  swapXPositions = async (a, b) => {
    const aXDest = b.clone().x;
    const bXDest = a.clone().x;
    await Promise.all([
      this.animateVector3(a, a.clone().setX(aXDest), {
        duration: this.SPEED * 3
      }),
      this.animateVector3(b, b.clone().setX(bXDest), {
        duration: this.SPEED * 3
      })
    ]);
  };
}
