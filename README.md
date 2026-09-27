# SS MART, Shankarpally

A website for SS MART (Sai Sangameshwara Mart), BNR Road, Shankarpally, Hyderabad.

The shop was long known as **Sai Sangameshwara Kirana and General** and is now a
supermarket. The site is positioned on that basis: same shop, same people, same
counter, upgraded. The old name is on the page on purpose, in the hero, the story
section, the footer and the structured data, because customers who used to shop
there search the old name and without it that traffic has nowhere to land.

Three files, no framework, no build step, no `package.json`, no `node_modules`.
Double-click `index.html` and it runs. Or serve the folder with anything:

```
npx serve -l 4190 .
```

## What the page is for

A customer standing outside the shop, or a neighbour who was sent a link, needs
four things: what it is called, what time it is open, where it is, and how to
ring. Those four are the page. Everything else was cut.

## Design decisions, and the reason for each

**Light, not dark.** The first version was a near-black page with a glowing
accent. That shape is a software landing page. A grocery in Shankarpally is a
daytime place and the customer is standing in a street, so a bone ground with one
hard accent reads as a painted shop board instead of a SaaS hero.

**One accent, cobalt `#1a3fd8`.** Used for the primary action, the focus ring and
one stock cell. Green and rust appear only on the live open/closed line, because
that is a fact changing in time rather than a brand colour.

**The metal is gunmetal, not mirror, and that is a real constraint.** Polished
steel has near-white specular highlights, and near-white is unreadable under any
text colour. So the obvious way to draw shiny metal either makes the type
disappear every time the highlight sweeps under it, or flattens the highlight
until it stops looking like metal. The plaque runs `#14181c` to `#474f58`
instead. It still reads as a curved surface catching light, and white text on its
brightest band is 7.5:1, so the type never has to dodge the sweep. The
accessibility requirement survived instead of being traded against.

**The metal appears exactly once.** `document.querySelectorAll` confirms one
animated element on the page: `.plaque`, a 7-second background sweep. The same
gradient on a badge or a card stops being a material and starts being a
decoration.

**One ramp for both light and dark themes.** A metal plate is a physical object
with its own colour, not a themed surface, so it does not change colour when the
reader's phone goes dark. In dark mode a hairline keeps it off the page.

**The map waits for a click.** A Google Maps embed is an iframe plus its own
JavaScript and cookies, several hundred kilobytes. The people opening this page
on a phone are the ones standing in the street on mobile data. They get the
address, the coordinates and a directions link first, which is the part they came
for. To load it on page load instead, move the `iframe` creation in `app.js` out
of the click handler.

**English only.** An earlier version carried Telugu copy that had not been
checked by a native speaker. Unverified copy in front of customers is worse than
no copy. There is a commented-out photo section in `index.html` ready for when
there is something to put in it.

## Reviews: 4.6 out of 5, from 21 Google reviews

I got this wrong twice before getting it right, and the sequence is worth
recording so it does not happen again.

First check: the rendered place panel showed no rating, no review count and no
"write a review" prompt, and I concluded the shop had no reviews. Second check:
the listing showed photos, so the panel clearly was rendering, and I assumed the
absence of reviews was real. Both were wrong. The rendered panel simply does not
always paint the review section, in the same way it only paints the photo
gallery after a delay. **The review data was in the network response the whole
time**, in the `/maps/preview/place` payload:

```
"21 reviews", 4.6
https://search.google.com/local/reviews?placeid=ChIJTVUV25_vyzsR2-bIgstPA7Y
```

So the rule this site learned the hard way: for anything factual, read the
network payload, not the rendered DOM. A rendered panel proves nothing about
absence.

The page now shows 4.6 from 21, with the stars clipped to the score rather than
rounded up to five, an "as of" date, and a link to all 21 on Google. The
`aggregateRating` in the structured data carries the same figures, which is now
legitimate because they come from the profile Google reads them from.

**No individual reviews are quoted.** The review texts could not be extracted,
so none were written. Three invented five star quotes from invented customers on
a real shop's website is the single thing most likely to destroy the trust this
page is for. The link to Google is where a sceptical customer was going to go
anyway.

A directory quotes 4.8 from 19. That is stale, it disagrees with the profile, and
it is used nowhere. When the rating moves, update the page and the JSON-LD
together and move the "as of" date.

The same payload also independently confirmed two things the site had been
carrying as unverified: the address on **BNR Road** (Justdial's "Gunj Road" is
wrong) and the Instagram handle.

## More photographs

There are two photographs in this repo because the listing has two. To get more,
ask the shop for phone photos. This is the whole shot list:

- The counter from the customer's side, mid-transaction.
- One shelf or rack, shot straight on, showing the range.
- The goods outside the entrance, which is what passersby actually stop for.
- The owner or a staff member behind the counter. A face builds more trust than
  any product shot, and for a neighbourhood shop people buy from the person.
