const eventName = document.getElementById("eventName");
const eventDate = document.getElementById("eventDate");
const addEventBtn = document.getElementById("addEventBtn");
const countdownList = document.getElementById("countdownList");

// 読み込み
function loadEvents() {

    const events =
        JSON.parse(localStorage.getItem("washio_countdowns"))
        || [];

    countdownList.innerHTML = "";

    events.forEach((event, index) => {

        const today = new Date();

        const target = new Date(event.date);

        today.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diff =
            Math.ceil(
                (target - today)
                / (1000 * 60 * 60 * 24)
            );

        let message = "";

        if (diff > 0) {

            message = `あと ${diff} 日`;

        } else if (diff === 0) {

            message = "🎉 今日です！";

        } else {

            message = `${Math.abs(diff)} 日前に終了`;

        }

        const card = document.createElement("div");

        card.className =
            "glass countdown-card";

        card.innerHTML = `
            <h3>${event.name}</h3>

            <div class="days">
                ${message}
            </div>

            <p>
                ${event.date}
            </p>

            <button
                class="delete-btn"
                onclick="deleteEvent(${index})">
                削除
            </button>
        `;

        countdownList.appendChild(card);

    });

}

// 追加
addEventBtn.addEventListener("click", () => {

    const name =
        eventName.value.trim();

    const date =
        eventDate.value;

    if (!name || !date) {

        alert("イベント名と日付を入力してください");

        return;

    }

    const events =
        JSON.parse(
            localStorage.getItem(
                "washio_countdowns"
            )
        ) || [];

    events.push({

        name: name,

        date: date

    });

    localStorage.setItem(
        "washio_countdowns",
        JSON.stringify(events)
    );

    eventName.value = "";
    eventDate.value = "";

    loadEvents();

});

// 削除
function deleteEvent(index) {

    const events =
        JSON.parse(
            localStorage.getItem(
                "washio_countdowns"
            )
        ) || [];

    events.splice(index, 1);

    localStorage.setItem(
        "washio_countdowns",
        JSON.stringify(events)
    );

    loadEvents();

}

// 初回実行
loadEvents();
