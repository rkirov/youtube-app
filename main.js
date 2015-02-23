import {bootstrap} from 'angular2/angular2';
import {ShadowDomStrategy, NativeShadowDomStrategy, EmulatedShadowDomStrategy} from 'angular2/src/core/compiler/shadow_dom_strategy';
import {bind} from 'angular2/di';
import {YoutubeApp} from 'components/app';

export function main() {
  bootstrap(YoutubeApp, [bind(ShadowDomStrategy).toClass(EmulatedShadowDomStrategy)]);
}
