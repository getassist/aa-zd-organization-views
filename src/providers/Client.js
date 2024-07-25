/* global ZAFClient */
const zClient = ZAFClient.init()

const Client = {}

Client.zaf = zClient

Client.resize = (width = document.body.scrollWidth, height = document.body.scrollHeight) => {
    return zClient.invoke('resize', { width: width, height: height })
}

Client.get = (object) => {
    return zClient.get(object).then(data => data[object])
}

Client.settings = (object) => {
    return zClient.metadata().then(data => {
        return object ? data.settings[object] : data.settings
    })
}

Client.context = () => {
    return zClient.context()
}

Client.notify = (message, type = 'notice') => {
    return zClient.invoke('notify', message, type)
}

Client.open = (object, id) => {
    return zClient.invoke('routeTo', object, id)
}

Client.request = (options) => {
    if ((typeof options) === 'string') {
        return zClient.request(options)
    } else {
        return zClient.request(options)
    }
}

export default Client
