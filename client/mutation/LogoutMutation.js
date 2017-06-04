import Relay from 'react-relay/classic'

export default class LogoutMutation extends Relay.Mutation {
  // eslint-disable-next-line class-methods-use-this
  getMutation() {
    return Relay.QL`mutation { logout }`
  }

  getVariables() {
    return {
      id: this.props.user.id,
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getFatQuery() {
    return Relay.QL`
      fragment on LogoutPayload {
        user {
          email,
          role,
          firstName,
          lastName
        }
      }
    `
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          user: this.props.user.id,
        },
      },
    ]
  }

  static fragments = {
    // props have to contain user data with fragments key name 'user'
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  }
}
