import * as L from 'leaflet';
import {
    ApplicationRef,
    Component,
    ComponentFactoryResolver,
    Injectable,
    InjectionToken,
    Injector
} from '@angular/core';
import { LeafletMouseEvent } from 'leaflet';
import { ComponentPortal, PortalHost, DomPortalHost, PortalInjector } from '@angular/cdk/portal';
import { CONTAINER_DATA, PopupComponent } from 'app/main/tracking/live/popup/popup.component';



@Injectable()
export class PopupService {
    private portalHolder: ComponentPortal<PopupComponent>;
    private bodyPortal: PortalHost;

    constructor(private cfr: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef) {
    }


    register(marker: L.Marker, data: any, fn?: Function): void  {
        marker.on('click', ($event: L.LeafletMouseEvent)  => {
            if (fn) {
                fn(marker);
            }
            this.popup($event, data);
        } );
    }

    popup(event: L.LeafletMouseEvent, data: any) {
        //console.log('Event: ', event);
        let marker: L.Marker = <L.Marker>event.target;
        marker.togglePopup();
        const elMarker = <HTMLElement> marker.getPopup().getContent();
        this.portalHolder = new ComponentPortal<PopupComponent>(PopupComponent, null, this.createInjector(marker, data));

        if (this.bodyPortal && this.bodyPortal.hasAttached()) {
            this.bodyPortal.detach();
        }
        this.bodyPortal = new DomPortalHost(
            elMarker,
            this.cfr,
            this.appRef,
            this.injector
        );

        this.bodyPortal.attach(this.portalHolder);
        //marker.togglePopup();
    }

    createInjector(marker: L.Marker, data: any): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(CONTAINER_DATA, {event: data, marker: marker});
        return new PortalInjector(this.injector, injectorTokens);
    }
}
