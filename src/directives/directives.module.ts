import { NgModule } from '@angular/core';
import { ScrollHiddenDirective } from './scroll-hidden/scroll-hidden';
import { LimitInputDirective } from './inputlimit/inputlimit';
import { DecimallimitDirective } from './decimallimit/decimallimit';
import { SwipeRightBackDirective } from './swipe-right-back/swipe-right-back';
import { SwipeChangetabsDirective } from './swipe-changetabs/swipe-changetabs';
@NgModule({
	declarations: [ScrollHiddenDirective,
        LimitInputDirective,
    DecimallimitDirective,
    SwipeRightBackDirective,
    SwipeChangetabsDirective],
	imports: [],
	exports: [ScrollHiddenDirective,
        LimitInputDirective,
    DecimallimitDirective,
    SwipeRightBackDirective,
    SwipeChangetabsDirective]
})
export class DirectivesModule {}
