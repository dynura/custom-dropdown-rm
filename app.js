document.addEventListener('DOMContentLoaded', () => {
    // ELEMENT QUERY POOL INITIALIZATION
    const dropdown = document.getElementById('custom-dropdown');
    const trigger = document.getElementById('dropdown-trigger');
    const menu = document.getElementById('dropdown-menu');
    const items = Array.from(menu.querySelectorAll('.dropdown-item'));
    const valueDisplay = document.getElementById('dropdown-value');
    const themeToggle = document.getElementById('theme-toggle');

    let activeIndex = -1; // Tracks keyboard index highlighting traversal

    // 1. THEME CONTROLLER MUTATION ENGINE
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.parentElement.getAttribute('data-theme') === 'dark';
        document.body.parentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeToggle.textContent = isDark ? 'DARK' : 'LIGHT';
    });

    // 2. OPEN / CLOSE DRAWER MECHANICS
    const openMenu = () => {
        dropdown.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        
        // Find previously active item if exists, otherwise set to index 0
        const selectedIdx = items.findIndex(item => item.getAttribute('aria-selected') === 'true');
        highlightItem(selectedIdx >= 0 ? selectedIdx : 0);
    };

    const closeMenu = () => {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        removeHighlights();
        activeIndex = -1;
    };

    const toggleMenu = () => {
        dropdown.classList.contains('open') ? closeMenu() : openMenu();
    };

    // 3. SELECTION EXECUTION STATE CHANGE
    const selectItem = (index) => {
        const targetItem = items[index];
        if (!targetItem) return;

        // Reset current selected states
        items.forEach(item => item.setAttribute('aria-selected', 'false'));
    
        // Set target configurations
        targetItem.setAttribute('aria-selected', 'true');
        valueDisplay.textContent = targetItem.textContent;
    
        closeMenu();
        trigger.focus(); // Retain focus visibility on control node
    };

    // 4. KEYBOARD TRAVERSAL & HIGHLIGHT IMPLEMENTATIONS
    const highlightItem = (index) => {
        removeHighlights();
        if (index < 0 || index >= items.length) return;

        activeIndex = index;
        items[activeIndex].classList.add('focused');
        
        // Announce current item focus to screen readers programmatically
        trigger.setAttribute('aria-activedescendant', items[activeIndex].id || `opt-${activeIndex}`);
    };

    const removeHighlights = () => {
        items.forEach(item => item.classList.remove('focused'));
    };

    // 5. EVENT BINDING ARRAYS
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selectItem(index);
        });
    });

    // Global closure context hook if clicking outside the bounding area
    window.addEventListener('click', () => {
        if (dropdown.classList.contains('open')) closeMenu();
    });

    // 6. KEYBOARD EVENT ROUTER MATRIX
    trigger.addEventListener('keydown', (e) => {
        const isOpen = dropdown.classList.contains('open');

        switch (e.key) {
            case 'Enter':
            case ' ':
            e.preventDefault();
            if (isOpen) {
                if (activeIndex >= 0) selectItem(activeIndex);
            } else {
                openMenu();
            }
            break;

            case 'ArrowDown':
            e.preventDefault();
            if (!isOpen) {
                openMenu();
            } else {
                const nextIdx = (activeIndex + 1) % items.length;
                highlightItem(nextIdx);
            }
            break;

            case 'ArrowUp':
            e.preventDefault();
            if (!isOpen) {
                openMenu();
            } else {
                const prevIdx = (activeIndex - 1 + items.length) % items.length;
                highlightItem(prevIdx);
            }
            break;

            case 'Escape':
            case 'Tab':
            if (isOpen) {
                e.preventDefault();
                closeMenu();
            }
            break;
        }
    });
});