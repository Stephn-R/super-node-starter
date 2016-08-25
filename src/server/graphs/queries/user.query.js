'use strict';

/*===============================
=            MODULES            =
===============================*/

import _ from 'lodash';

import { requireAuth } from '../../filters';

// Use resolver for an unbounded query engine
// import { resolver } from 'graphql-sequelize';
import log from '../../config/logging';

import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';

/*=====  End of MODULES  ======*/


/*==================================
=            USER QUERY            =
==================================*/

/**
 * Retrieves the user object
 * @param  {Sequelize.Model}   UserModel - the database model
 * @param  {GraphQLObjectType} UserType  - the user graph type
 * @return {Object}                      - the json result
 */
exports.UserQuery = (UserModel, UserType) => {
  return new GraphQLObjectType({
    name:   'FetchUserQuery',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            type:        GraphQLInt,
            description: 'id of the user'
          },
          token: {
            type:        new GraphQLNonNull(GraphQLString),
            description: 'jwt token of the user'
          }
        },
        resolve: function(rootValue, args) {
          return requireAuth(UserModel, args.token).then(sessionUser => {
            if(args.id) {
              return UserModel.findOne({
                where: { id: args.id }
              }).then(userRef => {
                if(userRef) {
                  log.debug(`Found User # ${userRef.get('id')}`);
                  // Prevent exposing token to other users
                  userRef.token = '';
                  return userRef.toJSON();
                } else {
                  return new Error('Failed to locate the user');
                }
              });
            } else {
              return sessionUser.toJSON();
            }
          });
        }
      }
    }
  });
};

/*=====  End of USER QUERY  ======*/
