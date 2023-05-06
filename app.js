let pre = document.querySelector('#last');
let play = document.querySelector('#naw');
let next = document.querySelector('#next');
let title = document.querySelector('#songTitle');
let volume= document.querySelector('#volume');
let volumeShow = document.querySelector('#volumShow');
let slider = document.querySelector('#duration');
let image = document.querySelector('#trackImg');
let auto = document.querySelector('#auto');
let present = document.querySelector('.present');
let total = document.querySelector('.total');
let singer = document.querySelector('#singer');
let volumBtn = document.querySelector('#volumBtn');
let durationShow = document.querySelector('#durationShow')
let currentTime = document.querySelector('#currentTime')
let slash = document.querySelector('#slash')
let track = document.createElement('audio');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;
let mute = false

let All_song = [
    {
      name: "first song",
      path: "music/song1.mp3",
      img: "img/img1.jpg",
      singer: "first"
    },
    {
      name: "second song",
      path: "music/song2.mp3", 
      img: "img/img2.jpg",
      singer: "second"
    },
    {
      name: "third song",
      path: "music/song3.mp3",
      img: "img/img3.jpg",
      singer: "third"
    },
    {
      name: "fourth song",
      path: "music/song4.mp3",
      img: "img/img4.jpg",
      singer: "fourth"
    },
    {
      name: "fifth song",
      path: "music/song5.mp3",
      img: "img/img5.jpg",
      singer: "fifth"
    },
    {
      name: "sixth song",
      path: "music/song6.mp3",
      img: "img/img6.jpg",
      singer: "sixth"
    },
    {
      name: "seventh song",
      path: "music/song7.mp3",
      img: "img/img6.jpg",
      singer: "seventh"
    }
 ];
 
function loadTrack(index_no){
	clearInterval(timer);
	resetSlider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	image.src = All_song[index_no].img;
    singer.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(rangeSlider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}
loadTrack(index_no);

function resetSlider(){
    slider.value = 0;
}
function muteSound(){
    if(mute == false){
        track.volume = 0;
	    volume.value = 0;
	    volumeShow.innerHTML = 0;
        mute = true;
        volumBtn.classList = 'bx bxs-volume-mute'
        console.log(mute);
    }
    else if(mute == true){
        track.volume = 10/100;
	    volume.value = 10;
	    volumeShow.innerHTML = 10;
        mute = false;
        volumBtn.classList = 'bx bxs-volume-full'
    }
}
function justPlay(){
    if(Playing_song==false){
        playSong();

    }else{
        pauseSong();
    }
}
function pauseSong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = "<i class='bx bx-play' ></i>";
}
function playSong(){
    track.play();
    Playing_song = true;
    play.innerHTML = "<i class='bx bx-pause' ></i>";
  }
function nextSong(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		loadTrack(index_no);
		playSong();
	}else{
		index_no = 0;
		loadTrack(index_no);
		playSong();

	}
}
function previousSong(){
	if(index_no > 0){
		index_no -= 1;
		loadTrack(index_no);
		playSong();

	}else{
		index_no = All_song.length;
		loadTrack(index_no);
		playSong();
	}
}
function volumeChange(){
	volumeShow.innerHTML = volume.value;
	track.volume = volume.value / 100;
}
function changeDuration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}
function autoPlay(){
	if(autoplay == 0){
      auto.classList.add('on')
      autoplay = 1;
	}
  else{
      auto.classList.remove('on')
       autoplay = 0;
	}
}
function repeat(){
  track.currentTime = 0
  position = track.currentTime * (100 / track.duration);
	slider.value =  position;
  if(Playing_song == true){
    track.play()
  }
  else{
    track.pause()
  }
}
function rangeSlider(){
	let position = 0;
        
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }
          if(track.ended){
       	 play.innerHTML = "<i class='bx bx-play' ></i>";
           if(autoplay==1){
		       index_no += 1;
		       loadTrack(index_no);
		       playSong();
           }
	    }
     }
track.addEventListener('timeupdate',()=>{

    currentTime.innerHTML = `${Math.trunc(Math.trunc(track.currentTime)/60)}:${Math.trunc(track.currentTime)- Math.trunc(Math.trunc(track.currentTime)/60)*60}`;
    slash.innerHTML = `&nbsp;/&nbsp;`;
    if(isNaN(track.duration)){
      durationShow.innerHTML = "0:0"
    }
    else{
      durationShow.innerHTML = `${Math.trunc(Math.trunc(track.duration)/60)}:${Math.trunc(track.duration)- Math.trunc(Math.trunc(track.duration)/60)*60}`;
    }
})
track.addEventListener('ended',()=>{
    if(autoplay == 1){
      repeat()
    }
    else{
      nextSong()
    }
})