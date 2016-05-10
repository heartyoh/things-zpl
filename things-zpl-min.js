!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var config={fontNo:6};exports.config=config},{}],2:[function(require,module,exports){var zpl=require("./lib/api");"undefined"!=typeof window&&(window.zpl=zpl),"undefined"!=typeof exports&&(exports.zpl=zpl)},{"./lib/api":3}],3:[function(require,module,exports){"use strict";exports.convert=require("./converter").convert,exports.revert=require("./reverter").revert},{"./converter":12,"./reverter":13}],4:[function(require,module,exports){"use strict";function barcode(properties){this.model=properties,this.toZpl=function(){var model=this.model,height=model.height||"",rotate=model.rot||"",showText=model.showText||"Y",textAbove=model.textAbove||"",text=model.text||"",symbol=model.symbol,top=model.top||"",left=model.left||"",scale_w=model.scale_w||"",scale_h=model.scale_h||"",scale="",lines=[];scaleBuf.w!=scale_w||scaleBuf.h!=scale_h?(scaleBuf.w=scale_w,scaleBuf.h=scale_h,scale=["^BY"+scale_w,scale_h],lines.push(scale)):scale_w="",showText&&(height/=1.2);var symbolMap=new Map([["code11",["^B1"+rotate,,height,showText,textAbove]],["interleaved2of5",["^B2"+rotate,height,showText,textAbove]],["code39",["^B3"+rotate,,height,showText,textAbove]],["code49",["^B4"+rotate,height,showText]],["planet",["^B5"+rotate,height,showText,textAbove]],["pdf417",["^B7"+rotate,height,,,,]],["ean8",["^B8"+rotate,height,showText,textAbove]],["upce",["^B9"+rotate,height,showText,textAbove]],["code93",["^BA"+rotate,height,showText,textAbove]],["codablock",["^BB"+rotate,height,,,,]],["code128",["^BC"+rotate,height,showText,textAbove,,]],["maxicode",["^BD"+rotate,,height,showText,textAbove]],["ean13",["^BE"+rotate,height,showText,textAbove]],["micropdf417",["^BF2",,]],["industrial2of5",["^BI"+rotate,height,showText,textAbove]],["standard2of5",["^BJ"+rotate,height,showText,textAbove]],["ansicodabar",["^BK"+rotate,,height,showText,textAbove,,]],["logmars",["^BL"+rotate,height,textAbove]],["msi",["^BM"+rotate,,height,showText,textAbove]],["plessey",["^BP"+rotate,,height,showText,textAbove]],["qrcode",["^BQ"+rotate,,6]],["upca",["^BU"+rotate,height,showText,textAbove]],["datamatrix",["^BX"]],["postal",["^BZ"+rotate,height,showText,textAbove]]]),params=symbolMap.get(symbol);lines.push("^FO"+left+","+top),lines.push(params.join(",")),lines.push("^FD"+text),lines.push("^FS");var zpl=lines.join("\n")+"\n";return zpl}}var scaleBuf={};exports.Barcode=barcode},{}],5:[function(require,module,exports){"use strict";function oehfg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj}function ohfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj}function ohfm(p){var obj={};switch(obj.type="barcode",obj.rot=p[0],obj.height=p[1],p[2]){case"N":obj.showText="N";break;case"A":obj.showText="Y",obj.textAbove="Y";break;case"B":obj.showText="Y",obj.textAbove="N"}return obj.mode=p[3],obj}function ohfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj}function ohfgem(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj.mode=p[5],obj}function ohfg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj}function ohscrt(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.security=p[2],obj.columns=p[3],obj.rows=p[4],obj.truncate=p[5],obj}function ohscrm(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.security=p[2],obj.columns=p[3],obj.rows=p[4],obj.mode=p[5],obj}function ohm(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.mode=p[2],obj}function oehfgkl(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.checkDigit=p[1],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj.startChar=p[5],obj.stopChar=p[6],obj}function ohg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.textAbove=p[2],obj}function oehfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.checkDigit=p[1],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj.checkDigit=p[5],obj}function abcq(p){var obj={};return obj.type="qrcode",obj.model=p[0],obj.position=p[1],obj.magnification=p[2],obj.hqml=p[3],obj}function ohscrfg(p){var obj={};return obj.type="barcode",obj.orientation=p[0],obj.height=p[1],obj.quality=p[2],obj.columns=p[3],obj.rows=p[4],obj.format=p[5],obj.escape=p[6],obj}function mpt(p){var obj={};return obj.type="barcode",obj.mode=p[0],obj.position=p[1],obj.total=p[2],obj}function getRotation(r){switch(r){case"N":return Math.PI/180*0;case"R":return Math.PI/180*90;case"I":return Math.PI;case"B":return Math.PI/180*270}}exports.commands=new Map([["A",{desc:"",parameters:"",handler:function(params){var obj={},sign=params.substr(0,1);if(params=params.substr(1),"@"===sign){var p=params.split(",");if(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]),4===p.length){var fonts=p[3];switch(fonts.substr(0,1)){case"R":break;case"E":break;case"B":break;case"A":}fonts=fonts.substr(2);var i=fonts.indexOf(".");fonts=fonts.substr(0,i),obj.fontFamily=fonts}else if(3!==p.length)return void error_log("A@");return obj.rotation=getRotation(p[0]),obj}var p=params.split(",");switch(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]),p[0]){case"0":obj.fontFamily="serif"}return obj}}],["B1",{desc:"",parameters:"",handler:function(p){var obj=oehfg(p);return obj.symbol="code11",obj}}],["B2",{desc:"",parameters:"",handler:function(p){var obj=ohfge(p);return obj.symbol="interleaved2of5",obj}}],["B3",{desc:"",parameters:"",handler:function(p){var obj=oehfg(p);return obj.symbol="code39",obj}}],["B4",{desc:"",parameters:"",handler:function(p){var obj=ohfm(p);return obj.symbol="code49",obj}}],["B5",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="planet",obj}}],["B7",{desc:"",parameters:"",handler:function(params){var obj=ohscrt(params);return obj.symbol="pdf417",obj}}],["B8",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="ean8",obj}}],["B9",{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="upce",obj}}],["BA",{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="code93",obj}}],["BB",{desc:"",parameters:"",handler:function(params){var obj=ohscrm(params);return obj.symbol="codablock",obj}}],["BC",{desc:"",parameters:"",handler:function(params){var obj=ohfgem(params);return obj.symbol="code128",obj}}],["BD",{desc:"",parameters:"",handler:function(params){var obj=mpt(params);return obj.symbol="maxicode",obj}}],["BE",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="ean13",obj}}],["BF",{desc:"",parameters:"",handler:function(params){var obj=ohm(params);return obj.symbol="micropdf417",obj}}],["BI",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="industrial2of5",obj}}],["BJ",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="standard2of5",obj}}],["BK",{desc:"",parameters:"",handler:function(params){var obj=oehfgkl(params);return obj.symbol="ansicodabar",obj}}],["BL",{desc:"",parameters:"",handler:function(params){var obj=ohg(params);return obj.symbol="logmars",obj}}],["BM",{desc:"",parameters:"",handler:function(params){var obj=oehfge(params);return obj.symbol="msi",obj}}],["BP",{desc:"",parameters:"",handler:function(params){var obj=oehfg(params);return obj.symbol="plessey",obj}}],["BQ",{desc:"",parameters:"",handler:function(params){var obj=abcq(params);return obj.symbol="qrcode",obj}}],["BS",{desc:"",parameters:"",handler:function(){}}],["BU",{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="upca",obj}}],["BX",{desc:"",parameters:"",handler:function(params){var obj=ohscrfg(params);return obj.symbol="datamatrix",obj}}],["BY",{desc:"",parameters:"",handler:function(params){var obj={};return obj.scale_w=params[0],obj.height=params[2],obj}}],["BZ",{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="postal",obj}}],["CF",{desc:"The ^CF command sets the default font used in your printer.",parameters:"^CFf,h,w",handler:function(p){var obj={};switch(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]),p[0]){case 0:obj.fontFamily="serif";break;default:obj.fontFamily="serif"}return obj}}],["CW",{desc:"Font Identifier",parameters:"^CWa,d:o.x: a(A~Z, 0~9)",handler:function(){}}],["DG",{desc:"Download Graphic use with ^XG",parameters:"^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image",handler:function(p){var obj={};obj.id=p[0],obj.totalSize=p[1],obj.rowSize=p[2],obj.data=p[3]}}],["FB",{desc:"",parameters:"",handler:function(p){var obj={};switch(obj.textType="W",obj.width=parseInt(p[0]),obj.maxLines=parseInt(p[1]),obj.lineMargin=parseInt(p[2]),p[3]){case"L":obj.textAlign="left";break;case"C":obj.textAlign="center";break;case"R":obj.textAlign="right";break;case"J":obj.textAlign="justified";break;default:obj.textAlign=textAlign}return obj.hangingIndent=parseInt(p[4]),obj}}],["FC",{desc:"",parameters:"",handler:function(){}}],["FD",{desc:"",parameters:"",handler:function(p){return p=p.trim(),{text:p}}}],["FH",{desc:"Field Hexadecimal Indicator",parameters:"0: hexadecimal indicator",handler:function(){}}],["FO",{desc:"Field Origin",parameters:"x, y, justification(0: left, 1: right, 2: auto)",handler:function(p){return p.length<2?void error_log("FO"):{left:parseInt(p[0]),top:parseInt(p[1]),justification:parseInt(p[2])}}}],["FS",{desc:"",parameters:"",handler:function(){}}],["FT",{desc:"Field Typeset",parameters:"x, y, justification",handler:function(p){return p.length<2?void error_log("FO"):{left:parseInt(p[0]),top:parseInt(p[1]),justification:parseInt(p[2])}}}],["FX",{desc:"comment",parameters:"",handler:function(){}}],["GB",{desc:"",parameters:"",handler:function(p){var obj={};return obj.type="rect",obj.innerBorder=!0,obj.width=parseInt(p[0]),obj.height=parseInt(p[1]),obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj}}],["GC",{desc:"",parameters:"",handler:function(p){var obj={};return obj.type="ellipse",obj.rx=parseInt(p[0]),obj.ry=parseInt(p[0]),obj.lineWidth=parseInt(p[1]),obj.fillStyle=p[2],obj}}],["GD",{desc:"",parameters:"",handler:function(p){var obj={};return obj.type="line",obj.width=parseInt(p[0]),obj.height=parseInt(p[1]),obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj.rotate=p[4],obj}}],["GE",{desc:"",parameters:"",handler:function(p){var obj={};return obj.type="ellipse",obj.rx=parseInt(p[0])/2,obj.ry=parseInt(p[1])/2,obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj}}],["GF",{desc:"^GFa,b,c,d,data",parameters:"",handler:function(){}}],["GS",{desc:"",parameters:"",handler:function(){}}],["MD",{desc:"",parameters:"",handler:function(){}}],["LL",{desc:"",parameters:"",handler:function(){}}],["XG",{desc:"Recall Graphic",parameters:"^XGd:o.x,mx,my: d:o.x: magnification factor on the x-axis",handler:function(p){var obj={};return obj.type="image_view",obj.id=p[0],obj.scaleX=p[1],obj.scaleY=p[2],obj}}],["XA",{desc:"Start Format",parameters:"",handler:function(){}}],["XZ",{desc:"",parameters:"",handler:function(){}}]])},{}],6:[function(require,module,exports){"use strict";function ellipse(properties){this.model=properties,this.toZpl=function(group){var model=this.model,rx=model.rx||"",ry=model.ry||"",cx=model.cx||"",cy=model.cy||"",lineWidth=model.lineWidth||"",fillStyle=model.fillStyle;fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B";var left=cx-rx||0;left+=group?group.left||0:0;var top=cy-ry||0;top+=group?group.top||0:0;var command;command=rx===ry?"GC":"GE";var symbolMap=new Map([["GC",["^GC"+2*rx,lineWidth,fillStyle]],["GE",["^GE"+2*rx,2*ry,lineWidth,fillStyle]]]),zpl=[],params=symbolMap.get(command);return zpl.push("^FO"+left+","+top),zpl.push(params.join(",")),zpl.push("^FS"),zpl=zpl.join("\n"),zpl+="\n"}}exports.Ellipse=ellipse},{}],7:[function(require,module,exports){"use strict";function group(properties){return this.model=properties,this.model}exports.Group=group},{}],8:[function(require,module,exports){"use strict";function image(properties){this.model=properties,this.toZpl=function(group){var model=this.model,top=model.top||"",left=model.left||"",imageGrf=model.imageGrf;if(top+=group?group.top||0:0,left+=group?group.left||0:0,!imageGrf)return"";var guid=getGuid(),commands=[["~DG"+guid,imageGrf],["^FO"+left,top],["^XGR:"+guid,1,1],["^PQ1"],["^FS"]],zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}function getGuid(){function s4(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return s4()+s4()+s4()+s4()+s4()+s4()+s4()+s4()}exports.Image=image},{}],9:[function(require,module,exports){"use strict";function line(properties){this.model=properties,this.toZpl=function(group){var model=this.model,x1=model.x1||"",x2=model.x2||"",y1=model.y1||"",y2=model.y2||"",fillStyle=model.fillStyle;fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B";var zpl="";if(x1===x2||y1===y2)return zpl=this.gbLine(group);var commands=this.gdLine(group);return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl},this.gbLine=function(group){var model=this.model,x1=model.x1||"",x2=model.x2||"",y1=model.y1||"",y2=model.y2||"",lineWidth=model.lineWidth||"",strokeStyle=this.model.strokeStyle,left=Math.min(x1,x2),top=Math.min(y1,y2),tx=Math.abs(x2-x1),ty=Math.abs(y2-y1),width=0===tx?lineWidth:tx,height=0===ty?lineWidth:ty;left+=group?group.left||0:0,top+=group?group.top||0:0;var properties={left:left,top:top,width:width,height:height,lineWidth:lineWidth,strokeStyle:strokeStyle},rect=new Rect(properties);return rect.toZpl(group)},this.gdLine=function(group){var model=this.model,x1=model.x1||"",x2=model.x2||"",y1=model.y1||"",y2=model.y2||"",left=Math.min(x1,x2),top=Math.min(y1,y2),width=Math.abs(x2-x1),height=Math.abs(y2-y1);x2>=x1&&y2>=y1?rotate="L":x1>=x2&&y1>=y2?rotate="L":x1>=x2&&y2>=y1?rotate="R":x2>=x1&&y1>=y2&&(rotate="R"),left+=group?group.left||0:0,top+=group?group.top||0:0;var commands=[["^FO"+left,top],["^GD"+width,height,this.lineWidth,this.fillStyle,rotate],["^FS"]];return commands}}var Rect=require("./rect").Rect;exports.Line=line},{"./rect":10}],10:[function(require,module,exports){"use strict";function rect(properties){this.model=properties,this.toZpl=function(group){var strokeStyle,model=this.model,width=model.width||"",height=model.height||"",lineWidth=model.lineWidth||"",fillStyle=model.fillStyle||"";strokeStyle="white"===model.strokeStyle||"#fff"===model.strokeStyle||"#ffffff"===model.strokeStyle?"W":"B",fillStyle&&(fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B",lineWidth=height,strokeStyle=fillStyle);var left=model.left||"";left+=group?group.left||0:0;var top=model.top||"";top+=group?group.top||0:0;var commands=[["^FO"+left,top],["^GB"+width,height,lineWidth,strokeStyle],["^FS"]],zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}exports.Rect=rect},{}],11:[function(require,module,exports){"use strict";function text(properties){this.model=properties,this.toZpl=function(group){var zpl="",text=this.model.text||"",top=this.model.top||"";top+=group?group.top||0:0;var left=this.model.left||"";left+=group?group.left||0:0;var width=this.model.width||"",height=this.model.height||"",textType=this.model.textType||"",charWidth=this.model.charWidth||width/text.length;if("F"===textType)var charHeight=this.model.charHeight||height;else if("W"===textType)var charHeight=this.model.charHeight;else var charHeight=this.model.charHeight||this.model.charWidth;var rotate=this.model.rotation||"";rotate+=group?group.rotation||0:0;var textAlign=this.model.textAlign||"";if(Math.PI*-.25<rotate&&rotate<=.25*Math.PI?rotate="N":.25*Math.PI<rotate&&rotate<=.75*Math.PI?rotate="R":.75*Math.PI<rotate&&rotate<=1.25*Math.PI?rotate="I":Math.PI<1.25*rotate&&rotate<=1.75*Math.PI&&(rotate="B"),"W"===textType||"w"===textType){switch(textAlign){case"left":textAlign="L";break;case"right":textAlign="R";break;case"center":textAlign="C";break;case"justified":textAlign="J"}var lineMargin=this.model.lineMargin||"",maxLines=this.model.maxLines||"",hangingIndent=this.model.hangingIndent||"",commands=[["^FO"+left,top],["^A"+config.fontNo+rotate,charHeight,charWidth],["^FB"+width,maxLines,lineMargin,textAlign,hangingIndent],["^FD"+text],["^FS"]]}else var commands=[["^FO"+left,top],["^A"+config.fontNo+rotate,charHeight,charWidth],["^FD"+text],["^FS"]];var zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}var config=require("../../config");exports.Text=text},{"../../config":1}],12:[function(require,module,exports){"use strict";function specific(obj){switch(obj.type){case"line":obj.x1=obj.left,obj.x2=obj.left+obj.width,obj.x1==obj.x2&&obj.lineWidth>=100&&(obj.x1+=obj.lineWidth/2,obj.x2+=obj.lineWidth/2),"L"===obj.rotate?(obj.y1=obj.top,obj.y2=obj.top+obj.height):(obj.y1=obj.top+obj.height,obj.y2=obj.top),delete obj.left,delete obj.top,delete obj.width,delete obj.height,delete obj.rotate;break;case"ellipse":obj.cx=obj.left+obj.rx,obj.cy=obj.top+obj.ry,delete obj.left,delete obj.top;break;case"text":(fontBuf.charHeight||fontBuf.charWidth)&&Object.assign(obj,fontBuf);break;case"rect":break;case"image_view":break;case"barcode":obj.height||(obj.height=barcodeBuf.height),obj.scale_w||(obj.scale_w=barcodeBuf.scale_w)}return obj}var fontBuf,barcodeBuf,imageBuf,commands=require("./components/commands"),commandsMap=commands.commands;exports.convert=function(zpl){if(zpl){fontBuf={},barcodeBuf={},imageBuf=new Map;var models=[],obj={},commands=zpl.split("^");return commands.forEach(function(c){if(0!==c.trim().length){c=c.replace("\n","");var command=c.substr(0,2);if("A"===command.charAt(0)){var params=c.substr(1),commandHandler=commandsMap.get("A");if(!commandHandler)return;var properties=commandHandler.handler(params);return void(obj=Object.assign(obj||{},properties))}var commandHandler=commandsMap.get(command);if(commandHandler){var params;params="FD"===command?c.substr(2):c.substr(2).split(",").map(function(value){return value.trim()});var properties=commandHandler.handler(params);switch(command){case"XZ":if(null==obj)break;case"FS":obj.type||(obj.type="text",obj.textAlign="left",obj.textType=obj.textType||"F"),obj=specific(obj),obj.centerRotate=!1,models.push(obj),obj=null;break;case"BY":Object.assign(barcodeBuf,properties||{});break;case"CF":Object.assign(fontBuf,properties||{});break;default:obj=Object.assign(obj||{},properties)}}}}),models}}},{"./components/commands":5}],13:[function(require,module,exports){"use strict";function makeZpl(components,zpl){if(components){if(groups.length>0)var group=groups.pop();return components.forEach(function(c){switch(c.type){case"group":groups.push(Group(c)),zpl+=makeZpl(c.components,"");break;case"text":var obj=new Text(c);break;case"barcode":var obj=new Barcode(c);break;case"rect":var obj=new Rect(c);break;case"ellipse":var obj=new Ellipse(c);break;case"image":case"image-view":var obj=new Image(c);break;case"line":var obj=new Line(c)}obj&&(zpl+=obj.toZpl(group),zpl+="\n")}),zpl}}var Text=require("./components/text").Text,Barcode=require("./components/barcode").Barcode,Rect=require("./components/rect").Rect,Ellipse=require("./components/ellipse").Ellipse,Line=require("./components/line").Line,Group=require("./components/group").Group,Image=require("./components/image").Image;exports.revert=function(components){if(components){var zpl="^XA\n";return zpl=makeZpl(components,zpl),zpl+="^XZ"}};var groups=[]},{"./components/barcode":4,"./components/ellipse":6,"./components/group":7,"./components/image":8,"./components/line":9,"./components/rect":10,"./components/text":11}]},{},[2]);