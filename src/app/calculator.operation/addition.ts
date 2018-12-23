import { Operation } from './operation';

export class Addition implements Operation {
    runOperation(input:number, input2:number):number {
        return +input + +input2;
    }
}
