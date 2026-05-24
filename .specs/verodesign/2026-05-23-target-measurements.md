# Girok Pass 3 Target Measurements

> Source: `/tmp/target-comparison.png` right phone
> Method: direct visual read on cropped target (`/tmp/target-right-phone.png`)
> Scale basis: 393x852 CSS px target canvas, ratio-based estimate where exact pixel edge was anti-aliased

| # | Component | Target measurement | Current vs target diff | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Header wordmark | 99x35; size ~27px; weight 900; tracking about -0.055em; dot 8px amber `#f7b813` | Current is wider and taller; dot reads too large | top-left brand block under status bar |
| 2 | Header icon buttons | visual box 28x28; icon stroke ~1.8px; gap 14px; fg `#9d9baa` | Current icons read slightly large and bright | top-right bell/gear cluster |
| 3 | L1 tab row | item visual width 52-60; active label 17px/800 amber; inactive 17px/700 muted lavender-gray; underline 78x4 with soft glow | Current tabs too wide with too much top/bottom padding | row under wordmark |
| 4 | L2 segmented | outer 307x57; radius 20; border 1px `#342d1f`; bg `#1d1912`; inner pad 10; active cell 118x40; radius 16; border 1px `#5a4a2c`; fill `#342a18` | Current container and active cell both oversized | first rounded segmented rail |
| 5 | Month nav pill | 175x52; radius 26; border 1px `#352f22`; bg `#1b1711`; horizontal pad 22; label 19px/800 white | Current pill is a little too wide and tall | month selector left control |
| 6 | Register button | 98x58; radius 25; fill `#4a3c1f`; border 1px `#67502a`; text 17px/800 amber `#ffc31a` | Current button is too narrow/tall ratio and too flat | center CTA in toolbar row |
| 7 | View toggle | 126x60; radius 17; bg `#1d1913`; border 1px `#31281c`; active tile 40x40 fill `#2e2616`; inactive fg `#8f8a96` | Current active tile is too tall and the group is too small | right icon switcher |
| 8 | Stats card container | 307x60; radius 20; outer border 1px `#2f3140`; bg `#17140f`; no heavy shadow; cell divider 1px `#343443` | Current card is taller and dividers too warm/thick | 3-col stats block |
| 9 | Stats label | 13px/600; color `#817d8a`; margin-bottom 10 | Current labels are too large and a bit bright | top line in each stats cell |
| 10 | Stats value | 15px/800; income `#34ddb0`; expense `#ff6b88`; remain `#ffbf16` | Current values are too large | second line in each stats cell |
| 11 | Calendar weekday row | size 13px/700; neutral `#7d7987`; sat `#69a9ff`; sun `#ff6c87`; top margin from stats ~31 | Current weekday labels are too large and spread too low | weekday header row |
| 12 | Calendar row gap | week-to-week gap ~34; first row starts ~45 under weekday row | Current rows are too loose vertically in left image | between date rows |
| 13 | Calendar date chip | normal chip 32x32 visual area; numeral 16px/700; today chip 33x33 fill `#3b2d13`; border 1px `#58431f`; text amber | Current today chip is too large and too round-heavy | all day numerals, especially date 20 |
| 14 | Calendar dot | 7x7 amber `#f7bf22`; gap below numeral ~14 | Current dots are too small and close to numerals | dots under 2, 10, 15, 18, 19 |
| 15 | Bottom nav 5 tabs | nav top border 1px `#25232c`; icon 27x27; label 13px/700; active amber; inactive `#888492`; bottom padding visually 36 incl safe area | Current bottom nav icons/labels are slightly oversized and too bright | persistent bottom tab bar |
