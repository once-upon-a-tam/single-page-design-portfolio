const slider = document.getElementById('my-work-slider');
const WORK_PICTURES_AMOUNT = slider.children.length;
const WORK_PICTURE_WIDTH = slider.querySelector('img').width;

/**
 * @name isSliderScrollToEnd
 * @description Calculates whether the user has scrolled to the end of the slider.
 *
 * @returns {bool}
 */
const isSliderScrolledToEnd = () => (
	slider.scrollLeft === (WORK_PICTURE_WIDTH * (WORK_PICTURES_AMOUNT - 1)) - 9
);

/**
 * @name calculateScrollValue
 * @description Calculates the amount of pixels to scroll the slider for.
 *
 * @param {'left' | 'right'} direction The direction towards which the slider should scroll.
 *
 * @returns {number}
 */
const calculateScrollValue = (direction) => {
	if (direction === 'left') {
		return slider.scrollLeft === 0
			?  (WORK_PICTURE_WIDTH * WORK_PICTURES_AMOUNT - 1)
			: -WORK_PICTURE_WIDTH;
	} else if (direction === 'right') {
		return isSliderScrolledToEnd()
			? (-WORK_PICTURE_WIDTH * (WORK_PICTURES_AMOUNT - 1))
			: WORK_PICTURE_WIDTH;
	}
}

/**
 * @name scroll
 * @description A function used to scroll the work slider horizontally.
 *
 * @author Tam
 *
 * @param {'left' | 'right'} direction The direction towards which the slider should scroll.
 */
const scroll = (direction) => {
	slider.scrollBy({ left: calculateScrollValue(direction), behavior: 'smooth' });
}

const arrowButtons = document.querySelectorAll('button[aria-controls="my-work-slider"]');

arrowButtons[0].addEventListener('click', () => {
	scroll("left");
});

arrowButtons[1].addEventListener('click', () => {
	scroll("right");
});