document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyState = document.querySelector('.empty-state');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumber = document.getElementById('numbers');
    const progressPercent = document.getElementById('progress-percent');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const musicContainer = document.querySelector('.music-container');
    const playBtn = document.querySelector('#music-play');
    const prevBtn = document.querySelector('#music-prev');
    const nextBtn = document.querySelector('#music-next');
    const audio = document.getElementById("audio");
    const progress = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-container');
    const title = document.getElementById("music-title")
    const cover = document.getElementById("cover");
    const artist = document.getElementById("artist");

    let hasCelebrated = false;

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];

    let currentDate = new Date();
    let today = new Date();
    let selectedDate = new Date();

    const getDateKey = (date) => {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1)
        .padStart(2, "0");

    const day = String(date.getDate())
        .padStart(2, "0");

    return `${year}-${month}-${day}`;

};

const songs = [
    {
        title: "noon",
        artist: "massobeats"
    },
    {
        title: "aromatic",
        artist: "massobeats"
    },
    {
        title: "midnight",
        artist: "massobeats"
    },
    {
        title: "lotus",
        artist: "massobeats"
    },
    {
        title: "honey jam",
        artist: "massobeats"
    },
    {
        title: "peach prosecco",
        artist: "massobeats"
    },
    {
        title: "Apple Tree",
        artist: "Lukrembo"
    },
    {
        title: "Midnight Bliss",
        artist: "Moavii"
    },
    {
        title: "Flower Cup",
        artist: "Lukrembo"
    }
];

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText = song.title;
    artist.innerText = song.artist;

    audio.src = `music/${song.title}.mp3`;
    cover.src = `disc images/${song.title}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateSongProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

function updateSongProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})

    function renderCalendar(date){
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;

        daysContainer.innerHTML = '';

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for(let i = firstDay; i > 0; i--){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        for(let i = 1; i <= lastDay; i++){
        const dayDiv = document.createElement('div');

        const dateNumber = document.createElement('span');
        dateNumber.textContent = i;

        dayDiv.appendChild(dateNumber);
        const clickedDate = new Date(year, month, i);
        const key = getDateKey(clickedDate);
        const planner = JSON.parse(localStorage.getItem("planner")) || {};
        const taskCount = planner[key] ? planner[key].length : 0;

        if(
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
        ){
        
        dayDiv.classList.add('today');
        }

        if(
        i === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()
        ){
        dayDiv.classList.add('selected');
        }

        dayDiv.addEventListener("click", () => {
        saveTasktoLocalStorage();

    selectedDate = clickedDate;

    taskList.innerHTML = "";

    loadTasksfromLocalStorage();
    renderCalendar(currentDate);
  });

    if (taskCount > 0) {
    const marker = document.createElement("span");
    marker.classList.add("task-marker");
    marker.textContent = "🐰";
    dayDiv.appendChild(marker);
    }

    daysContainer.appendChild(dayDiv);
    }   

        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i=1; i<= nextMonthStartDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    prevButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);

    const toggleEmptyState = () => {

        if (taskList.children.length === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
        }

        todosContainer.style.width =
            taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = () => {

        const totalTasks = taskList.children.length;
        const completedTasks =
            taskList.querySelectorAll('.checkbox:checked').length;

        const percentage = totalTasks
        ? Math.round((completedTasks / totalTasks) * 100)
        : 0;

        progressBar.style.width = `${percentage}%`;
        progressPercent.textContent = `${percentage}%`;
        progressNumber.textContent =
            `${completedTasks} / ${totalTasks}`;

        if (
            totalTasks > 0 &&
            completedTasks === totalTasks &&
            !hasCelebrated
        ) {
            hasCelebrated = true;
            Confetti();
        }

        if (completedTasks !== totalTasks) {
            hasCelebrated = false;
        }
    };

    const updateClock = () => {

    const now = new Date();

    time.textContent = now.toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    date.textContent = now.toLocaleDateString("en-PH", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
};

    const saveTasktoLocalStorage = () => {

    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
    }));

    const planner =
        JSON.parse(localStorage.getItem("planner")) || {};

    planner[getDateKey(selectedDate)] = tasks;

    localStorage.setItem(
        "planner",
        JSON.stringify(planner)
    );
    renderCalendar(currentDate);
   };

    const loadTasksfromLocalStorage = () => {

    const planner =
        JSON.parse(localStorage.getItem("planner")) || {};

    const savedTasks =
        planner[getDateKey(selectedDate)] || [];

    savedTasks.forEach(({ text, completed }) => {
        addTask(text, completed);
    });

    toggleEmptyState();
    updateProgress();
  };

    const addTask = (text, completed = false) => {

        const taskText = text || taskInput.value.trim();

        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>

            <span>${taskText}</span>

            <div class="task-buttons">
                <button class="edit-btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>

                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        if (completed) {

            li.classList.add('completed');

            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {

            const isChecked = checkbox.checked;

            li.classList.toggle('completed', isChecked);

            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';

            updateProgress();
            saveTasktoLocalStorage();
        });

        editBtn.addEventListener('click', () => {

            if (!checkbox.checked) {

                taskInput.value = li.querySelector('span').textContent;

                li.remove();

                toggleEmptyState();
                updateProgress();
                saveTasktoLocalStorage();

                taskInput.focus();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {

            li.remove();

            toggleEmptyState();
            updateProgress();
            saveTasktoLocalStorage();
        });

        taskList.appendChild(li);

        taskInput.value = '';

        toggleEmptyState();
        updateProgress();
        saveTasktoLocalStorage();
    };

    // Add task when button is clicked
    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {

            e.preventDefault();
            addTask();
        }
    });

    loadTasksfromLocalStorage();

    toggleEmptyState();
    updateProgress();

    console.log(getDateKey(selectedDate));
    updateClock();
    setInterval(updateClock, 1000)

});

const Confetti = () => {

    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
    };

    function shoot() {

        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    shoot();
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
};



