YUI.add("editor-base",function(B){var A=function(){A.superclass.constructor.apply(this,arguments);};B.extend(A,B.Base,{frame:null,initializer:function(){var C=new B.Frame({designMode:true,title:A.STRINGS.title,use:A.USE,dir:this.get("dir")}).plug(B.Plugin.ExecCommand);C.after("ready",B.bind(this._afterFrameReady,this));C.addTarget(this);this.frame=C;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});},_defNodeChangeFn:function(G){switch(G.changedType){case"enter":break;case"tab":if(!G.changedNode.test("li, li *")&&!G.changedEvent.shiftKey){this.execCommand("inserthtml","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");G.changedEvent.halt();}break;}var H=this.getDomPath(G.changedNode),D={},F,C,E=[];H.each(function(N){var I=N.get("tagName").toLowerCase(),M=A.TAG2CMD[I],L=B.Node.getDOMNode(N);if(M){D[M]=1;}var K=L.style;if(K.fontWeight.toLowerCase()=="bold"){D.bold=1;}if(K.fontStyle.toLowerCase()=="italic"){D.italic=1;}if(K.textDecoration.toLowerCase()=="underline"){D.underline=1;}if(K.textDecoration.toLowerCase()=="line-through"){D.strikethrough=1;}F=N.getStyle("fontFamily").split(",")[0].toLowerCase();C=N.getStyle("fontSize");var J=N.get("className").split(" ");B.each(J,function(O){if(O!==""&&(O.substr(0,4)!=="yui_")){E.push(O);}});});G.dompath=H;G.fontFamily=F;G.fontSize=C;G.classNames=E;G.commands=D;},getDomPath:function(C){var D=[];while(C!==null){if(!C.inDoc()){C=null;break;}if(C.get("nodeName")&&C.get("nodeType")&&(C.get("nodeType")==1)){D.push(B.Node.getDOMNode(C));}if(C.test("body")){C=null;break;}C=C.get("parentNode");}if(D.length===0){D[0]=B.confg.doc.body;}return B.all(D.reverse());},_afterFrameReady:function(){var C=this.frame.getInstance();this.frame.on("mousedown",B.bind(this._onFrameMouseDown,this));this.frame.on("keyup",B.bind(this._onFrameKeyUp,this));this.frame.on("keydown",B.bind(this._onFrameKeyDown,this));C.Selection.filter();},_onFrameMouseDown:function(C){this.fire("nodeChange",{changedNode:C.frameTarget,changedType:"mousedown",changedEvent:C});},_onFrameKeyUp:function(E){if(A.NC_KEYS[E.keyCode]){var D=this.frame.getInstance(),C=new D.Selection();if(C.anchorNode){this.fire("nodeChange",{changedNode:C.anchorNode,changedType:"keyup",selection:C,changedEvent:E});}}},_onFrameKeyDown:function(E){if(A.NC_KEYS[E.keyCode]){var D=this.frame.getInstance(),C=new D.Selection();this.fire("nodeChange",{changedNode:C.anchorNode,changedType:A.NC_KEYS[E.keyCode],changedEvent:E});}},execCommand:function(C,D){return this.frame.execCommand(C,D);},getInstance:function(){return this.frame.getInstance();},destructor:function(){},render:function(C){this.frame.set("content",this.get("content"));this.frame.render(C);return this;},focus:function(){this.frame.getInstance().one("win").focus();return this;},getContent:function(){var C=this.getInstance().Selection.unfilter();C=C.replace(/ _yuid="([^>]*)"/g,"");return C;}},{TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(C){if(C.substr(0,1)==="\n"){C=C.substr(1);}return this.frame.set("content",C);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"}}});B.EditorBase=A;},"@VERSION@",{requires:["base","frame","node","exec-command"],skinnable:false});