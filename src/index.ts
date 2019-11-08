import {Firestore} from '@google-cloud/firestore';
import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;

export interface IDocumentKey {
    collection: string;
    token: string;
}

export class FirestoreClient {

    private internalClient: Firestore;

    constructor(internalClient: Firestore) {
        this.internalClient = internalClient;
    }

    public async create(key: IDocumentKey, data: {}) {
        await this.getDocument(key).set(data);
    }

    public async find(key: IDocumentKey): Promise<{}> {
        const document: DocumentSnapshot = await this.getDocument(key).get();

        return Object.assign({}, document.data());
    }

    public async update(key: IDocumentKey, data: {}) {
        await this.getDocument(key).update(data);
    }

    private getDocument(key: IDocumentKey): DocumentReference {
        return this.internalClient.doc(key.collection + '/' + key.token);
    }
}

export default (): FirestoreClient => {
    return new FirestoreClient(
        new Firestore()
    );
};
