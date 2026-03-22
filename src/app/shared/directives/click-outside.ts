import { Directive, ElementRef, Output, EventEmitter, HostListener, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnDestroy {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, target: EventTarget | null): void {
    // 1. Проверяем, что target существует
    if (!target) {
      return;
    }

    // 2. Проверяем, что target — элемент DOM (а не текст/комментарий и т. д.)
    if (!(target instanceof Node)) {
      return;
    }

    // 3. Проверяем, был ли клик внутри нашего элемента
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }

  ngOnDestroy(): void {
    this.clickOutside.complete();
  }
}
