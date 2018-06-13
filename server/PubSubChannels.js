module.exports = {
  "User": {
    "Command" : {
      "Event": "UserCommandEvent",
      "CompletedEvent": "UserCommandCompletedEvent"
    },
    "Query" : {
      "Event": "UserQueryEvent",
      "CompletedEvent": "UserQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "UserEventCommitEvent",
      "CompletedEvent": "UserEventCommitCompletedEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "UserCreateEvent",
        "CreateCompletedEvent": "UserCreateCompletedEvent",
        "UpdateEvent": "UserUpdateEvent",
        "UpdateCompletedEvent": "UserUpdateCompletedEvent",
        "DeleteEvent": "UserDeleteEvent",
        "DeleteCompletedEvent": "UserDeleteCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "UserGetSingleEvent",
        "GetSingleCompletedEvent": "UserGetSingleCompletedEvent",
        "GetAllEvent": "UserGetAllEvent",
        "GetAllCompletedEvent": "UserGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "UserCreatedEvent",
        "CreatedCompletedEvent": "UserCreatedCompletedEvent",
        "UpdatedEvent": "UserUpdatedEvent",
        "UpdatedCompletedEvent": "UserUpdatedCompletedEvent",
        "DeletedEvent": "UserDeletedEvent",
        "DeletedCompletedEvent": "UserDeletedCompletedEvent"
      }      
    }
  },
  "ShoppingCart": {
    "Command" : {
      "Event": "ShoppingCartCommandEvent",
      "CompletedEvent": "ShoppingCartCommandCompletedEvent"
    },
    "Query" : {
      "Event": "ShoppingCartQueryEvent",
      "CompletedEvent": "ShoppingCartQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "ShoppingCartEventCommitEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "ShoppingCartCreateEvent",
        "CreateCompletedEvent": "ShoppingCartCreateCompletedEvent",
        "DeleteEvent": "ShoppingCartDeleteEvent",
        "DeleteCompletedEvent": "ShoppingCartDeleteCompletedEvent",
        "AddShoppingCartItemEvent": "AddShoppingCartItemEvent",
        "AddShoppingCartItemCompletedEvent": "AddShoppingCartItemCompletedEvent",
        "RemoveShoppingCartItemEvent": "RemoveShoppingCartItemEvent",
        "RemoveShoppingCartItemCompletedEvent": "RemoveShoppingCartItemCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "ShoppingCartGetSingleEvent",
        "GetSingleCompletedEvent": "ShoppingCartGetSingleCompletedEvent",
        "GetAllEvent": "ShoppingCartGetAllEvent",
        "GetAllCompletedEvent": "ShoppingCartGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "ShoppingCartCreatedEvent",
        "CreatedCompletedEvent": "ShoppingCartCreatedCompletedEvent",
        "DeletedEvent": "ShoppingCartDeletedEvent",
        "DeletedCompletedEvent": "ShoppingCartDeletedCompletedEvent",
        "ShoppingCartItemAddedEvent": "ShoppingCartItemAddedEvent",
        "ShoppingCartItemAddedCompletedEvent": "ShoppingCartItemAddedCompletedEvent",
        "ShoppingCartItemRemovedEvent": "ShoppingCartItemRemovedEvent",
        "ShoppingCartItemRemovedCompletedEvent": "ShoppingCartItemRemovedCompletedEvent"
      }
    }
  },
  "Product": {
    "Command" : {
      "Event": "ProductCommandEvent",
      "CompletedEvent": "ProductCommandCompletedEvent"
    },
    "Query" : {
      "Event": "ProductQueryEvent",
      "CompletedEvent": "ProductQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "ProductEventCommitEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "ProductCreateEvent",
        "CreateCompletedEvent": "ProductCreateCompletedEvent",
        "UpdateEvent": "ProductUpdateEvent",
        "UpdateCompletedEvent": "ProductUpdateCompletedEvent",
        "DeleteEvent": "ProductDeleteEvent",
        "DeleteCompletedEvent": "ProductDeleteCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "ProductGetSingleEvent",
        "GetSingleCompletedEvent": "ProductGetSingleCompletedEvent",
        "GetAllEvent": "ProductGetAllEvent",
        "GetAllCompletedEvent": "ProductGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "ProductCreatedEvent",
        "CreatedCompletedEvent": "ProductCreatedCompletedEvent",
        "UpdatedEvent": "ProductUpdatedEvent",
        "UpdatedCompletedEvent": "ProductUpdatedCompletedEvent",
        "DeletedEvent": "ProductDeletedEvent",
        "DeletedCompletedEvent": "ProductDeletedCompletedEvent"
      }
    }
  },
  "Business": {
    "Command" : {
      "Event": "BusinessCommandEvent",
      "CompletedEvent": "BusinessCommandCompletedEvent"
    },
    "Query" : {
      "Event": "BusinessQueryEvent",
      "CompletedEvent": "BusinessQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "BusinessEventCommitEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "BusinessCreateEvent",
        "CreateCompletedEvent": "BusinessCreateCompletedEvent",
        "UpdateEvent": "BusinessUpdateEvent",
        "UpdateCompletedEvent": "BusinessUpdateCompletedEvent",
        "DeleteEvent": "BusinessDeleteEvent",
        "DeleteCompletedEvent": "BusinessDeleteCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "BusinessGetSingleEvent",
        "GetSingleCompletedEvent": "BusinessGetSingleCompletedEvent",
        "GetAllEvent": "BusinessGetAllEvent",
        "GetAllCompletedEvent": "BusinessGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "BusinessCreatedEvent",
        "CreatedCompletedEvent": "BusinessCreatedCompletedEvent",
        "UpdatedEvent": "BusinessUpdatedEvent",
        "UpdatedCompletedEvent": "BusinessUpdatedCompletedEvent",
        "DeletedEvent": "BusinessDeletedEvent",
        "DeletedCompletedEvent": "BusinessDeletedCompletedEvent"
      }
    }
  },
  "Customer": {
    "Command" : {
      "Event": "CustomerCommandEvent",
      "CompletedEvent": "CustomerCommandCompletedEvent"
    },
    "Query" : {
      "Event": "CustomerQueryEvent",
      "CompletedEvent": "CustomerQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "CustomerEventCommitEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "CustomerCreateEvent",
        "CreateCompletedEvent": "CustomerCreateCompletedEvent",
        "AddCustomerBusinessEvent": "AddCustomerBusinessEvent",
        "AddCustomerBusinessCompletedEvent": "AddCustomerBusinessCompletedEvent",
        "DeleteEvent": "CustomerDeleteEvent",
        "DeleteCompletedEvent": "CustomerDeleteCompletedEvent",
        "RemoveCustomerBusinessEvent": "RemoveCustomerBusinessEvent",
        "RemoveCustomerBusinessCompletedEvent": "RemoveCustomerBusinessCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "CustomerGetSingleEvent",
        "GetSingleCompletedEvent": "CustomerGetSingleCompletedEvent",
        "GetAllEvent": "CustomerGetAllEvent",
        "GetAllCompletedEvent": "CustomerGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "CustomerCreatedEvent",
        "CreatedCompletedEvent": "CustomerCreatedCompletedEvent",
        "DeletedEvent": "CustomerDeletedEvent",
        "DeletedCompletedEvent": "CustomerDeletedCompletedEvent",
        "CustomerBusinessRemovedEvent": "CustomerBusinessRemovedEvent",
        "CustomerBusinessRemovedCompletedEvent": "CustomerBusinessRemovedCompletedEvent",
        "CustomerBusinessAddedEvent": "CustomerBusinessAddedEvent",
        "CustomerBusinessAddedCompletedEvent": "CustomerBusinessAddedCompletedEvent"
      }
    }
  },
  "Provider": {
    "Command" : {
      "Event": "ProviderCommandEvent",
      "CompletedEvent": "ProviderCommandCompletedEvent"
    },
    "Query" : {
      "Event": "ProviderQueryEvent",
      "CompletedEvent": "ProviderQueryCompletedEvent"
    },
    "EventCommit" : {
      "Event": "ProviderEventCommitEvent"
    },
    "Internal": {
      "Command": {
        "CreateEvent": "ProviderCreateEvent",
        "CreateCompletedEvent": "ProviderCreateCompletedEvent",
        "AddProviderBusinessEvent": "AddProviderBusinessEvent",
        "AddProviderBusinessCompletedEvent": "AddProviderBusinessCompletedEvent",
        "DeleteEvent": "ProviderDeleteEvent",
        "DeleteCompletedEvent": "ProviderDeleteCompletedEvent",
        "RemoveProviderBusinessEvent": "RemoveProviderBusinessEvent",
        "RemoveProviderBusinessCompletedEvent": "RemoveProviderBusinessCompletedEvent"
      },
      "Query": {
        "GetSingleEvent": "ProviderGetSingleEvent",
        "GetSingleCompletedEvent": "ProviderGetSingleCompletedEvent",
        "GetAllEvent": "ProviderGetAllEvent",
        "GetAllCompletedEvent": "ProviderGetAllCompletedEvent"
      },
      "EventCommit": {
        "CreatedEvent": "ProviderCreatedEvent",
        "CreatedCompletedEvent": "ProviderCreatedCompletedEvent",
        "DeletedEvent": "ProviderDeletedEvent",
        "DeletedCompletedEvent": "ProviderDeletedCompletedEvent",
        "ProviderBusinessRemovedEvent": "ProviderBusinessRemovedEvent",
        "ProviderBusinessRemovedCompletedEvent": "ProviderBusinessRemovedCompletedEvent",
        "ProviderBusinessAddedEvent": "ProviderBusinessAddedEvent",
        "ProviderBusinessAddedCompletedEvent": "ProviderBusinessAddedCompletedEvent"
      }
    }
  }
};