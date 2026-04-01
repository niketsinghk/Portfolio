import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    const encryptedBlob = await decryptFile(
      "/models/character.enc",
      "Character3D#@"
    );
    const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

    try {
      const gltf = await new Promise<GLTF>((resolve, reject) => {
        loader.load(
          blobUrl,
          (loadedGltf) => resolve(loadedGltf),
          undefined,
          (error) => reject(error)
        );
      });

      const character = gltf.scene;
      await renderer.compileAsync(character, camera, scene);
      character.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
        }
      });

      setCharTimeline(character, camera);
      setAllTimeline();
      character.getObjectByName("footR")?.position.setY(3.36);
      character.getObjectByName("footL")?.position.setY(3.36);

      return gltf;
    } catch (error) {
      console.error("Error loading GLTF model:", error);
      throw error;
    } finally {
      URL.revokeObjectURL(blobUrl);
      dracoLoader.dispose();
    }
  };

  return { loadCharacter };
};

export default setCharacter;
