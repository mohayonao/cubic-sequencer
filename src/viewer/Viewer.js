"use strict";

const THREE = require("three");
const nmap = require("nmap");
const { N } = require("../consts");
const rotations = [
  new Float32Array([ Math.PI/2, -Math.PI/2, 0 ]),
  new Float32Array([-Math.PI/2, 0, Math.PI/2]),
  new Float32Array([ 0, 0, 0 ]),
];
const VIEW_ANGLE = 30;

class Viewer {
  constructor(elem) {
    this.elem = elem;
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
    this.camera.position.y = Math.cos(VIEW_ANGLE / 180 * 2 * Math.PI) * 3000; // 1500;
    this.camera.position.z = Math.sin(VIEW_ANGLE / 180 * 2 * Math.PI) * 3000; // 2600;
    this.camera.lookAt({ x: 0, y: 0, z: 0 });

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.elem.offsetWidth, this.elem.offsetHeight);
    this.renderer.setClearColor(0x2c3e50);

    this._scheds = [];
    this._lookAt = [ [], [], [] ];
    this._state = null;
    this._updated = false;
    this._rotation = rotations[0];

    this.elem.appendChild(this.renderer.domElement);
  }

  sched(data) {
    this._scheds.push(data);
  }

  render(t) {
    this.applyScheds(t);
    this.applyRotation();

    if (this._updated) {
      this._updated = false;
      this.renderer.render(this.scene, this.camera);
    }
  }

  applyScheds(t) {
    let i = 0;

    for (let imax = this._scheds.length; i < imax; i++) {
      const sched = this._scheds[i];

      if (t < sched.platbackTime) {
        break;
      }

      this._lookAt[sched.track].forEach((mesh) => {
        mesh.userData.focus -= 1;
        if (mesh.userData.focus === 0) {
          mesh.scale.setScalar(1);
        }
      });
      this._lookAt[sched.track] = pluckRow(this.matrix, this._state, sched.track, sched.index).map((mesh) => {
        mesh.userData.focus += 1;
        mesh.scale.setScalar(1.75);
        return mesh;
      });

      this._updated = true;
    }
    this._shceds = this._scheds.splice(0, i);
  }

  applyRotation() {
    const x0 = this.group.rotation.x;
    const y0 = this.group.rotation.y;
    const z0 = this.group.rotation.z;
    const x1 = this._rotation[0];
    const y1 = this._rotation[1];
    const z1 = this._rotation[2];

    if (!closeTo(x0, x1) || !closeTo(y0, y1) || !closeTo(z0, z1)) {
      const x = x0 * 0.9 + x1 * 0.1;
      const y = y0 * 0.9 + y1 * 0.1;
      const z = z0 * 0.9 + z1 * 0.1;

      this.group.rotation.set(x, y, z);
      this._updated = true;
    }
  }

  update(state) {
    const matrix = state.matrix;
    const selected = state.track.selected;
    const colors = [ 0, 1, 2 ].map(i => new THREE.Color(state.track.state[i].color));

    this._state = state;
    this._rotation = rotations[selected];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
          let color = new THREE.Color(0, 0, 0);
          let blend = 0;
          let opacity = matrix[i][j][k] ? 0.35 : 0.05;

          if (i === state.track.state[0].scene && k <= state.track.state[0].loopLength) {
            color.add(colors[0]);
            blend += 1;
            opacity *= 2;
            if (selected === 0) {
              opacity += 0.2;
            }
          }
          if (j === state.track.state[1].scene && i <= state.track.state[1].loopLength) {
            color.add(colors[1]);
            blend += 1;
            opacity *= 2;
            if (selected === 1) {
              opacity += 0.2;
            }
          }
          if (k === state.track.state[2].scene && j <= state.track.state[2].loopLength) {
            color.add(colors[2]);
            blend += 1;
            opacity *= 2;
            if (selected === 2) {
              opacity += 0.2;
            }
          }

          if (blend === 0) {
            color.set(0x7f8c8d);
          }

          this.matrix[i][j][k].material.color = color;
          this.matrix[i][j][k].material.opacity = opacity;
        }
      }
    }

    this._updated = true;
  }
}

function closeTo(a, b) {
  return Math.abs(a - b) < 1e-6;
}

function pluckRow(matrix, state, axis, index) {
  const $ = state.track.state[axis].scene;

  switch (axis) {
  case 0: return nmap(N, (_, i) => matrix[$][i][index]);
  case 1: return nmap(N, (_, i) => matrix[index][$][i]);
  case 2: return nmap(N, (_, i) => matrix[i][index][$]);
  }

  return [];
}

module.exports = Viewer;
