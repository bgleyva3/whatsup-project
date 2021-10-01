const {conversations, users, participants, messages} = require("../models")


class ConversationsService{
    static async getAll(){
        try{
            let results = await conversations.findAll()
            return results
        }catch(err){
            throw err
        }
    }

    static async getById(id){
        try{
            let result = await conversations.findByPk(id)
            if(result)
                return result
            return {}
        }catch(err){
            throw err
        }
    }

    static async create(newConversation){
        try{
            let result = await conversations.create(newConversation)
            return result
        }catch(err){
            throw err
        }
    }

    static async update(updatedConversation, id){
        try{
            let result = await conversations.update(updatedConversation, {where: {id}})
            if(result[0] === 1)
                return `Se actualizó la conversación con el id ${id} de la base de datos`
            return `No existe la conversación con el id ${id} en la base de datos`
        }catch(err){
            throw err
        }
    }

    static async delete(id){
        try{
            let result = await conversations.destroy({where: {id}})
            if(result === 1)
                return `Se eliminó la conversación con el id ${id} de la base de datos`
            return `No existe una conversación con id ${id} en la base de datos`
        }catch(err){
            throw err
        }
    }


    static async joinUsers(id){
        try{
            let result = await conversations.findOne({
                where: {id},
                include: [
                    {
                        model: users,
                        as: "created_by_user"
                    }
                ]
            })
            return result
        }catch(err){
            throw err
        }
    }

    static async joinParticipants(id){
        try{
            let result = await conversations.findOne({
                where: {id},
                include: [
                    {
                        model: participants,
                        as: "participants",
                        include: [
                            {
                                model: users,
                                as: "user"
                            }
                        ]
                    }
                ]
            })
            return result
        }catch(err){

        }
    }

    static async joinMessages(id){
        try{
            let result = await conversations.findOne({
                where: {id},
                include: [
                    {
                        model: messages,
                        as: "messages"
                    }
                ]
            })
            return result
        }catch(err){

        }
    }
}

module.exports = ConversationsService