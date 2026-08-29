/* =========================
   LOGIN SYSTEM
========================= */

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const role =
        document.getElementById("role").value;

    const message =
        document.getElementById("loginMessage");


    if (username === "" || password === "") {

        message.innerText =
            "Please enter username and password.";

        message.style.color = "red";

        return;
    }


    /* Admin Login */

    if (role === "admin") {

        if (username === "admin" && password === "admin123") {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("role", "admin");
            localStorage.setItem("username", username);

            window.location.href = "admin.html";

        } else {

            message.innerText =
                "Invalid admin username or password.";

            message.style.color = "red";
        }

        return;
    }


    /* Student Login */

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "student");
    localStorage.setItem("username", username);

    window.location.href = "student.html";
}


/* =========================
   STUDENT DASHBOARD
========================= */

function startExam() {

    if (localStorage.getItem("loggedIn") !== "true") {

        window.location.href = "login.html";

        return;
    }

    window.location.href = "exam.html";
}


function loadStudentName() {

    const welcome =
        document.getElementById("welcomeStudent");

    if (welcome) {

        const username =
            localStorage.getItem("username");

        welcome.innerText =
            "Welcome, " + (username || "Student") + "!";
    }
}


/* =========================
   EXAM TIMER
========================= */

let timeLeft = 300;

let timerInterval;


function startTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) {
        return;
    }


    timerInterval = setInterval(function () {

        let minutes =
            Math.floor(timeLeft / 60);

        let seconds =
            timeLeft % 60;


        seconds =
            seconds < 10
            ? "0" + seconds
            : seconds;


        timer.innerText =
            minutes + ":" + seconds;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert(
                "Time is over! Your exam will be submitted."
            );

            submitExam();

        }

        timeLeft--;

    }, 1000);
}


/* =========================
   SUBMIT EXAM
========================= */

function submitExam() {

    if (timerInterval) {

        clearInterval(timerInterval);
    }


    let score = 0;


    for (let i = 1; i <= 5; i++) {

        const answer =
            document.querySelector(
                'input[name="q' + i + '"]:checked'
            );


        if (answer && answer.value === "correct") {

            score++;
        }
    }


    localStorage.setItem(
        "examScore",
        score
    );


    window.location.href = "result.html";
}


/* =========================
   RESULT
========================= */

function loadResult() {

    const score =
        localStorage.getItem("examScore") || 0;

    const username =
        localStorage.getItem("username") || "Student";


    const scoreElement =
        document.getElementById("score");

    const nameElement =
        document.getElementById("resultName");

    const messageElement =
        document.getElementById("resultMessage");


    if (scoreElement) {

        scoreElement.innerText = score;
    }


    if (nameElement) {

        nameElement.innerText = username;
    }


    if (messageElement) {

        if (score >= 3) {

            messageElement.innerText =
                "🎉 Congratulations! You passed the examination.";

        } else {

            messageElement.innerText =
                "Keep learning and try again!";
        }
    }
}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    window.location.href = "index.html";
}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadStudentName();

        loadResult();

        if (
            document.getElementById("timer")
        ) {

            startTimer();
        }

    }
);