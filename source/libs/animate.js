// import gsap from "gsap";
import {TimelineMax, CSSPlugin, CSSRulePlugin} from "gsap";


export default class Animation {
	constructor() {		
		this.tl1 = new TimelineMax();
		this.tl2 = new TimelineMax();
		this.tl1.pause();
		this.tl2.pause();
		this.elem = $('.heading--about');
		this.elem2 = $('.heading--contacts');
	}

	description() {
		this.tl1.from(this.elem, 3, {
			x: -100,
			opacity: 0,
			ease: Power4.easeOut
		}, '+=0.3'),
		this.tl2.from(this.elem2, 3, {
			x: -100,
			opacity: 0,
			ease: Power4.easeOut
		}, '+=0.3')
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
		if (this.activeSection('#about', 500, 800)) {
			this.tl1.resume();
		} else if (this.activeSection('#contacts', 500, 800)) {	
			this.tl2.resume();
		}
	}
}
