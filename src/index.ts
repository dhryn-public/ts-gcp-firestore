import {DocumentReference, DocumentSnapshot, Firestore} from '@google-cloud/firestore';

export interface IDocumentKey {
    collection: string;
    token: string;
}

let internalClient: Firestore;

export class FirestoreClient {

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
        return internalClient.doc(key.collection + '/' + key.token);
    }
}

export default (): FirestoreClient => {
    internalClient = new Firestore();

    return new FirestoreClient();
};
