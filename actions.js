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

const addYachtAction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://yatmatch-api.up.railway.app/addYachtForm",
        label: "Add Yacht"
    }
}

const addConatctAction = {
    primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://yatmatch-api.up.railway.app/addContactForm",
        label: "Add Contact"
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
    const resarray = JSON.parse(data).map((yacht) => {
        return {
            objectId: yacht.yachtID,
            title: yacht.yachtName,
            link: "http://example.com/1",
            created: "2016-09-15",
            updated: "2016-09-28",
            yachtName: yacht.yachtName,
            listingStatus: yacht.listingStatus,
            askingPrice: yacht.askingPrice,
            description: yacht.description,
            location: yacht.location,
            timeline: yacht.timeline
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
                uri: "https://fe-yatmatch.demoserver.work/people-profile/f30cd1f0-ba6c-486d-89c0-68c37b0c9c1f/matches",
                label: "View Matches",

            },
            {
                type: "IFRAME",
                width: 890,
                height: 748,
                uri: "https://fe-yatmatch.demoserver.work/people-profile/f30cd1f0-ba6c-486d-89c0-68c37b0c9c1f/criteria",
                label: "Change Criterias",

            }]
    }
    resarray.unshift(criteria)
    return {
        results: resarray,
        totalCount: resarray.length,
        itemLabel: "Yachts",
        allItemsLink: "https://fe-yatmatch.demoserver.work/yachts",
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
module.exports = { createProfileAction, subscribeAction, addYachtAction, addConatctAction, listUser, fetchCardData }