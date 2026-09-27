/* =====================================================================
   SS MART, Shankarpally

   Two jobs, both small enough to not need a framework.

   1. Say whether the shop is open right now.
   2. Put the map on screen when somebody asks for it.

   Everything else on the page is in the HTML already, so this file failing
   to load costs two features rather than the site.
   ===================================================================== */

/* ---------------------------------------------------------------------
   OPEN OR CLOSED

   Somebody opening a shop page is usually standing outside it wondering
   whether to walk in. "9 AM to 9 PM" does not answer that, this does.

   The hour is read in Asia/Kolkata, not from the visitor's own clock. The
   shop opens when a clock on a wall in Shankarpally says it does, so anyone
   reading this from Dubai or Dublin has to get the same answer as the
   person on the doorstep. Using the device timezone would be worse than
   showing nothing at all, because it would be confidently wrong for most of
   the people who open a link to a shop.

   If the device has no timezone database, say so. Do not fall back to a
   guess.
   --------------------------------------------------------------------- */

const SHOP_TZ = 'Asia/Kolkata';
const OPENS = 9;
const CLOSES = 21;

function shopHour() {
  let parts;
  try {
    parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: SHOP_TZ,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(new Date());
  } catch {
    return null;
  }

  const hour = Number(parts.find((p) => p.type === 'hour')?.value);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;

  // en-GB renders midnight as 24 on some builds and 0 on others.
  return (hour === 24 ? 0 : hour) + minute / 60;
}

function label(hour24) {
  const h = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${h} ${hour24 < 12 ? 'AM' : 'PM'}`;
}

function setStatus() {
  const state = document.querySelector('[data-status]');
  const text = document.querySelector('[data-status-text]');
  const next = document.querySelector('[data-status-next]');
  if (!state || !text || !next) return;

  const now = shopHour();
  if (now === null) {
    state.className = 'plaque__state';
    text.textContent = 'Hours not available on this device';
    next.textContent = 'Open 9 AM to 9 PM every day';
    return;
  }

  const isOpen = now >= OPENS && now < CLOSES;

  state.className = `plaque__state ${isOpen ? 'is-open' : 'is-shut'}`;
  text.textContent = isOpen ? 'Open now' : 'Closed now';
  // When it is closing, not a countdown. A rounded "closes in 8 hours" reads
  // precise and is not: it would say 8 at seven minutes past one in the
  // afternoon. The time itself is the honest version.
  next.textContent = isOpen ? `Closes at ${label(CLOSES)}` : `Opens at ${label(OPENS)}`;
}

setStatus();
// A page left open in a shop doorway would otherwise start lying.
setInterval(setStatus, 60_000);

/* ---------------------------------------------------------------------
   THE MAP

   The embed URL is the one from the shop's own Google Maps place, which
   carries the place ID, so it points at the verified listing rather than at
   a coordinate that might drift.

   It sits in the markup with loading="lazy" and is not built here. It used to
   wait behind a click, on the reasoning that a Google embed costs a few hundred
   kilobytes and most readers are on mobile data. That reasoning was half right
   and the conclusion was backwards: loading="lazy" already defers the download
   until the section is scrolled to, so the click bought no saving and cost the
   most reassuring thing on the page. Someone looking for a shop wants to see
   where it is, not press a button to find out whether it exists.
   --------------------------------------------------------------------- */

