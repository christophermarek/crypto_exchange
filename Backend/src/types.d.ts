
import { Document } from "mongoose"

interface orderBookEntry extends Document{
    userId: ObjectId
    status: string
    main: string
    pair: string
    datePlaced: Date
    limit: string
    units: string
    direction: string
}


interface userType extends Document {
    username: string
    password: string
    createdAt: any
    updatedAt: any
}

declare module 'mongoose' {
    import passportLocal = require('passport-local');
  
    export interface AuthenticationResult {
      user: any;
      error: any;
    }
  
    // methods
    export interface PassportLocalDocument extends Document {
      setPassword(password: string): Promise<PassportLocalDocument>;
      setPassword(password: string, cb: (err: any, res: any) => void): void;
      changePassword(oldPassword: string, newPassword: string): Promise<PassportLocalDocument>;
      changePassword(oldPassword: string, newPassword: string, cb: (err: any, res: any) => void): void;
      authenticate(password: string): Promise<AuthenticationResult>;
      authenticate(password: string, cb: (err: any, user: any, error: any) => void): void;
      resetAttempts(): Promise<PassportLocalDocument>;
      resetAttempts(cb: (err: any, res: any) => void): void;
    }
  
    interface AuthenticateMethod<T> {
      (username: string, password: string): Promise<AuthenticationResult>;
      (username: string, password: string, cb: (err: any, user: T | boolean, error: any) => void): void;
    }
  
    // statics
    interface PassportLocalModel<T extends Document> extends Model<T> {
      authenticate(): AuthenticateMethod<T> 
      serializeUser(): (user: PassportLocalModel<T>, cb: (err: any, id?: any) => void) => void;
      deserializeUser(): (username: string, cb: (err: any, user?: any) => void) => void;
  
      register(user: T, password: string): Promise<T>;
      register(user: T, password: string, cb: (err: any, account: any) => void): void;
      findByUsername(username: string, selectHashSaltFields: boolean): Query<T>;
      findByUsername(username: string, selectHashSaltFields: boolean, cb: (err: any, account: any) => void): any;
      createStrategy(): passportLocal.Strategy;
    }
  
    // error messages
    export interface PassportLocalErrorMessages {
      MissingPasswordError?: string;
      AttemptTooSoonError?: string;
      TooManyAttemptsError?: string;
      NoSaltValueStoredError?: string;
      IncorrectPasswordError?: string;
      IncorrectUsernameError?: string;
      MissingUsernameError?: string;
      UserExistsError?: string;
    }
  
    // plugin options
    export interface PassportLocalOptions {
      saltlen?: number;
      iterations?: number;
      keylen?: number;
      encoding?: string;
      digestAlgorithm?: string;
      passwordValidator?: (password: string, cb: (err: any) => void) => void;
  
      usernameField?: string;
      usernameUnique?: boolean;
  
      usernameQueryFields: Array<string>;
  
      selectFields?: string;
      populateFields?: string;
  
      usernameLowerCase?: boolean;
  
      hashField?: string;
      saltField?: string;
  
      limitAttempts?: boolean;
      lastLoginField?: string;
      attemptsField?: string;
      interval?: number;
      maxInterval?: number;
      maxAttempts?: number;
  
      errorMessages?: PassportLocalErrorMessages;
    }
  
    export interface PassportLocalSchema extends Schema {
      plugin(
        plugin: (schema: PassportLocalSchema, options?: PassportLocalOptions) => void,
        options?: PassportLocalOptions
      ): this;
  
      // overload for the default mongoose plugin function
      plugin(plugin: (schema: Schema, options?: Object) => void, opts?: Object): this;
    }
  
    export function model<T extends Document>(
      name: string,
      schema?: PassportLocalSchema,
      collection?: string,
      skipInit?: boolean): PassportLocalModel<T>;
  
    export function model<T extends Document, U extends PassportLocalModel<T>>(
      name: string,
      schema?: PassportLocalSchema,
      collection?: string,
      skipInit?: boolean): U;
  }
  
  declare module 'passport-local-mongoose' {
    import mongoose = require('mongoose');
    var _: (schema: mongoose.Schema, options?: Object) => void;
    export = _;
  }