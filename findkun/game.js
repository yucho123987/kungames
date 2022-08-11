console.log('鸡你太美');
console.log('oh baby');
console.log('鸡你实在是太美');
window.startPanel=document.getElementById('start-panel');
window.gameBlockContainer=document.getElementById('game-block-container');
window.gameSettings={
  size:'10x10',
  soundEnabled:true,
  musicEnabled:true
};
window.kunBlocks=[];
window.markedPosition=[];
window.gameTime=0;
window.markCount=10;
window.soundLoaded=false;
window.dialogButtons=document.getElementById('dialog').getElementsByTagName('button');
//某坐标是否存在坤坤
function hasPosition(position) {
  for (var i = 0; i < kunBlocks.length; i++) {
    if (position.x==kunBlocks[i].x&&position.y==kunBlocks[i].y) {
      return true;
    }
  }
  return false;
}
//随鸡数生成
function generateRandomNumber(from,to){
  if (!from) {
    return Math.floor(Math.random()*(to+1));
  } else if (from>0) {
    return Math.floor(Math.random()*to+from);
  }
}
//防止软键盘弹起，页面被弹上去
document.getElementById('game').style.height=document.body.clientHeight+'px';
try {
  if (typeof localStorage.getItem('gameSettings')=='string') {
    gameSettings=JSON.parse(localStorage.getItem('gameSettings'));
  } else {
    localStorage.setItem('gameSettings',JSON.stringify(gameSettings));
  }
} catch (e) {
  console.error(e);
}
//“蓝屏”
window.onerror=function(message,source,lineno,colno,error){
  console.error(error);
  document.getElementById('blue-screen-error-message').innerText=message;
  document.getElementById('blue-screen-error-position').innerText='第 '+lineno+' 行第 '+colno+' 列';
  document.getElementById('blue-screen').style.display='block';
  setInterval(function(){
    var blueScreenProgress=document.getElementById('blue-screen-progress');
    var progess=parseInt(blueScreenProgress.innerText);
    progess+=1;
    blueScreenProgress.innerText=progess;
  },666);
};
//资源加载
var resLoadParent=document.getElementById('res-load');
var progress=document.getElementById('progress');
var blueScreenQrcode=document.createElement('img');
blueScreenQrcode.src='assets/qrcode.png';
blueScreenQrcode.onload=function(){
  console.log('完成 1/5');
  progress.style.width='40px';
  image_cxk=document.createElement('img');
  image_cxk.src='assets/cxk.png';
  image_cxk.onload=function(){
    console.log('完成 2/5');
    progress.style.width='80px';
    image_bg=document.createElement('img');
    image_bg.src='assets/bg.png';
    image_bg.onload=function(){
      console.log('完成 3/5');
      progress.style.width='120px';
      fail_bjm=document.createElement('audio');
      fail_bjm_source=document.createElement('source');
      fail_bjm_source.src='assets/ngm.mp3';
      fail_bjm_source.type='audio/mpeg';
      fail_bjm.id='fail_bjm';
      fail_bjm.addEventListener('canplaythrough',function(){
        if (soundLoaded) {
          return '油饼食不食';
        }
        console.log('完成 4/5');
        progress.style.width='150px';
        bjm=document.createElement('audio'),bjm_source=document.createElement('source');
        bjm_source.src='assets/jntm.mp3';
        bjm_source.type='audio/mpeg';
        bjm.id='bjm';
        bjm.loaded=false;
        bjm.addEventListener('ended',function(){
          this.play();
        });
        bjm.addEventListener('canplaythrough',function(){
          if (soundLoaded) {
            return '树枝666';
          }
          console.log('完成 5/5');
          progress.style.width='190px';
          soundLoaded=true;
          setTimeout(function() {
            progress.style.width='210px';
            startPanel.style.display='flex';
            document.getElementById('loading').style.display='none';
            document.getElementById('game').style.backgroundImage='url(assets/bg.png)';
          }, 300);
        });
        bjm.appendChild(bjm_source);
        resLoadParent.appendChild(bjm);
      });
      fail_bjm.appendChild(fail_bjm_source);
      resLoadParent.appendChild(fail_bjm);
    };
    resLoadParent.appendChild(image_bg);
  };
  resLoadParent.appendChild(image_cxk);
};
document.getElementById('blue-screen-qrcode').appendChild(blueScreenQrcode);
//设置主页按钮点鸡事件
document.getElementById('start-game').addEventListener('click',function(){
  startPanel.style.display='none';
  markCount=10;
  markedPosition=[];
  document.getElementById('game-mark-count').innerText='剩余标记数：'+markCount;
  gameTime=0;
  var size_w=parseInt(gameSettings.size.split('x')[0]);
  var size_h=parseInt(gameSettings.size.split('x')[1]);
  document.getElementById('game-panel').style.display='flex';
  //随鸡生成坤坤的位置
  kunBlocks=[];
  for (var i = 0; i < 10; i++) {
    var x=generateRandomNumber(0,size_w-1),y=generateRandomNumber(0,size_h-1);
    if (!hasPosition({x:x,y:y})) {
      kunBlocks.push({
        x:x,
        y:y
      });
    } else {
      i--;
    }
  }
  //生成方块
  gameBlockContainer.innerHTML='';
  for (var i = 0; i < size_h; i++) {
    var line=document.createElement('div');
    line.style.width='100%';
    line.style.height=300/size_w+'px';
    for (var j = 0; j < size_w; j++) {
      var block=document.createElement('span');
      block.style.display='inline-block';
      block.style.width=300/size_w+'px';
      block.style.height=300/size_w+'px';
      block.style.lineHeight=block.style.height;
      block.clicked=false;
      block.marked=false;
      block.kunCount=0;
      block.position={
        x:j,
        y:i
      };
      block.addEventListener('click',function(){
        if(!this.clicked){
          this.clicked=true;
          if (this.marked) {
            markCount++;
            document.getElementById('game-mark-count').innerText='剩余标记数：'+markCount;
            this.marked=false;
          }
          if(hasPosition(this.position)) {
            this.innerHTML='<img src="assets/cxk.png">';
            console.log('你干嘛~哈哈~哎哟');
            clearInterval(gameTimeCounter);
            kunCount=0;
            gameTime=0;
            document.getElementById('dialog-title').innerHTML='你干嘛~哈哈~哎哟';
            document.getElementById('dialog-content').innerHTML='你碰♂到坤坤了。';
            document.getElementById('dialog-bg').style.display='block';
            document.getElementById('dialog').style.display='block';
            if (gameSettings.musicEnabled) {
              bjm.pause();
              bjm.currentTime=0;
            }
            if (gameSettings.soundEnabled) {
              fail_bjm.currentTime=0;
              fail_bjm.play();
            }
          } else {
            //获取最近范围内的坤数
            if (hasPosition({x:this.position.x-1,y:this.position.y})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x+1,y:this.position.y})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x,y:this.position.y-1})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x,y:this.position.y+1})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x-1,y:this.position.y-1})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x+1,y:this.position.y-1})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x-1,y:this.position.y+1})) {
              this.kunCount++;
            }
            if (hasPosition({x:this.position.x+1,y:this.position.y+1})) {
              this.kunCount++;
            }
            this.innerText=this.kunCount;
          }
        }
      });
      block.addEventListener('contextmenu',function(){
        this.innerText='';
        if (this.marked) {
          this.marked=false;
          if (this.clicked) {
            this.innerText=this.kunCount;
          }
          if (markCount<10) {
            markCount++;
            markedPosition.pop();
          }
          document.getElementById('game-mark-count').innerText='剩余标记数：'+markCount;
          return '厉不厉害你坤哥';
        }
        if (markCount>0) {
          this.innerHTML='?';
          this.marked=true;
          markedPosition.push(this.position);
          markCount--;
          if (markCount==0) {
            console.log('end');
            var foundKunCount=0;
            for (var i = 0; i < markedPosition.length; i++) {
              if (hasPosition(markedPosition[i])) {
                foundKunCount++;
              }
            }
            if (foundKunCount==kunBlocks.length) {
              clearInterval(gameTimeCounter);
              kunCount=0;
              gameTime=0;
              document.getElementById('dialog-title').innerHTML='鸡你太美';
              document.getElementById('dialog-content').innerHTML='你成功了！';
              document.getElementById('dialog-bg').style.display='block';
              document.getElementById('dialog').style.display='block';
              if (gameSettings.musicEnabled) {
                bjm.pause();
                bjm.currentTime=0;
              }
            }
          }
        }
        document.getElementById('game-mark-count').innerText='剩余标记数：'+markCount;
      });
      line.appendChild(block);
    }
    gameBlockContainer.appendChild(line);
  }
  document.getElementById('game-time').innerText='时长：0 s';
  window.gameTimeCounter=setInterval(function(){
    gameTime++;
    document.getElementById('game-time').innerText='时长：'+gameTime+' s';
  },1000);
  if (gameSettings.musicEnabled) {
    bjm.play();
  }
});
document.getElementById('settings').addEventListener('click',function(){
  startPanel.style.display='none';
  document.getElementById('settings-panel').style.display='flex';
});
document.getElementById('share').addEventListener('click',function(){
  startPanel.style.display='none';
  document.getElementById('share-panel').style.display='flex';
});
for (var i = 0; i < dialogButtons.length; i++) {
  dialogButtons[i].addEventListener('click',function(){
    document.getElementById('dialog').style.display='none';
    document.getElementById('dialog-bg').style.display='none';
    if (gameSettings.soundEnabled) {
      fail_bjm.pause();
      fail_bjm.currentTime=0;
    }
  })
}
document.getElementById('restart').addEventListener('click',function(){
  document.getElementById('start-game').click();
});
//设置返回按钮事件
var returnButtons=document.getElementsByClassName('return');
for (let i =0; i < returnButtons.length; i++) {
  returnButtons[i].addEventListener('click',function(){
    var Panels=document.getElementsByClassName('panel');
    for (let k=0; k<Panels.length; k++) {
      Panels[k].style.display='none';
      startPanel.style.display='flex';
    }
  });
}
//设置保存按钮点鸡事件
document.getElementById('save-settings').addEventListener('click',function(){
  var size_w=document.getElementById('size_w');
  var size_h=document.getElementById('size_h');
  try {
    if (size_w.value==''||size_h.value==''||size_w.value==' '||size_h.value==' ') {
    alert('宽度和高度不能为空');
  } else if(isNaN(parseInt(size_w.value))||isNaN(parseInt(size_h.value))||parseInt(size_w.value)%1!==0||parseInt(size_h.value)%1!==0) {
    alert('宽度和高度必须是整数');
  } else if(parseInt(size_w.value)<5||parseInt(size_w.value)>10||parseInt(size_h.value)<5||parseInt(size_h.value)>10) {
    alert('宽度和高度不能小于5或者大于10');
  } else {
    gameSettings.size=size_w.value+'x'+size_h.value;
    if (document.getElementById('sound-switch').getAttribute('status')=='on') {
      gameSettings.soundEnabled=true;
    } else {
      gameSettings.soundEnabled=false;
    }
    if (document.getElementById('music-switch').getAttribute('status')=='on') {
      gameSettings.musicEnabled=true;
    } else {
      gameSettings.musicEnabled=false;
    }
    localStorage.setItem('gameSettings',JSON.stringify(gameSettings));
    size_w=parseInt(gameSettings.size.split('x')[0]);
    size_h=parseInt(gameSettings.size.split('x')[1]);
    alert('保存成功');
  }
  } catch (e) {
    alert('保存失败：'+e);
  }
});
//给设置面板元素赋值
try {
  var size=gameSettings.size.split('x');
  document.getElementById('size_w').value=size[0];
  document.getElementById('size_h').value=size[1];
  if (gameSettings.soundEnabled) {
    document.getElementById('sound-switch').setAttribute('status','on');
  } else {
    document.getElementById('sound-switch').setAttribute('status','off');
  }
  if (gameSettings.musicEnabled) {
    document.getElementById('music-switch').setAttribute('status','on');
  } else {
    document.getElementById('music-switch').setAttribute('status','off');
  }
} catch (e) {}
document.getElementById('game-url').value=window.location.href;
new QRCode(document.getElementById('game-qrcode'),window.location.href);
//开关点鸡事件
var switchs=document.getElementsByTagName('switch');
for (var i = 0; i < switchs.length; i++) {
  switchs[i].addEventListener('click',function(){
    if (this.getAttribute('status')=='off'||typeof this.getAttribute('status')!='string') {
      this.setAttribute('status','on');
    } else {
      this.setAttribute('status','off');
    }
  });
}