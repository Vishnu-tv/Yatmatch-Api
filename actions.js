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
        title: "Search Criteria",
        link: null,
        created: "2016-09-15",
        yacht_type: "Classic,Sport Fisher",
        builder: "Abacus Marine",
        model: "105 Classic,115",
        budget: "0 - 30250000",
        loa: "10 m-60m",
        year: "1970-2020",
        gross_tonnage: "0-1850",
        engine_power: "100-150",
        engine_hour: "20-24",
        cruising_area: "Africa - Benin",
        cabin: "Guests cabin 2 sleeps 3-5",
        special_feature: "stabilized,joystick",
        lifestyle: "Long Range,Ocean Crossing",
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
        totalCount : 2,
        itemLabel : "yachts",
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
