import { Injectable, Directive, HostListener, ElementRef, Input, NgModule } from '@angular/core';
import hopscotch from 'hopscotch';
import { CommonModule } from '@angular/common';

var HopscotchStep = /** @class */ (function () {
    function HopscotchStep() {
        this.placement = "bottom";
    }
    HopscotchStep.prototype.setTitle = function (title) {
        this.title = title;
        return this;
    };
    HopscotchStep.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };
    HopscotchStep.prototype.setTarget = function (target) {
        this.target = target;
        return this;
    };
    HopscotchStep.prototype.setPlacement = function (targetplacement) {
        this.placement = targetplacement;
        return this;
    };
    return HopscotchStep;
}());
var HopscotchTour = /** @class */ (function () {
    function HopscotchTour(id) {
        this.id = HopscotchTour.DEFAULT_ID;
        this.steps = new Array();
        if (id) {
            this.id = id;
        }
    }
    HopscotchTour.prototype.setId = function (id) {
        this.id = id;
    };
    HopscotchTour.prototype.addStep = function (step) {
        if (!step) {
            return;
        }
        this.steps.push(Object.assign(new HopscotchStep(), step));
    };
    HopscotchTour.prototype.getSteps = function () {
        return this.steps.map(function (e) { return Object.assign(new HopscotchStep(), e); });
    };
    return HopscotchTour;
}());
HopscotchTour.DEFAULT_ID = "ngx-sam-hopscotch-tour-id";
var SamHopsctochConfigsService = /** @class */ (function () {
    function SamHopsctochConfigsService() {
        this.tour = new HopscotchTour();
    }
    SamHopsctochConfigsService.prototype.addStep = function (step) {
        this.tour.addStep(step);
        console.log("all steps: ", this.tour);
        return this;
    };
    SamHopsctochConfigsService.prototype.getTour = function () {
        return this.tour;
    };
    SamHopsctochConfigsService.prototype.startTour = function () {
        var _this = this;
        setTimeout(function () {
            hopscotch.startTour(_this.tour);
        });
    };
    return SamHopsctochConfigsService;
}());
SamHopsctochConfigsService.decorators = [
    { type: Injectable },
];
SamHopsctochConfigsService.ctorParameters = function () { return []; };
var SamHopscotchStepDirective = /** @class */ (function () {
    function SamHopscotchStepDirective(el, hopsctochConfigs) {
        this.el = el;
        this.hopsctochConfigs = hopsctochConfigs;
    }
    SamHopscotchStepDirective.prototype.ngOnInit = function () { };
    SamHopscotchStepDirective.prototype.ngOnChanges = function () {
        if (!this.step) {
            return;
        }
        if (!this.step.target) {
            this.step.target = this.el.nativeElement;
        }
        console.log(this.step);
        var a = this.hopsctochConfigs.addStep(this.step);
    };
    SamHopscotchStepDirective.prototype.onMouseEnter = function () {
        this.highlight("red");
    };
    SamHopscotchStepDirective.prototype.onMouseLeave = function () {
        this.highlight(null);
    };
    SamHopscotchStepDirective.prototype.highlight = function (color) {
        this.el.nativeElement.style.backgroundColor = color;
    };
    return SamHopscotchStepDirective;
}());
SamHopscotchStepDirective.decorators = [
    { type: Directive, args: [{
                selector: "[samHopscotchStep]"
            },] },
];
SamHopscotchStepDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: SamHopsctochConfigsService, },
]; };
SamHopscotchStepDirective.propDecorators = {
    "step": [{ type: Input, args: ['samHopscotchStep',] },],
    "onMouseEnter": [{ type: HostListener, args: ["mouseenter",] },],
    "onMouseLeave": [{ type: HostListener, args: ["mouseleave",] },],
};
var NgxSamHopscotchModule = /** @class */ (function () {
    function NgxSamHopscotchModule() {
    }
    return NgxSamHopscotchModule;
}());
NgxSamHopscotchModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [SamHopsctochConfigsService],
                declarations: [SamHopscotchStepDirective],
                exports: [SamHopscotchStepDirective]
            },] },
];
NgxSamHopscotchModule.ctorParameters = function () { return []; };

export { NgxSamHopscotchModule, HopscotchStep, HopscotchTour, SamHopsctochConfigsService, SamHopscotchStepDirective as ɵa };
//# sourceMappingURL=ngx-sam-hopscotch.js.map
