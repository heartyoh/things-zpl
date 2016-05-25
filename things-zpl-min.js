!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){var config={fontNo:6,dpi:200};exports.config=config},{}],2:[function(require,module,exports){var zpl=require("./lib/api");"undefined"!=typeof window&&(window.zpl=zpl),"undefined"!=typeof exports&&(exports.zpl=zpl)},{"./lib/api":3}],3:[function(require,module,exports){"use strict";exports.convert=require("./converter").convert,exports.revert=require("./reverter").revert},{"./converter":18,"./reverter":19}],4:[function(require,module,exports){"use strict";function oehfg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj}function ohfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj}function ohfm(p){var obj={};switch(obj.type="barcode",obj.rot=p[0],obj.height=p[1],p[2]){case"N":obj.showText="N";break;case"A":obj.showText="Y",obj.textAbove="Y";break;case"B":obj.showText="Y",obj.textAbove="N"}return obj.mode=p[3],obj}function ohfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj}function ohfgem(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj.checkDigit=p[4],obj.mode=p[5],obj}function ohfg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.showText=p[2],obj.textAbove=p[3],obj}function ohscrt(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.security=p[2],obj.columns=p[3],obj.rows=p[4],obj.truncate=p[5],obj}function ohscrm(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.security=p[2],obj.columns=p[3],obj.rows=p[4],obj.mode=p[5],obj}function ohm(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.mode=p[2],obj}function oehfgkl(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.checkDigit=p[1],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj.startChar=p[5],obj.stopChar=p[6],obj}function ohg(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.height=p[1],obj.textAbove=p[2],obj}function oehfge(p){var obj={};return obj.type="barcode",obj.rot=p[0],obj.checkDigit=p[1],obj.height=p[2],obj.showText=p[3],obj.textAbove=p[4],obj.checkDigit=p[5],obj}function abcq(p){var obj={};return obj.type="qrcode",obj.model=p[0],obj.position=p[1],obj.magnification=p[2],obj.hqml=p[3],obj}function ohscrfg(p){var obj={};return obj.type="barcode",obj.orientation=p[0],obj.height=p[1],obj.quality=p[2],obj.columns=p[3],obj.rows=p[4],obj.format=p[5],obj.escape=p[6],obj}function mpt(p){var obj={};return obj.type="barcode",obj.mode=p[0],obj.position=p[1],obj.total=p[2],obj}var barcodes={B1:{desc:"Code 11 Bar Code",parameters:"",handler:function(p){var obj=oehfg(p);return obj.symbol="code11",obj}},B2:{desc:"",parameters:"",handler:function(p){var obj=ohfge(p);return obj.symbol="interleaved2of5",obj}},B3:{desc:"",parameters:"",handler:function(p){var obj=oehfg(p);return obj.symbol="code39",obj}},B4:{desc:"",parameters:"",handler:function(p){var obj=ohfm(p);return obj.symbol="code49",obj}},B5:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="planet",obj}},B7:{desc:"",parameters:"",handler:function(params){var obj=ohscrt(params);return obj.symbol="pdf417",obj}},B8:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="ean8",obj}},B9:{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="upce",obj}},BA:{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="code93",obj}},BB:{desc:"",parameters:"",handler:function(params){var obj=ohscrm(params);return obj.symbol="codablock",obj}},BC:{desc:"",parameters:"",handler:function(params){var obj=ohfgem(params);return obj.symbol="code128",obj}},BD:{desc:"",parameters:"",handler:function(params){var obj=mpt(params);return obj.symbol="maxicode",obj}},BE:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="ean13",obj}},BF:{desc:"",parameters:"",handler:function(params){var obj=ohm(params);return obj.symbol="micropdf417",obj}},BI:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="industrial2of5",obj}},BJ:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="standard2of5",obj}},BK:{desc:"",parameters:"",handler:function(params){var obj=oehfgkl(params);return obj.symbol="ansicodabar",obj}},BL:{desc:"",parameters:"",handler:function(params){var obj=ohg(params);return obj.symbol="logmars",obj}},BM:{desc:"",parameters:"",handler:function(params){var obj=oehfge(params);return obj.symbol="msi",obj}},BP:{desc:"",parameters:"",handler:function(params){var obj=oehfg(params);return obj.symbol="plessey",obj}},BQ:{desc:"",parameters:"",handler:function(params){var obj=abcq(params);return obj.symbol="qrcode",obj}},BS:{desc:"",parameters:"",handler:function(){}},BU:{desc:"",parameters:"",handler:function(params){var obj=ohfge(params);return obj.symbol="upca",obj}},BX:{desc:"",parameters:"",handler:function(params){var obj=ohscrfg(params);return obj.symbol="datamatrix",obj}},BY:{desc:"",parameters:"",handler:function(params){var obj={};return obj.scale_w=params[0],obj.height=params[2],obj}},BZ:{desc:"",parameters:"",handler:function(params){var obj=ohfg(params);return obj.symbol="postal",obj}}};exports.barcodes=barcodes},{}],5:[function(){"use strict"},{}],6:[function(require,module,exports){"use strict";var fields={FB:{desc:"Field Block",parameters:"",handler:function(p){var obj={};switch(obj.textType="W",obj.width=parseInt(p[0]),obj.maxLines=parseInt(p[1]),obj.lineMargin=parseInt(p[2]),p[3]){case"L":obj.textAlign="left";break;case"C":obj.textAlign="center";break;case"R":obj.textAlign="right";break;case"J":obj.textAlign="justified";break;default:obj.textAlign=""}return obj.hangingIndent=parseInt(p[4]),obj}},FC:{desc:"Field Clock",parameters:"",handler:function(){}},FD:{desc:"Field Data",parameters:"",handler:function(p){return p=p.trim(),{text:p}}},FH:{desc:"Field Hexadecimal Indicator",parameters:"0: hexadecimal indicator",handler:function(){}},FO:{desc:"Field Origin",parameters:"x, y, justification(0: left, 1: right, 2: auto)",handler:function(p){return p.length<2?void error_log("FO"):{left:parseInt(p[0]),top:parseInt(p[1]),justification:parseInt(p[2])}}},FS:{desc:"Field Separator",parameters:"",handler:function(){}},FT:{desc:"Field Typeset",parameters:"x, y, justification",handler:function(p){return p.length<2?void error_log("FO"):{left:parseInt(p[0]),top:parseInt(p[1]),justification:parseInt(p[2])}}},FX:{desc:"comment",parameters:"",handler:function(){}}};exports.fields=fields},{}],7:[function(require,module,exports){"use strict";var rotation=require("./utils").rotation,fonts={A:{desc:"Scalable/Bitmapped Font",parameters:"f,o,h,w: f: font name, o: orientation, h: charHeight, w: width",handler:function(params){var obj={},sign=params.substr(0,1);if(params=params.substr(1),"@"===sign){var p=params.split(",");if(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]),4===p.length){var fonts=p[3];switch(fonts.substr(0,1)){case"R":break;case"E":break;case"B":break;case"A":}fonts=fonts.substr(2);var i=fonts.indexOf(".");fonts=fonts.substr(0,i),obj.fontFamily=fonts}else if(3!==p.length)return void error_log("A@");return obj.rotation=rotation(p[0]),obj}var p=params.split(",");switch(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]),p[0]){case"0":obj.fontFamily="serif"}return obj}},CF:{desc:"The ^CF command sets the default font used in your printer.",parameters:"^CFf,h,w",handler:function(p){var obj={};switch(obj.charHeight=parseInt(p[1]),obj.charWidth=parseInt(p[2]||0),p[0]){case 0:obj.fontFamily="serif";break;default:obj.fontFamily="serif"}return obj}},CI:{desc:"Change International Font/Encoding",parameters:"",handler:function(){}},CW:{desc:"Font Identifier",parameters:"a,d:o.x: a(A~Z, 0~9), ",handler:function(){}},FL:{desc:"Font Linking",parameters:"<ext>,<base>,<link>",handler:function(){}}};exports.fonts=fonts},{"./utils":10}],8:[function(require,module,exports){"use strict";var barcodes=require("./barcodes").barcodes,common=require("./common").common,fields=require("./fields").fields,fonts=require("./fonts").fonts,shapes=require("./shapes").shapes,commands=function(){var types=[barcodes,common,fields,fonts,shapes],commands={};return types.forEach(function(obj){Object.assign(commands,obj)}),commands}();exports.commands=commands},{"./barcodes":4,"./common":5,"./fields":6,"./fonts":7,"./shapes":9}],9:[function(require,module,exports){"use strict";var shapes={DG:{desc:"Download Graphic use with ^XG",parameters:"^DGd:o.x,t,w,data: t: total number of bytes in graphic, w: number of bytes per row, data: ASCII hexadecimal string defining image",handler:function(p){var obj={};obj.id=p[0],obj.totalSize=p[1],obj.rowSize=p[2],obj.data=p[3]}},GB:{desc:"Graphic Box",parameters:"w,h,t,c,r : t: border thickness, c: line color, r: degree of corner-rounding",handler:function(p){var obj={};return obj.type="rect",obj.innerBorder=!0,obj.width=parseInt(p[0]),obj.height=parseInt(p[1]),obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj}},GC:{desc:"Graphic Circle",parameters:"d,t,c : d: circle diameter",handler:function(p){var obj={};return obj.type="ellipse",obj.rx=parseInt(p[0]),obj.ry=parseInt(p[0]),obj.lineWidth=parseInt(p[1]),obj.fillStyle=p[2],obj}},GD:{desc:"Graphic Diagonal Line",parameters:"w,h,t,c,o",handler:function(p){var obj={};return obj.type="line",obj.width=parseInt(p[0]),obj.height=parseInt(p[1]),obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj.rotate=p[4],obj}},GE:{desc:"Graphic Ellipse",parameters:"w,h,t,c",handler:function(p){var obj={};return obj.type="ellipse",obj.rx=parseInt(p[0])/2,obj.ry=parseInt(p[1])/2,obj.lineWidth=parseInt(p[2]),obj.strokeStyle="W"===p[3]?"white":"black",obj}},GF:{desc:"Graphic Field",parameters:"a,b,c,d,data : a: compression type(A,B,C), b: binary byte count, c: graphic field count, d: bytes per row",handler:function(){}},GS:{desc:"Graphic Symbol",parameters:"o,h,w",handler:function(){}}};exports.shapes=shapes},{}],10:[function(require,module,exports){"use strict";exports.rotation=function(r){switch(r){case"N":return Math.PI/180*0;case"R":return Math.PI/180*90;case"I":return Math.PI;case"B":return Math.PI/180*270}},exports.get=function(object,prop){return object[prop]},exports.specific=function(obj){switch(obj.type){case"line":obj.x1=obj.left,obj.x2=obj.left+obj.width,obj.x1==obj.x2&&obj.lineWidth>=100&&(obj.x1+=obj.lineWidth/2,obj.x2+=obj.lineWidth/2),"L"===obj.rotate?(obj.y1=obj.top,obj.y2=obj.top+obj.height):(obj.y1=obj.top+obj.height,obj.y2=obj.top),delete obj.left,delete obj.top,delete obj.width,delete obj.height,delete obj.rotate;break;case"ellipse":obj.cx=obj.left+obj.rx,obj.cy=obj.top+obj.ry,delete obj.left,delete obj.top;break;case"text":(fontBuf.charHeight||fontBuf.charWidth)&&Object.assign(obj,fontBuf);break;case"rect":break;case"image_view":break;case"barcode":obj.height||(obj.height=barcodeBuf.height),obj.scale_w||(obj.scale_w=barcodeBuf.scale_w)}return obj}},{}],11:[function(require,module,exports){"use strict";function barcode(properties){this.model=properties,this.toZpl=function(){var _model=this.model,_model$height=_model.height,height=void 0===_model$height?"":_model$height,_model$rotate=_model.rotate,rotate=void 0===_model$rotate?"":_model$rotate,_model$showText=_model.showText,showText=void 0===_model$showText?"Y":_model$showText,_model$textAbove=_model.textAbove,textAbove=void 0===_model$textAbove?"":_model$textAbove,_model$text=_model.text,text=void 0===_model$text?"":_model$text,symbol=_model.symbol,_model$top=_model.top,top=void 0===_model$top?"":_model$top,_model$left=_model.left,left=void 0===_model$left?"":_model$left,_model$scale_w=_model.scale_w,scale_w=void 0===_model$scale_w?"":_model$scale_w,_model$scale_h=_model.scale_h,scale_h=void 0===_model$scale_h?"":_model$scale_h,scale="",lines=[];scaleBuf.w!=scale_w||scaleBuf.h!=scale_h?(scaleBuf.w=scale_w,scaleBuf.h=scale_h,scale=["^BY"+scale_w,scale_h],lines.push(scale)):scale_w="",showText&&(height/=1.2);var dpi=config.dpi,symbolMap=new Map([["code11",["^B1"+rotate,,height,showText,textAbove]],["interleaved2of5",["^B2"+rotate,height,showText,textAbove]],["code39",["^B3"+rotate,,height,showText,textAbove]],["code49",["^B4"+rotate,height,showText]],["planet",["^B5"+rotate,height,showText,textAbove]],["pdf417",["^B7"+rotate,height,,,,]],["ean8",["^B8"+rotate,height,showText,textAbove]],["upce",["^B9"+rotate,height,showText,textAbove]],["code93",["^BA"+rotate,height,showText,textAbove]],["codablock",["^BB"+rotate,height,,,,]],["code128",["^BC"+rotate,height,showText,textAbove,,]],["maxicode",["^BD"+rotate,,height,showText,textAbove]],["ean13",["^BE"+rotate,height,showText,textAbove]],["micropdf417",["^BF2",,]],["industrial2of5",["^BI"+rotate,height,showText,textAbove]],["standard2of5",["^BJ"+rotate,height,showText,textAbove]],["ansicodabar",["^BK"+rotate,,height,showText,textAbove,,]],["logmars",["^BL"+rotate,height,textAbove]],["msi",["^BM"+rotate,,height,showText,textAbove]],["plessey",["^BP"+rotate,,height,showText,textAbove]],["qrcode",["^BQ"+rotate,2,Math.floor(height/dpi)]],["upca",["^BU"+rotate,height,showText,textAbove]],["datamatrix",["^BX"]],["postal",["^BZ"+rotate,height,showText,textAbove]]]),params=symbolMap.get(symbol);lines.push("^FO"+left+","+top),lines.push(params.join(",")),lines.push("^FD"+text),lines.push("^FS");var zpl=lines.join("\n")+"\n";return zpl}}var config=require("../../config").config,scaleBuf={};exports.Barcode=barcode},{"../../config":1}],12:[function(require,module,exports){"use strict";function ellipse(properties){this.model=properties,this.toZpl=function(group){var model=this.model,rx=model.rx||"",ry=model.ry||"",cx=model.cx||"",cy=model.cy||"",lineWidth=model.lineWidth||"",fillStyle=model.fillStyle;fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B";var left=cx-rx||0;left+=group?group.left||0:0;var top=cy-ry||0;top+=group?group.top||0:0;var command;command=rx===ry?"GC":"GE";var symbolMap=new Map([["GC",["^GC"+2*rx,lineWidth,fillStyle]],["GE",["^GE"+2*rx,2*ry,lineWidth,fillStyle]]]),zpl=[],params=symbolMap.get(command);return zpl.push("^FO"+left+","+top),zpl.push(params.join(",")),zpl.push("^FS"),zpl=zpl.join("\n"),zpl+="\n"}}exports.Ellipse=ellipse},{}],13:[function(require,module,exports){"use strict";function group(properties){return this.model=properties,this.model}exports.Group=group},{}],14:[function(require,module,exports){"use strict";function image(properties){this.model=properties,this.toZpl=function(group){var model=this.model,top=model.top||"",left=model.left||"",imageGrf=model.imageGrf;if(top+=group?group.top||0:0,left+=group?group.left||0:0,!imageGrf)return"";var guid=getGuid(),commands=[["~DG"+guid,imageGrf],["^FO"+left,top],["^XGR:"+guid,1,1],["^PQ1"],["^FS"]],zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}function getGuid(){function s4(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return s4()+s4()+s4()+s4()+s4()+s4()+s4()+s4()}exports.Image=image},{}],15:[function(require,module,exports){"use strict";function line(properties){this.model=properties,this.toZpl=function(group){var _model=this.model,_model$x=_model.x1,x1=void 0===_model$x?"":_model$x,_model$x2=_model.x2,x2=void 0===_model$x2?"":_model$x2,_model$y=_model.y1,y1=void 0===_model$y?"":_model$y,_model$y2=_model.y2,y2=void 0===_model$y2?"":_model$y2,fillStyle=_model.fillStyle;fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B";var zpl="";if(x1===x2||y1===y2)return zpl=this.gbLine(group);var commands=this.gdLine(group);return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl},this.gbLine=function(group){var _model2=this.model,_model2$x=_model2.x1,x1=void 0===_model2$x?"":_model2$x,_model2$x2=_model2.x2,x2=void 0===_model2$x2?"":_model2$x2,_model2$y=_model2.y1,y1=void 0===_model2$y?"":_model2$y,_model2$y2=_model2.y2,y2=void 0===_model2$y2?"":_model2$y2,lineWidth=_model2.lineWidth,strokeStyle=_model2.strokeStyle,left=Math.min(x1,x2),top=Math.min(y1,y2),tx=Math.abs(x2-x1),ty=Math.abs(y2-y1),width=0===tx?lineWidth:tx,height=0===ty?lineWidth:ty;left+=group?group.left||0:0,top+=group?group.top||0:0;var properties={left:left,top:top,width:width,height:height,lineWidth:lineWidth,strokeStyle:strokeStyle},rect=new Rect(properties);return rect.toZpl(group)},this.gdLine=function(group){var rotate,_model3=this.model,_model3$x=_model3.x1,x1=void 0===_model3$x?"":_model3$x,_model3$x2=_model3.x2,x2=void 0===_model3$x2?"":_model3$x2,_model3$y=_model3.y1,y1=void 0===_model3$y?"":_model3$y,_model3$y2=_model3.y2,y2=void 0===_model3$y2?"":_model3$y2,left=Math.min(x1,x2),top=Math.min(y1,y2),width=Math.abs(x2-x1),height=Math.abs(y2-y1);x2>=x1&&y2>=y1?rotate="L":x1>=x2&&y1>=y2?rotate="L":x1>=x2&&y2>=y1?rotate="R":x2>=x1&&y1>=y2&&(rotate="R"),left+=group?group.left||0:0,top+=group?group.top||0:0;var commands=[["^FO"+left,top],["^GD"+width,height,this.lineWidth,this.fillStyle,rotate],["^FS"]];return commands}}var Rect=require("./rect").Rect;exports.Line=line},{"./rect":16}],16:[function(require,module,exports){"use strict";function rect(properties){this.model=properties,this.toZpl=function(group){var strokeStyle,model=this.model,width=model.width||"",height=model.height||"",lineWidth=model.lineWidth||"",fillStyle=model.fillStyle||"";strokeStyle="white"===model.strokeStyle||"#fff"===model.strokeStyle||"#ffffff"===model.strokeStyle?"W":"B",fillStyle&&(fillStyle="white"===fillStyle||"#fff"===fillStyle||"#ffffff"===fillStyle?"W":"B",lineWidth=height,strokeStyle=fillStyle);var left=model.left||"";left+=group?group.left||0:0;var top=model.top||"";top+=group?group.top||0:0;var commands=[["^FO"+left,top],["^GB"+width,height,lineWidth,strokeStyle],["^FS"]],zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}exports.Rect=rect},{}],17:[function(require,module,exports){"use strict";function text(properties){function lineZpl(group){var _model2=this.model,left=_model2.left,top=_model2.top,width=_model2.width,underLine=(_model2.height,_model2.underLine),strike=_model2.strike,charHeight=_model2.charHeight,lineCount=_model2.lineCount,x1=left,x2=left+width,y1=top,y2=top;if(underLine)for(var i=0;lineCount>i;i++){y2+=charHeight;var _properties={x1:x1,x2:x2,y1:y1,y2:y2},line=new Line(_properties);zpl+=line.toZpl(group)}if(y2=top+charHeight/2,strike)for(var _i=0;lineCount>_i;_i++){y2+=charHeight;var _properties2={x1:x1,x2:x2,y1:y1,y2:y2},_line=new Line(_properties2);zpl+=_line.toZpl(group)}}this.model=properties,this.toZpl=function(group){{var _model=this.model,_model$text=_model.text,text=void 0===_model$text?"":_model$text,_model$left=_model.left,left=void 0===_model$left?0:_model$left,_model$top=_model.top,top=void 0===_model$top?0:_model$top,_model$width=_model.width,width=void 0===_model$width?"":_model$width,_model$textType=(_model.height,_model.textType),textType=void 0===_model$textType?"":_model$textType,charWidth=_model.charWidth,charHeight=_model.charHeight,_model$rotation=_model.rotation,rotation=void 0===_model$rotation?0:_model$rotation;_model.underLine,_model.strike}left+=group?group.left||0:0,top+=group?group.top||0:0;var textType=this.model.textType||"",charWidth=this.model.charWidth||width/text.length;if("W"===textType)var charHeight=this.model.charHeight;else var charHeight=this.model.charHeight||this.model.charWidth;var rotate=rotation||"";rotate+=group?group.rotation||0:0;var textAlign=this.model.textAlign||"";Math.PI*-.25<rotate&&rotate<=.25*Math.PI?rotate="N":.25*Math.PI<rotate&&rotate<=.75*Math.PI?rotate="R":.75*Math.PI<rotate&&rotate<=1.25*Math.PI?rotate="I":Math.PI<1.25*rotate&&rotate<=1.75*Math.PI&&(rotate="B");var fontNo=config.fontNo||0;if("W"===textType||"w"===textType){switch(textAlign){case"left":textAlign="L";break;case"right":textAlign="R";break;case"center":default:textAlign="C";break;case"justified":textAlign="J"}var lineMargin=this.model.lineMargin||"",maxLines=this.model.maxLines||"",hangingIndent=this.model.hangingIndent||"",commands=[["^FO"+left,top],["^A"+fontNo+rotate,charHeight,charWidth],["^FB"+width,maxLines,lineMargin,textAlign,hangingIndent],["^FD"+text],["^FS"]]}else var commands=[["^FO"+left,top],["^A"+fontNo+rotate,charHeight,charWidth],["^FD"+text],["^FS"]];lineZpl.call(this,group);var zpl="";return commands.forEach(function(c){zpl+=c.join(",")+"\n"}),zpl}}var config=require("../../config").config,Line=require("./line").Line;exports.Text=text},{"../../config":1,"./line":15}],18:[function(require,module,exports){"use strict";var fontBuf,barcodeBuf,imageBuf,Utils=require("./commands/utils"),commandsMap=require("./commands/index").commands;exports.convert=function(zpl){if(zpl){fontBuf={},barcodeBuf={},imageBuf=new Map;var models=[],obj={},commands=zpl.split("^");return commands.forEach(function(c){if(0!==c.trim().length){c=c.replace("\n","");var command=c.substr(0,2);if("A"===command.charAt(0)){var params=c.substr(1),commandHandler=Utils.get(commandsMap,"A");if(!commandHandler)return;var properties=commandHandler.handler(params);return void(obj=Object.assign(obj||{},properties))}var commandHandler=Utils.get(commandsMap,command);if(commandHandler){var params;params="FD"===command?c.substr(2):c.substr(2).split(",").map(function(value){return value.trim()});var properties=commandHandler.handler(params);switch(command){case"XZ":if(null==obj)break;case"FS":obj.type||(obj.type="text",obj.textAlign="left",obj.textType=obj.textType||"F"),obj=specific(obj),obj.centerRotate=!1,models.push(obj),obj=null;break;case"BY":Object.assign(barcodeBuf,properties||{});break;case"CF":Object.assign(fontBuf,properties||{});break;default:obj=Object.assign(obj||{},properties)}}}}),models}};var specific=function(obj){switch(obj.type){case"line":obj.x1=obj.left,obj.x2=obj.left+obj.width,obj.x1==obj.x2&&obj.lineWidth>=100&&(obj.x1+=obj.lineWidth/2,obj.x2+=obj.lineWidth/2),"L"===obj.rotate?(obj.y1=obj.top,obj.y2=obj.top+obj.height):(obj.y1=obj.top+obj.height,obj.y2=obj.top),delete obj.left,delete obj.top,delete obj.width,delete obj.height,delete obj.rotate;break;case"ellipse":obj.cx=obj.left+obj.rx,obj.cy=obj.top+obj.ry,delete obj.left,delete obj.top;break;case"text":(fontBuf.charHeight||fontBuf.charWidth)&&Object.assign(obj,fontBuf);break;case"rect":break;case"image_view":break;case"barcode":obj.height||(obj.height=barcodeBuf.height),obj.scale_w||(obj.scale_w=barcodeBuf.scale_w)}return obj}},{"./commands/index":8,"./commands/utils":10}],19:[function(require,module,exports){"use strict";function makeZpl(components,zpl){if(components){if(groups.length>0)var group=groups.pop();return components.forEach(function(c){switch(c.type){case"group":groups.push(new Group(c)),zpl+=makeZpl(c.components,"");break;case"text":var obj=new Text(c);break;case"barcode":var obj=new Barcode(c);break;case"rect":var obj=new Rect(c);break;case"ellipse":var obj=new Ellipse(c);break;case"image":case"image-view":var obj=new Image(c);break;case"line":var obj=new Line(c)}obj&&(zpl+=obj.toZpl(group),zpl+="\n")}),zpl}}var Text=require("./components/text").Text,Barcode=require("./components/barcode").Barcode,Rect=require("./components/rect").Rect,Ellipse=require("./components/ellipse").Ellipse,Line=require("./components/line").Line,Group=require("./components/group").Group,Image=require("./components/image").Image;exports.revert=function(components){if(components){var zpl="^XA\n";return zpl=makeZpl(components,zpl),zpl+="^XZ"}};var groups=[]},{"./components/barcode":11,"./components/ellipse":12,"./components/group":13,"./components/image":14,"./components/line":15,"./components/rect":16,"./components/text":17}]},{},[2]);