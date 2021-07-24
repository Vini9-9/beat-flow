document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
})
document.querySelector('.composer button').addEventListener('click', () => {

    let song = document.querySelector('#input').value;
    let songLoop = document.querySelector('#loop-times').value;

    if(song !== ''){
        
        let songArray = song.split('');
        playComposition(songArray, songLoop);
    }

})
document.body.addEventListener('touchend', (event)=>{
    let tecla = event.target.getAttribute('data-key');
    playSound(tecla.toLowerCase());
})

var slider = document.getElementById("timeSlider");
var output = document.getElementById("timeBeat");
output.innerHTML = slider.value * 50; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value * 50;
}


function playSound(sound) {

    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`); 
    
    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
    }
    if(keyElement){
        keyElement.classList.add('active');

        setTimeout(()=>{
            keyElement.classList.remove('active');
        }, 300);
    }
}

function playComposition(songArray, songLoop){

    let wait = 0;
    let timeBeat = document.querySelector(`#timeSlider`).value * 50;

    if(songLoop > 1){
        songArray.push(" ");
    }

    console.log(songArray);
    while (songLoop > 0) {
        console.log("songLoop" , songLoop)
        for(let songItem of songArray){

            setTimeout(()=>{
                playSound(`key${songItem}`);
            }, wait)

            wait += timeBeat;
        }
        songLoop-= 1;
    }
}

