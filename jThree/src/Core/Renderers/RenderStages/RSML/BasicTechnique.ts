import SceneObject = require("../../../SceneObject");
import FrameBufferAttachmentType = require("../../../../Wrapper/FrameBufferAttachmentType");
import FBO = require("../../../Resources/FBO/FBO");
import JThreeObjectWithID = require("../../../../Base/JThreeObjectWithID");
import ContextComponents = require("../../../../ContextComponents");
import ResourceManager = require("../../../ResourceManager");
import JThreeContext = require("../../../../JThreeContext");
import FBOWrapper = require("../../../Resources/FBO/FBOWrapper");
import RenderStageBase = require("../RenderStageBase");
import ResolvedChainInfo = require("../../ResolvedChainInfo");
import Scene = require("../../../Scene");
class BasicTechnique extends JThreeObjectWithID
{
  private _techniqueDocument:Element;

  private _target:string;

  private _depthConfigureElement:Element;

  private _fboConfigureElement:Element;

  private _colorConfigureElements:NodeListOf<Element>;

  private _techniqueType:string;

  protected _renderStage:RenderStageBase;

  protected get _gl():WebGLRenderingContext
  {
    return this._renderStage.GL;
  }

  constructor(renderStage:RenderStageBase,technique:Element)
  {
    super();
    this._renderStage = renderStage;
    this._techniqueDocument = technique;
    this._target = this._techniqueDocument.getAttribute("target");
    if(!this._target)this._target = "scene";
    this._fboConfigureElement = this._techniqueDocument.getElementsByTagName("fbo").item(0);
    this._depthConfigureElement = this._fboConfigureElement.getElementsByTagName("rbo").item(0);
    this._colorConfigureElements = this._fboConfigureElement.getElementsByTagName("color");
    this._techniqueType = this._techniqueDocument.getAttribute("type");
  }

  public get Target():string
  {
    return this._target;
  }

  public preTechnique(scene:Scene,texs:ResolvedChainInfo):void
  {
    this._applyDepthConfiguration(scene,texs);
  }

  public render(scene: Scene, object: SceneObject, techniqueIndex: number, texs: ResolvedChainInfo):void
  {
    switch(this._techniqueType)
    {
      case "material":
        const materialGroup = this._techniqueDocument.getAttribute("materialGroup");
        this._renderStage.drawForMaterials(scene,object,techniqueIndex,texs,materialGroup);
    }
  }

  protected __fbo:FBO;

  protected __fboInitialized:boolean = false;

  protected __initializeFBO(texs:ResolvedChainInfo):void
  {
    this.__fboInitialized = true;
    const rm = JThreeContext.getContextComponent<ResourceManager>(ContextComponents.ResourceManager);
    this.__fbo = rm.createFBO("jthree.technique."+this.ID);
    const fboWrapper = this.__fbo.getForContext(this._renderStage.Renderer.ContextManager);
    this._attachRBOConfigure(fboWrapper);
    this._attachTextureConfigure(fboWrapper,texs);
  }

  private _attachTextureConfigure(fboWrapper:FBOWrapper,texs:ResolvedChainInfo)
  {
    const colorConfigure = this._colorConfigureElements.item(0);
    let register = +colorConfigure.getAttribute("register");
    if(!register)register = 0;
    const name = colorConfigure.getAttribute("name");
    if(!name)console.error("texture name was not provided!");
    const colorBuffer = texs[name];
    fboWrapper.attachTexture(FrameBufferAttachmentType.ColorAttachment0,colorBuffer);
  }

  private _attachRBOConfigure(fboWrapper:FBOWrapper)
  {
    if(!this._depthConfigureElement)
    {//When there was no rbo tag in fbo tag.
      fboWrapper.attachRBO(FrameBufferAttachmentType.DepthStencilAttachment,null);//Unbind render buffer
    }else
    {
      const attachmentType = this._depthConfigureElement.getAttribute("type");
      const target = this._depthConfigureElement.getAttribute("target");
      let targetBuffer;
      if(!target)
      {
        targetBuffer = this._renderStage.DefaultRBO;
      }
      switch(attachmentType)
      {
        case "depth":
          fboWrapper.attachRBO(FrameBufferAttachmentType.DepthAttachment,targetBuffer);
          break;
        case "stencil":
          fboWrapper.attachRBO(FrameBufferAttachmentType.StencilAttachment,targetBuffer);
          break;
        default:
          fboWrapper.attachRBO(FrameBufferAttachmentType.DepthStencilAttachment,targetBuffer);
      }
    }
  }

  private _applyDepthConfiguration(scene:Scene,texs:ResolvedChainInfo):void
  {
    if(!this.__fboInitialized&&this._fboConfigureElement)this.__initializeFBO(texs);
    if(!this._fboConfigureElement)
    {
      //if there was no fbo configuration, use screen buffer as default
      this._gl.bindFramebuffer(this._gl.FRAMEBUFFER,null);
    }else
    {
      this.__fbo.getForContext(this._renderStage.Renderer.ContextManager).bind();
      this._clearBuffers();
    }
  }

  private _clearBuffers():void
  {

  }
}

export = BasicTechnique;