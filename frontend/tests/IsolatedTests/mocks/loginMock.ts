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

    export const mockLoginGraphQLSuccessResponse = 
      {
        "data": {
            "generateCustomerToken": {
                "token": "eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjUyNjA2NzgsInV0eXBpZCI6MywiaWF0IjoxNzQwNDgzOTI0LCJleHAiOjE3NDA0ODc1MjR9.Ut6cAWcTaKvD2OIlK1r9m5hO6kcE1DMYKM0pYOSDVYE",
                "__typename": "CustomerToken"
            }
        }
    };