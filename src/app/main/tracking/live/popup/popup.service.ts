import * as L from 'leaflet';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    Injectable,
    Injector
} from '@angular/core';
import {ComponentPortal, DomPortalOutlet, PortalInjector, PortalOutlet} from '@angular/cdk/portal';
import { CONTAINER_DATA, PopupComponent } from 'app/main/tracking/live/popup/popup.component';



@Injectable()
export class PopupService {
    private portalHolder: ComponentPortal<PopupComponent>;
    private bodyPortal: PortalOutlet;

    private sMarker: any;
    private sData: any;

    constructor(private cfr: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef) {
    }


    register(marker: L.Marker, data: any, fn?: Function): void  {
        marker.on('click', ($event: L.LeafletMouseEvent)  => {
            if (fn) {
                fn(data, marker);
            }
            this.sMarker = <L.Marker>$event.target;
            this.sData = data;
            this.popup();
        } );
    }

    setMarker(marker: any): void {
        this.sMarker = marker;
    }

    setData(data: any): void {
        this.sData = data;
    }

    popup() {
        console.log('...poping');
        if (this.sData && this.sMarker) {
            const elMarker = <HTMLElement> this.sMarker.getPopup().getContent();
            this.portalHolder = new ComponentPortal<PopupComponent>(PopupComponent, null, this.createInjector(this.sMarker, this.sData));

            if (this.bodyPortal && this.bodyPortal.hasAttached()) {
                this.bodyPortal.detach();
                this.bodyPortal.dispose();
            }
            this.bodyPortal = new DomPortalOutlet(
                elMarker,
                this.cfr,
                this.appRef,
                this.injector
            );

            this.bodyPortal.attach(this.portalHolder);

        }
        console.log('___poping');
    }

    createInjector(marker: L.Marker, data: any): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, {event: data, marker: marker});
        return new PortalInjector(this.injector, injectorTokens);
    }
}
