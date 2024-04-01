const String = require('../StringMath');

describe('String.prototype.divide', () => {
    it('should divide two positive numbers correctly', () => {
        expect('10'.divide('2')).toBe('5');
        expect('100'.divide('10')).toBe('10');
        expect('123456789'.divide('123')).toBe('1003713');
    });

    it('should handle division by zero', () => {
        expect(() => '10'.divide('0')).toThrowError('Unable to divide by 0');
    });

    it('should handle zero division', () => {
        expect('0'.divide('10')).toBe('0');
    });

    it('should handle dividend smaller than divisor', () => {
        expect('5'.divide('10')).toBe('0');
        expect('999'.divide('1000')).toBe('0');
    });

    it('should handle leading zeros in dividend and divisor', () => {
        expect('00100'.divide('010')).toBe('10');
        expect('0000123'.divide('0001')).toBe('123');
    });
    it('should handle large numbers', () => {
        const dividend = '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
        const divisor = '123456789';
        expect(dividend.divide(divisor)).toBe('8100000073710000670761006103925155545718915466042130740983389742948846660834504613593991983705327051718476170638133152807011690543806383948638093932606654786720558559157082888329454283798033982562109241315194095968266273311223087132130092902383845411692993246406238542296770734900613687595584');
    });
    it('should handle large numbers', ()=>{
        const dividend = '9890890974897812587891275891274897128946891241281892738912748912895127371289781237189284';
        const divisor = '7897812717284789127891729847128937981273891278941288123789127389';
        expect(dividend.divide(divisor)).toBe('1252358257780798497484791');
    })
});