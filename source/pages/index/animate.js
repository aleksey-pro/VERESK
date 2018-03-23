/**
 * Импорт библиотеки TimelineMax и расширений
 */
import {TimelineMax, CSSPlugin, CSSRulePlugin} from 'gsap';

/**
 * @module animate
 */
/**
 
 * @class Animation
 * Класс создания анимации
 */
export default class Animation {
	/**
	 * @constructor
	 * Задает приватные свойства и методы класса
	 */
    constructor() {		
    	/**
    	 * @private variables and methods
    	 */
        this.tl1 = new TimelineMax();
        this.tl2 = new TimelineMax();
        this.elem = $('.heading--about');
        this.elem2 = $('.heading--contacts');        
        /**
         * В начальном состоянии анимация элементов не применяется.
         * Используется метод pause библиотеки TimelineMax
         */
        this.tl1.pause();
        this.tl2.pause();
    }
    /**
     * @public метод description.
     * Создает перемещение и изменение прозрачности элементов 
     * через методы TimelineMax
     */
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

	/**
	 * @public метод activeSection.
	 * Определяет, находится ли элемент внутри секции 
	 * @param  {Element} section    [ограничивающая секция]
	 * @param  {Number} startTop    [верхняя координата внутри секции]
	 * @param  {Number} startBotton [нижняя координата внутри секции]
	 * @return {Boolean}             
	 */
	activeSection(section, startTop = 0, startBotton = 0) {
		if ($(section).offset() !== undefined) {
			var topPosition = $(section).offset().top - startTop,
				bottomPosition = $(section).offset().top + $(section).height() - startBotton;
			if (($(window).scrollTop() >= topPosition) && ($(window).scrollTop() <= bottomPosition)) {
				return true;
			}
		}
	}
	/**
	 * @public метод play.
	 * Если элемент внутри секции - запускает его анимацию,
	 * используя метод resume библиотеки TimelineMax.
	 */
	play() {
		if (this.activeSection('#about', 500, 800)) {
			this.tl1.resume();
		} else if (this.activeSection('#contacts', 500, 800)) {	
			this.tl2.resume();
		}
	}
}
