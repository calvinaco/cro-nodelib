import 'mocha';
import { expect } from 'chai';

import { KeyPair } from '../key_pair';
import { transfer } from './transfer';
import { Mainnet, Devnet } from '../network';

describe('transfer', () => {
    it('should throw TypeError when neither KeyPair and PublicKey is provided', () => {
        const network = Mainnet;

        expect(() =>
            transfer({
                network,
            }),
        ).to.throw(
            'Expected property `publicKey` to be of type `Buffer` but received type `undefined`',
        );
    });

    it('should throw Error when KeyPair has no public key', () => {
        const keyPair = new KeyPair();
        const network = Mainnet;

        expect(() =>
            transfer({
                keyPair,
                network,
            }),
        ).to.throw('Missing public key in KeyPair');
    });

    it('should return Transfer address from Public Key', () => {
        const publicKey = Buffer.from(
            '041ff5820f619d51663efbb233eb03bd5d434f63c352a5633717d8b570daa43c190bddc906ed9b8601c10c2b58e347f6e1cc4035b391b98be1d9afa9c5ead9423b',
            'hex',
        );
        const network = Devnet({ chainId: 'AB' });

        expect(
            transfer({
                publicKey,
                network,
            }),
        ).to.eq(
            'dcro1e9fkynhzh70ve3gsuk6uy3yrye34spsphpztpm5ua4g5turtkmsswm9ly4',
        );
    });

    it('should return Transfer address from Public Key in KeyPair', () => {
        const keyPair = KeyPair.fromPublicKey(
            Buffer.from(
                '041ff5820f619d51663efbb233eb03bd5d434f63c352a5633717d8b570daa43c190bddc906ed9b8601c10c2b58e347f6e1cc4035b391b98be1d9afa9c5ead9423b',
                'hex',
            ),
        );
        const network = Devnet({ chainId: 'AB' });

        expect(
            transfer({
                keyPair,
                network,
            }),
        ).to.eq(
            'dcro1e9fkynhzh70ve3gsuk6uy3yrye34spsphpztpm5ua4g5turtkmsswm9ly4',
        );
    });

    it('should return Transfer address based on network', () => {
        const publicKey = Buffer.from(
            '043f1d17afa4b881bfdbcee2d82c0f278f09b433b0ddb14ca93fb7cb8d1e16b4b74d9f83587966a9c20243b75b828535b180557302bfd68a0cb37c3fd906b456e8',
            'hex',
        );
        const network = Mainnet;

        expect(
            transfer({
                publicKey,
                network,
            }),
        ).to.eq(
            'cro1csnjml9attwczsjwjvm6nxh0pw9flgdllvct9dzlw6vkau4epfjqtf4z4m',
        );
    });
});
