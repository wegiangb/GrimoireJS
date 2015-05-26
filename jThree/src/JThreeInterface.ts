import JThreeObject = require("./Base/JThreeObject");
import JThreeContextProxy = require("./Core/JThreeContextProxy");
import JThreeContext = require("./Core/JThreeContext");
import GomlTreeNodeBase = require("./Goml/GomlTreeNodeBase");
import Delegate = require("./Delegates");
class JThreeInterface extends JThreeObject
{
  constructor(jq:JQuery)
  {
    super();
    this.target=jq;
  }

  private target:JQuery;

  public attr(attrTarget:string,value:any):JThreeInterface
  {
    var t=this;
    this.target.each((n,e)=>{
      var gomlNode=t.getNode(<HTMLElement>e);
      if(gomlNode.attributes.isDefined(attrTarget))
      {
        gomlNode.attributes.setValue(attrTarget,value);
      }else{
        e.setAttribute(attrTarget,value);
      }
    });
    return this;
  }

  public animate(attrTarget:{[key:string]:any},duration:number,easing?:string,onComplete?:Delegate.Action0):JThreeInterface
  {
    easing=easing||"linear";
    var t=this;
    this.target.each((n,e)=>{
      for(var attrName in attrTarget)
      {
        var value=attrTarget[attrName];
        var gomlNode=t.getNode(<HTMLElement>e);
        if(gomlNode.attributes.isDefined(attrName))
        {
          var easingFunc=this.Context.GomlLoader.easingFunctions.get(easing);
          this.Context.addAnimater(gomlNode.attributes.getAnimater(attrName,this.Context.Timer.Time,duration,gomlNode.attributes.getValue(attrName),value,easingFunc,onComplete));
        }
      }
    });
    return this;
  }

  /**
*
*@param [object Object]
*@returns
*/
public find(attrTarget:string):JThreeInterface
  {
    return new JThreeInterface(this.target.find(attrTarget));
  }

  public append(target:string):JThreeInterface
  {
    var newTarget:JQuery=$(target);
    this.target.each((n,e)=>{
      this.Context.GomlLoader.appendChildren(newTarget,<HTMLElement>e);
    });
    return this;
  }

  private getNode(elem:HTMLElement):GomlTreeNodeBase
  {
    var id=elem.getAttribute('x-j3-id');
    return this.Context.GomlLoader.getNode(id);
  }

  private get Context():JThreeContext
  {
    return JThreeContextProxy.getJThreeContext();
  }
}

export=JThreeInterface;
