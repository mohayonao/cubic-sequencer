import nmap from "nmap";
import { N } from "../constants";

export function pluck(matrix, axis) {
  switch (axis) {
  case 0: return nmap(N, (_, i) => nmap(N, (_, j) => nmap(N, (_, k) => matrix[i][j][k])));
  case 1: return nmap(N, (_, i) => nmap(N, (_, j) => nmap(N, (_, k) => matrix[k][i][j])));
  case 2: return nmap(N, (_, i) => nmap(N, (_, j) => nmap(N, (_, k) => matrix[j][k][i])));
  }
}

export function to3DIndex(track, scene, row, col) {
  switch (track) {
  case 0: return [ scene, row, col ];
  case 1: return [ col, scene, row ];
  case 2: return [ row, col, scene ];
  }
}