- The shopfront at night with the lights on, for the evening crowd.
- One close-up of something specific they are known for.

Drop them in `photos/` and copy one of the two `<figure>` blocks in `index.html`.
Keep them portrait 3:4 so the grid stays even, or change the `aspect-ratio` in
`styles.css` to match. The `width` and `height` attributes must be set to the
real pixel size of each file or the page will shift as they load.

Adding photos to the Google Business Profile is worth more than adding them
here, because the profile is what ranks.

## Photographs

Two photographs of the shop, used with the owner's approval:

| File | Shows | Source pixels | Served |
|---|---|---|---|
| `photos/shopfront.jpg` | the shopfront, signboard, garlands, entrance | 3024 x 4032 | 1200 x 1600, 353 KB |
| `photos/inside.jpg` | the aisle, shelves of packaged stock | 960 x 1280 | 960 x 1280, 223 KB |
| `photos/og.jpg` | the signboard, for link previews | from shopfront | 1200 x 630, 170 KB |

Both are portrait 3:4 so the pair sits in a plain two column grid with no
cropping. The shopfront was cropped: the original had a lot of empty road at the
bottom and an uninteresting floor above, so the frame was tightened onto the
signboard and the shopfront band while staying 3:4.

The shopfront original was a 24.7 MB phone file. It is served at 353 KB, a 66x
reduction, which is the difference between the photo section being usable on
mobile data and being the reason somebody leaves. Both images carry `width` and
`height` attributes matching their intrinsic size, so they reserve their space
and cause no layout shift, and both are `loading="lazy"`.

The alt text describes what is actually in each frame rather than repeating the
caption.

### What the photos settled

Reading the signboard in `photos/shopfront.jpg` settled two things that were
previously uncertain:

- **The phone number is on the shop's own signboard**, printed as
  "Ph : 9849530828". It is no longer single-sourced; the shopfront and the
  Cybo directory agree.
- **The Telugu name on the sign reads సాయి సంగమేశ్వర మార్ట్**, which confirms
  "Sai Sangameshwara Mart" and the శంకర్‌పల్లీ spelling.

The signboard also carries a saffron Ganesha panel on the left and a black shield
badge reading "SS MART" on the right. Neither is reproduced on this site. The
header uses a plain typographic "SS" in a square, which is a stand-in rather
than a copy of their mark, and drawing their actual logo from a photograph would
be guesswork.

The interior photo confirms the shop stocks packaged groceries, snacks,
drinkware and toiletries, which is what the product list claims.

## A word of caution on the word "supermarket"

"Supermarket" sets a specific expectation in India: a building, trolleys, a
billing counter, cold storage, a loyalty card, weekly offers. A neighbourhood
shop that rebrands itself as one invites that comparison and comes off worse on
every one of those counts. Some customers read a converted kirana calling itself
a supermarket as misleading, and "rate bait" is a real accusation in this trade.

The word is the shop's to use, and it is in the title, the copy and the
structured data as requested. But the page is deliberately built so the word is
backed by evidence rather than assertion. The "Why shop with us" block is built
around the four things a supermarket chain genuinely cannot offer a
neighbourhood shop: the same people for years, the same phone number, stock
checked by messaging the shop, and nobody scripted. Those are the claims that
are true, and they are the ones that survive a customer standing in the shop
looking for a trolley.

If the shop adds a trolley, a billing counter or a weekly offer, say so and it
can be added. Those are real assets and they would narrow the gap.

## Two things the page is missing, and they are the trust ingredients

Neither can be invented. Both are worth more than any further design work.

1. **The owner's name, and a photo of them at the counter.** A neighbourhood
   shop is trusted because of the person in it. The site currently has no human
   face or name anywhere, and for a business trading on relationships that is
   the single largest gap. The interior photograph does show someone at the
   counter, but it is not a portrait.
2. **The year the shop started.** Written into `index.html` as a commented out
   "Serving Shankarpally since" line. There is a cancelled GST registration from
   2021 and an old directory listing in the record, neither of which pins the
   year, and a founding year is a claim customers rely on.

## Search and local ranking

What is in place on this site:

- **`Supermarket` as the schema.org type.** It was `GroceryStore`. The type
  should match the real category, and it is the shop's directory category.
- **`alternateName` carries the former name**, plus the shorter "Kirana" form.
- **`GroceryStore` structured data** with real address, geo, telephone, opening
  hours, payment methods, currency, price range, `areaServed`, `sameAs` for the
  Instagram, `hasMap`, and the three real photographs.
- **An `og:image` and a Twitter card**, cut from the real signboard. There were
  none before, so every share into WhatsApp or a search result was a blank card.
