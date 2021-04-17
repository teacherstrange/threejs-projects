import * as THREE from 'three';

import { box } from './box';
import { lights } from './lights';
import { AppObj } from './application';

interface World {
  appObj: AppObj;
}

export const world = (props: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;
  let axis: THREE.AxesHelper;

  const setAxes = () => {
    axis = new THREE.AxesHelper();
    container.add(axis);
  };

  const setBox = () => {
    const { generateBox, container: boxContainer } = box();
    generateBox();
    container.add(boxContainer);
  };

  const setLights = () => {
    const { container: lightsContainer } = lights();
    container.add(lightsContainer);
  };

  // setPhysics();
  setLights();
  setAxes();
  setBox();

  return {
    container,
  };
};
