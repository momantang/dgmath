document.addEventListener("DOMContentLoaded", function() {
    const STORAGE_KEY = "mkdocs_collapsible_toc_state";
    let tocState = {};
    try { tocState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e){}

    document.querySelectorAll(".md-nav__list li.md-nav__item").forEach(li => {
        const childUl = li.querySelector("ul.md-nav__list");
        if (!childUl) return;

        // 默认折叠
        const isOpen = tocState[li.textContent.trim()] || false;
        childUl.style.display = isOpen ? "block" : "none";

        // 创建折叠箭头
        const toggle = document.createElement("span");
        toggle.style.cursor = "pointer";
        toggle.style.marginRight = "4px";
        toggle.style.fontSize = "0.8em";
        toggle.textContent = isOpen ? "▼" : "▶";

        toggle.addEventListener("click", e => {
            e.stopPropagation();
            if (childUl.style.display === "none") {
                childUl.style.display = "block";
                toggle.textContent = "▼";
                tocState[li.textContent.trim()] = true;
            } else {
                childUl.style.display = "none";
                toggle.textContent = "▶";
                tocState[li.textContent.trim()] = false;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tocState));
        });

        // 找到第一个 <a> 或 fallback 到 li.firstChild
        let link = li.querySelector("a.md-nav__link");
        if (!link || link.parentNode !== li) {
            link = li.firstChild;
        }
        li.insertBefore(toggle, link);
    });
});
