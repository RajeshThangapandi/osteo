# Expert Insights Layout - Short on New Row

## Change Made

Moved the third video (YouTube Short) to its own row in the Expert Insights section.

## Implementation

### HTML Update
Added `video-new-row` class to the third video:
```html
<div class="video-card-short video-new-row">
```

### CSS Update
```css
.video-new-row {
    grid-column: 1 / -1; /* Span all columns */
}
```

This forces the element to span all grid columns, pushing it to a new row.

---

## Layout Result

### Before:
```
Row 1: [Horizontal] [Horizontal] [Vertical Short]
       (Messy - mixed heights in same row)
```

### After:
```
Row 1: [Horizontal Video 1] [Horizontal Video 2]

Row 2:        [Vertical Short]
              (Centered)
```

---

## Benefits

✅ **Clean separation** - Horizontal videos on one row, Short on another
✅ **Better visual hierarchy** - Each content type has its own space
✅ **Centered Short** - The vertical video is centered on its own row
✅ **No height conflicts** - No more awkward alignment issues
✅ **Responsive** - On mobile, all videos stack vertically anyway

---

## Final Expert Insights Layout

**Desktop:**
- Row 1: 2 horizontal videos side by side
- Row 2: 1 vertical Short, centered

**Mobile:**
- All 3 videos stacked vertically (1 per row)
