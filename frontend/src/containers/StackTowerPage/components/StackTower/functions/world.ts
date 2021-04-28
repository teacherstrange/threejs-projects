import * as THREE from 'three';

import { box, StackBox } from './box';
import { lights } from './lights';
import { AppObj, ApplicationProps } from './application';
import { userInput } from './userInput';
import { overhangBox } from './overhangBox';
import { physics } from './physics';
import { distortionPlane } from './distortionPlane';

export interface GameSetup {
  gameStarted: boolean;
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
    gameStarted: appProps.isStarted,
    BOX_HEIGHT: 0.8,
    ORIGINAL_BOX_SIZE: 3,
    stack: [],
    overhangs: [],
  };

  const { cannonWorld } = physics({ appObj });

  const { destroyBoxes, generateBox, addLayer, container: boxContainer } = box({
    gameSetup,
    cannonWorld,
    appObj,
  });

  const { addOverhang } = overhangBox({ generateBox, gameSetup });

  const { destroy: destroyUserInput } = userInput({
    destroyBoxes,
    cannonWorld,
    appObj,
    appProps,
    gameSetup,
    addLayer,
    addOverhang,
  });

  const { container: lightsContainer } = lights();

  const { container: distortionPlaneContainer } = distortionPlane({ appObj });

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
  };
};
