import * as THREE from 'three';

import { box } from './box';
import { lights } from './lights';
import { AppObj } from './application';
import { userInput } from './userInput';

interface World {
  appObj: AppObj;
}

export const world = (props: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;
  container.add(new THREE.AxesHelper());
  const { destroy: destroyUserInput, gameStarted } = userInput();
  const { stack, addLayer, generateBox, container: boxContainer } = box();
  const { container: lightsContainer } = lights();

  generateBox(0, 0, 0, 2, 2);
  container.add(boxContainer);
  container.add(lightsContainer);

  const destroy = () => {
    destroyUserInput();
  };

  return {
    container,
    destroy,
  };
};
