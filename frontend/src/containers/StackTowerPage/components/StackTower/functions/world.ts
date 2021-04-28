import * as THREE from 'three';

import { box, StackBox } from './box';
import { lights } from './lights';
import { AppObj, ApplicationProps } from './application';
import { userInput } from './userInput';
import { overhangBox } from './overhangBox';
import { physics } from './physics';
import { distortionPlane } from './distortionPlane';
import { GameState } from '../StackTower';

export interface GameSetup {
  gameState: GameState;
  BOX_HEIGHT: number;
  ORIGINAL_BOX_SIZE: number;
  stack: StackBox[];
  overhangs: StackBox[];
}

interface World {
  appObj: AppObj;
  appProps: ApplicationProps;
}

export const world = ({ appProps, appObj }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const gameSetup: GameSetup = {
    gameState: appProps.gameState,
    BOX_HEIGHT: 0.8,
    ORIGINAL_BOX_SIZE: 3,
    stack: [],
    overhangs: [],
  };

  const { cannonWorld } = physics({ appObj });

  const {
    animateProgress: animatePlaneProgress,
    container: distortionPlaneContainer,
  } = distortionPlane({ appObj });

  const { destroyBoxes, generateBox, addLayer, container: boxContainer } = box({
    gameSetup,
    cannonWorld,
    appObj,
  });

  const { addOverhang } = overhangBox({ generateBox, gameSetup });

  const { initGame, destroy: destroyUserInput } = userInput({
    animatePlaneProgress,
    destroyBoxes,
    cannonWorld,
    appObj,
    appProps,
    gameSetup,
    addLayer,
    addOverhang,
  });

  const { container: lightsContainer } = lights();

  // container.add(new THREE.AxesHelper());

  container.add(boxContainer);
  container.add(lightsContainer);
  container.add(distortionPlaneContainer);

  const destroy = () => {
    destroyUserInput();
  };

  return {
    container,
    destroy,
    initGame,
  };
};
