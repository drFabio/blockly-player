var A=Object.defineProperty;var w=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var S=(e,t,n)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t)=>{for(var n in t||(t={}))T.call(t,n)&&S(e,n,t[n]);if(w)for(var n of w(t))R.call(t,n)&&S(e,n,t[n]);return e};var f=(e,t)=>{var n={};for(var a in e)T.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(e!=null&&w)for(var a of w(e))t.indexOf(a)<0&&R.call(e,a)&&(n[a]=e[a]);return n};var u=(e,t,n)=>(S(e,typeof t!="symbol"?t+"":t,n),n);import{j as jsxRuntime,r as react,B as Blockly,l as locale,R as ReactDOM,a as React}from"./vendor.4895ae15.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}};p();var index="";const jsx=jsxRuntime.exports.jsx,jsxs=jsxRuntime.exports.jsxs,Wrapper=({children:e})=>jsx("div",{className:"wrapper",children:e}),PAGE_CODE=0,PAGE_MIX=1,PAGE_APP=2,PAGE_SETTINGS=3,Navigator=({onCode:e,onMix:t,onApp:n,onSettings:a,currentPage:o})=>jsxs("nav",{className:"navigator",children:[jsx("div",{className:"menu-item",onClick:a,"data-is-current":o===PAGE_SETTINGS,children:"Settings"}),jsx("div",{className:"menu-item",onClick:e,"data-is-current":o===PAGE_CODE,children:"Code"}),jsx("div",{className:"menu-item",onClick:t,"data-is-current":o===PAGE_MIX,children:"Mix"}),jsx("div",{className:"menu-item",onClick:n,"data-is-current":o===PAGE_APP,children:"App"})]}),WorkspaceContext=react.exports.createContext();var duckImage$2="/blockly-player/images/duck.png",src$1="/blockly-player/images/chicken.png",deadDuckImage="/blockly-player/images/deadDuck.png",deadChickenImage="/blockly-player/images/deadChicken.png";const PLAYER_DUCK=Symbol("PLAYER_DUCK"),PLAYER_CHICKEN=Symbol("PLAYER_CHICKEN"),PLAYER_DEAD_DUCK=Symbol("PLAYER_DEAD_DUCK"),PLAYER_DEAD_CHICKEN=Symbol("PLAYER_DEAD_CHICKEN"),imageMap={[PLAYER_DUCK]:duckImage$2,[PLAYER_CHICKEN]:src$1,[PLAYER_DEAD_DUCK]:deadDuckImage,[PLAYER_DEAD_CHICKEN]:deadChickenImage};class Engine{constructor(e,t,n){u(this,"canvas");u(this,"ctx");u(this,"textSizeInPercentage",5);u(this,"textCursor",[0,0]);u(this,"textColor","black");u(this,"textAlign","left");u(this,"customCursor",!1);u(this,"scenario",{});u(this,"currentScenario",{});u(this,"currentCode");u(this,"isGameRunning",!1);u(this,"playerPosition",[10,10]);u(this,"playerSize",10);u(this,"withinObstacleGuard",!1);u(this,"withinTargetGuard",!1);u(this,"obstacles",[]);u(this,"targets",[]);u(this,"gameHud",[]);u(this,"gameInterval");u(this,"enemyInterval");u(this,"onGameStart",()=>{});u(this,"onGameEnd",()=>{});this.canvas=e,this.onGameStart=t,this.onGameEnd=n,this.ctx=e.getContext("2d"),this.ctx.font="20px arial",document.addEventListener("keydown",this.listenToKeys.bind(this))}handleStart(){console.log("Will start interactions"),this.proccessBlocks(this.currentCode)}startGame(){var e;if(console.log("Should start the game with ",this.currentScenario),this.scenario=g({},this.currentScenario),!(!this.scenario||this.isGameRunning||!((e=this.scenario)==null?void 0:e.onStart))){this.onGameStart(),console.log("Starting game"),this.isGameRunning=!0,this.obstacles=[],this.targets=[],this.gameHud=[];try{console.log("Calling onStart",this.scenario.onStart),this.intepretCode(this.scenario.onStart()),this.renderFrame(),this.gameInterval=setInterval(()=>{this.gameHud=[],this.intepretCode(this.scenario.onUpdate())},this.scenario.initialSpeed||500),this.renderInterval=setInterval(()=>{this.renderFrame()},this.scenario.initialSpeed||100),this.enemyInterval=setInterval(()=>{var t;this.intepretCode((t=this.scenario)==null?void 0:t.onEnemyGeneration())},this.scenario.enemyGenerationSpeed||500),this.targetGenerationInterval=setInterval(()=>{var t;this.intepretCode((t=this.scenario)==null?void 0:t.onTargetGenerated())},this.scenario.targetGenerationSpeed||500)}catch(t){console.error(t)}}}listenToKeys(e){e.code==="Enter"&&this.startGame();const{scenario:t}=this;if(!!this.isGameRunning)try{e.code==="ArrowUp"&&this.intepretCode(t.onUpKey()),e.code==="ArrowDown"&&this.intepretCode(t.onDownKey()),e.code==="ArrowRight"&&this.intepretCode(t.onForwardKey()),e.code==="ArrowLeft"&&this.intepretCode(t.onBackwardKey())}catch(n){console.error(n)}}resize(e,t){if(!e&&!t)return;const n=100*Math.floor(Math.min(t,e)/100);n!==this.size&&(this.size=n,console.log(`Resizing canvas to ${n}`),this.canvas.setAttribute("width",`${n}px`),this.canvas.setAttribute("height",`${n}px`),this.proccessBlocks(this.currentCode))}tearDown(){console.log("Tearing game down"),this.clearGameLoop(),document.removeEventListener("keydown",this.listenToKeys.bind(this))}clearGameLoop(){this.isGameRunning=!1,window.clearInterval(this.renderInterval),window.clearInterval(this.gameInterval),window.clearInterval(this.targetGenerationInterval),window.clearInterval(this.enemyInterval)}drawImage(e,t,n,a=void 0,o=void 0){const i=new Image;i.src=e,i.onload=()=>{this.ctx.drawImage(i,0,0,i.width,i.height,t,n,a,o)}}proccessBlocks(e){this.currentCode=e,console.log(`Interpreting code 
${e}`),this.textSizeInPercentage=5,this.textCursor=[0,0],this.textColor="black",this.textAlign="left",this.customCursor=!1,this.playerPosition=[10,10],this.playerSize=10,this.intepretCode(e)}intepretCode(code){if(!code)return;const engine=this,canvas=this.canvas;if(engine&&canvas)try{eval(code)}catch(e){console.error(e)}}drawBackground(e){if(e||(e=this.backgroundColor),!e)return;const{ctx:t,size:n}=this;t.fillStyle=e,this.backgroundColor=e,t.fillRect(0,0,n,n)}writeText(e,t){if(this.isGameRunning&&!t){this.gameHud.push(()=>this.writeText(e,!0));return}const{ctx:n,canvas:a}=this,o=a.height*this.textSizeInPercentage/100;n.font=`${o}px Arial`,n.fillStyle=this.textColor,n.textAlign=this.textAlign;const[i,s]=this.textCursor;let r=i;if(!this.customCursor)switch(this.textAlign){case"left":r=0;break;case"center":r=a.width/2;break;case"right":r=a.width;break}n.fillText(e,r,s+o),this.textCursor[1]=s+o,this.customCursor=!1}setTextSize(e,t){if(this.isGameRunning&&!t){this.gameHud.push(()=>this.setTextSize(e,!0));return}this.textSizeInPercentage=e}setTextAlign(e,t){if(this.isGameRunning&&!t){this.gameHud.push(()=>this.setTextAlign(e,!0));return}this.textAlign=e}setCursor(e=0,t=0,n){if(this.isGameRunning&&!n){this.gameHud.push(()=>this.setCursor(e,t,!0));return}this.textCursor=[e,t]}setTextColor(e,t){if(this.isGameRunning&&!t){this.gameHud.push(()=>this.setTextColor(e,!0));return}this.textColor=e}setPlayer(e){this.player=e}setScenario(e){console.log("settign scenario",e),this.currentScenario=g({},e);const{player:t}=e;console.log({player:t}),this.renderGame(this.currentScenario)}renderGame(e){try{const{player:t}=e;if(console.log("rendering the game",e),!t){console.log("No game without a  player");return}this.renderFrame(e)}catch(t){console.error(t)}}getPlayerX(){return this.playerPosition[0]}getPlayerY(){return this.playerPosition[1]}setPlayerPosition(e,t){typeof e=="undefined"&&(e=this.getPlayerX()),typeof t=="undefined"&&(t=this.getPlayerY()),this.playerPosition=[e,t],console.log(`Setting player to ${t}`),this.renderFrame()}renderPlayer(e){const{player:t}=e||this.scenario,{canvas:n,ctx:a}=this,o=n.height*this.playerSize/100,[i,s]=this.playerPosition,r=Math.min(n.width,Math.max(0,n.width*i/100-o/2)),l=Math.min(n.height,Math.max(0,n.height*s/100-o/2));this.drawImage(imageMap[t],r,l,o,o)}setAvatar(e){this.scenario.player=e}renderFrame(e,t){this.clearFrame(),this.drawBackground(),this.renderPlayer(e),this.obstacles.forEach(({x:n,y:a,recWidth:o,recHeight:i,color:s})=>{this.drawRectangle(n,a,o,i,s,!0,!1,t)}),this.targets=this.targets.filter(({x:n,y:a,recWidth:o,recHeight:i,color:s})=>!this.drawRectangle(n,a,o,i,s,!1,!0,t)),this.gameHud.forEach((n,a)=>{n()})}clearFrame(){const{ctx:e,canvas:t}=this;e.clearRect(0,0,t.width,t.height),e.beginPath(),e.moveTo(0,0),e.lineTo(t.width,t.height),e.stroke()}drawRectangle(e,t,n,a,o,i,s,r){var E,C;const{ctx:l,canvas:c}=this,{height:d,width:m}=c,h=i||this.withinObstacleGuard,_=s||this.withinObstacleGuard;l.fillStyle=o,this.withinObstacleGuard&&this.obstacles.push({x:e,y:t,recWidth:n,recHeight:a,color:o}),this.withinTargetGuard&&this.targets.push({x:e,y:t,recWidth:n,recHeight:a,color:o});const v=e*m/100,b=t*d/100,k=n*m/100,y=a*d/100;l.fillRect(v,b,k,y);let x=!1;return r||(x=this.checkColision(v,b,k,y)),x&&(h?this.intepretCode((E=this.scenario)==null?void 0:E.onColision()):_&&(this.intepretCode((C=this.scenario)==null?void 0:C.onTargetGrabbed()),this.renderFrame(this.scenario,!0))),x}checkColision(e,t,n,a){if(!this.isGameRunning)return!1;const{canvas:o}=this,i=o.height*this.playerSize/100,[s,r]=this.playerPosition,l=Math.min(o.width,Math.max(0,o.width*s/100-i/2)),c=Math.min(o.height,Math.max(0,o.height*r/100-i/2));return l<e+n&&l+i>e&&c<t+a&&i+c>t}setObstacles(e){!e||(this.withinObstacleGuard=!0,e(),this.withinObstacleGuard=!1)}setTarget(e){!e||(this.withinTargetGuard=!0,e(),this.withinTargetGuard=!1)}moveObstacleX(e){const{width:t}=this.canvas,n=[];this.obstacles.forEach((r,s)=>{var l=r,{x:a,recWidth:o}=l,i=f(l,["x","recWidth"]);var h;const c=g({x:a+e,recWidth:o},i),d=a*t/100,m=o*t/100;d+m>0?n.push(c):((h=this.scenario)==null||h.onObstacleOutside(),console.log("removing obstacle"))}),this.obstacles=n}moveObstacleY(e){const{height:t}=this.canvas,n=[];this.obstacles.forEach((r,s)=>{var l=r,{y:a,recHeight:o}=l,i=f(l,["y","recHeight"]);const c=g({y:a+e,recHeight:o},i),d=a*t/100,m=o*t/100;d+m>0?n.push(c):console.log("removing obstacle")}),this.obstacles=n}moveTargetX(e){const{width:t}=this.canvas,n=[];this.targets.forEach((a,o)=>{const m=a,{x:i,recWidth:s}=m,r=f(m,["x","recWidth"]),l=g({x:i+e,recWidth:s},r),c=i*t/100,d=s*t/100;console.log({absoluteX:c,absoluteWidth:d,deltaX:e,x:i,recWidth:s}),c+d>0?n.push(l):console.log(`removing target, ${c+d}`,{absoluteX:c,absoluteWidth:d,deltaX:e,x:i,recWidth:s,originalTarget:a})}),this.targets=n}moveTargetY(e){const{height:t}=this.canvas;console.log(`Move target y ${e}`);const n=[];this.targets.forEach((r,s)=>{var l=r,{y:a,recHeight:o}=l,i=f(l,["y","recHeight"]);const c=g({y:a+e,recHeight:o},i),d=a*t/100,m=o*t/100;d+m>0?n.push(c):console.log("removing target")}),this.targets=n}endGame(){this.clearGameLoop(),window.setTimeout(()=>{this.intepretCode(this.scenario.onEnd()),this.renderFrame(this.scenario,!0)},100),this.onGameEnd()}onGameUpdated(){this.isGameRunning&&(this.clearGameLoop(),this.onGameEnd())}}const GameArea=({currentPage:e})=>{const t=react.exports.useRef(),n=react.exports.useRef(),a=react.exports.useRef(),[o,i]=react.exports.useState(!1),{getJsCode:s}=react.exports.useContext(WorkspaceContext);react.exports.useEffect(()=>{!a.current||(o&&a.current.onGameUpdated(),a.current.proccessBlocks(s))},[s]);function r(){const{height:c,width:d}=t.current.getBoundingClientRect();!d&&!c||a.current.resize(d,c)}react.exports.useEffect(()=>{if(!a.current)return a.current=new Engine(n.current,()=>i(!0),()=>i(!1)),r(),a.current.proccessBlocks(s),()=>{a.current.tearDown()}},[s]);const l=o?"Game Running":"Game stopped. Press enter to play";return react.exports.useEffect(()=>(window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)),[]),react.exports.useEffect(()=>{!t.current||r()},[e]),jsxs("div",{className:"game-area",children:[jsx("p",{className:"info",children:l}),jsx("div",{className:"container",ref:t,children:jsx("canvas",{ref:n,onBlur:()=>console.log("blur")})})]})},Settings=()=>{const{getWorkspaceXml:e}=react.exports.useContext(WorkspaceContext);return jsxs("div",{className:"settings",children:[jsx("h2",{children:"Settings"}),jsxs("div",{className:"innerWrapper",children:[jsxs("fieldset",{children:[jsx("legend",{children:"Import"}),jsx("p",{children:"Select a file that was previously exported"}),jsxs("div",{children:[jsx("label",{htmlFor:"importCode",children:"Import code"}),jsx("input",{type:"file",id:"importCode",name:"importCode",onChange:async a=>{a.preventDefault();const o=new FileReader;o.onload=async i=>{const s=i.target.result;localStorage.setItem("blockly_saved_workspace",s)},o.readAsText(a.target.files[0])}})]})]}),jsxs("fieldset",{children:[jsx("legend",{children:"Export"}),jsx("p",{children:"Click here to export your current code and use it later"}),jsx("button",{onClick:()=>{const a=new Blob([e],{type:"application/xml"}),o=document.createElement("a");o.download="munich_coding_club.xml",o.href=window.URL.createObjectURL(a),o.onclick=function(i){const s=this;setTimeout(function(){window.URL.revokeObjectURL(s.href)},1500)},o.click(),o.remove()},children:"Export code"})]})]})]})},ContentWrapper=({children:e,currentPage:t})=>{let a=`content-wrapper ${{[PAGE_APP]:"is-app",[PAGE_CODE]:"is-code",[PAGE_MIX]:"is-mix",[PAGE_SETTINGS]:"is-settings"}[t]}`;return jsx("div",{className:a,children:e})},definition$t={type:"game_setup",colour:"#FFAABB",hat:"cap",message0:"Game setup %1 initial speed %2 Enemy generation speed %3  target generation speed %4 %5 player %6 on start %7 on update %8 onEnemyGeneration %9 on end %10 on colision %11 on up key %12 on down key %13 on forward key %14 on back key %15 on obstacle outside %16  on target generation %17  on target grabbed %18",args0:[{type:"input_dummy"},{type:"input_value",name:"initialSpeedDefault"},{type:"input_value",name:"enemyGenerationSpeed",check:"Number"},{type:"input_value",name:"targetGenerationSpeed",check:"Number"},{type:"input_dummy"},{type:"input_statement",name:"player",check:["game_duck","game_chicken","game_dead_duck","game_dead_chicken"]},{type:"input_statement",name:"onStart"},{type:"input_statement",name:"onUpdate"},{type:"input_statement",name:"onEnemyGeneration"},{type:"input_statement",name:"onEnd"},{type:"input_statement",name:"onColision"},{type:"input_statement",name:"onUp"},{type:"input_statement",name:"onDown"},{type:"input_statement",name:"onForward"},{type:"input_statement",name:"onBackward"},{type:"input_statement",name:"onObstacleOutside"},{type:"input_statement",name:"onTargetGenerated"},{type:"input_statement",name:"onTargetGrabbed"}],inputsInline:!1,previousStatement:null,nextStatement:null,tooltip:"Configures the game settings",helpUrl:""},gameSetup=e=>{e.Blocks.game_setup={init:function(){this.jsonInit(definition$t)}},e.JavaScript.game_setup=function(t){const n=e.JavaScript.valueToCode(t,"initialSpeedDefault",e.JavaScript.ORDER_ATOMIC),a=e.JavaScript.valueToCode(t,"enemyGenerationSpeed",e.JavaScript.ORDER_ATOMIC),o=e.JavaScript.valueToCode(t,"targetGenerationSpeed",e.JavaScript.ORDER_ATOMIC),i=e.JavaScript.statementToCode(t,"player");var s=e.JavaScript.statementToCode(t,"onStart"),r=e.JavaScript.statementToCode(t,"onUpdate"),l=e.JavaScript.statementToCode(t,"onEnd");const c=e.JavaScript.statementToCode(t,"onUp"),d=e.JavaScript.statementToCode(t,"onDown"),m=e.JavaScript.statementToCode(t,"onForward"),h=e.JavaScript.statementToCode(t,"onBackward"),_=e.JavaScript.statementToCode(t,"onColision"),v=e.JavaScript.statementToCode(t,"onEnemyGeneration"),b=e.JavaScript.statementToCode(t,"onObstacleOutside"),k=e.JavaScript.statementToCode(t,"onTargetGrabbed"),y=e.JavaScript.statementToCode(t,"onTargetGenerated");return`engine.setScenario(
      {
        initialSpeed: ${n||500},
        enemyGenerationSpeed: ${a||500},
        targetGenerationSpeed: ${o||500},
        player: ${i||"null"},
        onStart: () => {
          ${s}
        },
        onUpdate: () => {
          ${r}
        },
        onEnd: () => {
          ${l}
        },
        onEnemyGeneration: () => {
          ${v}
        },
        onUpKey: () => {
          ${c}
        },
        onDownKey: () => {
          ${d}
        },
        onForwardKey: () => {
          ${m}
        },
        onBackwardKey: () => {
          ${h}
        },
        onColision: () => {
          ${_}
        },
        onObstacleOutside: () => {
          ${b}
        },
        onTargetGrabbed: () => {
          ${k}
        },
        onTargetGenerated: () => {
          ${y}
        }
      });
