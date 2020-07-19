import {expectType, expectError} from 'tsd';

import * as fl from '../../index.js';

const mx = fl.resolve (42);
const mf = fl.resolve ((x: number) => x + 1);

const msx: fl.Uncertain<string, number> = fl.resolve (42);
const mnx: fl.Uncertain<number, number> = fl.resolve (42);
const msf: fl.Uncertain<string, (x: number) => number> = fl.resolve ((x: number) => x + 1);

expectType<fl.Resolved<number>> (fl.ap (mx) (mf));
expectType<fl.Uncertain<string, number>> (fl.ap (msx) (msf));

expectType<fl.Resolved<never>> (fl.ap (fl.never) (fl.never));
expectType<fl.Resolved<never>> (fl.ap (mx) (fl.never));
expectType<fl.Resolved<never>> (fl.ap (fl.never) (mf));

expectType<fl.Resolved<never>> (fl.ap (fl.reject ('a')) (fl.never));
expectType<fl.Rejected<string>> (fl.ap (fl.never) (fl.reject ('a')));

expectType<fl.Rejected<string>> (fl.ap (fl.reject ('a')) (mf));
expectType<fl.Rejected<string>> (fl.ap (mx) (fl.reject ('a')));
expectType<fl.Rejected<number>> (fl.ap (fl.reject (42)) (fl.reject (42)));
expectType<fl.Rejected<number>> (fl.ap (fl.reject ('a')) (fl.reject (42)));

expectError (fl.ap (mnx) (msf));
expectError (fl.ap (mx) (mx));
expectError (fl.ap (mf) (mf));

const cmx = fl.Par (fl.resolve (42));
const cmf = fl.Par (fl.resolve ((x: number) => x + 1));

const cmsx: fl.ConcurrentUncertain<string, number> = fl.Par (fl.resolve (42));
const cmnx: fl.ConcurrentUncertain<number, number> = fl.Par (fl.resolve (42));
const cmsf: fl.ConcurrentUncertain<string, (x: number) => number> = fl.Par (fl.resolve ((x: number) => x + 1));

expectType<fl.ConcurrentResolved<number>> (fl.ap (cmx) (cmf));
expectType<fl.ConcurrentUncertain<string, number>> (fl.ap (cmsx) (cmsf));

expectType<fl.ConcurrentNever> (fl.ap (fl.Par (fl.never)) (fl.Par (fl.never)));
expectType<fl.ConcurrentNever> (fl.ap (cmx) (fl.Par (fl.never)));
expectType<fl.ConcurrentNever> (fl.ap (fl.Par (fl.never)) (cmf));

expectType<fl.ConcurrentRejected<string>> (fl.ap (fl.Par (fl.reject ('a'))) (fl.Par (fl.never)));
expectType<fl.ConcurrentRejected<string>> (fl.ap (fl.Par (fl.never)) (fl.Par (fl.reject ('a'))));

expectType<fl.ConcurrentRejected<string>> (fl.ap (fl.Par (fl.reject ('a'))) (cmf));
expectType<fl.ConcurrentRejected<string>> (fl.ap (cmx) (fl.Par (fl.reject ('a'))));
expectType<fl.ConcurrentRejected<number>> (fl.ap (fl.Par (fl.reject (42))) (fl.Par (fl.reject (42))));

expectError (fl.ap (cmnx) (cmsf));
expectError (fl.ap (fl.Par (fl.reject ('a'))) (fl.Par (fl.reject (42))));
expectError (fl.ap (cmx) (cmx));
expectError (fl.ap (cmf) (cmf));
