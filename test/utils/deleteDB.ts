import { db } from '../../src';

export async function deleteDocsCollection(nameCollection: string) {
  const collectionRef = db.collection(nameCollection);
  const listDocs = await collectionRef.get();
  listDocs.forEach(doc => {
    collectionRef.doc(doc.id).delete();
  });
}
