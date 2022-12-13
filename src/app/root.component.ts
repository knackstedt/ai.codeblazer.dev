import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Fetch } from 'src/app/services/fetch.service';
import { environment } from 'src/environment';
import { KeyboardService } from './services/keyboard.service';
import Images from "./ai-images.json";

// import Swiper core and required modules
import SwiperCore, { Lazy, Pagination, Navigation, Virtual, Keyboard,  } from "swiper";
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

// install Swiper modules
SwiperCore.use([Lazy, Pagination, Navigation, Virtual, Keyboard]);

const cardWidth = 600;

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RootComponent {
    environment = environment;

    carouselImageGroups = Images

    constructor(
        private fetch: Fetch,
        private keyboard: KeyboardService,
        private dialog: MatDialog
    ) {
        this.onResize();
        this.carouselImageGroups.forEach(g => g['activeSlide'] = 0);
    }

    onButtonClick(link) {
        window.location.href = link.url;
    }

    activeSlide = 0;
    onSlideChanged([swiper], group) {
        document.querySelector("swiper").querySelectorAll(".fullscreen")
            .forEach(e => e.classList.remove('fullscreen'));
    }

    showInfoDialog() {
        this.dialog.open(InfoDialogComponent);
    }

    toggleFullscreen([swiper, evt]) {
        console.log(evt);
        const img = (evt.target as HTMLImageElement);

        if (img.nodeName == "IMG")
            img.parentElement.parentElement.classList.toggle("fullscreen");
        else if (img.classList.contains("cover"))
            img.parentElement.classList.toggle("fullscreen");
    }

    spaceBetween = cardWidth - (window.innerWidth - 100);
    @HostListener("window:resize", ["$event"])
    onResize() {
        this.spaceBetween = cardWidth - (window.innerWidth - 100);
    }
}
