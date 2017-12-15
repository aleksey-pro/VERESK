import gsap from "gsap";

export default class Animation {
	constructor() {
		this.tl1 = new TimelineMax();
		this.tl1.pause();
	}

	description() {
		this.tl1.from('.heading--about', 0.7, {
			y: -100,
			opacity: 0,
			ease: Power4.easeOut
		}
, '+=0.3')
		// 	.from('#path4297', 1,
		// 	{drawSVG: "50% 50%"}, 0.2);

	}

	activeSection(section, startTop = 0, startBotton = 0) {
		if ($(section).offset() !== undefined) {
			var topPosition = $(section).offset().top - startTop,
				bottomPosition = $(section).offset().top + $(section).height() - startBotton;
			if (($(window).scrollTop() >= topPosition) && ($(window).scrollTop() <= bottomPosition)) {
				return true;
			}
		}
	}

	play() {
		if (this.activeSection('#about', 1000, 1500)) {
			console.log('active section');
			this.tl1.resume();
		}
	}
}
