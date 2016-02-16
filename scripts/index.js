window.onload=function(){
	var screen=document.getElementById('screen');
	for(var i=0;i<7;i++){
		for(var j=0;j<i+1;j++){
			console.log(i);
			var block=document.createElement('div');
			block.setAttribute('class','block');
			block.setAttribute('id',i+'_'+j);
			block.style.top=50*i+'px';
			block.style.left=(6-i)*60+120*j+'px';
			block.style.webkitTransform='translateY(-300px) rotateY(0)';
			// block.style.webkitTransform='';
			block.style.opacity=0;
			screen.appendChild(block);
		}
	}
	var blocks=document.getElementsByClassName('block');
	var index=0,kk;
	var xuanzhuan=function(){
		blocks[index].style.opacity=1;
		blocks[index].style.webkitTransform=' translateY(0) rotateY(720deg)';
		// blocks[index].style.webkitTransform='';
		index++;
		if(index==blocks.length){
			kk=true;
			clearInterval(timerId);
		}
	};
	var timerId=setInterval(xuanzhuan,100);
	var zuo=document.getElementById('zuo');
	for(var i=0;i<24;i++){
		var item=document.createElement('div');
		item.setAttribute('class','item');
		item.setAttribute('id',i);
		zuo.appendChild(item);
	}
	var dict={1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'};
	var hs=['hongtao','heitao','fangkuai','meihua'];
	var hr,nr,poker=[],dict2={};
	while(poker.length!==52){
		hr=Math.floor(Math.random()*4);
		nr=Math.floor(Math.random()*13+1);
		if(!dict2[hs[hr]+dict[nr]]){
			dict2[hs[hr]+dict[nr]]=true;
			poker.push({huase:hs[hr],number:dict[nr]});				
		}
	}
	var poker1=poker.slice(-24);
	poker.length=28;
	for(var i=0;i<poker.length;i++){
		blocks[i].innerHTML=poker[i].number;
		if(poker[i].huase=='hongtao'){
			blocks[i].style.backgroundImage='url(./images/tc.jpg)';
			blocks[i].style.color='#db291d';
		}
		if(poker[i].huase=='heitao'){
			blocks[i].style.backgroundImage='url(./images/wk.jpg)';
			blocks[i].style.color='#181816';
		}
		if(poker[i].huase=='fangkuai'){
			blocks[i].style.backgroundImage='url(./images/bj.jpg)';
			blocks[i].style.color='#d01b10';
		}
		if(poker[i].huase=='meihua'){
			blocks[i].style.backgroundImage='url(./images/ss1.jpg)';
			blocks[i].style.color='#222220';
		}
	}
	var items=document.getElementsByClassName('item');
	for(var i=0;i<poker1.length;i++){
		items[i].innerHTML=poker1[i].number;
		if(poker[i].huase=='hongtao'){
			items[i].style.backgroundImage='url(./images/tc.jpg)';
			items[i].style.color='#db291d';
		}
		if(poker[i].huase=='heitao'){
			items[i].style.backgroundImage='url(./images/wk.jpg)';
			items[i].style.color='#181816';
		}
		if(poker[i].huase=='fangkuai'){
			items[i].style.backgroundImage='url(./images/bj.jpg)';
			items[i].style.color='#d01b10';
		}
		if(poker[i].huase=='meihua'){
			items[i].style.backgroundImage='url(./images/ss1.jpg)';
			items[i].style.color='#222220';
		}
	}
	var fir,sec,previous,n=0,l=3;
	var cn=document.getElementById('cn');
	var num=document.getElementById('num');
	var dict2={'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13};
	screen.onclick=function(e){
		if(!kk){
			return;
		}
		if(e.target==this||e.target==zuo||e.target==you||e.target==cn){
			return;
		}
		if(e.target==choupai){
			if(l==0){
				zhezhao.style.display='block';
				fen.innerHTML=num.innerHTML;
			}
			if(!zuo.lastElementChild){
				for(var i=0;i<items.length;i++){
					zuo.appendChild(you.removeChild(you.lastElementChild));
				}
				l-=1;
				cn.innerHTML=l;
				return;
			}
			you.appendChild(zuo.removeChild(zuo.lastElementChild));
			return;
		}
		if(e.target==huanpai){
			location.reload();
		}
		var id=e.target.getAttribute('id');
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		var nx=document.getElementById((x+1)+'_'+y);
		var ny=document.getElementById((x+1)+'_'+(y+1));
		if(nx||ny){
			return;
		}
		if(previous){
			previous.style.boxShadow='';
			fir=dict2[previous.innerHTML];
		}
		e.target.style.boxShadow='0 0 10px blue';
		sec=dict2[e.target.innerHTML];
		if(sec==13){
			if(e.target.parentElement==this){
			screen.removeChild(e.target);
			}else if(e.target.parentElement==zuo){
				zuo.removeChild(e.target);
			}else if(e.target.parentElement==you){
				you.removeChild(e.target);
			}
			sec=0;
			n+=5;
			num.innerHTML=n;
			if(blocks.length==0){
				zhezhao.style.display='block';
				fen.innerHTML=num.innerHTML;
			}
			return;
		}
		if(fir+sec==13){
			if(e.target.parentElement==screen){
				screen.removeChild(e.target);
			}else if(e.target.parentElement==zuo){
				zuo.removeChild(e.target);
			}else if(e.target.parentElement==you){
				you.removeChild(e.target);
			}
			if(previous.parentElement==screen){
				screen.removeChild(previous);
			}else if(previous.parentElement==zuo){
				zuo.removeChild(previous);
			}else if(previous.parentElement==you){
				you.removeChild(previous);
			}
			fir=sec=0;
			previous='';
			n+=5;
			num.innerHTML=n;
			if(blocks.length==0){
				zhezhao.style.display='block';
				fen.innerHTML=num.innerHTML;
			}
			return;
		}
		previous=e.target;
	};
	var kuai=document.getElementById('kuai');
	var ts=document.getElementsByClassName('ts');
	var bu=document.getElementById('bu');
	var t=0;
	ts[t].style.display='block';
	var pre=ts[t];
	bu.onclick=function(){
		t+=1;
		if(t==ts.length){
			kuai.style.display='none';
			t=0;
			kaiguan=false;
		}
		pre.style.display='none';
		ts[t].style.display='block';
		pre=ts[t];	
	};
	var shuoming=document.getElementById('shuoming');
	var kaiguan;
	shuoming.onclick=function(){
		if(kaiguan){
			kuai.style.display='none';
			kaiguan=false;
		}else{
			kuai.style.display='block';
			kaiguan=true;
		}
	};
	var zhezhao=document.getElementById('zhezhao');
	var fen=document.getElementById('fen');
	var bb=document.getElementById('bb');
	bb.onclick=function(){
		zhezhao.style.display='none';
		location.reload();
	};
	document.onmousedown=function(e){
		e.preventDefault();
	};
};