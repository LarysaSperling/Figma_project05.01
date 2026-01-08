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

const filtersScrollerEl = document.querySelector(".filters__scroller");
const filtersTrackEl = document.querySelector(".filters__track");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatDayOption(dateObj) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const m = months[dateObj.getMonth()];
  const d = dateObj.getDate();

  let h = dateObj.getHours();
  const min = pad2(dateObj.getMinutes());
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;

  return `${m} ${d}, ${h}:${min} ${ampm}`;
}

function dateKey(dateObj) {
 
  return dateObj.getTime();
}

function safeText(str) {
  return String(str ?? "");
}

function getBadge(type) {
  return type === "online" ? "Online event" : "In-person event";
}

function getMeta(event) {
  const typeLabel = event.type === "online" ? "Online" : "Offline";
  const dist = event.type === "offline" && typeof event.distance === "number"
    ? `${event.distance} km`
    : null;

  return `${safeText(event.category)}${dist ? ` · ${dist}` : ""} · ${typeLabel}`;
}

function createCard(event) {
  const dateLine = formatDayOption(event.date);

  const calendarIcon = "images/iu_icons/calendar.svg";
  const checkIcon = "images/iu_icons/check_mark.svg";

  return `
    <article class="event-card">
      <img src="${safeText(event.image)}" alt="${safeText(event.title)}" loading="lazy">
      <div class="event-card__content">
        <span class="badge">${getBadge(event.type)}</span>
        <h3>${safeText(event.title)}</h3>

        <div class="event-meta">${getMeta(event)}</div>

        <div class="event-info">
          <img src="${calendarIcon}" alt="">
          <span>${dateLine}</span>
        </div>

        <div class="event-info">
          <img src="${checkIcon}" alt="">
          <span>Free</span>
        </div>
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

  const unique = Array.from(
    new Map(eventsStore.map(e => [dateKey(e.date), e.date])).values()
  ).sort((a, b) => a.getTime() - b.getTime());

  unique.forEach(dt => {
    const opt = document.createElement("option");
    opt.value = String(dt.getTime());
    opt.textContent = formatDayOption(dt);
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

function initFiltersScrollTrack() {
  const scroller = document.querySelector(".filters__scroller");
  const track = document.querySelector(".filters__track");
  if (!scroller || !track) return;

  function update() {
    const trackW = track.clientWidth;
    const scrollW = scroller.scrollWidth;
    const viewW = scroller.clientWidth;
    const maxScroll = scrollW - viewW;

    if (maxScroll <= 0) {
      track.style.setProperty("--thumb-left", "0px");
      track.style.setProperty("--thumb-width", trackW + "px");
      return;
    }

    const thumbW = Math.max(24, Math.round(trackW * (viewW / scrollW)));
    const left = Math.round((trackW - thumbW) * (scroller.scrollLeft / maxScroll));

    track.style.setProperty("--thumb-left", left + "px");
    track.style.setProperty("--thumb-width", thumbW + "px");
  }

  scroller.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  requestAnimationFrame(update);
  setTimeout(update, 80);
}

function init() {
  buildDayOptions();
  renderEvents(eventsStore);

  [dayEl, typeEl, distanceEl, categoryEl].forEach(sel => {
    if (!sel) return;
    sel.addEventListener("change", applyFilters);
  });

  initFiltersScrollTrack();
}

document.addEventListener("DOMContentLoaded", init);

