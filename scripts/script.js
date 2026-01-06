
const events = [
  {
    title: "Day Trading Idea and Strategy",
    date: "Mon, Mar 18 · 7:00 PM PDT",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
    category: "Business",
    price: "Free",
  },
  {
    title: "AI Wednesdays – Meet and Greet",
    date: "Wed, Mar 13 · 6:30 PM PDT",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
    category: "Technology",
    price: "Free",
  },
  {
    title: "ROS By-The-Bay March 2024",
    date: "Thu, Mar 21 · 6:00 PM PDT",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
    category: "Social Activities",
    price: "Free",
  },
  {
    title: "Free Christian Singles' Dinner",
    date: "Fri, Mar 29 · 6:00 PM PDT",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
    category: "Hobbies and Passions",
    price: "Free",
  },
];


const icons = {
  calendar: "images/iu_icons/calendar.svg",
  check: "images/iu_icons/check_mark.svg",
};

const eventsNear = [
  {
    title: "Day Trading Idea and Strategy",
    category: "Business (5 km)",
    date: "MON, MAR 18 · 7:00 PM PDT",
    going: "1 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "Let's Talk Networking: JPMorgan Chase in Palo Alto",
    category: "Business (25 km)",
    date: "TUE, MAR 19 · 5:00 PM PDT",
    going: "41 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "Tech Talks & Quiz: Next-Gen Database Solutions",
    category: "Technology",
    date: "WED, MAR 13 · 6:00 PM PDT",
    going: "40 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "INFORMS San Francisco Chapter In-Person Event",
    category: "Health and Wellbeing (50 km)",
    date: "THU, MAR 28 · 5:00 PM PDT",
    going: "41 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
  
  {
    title: "AI Wednesdays - Meet and Greet!",
    category: "Technology (5 km)",
    date: "WED, MAR 13 · 6:30 PM PDT",
    going: "29 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "ROS By-The-Bay March 2024",
    category: "Social Activities",
    date: "THU, MAR 21 · 6:00 PM PDT",
    going: "51 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "Free Christian Singles' Dinner",
    category: "Hobbies and Passions (10 km)",
    date: "FRI, MAR 29 · 6:00 PM PDT",
    going: "11 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "In-person: Deep Dive into RAG Architectures (Food served)",
    category: "Hobbies and Passions (50 km)",
    date: "THU, MAR 14 · 5:00 PM PDT",
    going: "16 going",
    price: "Free",
    type: "In-person event",
    image: "images/cards/event_placeholder.png",
  },
];

const onlineUpcoming = [
  {
    title: "Amazing On-Demand 15 Min Interviews with Top Coaches and Speakers",
    category: "Business (25 km)",
    date: "THU, MAR 14 · 6:00 PM PDT",
    going: "3 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "Vision Pro Developers Online Meetup",
    category: "Technology",
    date: "WED, MAR 13 · 7:00 PM PDT",
    going: "51 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "Significant Musical Moments",
    category: "Hobbies and Passions",
    date: "WED, MAR 13 · 6:00 PM PDT",
    going: "16 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
  {
    title: "FREE Webinar: Introduction to Power BI",
    category: "Technology",
    date: "THU, MAR 14 · 5:30 PM PDT",
    going: "33 going",
    price: "Free",
    type: "Online event",
    image: "images/cards/event_placeholder.png",
  },
];

function cardTemplate(e) {
  return `
    <article class="event-card">
      <img src="${e.image}" alt="">
      <div class="event-card__content">
        <span class="badge">${e.type}</span>
        <h3>${e.title}</h3>
        <div class="event-meta">${e.category}</div>

        <div class="event-info">
          <img src="${icons.calendar}" alt="">
          <span>${e.date}</span>
        </div>

        <div class="event-info">
          <img src="${icons.check}" alt="">
          <span>${e.going}</span>
          <span class="dot">•</span>
          <span>${e.price}</span>
        </div>
      </div>
    </article>
  `;
}

function render() {
  const nearGrid = document.getElementById("eventsNearGrid");
  const onlineGrid = document.getElementById("onlineEventsGrid");

  if (nearGrid) nearGrid.innerHTML = eventsNear.map(cardTemplate).join("");
  if (onlineGrid) onlineGrid.innerHTML = onlineUpcoming.map(cardTemplate).join("");
}

document.addEventListener("DOMContentLoaded", render);
