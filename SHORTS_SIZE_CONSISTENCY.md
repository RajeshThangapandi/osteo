# YouTube Shorts Size Consistency

## Current Settings

All YouTube Shorts across the site use the **same CSS class** and should display at **identical sizes**.

### CSS Class: `.video-embed-short`

```css
.video-embed-short {
    position: relative;
    width: 100%;
    padding-bottom: 80%;        /* Height ratio */
    height: 0;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: #000;
    max-width: 250px;           /* Maximum width */
    margin: 0 auto;             /* Centered */
}
```

---

## Shorts Locations

### Expert Insights Section
- **1 Short** (Video 3)
- Uses: `video-card-short` + `video-embed-short` + `video-new-row`
- Size: **250px max-width, 80% height ratio**

### Patient Success Stories Section
- **5 Shorts** (All videos)
- Uses: `video-card-short` + `video-embed-short`
- Size: **250px max-width, 80% height ratio**

---

## Size Specifications

All Shorts have:
- ✅ **Max Width**: 250px
- ✅ **Height**: 80% of width (padding-bottom)
- ✅ **Centered**: margin: 0 auto
- ✅ **Same border radius**: var(--radius-md)
- ✅ **Same shadow effects**: Identical hover states

---

## Why They Should Look Identical

1. **Same CSS Class**: All use `.video-embed-short`
2. **Same Max Width**: 250px limit on all
3. **Same Height Ratio**: 80% padding-bottom on all
4. **Same Centering**: All centered with margin: 0 auto
5. **Same Container**: All use `.video-card-short`

---

## Potential Visual Differences

The only difference is **grid positioning**:

### Expert Insights Short:
- Has `video-new-row` class
- Spans full grid width (`grid-column: 1 / -1`)
- **Appears centered in a full-width row**

### Patient Success Stories Shorts:
- No `video-new-row` class
- Each takes 50% of grid width (2-column layout)
- **Appears in 2-column grid**

**BUT** - The actual Short size (250px × 200px) is **identical** in both sections because they use the same CSS.

---

## Verification

All Shorts should display as:
- **Width**: 250px (maximum)
- **Height**: ~200px (80% of 250px)
- **Centered**: Within their grid cell
- **Identical visual appearance**

If they appear different, it's only due to the surrounding grid layout, not the Short itself.
