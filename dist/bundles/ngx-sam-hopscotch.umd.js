(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('hopscotch'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'hopscotch', '@angular/common'], factory) :
	(factory((global['ngx-sam-hopscotch'] = {}),global.ng.core,global.hopscotch,global.ng.common));
}(this, (function (exports,core,hopscotch,common) { 'use strict';

hopscotch = hopscotch && hopscotch.hasOwnProperty('default') ? hopscotch['default'] : hopscotch;

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
    { type: core.Injectable },
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
    { type: core.Directive, args: [{
                selector: "[samHopscotchStep]"
            },] },
];
SamHopscotchStepDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: SamHopsctochConfigsService, },
]; };
SamHopscotchStepDirective.propDecorators = {
    "step": [{ type: core.Input, args: ['samHopscotchStep',] },],
    "onMouseEnter": [{ type: core.HostListener, args: ["mouseenter",] },],
    "onMouseLeave": [{ type: core.HostListener, args: ["mouseleave",] },],
};
var NgxSamHopscotchModule = /** @class */ (function () {
    function NgxSamHopscotchModule() {
    }
    return NgxSamHopscotchModule;
}());
NgxSamHopscotchModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                providers: [SamHopsctochConfigsService],
                declarations: [SamHopscotchStepDirective],
                exports: [SamHopscotchStepDirective]
            },] },
];
NgxSamHopscotchModule.ctorParameters = function () { return []; };

exports.NgxSamHopscotchModule = NgxSamHopscotchModule;
exports.HopscotchStep = HopscotchStep;
exports.HopscotchTour = HopscotchTour;
exports.SamHopsctochConfigsService = SamHopsctochConfigsService;
exports.ɵa = SamHopscotchStepDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-sam-hopscotch.umd.js.map
