import { env } from '*/config/environtment'
const SibApiV3Sdk = require('sib-api-v3-sdk')

const client = SibApiV3Sdk.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = env.API_KEY
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
const sender = {
    email: 'dangkha.sell@gmail.com',
    name: 'Dang Kha'
}

const sendEmailVerify = async (email, subject, htmlContent) => {
    const receiver = [{ email: email }]
    try {
        apiInstance.sendTransacEmail({
            sender,
            name: subject,
            to: receiver,
            subject: subject,
            type: 'classic',
            htmlContent: htmlContent
        })
            .then((data) => console.log(data))
            .catch(err => console.error(err))
    } catch (error) {
        console.log(error)
    }
}

export const SendInBlueProvider = {
    sendEmailVerify
}
