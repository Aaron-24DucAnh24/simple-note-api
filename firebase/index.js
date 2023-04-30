const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./config.json')
const app = initializeApp({credential: cert(serviceAccount)})
const db  = getFirestore(app)

const userRef = db.collection('user-info')
const noteRef = db.collection('note')

class FirebaseHelper {

    async getUser(username, password) {
        try {
            var message 

            if(password) message = await userRef.where('username', '==', username).where('password', '==', password).get()
            else message= await userRef.where('username', '==', username).get()
            
            var ret = null
            message.forEach(doc => ret = doc.data())
            return ret

        } catch (error) { return false }

    }

    async addUser(username, password, realname) {
        try {
            await userRef.doc(username).set({
                'username': username,
                'password': password,
                'realname': realname
            })
            return true

        } catch (error) { return false}

    }

    async getNote(username) {
        try {
            var message = await noteRef.where('owner',"==", username).orderBy("time", "asc").get()
            var ret = []
            var data
            message.forEach(function(doc) {
                data =  doc.data()
                data.id = doc.id
                ret.push(data)
            })
            return ret

        } catch (error) {
            console.log(error)
            return false 
        }

    }

    async addNote(owner, title, content) {
        try {
            const ret = await noteRef.add({
                'owner': owner,
                'title': title,
                'content': content,
                'time': FieldValue.serverTimestamp(),
            })
            return ret.id

        } catch (error) {return false }
    }

    async editNote(id, title, content) {
        try {
            await noteRef.doc(id).update({
                'title': title,
                'content': content
            })
            return true

        } catch (error) {return false}
    }

    async deleteNote(id) {
        try {
            await noteRef.doc(id).delete()
            return true
        } catch (error) { return false }
    }

}

module.exports = new FirebaseHelper()
