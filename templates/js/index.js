//data
var lyric=[
		   {
    'name':"笑忘书",
	'img':'img/img1.jpg',
	'audio_src':'music/m.mp3',
	'content':"00:01.92]匆匆那年（电影《匆匆那年》同名主题曲）- 王菲\n[00:28.21]匆匆那年 我们究竟说了几遍\n[00:31.17]再见之后 再拖延\n[00:33.89]可惜谁有没有 爱过不是一场\n[00:36.85]七情上面的雄辩\n[00:39.57]匆匆那年我们 一时匆忙撂下\n[00:42.42]难以承受的诺言\n[00:45.15]只有等别人兑现\n[00:51.00]不怪那吻痕 还没积累成茧\n[00:56.41]拥抱着冬眠 也没能羽化再成仙\n[01:02.01]不怪这一段情没空反复再排练\n[01:07.56]是岁月宽容恩赐 反悔的时间\n[01:18.57]如果再见不能红着眼 是否还能红着脸\n[01:24.49]就像那年匆促刻下\n[01:26.54]永远一起那样美丽的谣言\n[01:29.73]如果过去还值得眷恋 别太快冰释前嫌\n[01:35.78]谁甘心就这样 彼此无挂也无牵\n[01:41.49]我们要互相亏欠 要不然凭何怀缅\n[01:58.26]匆匆那年 我们见过太少世面\n[02:01.22]只爱看同一张脸\n[02:03.93]那么莫名其妙 那么讨人欢喜\n[02:06.78]闹起来又太讨厌\n[02:09.41]相爱那年活该匆匆\n[02:11.47]因为我们不懂顽固的诺言\n[02:15.10]只是分手的前言\n[02:20.96]不怪那天太冷 泪滴水成冰\n[02:26.42]春风也一样没吹进凝固的照片\n[02:31.99]不怪每一个人没能完整爱一遍\n[02:37.69]是岁月善意落下 残缺的悬念\n[02:48.41]如果再见不能红着眼 是否还能红着脸\n[02:54.56]就像那年匆促刻下\n[02:56.51]永远一起那样美丽的谣言\n[02:59.43]如果过去还值得眷恋 别太快冰释前嫌\n[03:05.76]谁甘心就这样 彼此无挂也无牵\n[03:10.66]如果再见不能红着眼 是否还能红着脸\n[03:17.00]就像那年匆促刻下\n[03:19.00]永远一起那样美丽的谣言\n[03:21.87]如果过去还值得眷恋 别太快冰释前嫌\n[03:28.25]谁甘心就这样 彼此无挂也无牵\n[03:33.96]我们要互相亏欠 我们要藕断丝连"
},
{
    'name':"12",
	'img':'img/img1.jpg',
	'audio_src':'http://www.17sucai.com/preview/1/2015-03-16/html5_jplayer%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/yangcong.mp3',
	'content':"00:01.92]歌词自己补"
}
]
	window.onload=function()
	{
		var play_btn=document.getElementById("play_btn");
		var prev_btn=document.getElementById("prev_btn");
		var next_btn=document.getElementById("next_btn");
		var audio=document.getElementsByTagName("audio")[0];
		var initTime=document.getElementsByTagName("time")[0];
		var time=document.getElementsByTagName("time")[1];
		var progress_bar=document.getElementById("progress_bar");
		var progress_cube=document.getElementById("progress_cube");
		var vol_bar=document.getElementById("vol_bar");
		var vol_cube=document.getElementById("vol_cube");
		var lyric_con=document.getElementById("lyric_con");
		var lyric_txt=document.getElementById("lyric_txt");
		var photo_pic=document.getElementById("photo_pic");
		var icon1=document.getElementById("icon1");
		var icon2=document.getElementById("icon2");
		var lyric_tit=document.getElementById("lyric_tit");
		var list_con=document.getElementById("list_con");
		var list_item=list_con.getElementsByTagName("p");
		var songIndex=0;
		var container=document.getElementById("container");
		var obj;		
		function config()
		{
			this.play_mark=true;
			this.duration=audio.duration;
			this.play_btn="&#xe60e;";
			this.vol=audio.volume;
			this.timer=null;
			this.rotateSum=0;
			this.icon1=icon1.innerHTML;
			this.icon2=icon2.innerHTML;
			this.icon1_co=icon1.style.color;
			this.endplay_btn="&#xe60c;";
			this.endicon1=icon1.innerHTML;
			this.endicon2="&#xe674;";
		}
		
		obj= new config();
		//列表控制
		
		var allSong="";
		for(var song=0;song<lyric.length;song++)
		{
			allSong+="<p>"+lyric[song].name+"</p>"
		}
		list_con.innerHTML=allSong;
		list_con.style.height=lyric.length*30+"px";
		for(var listIndex=0;listIndex<list_item.length;listIndex++)
			{
				list_item[listIndex].index=listIndex;
				list_item[listIndex].onclick=function(ev)
				{
					var ev=ev||window.event;
					ev.stopPropagation();
					songIndex=this.index;
					change_music();
				}
			}
		list_con.style.display="none";
		list.onclick=function()
		{
			if(list_con.style.display=="none")
			{
				list_con.style.display="block";
			}
			else{
				list_con.style.display="none";
			}
		}
		//下一首
		next_btn.onclick=function(){
			songIndex++;
			change_music();
		}
		prev_btn.onclick=function(){
			songIndex--;
			change_music();
		}
		function change_music()
		{
			clearInterval(obj.timer);
			if(songIndex>=lyric.length)
				{songIndex=0}
			else if(songIndex<0)
				{songIndex=lyric.length}
			obj= new config();		
			iconinit();
			audioInit();
			playedTime();
			lyric_ctrl();
		}
		//初始化总时长、音量等
		function audioInit()
		{
			time.innerHTML=format(audio.duration);
			audio.volume=0.5;
			play_btn.innerHTML=obj.play_btn;
			vol_cube.style.left=audio.volume*vol_bar.offsetWidth+"px";
			lyric_tit.innerText=lyric[songIndex].name;
			photo_pic.style.background="url("+lyric[songIndex].img+")";
			audio.src=lyric[songIndex].audio_src;			

			progress_cube.style.left=0;
		}
		audioInit();
		//播放时间
		audio.addEventListener("timeupdate",function()
		{
			playedTime();
		})
		function playedTime(){
			if(audio.currentTime==audio.duration)
			{
				next_btn.onclick();
				play_btn.onclick();
			}
			var n=audio.currentTime/audio.duration;
			progress_cube.style.left=n*progress_bar.offsetWidth+"px";
			initTime.innerHTML=format(audio.currentTime);
			var id_num=parseInt(audio.currentTime);
			var lyric_p=document.getElementsByTagName("p");
			for(var i=0;i<lyric_p.length;i++)
				{
					lyric_p[i].index=i;
				}
			if(document.getElementById("lyric"+id_num))
			{				
				var obj=document.getElementById("lyric"+id_num);
				for(var i=0;i<obj.index;i++)
				{
					lyric_p[i].className="played";
				}
				for(var j=obj.index;j<lyric_p.length;j++)
				{
					lyric_p[j].className="";
				}
				obj.className="aquamarine active";
				lyric_txt.style.top=lyric_con.offsetHeight/2-obj.offsetTop+"px";			
			}
		}
		function format(time)
		{
			var time=parseInt(time);
			var m=parseInt(time/60);
			var s=parseInt(time%60);
			m=zero(m);
			s=zero(s);
			function zero(num)
			{
				if(num<10)
				{
					num="0"+num;
				}
				return num;
			}
			return m+":"+s;
		}
		//拖拽进度条
		progress_cube.onmousedown=function(ev)
		{
			var ev=ev||window.event;
			var initX=ev.clientX-this.offsetLeft;
			this.onmousemove=function(ev)
			{
				var ev=ev||window.event;
				var x=ev.clientX-initX;
				if(x<0){x=0}
					if(x>progress_bar.offsetWidth-14){x=progress_bar.offsetWidth-14}
				play_ctrl(x);
			}
			document.onmouseup=function()
			{
				document.onmousemove=null;
				progress_cube.onmousemove=null;
			}
		}
		function play_ctrl(x){
				var timego=x/progress_bar.offsetWidth*audio.duration;
				progress_cube.style.left=x+"px";
				audio.currentTime=timego;
				playedTime();
		}
		//点击进度条位置
		progress_bar.onclick=function(ev)
		{
			var ev=ev||window.event;
			var dis=ev.clientX-(container.offsetLeft+progress_bar.offsetLeft)-7;
			progress_cube.style.left=dis+"px";
			play_ctrl(dis);
		}/**/
		//拖动音量键
		vol_cube.onmousedown=function(ev)
		{
			var ev=ev||window.event;
			var initX=ev.clientX-vol_cube.offsetLeft;
			this.onmousemove=function(ev)
			{
				var ev=ev||window.event;
				var x=ev.clientX-initX;
				if(x<0){x=0}
					if(x>vol_bar.offsetWidth-11){x=vol_bar.offsetWidth-11}
				var volresult=x/vol_bar.offsetWidth;
				this.style.left=x+"px";
				audio.volume=volresult;
			}
			document.onmouseup=function()
			{
				document.onmousemove=null;
				vol_cube.onmousemove=null;
			}
		}		
		//点击播放
		play_btn.onclick=function()
		{
			clearInterval(obj.timer);
			if(obj.play_mark)
			{
				this.innerHTML=obj.endplay_btn;
				audio.play();
				obj.timer=setInterval(function()
				{	obj.rotateSum=obj.rotateSum+1;
					photo_pic.style.transform="rotate("+obj.rotateSum+"deg)";
				},30)
			}
			else{
				this.innerHTML=obj.play_btn;
				audio.pause();
			}
			obj.play_mark=!obj.play_mark;
		}
		//歌词处理
		function lyric_ctrl()
		{
			var lyricObj=lyric[songIndex].content;
			var temp=lyricObj.split("[");
			var html="";
			for(var i=0;i<temp.length;i++)
			{
				var arr=temp[i].split("]");
				var text=(arr[1]);
				var time=arr[0].split(",");
				var temp2=time[0].split(".");
				var ms=temp2[1];//毫秒
				var temp3=temp2[0].split(":");			
				var s=temp3[1];//秒
				var m=temp3[0];//分
				var s_sum=parseInt(m*60)+parseInt(s);
				if(text)
				{
					html+="<p id='lyric"+s_sum+"'>"+text+"</p>";
				}	
			}
			lyric_txt.innerHTML=html;
		}
		lyric_ctrl();
		function iconinit(){
			icon1.className="icon";
			icon1.innerHTML=obj.icon1;
			icon1.style.color="#fff";
			icon2.className="icon";
			icon2.style.color="#fff";
		}
		//喜欢 收藏
		icon2.onclick=function()
		{
			if(this.innerHTML==obj.icon2)
			{
				this.innerHTML=obj.endicon2;
				this.style.color="aquamarine";
				this.className="icon yellow";
			}
			else{ 
				this.innerHTML=obj.icon2;
				this.style.color="#fff";	
				this.className="icon";			
			}
		}
		icon1.onclick=function()
		{
			if(this.style.color==obj.icon1_co)
			{
				this.innerHTML=obj.endicon1;
				this.style.color="#f7759f";
				this.className="icon pink";
			}
			else{ 
				this.innerHTML=obj.icon1;
				this.style.color=obj.icon1_co;	
				this.className="icon";			
			}
		}
	}