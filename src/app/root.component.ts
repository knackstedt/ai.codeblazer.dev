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

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RootComponent {
    environment = environment;

    readonly carouselImageGroups = Images

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
        group.activeSlide = swiper.activeIndex;
    }

    showInfoDialog() {
        this.dialog.open(InfoDialogComponent);
    }

    spaceBetween = -300;
    @HostListener("window:resize", ["$event"])
    onResize() {
        this.spaceBetween = 568 - (window.innerWidth - 100);
    }
}
