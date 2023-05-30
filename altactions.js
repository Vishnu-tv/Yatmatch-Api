const actionTest_v2 =
{
    responseVersion: "v3",
    cardLabel: "Tickets",
    allItemsLinkUrl: "https://example.com/all-items-link-url",
    totalCount: 1,
    sections: [
      {
        id: "123",
        title: "Create a Contact in yatmatch",
        linkUrl: "http://example.com/1",
        tokens: [
          {
            "name": "created",
            "label": "test_label",
            "dataType": "DATE",
            "value": "2016-08-04"
          }
        ],
        actions: [
          
          {
            type: "ACTION_HOOK",
            confirmation: {
              prompt: "action-confirmation-body-prompt",
              confirmButtonLabel: "Continue",
              cancelButtonLabel: "Cancel"
            },
            httpMethod: "POST",
            propertyNamesIncluded: [
                "firstname","lastname","email","phone"
            ],
            url: "https://yatmatch-api.up.railway.app/addContacthook",
            label: "Add Contact",
          },
        ]
      }
    ]
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
        primaryAction: addYachtAction
    }
 
}