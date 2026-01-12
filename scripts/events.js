const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: 50,
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    attendees: 43,
    category: "Technology",
    distance: 25,
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    category: "Technology",
    distance: 10,
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 77,
    category: "Business",
    distance: 100,
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "online",
    attendees: 140,
    category: "Social Activities",
    distance: 75,
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "offline",
    category: "Health and Wellbeing",
    distance: 15,
  },
];


const gridEl = document.getElementById("eventsGrid");
const dayEl = document.getElementById("filter-day");
const typeEl = document.getElementById("filter-type");
const distanceEl = document.getElementById("filter-distance");
const categoryEl = document.getElementById("filter-category");


function safeText(v) {
  return String(v ?? "");
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function dateKey(dateObj) {
  return dateObj.getTime();
}


function formatFigmaDate(dateObj) {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  const dayName = days[dateObj.getDay()];
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();

  let h = dateObj.getHours();
  const min = pad2(dateObj.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;

  return `${dayName}, ${month} ${day} · ${h}:${min} ${ampm} UTC`;
}

function getMeta(event) {
  const typeLabel = event.type === "online" ? "Online" : "Offline";
  const dist =
    event.type === "offline" && typeof event.distance === "number"
      ? `${event.distance} km`
      : null;

  return `${safeText(event.category)}${dist ? ` · ${dist}` : ""} · ${typeLabel}`;
}


function createCard(event) {
  const dateLine = formatFigmaDate(event.date);

  return `
    <article class="event-card event-card--list">
      <img class="event-card__img" src="${safeText(event.image)}" alt="${safeText(event.title)}" loading="lazy">
      <div class="event-card__content">
        <div class="event-card__date">${dateLine}</div>
        <h3 class="event-card__title">${safeText(event.title)}</h3>
        <div class="event-card__meta">${getMeta(event)}</div>
      </div>
    </article>
  `;
}


function renderEvents(list) {
  if (!gridEl) return;

  if (!list.length) {
    gridEl.innerHTML = `<p style="color:#6b7280;">No events found.</p>`;
    return;
  }

  gridEl.innerHTML = list.map(createCard).join("");
}


function buildDayOptions() {
  if (!dayEl) return;

  
  dayEl.querySelectorAll('option:not([value="any"])').forEach(o => o.remove());

  const uniqueDates = Array.from(
    new Map(eventsStore.map(e => [dateKey(e.date), e.date])).values()
  ).sort((a, b) => a.getTime() - b.getTime());

  uniqueDates.forEach(dt => {
    const opt = document.createElement("option");
    opt.value = String(dt.getTime());
    opt.textContent = formatFigmaDate(dt);
    dayEl.appendChild(opt);
  });
}


function applyFilters() {
  const dayValue = dayEl?.value ?? "any";
  const typeValue = typeEl?.value ?? "any";
  const distValue = distanceEl?.value ?? "any";
  const catValue = categoryEl?.value ?? "any";

  const filtered = eventsStore.filter(ev => {
   
    if (dayValue !== "any" && String(ev.date.getTime()) !== dayValue) return false;

    if (typeValue !== "any" && ev.type !== typeValue) return false;


    if (distValue !== "any") {
      const distNum = Number(distValue);
      if (ev.type !== "offline") return false;
      if (typeof ev.distance !== "number") return false;
      if (ev.distance > distNum) return false;
    }

  
    if (catValue !== "any" && ev.category !== catValue) return false;

    return true;
  });

  renderEvents(filtered);
}


function init() {
  buildDayOptions();
  renderEvents(eventsStore);

  [dayEl, typeEl, distanceEl, categoryEl].forEach(sel => {
    if (!sel) return;
    sel.addEventListener("change", applyFilters);
  });
}

document.addEventListener("DOMContentLoaded", init);

