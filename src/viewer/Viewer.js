"use strict";

const THREE = require("three");
const nmap = require("nmap");
const { N, TRACK_COLORS } = require("../constants");

const ROTATIONS = [
  new THREE.Vector3( Math.PI/2, -Math.PI/2, 0),
  new THREE.Vector3(-Math.PI/2, 0, Math.PI/2),
  new THREE.Vector3(0, 0, 0),
];
const VIEW_ANGLE = 30;

class Viewer {
  constructor(elem, actions) {
    this.elem = elem;
    this.actions = actions;
    this.scene = new THREE.Scene();

    this.group = new THREE.Object3D();
    this.matrix = nmap(N, (_, y) => nmap(N, (_, x) => nmap(N, (_, z) => {
      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshBasicMaterial({ transparent: true });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = ((      x) - (N/2)) * 200 + 100;
      mesh.position.y = (((N-1)-y) - (N/2)) * 200 + 100;
      mesh.position.z = (((N-1)-z) - (N/2)) * 200 + 100;
      mesh.userData.focus = 0;
      this.group.add(mesh);

      return mesh;
    })));
    this.scene.add(this.group);

    this.camera = new THREE.PerspectiveCamera(60, 1, 1, 5000);
    this.camera.position.y = Math.cos(VIEW_ANGLE / 180 * 2 * Math.PI) * 3000;
    this.camera.position.z = Math.sin(VIEW_ANGLE / 180 * 2 * Math.PI) * 3000;
    this.camera.lookAt({ x: 0, y: 0, z: 0 });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.elem.offsetWidth, this.elem.offsetHeight);
    this.renderer.setClearColor(0x2c3e50);

    this._colors = TRACK_COLORS.map(color => new THREE.Color(color));
    this._state = null;
    this._updated = false;
    this._rotation = ROTATIONS[0];

    this.elem.appendChild(this.renderer.domElement);
  }

  render() {
    this.applyRotation();
    if (this._updated) {
      this.renderer.render(this.scene, this.camera);
      this._updated = false;
    }
  }

  applyRotation() {
    if (closeTo(this.group.rotation, this._rotation)) {
      return;
    }
    this.group.rotation.set(
      this.group.rotation.x * 0.9 + this._rotation.x * 0.1,
      this.group.rotation.y * 0.9 + this._rotation.y * 0.1,
      this.group.rotation.z * 0.9 + this._rotation.z * 0.1
    );
    this._updated = true;
  }

  setState(state) {
    const master = state.master;
    const matrix = state.matrix.data;
    const selected = master.track;
    const colors = this._colors;

    this._state = state;
    this._rotation = ROTATIONS[selected];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
          const mesh = this.matrix[i][j][k];

          let color = new THREE.Color(0, 0, 0);
          let opacity = matrix[i][j][k] ? 0.35 : 0.05;
          let scale = 1;
          let blend = 0;

          if (i === state.track[0].scene && k <= state.track[0].loopLength) {
            color.add(colors[0]);
            blend += 1;
            opacity *= 2;
            if (selected === 0) {
              opacity += 0.2;
            }
            if (k === state.ticks[0]) {
              scale = 1.75;
            }
          }
          if (j === state.track[1].scene && i <= state.track[1].loopLength) {
            color.add(colors[1]);
            blend += 1;
            opacity *= 2;
            if (selected === 1) {
              opacity += 0.2;
            }
            if (i === state.ticks[1]) {
              scale = 1.75;
            }
          }
          if (k === state.track[2].scene && j <= state.track[2].loopLength) {
            color.add(colors[2]);
            blend += 1;
            opacity *= 2;
            if (selected === 2) {
              opacity += 0.2;
            }
            if (j === state.ticks[2]) {
              scale = 1.75;
            }
          }

          if (blend === 0) {
            color.set(0x7f8c8d);
          }

          mesh.material.color = color;
          mesh.material.opacity = opacity;
          mesh.scale.setScalar(scale);
        }
      }
    }

    this._updated = true;
  }
}

function closeTo(a, b) {
  return (Math.abs(a.x - b.x) < 1e-6) && (Math.abs(a.z - b.z) < 1e-6) && (Math.abs(a.z - b.z) < 1e-6);
}

module.exports = Viewer;
