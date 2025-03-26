---
title: Markdown Test Page
---

```
This is a test page. It also has no `atlasTerm` and slug set - so these will be
derived from title.

Typical frontmatter:

---
title: What are market development funds (MDF)
     ^ Title of the page (and of the article)
atlasTerm: Market Development Funds
         ^ Term used for atlas page. If not specified - title will be used.
slug: mdf
    ^ Slug. If not specified - will use filename without extension.
seo: ...
   ^ Seo stuff, same as in blog
---

```

# Markdown Style Guide

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Emphasis

*Italic text using asterisks*

_Italic text using underscores_

**Bold text using asterisks**

__Bold text using underscores__

***Bold and italic text using asterisks***

___Bold and italic text using underscores___

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item

## Links

[Inline link](https://www.example.com)

[Reference link][example]

[example]: https://www.example.com

## Images

![Alt text](https://via.placeholder.com/150)

## Blockquotes

> This is a blockquote.
>
> It can span multiple lines.

## Code

Inline code: `console.log('Hello, world!');`

### Code Block

```javascript
function greet() {
    console.log('Hello, world!');
}
greet();
```

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
| Row 3    | Data 5   | Data 6   |

## Horizontal Rule

---

## Task List

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

## Footnotes

This is a sentence with a footnote.[^1]

[^1]: This is the footnote.

## Emoji

Here is a smiley face emoji: 😊

## HTML

<p>This is a paragraph written in HTML.</p>