`}};var duckImage$1="/blockly-player/images/duck.svg";const definition$s={type:"game_duck",message0:"Duck %1",args0:[{type:"field_image",src:duckImage$1,width:40,height:40,alt:"duck",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerDuck=e=>{e.Blocks.game_duck={init:function(){this.jsonInit(definition$s)}},e.JavaScript.game_duck=function(t){var n="PLAYER_DUCK";return n}};var duckImage="/blockly-player/images/deadDuck.svg";const definition$r={type:"game_dead_duck",message0:"Dead Duck %1",args0:[{type:"field_image",src:duckImage,width:40,height:40,alt:"dead duck",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerDeadDuck=e=>{e.Blocks.game_dead_duck={init:function(){this.jsonInit(definition$r)}},e.JavaScript.game_dead_duck=function(t){return"PLAYER_DEAD_DUCK"}};var src="/blockly-player/images/deadChicken.svg";const definition$q={type:"game_dead_chicken",message0:"Dead Chicken %1",args0:[{type:"field_image",src,width:40,height:40,alt:"dead chicken",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerDeadChicken=e=>{e.Blocks.game_dead_chicken={init:function(){this.jsonInit(definition$q)}},e.JavaScript.game_dead_chicken=function(t){var n="PLAYER_DEAD_CHICKEN";return n}},definition$p={type:"game_chicken",message0:"Chicken %1",args0:[{type:"field_image",src:src$1,width:40,height:40,alt:"chicken",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerChicken=e=>{e.Blocks.game_chicken={init:function(){this.jsonInit(definition$p)}},e.JavaScript.game_chicken=function(t){var n="PLAYER_CHICKEN";return n}};function overWrite(e){e.JavaScript.text_print=function(t){return`engine.writeText(${e.JavaScript.valueToCode(t,"TEXT",e.JavaScript.ORDER_NONE)||"''"});
`}}const definition$o={type:"canvas_background_color",message0:"background color %1",args0:[{type:"input_value",name:"backgroundColor",check:"Colour"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},backgroundColor=e=>{e.Blocks.canvas_background_color={init:function(){this.jsonInit(definition$o)}},e.JavaScript.canvas_background_color=function(t){var a=`engine.drawBackground(${e.JavaScript.valueToCode(t,"backgroundColor",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$n={type:"canvas_text_size",message0:"Text size %1",args0:[{type:"input_value",name:"textSize",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},textSize=e=>{e.Blocks.canvas_text_size={init:function(){this.jsonInit(definition$n)}},e.JavaScript.canvas_text_size=function(t){var a=`engine.setTextSize(${e.JavaScript.valueToCode(t,"textSize",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$m={type:"canvas_width",message0:"CANVAS_WIDTH",output:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasWidth=e=>{e.Blocks.canvas_width={init:function(){this.jsonInit(definition$m)}},e.JavaScript.canvas_width=function(t){return["canvas.width",e.JavaScript.ORDER_NONE]}},definition$l={type:"canvas_height",message0:"CANVAS_HEIGHT",output:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasHeight=e=>{e.Blocks.canvas_height={init:function(){this.jsonInit(definition$l)}},e.JavaScript.canvas_height=function(t){return["canvas.width",e.JavaScript.ORDER_NONE]}},definition$k={type:"canvas_set_text_color",message0:"text color %1",args0:[{type:"input_value",name:"textColor",check:"Colour"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasSetTextColor=e=>{e.Blocks.canvas_set_text_color={init:function(){this.jsonInit(definition$k)}},e.JavaScript.canvas_set_text_color=function(t){var a=`engine.setTextColor(${e.JavaScript.valueToCode(t,"textColor",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$j={type:"canvas_set_cursor",message0:"Set Text Cursor %1 X %2 Y %3",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"}],colour:"#6600cc",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},canvasSetCursor=e=>{e.Blocks.canvas_set_cursor={init:function(){this.jsonInit(definition$j)}},e.JavaScript.canvas_set_cursor=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)||0,a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)||0;return`engine.setCursor(${n}, ${a});
`}},definition$i={type:"canvas_draw_rectangle",message0:"drawRectangle %1 x %2 y %3 width %4 height %5 Colour %6",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"},{type:"input_value",name:"width",check:"Number"},{type:"input_value",name:"height",check:"Number"},{type:"input_value",name:"color",check:"Colour"}],colour:"#6600cc",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},canvasDrawRectangle=e=>{e.Blocks.canvas_draw_rectangle={init:function(){this.jsonInit(definition$i)}},e.JavaScript.canvas_draw_rectangle=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC),a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC),o=e.JavaScript.valueToCode(t,"width",e.JavaScript.ORDER_ATOMIC),i=e.JavaScript.valueToCode(t,"height",e.JavaScript.ORDER_ATOMIC),s=e.JavaScript.valueToCode(t,"color",e.JavaScript.ORDER_ATOMIC);return`engine.drawRectangle(${n||0}, ${a||0}, ${o||0}, ${i||0}, ${s})`}},definition$h={type:"canvas_set_text_align",message0:"setTextAlign %1",args0:[{type:"field_dropdown",name:"align",options:[["left","left"],["right","right"],["center","center"]]}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasSetTextAlign=e=>{e.Blocks.canvas_set_text_align={init:function(){this.jsonInit(definition$h)}},e.JavaScript.canvas_set_text_align=function(t){return`engine.setTextAlign('${t.getFieldValue("align")}');
`}},definition$g={type:"player_x",message0:"PLAYER_X",output:null,colour:"#FFAABB",tooltip:"",helpUrl:""},playerX=e=>{e.Blocks.player_x={init:function(){this.jsonInit(definition$g)}},e.JavaScript.player_x=function(t){return["engine.getPlayerX()",e.JavaScript.ORDER_NONE]}},definition$f={type:"player_y",message0:"PLAYER_Y",output:null,colour:"#FFAABB",tooltip:"",helpUrl:""},playerY=e=>{e.Blocks.player_y={init:function(){this.jsonInit(definition$f)}},e.JavaScript.player_y=function(t){return["engine.getPlayerY()",e.JavaScript.ORDER_NONE]}},definition$e={type:"game_obstacle",message0:"Obstacle %1",args0:[{type:"input_statement",name:"obstacle"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameObstacle=e=>{e.Blocks.game_obstacle={init:function(){this.jsonInit(definition$e)}},e.JavaScript.game_obstacle=function(t){return`
    engine.setObstacles(() => {
      ${e.JavaScript.statementToCode(t,"obstacle")}
    })
    ;
`}},definition$d={type:"game_target",message0:"Target %1",args0:[{type:"input_statement",name:"target"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameTarget=e=>{e.Blocks.game_target={init:function(){this.jsonInit(definition$d)}},e.JavaScript.game_target=function(t){return`
    engine.setTarget(() => {
      ${e.JavaScript.statementToCode(t,"target")}
    })
    ;
`}},definition$c={type:"game_set_player_position",message0:"Set Player position %1 X %2 Y %3",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},gameSetPlayerPosition=e=>{e.Blocks.game_set_player_position={init:function(){this.jsonInit(definition$c)}},e.JavaScript.game_set_player_position=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)||0,a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)||0;return`engine.setPlayerPosition(${n}, ${a});
`}},definition$b={type:"game_set_player_position_x",message0:"Set Player position X %1",args0:[{type:"input_value",name:"x",check:"Number"}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},gameSetPlayerPositionX=e=>{e.Blocks.game_set_player_position_x={init:function(){this.jsonInit(definition$b)}},e.JavaScript.game_set_player_position_x=function(t){return`engine.setPlayerPosition(${e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)||0});
`}},definition$a={type:"game_set_player_position_y",message0:"Set Player position Y %1",args0:[{type:"input_value",name:"y",check:"Number"}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},gameSetPlayerPositionY=e=>{e.Blocks.game_set_player_position_y={init:function(){this.jsonInit(definition$a)}},e.JavaScript.game_set_player_position_y=function(t){return`engine.setPlayerPosition(undefined,${e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)||0});
`}},definition$9={type:"game_move_obstacle_x",message0:"move obstacle x %1",args0:[{type:"input_value",name:"x",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveObstacleX=e=>{e.Blocks.game_move_obstacle_x={init:function(){this.jsonInit(definition$9)}},e.JavaScript.game_move_obstacle_x=function(t){return`engine.moveObstacleX(${e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)});`}},definition$8={type:"game_move_obstacle_y",message0:"move obstacle y %1",args0:[{type:"input_value",name:"y",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveObstacleY=e=>{e.Blocks.game_move_obstacle_y={init:function(){this.jsonInit(definition$8)}},e.JavaScript.game_move_obstacle_y=function(t){return`engine.moveObstacleY(${e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)});`}},definition$7={type:"game_move_target_x",message0:"move target x %1",args0:[{type:"input_value",name:"x",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveTargetX=e=>{e.Blocks.game_move_target_x={init:function(){this.jsonInit(definition$7)}},e.JavaScript.game_move_target_x=function(t){return`engine.moveTargetX(${e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)});`}},definition$6={type:"game_move_target_y",message0:"move target y %1",args0:[{type:"input_value",name:"y",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveTargetY=e=>{e.Blocks.game_move_target_y={init:function(){this.jsonInit(definition$6)}},e.JavaScript.game_move_target_y=function(t){return`engine.moveTargetY(${e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)});`}},definition$5={type:"game_end_game",message0:"end game",previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameEndGame=e=>{e.Blocks.game_end_game={init:function(){this.jsonInit(definition$5)}},e.JavaScript.game_end_game=function(t){return`engine.endGame();
`}},definition$4={type:"game_set_player_icon",message0:"set player icon %1",args0:[{type:"input_statement",name:"playerIcon"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},setPlayerIcon=e=>{e.Blocks.game_set_player_icon={init:function(){this.jsonInit(definition$4)}},e.JavaScript.game_set_player_icon=function(t){return`engine.setAvatar(${e.JavaScript.statementToCode(t,"playerIcon")});
`}};var arrow$3="/blockly-player/images/arrowRight.svg";const definition$3={type:"arrow_right",message0:"%1",args0:[{type:"field_image",src:arrow$3,width:420/4,height:220/4,alt:"arrow",flipRtl:!1}],colour:"#000000",tooltip:"",helpUrl:"",previousStatement:null},arrowLeft=e=>{e.Blocks.arrow_right={init:function(){this.jsonInit(definition$3)}},e.JavaScript.arrow_right=function(t){var n="";return n}};var arrow$2="/blockly-player/images/arrowLeft.svg";const definition$2={type:"arrow_left",message0:"%1",args0:[{type:"field_image",src:arrow$2,width:420/4,height:220/4,alt:"arrow",flipRtl:!1}],colour:"#000000",tooltip:"",helpUrl:"",previousStatement:null},arrowRight=e=>{e.Blocks.arrow_left={init:function(){this.jsonInit(definition$2)}},e.JavaScript.arrow_left=function(t){var n="";return n}};var arrow$1="/blockly-player/images/arrowDown.svg";const definition$1={type:"arrow_down",message0:"%1",args0:[{type:"field_image",src:arrow$1,height:420/4,width:220/4,alt:"arrow",flipRtl:!1}],colour:"#000000",tooltip:"",helpUrl:"",previousStatement:null},arrowDown=e=>{e.Blocks.arrow_down={init:function(){this.jsonInit(definition$1)}},e.JavaScript.arrow_down=function(t){var n="";return n}};var arrow="/blockly-player/images/arrowUp.svg";const definition={type:"arrow_up",message0:"%1",args0:[{type:"field_image",src:arrow,height:420/4,width:220/4,alt:"arrow",flipRtl:!1}],colour:"#000000",tooltip:"",helpUrl:"",previousStatement:null},arrowUp=e=>{e.Blocks.arrow_up={init:function(){this.jsonInit(definition)}},e.JavaScript.arrow_up=function(t){var n="";return n}};function initializeCustomBlocks(e){gameSetup(e),playerDuck(e),playerChicken(e),overWrite(e),backgroundColor(e),textSize(e),canvasWidth(e),canvasHeight(e),canvasSetCursor(e),canvasSetTextAlign(e),canvasSetTextColor(e),canvasDrawRectangle(e),playerY(e),playerX(e),gameSetPlayerPosition(e),gameSetPlayerPositionX(e),gameSetPlayerPositionY(e),gameObstacle(e),gameTarget(e),gameMoveObstacleX(e),gameMoveObstacleY(e),gameMoveTargetX(e),gameMoveTargetY(e),gameEndGame(e),playerDeadDuck(e),playerDeadChicken(e),setPlayerIcon(e),arrowLeft(e),arrowRight(e),arrowDown(e),arrowUp(e)}const toolbox={kind:"categoryToolbox",contents:[{kind:"category",name:"Loops",colour:"#5ba55b",contents:[{kind:"block",blockxml:`<block type="controls_repeat_ext">
     <value name="TIMES">
       <shadow type="math_number">
         <field name="NUM">10</field>
       </shadow>
     </value>
   </block>`},{kind:"block",blockxml:`    <block type="controls_whileUntil">
        <field name="MODE">WHILE</field>
      </block>`},{kind:"block",blockxml:`    <block type="controls_for">
        <field name="VAR" id="a:~Oo3dd$G}ExN2-PZCh">i</field>
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:` <block type="controls_forEach">
        <field name="VAR" id="YdZp%x}jHaEo(d*?3_A;">j</field>
      </block>`},{kind:"block",blockxml:`   
        <block type="controls_flow_statements">
          <field name="FLOW">BREAK</field>
        </block>`}]},{kind:"category",name:"logic",colour:"210",contents:[{kind:"block",type:"controls_if"},{kind:"block",type:"controls_whileUntil"},{kind:"block",blockxml:`<block type="logic_compare">
            <field name="OP">EQ</field>
          </block>`},{kind:"block",blockxml:`<block type="logic_operation">
          <field name="OP">AND</field>
        </block>`},{kind:"block",blockxml:`<block type="logic_boolean">
        <field name="BOOL">TRUE</field>
      </block>`},{kind:"block",type:"logic_negate"},{kind:"block",type:"logic_null"},{kind:"block",type:"logic_ternary"}]},{kind:"category",name:"Math",colour:"#5b67a5",contents:[{kind:"block",blockxml:`    <block type="math_number">
        <field name="NUM">0</field>
      </block>`},{kind:"block",blockxml:`<block type="math_arithmetic">
        <field name="OP">ADD</field>
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="math_single">
        <field name="OP">ROOT</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">9</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`<block type="math_trig">
        <field name="OP">SIN</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">45</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`<block type="math_constant">
        <field name="CONSTANT">PI</field>
      </block>`},{kind:"block",blockxml:`    <block type="math_number_property">
        <mutation divisor_input="false"></mutation>
        <field name="PROPERTY">EVEN</field>
        <value name="NUMBER_TO_CHECK">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="math_round">
        <field name="OP">ROUND</field>
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">3.1</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`<block type="math_on_list">
          <mutation op="SUM"></mutation>
          <field name="OP">SUM</field>
        </block>`},{kind:"block",blockxml:`    <block type="math_modulo">
        <value name="DIVIDEND">
          <shadow type="math_number">
            <field name="NUM">64</field>
          </shadow>
        </value>
        <value name="DIVISOR">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="math_constrain">
        <value name="VALUE">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="LOW">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="HIGH">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`  <block type="math_random_int">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>`},{kind:"block",type:"math_random_float"}]},{kind:"category",name:"text",colour:"#5ba58c",contents:[{kind:"block",blockxml:`    <block type="text">
          <field name="TEXT"></field>
        </block>`},{kind:"block",blockxml:`
        <block type="text_join">
          <mutation items="2"></mutation>
        </block>`},{kind:"block",blockxml:`    <block type="text_append">
        <field name="VAR" id="-O]*Wz)]VbSmB]W@kR=~">item</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`
        <block type="text_length">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT">abc</field>
            </shadow>
          </value>
        </block>`},{kind:"block",blockxml:`
        <block type="text_isEmpty">
          <value name="VALUE">
            <shadow type="text">
              <field name="TEXT"></field>
            </shadow>
          </value>
        </block>`},{kind:"block",blockxml:`    <block type="text_indexOf">
        <field name="END">FIRST</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="e=5Ke)U;9Jh(}sO[8ufJ">text</field>
          </block>
        </value>
        <value name="FIND">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="text_charAt">
        <mutation at="true"></mutation>
        <field name="WHERE">FROM_START</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="e=5Ke)U;9Jh(}sO[8ufJ">text</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="text_getSubstring">
        <mutation at1="true" at2="true"></mutation>
        <field name="WHERE1">FROM_START</field>
        <field name="WHERE2">FROM_START</field>
        <value name="STRING">
          <block type="variables_get">
            <field name="VAR" id="e=5Ke)U;9Jh(}sO[8ufJ">text</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="text_changeCase">
        <field name="CASE">UPPERCASE</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`  <block type="text_trim">
        <field name="MODE">BOTH</field>
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>`}]},{kind:"category",name:"Lists",colour:"#745ba5",contents:[{kind:"block",blockxml:` <block type="lists_create_with">
          <mutation items="0"></mutation>
        </block>`},{kind:"block",blockxml:`<block type="lists_create_with">
        <mutation items="3"></mutation>
      </block>`},{kind:"block",blockxml:`  <block type="lists_repeat">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>`},{kind:"block",type:"lists_length"},{kind:"block",blockxml:`    <block type="lists_indexOf">
        <field name="END">FIRST</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="SI7zr5S(=TA;_(uU4!]J">list</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:` <block type="lists_getIndex">
        <mutation statement="false" at="true"></mutation>
        <field name="MODE">GET</field>
        <field name="WHERE">FROM_START</field>
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR" id="SI7zr5S(=TA;_(uU4!]J">list</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="lists_setIndex">
        <mutation at="true"></mutation>
        <field name="MODE">SET</field>
        <field name="WHERE">FROM_START</field>
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR" id="SI7zr5S(=TA;_(uU4!]J">list</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:`    <block type="lists_getSublist">
        <mutation at1="true" at2="true"></mutation>
        <field name="WHERE1">FROM_START</field>
        <field name="WHERE2">FROM_START</field>
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR" id="SI7zr5S(=TA;_(uU4!]J">list</field>
          </block>
        </value>
      </block>`},{kind:"block",blockxml:` <block type="lists_split">
        <mutation mode="SPLIT"></mutation>
        <field name="MODE">SPLIT</field>
        <value name="DELIM">
          <shadow type="text">
            <field name="TEXT">,</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:`   <block type="lists_sort">
        <field name="TYPE">NUMERIC</field>
        <field name="DIRECTION">1</field>
      </block>`}]},{kind:"category",name:"Colour",colour:"#a5745b",contents:[{kind:"block",blockxml:`    <block type="colour_picker">
     <field name="COLOUR">#ff0000</field>
   </block>`},{kind:"block",type:"colour_random"},{kind:"block",blockxml:` <block type="colour_rgb">
        <value name="RED">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="GREEN">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="BLUE">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>`},{kind:"block",blockxml:` <block type="colour_blend">
        <value name="COLOUR1">
          <shadow type="colour_picker">
            <field name="COLOUR">#ff0000</field>
          </shadow>
        </value>
        <value name="COLOUR2">
          <shadow type="colour_picker">
            <field name="COLOUR">#3333ff</field>
          </shadow>
        </value>
        <value name="RATIO">
          <shadow type="math_number">
            <field name="NUM">0.5</field>
          </shadow>
        </value>
      </block>`}]},{kind:"sep"},{kind:"category",name:"Variables",colour:"#a55b80",custom:"VARIABLE"},{kind:"category",name:"Procedures",colour:"#995ba5",custom:"PROCEDURE"},{kind:"sep"},{kind:"category",name:"canvas",colour:"#6600cc",contents:[{kind:"block",blockxml:` <block type="canvas_background_color">
    <value name="backgroundColor">
      <shadow type="colour_picker">
        <field name="COLOUR">#33ccff</field>
      </shadow>
    </value>
  </block>`},{kind:"block",blockxml:` <block type="canvas_set_text_color">
    <value name="textColor">
      <shadow type="colour_picker">
        <field name="COLOUR">#000000</field>
      </shadow>
    </value>
  </block>`},{kind:"block",type:"canvas_set_text_align"},{kind:"block",blockxml:` <block type="canvas_text_size">
    <value name="textSize">
      <shadow type="math_number">
        <field name="NUM">3</field>

      </shadow>
    </value>
  </block>`},{kind:"block",blockxml:` <block type="canvas_draw_rectangle">
          <value name="color">
          <shadow type="colour_picker">
            <field name="COLOUR">#00FF00</field>
          </shadow>
          
        </value>
        <value name="x">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="y">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
        <value name="width">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
      <value name="height">
        <shadow type="math_number">
          <field name="NUM">35</field>
        </shadow>
      </value>
  </block>`},{kind:"block",type:"canvas_width"},{kind:"block",type:"canvas_height"},{kind:"block",blockxml:`<block type="canvas_set_cursor">
          <value name="x">
            <shadow type="math_number">
              <field name="NUM">0</field>
      
            </shadow>
          </value>
          <value name="y">
          <shadow type="math_number">
            <field name="NUM">0</field>
    
          </shadow>
        </value>
        </block>`}]},{kind:"category",name:"game",colour:"#FFAABB",contents:[{kind:"block",blockxml:`<block type="game_setup">
          <value name="initialSpeedDefault">
            <shadow type="math_number">
              <field name="NUM">500</field>
            </shadow>
          </value>
          <value name="enemyGenerationSpeed">
            <shadow type="math_number">
              <field name="NUM">900</field>
      
            </shadow>
          </value>
          <value name="targetGenerationSpeed">
            <shadow type="math_number">
              <field name="NUM">2000</field>
      
            </shadow>
          </value>
        </block>`},{kind:"block",type:"game_duck"},{kind:"block",type:"game_dead_duck"},{kind:"block",type:"game_chicken"},{kind:"block",type:"game_dead_chicken"},{kind:"block",type:"player_x"},{kind:"block",type:"player_y"},{kind:"block",type:"game_set_player_position"},{kind:"block",type:"game_set_player_position_x"},{kind:"block",type:"game_set_player_position_y"},{kind:"block",type:"game_set_player_icon"},{kind:"block",type:"game_obstacle"},{kind:"block",type:"game_target"},{kind:"block",type:"game_move_obstacle_x"},{kind:"block",type:"game_move_obstacle_y"},{kind:"block",type:"game_move_target_x"},{kind:"block",type:"game_move_target_y"},{kind:"block",type:"game_end_game"}]},{kind:"category",name:"arrows",colour:"#000000",contents:[{kind:"block",type:"arrow_left"},{kind:"block",type:"arrow_right"},{kind:"block",type:"arrow_up"},{kind:"block",type:"arrow_down"}]}]};function debounce(e,t=300){let n;return(...a)=>{clearTimeout(n),n=setTimeout(()=>{e.apply(this,a)},t)}}function initialize(e,t,n,i){var s=i,{initialXml:a}=s,o=f(s,["initialXml"]);initializeCustomBlocks(Blockly),console.log("initializing blockly"),Blockly.setLocale(locale);const r=Blockly.inject(e,g({toolbox},o)),l="blockly_saved_workspace",c=m=>{const h=Blockly.Xml.workspaceToDom(r),_=Blockly.Xml.domToText(h);n(_),localStorage.setItem(l,_),t(Blockly.JavaScript.workspaceToCode(r))},d=localStorage.getItem(l);return n(d),r.addChangeListener(debounce(c,500)),Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(d||a),r),t(Blockly.JavaScript.workspaceToCode(r)),r}const BlocklyEditor=a=>{var o=a,{currentPage:e,children:t}=o,n=f(o,["currentPage","children"]);const i=react.exports.useRef(),s=react.exports.useRef();let r=react.exports.useRef();const{setGetJsCode:l,setWorkspaceXml:c}=react.exports.useContext(WorkspaceContext);function d(){if(!r.current||!s.current)return;Blockly.svgResize(r.current);const{height:m,width:h}=s.current.getBoundingClientRect();console.info(`Resizing blockly to ${m}`),!!m&&(i.current.querySelector(".blocklySvg").setAttribute("height",`${m}px`),i.current.querySelector(".blocklySvg").setAttribute("width",`${h}px`))}return react.exports.useEffect(()=>{r.current||(r.current=initialize(i.current,l,c,n),new ResizeObserver(d).observe(s.current))}),react.exports.useEffect(()=>{},[e]),jsx("div",{className:"blockly-container",ref:s,children:jsx("div",{ref:i,id:"blocklyDiv"})})};function App(){const[e,t]=react.exports.useState(PAGE_MIX),[n,a]=react.exports.useState(()=>""),[o,i]=react.exports.useState(()=>"");return jsx(WorkspaceContext.Provider,{value:{getJsCode:n,setGetJsCode:a,getWorkspaceXml:o,setWorkspaceXml:i},children:jsxs(Wrapper,{children:[jsx(Navigator,{onApp:()=>t(PAGE_APP),onCode:()=>t(PAGE_CODE),onMix:()=>t(PAGE_MIX),onSettings:()=>t(PAGE_SETTINGS),currentPage:e}),jsxs(ContentWrapper,{currentPage:e,children:[(e===PAGE_MIX||e===PAGE_CODE)&&jsx(BlocklyEditor,{readOnly:!1,trashcan:!0,currentPage:e,move:{scrollbars:!0,drag:!0,wheel:!0},zoom:{controls:!0,wheel:!0},initialXml:`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="canvas_background_color" id="4SVzU|aWhU*Nh|9P+X" x="253" y="275"><value name="backgroundColor"><shadow type="colour_picker" id="*F3FFG@6zp?g?@C2[LO("><field name="COLOUR">#33ccff</field></shadow></value><next><block type="text_print" id="nwR,iP,?~nzM.3|5.94|"><value name="TEXT"><shadow type="text" id="ZuNhv^os)g9;0T!sty|"><field name="TEXT">Ol\xE1</field></shadow></value></block></next></block></xml>
      `}),(e===PAGE_MIX||e===PAGE_APP)&&jsx(GameArea,{currentPage:e}),e===PAGE_SETTINGS&&jsx(Settings,{})]})]})})}ReactDOM.render(jsx(React.StrictMode,{children:jsx(App,{})}),document.getElementById("root"));
