/*
"newObject": {
    "packageId": "0x0000000000000000000000000000000000000002",
    "transactionModule": "coin",
    "sender": "0x9b7a3fb24a52703456a16cb0a5b3ebc481ba53a2",
    "recipient": {
        "AddressOwner": "0x9b7a3fb24a52703456a16cb0a5b3ebc481ba53a2"
    },
    "objectId": "0xa3f1a121797295c6ed5669eb2a59d7893899e671"
}
*/

import type { ObjectId, ObjectOwner, SuiAddress } from "@mysten/sui.js";

export type NewObjectEvent = {
    newObject: {
        packageId: ObjectId,
        transactionModule: string,
        sender: SuiAddress,
        recipient: ObjectOwner,
        objectId: ObjectId
    }
}

//type SuiEventType = NewObjectEvent;