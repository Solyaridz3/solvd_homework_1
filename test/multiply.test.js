const String = require('../StringMath');


describe('String.prototype.multiply', () => {
    it('should multiply two positive numbers correctly', () => {
        expect('10'.multiply('2')).toBe('20');
        expect('123'.multiply('456')).toBe('56088');
        expect('999'.multiply('999')).toBe('998001');
    });

    it('should handle multiplication by zero', () => {
        expect('10'.multiply('0')).toBe('0');
        expect('0'.multiply('10')).toBe('0');
        expect('0'.multiply('0')).toBe('0');
    });

    it('should handle multiplication by one', () => {
        expect('10'.multiply('1')).toBe('10');
        expect('123456789'.multiply('1')).toBe('123456789');
    });

    it('should handle leading zeros in both operands', () => {
        expect('0010'.multiply('0002')).toBe('20');
        expect('000123'.multiply('00456')).toBe('56088');
    });
    it('should handle large numbers', () => {
        const num1 = '9890890974897812587891275891274897128946891241281892738912748912895127371289781237189284';
        const num2 = '7897812717284789127891729847128937981273891278941288123789127389';
        expect(num1.multiply(num2)).toBe('78116404526825290246943728605596177894794307251923684271321601037695311666232435341590920048039698192653497320735376272802600685827809562158301381699476');
    });
});