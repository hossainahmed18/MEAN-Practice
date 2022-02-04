import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() id!: string;
	private element: any;

	constructor(private modalService: ModalService, private elementRef: ElementRef) {
		this.element = elementRef.nativeElement;
	}

  ngOnInit(): void {
		if (!this.id) {
			return;
		}

		document.body.appendChild(this.element);

		this.element.addEventListener('click', (elementRef: any) => {
			if (elementRef.target.classList.contains('modal')) {
				this.close();
			}
		});

		this.modalService.add(this);
	}

	ngOnDestroy(): void {
		this.modalService.remove(this.id);
		this.element.remove();
	}

	open(): void {
		this.modalService.hideOverflowOnBody();

		if (!this.element.classList.contains('d-none')) {
			this.element.classList.add('d-block');
		} else {
			this.element.classList.replace('d-none', 'd-block');
		}
	}

	close(): void {
		this.modalService.showOverflowOnBody();
		this.element.classList.replace('d-block', 'd-none');
	}

}
