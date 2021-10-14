var S=Object.defineProperty;var v=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var g=(e,t,n)=>t in e?S(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,f=(e,t)=>{for(var n in t||(t={}))y.call(t,n)&&g(e,n,t[n]);if(v)for(var n of v(t))x.call(t,n)&&g(e,n,t[n]);return e};var b=(e,t)=>{var n={};for(var a in e)y.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(e!=null&&v)for(var a of v(e))t.indexOf(a)<0&&x.call(e,a)&&(n[a]=e[a]);return n};var r=(e,t,n)=>(g(e,typeof t!="symbol"?t+"":t,n),n);import{j as jsxRuntime,r as react,B as Blockly,l as locale,R as ReactDOM,a as React}from"./vendor.72d455e7.js";const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}};p();var index="";const jsx=jsxRuntime.exports.jsx,jsxs=jsxRuntime.exports.jsxs,Wrapper=({children:e})=>jsx("div",{className:"wrapper",children:e}),PAGE_CODE=0,PAGE_MIX=1,PAGE_APP=2,Navigator=({onCode:e,onMix:t,onApp:n,currentPage:a})=>jsxs("nav",{className:"navigator",children:[jsx("div",{className:"menu-item",onClick:e,"data-is-current":a===PAGE_CODE,children:"Code"}),jsx("div",{className:"menu-item",onClick:t,"data-is-current":a===PAGE_MIX,children:"Mix"}),jsx("div",{className:"menu-item",onClick:n,"data-is-current":a===PAGE_APP,children:"App"})]});var duckImage="/blockly-player/images/duck.png",src="/blockly-player/images/chicken.png";const PLAYER_DUCK=Symbol("PLAYER_DUCK"),PLAYER_CHICKEN=Symbol("PLAYER_CHICKEN"),imageMap={[PLAYER_DUCK]:duckImage,[PLAYER_CHICKEN]:src};class Engine{constructor(e){r(this,"canvas");r(this,"ctx");r(this,"textSizeInPercentage",5);r(this,"textCursor",[0,0]);r(this,"textColor","black");r(this,"textAlign","left");r(this,"customCursor",!1);r(this,"scenario",{});r(this,"currentCode");r(this,"isGameRunning",!1);r(this,"playerPosition",[10,10]);r(this,"playerSize",10);r(this,"withinObstacleGuard",!1);r(this,"obstacles",[]);r(this,"gameInterval");r(this,"enemyInterval");this.canvas=e,this.ctx=e.getContext("2d"),this.ctx.font="20px arial",document.addEventListener("keydown",this.listenToKeys.bind(this))}handleStart(){console.log("Will start interactions"),this.proccessBlocks(this.currentCode)}startGame(){if(this.scenario&&!this.isGameRunning){this.isGameRunning=!0,this.obstacles=[];try{console.log("Calling onStart",this.scenario.onStart),this.intepretCode(this.scenario.onStart()),this.renderFrame(),this.gameInterval=setInterval(()=>{this.intepretCode(this.scenario.onUpdate()),this.renderFrame()},this.scenario.initialSpeed||500),this.enemyInterval=setInterval(()=>{this.intepretCode(this.scenario.onEnemyGeneration()),this.renderFrame()},this.scenario.enemyGenerationSpeed||500)}catch(e){console.error(e)}}}listenToKeys(e){e.code==="Enter"&&this.startGame();const{scenario:t}=this;if(!!this.isGameRunning)try{e.code==="ArrowUp"&&this.intepretCode(t.onUpKey()),e.code==="ArrowDown"&&this.intepretCode(t.onDownKey()),e.code==="ArrowRight"&&this.intepretCode(t.onForwardKey()),e.code==="ArrowLeft"&&this.intepretCode(t.onBackwardKey())}catch(n){console.error(n)}}resize(e,t){if(!e&&!t)return;const n=100*Math.floor(Math.min(t,e)/100);n!==this.size&&(this.size=n,console.log(`Resizing canvas to ${n}`),this.canvas.setAttribute("width",`${n}px`),this.canvas.setAttribute("height",`${n}px`),this.proccessBlocks(this.currentCode))}tearDown(){this.clearGameLoop(),document.removeEventListener("keydown",this.listenToKeys.bind(this))}clearGameLoop(){window.clearInterval(this.gameInterval),window.clearInterval(this.enemyInterval)}drawImage(e,t,n,a=void 0,i=void 0){const o=new Image;o.src=e,o.onload=()=>{this.ctx.drawImage(o,0,0,o.width,o.height,t,n,a,i)}}proccessBlocks(e){this.canvas,this.currentCode=e,console.log(`Interpreting code 
${e}`),this.textSizeInPercentage=5,this.textCursor=[0,0],this.textColor="black",this.textAlign="left",this.customCursor=!1,this.playerPosition=[10,10],this.playerSize=10,this.intepretCode(e)}intepretCode(code){this.canvas;try{eval(code)}catch(e){console.error(e)}}drawBackground(e){if(e||(e=this.backgroundColor),!e)return;const{ctx:t,size:n}=this;t.fillStyle=e,this.backgroundColor=e,t.fillRect(0,0,n,n)}writeText(e){const{ctx:t,canvas:n}=this,a=n.height*this.textSizeInPercentage/100;t.font=`${a}px Arial`,t.fillStyle=this.textColor,t.textAlign=this.textAlign;const[i,o]=this.textCursor;let l=i;if(!this.customCursor)switch(this.textAlign){case"left":l=0;break;case"center":l=n.width/2;break;case"right":l=n.width;break}t.fillText(e,l,o+a),this.textCursor[1]=o+a,this.customCursor=!1}setTextSize(e){this.textSizeInPercentage=e}setTextAlign(e){this.textAlign=e}setCursor(e=0,t=0){this.textCursor=[e,t],this.customCursor=!0}setTextColor(e){this.textColor=e}setPlayer(e){this.player=e}setScenario(e){this.scenario=f({},e);const{player:t}=e;console.log({player:t}),this.renderGame(this.scenario)}renderGame(e){try{const{player:t}=e;if(console.log("rendering the game",e),!t){console.log("No game without a  player");return}this.renderFrame()}catch(t){console.error(t)}}getPlayerX(){return this.playerPosition[0]}getPlayerY(){return this.playerPosition[1]}setPlayerPosition(e,t){this.playerPosition=[e,t],console.log(`Setting player to ${t}`),this.renderFrame()}renderPlayer(e){const{player:t}=e||this.scenario,{canvas:n,ctx:a}=this,i=n.height*this.playerSize/100,[o,l]=this.playerPosition,s=Math.min(n.width,Math.max(0,n.width*o/100-i/2)),c=Math.min(n.height,Math.max(0,n.height*l/100-i/2));this.drawImage(imageMap[t],s,c,i,i)}renderFrame(){const{ctx:e,canvas:t}=this;e.clearRect(0,0,t.width,t.height),this.drawBackground(),this.renderPlayer(),this.obstacles.forEach(({x:n,y:a,recWidth:i,recHeight:o,color:l})=>{this.drawRectangle(n,a,i,o,l,!0)})}drawRectangle(e,t,n,a,i,o){const{ctx:l,canvas:s}=this,{height:c,width:d}=s,u=o||this.withinObstacleGuard;l.fillStyle=i,this.withinObstacleGuard&&this.obstacles.push({x:e,y:t,recWidth:n,recHeight:a,color:i});const m=e*d/100,h=t*c/100,k=n*d/100,_=a*c/100;l.fillRect(m,h,k,_),u&&this.checkColision(m,h,k,_)}checkColision(e,t,n,a){const{canvas:i}=this,o=i.height*this.playerSize/100,[l,s]=this.playerPosition,c=Math.min(i.width,Math.max(0,i.width*l/100-o/2)),d=Math.min(i.height,Math.max(0,i.height*s/100-o/2));c<e+n&&c+o>e&&d<t+a&&o+d>t?(this.intepretCode(this.scenario.onColision()),console.log("Colisao!")):console.log("SEM COLISAO",{x:c,y:d,size:o,obstacleX:e,obstacleY:t,obstacleWidth:n,obstacleHeight:a})}setObstacles(e){!e||(this.withinObstacleGuard=!0,e(),this.withinObstacleGuard=!1)}moveObstacleX(e){const{width:t}=this.canvas,n=[];this.obstacles.forEach((s,l)=>{var c=s,{x:a,recWidth:i}=c,o=b(c,["x","recWidth"]);const d=f({x:a+e,recWidth:i},o),u=a*t/100,m=i*t/100;u+m>0?n.push(d):console.log("removing obstacle")}),this.obstacles=n}moveObstacleY(e){const{height:t}=this.canvas,n=[];this.obstacles.forEach((s,l)=>{var c=s,{y:a,recHeight:i}=c,o=b(c,["y","recHeight"]);const d=f({y:a+e,recHeight:i},o),u=a*t/100,m=i*t/100;u+m>0?n.push(d):console.log("removing obstacle")}),this.obstacles=n}endGame(){this.clearGameLoop(),this.intepretCode(this.scenario.onEnd())}}const WorkspaceContext=react.exports.createContext(),GameArea=({currentPage:e})=>{const t=react.exports.useRef(),n=react.exports.useRef(),a=react.exports.useRef(),{getJsCode:i}=react.exports.useContext(WorkspaceContext);react.exports.useEffect(()=>{!a.current||a.current.proccessBlocks(i)},[i]);function o(){const{height:l,width:s}=t.current.getBoundingClientRect();!s&&!l||a.current.resize(s,l)}return react.exports.useEffect(()=>(a.current=new Engine(n.current),o(),()=>{a.current.tearDown()}),[]),react.exports.useEffect(()=>(window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)),[]),react.exports.useEffect(()=>{!t.current||e!==PAGE_CODE&&o()},[e]),jsx("div",{className:"game-area",ref:t,children:jsx("canvas",{ref:n,onClick:()=>{var l;return(l=a.current)==null?void 0:l.handleStart()},onBlur:()=>console.log("blur")})})},ContentWrapper=({children:e,currentPage:t})=>{let a=`content-wrapper ${{[PAGE_APP]:"is-app",[PAGE_CODE]:"is-code",[PAGE_MIX]:"is-mix"}[t]}`;return jsx("div",{className:a,children:e})},definition$h={type:"game_setup",colour:"#FFAABB",hat:"cap",message0:"Game setup %1 initial speed %2 %3 enemy_generation_speed %4 %5 player %6 on start %7 on update %8 onEnemyGeneration %9 on end %10 on colision %11 on up key %12 on down key %13 on forward key %14 on back key %15",args0:[{type:"input_dummy"},{type:"field_input",name:"initialSpeedDefault",text:"500"},{type:"input_dummy"},{type:"field_input",name:"enemyGenerationSpeed",text:"500"},{type:"input_dummy"},{type:"input_statement",name:"player",check:["game_duck","game_chicken"]},{type:"input_statement",name:"onStart"},{type:"input_statement",name:"onUpdate"},{type:"input_statement",name:"onEnemyGeneration"},{type:"input_statement",name:"onEnd"},{type:"input_statement",name:"onColision"},{type:"input_statement",name:"onUp"},{type:"input_statement",name:"onDown"},{type:"input_statement",name:"onForward"},{type:"input_statement",name:"onBackward"}],inputsInline:!1,previousStatement:null,nextStatement:null,tooltip:"Configures the game settings",helpUrl:""},gameSetup=e=>{e.Blocks.game_setup={init:function(){this.jsonInit(definition$h)}},e.JavaScript.game_setup=function(t){const n=t.getFieldValue("initialSpeedDefault"),a=t.getFieldValue("enemyGenerationSpeed"),i=e.JavaScript.statementToCode(t,"player");var o=e.JavaScript.statementToCode(t,"onStart"),l=e.JavaScript.statementToCode(t,"onUpdate"),s=e.JavaScript.statementToCode(t,"onEnd");const c=e.JavaScript.statementToCode(t,"onUp"),d=e.JavaScript.statementToCode(t,"onDown"),u=e.JavaScript.statementToCode(t,"onForward"),m=e.JavaScript.statementToCode(t,"onBackward"),h=e.JavaScript.statementToCode(t,"onColision"),k=e.JavaScript.statementToCode(t,"onEnemyGeneration");return console.log({onColision:h}),`engine.setScenario(
      {
        initialSpeed: ${n},
        enemyGenerationSpeed: ${a},
        player: ${i||"null"},
        onStart: () => {
          ${o}
        },
        onUpdate: () => {
          ${l}
        },
        onEnd: () => {
          ${s}
        },
        onEnemyGeneration: () => {
          ${k}
        },
        onUpKey: () => {
          ${c}
        },
        onDownKey: () => {
          ${d}
        },
        onForwardKey: () => {
          ${u}
        },
        onBackwardKey: () => {
          ${m}
        },
        onColision: () => {
          ${h}
        }
      });
`}},definition$g={type:"game_duck",message0:"Duck %1",args0:[{type:"field_image",src:duckImage,width:40,height:40,alt:"duck",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerDuck=e=>{e.Blocks.game_duck={init:function(){this.jsonInit(definition$g)}},e.JavaScript.game_duck=function(t){var n="PLAYER_DUCK";return n}},definition$f={type:"game_chicken",message0:"Chicken %1",args0:[{type:"field_image",src,width:40,height:40,alt:"chicken",flipRtl:!1}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null},playerChicken=e=>{e.Blocks.game_chicken={init:function(){this.jsonInit(definition$f)}},e.JavaScript.game_chicken=function(t){var n="PLAYER_CHICKEN";return n}};function overWrite(e){e.JavaScript.text_print=function(t){return`engine.writeText(${e.JavaScript.valueToCode(t,"TEXT",e.JavaScript.ORDER_NONE)||"''"});
`}}const definition$e={type:"canvas_background_color",message0:"background color %1",args0:[{type:"input_value",name:"backgroundColor",check:"Colour"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},backgroundColor=e=>{e.Blocks.canvas_background_color={init:function(){this.jsonInit(definition$e)}},e.JavaScript.canvas_background_color=function(t){var a=`engine.drawBackground(${e.JavaScript.valueToCode(t,"backgroundColor",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$d={type:"canvas_text_size",message0:"Text size %1",args0:[{type:"input_value",name:"textSize",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},textSize=e=>{e.Blocks.canvas_text_size={init:function(){this.jsonInit(definition$d)}},e.JavaScript.canvas_text_size=function(t){var a=`engine.setTextSize(${e.JavaScript.valueToCode(t,"textSize",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$c={type:"canvas_width",message0:"CANVAS_WIDTH",output:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasWidth=e=>{e.Blocks.canvas_width={init:function(){this.jsonInit(definition$c)}},e.JavaScript.canvas_width=function(t){return["canvas.width",e.JavaScript.ORDER_NONE]}},definition$b={type:"canvas_height",message0:"CANVAS_HEIGHT",output:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasHeight=e=>{e.Blocks.canvas_height={init:function(){this.jsonInit(definition$b)}},e.JavaScript.canvas_height=function(t){return["canvas.width",e.JavaScript.ORDER_NONE]}},definition$a={type:"canvas_set_text_color",message0:"text color %1",args0:[{type:"input_value",name:"textColor",check:"Colour"}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasSetTextColor=e=>{e.Blocks.canvas_set_text_color={init:function(){this.jsonInit(definition$a)}},e.JavaScript.canvas_set_text_color=function(t){var a=`engine.setTextColor(${e.JavaScript.valueToCode(t,"textColor",e.JavaScript.ORDER_NONE)||"''"});
`;return a}},definition$9={type:"canvas_set_cursor",message0:"Set Text Cursor %1 X %2 Y %3",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"}],colour:"#6600cc",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},canvasSetCursor=e=>{e.Blocks.canvas_set_cursor={init:function(){this.jsonInit(definition$9)}},e.JavaScript.canvas_set_cursor=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)||0,a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)||0;return`engine.setCursor(${n}, ${a});
`}},definition$8={type:"canvas_draw_rectangle",message0:"drawRectangle %1 x %2 y %3 width %4 height %5 Colour %6",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"},{type:"input_value",name:"width",check:"Number"},{type:"input_value",name:"height",check:"Number"},{type:"input_value",name:"color",check:"Colour"}],colour:"#6600cc",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},canvasDrawRectangle=e=>{e.Blocks.canvas_draw_rectangle={init:function(){this.jsonInit(definition$8)}},e.JavaScript.canvas_draw_rectangle=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC),a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC),i=e.JavaScript.valueToCode(t,"width",e.JavaScript.ORDER_ATOMIC),o=e.JavaScript.valueToCode(t,"height",e.JavaScript.ORDER_ATOMIC),l=e.JavaScript.valueToCode(t,"color",e.JavaScript.ORDER_ATOMIC);return`engine.drawRectangle(${n||0}, ${a||0}, ${i||0}, ${o||0}, ${l})`}},definition$7={type:"canvas_set_text_align",message0:"setTextAlign %1",args0:[{type:"field_dropdown",name:"align",options:[["left","left"],["right","right"],["center","center"]]}],previousStatement:null,nextStatement:null,colour:"#6600cc",tooltip:"",helpUrl:""},canvasSetTextAlign=e=>{e.Blocks.canvas_set_text_align={init:function(){this.jsonInit(definition$7)}},e.JavaScript.canvas_set_text_align=function(t){return`engine.setTextAlign('${t.getFieldValue("align")}');
`}},definition$6={type:"player_x",message0:"PLAYER_X",output:null,colour:"#FFAABB",tooltip:"",helpUrl:""},playerX=e=>{e.Blocks.player_x={init:function(){this.jsonInit(definition$6)}},e.JavaScript.player_x=function(t){return["engine.getPlayerX()",e.JavaScript.ORDER_NONE]}},definition$5={type:"player_y",message0:"PLAYER_Y",output:null,colour:"#FFAABB",tooltip:"",helpUrl:""},playerY=e=>{e.Blocks.player_y={init:function(){this.jsonInit(definition$5)}},e.JavaScript.player_y=function(t){return["engine.getPlayerY()",e.JavaScript.ORDER_NONE]}},definition$4={type:"game_obstacle",message0:"Obstacle %1",args0:[{type:"input_statement",name:"obstacle"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameObstacle=e=>{e.Blocks.game_obstacle={init:function(){this.jsonInit(definition$4)}},e.JavaScript.game_obstacle=function(t){return`
    engine.setObstacles(() => {
      ${e.JavaScript.statementToCode(t,"obstacle")}
    })
    ;
`}},definition$3={type:"game_set_player_position",message0:"Set Player position %1 X %2 Y %3",args0:[{type:"input_dummy"},{type:"input_value",name:"x",check:"Number"},{type:"input_value",name:"y",check:"Number"}],colour:"#FFAABB",tooltip:"",helpUrl:"",previousStatement:null,nextStatement:null},gameSetPlayerPosition=e=>{e.Blocks.game_set_player_position={init:function(){this.jsonInit(definition$3)}},e.JavaScript.game_set_player_position=function(t){const n=e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)||0,a=e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)||0;return`engine.setPlayerPosition(${n}, ${a});
`}},definition$2={type:"game_move_obstacle_x",message0:"move obstacle x %1",args0:[{type:"input_value",name:"x",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveObstacleX=e=>{e.Blocks.game_move_obstacle_x={init:function(){this.jsonInit(definition$2)}},e.JavaScript.game_move_obstacle_x=function(t){return`engine.moveObstacleX(${e.JavaScript.valueToCode(t,"x",e.JavaScript.ORDER_ATOMIC)});`}},definition$1={type:"game_move_obstacle_y",message0:"move obstacle y %1",args0:[{type:"input_value",name:"y",check:"Number"}],previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameMoveObstacleY=e=>{e.Blocks.game_move_obstacle_y={init:function(){this.jsonInit(definition$1)}},e.JavaScript.game_move_obstacle_y=function(t){return`engine.moveObstacleY(${e.JavaScript.valueToCode(t,"y",e.JavaScript.ORDER_ATOMIC)})`}},definition={type:"game_end_game",message0:"end game",previousStatement:null,nextStatement:null,colour:"#FFAABB",tooltip:"",helpUrl:""},gameEndGame=e=>{e.Blocks.game_end_game={init:function(){this.jsonInit(definition)}},e.JavaScript.game_end_game=function(t){return`engine.endGame();
`}};function initializeCustomBlocks(e){gameSetup(e),playerDuck(e),playerChicken(e),overWrite(e),backgroundColor(e),textSize(e),canvasWidth(e),canvasHeight(e),canvasSetCursor(e),canvasSetTextAlign(e),canvasSetTextColor(e),canvasDrawRectangle(e),playerY(e),playerX(e),gameSetPlayerPosition(e),gameObstacle(e),gameMoveObstacleX(e),gameMoveObstacleY(e),gameEndGame(e)}const toolbox={kind:"categoryToolbox",contents:[{kind:"category",name:"Loops",colour:"#5ba55b",contents:[{kind:"block",blockxml:`<block type="controls_repeat_ext">
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
        </block>`}]},{kind:"category",name:"game",colour:"#FFAABB",contents:[{kind:"block",type:"game_setup"},{kind:"block",type:"game_duck"},{kind:"block",type:"game_chicken"},{kind:"block",type:"player_x"},{kind:"block",type:"player_y"},{kind:"block",type:"game_set_player_position"},{kind:"block",type:"game_obstacle"},{kind:"block",type:"game_move_obstacle_x"},{kind:"block",type:"game_move_obstacle_y"},{kind:"block",type:"game_end_game"}]}]};function debounce(e,t=300){let n;return(...a)=>{clearTimeout(n),n=setTimeout(()=>{e.apply(this,a)},t)}}function initialize(e,t,i){var o=i,{initialXml:n}=o,a=b(o,["initialXml"]);initializeCustomBlocks(Blockly),console.log("initializing blockly"),Blockly.setLocale(locale);const l=Blockly.inject(e,f({toolbox},a)),s="blocklySavedWorkspace_2",c=u=>{const m=Blockly.Xml.workspaceToDom(l),h=Blockly.Xml.domToText(m);localStorage.setItem(s,h),t(Blockly.JavaScript.workspaceToCode(l))},d=localStorage.getItem(s);return l.addChangeListener(debounce(c,500)),Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(d||n),l),t(Blockly.JavaScript.workspaceToCode(l)),l}const BlocklyEditor=a=>{var i=a,{currentPage:e,children:t}=i,n=b(i,["currentPage","children"]);const o=react.exports.useRef(),l=react.exports.useRef();let s=react.exports.useRef();const{setGetJsCode:c}=react.exports.useContext(WorkspaceContext);function d(){if(!s.current)return;Blockly.svgResize(s.current);const{height:u,width:m}=l.current.getBoundingClientRect();console.info(`Resizing blockly to ${u}`),!!u&&(o.current.querySelector(".blocklySvg").setAttribute("height",`${u}px`),o.current.querySelector(".blocklySvg").setAttribute("width",`${m}px`))}return react.exports.useEffect(()=>{s.current||(s.current=initialize(o.current,c,n),new ResizeObserver(d).observe(l.current))}),react.exports.useEffect(()=>{},[e]),jsx("div",{className:"blockly-container",ref:l,children:jsx("div",{ref:o,id:"blocklyDiv"})})};function App(){const[e,t]=react.exports.useState(PAGE_MIX),[n,a]=react.exports.useState(()=>"");return jsx(WorkspaceContext.Provider,{value:{getJsCode:n,setGetJsCode:a},children:jsxs(Wrapper,{children:[jsx(Navigator,{onApp:()=>t(PAGE_APP),onCode:()=>t(PAGE_CODE),onMix:()=>t(PAGE_MIX),currentPage:e}),jsxs(ContentWrapper,{currentPage:e,children:[jsx(BlocklyEditor,{readOnly:!1,trashcan:!0,currentPage:e,move:{scrollbars:!0,drag:!0,wheel:!0},initialXml:`
<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="game_setup" x="0" y="0"></block>
</xml>
      `}),jsx(GameArea,{currentPage:e})]})]})})}ReactDOM.render(jsx(React.StrictMode,{children:jsx(App,{})}),document.getElementById("root"));
