// window.addEventListener('load', function () {
//     document.getElementsByClassName('loader')[0].classList.add('hidden');
// })

function BackSpace(str) {
    if (str == null || str == undefined) {
        throw new TypeError("null or undefinedd aren't accept !");
    }
    str = String(str);
    return str.slice(0, -1);
}

function Random(start, end) {
    let distance = end - start;
    if (distance <= 1 || isNaN(distance)) {
        throw new Error("Arguamnts Are Wrong !");
    }
    return Math.trunc((Math.random() * distance)) + start;
}
let audio_elemet = document.querySelector('audio');
let image_elemet = document.querySelector('.cover-art');
let title_element = document.querySelector('.title');
let artist_element = document.querySelector('.artist');
let time_current_element = document.querySelector('#time-current');
let time_end_element = document.querySelector('#time-end');
let tracker_element = document.querySelector("input[type='range']");
let card_div = document.querySelector(".card");

let list_icon = document.getElementById('list-icon');
let shuffle_icon = document.getElementById('shuffle-icon');
let replay10_icon = document.getElementById('replay10-icon');
let skipBack_icon = document.getElementById('skipBack-icon');
let play_icon = document.getElementById('play-icon');
let skipFor_icon = document.getElementById('skipFor-icon');
let for10_icon = document.getElementById('for10-icon');
let volume_icon = document.getElementById('volume-icon');
let repeat_icon = document.getElementById('repeat-icon');
let menu_ul = document.querySelector('ul');

