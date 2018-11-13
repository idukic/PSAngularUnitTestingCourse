import { StrengthPipe } from './strength.pipe';

describe('StrenghtPipe', () => {

    it('should display "weak" if the strenght is 5', () => {
        const pipe = new StrengthPipe();
        expect(pipe.transform(5)).toEqual('5 (weak)');
    });

    it('should display "strong" if the string is 10', () => {
        const pipe = new StrengthPipe();
        expect(pipe.transform(10)).toBe('10 (strong)');
    });

});
