# Custom Dropdown Component
This repository contains my completed solution to the [Custom Dropdown](https://roadmap.sh/projects/custom-dropdown) challenge on roadmap.sh.

## Project Details
The objective of this challenge was to build a robust custom dropdown alternative to the default native HTML selector element. The component ensures cross-browser visual consistency while maintaining full keyboard matrix traversal, direct DOM event binding, and comprehensive ARIA state specifications for assistive technologies.

## Requirements Met
- Accessible Structural Architecture: Implements a full accessibility matrix using explicit ARIA attributes (`aria-haspopup`, `aria-expanded`, `aria-activedescendant`, and explicit `role="listbox"` / `role="option"` states) to expose the pseudo-dropdown directly to screen readers.
- Native Keyboard Navigation Matrix: Features custom JavaScript keystroke interceptors that listen for execution inputs (`ArrowDown`, `ArrowUp`, `Enter`, `Space`, `Escape`, `Tab`), allowing users to fully traverse, highlight, select, and close the options list without a pointer device.
- Context-Aware Event Handlers: Leverages performance-focused native window listeners to coordinate runtime interactions, closing the layout immediately upon external canvas clicks or focus shifts to avoid out-of-sync overlay states.
- Dynamic Theme Mutation Pipeline: Employs a zero-dependency toggle interface that programmatically alters root element data configurations (`data-theme`), shifting semantic component references on the fly.
- Strict Monochrome Token Layout (CSS): Styled using an explicit multi-tier monochrome variable palette (`--mono-light` / `--mono-dark`), paired with typography driven by an imported high-legibility Inter font sheet configuration.

## Setup & Preview
To preview this project locally:
- Clone this repository to your local machine.
- Open index.html directly inside any modern web browser.