import Scene = require('../../Scene');
import LightBase = require('./../LightBase');
import LightTypeDeclaration = require("./../LightTypeDeclaration");
import RendererBase = require("../../Renderers/RendererBase");
import Matrix = require("../../../Math/Matrix");
import Vector3 = require("../../../Math/Vector3");
/**
 * Point Light
 * Parameter order
 * 0:X:TypeID YZW:Color.RGB*Intencity
 * 1:XYZ:POSITION.XYZ W: UNUSED (0)
 * 2:X:Distance Y:Decay
 */
class SpotLight extends LightBase
{
	constructor(scene:Scene)
	{
		super(scene);
	}

	private distance:number=0.0;

	/**
	 * The distance of the light where the intensity is 0. When distance is 0, then the distance is endless.
	 */
	public get Distance():number
	{
		return this.distance;
	}

	/**
	 * The distance of the light where the intensity is 0. When distance is 0, then the distance is endless.
	 */
	public set Distance(num:number)
	{
		this.distance=num;
	}

	private intensity:number=1.0;

	/**
	 * Light's intensity
	 */
	public get Intensity():number
	{
		return this.intensity;
	}

	/**
	 * Light's intensity
	 */
	public set Intensity(intensity:number)
	{
		this.intensity=intensity;
	}

	private decay:number=1;

	public get Decay():number
	{
		return this.decay;
	}

	public set Decay(d:number)
	{
		this.decay=d;
	}

	public get LightType():string
	{
		return "jthree.lights.spotlight";
    }

    public getParameters(renderer:RendererBase): number[]
    {
			　var pos = this.Position;
			  pos = Matrix.transformPoint(renderer.Camera.ViewMatrix,pos);
        return [this.Color.R * this.Intensity, this.Color.G * this.Intensity, this.Color.B * this.Intensity,
            pos.X,pos.Y,pos.Z, 0,
        this.Distance,this.Decay];
    }

    public static get TypeDefinition(): LightTypeDeclaration {
        return {
            typeName: "jthree.lights.spotlight",
            requiredParamCount: 3,
            shaderfuncName: "calcSpotLight",
            diffuseFragmentCode: require('../../Shaders/Light/Spot/DiffuseChunk.glsl'),
            specularFragmentCode:require("../../Shaders/Light/Spot/SpecularChunk.glsl")
        };
    }
}

export = SpotLight;