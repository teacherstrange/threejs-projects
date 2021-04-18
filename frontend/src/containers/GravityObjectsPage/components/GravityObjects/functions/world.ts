import * as THREE from 'three';

import { box, StackBox } from './box';
import { lights } from './lights';
import { AppObj } from './application';
import { userInput } from './userInput';

export interface GameSetup {
  gameStarted: boolean;
  BOX_HEIGHT: number;
  ORIGINAL_BOX_SIZE: number;
  stack: StackBox[];
}

interface World {
  appObj: AppObj;
}

export const world = ({ appObj }: World) => {
  const container = new THREE.Object3D();

  const gameSetup: GameSetup = {
    gameStarted: false,
    BOX_HEIGHT: 1,
    ORIGINAL_BOX_SIZE: 3,
    stack: [],
  };

  const { addLayer, container: boxContainer } = box({
    gameSetup,
  });

  const { destroy: destroyUserInput } = userInput({
    appObj,
    gameSetup,
    addLayer,
  });

  const { container: lightsContainer } = lights();

  container.matrixAutoUpdate = false;
  container.add(new THREE.AxesHelper());

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
