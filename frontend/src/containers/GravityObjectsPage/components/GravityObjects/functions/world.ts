import * as THREE from 'three';

import { box } from './box';
import { lights } from './lights';
import { AppObj } from './application';
import { userInput } from './userInput';

interface World {
  appObj: AppObj;
}

export const world = ({ appObj }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;
  container.add(new THREE.AxesHelper());
  const {
    BOX_HEIGHT,
    stack,
    addLayer,
    generateBox,
    container: boxContainer,
  } = box();
  const { destroy: destroyUserInput, gameStarted } = userInput({
    appObj,
    stack,
    BOX_HEIGHT,
    addLayer,
  });

  const { container: lightsContainer } = lights();

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
