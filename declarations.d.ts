declare module 'react-native-sqlite-storage' {
    export type SQLiteDatabase = {
      transaction: (
        callback: (tx: Transaction) => void,
        errorCallback?: (error: SQLError) => void,
        successCallback?: () => void
      ) => void;
      close: () => void;
    };
  
    export type Transaction = {
      executeSql: (
        sqlStatement: string,
        args?: any[],
        callback?: (tx: Transaction, resultSet: ResultSet) => void,
        errorCallback?: (tx: Transaction, error: SQLError) => void
      ) => void;
    };
  
    export type ResultSet = {
      rows: {
        length: number;
        item: (index: number) => any;
      };
      rowsAffected: number;
      insertId?: number;
    };
  
    export type SQLError = {
      code: number;
      message: string;
    };
  
    const SQLite: {
      openDatabase: (
        params: { name: string; location: string },
        successCallback?: () => void,
        errorCallback?: (error: SQLError) => void
      ) => SQLiteDatabase;
    };
  
    export default SQLite;
  }
  