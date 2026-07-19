/*
  ALBUMS DATA
  -----------
  This is the only file you usually need to touch to update your site.

  To add a new album:
    1. Create a folder under /images/ named with a lowercase-hyphen slug,
       e.g. images/berlin/
    2. Put a "cover.jpg" in it (used on the homepage), plus your numbered
       photos (01.jpg, 02.jpg, ...).
    3. Copy one of the blocks below, change the values, and add it to the
       ALBUMS array.
    4. Commit and push — GitHub Pages rebuilds automatically.

  Tip: keep photos under ~500KB each (resize to ~2000px on the long edge)
  so the site stays fast. See README.md for a one-line command to do this.
*/

const ALBUMS = [
  {
    id: "copenhaged_2026",
    title: "Copenhagen 2026",
    subtitle: "Denmark",
    category: "Architecture",
    cover: "images/copenhagen_2026/cover.jpg",
    photos: [
      { src: "images/copenhagen_2026/01.jpg", caption: "Somewhere in Copenhagen - Snap 01" },
      { src: "images/copenhagen_2026/02.jpg", caption: "Somewhere in Copenhagen - Snap 02" },
      { src: "images/copenhagen_2026/03.jpg", caption: "Somewhere in Copenhagen - Snap 03" },
      { src: "images/copenhagen_2026/04.jpg", caption: "Somewhere in Copenhagen - Snap 04" },
      { src: "images/copenhagen_2026/05.jpg", caption: "Somewhere in Copenhagen - Snap 05" },
      { src: "images/copenhagen_2026/06.jpg", caption: "Somewhere in Copenhagen - Snap 06" },
      { src: "images/copenhagen_2026/07.jpg", caption: "Somewhere in Copenhagen - Snap 07" },
      { src: "images/copenhagen_2026/08.jpg", caption: "Somewhere in Copenhagen - Snap 08" },
      { src: "images/copenhagen_2026/09.jpg", caption: "Somewhere in Copenhagen - Snap 09" },
      { src: "images/copenhagen_2026/10.jpg", caption: "Somewhere in Copenhagen - Snap 10" },
      { src: "images/copenhagen_2026/11.jpg", caption: "Somewhere in Copenhagen - Snap 11" },
      { src: "images/copenhagen_2026/12.jpg", caption: "Somewhere in Copenhagen - Snap 12" },
      { src: "images/copenhagen_2026/13.jpg", caption: "Somewhere in Copenhagen - Snap 13" },
      { src: "images/copenhagen_2026/14.jpg", caption: "Somewhere in Copenhagen - Snap 14" },
      { src: "images/copenhagen_2026/15.jpg", caption: "Somewhere in Copenhagen - Snap 15" },
      { src: "images/copenhagen_2026/16.jpg", caption: "Somewhere in Copenhagen - Snap 16" }
    ]
  },
  {
    id: "jarvso_2026",
    title: "Järvsö Trip 2026",
    subtitle: "Sweden",
    category: "Landscape",
    cover: "images/jarvso_2026/cover.jpg",
    photos: [
      { src: "images/jarvso_2026/01.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/02.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/03.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/04.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/05.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/06.jpg", caption: "Järvsö Kyrka" },
      { src: "images/jarvso_2026/07.jpg", caption: "Järvsö Kyrka" },
      { src: "images/jarvso_2026/08.jpg", caption: "View from Helsingegården" },
      { src: "images/jarvso_2026/09.jpg", caption: "Mountain bikers at Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/10.jpg", caption: "Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/11.jpg", caption: "Järvsö Kyrka" },
      { src: "images/jarvso_2026/12.jpg", caption: "View from Helsingegården" },
      { src: "images/jarvso_2026/13.jpg", caption: "Birdseye View from Järvsö Bergscykel Park" },
      { src: "images/jarvso_2026/14.jpg", caption: "Järvsö Centrum" },
      { src: "images/jarvso_2026/15.jpg", caption: "Järvsö Centrum" },
      { src: "images/jarvso_2026/16.jpg", caption: "Helsingegården" }
    ]
  },
  {
    id: "rattvik_2026",
    title: "Rättvik Daytrip 2026",
    subtitle: "Sweden",
    category: "Landscape",
    cover: "images/rattvik_2026/cover.jpg",
    photos: [
      { src: "images/rattvik_2026/01.jpg", caption: "Rättvik Centrum" },
      { src: "images/rattvik_2026/02.jpg", caption: "Traditional Handmade Craft Shop" },
      { src: "images/rattvik_2026/03.jpg", caption: "Mountain view from Rättvik" },
      { src: "images/rattvik_2026/04.jpg", caption: "Rättvik Church" },
      { src: "images/rattvik_2026/05.jpg", caption: "Railway meets the horizon" },
      { src: "images/rattvik_2026/06.jpg", caption: "View of Lake Siljan" },
      { src: "images/rattvik_2026/07.jpg", caption: "View of Lake Siljan" },
      { src: "images/rattvik_2026/08.jpg", caption: "View of Lake Siljan" },
      { src: "images/rattvik_2026/09.jpg", caption: "View of Lake Siljan" },
      { src: "images/rattvik_2026/10.jpg", caption: "Rättvik Naturmuseum" }
    ]
  }
];
