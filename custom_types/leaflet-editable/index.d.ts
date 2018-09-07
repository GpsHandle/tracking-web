import * as L from 'leaflet';
declare module 'leaflet' {
    interface Editable {
        anchorBackwardLineGuide(latlng: L.LatLng): void;
        anchorForwardLineGuide(latlng: L.LatLng): void;
        attachBackwardLineGuide(): void;
        attachForwardLineGuide(): void;
        blockEvents(): void;
        commitDrawing(e: any): void;
        connectCreatedToMap(layer: any): any;
        createCircle(latlng?: L.LatLng, options?: any): any;
        createEditLayer(): any;
        createFeaturesLayer(): any;
        createLayer(klass: any, latlngs: any, options: any): any;
        createLineGuide(): any;
        createMarker(latlng?: L.LatLng, options?: any): any;
        createPolygon(latlngs: any, options: any): any;
        createPolyline(latlngs: any, options: any): any;
        createRectangle(bounds: any, options: any): any;
        createVertexIcon(options: any): any;
        detachBackwardLineGuide(): void;
        detachForwardLineGuide(): void;
        drawing(): any;
        fireAndForward(type: any, e: any): void;
        initialize(map: any, options: any): void;
        moveBackwardLineGuide(latlng: L.LatLng): void;
        moveForwardLineGuide(latlng: L.LatLng): void;
        onMousedown(e: any): void;
        onMouseup(e: any): void;
        registerForDrawing(editor: any): void;
        startCircle(latlng?: L.LatLng, options?: any): any;
        startHole(editor: any, latlng?: L.LatLng): void;
        startMarker(latlng?: L.LatLng, options?: any): any;
        startPolygon(latlng?: L.LatLng, options?: any): any;
        startPolyline(latlng?: L.LatLng, options?: any): any;
        startRectangle(latlng?: L.LatLng, options?: any): any;
        stopDrawing(): void;
        unblockEvents(): void;
        unregisterForDrawing(editor: any): void;
    }

    interface EditOptions {
        zIndex: number,
        polygonClass: L.Polygon;
        polylineClass: L.Polyline;
        markerClass: L.Marker;
        rectangleClass: L.Rectangle;
        circleClass: L.Circle;
        drawingCSSClass: 'leaflet-editable-drawing';
        drawingCursor: 'crosshair';
        editLayer?: any;
        featuresLayer?: any;
        polylineEditorClass?: any
        polygonEditorClass?: any;
        markerEditorClass?: any;
        rectangleEditorClass: any;
        circleEditorClass?: any;
        lineGuideOptions: any;
        skipMiddleMarkers: boolean | false;
    }

    interface Map {
        /**
         * Whether to create a L.Editable instance at map init or not.
         */
        editable: boolean;

        /**
         * Options to pass to L.Editable when instanciating.
         */
        editOptions: EditOptions;

        /**
         * L.Editable plugin instance.
         */
        editTools: Editable;
    }


    interface MapOptions {
        /**
         * Whether to create a L.Editable instance at map init or not.
         */
        editable?: boolean;

        /**
         * Options to pass to L.Editable when instanciating.
         */
        editOptions?: EditOptions;
    }

}
