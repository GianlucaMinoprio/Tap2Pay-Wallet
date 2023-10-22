"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EthSafeTransaction {
    constructor(data) {
        this.signatures = new Map();
        this.data = data;
    }
    addSignature(signature) {
        this.signatures.set(signature.signer.toLowerCase(), signature);
    }
    encodedSignatures() {
        const signers = Array.from(this.signatures.keys()).sort();
        const baseOffset = signers.length * 65;
        let staticParts = '';
        let dynamicParts = '';
        signers.forEach((signerAddress) => {
            const signature = this.signatures.get(signerAddress);
            staticParts += signature?.staticPart( /*baseOffset + dynamicParts.length / 2*/).slice(2);
            dynamicParts += signature?.dynamicPart();
        });
        return '0x' + staticParts + dynamicParts;
    }
}
exports.default = EthSafeTransaction;
//# sourceMappingURL=SafeTransaction.js.map