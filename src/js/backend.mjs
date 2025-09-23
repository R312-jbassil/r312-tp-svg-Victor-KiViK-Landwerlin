import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getSvg() {
    try {
        const records = await pb.collection('save').getFullList();
        return records;
    } catch (error) {
        console.error('Erreur lors de la récupération des enregistrements:', error);
        throw error;
    }
}

export async function oneSvg(id) {
    try {
        const record = await pb.collection('save').getOne(id);
        return record;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'enregistrement:', error);
        throw error;
    }
}
