const userType = `#graphql
  type User {
    id: Int!
    email: String!
    username: String!
  }

  enum StatusType {
    SUCCESS
  }

  type UserResult{
    message: StatusType!
  }

  # The root Query type
  type Query {
    user(id: Int!): User
    users: [User!]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(id: Int!, email: String!): User
    deleteUser(id: Int!): UserResult
  }
`;

export default userType;