let musics = [
    { Number: 1, Time: 298, Color: "rgb(79, 53, 38)", Title: "Balance", Artist: "Mehrad Hidden FT Shorab MJ FT Alirez JJ FT Sepehr Khalse", Audio: "audio/Alireza_JJ_Balance_Ft_Mehrad_Hidden,_Sohrab_MJ,_&_Sepehr_Khalse.mp3", Image: "images/music/432edabc34e3ebe689ce659cc7611b30.600x600x1.jpg" },
    { Number: 2, Time: 428, Color: "#C21012", Title: "Man Bahat Ghahram", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Man Bahat Ghahram.mp3", Image: "images/music/man-ghahram.jpg" },
    { Number: 3, Time: 384, Color: "#AC86CB", Title: "Behesht", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Behesht [320].mp3", Image: "images/music/Amir-Tataloo-Behesht.jpeg" },
    { Number: 4, Time: 600, Color: "#3F6EBC", Title: "Ghasam", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Ghasam.mp3", Image: "images/music/Amir-Tataloo-Ghasam.jpg" },
    { Number: 5, Time: 426, Color: "#565A5D", Title: "Khaar", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Khaar [320].mp3", Image: "images/music/amir-tataloo-khaar.jpg" },
    { Number: 6, Time: 244, Color: "#56676F", Title: "Chera Badi", Artist: "ZedBazi FT Hichkas", Audio: "audio/Zedbazi - Chera Badi (Ft Hichkas) [128].mp3", Image: "images/music/artworks-J8eenp8Ybz.jpg" },
    { Number: 7, Time: 179, Color: "#A7B8B7", Title: "Yani Koo", Artist: "Sina Sae", Audio: "audio/Sina Sae - Yani Koo (128).mp3", Image: "images/music/Sina Sae - Yani Koo.jpg" },
    { Number: 8, Time: 206, Color: "#232A69", Title: "Niloofar Abi", Artist: "Reza Pishro", Audio: "audio/reza_pishro_niloofare_abi.mp3", Image: "images/music/reza_pishro_niloofare_abi.jpg.jpg" },
    { Number: 9, Time: 280, Color: "#582429", Title: "Gole Man", Artist: "Sepehr Khalse FT Behzad Leito FT Sijal", Audio: "audio/Sepehr Khalse - Gole Man [320].mp3", Image: "images/music/gole-man-khalse.jpg" },
    { Number: 10, Time: 207, Color: "#D0914D", Title: "Bache Bahala", Artist: "Reza Pishro", Audio: "audio/Reza Pishro - Bache Bahala (320).mp3", Image: "images/music/reza-pishro-bache-bahala.jpg" },
    { Number: 11, Time: 427, Color: "#A93143", Title: "Parishab", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Parishab.mp3", Image: "images/music/Amir Tataloo - Parishab.jpg" },
    { Number: 12, Time: 376, Color: "#219DAA", Title: "Sarbar", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Sarbar.mp3", Image: "images/music/Amir Tataloo - Sarbar.jpg" },
    { Number: 13, Time: 468, Color: "#07B234", Title: "Ba To 2", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Ba To 2.mp3", Image: "images/music/Amir Tataloo - Ba To 2.jpg" },
    { Number: 14, Time: 242, Color: "#B3B3B3", Title: "Navazesh", Artist: "Amir Tataloo", Audio: "audio/Amir Tataloo - Navazesh [320].mp3", Image: "images/music/navazesh-tataloo.jpg" },
    // { Number: , Time: , Color: "", Title: "", Artist: "", Audio: "audio/", Image: "images/music/" },
];
let is_paly = false;
let is_mute = false;
let repaet = 0;
let current_music = musics[0];
let icons = document.querySelectorAll('.icon');
let isMenuOpen = false;
//let current_color = current_music.Color;
OnChangeMusic();



function GenerateMenu() {
    menu_ul.innerHTML = "";
    var li = document.createElement("li");
    var img = document.createElement("img");
    var div = document.createElement("div");
    var h6 = document.createElement("h6");
    var p = document.createElement("p");
    musics.forEach(function (music) {
        li = document.createElement("li");
        if (current_music.Number === music.Number) {
            li.classList.add('play');
        }
        li.dataset.number = music.Number;
        img = document.createElement("img");
        div = document.createElement("div");
        h6 = document.createElement("h6");
        p = document.createElement("p");
        img.src = music.Image;
        h6.innerHTML = music.Title;
        p.innerHTML = music.Artist;
        li.onclick = function (event) {
            var target = this;
            var musicc = musics.find(function (m) {
                return m.Number == target.dataset.number;
            });
            if (musicc) {
                current_music = musicc;
                OnChangeMusic();
                is_paly = !is_paly;
                play_icon.click();
            }
        }
        div.append(h6, p);
        li.append(img, div);
        menu_ul.appendChild(li);
    });
}


GenerateMenu();

function OnChangeMusic() {
    audio_elemet.src = current_music.Audio;
    image_elemet.src = current_music.Image;
    title_element.innerHTML = current_music.Title;
    if (current_music.Title.length > 12) {
        title_element.style.fontSize = "48px";
    }
    else {
        title_element.style.fontSize = "60px";
    }
    if (current_music.Artist.length > 25) {
        artist_element.style.fontSize = "22px";
        artist_element.style.marginBottom = "40px";
    }
    else {
        artist_element.style.fontSize = "30px";
        artist_element.style.marginBottom = "40px";
    }
    artist_element.innerHTML = current_music.Artist;
    time_end_element.innerHTML = SecondToMinute(current_music.Time);
    time_current_element.innerHTML = "0:00";
    tracker_element.max = current_music.Time;
    tracker_element.value = 0;
    console.log(card_div.style.boxShadow);
    document.documentElement.style.setProperty("--prime--color", current_music.Color);
    play_icon.style.color = is_paly == true ? current_music.Color : "";
    volume_icon.style.color = is_mute == false ? current_music.Color : "";
    repeat_icon.style.color = repaet > 0 ? current_music.Color : "";
    let playMusic = document.querySelector(".play");
    if (playMusic) {
        playMusic.classList.remove("play");
    }
    let currentMusic = document.querySelector("li[data-number='" + current_music.Number + "']");
    if(currentMusic){
        currentMusic.classList.add("play");
        
        // console.log(currentMusic.getBoundingClientRect());
        // menu_ul.scrollTop = currentMusic.getBoundingClientRect().top;
        
    }

}
tracker_element.onfocus = function (event) {
    event.preventDefault();
}

let timer = {};


play_icon.addEventListener('click', function () {
    clearInterval(timer);
    time_current_element.innerHTML = SecondToMinute(audio_elemet.currentTime);
    if (is_paly) {
        audio_elemet.pause();
        this.classList.replace('bi-pause-fill', 'bi-play-fill');
    }
    else {
        if (audio_elemet.currentTime == 0) {
            time_current_element.innerHTML = SecondToMinute(0);
        }
        else {
            time_current_element.innerHTML = SecondToMinute(audio_elemet.currentTime + 1);
        }
        PlayMusic();
        this.classList.replace('bi-play-fill', 'bi-pause-fill');
    }
    is_paly = !is_paly;
    play_icon.style.color = is_paly == true ? current_music.Color : "";
})


skipFor_icon.addEventListener('click', function () {
    //clearInterval(timer);
    var a = current_music.Number;
    if (a <= musics.length - 1) {
        current_music = musics.find(function (elem) {
            return elem.Number == a + 1;
        });

        OnChangeMusic();
        is_paly = !is_paly;
        play_icon.click();
    }
})

skipBack_icon.addEventListener('click', function () {
    var a = current_music.Number;
    if (a >= 2) {
        current_music = musics.find(function (elem) {
            return elem.Number == a - 1;
        });
        OnChangeMusic();
        is_paly = !is_paly;
        play_icon.click();
    }
    else {
        audio_elemet.currentTime = 0;
        tracker_element.value = audio_elemet.currentTime;
        time_current_element.innerHTML = SecondToMinute(0);
    }
});


shuffle_icon.addEventListener('click', function () {
    if (isMenuOpen) {
        ShuffleMusics();
    }
    else {
        current_music = musics[Random(0, musics.length)];
        is_paly = !is_paly;
        OnChangeMusic();
        play_icon.click();
        // console.log(currentMusic.getBoundingClientRect());
        // menu_ul.scrollTop = currentMusic.getBoundingClientRect().top;
    }
});


tracker_element.oninput = function () {
    audio_elemet.currentTime = this.value;
}

for10_icon.addEventListener('click', function () {
    audio_elemet.currentTime += 10;
    tracker_element.value = audio_elemet.currentTime;
    if (audio_elemet.currentTime == 0) {
        time_current_element.innerHTML = SecondToMinute(0);
    }
    else {
        time_current_element.innerHTML = SecondToMinute(audio_elemet.currentTime + 1);
    }
})

replay10_icon.addEventListener('click', function () {
    audio_elemet.currentTime -= 10;
    tracker_element.value = audio_elemet.currentTime;
    if (audio_elemet.currentTime == 0) {
        time_current_element.innerHTML = SecondToMinute(0);
    }
    else {
        time_current_element.innerHTML = SecondToMinute(audio_elemet.currentTime + 1);
    }
})

volume_icon.onclick = function () {
    if (is_mute) {
        audio_elemet.muted = false;
        volume_icon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
    }
    else {
        audio_elemet.muted = true;
        volume_icon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
    }
    is_mute = !is_mute;
    volume_icon.style.color = is_mute == false ? current_music.Color : "";
};

repeat_icon.onclick = function () {
    if (repaet == 0) {
        repaet = 1;
        repeat_icon.innerHTML = "repeat_one_on";
    }
    else if (repaet == 1 || repaet == 2) {
        repaet = 3;
        repeat_icon.innerHTML = "repeat_on";
    }
    else {
        repaet = 0;
        repeat_icon.innerHTML = "repeat";
    }
    repeat_icon.style.color = repaet > 0 ? current_music.Color : "";
    console.log(repaet);
    console.log(repeat_icon);
};


list_icon.onclick = function () {
    if (isMenuOpen) {
        menu_ul.style.animationName = "closeSide";
        menu_ul.style.width = "0px";
    }
    else {
        menu_ul.style.animationName = "openSide";
        menu_ul.style.width = "300px";
    }
    isMenuOpen = !isMenuOpen;
}


function PlayOne() {
    repaet = 2;
    OnChangeMusic();
    clearInterval(timer);
    PlayMusic();
}




function SecondToMinute(second) {
    second = Math.floor(second);
    var m = Math.floor(second / 60);
    var s = second % 60;
    if (s < 10) {
        s = "0" + s;
    }
    return m + ':' + s;
}

function PlayMusic() {
    audio_elemet.play();
    // if (audio_elemet.currentTime == 0) {
    //     tracker_element.value = 0;
    //     setTimeout(function () {
    //         time_current_element.innerHTML = SecondToMinute(1);
    //     }, 1000);
    // }
    timer = setInterval(function () {
        time_current_element.innerHTML = SecondToMinute(audio_elemet.currentTime + 1);
        tracker_element.value = audio_elemet.currentTime + 1;
        if (audio_elemet.currentTime >= current_music.Time) {
            clearInterval(timer);
            if (repaet == 0) {
                console.log(repaet);
                if (current_music.Number + 1 < musics.length) {
                    skipFor_icon.click();
                }
                else {
                    play_icon.click();
                }
            }
            else if (repaet == 1) {
                console.log(repaet);
                PlayOne();
            }
            else if (repaet == 2) {
                console.log(repaet);
                repaet = 1;
                skipFor_icon.click();
            }
            else {
                console.log(repaet);
                OnChangeMusic();
                clearInterval(timer);
                PlayMusic();
            }
        }
    }, 1000);
}


function ShuffleMusics() {
    for (let i = musics.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        let temp = musics[i].Number;
        musics[i].Number = musics[j].Number;
        musics[j].Number = temp;
    }
    musics.sort((a, b) => a.Number - b.Number);
    GenerateMenu();
}


document.body.onkeydown = function (event) {
    if (event.keyCode == 32) {
        // Space
        event.preventDefault();
        play_icon.click();
    }
    else if (event.keyCode == 39) {
        // Arrow Right
        event.preventDefault();
        for10_icon.click();
    }
    else if (event.keyCode == 37) {
        // Arrow Left
        event.preventDefault();
        replay10_icon.click();
    }
    else if (event.keyCode == 38) {
        // Arrow Up
        event.preventDefault();
        skipBack_icon.click();
    }
    else if (event.keyCode == 40) {
        // Arrow Down
        event.preventDefault();
        skipFor_icon.click();
    }
    else if (event.keyCode == 16) {
        // Shift Right
        event.preventDefault();
        skipBack_icon.click();
    }
    else if (event.keyCode == 77) {
        // M
        event.preventDefault();
        volume_icon.click();
    }
}


document.querySelectorAll(".noSelect").forEach(function (elem) {
    elem.onselectstart = function (e) {
        e.preventDefault();
    };
})