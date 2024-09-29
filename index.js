function Accordion() {
	// Initialize each accordion item based on its expanded state
	document.querySelectorAll(".accordion > .accordion-item").forEach((el) => {
		const isExpanded = el.dataset.expanded === "true";
		if (isExpanded) {
			expandItem(el);
		} else {
			collapseItem(el);
		}
	});

	// Set up event listeners for accordion headers
	document
		.querySelectorAll(".accordion > .accordion-item > .accordion-header")
		.forEach((header) => {
			header.addEventListener("click", () => {
				const currentAccordionItem = header.closest(".accordion-item");
				const isActive = header.classList.contains("active");

				if (isActive) {
					collapseItem(currentAccordionItem);
				} else {
					// Expand the current accordion item
					expandItem(currentAccordionItem);

					// Collapse only sibling accordion items at the same level
					currentAccordionItem.parentElement
						.querySelectorAll(":scope > .accordion-item")
						.forEach((item) => {
							if (item !== currentAccordionItem) {
								collapseItem(item);
							}
						});
				}
			});
		});

	// Initialize collapse functionality
	document.querySelectorAll('[data-toggle="collapse"]').forEach((button) => {
		const target = document.querySelector(button.dataset.target);
		if (button.getAttribute("aria-expanded") === "true") {
			expandCollapse(target);
			button.classList.add("active");
		} else {
			target.style.maxHeight = null;
		}

		button.addEventListener("click", () => toggleCollapse(button));
	});

	// Function to expand an accordion item
	function expandItem(item) {
		const collapse = item.querySelector(":scope > .accordion-collapse");
		if (collapse) {
			collapse.style.maxHeight = collapse.scrollHeight + "px";
			collapse.style.opacity = "1";
			item.querySelector(":scope > .accordion-header").classList.add("active");

			// Reset the max-height to auto after the animation ends
			collapse.addEventListener("transitionend", function onTransitionEnd() {
				collapse.style.maxHeight = "none";
				collapse.removeEventListener("transitionend", onTransitionEnd);
			});
		}
	}

	// Function to collapse an accordion item
	function collapseItem(item) {
		const collapse = item.querySelector(":scope > .accordion-collapse");
		if (collapse) {
			collapse.style.maxHeight = collapse.scrollHeight + "px"; // Set to current height to trigger transition
			collapse.offsetHeight; // Trigger reflow to apply transition
			collapse.style.maxHeight = "0";
			collapse.style.opacity = "0";
			item.querySelector(":scope > .accordion-header").classList.remove("active");
		}
	}

	// Function to toggle collapse
	function toggleCollapse(button) {
		const target = document.querySelector(button.dataset.target);
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		if (isExpanded) {
			collapseCollapse(target);
			button.setAttribute("aria-expanded", "false");
			button.classList.remove("active");
		} else {
			expandCollapse(target);
			button.setAttribute("aria-expanded", "true");
			button.classList.add("active");
		}
	}

	function expandCollapse(element) {
		element.style.maxHeight = element.scrollHeight + "px";
		element.style.opacity = "1";
	}

	function collapseCollapse(element) {
		element.style.maxHeight = element.scrollHeight + "px"; // Set to current height to trigger transition
		element.offsetHeight; // Trigger reflow to apply transition
		element.style.maxHeight = "0";
		element.style.opacity = "0";
	}
}

document.addEventListener("DOMContentLoaded", Accordion);
