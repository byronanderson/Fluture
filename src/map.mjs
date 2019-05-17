import {application1, application, func, functor} from './internal/check';
import {FL} from './internal/const';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {isFuture} from './future';
import {Resolve} from './resolve';

export var MapTransformation = createTransformation(1, 'map', {
  resolved: function MapTransformation$resolved(x){
    return new Resolve(this.context, call(this.$1, x));
  }
});

export function map(f){
  var context1 = application1(map, func, arguments);
  return function map(m){
    var context2 = application(2, map, functor, arguments, context1);
    return isFuture(m) ?
           m._transform(new MapTransformation(context2, f)) :
           m[FL.map](f);
  };
}
