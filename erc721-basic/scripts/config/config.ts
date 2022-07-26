// 1. createMetadata.ts
const imageCid = "";

// 2. Base Uri 설정
const baseUri = "";

// 배포된 ERC721 컨트랙트 주소
const deployedAddress = "";

// 3. mintGeneral.ts
// 일반 구매자
const buyerPrivateKey = "";
const buyerAmount = 1;

// 4. mintSpecial.ts
// 5. approve.ts
// VIP는 Approver에게 Transfer 대행 권한을 준다.
const vipPrivateKey = "";
const approverPrivateKey = "";
const tokenId = 91;

// 6. transferForApproval.ts
// VIP 대신 Approver가 NFT를 전송한다.
// From 개인키 : Approver 개인키
const fromPrivateKey = "";
// To 주소
const toAddress = "";
// 전송할 NFT
const transferTokenId = 91;

const config = {
    imageCid: imageCid,
    baseUri: baseUri,
    deployedAddress: deployedAddress,
    buyerPrivateKey: buyerPrivateKey,
    buyerAmount: buyerAmount,
    vipPrivateKey: vipPrivateKey,
    approverPrivateKey: approverPrivateKey,
    approveTokenId: tokenId,
    fromPrivateKey: fromPrivateKey,
    toAddress: toAddress,
    transferTokenId: transferTokenId
}

export default config;
