# Sequelize Migrations  

  * Use sequelize-cli version : "6.3.0",
  * All migrations related files are stored in ``` src/database ``` directory. 
  * DataBase connection configs are stored in config.ts file. 

  ## To Generate new migration file 
  ``` npx sequelize-cli migration:generate --name file-name ```

  ## To run migration 
  ``` npx sequelize-cli db:migrate ```

  ## To Generate new seed file 
  ``` npx sequelize-cli seed:generate --name file-name ```

   ## To run seed 
  ``` npx sequelize-cli db:seed ```

  # Writing sequelize migration

  <ul>
  <li> 
      The <b>up</b> function is responsible for defining the changes that need to be applied to the database schema . This typically involves creating new tables, adding columns, or making other structural changes to the database schema.  
  </li>

  <li>
      The <b>down</b> function, on the other hand, defines the changes that need to be made to roll back the migration. 
  </li>
  </ul>

  ## Some Boilerplate code for writing migration 

  * <b>creating table</b>
  ``` javascript
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      hashPassword: {
        type: Sequelize.STRING
      },
      uniqueId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: () => Date.now()
      }
    });
  }
  ```

  * <b>Changing data type of a column </b>
  ``` javascript
    module.exports {
      up: async (queryInterface, Sequelize) => {
          await queryInterface.changeColumn('users', 'email', {
            type: Sequelize.STRING(100) 
        });
      }
      down: async (queryInterface, Sequelize) => {

      }
    }
  ```

  * <b>Add new column in table</b>
  ``` javascript
    module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("eventType", "schedulingType", {
        type: Sequelize.STRING,
        allowNull: true,
        after: "teamId",
    });
    },
    down: async (queryInterface, Sequelize) => {
    }
  };
  ```

  * <b>For adding index in table </b>
  ``` javascript        
    // TableName = user and Column name userId
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addIndex('user', ['userId'], {
      indexName: 'user_Id_IDX',
      indexType: 'BTREE',
      unique: true,
     });
    }

  ```

  * <b>For running any Sql query in migration</b>
  ``` javascript
    up: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.query(
      `ALTER TABLE \`users\` ADD COLUMN uniqueReferenceId CHAR(36);`
      );
    }
  ```

  * <b>For run seed data in mySQL</b>
  ``` javascript
   up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('roles', [
        {
          "id" : 1,
          "name" : "USER",
          "isActive" : 1
        },
        {
          "id" : 2,
          "name" : "ADMIN",
          "isActive" : 1
        },
        {
          "id" : 3,
          "name" : "PROFESSIONAL",
          "isActive" : 1
        },
        {
          "id" : 4,
          "name" : "SUPPORT",
          "isActive" : 1
        }
      ], {});
    }
  ```




  
