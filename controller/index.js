
const firebaseHelper = require('../firebase/index')

class Controller {

    isLogged(req, res, next) {
        if(req.session.user) next()
        else res.json(false)
    }

    async login(req, res) {
        const user = await firebaseHelper.getUser(req.body.username, req.body.password)
        if(user) {
            req.session.user = user.username
            req.session.save()
            res.json(user.realname)
        } else res.json(false)
    }

    async signIn(req, res) {
        const ret = await firebaseHelper.getUser(req.body.username)
        if(ret === null) {
            await firebaseHelper.addUser(req.body.username, req.body.password, req.body.realname)
            req.session.user = req.body.username
            req.session.save()
            res.json(req.body.realname)
        } else res.json(false)
    }

    async logout(req, res) {
        req.session.user = null
        req.session.save()
        res.json(true)
    }

    async getNote(req, res) {
        const ret = await firebaseHelper.getNote(req.session.user)
        res.json(ret)
    }

    async addNote(req, res) {
        const ret =  await firebaseHelper.addNote(req.session.user, req.body.title, req.body.content)
        res.json(ret)
    }

    async editNote(req, res) {
        const ret = await firebaseHelper.editNote(req.body.id, req.body.title, req.body.content)
        res.json(ret)
    }

    async deleteNote(req, res) {
        const ret = await firebaseHelper.deleteNote(req.query.id)
        res.json(ret)
    }

}

module.exports = new Controller()
