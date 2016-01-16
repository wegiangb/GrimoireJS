import IMaterialConfigureArgument = require("../../Materials/Base/IMaterialConfigureArgument");
import BasicMaterial = require("../../Materials/Base/BasicMaterial");
import PrimitiveRegistory = require("../../Geometries/Base/PrimitiveRegistory");
import JThreeContext = require("../../../JThreeContext");
import ContextComponents = require("../../../ContextComponents");
import LightBase = require("./../LightBase");
import Scene = require("../../Scene");

/**
 * Provides area light feature.
 * Parameters:
 * X:TYPE ID ,XYZ:COLOR
 */
class SceneLight extends LightBase {
  constructor(scene: Scene) {
    super(scene);
    this.Geometry = JThreeContext.getContextComponent<PrimitiveRegistory>(ContextComponents.PrimitiveRegistory).getPrimitive("quad");
    const material = new BasicMaterial(require("../../Materials/BuiltIn/Light/Diffuse/SceneLight.html"));
    material.on("apply", (matArg: IMaterialConfigureArgument) => {
      material.materialVariables = {
        lightColor: this.Color.toVector().multiplyWith(this.intensity)
      };
    });
    this.addMaterial(material);
  }

  public intensity: number = 1.0;

}

export = SceneLight;