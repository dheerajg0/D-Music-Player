console.log("Welcome to D-Music Player");

// Setting up Variables
let songIndex = 0;
let currentSongArrayIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let playGif = document.getElementById('playGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let playPath = 'data/icons/play.png';
let pausePath = 'data/icons/pause.png';
let stepNext = '/data/icons/step-next.png';
let stepBack = 'data/icons/step-back.png';
let songItemPlay = document.getElementsByClassName("songItemPlay");
let songItemContainer = document.getElementById("songItemContainer");
let currentSongName = '';
let cover1 = null;

// Song Data
const songs = [
    {"name":"Chhad Dilla","path":"./data/songs/Chhad Dilla.mp3","cover":"./data/covers/Chhad Dilla.jpg","duration":"04:18"},
    {"name":"Ek Raat","path":"./data/songs/Ek Raat.mp3","cover":"./data/covers/Ek Raat.jpg","duration":"04:48"},
    {"name":"Fortuner","path":"./data/songs/Fortuner.mp3","cover":"./data/covers/Fortuner.jpg","duration":"03:08"},
    {"name":"Jaat Roya Saari Raat","path":"./data/songs/Jaat Roya Saari Raat.mp3","cover":"./data/covers/Jaat Roya Saari Raat.jpg","duration":"04:06"},
    {"name":"Ku Ku","path":"./data/songs/Ku Ku.mp3","cover":"./data/covers/Ku Ku.jpg","duration":"03:22"},
    {"name":"Lemonade","path":"./data/songs/Lemonade.mp3","cover":"./data/covers/Lemonade.jpg","duration":"02:46"},
    {"name":"Mat Azma Re","path":"./data/songs/Mat Azma Re.mp3","cover":"./data/covers/Mat Azma Re.jpg","duration":"04:08"},
    {"name":"Pee Loon","path":"./data/songs/Pee Loon.mp3","cover":"./data/covers/Pee Loon.jpg","duration":"04:48"},
    {"name":"Toh Phir Aao","path":"./data/songs/Toh Phir Aao.mp3","cover":"./data/covers/Toh Phir Aao.jpg","duration":"05:48"},
    {"name":"Yaar Bathere","path":"./data/songs/Yaar Bathere.mp3","cover":"./data/covers/Yaar Bathere.jpg","duration":"04:02"}
]

// Function to Load Songs
function getSongList(){
    songItems.forEach((element,i) => {
        element.getElementsByTagName('img')[0].src = songs[i].cover;
        element.getElementsByClassName('songName')[0].innerText = songs[i].name;
        element.getElementsByClassName('timeStamp')[0].innerText = songs[i].duration;
    })
    loadSongList();
}

// Function to make Song List of Available Songs
function loadSongList(){
    songs.forEach((element,i) => {
        let songItem1 = document.createElement("div");
        songItem1.classList.add('songItem')
        cover1 = document.createElement("img");
        cover1.classList.add('songCover')
        cover1.id = `cover${i}`
        cover1.src = element.cover;
        let songName1 = document.createElement("span");
        songName1.innerText = element.name;
        songName1.classList.add('songName')
        let timestamp1 = document.createElement("span");
        timestamp1.innerText = element.duration;
        timestamp1.classList.add('timeStamp')
        let playSong1 = document.createElement("img");
        playSong1.id = `${i}`;
        playSong1.classList.add('playSong')
        playSong1.classList.add('songItemPlay')
        playSong1.src = playPath
        songItem1.appendChild(cover1);
        songItem1.appendChild(songName1);
        songItem1.appendChild(timestamp1);
        songItem1.appendChild(playSong1);
        songItemContainer.appendChild(songItem1);
    });
    selectSongFromList();
}

// Master Song Play/Pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        playSong();
        masterPlay.src = pausePath
        playGif.style.opacity = 1;
        currentSongName = songs[songIndex].name;
        currentSongArrayIndex = (songs.findIndex(x => x.name === `${currentSongName}`));
        var file = document.getElementById(`${currentSongArrayIndex}`)
        file.src = pausePath;
    }
    else{
        audioElement.pause();
        masterPlay.src = playPath
        playGif.style.opacity = 0;
        makeAllPlays();
    }
    masterSongName.innerText = songs[songIndex].name;
})

// Progress Bar Update
audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*10000);
    progressBar.value = progress;
})

// Seeking by Progress Bar
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration )/10000;
})

// Reset to Play Icon while Song Pauses
function makeAllPlays(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
        element.src = playPath
    })
}

// Function to Play Song from Song List
function selectSongFromList(){
    Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
        element.addEventListener('click', (e)=>{
            currentSongName = songs[songIndex].name;
            songIndex = parseInt(e.target.id);
            if (element.id == currentSongArrayIndex && !audioElement.paused) {
                currentSongArrayIndex = songIndex;
                audioElement.pause();
                var file = document.getElementById(`${currentSongArrayIndex}`)
                file.src = playPath
                masterPlay.src = playPath
                playGif.style.opacity = 0;
            } 
            else {
                songIndex = parseInt(e.target.id);
                currentSongArrayIndex = songIndex;
                makeAllPlays();
                element.src = pausePath
                audioElement.src=`${songs[currentSongArrayIndex].path}`;
                audioElement.currentTime = 0;
                playSong();
                masterPlay.src = pausePath
                playGif.style.opacity = 1;
                masterSongName.innerText = songs[songIndex].name;    
            }
        })
    });
}

// Next Button Listener
document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>= (songs.length)-1){
        songIndex = 0
    }
    else{
        songIndex +=1
    }
    currentSongName = songs[songIndex].name;
    currentSongArrayIndex = (songs.findIndex(x => x.name === `${currentSongName}`));
    audioElement.src=`${songs[currentSongArrayIndex].path}`;
    audioElement.currentTime = 0;
    playSong();
    makeAllPlays();
    masterPlay.src = pausePath
    masterSongName.innerText = songs[songIndex].name;
    var file = document.getElementById(`${currentSongArrayIndex}`)
    file.src = pausePath;
});

// Previous Button Listener
document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex==0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    currentSongName = songs[songIndex].name;
    currentSongArrayIndex = (songs.findIndex(x => x.name === `${currentSongName}`));
    audioElement.src=`${songs[currentSongArrayIndex].path}`;
    audioElement.currentTime = 0;
    playSong();
    makeAllPlays();
    masterPlay.src = pausePath
    masterSongName.innerText = songs[songIndex].name;
    var file = document.getElementById(`${currentSongArrayIndex}`)
    file.src = pausePath;
});

// Function to Play Song
function playSong(){
    audioElement.play();
}

getSongList();