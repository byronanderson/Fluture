import {expectType, expectError} from 'tsd';

import * as fl from '../../index.js';

const fsn: fl.Uncertain<string, number> = fl.resolve (42);
const fns: fl.Uncertain<number, string> = fl.resolve ('a');

expectType<fl.Never> (fl.and (fl.never) (fl.never));
expectType<fl.Never> (fl.and (fl.never) (fl.resolve ('a')));
expectType<fl.Never> (fl.and (fl.reject ('a')) (fl.never));
expectType<fl.Never> (fl.and (fl.resolve ('a')) (fl.never));
expectType<fl.Rejected<string>> (fl.and (fl.reject ('a')) (fl.resolve (42)));
expectType<fl.Resolved<number>> (fl.and (fl.resolve (42)) (fl.resolve (42)));
expectType<fl.Rejected<number>> (fl.and (fl.reject (42)) (fl.reject (42)));
expectType<fl.Uncertain<string, number>> (fl.and (fsn) (fsn));
expectType<fl.Rejected<string>> (fl.and (fl.never) (fl.reject ('a')));
expectType<fl.Rejected<string>> (fl.and (fl.resolve (42)) (fl.reject ('a')));
expectType<fl.Rejected<number>> (fl.and (fl.reject ('a')) (fl.reject (42)));

expectError (fl.and (fsn) (fns));
