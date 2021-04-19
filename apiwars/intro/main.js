function load(){

 
    let audio = document.getElementById("myAudio"); 
    
    function playAudio() { 
        audio.play(); 
    } 
    
    function pauseAudio() { 
        audio.pause(); 
    } 

    let volume = document.getElementById("volume-control");
    console.log('volumecontrol',volume);
    volume.addEventListener("change", function(e) {
            audio.volume = e.currentTarget.value / 100;
            //console.log(x);
        })
   
    document.getElementById('play').addEventListener('click',playAudio)
    document.getElementById('pause').addEventListener('click',pauseAudio)

}
window.addEventListener('load',load)