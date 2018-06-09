module.exports = {
  pubSub: {
    message: {
      user: {
        action: {
          command: {
            create: "user.create",
            update: "user.update",
            delete: "user.delete"
          },
          eventCommit: {
            created: "user.created",
            updated: "user.updated",
            deleted: "user.deleted"
          },
          query: {
            getAll: "user.getAll",
            getSingle: "user.getSingle"
          }
        }
      },
      product: {
        action: {
          command: {
            create: "product.create",
            update: "product.update",
            delete: "product.delete"
          },
          eventCommit: {
            created: "product.created",
            updated: "product.updated",
            deleted: "product.deleted"
          },
          query: {
            getAll: "product.getAll",
            getSingle: "product.getSingle"
          }
        }
      },     
      shoppingCart: {
        action: {
          command: {
            create: "shopping.cart.create",
            delete: "shopping.cart.delete",
            addItem: "shopping.cart.add.item",
            removeItem: "shopping.cart..remove.item"
          },
          eventCommit: {
            created: "shopping.cart.created",
            deleted: "shopping.cart.deleted",
            itemAdded: "shopping.cart.item.added",
            itemRemoved: "shopping.cart.item.removed"
          },
          query: {
            getAll: "shopping.cart.getAll",
            getSingle: "shopping.cart.getSingle"
          }
        }
      },
      business: {
        action: {
          command: {
            create: "business.create",
            update: "business.update",
            delete: "business.delete"
          },
          eventCommit: {
            created: "business.created",
            updated: "business.updated",
            deleted: "business.deleted"
          },
          query: {
            getAll: "business.getAll",
            getSingle: "business.getSingle"
          }
        }
      },
      customer: {
        action: {
          command: {
            create: "customer.create",
            delete: "customer.delete",
            addBusiness: "customer.addBusiness",
            removeBusiness: "customer.removeBusiness"
          },
          eventCommit: {
            created: "customer.created",
            deleted: "customer.deleted",
            businessAdded: "customer.business.added",
            businessRemoved: "customer.business.removed"
          },
          query: {
            getAll: "customer.getAll",
            getSingle: "customer.getSingle"
          }
        }
      },
      provider: {
        action: {
          command: {
            create: "provider.create",
            delete: "provider.delete",
            addBusiness: "provider.addBusiness",
            removeBusiness: "provider.removeBusiness"
          },
          eventCommit: {
            created: "provider.created",
            deleted: "provider.deleted",
            businessAdded: "provider.business.added",
            businessRemoved: "provider.business.removed"
          },
          query: {
            getAll: "provider.getAll",
            getSingle: "provider.getSingle"
          }
        }
      }
    },
    messageType: {
        crud: "crud",
        cqrs: "cqrs",
        custom: "custom"
    },
    messageAction: {

      create: "create",
      update: "update",
      delete: "delete",
      getSingle: "getSingle",
      getAll: "getAll",
      confirmRegistration: "confirmRegistration",
      requestRegistration: "requestRegistration",
      addFriends: "addFriends",
      inviteFriend: "inviteFriend"
    },
    recipients: {
      gateway: "gateway",
      user: "user",
      command: "command",
      business: "business",
      provider: "provider",
      shoppingCart: "shoppingCart",
      product: "product",
      customer: "customer"
    },
    channelStore: {
      subscribers: "subscribers",
      messages: "messages"
    }
  },
  user: {
    status: {
      active: "active",
      inactive: "inactive"
    }
  },
  address: {
    ownerType: {
      company: "company",
      community: "community",
      user: "user",
      person: "person"
    }
  },
  chat: {
    chatTypes: {
      friend: 'friend',
      group: 'group'
    }
  },
  global: {
    error: {
      strictMode: "StrictModeError"
    },
    processExit: "process-exit"
  }
};
