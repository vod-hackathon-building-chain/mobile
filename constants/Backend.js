export let BACKEND = {
    REGISTER: "http://192.168.48.43:3000/api/register",
    LOGIN: "http://192.168.48.43:3000/api/login",
    BUILDING: "http://192.168.48.43:3000/api/building",
    CONTRACT: "http://192.168.48.43:3000/api/contract",
    A_CONTRACT: "http://192.168.48.43:3000/api/contract?approvedByGovernment=1",
    B_ID: "http://192.168.48.43:3000/api/building/buildingId/",
    BUILDINGS: [],
    CONTRACTS: [],
    OWNER: {},
    updateContract: (contract) => {
        for (i = 0; i< BACKEND.CONTRACT.length; i++){
            if (BACKEND.CONTRACT[i].id == contract.id) {
                BACKEND.CONTRACT[i] = contract;
            }
        }
    },
    UPDATE: async () => {

        let getContract = async() => {
            let res = await fetch(`${BACKEND.CONTRACT}`);
            res = await res.json();
            BACKEND.CONTRACTS = res;
        }

        let getBuilding = async () => {
            let res = await fetch(`${BACKEND.BUILDING}/${BACKEND.OWNER.id}`);
            res = await res.json();
            BACKEND.BUILDINGS = res;
        }

        await getContract();
        await getBuilding();
        
        return "hello";
    }
} 