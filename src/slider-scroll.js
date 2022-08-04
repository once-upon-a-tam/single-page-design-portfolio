const slider = document.getElementById('my-work-slider');

const getCurrentItemIndex = () => (
	[...slider.children].findIndex((item) => {
		const { left, right } = item.getBoundingClientRect();

		return left >= 0 && right >= 0;
	})
);

/**
 * @name scroll
 * @description A function used to scroll the work slider horizontally.
 *
 * @author Tam
 *
 * @param {'left' | 'right'} direction The direction towards which the slider should scroll.
 */
const scroll = (direction) => {
	const currentItemIndex = getCurrentItemIndex();
	let itemToScrollTo;

	if (direction === 'left') {
		itemToScrollTo = currentItemIndex === 1
			? slider.children[slider.children.length - 1]
			: slider.children[currentItemIndex - 1];
	} else if (direction === 'right') {
		if (slider.children[slider.children.length - 1].getBoundingClientRect().right === slider.getBoundingClientRect().width) {
			itemToScrollTo = slider.children[0];
		} else {
			itemToScrollTo = currentItemIndex === slider.children.length - 1
				? slider.children[1]
				: slider.children[currentItemIndex + 1];
		}
	}

	itemToScrollTo.scrollIntoView({
		behavior: 'smooth',
		inline: 'center',
	});
}

const arrowButtons = document.querySelectorAll('button[aria-controls="my-work-slider"]');

arrowButtons[0].addEventListener('click', () => {
	scroll("left");
});

arrowButtons[1].addEventListener('click', () => {
	scroll("right");
});


/**
 * @function
 * @name intializeSlider
 * 
 * Adds a phantom div at the start of the item list to allow items to properly be centered when scrolled onto.
 * Scrolls the slider to the center of the 3rd item.
 *
 * @author Tam
 */
const initializeSlider = () => {
	var phantomItem = document.createElement('li');
	phantomItem.style.width = slider.firstElementChild.getBoundingClientRect().width;
	slider.insertBefore(phantomItem, slider.firstChild);

	// Positions the slider items to show the middle element in the center of the slider.
	slider.children[3].scrollIntoView({ behavior: 'smooth', inline: 'center' });

	// Scrolls back to the top of the page.
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

initializeSlider();
