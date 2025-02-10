export const mockLoginGraphQLErrorResponse = {
    errors: [
      {
        message: "Die Konto-Anmeldung war nicht korrekt oder dein Konto ist vorübergehend deaktiviert. Bitte warte und versuche es später erneut.",
        extensions: {
          category: "graphql-authorization",
          log_message: "Sudo Die Konto-Anmeldung war nicht korrekt oder dein Konto ist vorübergehend deaktiviert. Bitte warte und versuche es später erneut."
        },
        locations: [{ line: 2, column: 3 }],
        path: ["generateCustomerToken"]
      }
    ],
    data: {
      generateCustomerToken: null
    }
  };

    export const mockLoginGraphQLSuccessResponse = {
        "data": {
            "generateCustomerToken": {
                "token": "eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjUyNjA2NzgsInV0eXBpZCI6MywiaWF0IjoxNzM5MTc0OTgwLCJleHAiOjE3MzkxNzg1ODB9.YqWHxMbWflyZ1b3moKkIak32XaICBJlYcL3PoaYMIzQ",
                "__typename": "CustomerToken"
            }
        }
    };