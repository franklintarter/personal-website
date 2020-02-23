/* eslint-disable no-undef */
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export default function AnimatedAlgorithm({ element }) {
  const antialias = window.devicePixelRatio === 1;

  this.renderer = new THREE.WebGLRenderer({
    antialias
  });

  this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

  this.element = element;
  this.scene = new THREE.Scene();

  element.appendChild(this.renderer.domElement);

  const { width, height } = this.getSize();

  this.scene.background = new THREE.Color(0x6a6392);
  this.renderer.setSize(width, height);

  this.camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
    1,
    1000
  );

  this.camera = new THREE.PerspectiveCamera(60, width / height, 10, 100000);

  this.camera.position.z = 3000;
  this.camera.position.y = -750;
  this.camera.position.x = 300;

  const light2 = new THREE.AmbientLight(0x404040, 0.95); // soft white light
  const light = new THREE.DirectionalLight(0xffffff, 0.95); // soft white light

  light.position.set(100, 100, 400);
  light2.position.set(50, 500, 400);

  this.scene.add(light);
  this.scene.add(light2);

  this.meshes = [];

  this.resize = this.resize.bind(this);
  this.tick = this.tick.bind(this);

  this.resize();
  this.tick();

  this.paused = false;

  window.addEventListener("resize", this.resize, false);
}

AnimatedAlgorithm.prototype = {
  tick() {
    this.render();
    if (!this.paused) {
      requestAnimationFrame(this.tick);
    }
  },
  render() {
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  },
  getSize() {
    const width = window.innerWidth > 672 ? 672 : window.innerWidth;
    const height = width / 1.5;
    return { width, height };
  },
  resize() {
    const { width, height } = this.getSize();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  },
  dispose() {
    this.element.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  },
  setMesh(meshes) {
    this.meshes.forEach(m => this.scene.remove(m));
    this.meshes = meshes;
    this.meshes.forEach(m => {
      this.scene.add(m);
    });
  },
  setCameraPosition(pos) {
    this.camera.position.set(pos.x, pos.y, pos.z);
  },
  pause() {
    this.paused = true;
  },
  play() {
    this.paused = false;
    this.tick();
  }
};
