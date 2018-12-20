import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ApplicationContext } from 'app/application-context';

@Directive({
    selector: '[showIfDemo]'
})
export class ShowIfDemoDirective implements OnInit {
    private hasView = false;
    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private applicationContext: ApplicationContext) { }

    ngOnInit(): void {
        if (this.applicationContext.isDemo()) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
