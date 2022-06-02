const taxRateList = [
    { bottom: 0, top: 18200, base: 0, threshold: 0, rate: 0 },
    { bottom: 18201, top: 37000, base: 0, threshold: 18200, rate: 0.19 },
    { bottom: 37001, top: 87000, base: 3572, threshold: 37000, rate: 0.325 },
    { bottom: 87001, top: 180000, base: 19822, threshold: 87000, rate: 0.37 },
    { bottom: 180001, top: Infinity, base: 54232, threshold: 180000, rate: 0.45 },
];
const validatePayload = (payload) => {
    let { startDate, annualSalary, firstName, lastName, superRate } = payload,
        result = {
            isError: false,
            data: null,
            message: null,
        };
        //validation for First name
    if (!firstName) {
        result['isError'] = true;
        result['message'] = 'First name is required.';
        return result;
    }
    //validation for Last name
    if (!lastName) {
        result['isError'] = true;
        result['message'] = 'Last name is required.';
        return result;
    }
        //validation for  Annual Sallery
    if (!annualSalary || isNaN(annualSalary)) {
        result['isError'] = true;
        result['message'] = 'Annual Salary must be a natural number.';
        return result;
    }
    if (annualSalary < 0) {
        result['isError'] = true;
        result['message'] = 'Annual Salary must be a natural number.';
        return result;
    }
    //validation for Super rate
    if (!superRate || isNaN(superRate)) {
        result['isError'] = true;
        result['message'] = 'Super Rate is required.';
        return result;
    }
    if (superRate < 0 || superRate > 12) {
        result['isError'] = true;
        result['message'] = 'Super Rate must be between 0-12.';
        return result;
    }
    //validation for date
    if (!startDate) {
        result['isError'] = true;
        result['message'] = 'Start date is required.';
        return result;
    }
    return result;

}
const calculatePayslip = (payload) => {
    const { startDate, annualSalary, firstName, lastName, superRate } = payload;
    const bracket = taxRateList.find((b) => annualSalary >= b.bottom && annualSalary <= b.top);
    const gross = Math.round(annualSalary / 12);
    const tax = Math.round((bracket.base + (annualSalary - bracket.threshold) * bracket.rate) / 12);
    let calculatedPayslip = {
        'name': `${firstName} ${lastName}`,
        'pay-period': startDate,
        'gross-income': gross,
        'income-tax': tax,
        'net-income': gross - tax,
        'super-amount': Math.round(gross * superRate / 100),
    };
    return calculatedPayslip;
}
const errorCodes = {
    badRequest: 400,
    internalServerError: 500,
    notFound: 404,
    ok: 200
};

module.exports = {
    validatePayload,
    calculatePayslip,
    errorCodes
}