- **`sitemap.xml` and `robots.txt`.** Both have placeholders for the domain and
  the deploy date, because a sitemap with a placeholder domain is worse than none.
- **Internal nav links.** The header previously had no anchors at all, so the
  only route into the sections was scrolling.
- **No layout shift.** Every image has `width` and `height` matching its
  intrinsic size, verified in the browser.

Two placeholders to fix at deploy: the absolute `og:image` and `twitter:image`
URLs, and the `<loc>` and `<lastmod>` in `sitemap.xml`.

## Data, and where it came from

| Fact | Value | Source |
|---|---|---|
| Shop name | SS MART, Sai Sangameshwara Mart | Google Maps, and the shop's own signboard |
| Former name | Sai Sangameshwara Kirana and General | the shop owner |
| Trade | supermarket | the shop owner, and the directory category |
| Telugu name | సాయి సంగమేశ్వర మార్ట్ | the shop's own signboard |
| Place ID | `0x3bcbef9fdb15554d:0xb6034fcb82c8e6db` | Google Maps |
| Coordinates | 17.4537533, 78.13183 | Google Maps place pin |
| Map embed | the URL in `app.js` | supplied by the shop owner |
| Address | Shankerpally Vegetable Market, BNR Road, Shankarpally, Hyderabad, Telangana 501203 | Cybo directory |
| Phone | 98495 30828 | the shop's own signboard, and Cybo |
| Hours | 9 AM to 9 PM daily | the shop's own Instagram bio, confirmed by the shop |
| Payment | cash, credit card, NFC tap | Cybo directory |
| Photographs | shopfront and interior | the shop's own Maps listing, used with the owner's approval |
| Instagram | `@ssmart_shankarpally_official` | the shop's own bio |

The embed URL in `app.js` is the owner's own and carries the place ID, so it points
at the verified listing rather than at a coordinate that might drift. The
coordinates in the markup match the pin in the place URL. Note that the
`@17.4537922,78.1318367` in that URL is the map viewport centre, not the pin.

The listing has exactly two owner photographs. A third image request resolves to
a byte-identical copy of the shopfront on a different Google host, and the
Street View imagery dated November 2024 is separately licensed and not used.

## One thing the shop still has to supply

**The year the shop started.** A "Serving Shankarpally since" line is written
into `index.html` and commented out, waiting on a real year. It has not been
shipped with a guess. There is a cancelled GST registration from 2021 and an old
directory listing in the record, neither of which pins the year down, and a
founding year is a claim customers will rely on.

## What is confirmed, and how

Four things started as single-sourced or unverified and are now corroborated:

- **Phone 98495 30828.** Read off the shop's own signboard in
  `photos/shopfront.jpg`, which shows "Ph : 9849530828". The directory agreed.
- **BNR Road.** Google's own place payload returns
  `"Vegetable Market", "BNR Road", "Shankarpalle"`. Justdial's "Gunj Road" is the
  wrong one.
- **4.6 from 21 reviews.** From the `/maps/preview/place` payload Google serves
  for the listing, not from a rendered panel and not from a directory.
- **Opening hours, 9 AM to 9 PM.** The shop's own Instagram bio says so, and the
  shop has confirmed it. Cybo's 8:30 to 9:30 is the outlier and is supported by
  nothing else. Note that the timings are **not** printed anywhere on the
  signboard, so unlike the phone number they cannot be read off the photograph.

## A detail the photographs gave up

The glass at the entrance says **"PLEASE LEAVE YOUR FOOTWEAR OUTSIDE"**, legible
in the shopfront photograph. It is on the page now as a small notice. It is worth
more than any adjective about service, because it is the sort of thing a shop
puts up only if it means it.

## Accessibility and checks actually run

- Contrast audited in both themes by walking every text element and compositing
  its real painted colours, including alpha. 30 elements per theme, 0 failures.
  The six elements sitting on the metal plate are checked by hand against the
  gradient's brightest band; the worst is 4.67:1.
- Both images have alt text, `width` and `height` attributes matching their
  intrinsic size, and `loading="lazy"`. Verified in the browser: intrinsic
  dimensions match the attributes exactly, so no layout shift.
- `prefers-reduced-motion` stops the sweep and the status pulse. The sweep is
  additionally gated behind `prefers-reduced-motion: no-preference`.
- The open/closed time is read in `Asia/Kolkata`, not the visitor's clock. Verified
  by probing: Kolkata 01:27, London 20:57, New York 15:57, Tokyo 04:57 from the
  same call. A device with no timezone database returns null and the page says so
  rather than guessing.
- The map iframe has an accessible name. An unnamed frame is announced as "frame"
  and nothing else.
- `noscript` prints the address, phone and a directions link, so the page is still
  useful with JavaScript off.
- Icons are Tabler Icons (MIT), inlined. The paths are the library's, not drawn
  by hand.
