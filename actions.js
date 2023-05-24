const createProfileAction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://fe-yatmatch.demoserver.work/register",
        label: "Create Broker Profile"
    }
}

const subscribeAction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://fe-yatmatch.demoserver.work/login",
        label: "Subscibe a Plan"
    }
}

const addContactAction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://yatmatch-api.up.railway.app/addContact",
        label: "Add Yacht"
    }
}

const listUser = (data) => {
    return {
        results:
            data.map((u) => {
                return {
                    objectId: u.id,
                    title: u.name,
                    link: "http://example.com/1",
                    created: "2016-09-15",
                    name: u.name,
                    email: u.email,
                    updated: "2016-09-28",
                }
            }),
        primaryAction: {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "https://yatmatch-api.up.railway.app/addContact",
            label: "Add Yacht"
        }
    }

}



const fetchCardData = (data) => {
   const resarray =  JSON.parse(data).map((u) => {
        return {
            objectId: u.id,
            title: u.name,
            link: "http://example.com/1",
            created: "2016-09-15",
            name: u.name,
            email: u.email,
            updated: "2016-09-28",
        }
    })
    criteria = {
        objectId: 123,
        title: "search Criteria",
        link: "http://example.com/1",
        created: "2016-09-15",
        name: "Test Name",
        email: "test@gmail.com",
        updated: "2016-09-28",
        actions: [
            {
              type: "IFRAME",
              width: 890,
              height: 748,
              uri: "https://example.com/edit-iframe-contents",
              label: "View Matches",
              
            },
            {
              type: "IFRAME",
              width: 890,
              height: 748,
              uri: "https://example.com/reassign-iframe-contents",
              label: "Edit",
              
            }]
    }
    resarray.unshift(criteria)
    return {
        results:resarray,
        primaryAction: {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "https://yatmatch-api.up.railway.app/addContact",
            label: "Add Yacht"
        }
    }
}


const fetchCardDataAlt = (data) => {
    return {
        results:
            JSON.parse(data).map((u) => {
                return {
                    objectId: u.id,
                    title: u.name,
                    link: "http://example.com/1",
                    created: "2016-09-15",
                    name: u.name,
                    email: u.email,
                    updated: "2016-09-28",
                }
            }),
        primaryAction: {
            type: "IFRAME",
            width: 890,
            height: 748,
            uri: "https://yatmatch-api.up.railway.app/addContact",
            label: "Add Yacht"
        }
    }
}
module.exports = { createProfileAction, subscribeAction, addContactAction, listUser ,fetchCardData}
