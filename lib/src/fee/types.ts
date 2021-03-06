import ow from 'ow';
import BigNumber from 'bignumber.js';

export enum FeeAlgorithm {
    LinearFee = 'LinearFee',
}

export type FeeConfig =
    | LinearFeeConfig
    | {
          algorithm: FeeAlgorithm;
      };
export type LinearFeeConfig = {
    algorithm: FeeAlgorithm.LinearFee;
    constant: BigNumber;
    coefficient: BigNumber;
};

export const owFeeAlgorithm = ow.string.validate((value: string) => ({
    validator: Object.keys(FeeAlgorithm).includes(value),
    message: `Unsupported fee algorithm: ${value}`,
}));

const owLinearFeeMilli = ow.object.validate((value: object) => ({
    validator: BigNumber.isBigNumber(value) && value.isGreaterThanOrEqualTo(0),
    message: 'Expected value to be greater than or equal to 0',
}));
const owLinearFeeConfig = ow.object.exactShape({
    algorithm: owFeeAlgorithm,
    constant: owLinearFeeMilli,
    coefficient: owLinearFeeMilli,
});

export const owFeeConfig = ow.any(owLinearFeeConfig);
export const owOptionalFeeConfig = ow.optional.any(owLinearFeeConfig);
